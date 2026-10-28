/**
 * Server-authoritative calculations for Cart, Checkout, and Orders
 * GST (Goods and Services Tax): Standard 18%
 * Delivery Charge: ₹99 for orders under ₹1,000; Free for orders ₹1,000+
 */

const round = (val) => Math.round((Number(val) + Number.EPSILON) * 100) / 100;

const calculateOrderTotals = ({ items, coupon = null }) => {
  // 1. Calculate raw subtotal from verified item list
  const subtotal = round(
    items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0)
  );

  // 2. Calculate discount from verified coupon
  let discountAmount = 0;
  if (coupon && coupon.is_active) {
    const minOrder = Number(coupon.min_order_amount) || 0;
    if (subtotal >= minOrder) {
      if (coupon.discount_type === 'percentage') {
        const calculatedDiscount = (subtotal * Number(coupon.discount_value)) / 100;
        const maxDiscount = coupon.max_discount_amount ? Number(coupon.max_discount_amount) : Infinity;
        discountAmount = round(Math.min(calculatedDiscount, maxDiscount));
      } else if (coupon.discount_type === 'flat') {
        discountAmount = round(Math.min(Number(coupon.discount_value), subtotal));
      }
    }
  }

  // 3. Taxable value after discount
  const taxableSubtotal = Math.max(0, subtotal - discountAmount);

  // 4. Delivery charge: Free above 1000, or if coupon is FREESHIP
  let deliveryCharge = subtotal >= 1000 || subtotal === 0 ? 0 : 99;
  if (coupon && coupon.code === 'FREESHIP' && subtotal >= 499) {
    deliveryCharge = 0;
  }

  // 5. 18% GST on taxable goods
  const taxAmount = round(taxableSubtotal * 0.18);

  // 6. Final grand total
  const totalAmount = round(taxableSubtotal + deliveryCharge + taxAmount);

  return {
    subtotal,
    discountAmount,
    deliveryCharge,
    taxAmount,
    totalAmount,
  };
};

module.exports = {
  round,
  calculateOrderTotals,
};
