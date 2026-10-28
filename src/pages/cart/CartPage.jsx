import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Heart,
  ArrowRight,
  ShieldCheck,
  Tag,
  ShoppingBag,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartItemCount,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    coupon,
    applyCoupon,
    removeCoupon,
    toggleWishlist
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 sm:p-16 text-center">
        <div className="w-24 h-24 rounded-full bg-violet-50 dark:bg-[#121940] text-brand-violet flex items-center justify-center mx-auto mb-6 shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">
          Explore our latest deals and top categories to discover amazing gadgets, apparel, and home essentials.
        </p>
        <Link
          to="/deals"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-105 transition-all"
        >
          <span>Explore Today's Deals</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-violet-900/30">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Shopping Cart
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            You have <span className="font-bold text-brand-violet">{cartItemCount}</span> items in your cart
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Cart</span>
        </button>
      </div>

      {/* Main Grid: Items + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List (Col 8) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#0E1433] rounded-3xl p-4 sm:p-5 border border-gray-100 dark:border-violet-950/40 shadow-sm flex flex-col sm:flex-row gap-5 items-center hover:shadow-card-hover transition-all"
            >
              {/* Product Thumbnail */}
              <Link to={`/product/${item.id}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-2xl bg-gray-50 dark:bg-[#121940] p-2"
                />
              </Link>

              {/* Product Details */}
              <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-violet">
                  {item.brand || item.category}
                </span>
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white hover:text-brand-violet line-clamp-1">
                    {item.name}
                  </h3>
                </Link>
                <p className="text-xs text-gray-400 line-clamp-1">{item.subtitle}</p>

                <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                  <span className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white">
                    {formatCurrency(item.price)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatCurrency(item.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Controls & Total */}
              <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto justify-between items-center border-t sm:border-t-0 border-gray-100 dark:border-violet-900/30 pt-3 sm:pt-0">
                <div className="flex items-center bg-gray-100 dark:bg-[#111836] rounded-xl border border-gray-200 dark:border-violet-900/40 p-1">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-violet-900/40 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-xs">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-violet-900/40 transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      toggleWishlist(item.id);
                      removeFromCart(item.id);
                    }}
                    className="text-xs text-gray-500 hover:text-brand-violet flex items-center gap-1 transition-colors"
                    title="Move to Wishlist"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                  <span className="text-gray-300 dark:text-gray-700">|</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>

                <span className="text-sm font-extrabold text-brand-violet">
                  Total: {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-violet hover:underline pt-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Order Summary Sidebar (Col 4) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-6 sticky top-24">
          <h2 className="text-base font-extrabold text-gray-900 dark:text-white border-b border-gray-100 dark:border-violet-900/30 pb-3">
            Order Summary
          </h2>

          {/* Coupon Code Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-brand-violet" />
              <span>Apply Discount Voucher</span>
            </label>
            {coupon.applied ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs">
                <div>
                  <span className="font-extrabold text-emerald-700 dark:text-emerald-400">
                    {coupon.code}
                  </span>
                  <span className="text-emerald-600 block text-[11px]">10% Off Applied</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-rose-500 font-bold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Try: SPHERE10"
                  className="flex-1 px-3 py-2 text-xs bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 rounded-xl focus:outline-none focus:border-brand-violet uppercase"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-violet hover:bg-brand-violet-deep text-white text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-3 text-xs border-t border-gray-100 dark:border-violet-900/30 pt-4">
            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>Subtotal ({cartItemCount} items)</span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(cartSubtotal)}</span>
            </div>

            {coupon.applied && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>Coupon Discount (10%)</span>
                <span>-{formatCurrency(cartDiscount)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-1">
                Estimated Delivery
                <span className="text-[10px] text-gray-400">(Free above ₹999)</span>
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {cartShipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatCurrency(cartShipping)}
              </span>
            </div>

            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>Estimated GST (18%)</span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(cartTax)}</span>
            </div>

            <div className="border-t border-gray-200 dark:border-violet-900/40 pt-3 flex justify-between text-base font-black text-gray-900 dark:text-white">
              <span>Grand Total</span>
              <span className="text-brand-violet text-lg">{formatCurrency(cartTotal)}</span>
            </div>
          </div>

          {/* Checkout CTA Button */}
          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-600/30 transition-all active:scale-[0.98]"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Trust Banner */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-violet-50/50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/30 text-[11px] text-gray-500 dark:text-gray-400">
            <ShieldCheck className="w-5 h-5 text-brand-violet shrink-0" />
            <span>Guaranteed Safe & Secure Checkout with 256-bit SSL encryption.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
