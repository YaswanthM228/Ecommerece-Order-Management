const { query, queryOne } = require('../config/db');
const { calculateOrderTotals } = require('../utils/calculations');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// Helper to ensure user has a cart
const getOrCreateCartId = async (userId) => {
  let cart = await queryOne('SELECT id FROM carts WHERE user_id = ?', [userId]);
  if (!cart) {
    const res = await query('INSERT INTO carts (user_id) VALUES (?)', [userId]);
    return res.insertId;
  }
  return cart.id;
};

// GET /api/cart
const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cartId = await getOrCreateCartId(userId);

    const items = await query(`
      SELECT 
        ci.id AS cart_item_id,
        ci.quantity,
        p.id AS product_id,
        p.name,
        p.slug,
        p.brand,
        p.sku,
        p.price,
        p.original_price,
        p.discount_percent,
        p.stock_quantity,
        pv.id AS variant_id,
        pv.variant_type,
        pv.variant_value,
        pv.price_modifier,
        COALESCE(
          (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1),
          (SELECT image_url FROM product_images WHERE product_id = p.id LIMIT 1),
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
        ) AS image_url
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      LEFT JOIN product_variants pv ON ci.variant_id = pv.id
      WHERE ci.cart_id = ? AND p.is_active = 1
      ORDER BY ci.created_at DESC
    `, [cartId]);

    // Format items with effective price (including variant modifier)
    const formattedItems = items.map((item) => {
      const unitPrice = Number(item.price) + Number(item.price_modifier || 0);
      const itemTotal = unitPrice * item.quantity;
      return {
        ...item,
        unit_price: unitPrice,
        item_total: itemTotal,
      };
    });

    const totals = calculateOrderTotals({
      items: formattedItems.map((i) => ({ price: i.unit_price, quantity: i.quantity })),
    });

    return successResponse(res, {
      items: formattedItems,
      ...totals,
    }, 'Cart contents.');
  } catch (error) {
    next(error);
  }
};

// POST /api/cart/add
const addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { product_id, variant_id = null, quantity = 1 } = req.body;

    const product = await queryOne(
      'SELECT id, name, price, stock_quantity, is_active FROM products WHERE id = ?',
      [product_id]
    );

    if (!product || !product.is_active) {
      return errorResponse(res, 'Product is unavailable.', 404);
    }

    if (product.stock_quantity <= 0) {
      return errorResponse(res, 'This product is currently out of stock.', 400);
    }

    const cartId = await getOrCreateCartId(userId);

    // Check if item already exists in cart
    const existingItem = await queryOne(
      'SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ? AND (variant_id = ? OR (variant_id IS NULL AND ? IS NULL))',
      [cartId, product_id, variant_id, variant_id]
    );

    const newQuantity = (existingItem ? existingItem.quantity : 0) + parseInt(quantity, 10);

    if (newQuantity > product.stock_quantity) {
      return errorResponse(
        res,
        `Cannot add more items. Available stock is only ${product.stock_quantity} units.`,
        400
      );
    }

    if (existingItem) {
      await query('UPDATE cart_items SET quantity = ? WHERE id = ?', [newQuantity, existingItem.id]);
    } else {
      await query(
        'INSERT INTO cart_items (cart_id, product_id, variant_id, quantity) VALUES (?, ?, ?, ?)',
        [cartId, product_id, variant_id, Math.max(1, parseInt(quantity, 10))]
      );
    }

    return getCart(req, res, next);
  } catch (error) {
    next(error);
  }
};

// PUT /api/cart/items/:id
const updateQuantity = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cartItemId = req.params.id;
    const { quantity } = req.body;
    const qty = parseInt(quantity, 10);

    const cartId = await getOrCreateCartId(userId);
    const item = await queryOne(`
      SELECT ci.id, ci.product_id, p.stock_quantity
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.id = ? AND ci.cart_id = ?
    `, [cartItemId, cartId]);

    if (!item) {
      return errorResponse(res, 'Cart item not found.', 404);
    }

    if (qty <= 0) {
      await query('DELETE FROM cart_items WHERE id = ?', [cartItemId]);
      return getCart(req, res, next);
    }

    if (qty > item.stock_quantity) {
      return errorResponse(
        res,
        `Cannot select ${qty} units. Maximum available stock is ${item.stock_quantity}.`,
        400
      );
    }

    await query('UPDATE cart_items SET quantity = ? WHERE id = ?', [qty, cartItemId]);
    return getCart(req, res, next);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/cart/items/:id
const removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cartItemId = req.params.id;
    const cartId = await getOrCreateCartId(userId);

    await query('DELETE FROM cart_items WHERE id = ? AND cart_id = ?', [cartItemId, cartId]);
    return getCart(req, res, next);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/cart/clear
const clearCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cartId = await getOrCreateCartId(userId);

    await query('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
    return successResponse(res, null, 'Cart cleared.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
};
