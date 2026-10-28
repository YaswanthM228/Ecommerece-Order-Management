const { query, queryOne } = require('../config/db');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// GET /api/reviews/product/:productId
const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await query(`
      SELECT 
        r.id, r.rating, r.title, r.comment, r.is_verified_purchase, r.created_at,
        u.name AS user_name, u.avatar_url
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.product_id = ?
      ORDER BY r.created_at DESC
    `, [productId]);

    return successResponse(res, reviews, 'Product customer reviews.');
  } catch (error) {
    next(error);
  }
};

// POST /api/reviews
const addReview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { product_id, rating, title, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return errorResponse(res, 'Rating must be between 1 and 5 stars.', 400);
    }
    if (!comment || !comment.trim()) {
      return errorResponse(res, 'Review comment is required.', 400);
    }

    // Check if user has purchased this product
    const purchaseCheck = await queryOne(`
      SELECT oi.id
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE o.user_id = ? AND oi.product_id = ? AND o.order_status = 'delivered'
      LIMIT 1
    `, [userId, product_id]);

    const isVerified = !!purchaseCheck;

    // Check for existing review
    const existing = await queryOne(
      'SELECT id FROM reviews WHERE user_id = ? AND product_id = ?',
      [userId, product_id]
    );

    if (existing) {
      await query(`
        UPDATE reviews SET rating = ?, title = ?, comment = ?, is_verified_purchase = ?
        WHERE id = ?
      `, [rating, title || null, comment.trim(), isVerified ? 1 : 0, existing.id]);
    } else {
      await query(`
        INSERT INTO reviews (product_id, user_id, rating, title, comment, is_verified_purchase)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [product_id, userId, rating, title || null, comment.trim(), isVerified ? 1 : 0]);
    }

    // Recalculate average rating & review count for product
    const stats = await queryOne(`
      SELECT COUNT(*) AS count, AVG(rating) AS avg_rating
      FROM reviews
      WHERE product_id = ?
    `, [product_id]);

    await query(`
      UPDATE products SET 
        rating = ?,
        review_count = ?
      WHERE id = ?
    `, [
      Math.round(Number(stats.avg_rating) * 100) / 100,
      stats.count,
      product_id
    ]);

    return successResponse(res, null, 'Review submitted successfully.', 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductReviews,
  addReview,
};
