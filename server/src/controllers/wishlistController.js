const { query, queryOne } = require('../config/db');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const getOrCreateWishlistId = async (userId) => {
  let wishlist = await queryOne('SELECT id FROM wishlists WHERE user_id = ?', [userId]);
  if (!wishlist) {
    const res = await query('INSERT INTO wishlists (user_id) VALUES (?)', [userId]);
    return res.insertId;
  }
  return wishlist.id;
};

// GET /api/wishlist
const getWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const wishlistId = await getOrCreateWishlistId(userId);

    const items = await query(`
      SELECT 
        wi.id AS wishlist_item_id,
        wi.created_at AS added_at,
        p.id AS product_id,
        p.name,
        p.slug,
        p.brand,
        p.price,
        p.original_price,
        p.discount_percent,
        p.stock_quantity,
        p.rating,
        p.review_count,
        COALESCE(
          (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1),
          (SELECT image_url FROM product_images WHERE product_id = p.id LIMIT 1),
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
        ) AS image_url
      FROM wishlist_items wi
      JOIN products p ON wi.product_id = p.id
      WHERE wi.wishlist_id = ? AND p.is_active = 1
      ORDER BY wi.created_at DESC
    `, [wishlistId]);

    return successResponse(res, items, 'Wishlist items.');
  } catch (error) {
    next(error);
  }
};

// POST /api/wishlist/toggle
const toggleWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { product_id } = req.body;

    const wishlistId = await getOrCreateWishlistId(userId);
    const existing = await queryOne(
      'SELECT id FROM wishlist_items WHERE wishlist_id = ? AND product_id = ?',
      [wishlistId, product_id]
    );

    let isWishlisted = false;
    if (existing) {
      await query('DELETE FROM wishlist_items WHERE id = ?', [existing.id]);
      isWishlisted = false;
    } else {
      await query('INSERT INTO wishlist_items (wishlist_id, product_id) VALUES (?, ?)', [wishlistId, product_id]);
      isWishlisted = true;
    }

    return successResponse(
      res,
      { isWishlisted, product_id },
      isWishlisted ? 'Product added to wishlist.' : 'Product removed from wishlist.'
    );
  } catch (error) {
    next(error);
  }
};

// DELETE /api/wishlist/:productId
const removeFromWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const wishlistId = await getOrCreateWishlistId(userId);

    await query('DELETE FROM wishlist_items WHERE wishlist_id = ? AND product_id = ?', [wishlistId, productId]);
    return successResponse(res, { product_id: productId }, 'Removed from wishlist.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWishlist,
  toggleWishlist,
  removeFromWishlist,
};
