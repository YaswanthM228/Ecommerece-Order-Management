const { query, queryOne } = require('../config/db');
const { calculateOrderTotals } = require('../utils/calculations');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// POST /api/coupons/validate
const validateCoupon = async (req, res, next) => {
  try {
    const { code, subtotal } = req.body;
    if (!code) {
      return errorResponse(res, 'Coupon code is required.', 400);
    }

    const orderSubtotal = parseFloat(subtotal) || 0;

    const coupon = await queryOne(
      'SELECT * FROM coupons WHERE UPPER(code) = UPPER(?) AND is_active = 1 AND (valid_until IS NULL OR valid_until > NOW())',
      [code.trim()]
    );

    if (!coupon) {
      return errorResponse(res, 'Invalid or expired promotional coupon code.', 400);
    }

    if (orderSubtotal < Number(coupon.min_order_amount)) {
      return errorResponse(
        res,
        `Coupon '${coupon.code}' requires a minimum order amount of ₹${coupon.min_order_amount}.`,
        400
      );
    }

    if (coupon.usage_limit && coupon.times_used >= coupon.usage_limit) {
      return errorResponse(res, 'This coupon has reached its maximum usage limit.', 400);
    }

    // Calculate preview savings
    let discountAmount = 0;
    if (coupon.discount_type === 'percentage') {
      discountAmount = (orderSubtotal * Number(coupon.discount_value)) / 100;
      if (coupon.max_discount_amount) {
        discountAmount = Math.min(discountAmount, Number(coupon.max_discount_amount));
      }
    } else {
      discountAmount = Math.min(Number(coupon.discount_value), orderSubtotal);
    }

    return successResponse(res, {
      code: coupon.code,
      description: coupon.description,
      discount_type: coupon.discount_type,
      discount_value: Number(coupon.discount_value),
      discount_amount: Math.round(discountAmount * 100) / 100,
      min_order_amount: Number(coupon.min_order_amount),
    }, 'Coupon applied successfully.');
  } catch (error) {
    next(error);
  }
};

// GET /api/coupons
const getActiveCoupons = async (req, res, next) => {
  try {
    const coupons = await query(`
      SELECT code, description, discount_type, discount_value, min_order_amount, max_discount_amount
      FROM coupons
      WHERE is_active = 1 AND (valid_until IS NULL OR valid_until > NOW())
      ORDER BY min_order_amount ASC
    `);
    return successResponse(res, coupons, 'Active promotional offers.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateCoupon,
  getActiveCoupons,
};
