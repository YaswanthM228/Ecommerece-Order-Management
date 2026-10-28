const { pool, query, queryOne } = require('../config/db');
const { calculateOrderTotals, round } = require('../utils/calculations');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// Helper to generate distinct order number
const generateOrderNumber = () => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomStr = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${dateStr}-${randomStr}`;
};

// POST /api/orders/checkout (Transactional Checkout)
const checkout = async (req, res, next) => {
  const connection = await pool.getConnection();
  try {
    const userId = req.user.id;
    const {
      items, // array of { product_id, variant_id, quantity }
      shipping_address, // { full_name, phone, address_line1, address_line2, city, state, postal_code, country }
      payment_method = 'cod', // 'cod', 'card', 'upi'
      coupon_code = null,
      payment_meta = null,
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return errorResponse(res, 'Checkout failed. No items provided.', 400);
    }

    if (!shipping_address || !shipping_address.address_line1 || !shipping_address.city || !shipping_address.postal_code) {
      return errorResponse(res, 'Complete shipping address is required.', 400);
    }

    await connection.beginTransaction();

    // 1. Verify items & lock product rows to prevent concurrent stock race conditions
    const verifiedItems = [];
    for (const item of items) {
      const [productRows] = await connection.execute(
        'SELECT id, name, sku, price, stock_quantity, is_active FROM products WHERE id = ? FOR UPDATE',
        [item.product_id]
      );
      const product = productRows[0];

      if (!product || !product.is_active) {
        await connection.rollback();
        return errorResponse(res, `Product '${item.product_id}' is unavailable or inactive.`, 400);
      }

      if (product.stock_quantity < item.quantity) {
        await connection.rollback();
        return errorResponse(
          res,
          `Insufficient stock for '${product.name}'. Requested: ${item.quantity}, Available: ${product.stock_quantity}.`,
          400
        );
      }

      let variantInfo = null;
      let effectivePrice = Number(product.price);

      if (item.variant_id) {
        const [variantRows] = await connection.execute(
          'SELECT id, variant_type, variant_value, price_modifier, stock_quantity FROM product_variants WHERE id = ? AND product_id = ? FOR UPDATE',
          [item.variant_id, item.product_id]
        );
        const variant = variantRows[0];
        if (variant) {
          if (variant.stock_quantity < item.quantity) {
            await connection.rollback();
            return errorResponse(res, `Selected variant '${variant.variant_value}' is out of stock.`, 400);
          }
          variantInfo = `${variant.variant_type}: ${variant.variant_value}`;
          effectivePrice += Number(variant.price_modifier || 0);

          // Decrement variant stock
          await connection.execute(
            'UPDATE product_variants SET stock_quantity = stock_quantity - ? WHERE id = ?',
            [item.quantity, variant.id]
          );
        }
      }

      // Decrement product stock
      await connection.execute(
        'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
        [item.quantity, product.id]
      );

      // Fetch primary image snapshot
      const [imgRows] = await connection.execute(
        'SELECT image_url FROM product_images WHERE product_id = ? ORDER BY is_primary DESC LIMIT 1',
        [product.id]
      );
      const imageUrl = imgRows[0] ? imgRows[0].image_url : null;

      verifiedItems.push({
        product_id: product.id,
        product_name: product.name,
        product_sku: product.sku,
        product_image: imageUrl,
        variant_info: variantInfo,
        unit_price: round(effectivePrice),
        quantity: parseInt(item.quantity, 10),
        total_price: round(effectivePrice * parseInt(item.quantity, 10)),
      });
    }

    // 2. Verify coupon if supplied
    let verifiedCoupon = null;
    if (coupon_code) {
      const [couponRows] = await connection.execute(
        'SELECT * FROM coupons WHERE UPPER(code) = UPPER(?) AND is_active = 1 AND (valid_until IS NULL OR valid_until > NOW()) FOR UPDATE',
        [coupon_code.trim()]
      );
      verifiedCoupon = couponRows[0] || null;
      if (verifiedCoupon && verifiedCoupon.usage_limit && verifiedCoupon.times_used >= verifiedCoupon.usage_limit) {
        verifiedCoupon = null;
      }
    }

    // 3. Compute server-side authoritative billing totals
    const totals = calculateOrderTotals({
      items: verifiedItems.map((i) => ({ price: i.unit_price, quantity: i.quantity })),
      coupon: verifiedCoupon,
    });

    // 4. Insert Order
    const orderNumber = generateOrderNumber();
    const addressFormatted = [
      shipping_address.address_line1,
      shipping_address.address_line2,
      shipping_address.landmark,
    ].filter(Boolean).join(', ');

    const paymentStatus = payment_method === 'cod' ? 'pending' : 'paid';
    const estimatedDelivery = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000); // 4 days

    const [orderResult] = await connection.execute(`
      INSERT INTO orders (
        order_number, user_id, customer_name, customer_email, customer_phone,
        shipping_address_line, city, state, postal_code, country,
        subtotal, discount_amount, delivery_charge, tax_amount, total_amount,
        coupon_code, order_status, payment_status, payment_method, estimated_delivery_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      orderNumber,
      userId,
      shipping_address.full_name || req.user.name,
      req.user.email,
      shipping_address.phone || req.user.phone || '9999999999',
      addressFormatted,
      shipping_address.city,
      shipping_address.state,
      shipping_address.postal_code,
      shipping_address.country || 'India',
      totals.subtotal,
      totals.discountAmount,
      totals.deliveryCharge,
      totals.taxAmount,
      totals.totalAmount,
      verifiedCoupon ? verifiedCoupon.code : null,
      'ordered',
      paymentStatus,
      payment_method,
      estimatedDelivery,
    ]);

    const orderId = orderResult.insertId;

    // 5. Insert Order Items (Historical Snapshot)
    for (const item of verifiedItems) {
      await connection.execute(`
        INSERT INTO order_items (
          order_id, product_id, product_name, product_sku, product_image,
          variant_info, unit_price, quantity, total_price
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        orderId,
        item.product_id,
        item.product_name,
        item.product_sku,
        item.product_image,
        item.variant_info,
        item.unit_price,
        item.quantity,
        item.total_price,
      ]);
    }

    // 6. Record Payment
    const txnRef = `${payment_method.toUpperCase()}-TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;
    await connection.execute(`
      INSERT INTO payments (
        order_id, payment_method, transaction_reference, amount, payment_status, payment_details
      ) VALUES (?, ?, ?, ?, ?, ?)
    `, [
      orderId,
      payment_method,
      txnRef,
      totals.totalAmount,
      paymentStatus,
      JSON.stringify(payment_meta || { method: payment_method, verified_at: new Date().toISOString() }),
    ]);

    // 7. Increment coupon usage if applied
    if (verifiedCoupon) {
      await connection.execute(
        'UPDATE coupons SET times_used = times_used + 1 WHERE id = ?',
        [verifiedCoupon.id]
      );
    }

    // 8. Clear user's server-side cart
    const [cartRows] = await connection.execute('SELECT id FROM carts WHERE user_id = ?', [userId]);
    if (cartRows.length) {
      await connection.execute('DELETE FROM cart_items WHERE cart_id = ?', [cartRows[0].id]);
    }

    // 9. Create user notification
    await connection.execute(`
      INSERT INTO notifications (user_id, title, message, type, reference_id)
      VALUES (?, ?, ?, 'order', ?)
    `, [
      userId,
      `Order Placed Successfully! (${orderNumber})`,
      `Thank you for ordering with ShopSphere! Your order for ₹${totals.totalAmount} is confirmed.`,
      orderNumber,
    ]);

    await connection.commit();

    return successResponse(res, {
      order_id: orderId,
      order_number: orderNumber,
      total_amount: totals.totalAmount,
      order_status: 'ordered',
      payment_status: paymentStatus,
      payment_method,
    }, 'Order placed successfully.', 201);
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

// GET /api/orders
const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await query(`
      SELECT 
        o.id, o.order_number, o.created_at, o.order_status, o.payment_status,
        o.payment_method, o.total_amount, o.subtotal, o.discount_amount,
        o.delivery_charge, o.tax_amount, o.coupon_code, o.estimated_delivery_date,
        COUNT(oi.id) AS total_items,
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', sub_oi.id,
              'product_name', sub_oi.product_name,
              'product_image', sub_oi.product_image,
              'quantity', sub_oi.quantity,
              'unit_price', sub_oi.unit_price
            )
          )
          FROM order_items sub_oi
          WHERE sub_oi.order_id = o.id
        ) AS items_preview
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.user_id = ?
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `, [userId]);

    return successResponse(res, orders, 'Order history.');
  } catch (error) {
    next(error);
  }
};

// GET /api/orders/:id
const getOrderById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    const isAdmin = req.user.role === 'admin';

    let orderSql = 'SELECT * FROM orders WHERE id = ?';
    const params = [orderId];
    if (!isAdmin) {
      orderSql += ' AND user_id = ?';
      params.push(userId);
    }

    const order = await queryOne(orderSql, params);
    if (!order) {
      return errorResponse(res, 'Order not found or unauthorized access.', 404);
    }

    const items = await query('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
    const payment = await queryOne('SELECT * FROM payments WHERE order_id = ?', [order.id]);

    return successResponse(res, {
      ...order,
      items,
      payment,
    }, 'Order details.');
  } catch (error) {
    next(error);
  }
};

// PUT /api/orders/:id/cancel
const cancelOrder = async (req, res, next) => {
  const connection = await pool.getConnection();
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    const { reason = 'Cancelled by customer' } = req.body;
    const isAdmin = req.user.role === 'admin';

    await connection.beginTransaction();

    let checkSql = 'SELECT * FROM orders WHERE id = ? FOR UPDATE';
    const params = [orderId];
    if (!isAdmin) {
      checkSql += ' AND user_id = ?';
      params.push(userId);
    }

    const [orderRows] = await connection.execute(checkSql, params);
    const order = orderRows[0];

    if (!order) {
      await connection.rollback();
      return errorResponse(res, 'Order not found.', 404);
    }

    // Only orders in 'ordered' or 'confirmed' state can be cancelled
    if (order.order_status !== 'ordered' && order.order_status !== 'confirmed') {
      await connection.rollback();
      return errorResponse(
        res,
        `Cannot cancel order with status '${order.order_status}'. Once shipped, items cannot be cancelled.`,
        400
      );
    }

    // Restore stock
    const [items] = await connection.execute(
      'SELECT product_id, quantity FROM order_items WHERE order_id = ?',
      [order.id]
    );

    for (const item of items) {
      await connection.execute(
        'UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }

    // Update order status
    await connection.execute(`
      UPDATE orders SET 
        order_status = 'cancelled',
        cancellation_reason = ?,
        payment_status = CASE WHEN payment_status = 'paid' THEN 'refunded' ELSE payment_status END
      WHERE id = ?
    `, [reason, order.id]);

    // Send notification
    await connection.execute(`
      INSERT INTO notifications (user_id, title, message, type, reference_id)
      VALUES (?, ?, ?, 'order', ?)
    `, [
      order.user_id,
      `Order Cancelled (${order.order_number})`,
      `Your order has been cancelled. Any pre-authorized charges will be refunded.`,
      order.order_number,
    ]);

    await connection.commit();

    return successResponse(res, { order_id: order.id, status: 'cancelled' }, 'Order has been cancelled.');
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

// GET /api/orders/:id/invoice
const getInvoice = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;
    const isAdmin = req.user.role === 'admin';

    let orderSql = 'SELECT * FROM orders WHERE id = ?';
    const params = [orderId];
    if (!isAdmin) {
      orderSql += ' AND user_id = ?';
      params.push(userId);
    }

    const order = await queryOne(orderSql, params);
    if (!order) {
      return errorResponse(res, 'Order not found.', 404);
    }

    const items = await query('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
    const payment = await queryOne('SELECT * FROM payments WHERE order_id = ?', [order.id]);

    const invoiceData = {
      store: {
        name: 'ShopSphere Retail Pvt. Ltd.',
        gstin: '29ABCDE1234F1Z5',
        cin: 'U72200KA2026PTC98765',
        address: 'Tower B, Tech Park, Outer Ring Road, Bengaluru, Karnataka, 560103',
        support_email: 'support@shopsphere.com',
        phone: '+91 (800) 123-4567',
        pan: 'ABCDE1234F',
      },
      invoice: {
        number: `INV-${order.order_number.replace('ORD-', '')}`,
        date: order.created_at,
        order_number: order.order_number,
        order_status: order.order_status,
      },
      customer: {
        name: order.customer_name,
        email: order.customer_email,
        phone: order.customer_phone,
        shipping_address: order.shipping_address_line,
        city: order.city,
        state: order.state,
        postal_code: order.postal_code,
        country: order.country,
      },
      items: items.map((i) => ({
        id: i.id,
        name: i.product_name,
        sku: i.product_sku,
        variant: i.variant_info,
        unit_price: Number(i.unit_price),
        quantity: i.quantity,
        total: Number(i.total_price),
      })),
      billing: {
        subtotal: Number(order.subtotal),
        discount: Number(order.discount_amount),
        coupon: order.coupon_code,
        delivery_charge: Number(order.delivery_charge),
        tax_amount: Number(order.tax_amount),
        tax_breakdown: {
          cgst_rate: '9%',
          cgst_amount: round(Number(order.tax_amount) / 2),
          sgst_rate: '9%',
          sgst_amount: round(Number(order.tax_amount) / 2),
        },
        grand_total: Number(order.total_amount),
      },
      payment: {
        method: order.payment_method.toUpperCase(),
        status: order.payment_status,
        transaction_ref: payment ? payment.transaction_reference : 'N/A',
      },
    };

    return successResponse(res, invoiceData, 'Official Invoice data.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkout,
  getUserOrders,
  getOrderById,
  cancelOrder,
  getInvoice,
};
