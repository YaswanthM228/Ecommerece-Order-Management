const { pool, query, queryOne } = require('../config/db');
const { successResponse, paginatedResponse, errorResponse } = require('../utils/responseHandler');

// GET /api/admin/dashboard
const getDashboardStats = async (req, res, next) => {
  try {
    // 1. Core KPIs using SUM and COUNT aggregates
    const kpiSql = `
      SELECT 
        COUNT(DISTINCT o.id) AS total_orders,
        COALESCE(SUM(CASE WHEN o.order_status != 'cancelled' THEN o.total_amount ELSE 0 END), 0) AS total_revenue,
        COUNT(DISTINCT CASE WHEN o.order_status = 'delivered' THEN o.id END) AS delivered_orders,
        COUNT(DISTINCT CASE WHEN o.order_status = 'ordered' THEN o.id END) AS pending_orders,
        (SELECT COUNT(*) FROM users WHERE role = 'customer') AS total_customers,
        (SELECT COUNT(*) FROM products WHERE is_active = 1) AS total_products,
        (SELECT COUNT(*) FROM products WHERE stock_quantity <= 20 AND is_active = 1) AS low_stock_count
      FROM orders o
    `;
    const kpi = await queryOne(kpiSql);

    // 2. Recent 6 orders
    const recentOrders = await query(`
      SELECT 
        o.id, o.order_number, o.created_at, o.customer_name, o.customer_email,
        o.total_amount, o.order_status, o.payment_status, o.payment_method
      FROM orders o
      ORDER BY o.created_at DESC
      LIMIT 6
    `);

    // 3. Category revenue distribution
    const categoryStats = await query(`
      SELECT 
        c.name AS category_name,
        COUNT(DISTINCT oi.order_id) AS total_orders,
        COALESCE(SUM(oi.quantity), 0) AS units_sold,
        COALESCE(SUM(oi.total_price), 0) AS total_revenue
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id
      LEFT JOIN order_items oi ON p.id = oi.product_id
      LEFT JOIN orders o ON oi.order_id = o.id AND o.order_status != 'cancelled'
      GROUP BY c.id, c.name
      ORDER BY total_revenue DESC
    `);

    // 4. Low stock products alert
    const lowStockItems = await query(`
      SELECT p.id, p.name, p.sku, p.stock_quantity, p.price, c.name AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.stock_quantity <= 25 AND p.is_active = 1
      ORDER BY p.stock_quantity ASC
      LIMIT 6
    `);

    return successResponse(res, {
      kpi,
      recentOrders,
      categoryStats,
      lowStockItems,
    }, 'Admin dashboard metrics.');
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/products
const getAdminProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, q, category_id, stock_filter } = req.query;
    const offset = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
    const conditions = ['1=1'];
    const params = [];

    if (q && q.trim()) {
      conditions.push('(p.name LIKE ? OR p.sku LIKE ? OR p.brand LIKE ?)');
      const sp = `%${q.trim()}%`;
      params.push(sp, sp, sp);
    }

    if (category_id) {
      conditions.push('p.category_id = ?');
      params.push(category_id);
    }

    if (stock_filter === 'low') {
      conditions.push('p.stock_quantity <= 20');
    } else if (stock_filter === 'out') {
      conditions.push('p.stock_quantity = 0');
    }

    const where = `WHERE ${conditions.join(' AND ')}`;

    const countSql = `SELECT COUNT(*) AS total FROM products p ${where}`;
    const countResult = await queryOne(countSql, params);
    const total = countResult ? countResult.total : 0;

    const dataSql = `
      SELECT 
        p.*,
        c.name AS category_name,
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) AS primary_image
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ${where}
      ORDER BY p.id DESC
      LIMIT ? OFFSET ?
    `;

    const products = await query(dataSql, [...params, parseInt(limit, 10), offset]);
    return paginatedResponse(res, products, page, limit, total, 'Admin product list.');
  } catch (error) {
    next(error);
  }
};

// POST /api/admin/products
const createProduct = async (req, res, next) => {
  const connection = await pool.getConnection();
  try {
    const {
      category_id,
      name,
      brand,
      description,
      short_description,
      price,
      original_price,
      stock_quantity = 0,
      sku,
      image_url,
      is_featured = false,
      is_trending = false,
      is_deal_of_day = false,
    } = req.body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + `-${Date.now().toString().slice(-4)}`;
    const productSku = sku || `SKU-${Date.now().toString().slice(-6)}`;

    await connection.beginTransaction();

    const [insertResult] = await connection.execute(`
      INSERT INTO products (
        category_id, name, slug, brand, sku, description, short_description,
        price, original_price, stock_quantity, is_featured, is_trending, is_deal_of_day
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      category_id, name.trim(), slug, brand.trim(), productSku,
      description.trim(), short_description || null,
      price, original_price || price, stock_quantity,
      is_featured ? 1 : 0, is_trending ? 1 : 0, is_deal_of_day ? 1 : 0
    ]);

    const productId = insertResult.insertId;

    if (image_url) {
      await connection.execute(`
        INSERT INTO product_images (product_id, image_url, is_primary)
        VALUES (?, ?, 1)
      `, [productId, image_url.trim()]);
    }

    await connection.commit();

    const product = await queryOne('SELECT * FROM products WHERE id = ?', [productId]);
    return successResponse(res, product, 'Product created successfully.', 201);
  } catch (error) {
    await connection.rollback();
    next(error);
  } finally {
    connection.release();
  }
};

// PUT /api/admin/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      category_id,
      name,
      brand,
      description,
      short_description,
      price,
      original_price,
      stock_quantity,
      is_featured,
      is_trending,
      is_deal_of_day,
      is_active,
      image_url,
    } = req.body;

    await query(`
      UPDATE products SET
        category_id = COALESCE(?, category_id),
        name = COALESCE(?, name),
        brand = COALESCE(?, brand),
        description = COALESCE(?, description),
        short_description = COALESCE(?, short_description),
        price = COALESCE(?, price),
        original_price = COALESCE(?, original_price),
        stock_quantity = COALESCE(?, stock_quantity),
        is_featured = COALESCE(?, is_featured),
        is_trending = COALESCE(?, is_trending),
        is_deal_of_day = COALESCE(?, is_deal_of_day),
        is_active = COALESCE(?, is_active)
      WHERE id = ?
    `, [
      category_id || null, name || null, brand || null,
      description || null, short_description || null,
      price || null, original_price || null, stock_quantity !== undefined ? stock_quantity : null,
      is_featured !== undefined ? (is_featured ? 1 : 0) : null,
      is_trending !== undefined ? (is_trending ? 1 : 0) : null,
      is_deal_of_day !== undefined ? (is_deal_of_day ? 1 : 0) : null,
      is_active !== undefined ? (is_active ? 1 : 0) : null,
      id
    ]);

    if (image_url) {
      const existingImg = await queryOne('SELECT id FROM product_images WHERE product_id = ? AND is_primary = 1', [id]);
      if (existingImg) {
        await query('UPDATE product_images SET image_url = ? WHERE id = ?', [image_url, existingImg.id]);
      } else {
        await query('INSERT INTO product_images (product_id, image_url, is_primary) VALUES (?, ?, 1)', [id, image_url]);
      }
    }

    const updated = await queryOne('SELECT * FROM products WHERE id = ?', [id]);
    return successResponse(res, updated, 'Product updated successfully.');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admin/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if product is part of existing orders
    const orderCheck = await queryOne('SELECT id FROM order_items WHERE product_id = ? LIMIT 1', [id]);
    if (orderCheck) {
      // Soft deactivate to preserve historical integrity as required by prompt Section 7
      await query('UPDATE products SET is_active = 0 WHERE id = ?', [id]);
      return successResponse(
        res,
        { id, soft_deleted: true },
        'Product has historical orders. Deactivated from catalog to preserve order records.'
      );
    }

    await query('DELETE FROM products WHERE id = ?', [id]);
    return successResponse(res, { id, soft_deleted: false }, 'Product permanently deleted.');
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/products/:id/stock
const updateProductStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { stock_quantity } = req.body;

    if (stock_quantity === undefined || stock_quantity < 0) {
      return errorResponse(res, 'Valid non-negative stock quantity required.', 400);
    }

    await query('UPDATE products SET stock_quantity = ? WHERE id = ?', [stock_quantity, id]);
    return successResponse(res, { id, stock_quantity }, 'Stock updated successfully.');
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/orders
const getAdminOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20, q } = req.query;
    const offset = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
    const conditions = ['1=1'];
    const params = [];

    if (status && status !== 'all') {
      conditions.push('o.order_status = ?');
      params.push(status);
    }

    if (q && q.trim()) {
      conditions.push('(o.order_number LIKE ? OR o.customer_name LIKE ? OR o.customer_email LIKE ?)');
      const sp = `%${q.trim()}%`;
      params.push(sp, sp, sp);
    }

    const where = `WHERE ${conditions.join(' AND ')}`;

    const countResult = await queryOne(`SELECT COUNT(*) AS total FROM orders o ${where}`, params);
    const total = countResult ? countResult.total : 0;

    const orders = await query(`
      SELECT 
        o.*,
        COUNT(oi.id) AS items_count
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      ${where}
      GROUP BY o.id
      ORDER BY o.created_at DESC
      LIMIT ? OFFSET ?
    `, [...params, parseInt(limit, 10), offset]);

    return paginatedResponse(res, orders, page, limit, total, 'Admin orders list.');
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/orders/:id/status
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, payment_status } = req.body;

    const validStatuses = ['ordered', 'confirmed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return errorResponse(res, `Invalid order status. Allowed: ${validStatuses.join(', ')}`, 400);
    }

    const order = await queryOne('SELECT * FROM orders WHERE id = ?', [id]);
    if (!order) {
      return errorResponse(res, 'Order not found.', 404);
    }

    let updatedPaymentStatus = payment_status || order.payment_status;
    if (status === 'delivered' && order.payment_method === 'cod') {
      updatedPaymentStatus = 'paid';
    }

    await query(`
      UPDATE orders SET 
        order_status = ?,
        payment_status = ?
      WHERE id = ?
    `, [status, updatedPaymentStatus, id]);

    // Send status notification to customer
    const statusTitles = {
      confirmed: 'Order Confirmed!',
      shipped: 'Order Shipped via Courier!',
      out_for_delivery: 'Out for Delivery Today!',
      delivered: 'Package Delivered Successfully!',
      cancelled: 'Order Cancelled by Store',
    };

    if (statusTitles[status]) {
      await query(`
        INSERT INTO notifications (user_id, title, message, type, reference_id)
        VALUES (?, ?, ?, 'order', ?)
      `, [
        order.user_id,
        statusTitles[status],
        `Your order ${order.order_number} status has been updated to ${status.replace(/_/g, ' ').toUpperCase()}.`,
        order.order_number,
      ]);
    }

    const updated = await queryOne('SELECT * FROM orders WHERE id = ?', [id]);
    return successResponse(res, updated, 'Order status updated.');
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/customers
const getCustomers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, q } = req.query;
    const offset = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
    const conditions = ["u.role = 'customer'"];
    const params = [];

    if (q && q.trim()) {
      conditions.push('(u.name LIKE ? OR u.email LIKE ? OR u.phone LIKE ?)');
      const sp = `%${q.trim()}%`;
      params.push(sp, sp, sp);
    }

    const where = `WHERE ${conditions.join(' AND ')}`;

    const countResult = await queryOne(`SELECT COUNT(*) AS total FROM users u ${where}`, params);
    const total = countResult ? countResult.total : 0;

    const customers = await query(`
      SELECT 
        u.id, u.name, u.email, u.phone, u.avatar_url, u.is_active, u.created_at,
        COUNT(DISTINCT o.id) AS total_orders,
        COALESCE(SUM(CASE WHEN o.order_status != 'cancelled' THEN o.total_amount ELSE 0 END), 0) AS total_spend
      FROM users u
      LEFT JOIN orders o ON u.id = o.user_id
      ${where}
      GROUP BY u.id
      ORDER BY total_spend DESC, u.created_at DESC
      LIMIT ? OFFSET ?
    `, [...params, parseInt(limit, 10), offset]);

    return paginatedResponse(res, customers, page, limit, total, 'Customer directory.');
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/reports/sales
const getSalesReports = async (req, res, next) => {
  try {
    // 1. Daily revenue for the last 30 days
    const dailyRevenue = await query(`
      SELECT 
        DATE(o.created_at) AS sale_date,
        COUNT(o.id) AS orders_count,
        SUM(o.subtotal) AS daily_subtotal,
        SUM(o.discount_amount) AS daily_discounts,
        SUM(o.tax_amount) AS daily_tax,
        SUM(o.total_amount) AS daily_net_revenue
      FROM orders o
      WHERE o.order_status != 'cancelled'
        AND o.created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY DATE(o.created_at)
      ORDER BY sale_date ASC
    `);

    // 2. Category performance
    const categoryBreakdown = await query(`
      SELECT 
        c.name AS category_name,
        COUNT(DISTINCT oi.order_id) AS orders_count,
        SUM(oi.quantity) AS units_sold,
        SUM(oi.total_price) AS gross_sales
      FROM categories c
      JOIN products p ON c.id = p.category_id
      JOIN order_items oi ON p.id = oi.product_id
      JOIN orders o ON oi.order_id = o.id AND o.order_status != 'cancelled'
      GROUP BY c.id, c.name
      ORDER BY gross_sales DESC
    `);

    // 3. Order status summary
    const statusSummary = await query(`
      SELECT 
        order_status,
        COUNT(id) AS count,
        SUM(total_amount) AS total_value
      FROM orders
      GROUP BY order_status
    `);

    return successResponse(res, {
      dailyRevenue,
      categoryBreakdown,
      statusSummary,
    }, 'Detailed sales reports.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
  getAdminOrders,
  updateOrderStatus,
  getCustomers,
  getSalesReports,
};
