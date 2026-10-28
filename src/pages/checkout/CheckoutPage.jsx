import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Check,
  MapPin,
  CreditCard,
  Truck,
  ArrowRight,
  Sparkles,
  Smartphone,
  Lock
} from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTax,
    cartTotal,
    addOrder,
    user
  } = useShop();

  // Address Form State
  const [formData, setFormData] = useState({
    name: user?.name || 'Yash Sharma',
    email: user?.email || 'yash.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Skyline Towers, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038'
  });

  const [deliveryMethod, setDeliveryMethod] = useState('standard'); // standard | express
  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi | card | netbanking | cod
  const [upiId, setUpiId] = useState('yash@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [errors, setErrors] = useState({});

  const shippingCost = deliveryMethod === 'express' ? 149 : cartShipping;
  const finalTotal = cartSubtotal - cartDiscount + shippingCost + cartTax;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handlePrefillDemo = () => {
    setFormData({
      name: 'Yash Sharma',
      email: 'yash.sharma@example.com',
      phone: '+91 98765 43210',
      address: 'Flat 402, Skyline Towers, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Basic Validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.pincode.trim() || formData.pincode.length !== 6) newErrors.pincode = 'Valid 6-digit PIN code required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create Order
    const newOrder = addOrder({
      customer: formData,
      items: cart,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: shippingCost,
      tax: cartTax,
      total: finalTotal,
      paymentMethod:
        paymentMethod === 'upi'
          ? `UPI (${upiId})`
          : paymentMethod === 'card'
          ? 'Credit Card'
          : paymentMethod === 'netbanking'
          ? 'NetBanking'
          : 'Cash on Delivery',
      deliveryMethod: deliveryMethod === 'express' ? 'Express Next-Day' : 'Standard Delivery'
    });

    navigate(`/order-confirmation/${newOrder.id}`);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto p-12 text-center">
        <p className="text-gray-500 mb-4">No items to checkout.</p>
        <button
          onClick={() => navigate('/products')}
          className="px-6 py-2.5 rounded-full bg-brand-violet text-white text-xs font-bold"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-gray-200 dark:border-violet-900/30 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Secure Checkout
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Demo checkout simulation • No real payments charged
          </p>
        </div>
        <button
          onClick={handlePrefillDemo}
          className="px-3.5 py-1.5 rounded-xl bg-violet-100 dark:bg-violet-950 text-brand-violet text-xs font-bold flex items-center gap-1.5 hover:bg-violet-200 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pre-fill Demo Data</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checkout Forms (Col 8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Delivery Address */}
          <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-violet-900/30">
              <span className="w-6 h-6 rounded-full bg-brand-violet text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                Delivery Address
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-[#111836] border rounded-xl focus:outline-none focus:border-brand-violet ${
                    errors.name ? 'border-rose-500' : 'border-gray-200 dark:border-violet-900/40'
                  }`}
                />
                {errors.name && <p className="text-[10px] text-rose-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Phone Number *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-[#111836] border rounded-xl focus:outline-none focus:border-brand-violet ${
                    errors.phone ? 'border-rose-500' : 'border-gray-200 dark:border-violet-900/40'
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-[#111836] border rounded-xl focus:outline-none focus:border-brand-violet ${
                    errors.email ? 'border-rose-500' : 'border-gray-200 dark:border-violet-900/40'
                  }`}
                />
                {errors.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Flat / House No. / Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-[#111836] border rounded-xl focus:outline-none focus:border-brand-violet ${
                    errors.address ? 'border-rose-500' : 'border-gray-200 dark:border-violet-900/40'
                  }`}
                />
                {errors.address && <p className="text-[10px] text-rose-500 mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 rounded-xl focus:outline-none focus:border-brand-violet"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  PIN Code *
                </label>
                <input
                  type="text"
                  name="pincode"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className={`w-full px-3.5 py-2.5 text-xs bg-gray-50 dark:bg-[#111836] border rounded-xl focus:outline-none focus:border-brand-violet ${
                    errors.pincode ? 'border-rose-500' : 'border-gray-200 dark:border-violet-900/40'
                  }`}
                />
                {errors.pincode && <p className="text-[10px] text-rose-500 mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Method */}
          <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-violet-900/30">
              <span className="w-6 h-6 rounded-full bg-brand-violet text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                Delivery Options
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                onClick={() => setDeliveryMethod('standard')}
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                  deliveryMethod === 'standard'
                    ? 'border-brand-violet bg-violet-50/50 dark:bg-violet-950/30'
                    : 'border-gray-200 dark:border-violet-900/40'
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === 'standard'}
                  onChange={() => setDeliveryMethod('standard')}
                  className="mt-1 text-brand-violet focus:ring-brand-violet"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">Standard Delivery</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.2 rounded-full">
                      {cartShipping === 0 ? 'FREE' : formatCurrency(cartShipping)}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">Delivered within 2 - 4 business days</p>
                </div>
              </label>

              <label
                onClick={() => setDeliveryMethod('express')}
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-start gap-3 transition-all ${
                  deliveryMethod === 'express'
                    ? 'border-brand-violet bg-violet-50/50 dark:bg-violet-950/30'
                    : 'border-gray-200 dark:border-violet-900/40'
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === 'express'}
                  onChange={() => setDeliveryMethod('express')}
                  className="mt-1 text-brand-violet focus:ring-brand-violet"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">Express Next-Day</span>
                    <span className="text-[10px] font-bold text-violet-600 bg-violet-100 px-2 py-0.2 rounded-full">
                      ₹149
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">Guaranteed delivery by tomorrow evening</p>
                </div>
              </label>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100 dark:border-violet-900/30">
              <span className="w-6 h-6 rounded-full bg-brand-violet text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                Payment Method (Demo Simulator)
              </h3>
            </div>

            <div className="space-y-3">
              {/* UPI Option */}
              <label
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-2xl border-2 cursor-pointer block transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-brand-violet bg-violet-50/50 dark:bg-violet-950/30'
                    : 'border-gray-200 dark:border-violet-900/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="text-brand-violet focus:ring-brand-violet"
                    />
                    <div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        UPI (Google Pay, PhonePe, Paytm, BHIM)
                      </span>
                      <p className="text-[11px] text-gray-500">Instant instant zero-fee transfer</p>
                    </div>
                  </div>
                  <Smartphone className="w-5 h-5 text-brand-violet" />
                </div>
                {paymentMethod === 'upi' && (
                  <div className="mt-3 pt-3 border-t border-violet-200/50 dark:border-violet-900/50">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@bank"
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 rounded-xl focus:outline-none focus:border-brand-violet"
                    />
                  </div>
                )}
              </label>

              {/* Cards Option */}
              <label
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border-2 cursor-pointer block transition-all ${
                  paymentMethod === 'card'
                    ? 'border-brand-violet bg-violet-50/50 dark:bg-violet-950/30'
                    : 'border-gray-200 dark:border-violet-900/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-brand-violet focus:ring-brand-violet"
                    />
                    <div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        Credit / Debit Card
                      </span>
                      <p className="text-[11px] text-gray-500">Visa, MasterCard, RuPay, Amex</p>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-gray-400" />
                </div>
              </label>

              {/* Cash on Delivery */}
              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border-2 cursor-pointer block transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-brand-violet bg-violet-50/50 dark:bg-violet-950/30'
                    : 'border-gray-200 dark:border-violet-900/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-brand-violet focus:ring-brand-violet"
                    />
                    <div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        Cash on Delivery (COD)
                      </span>
                      <p className="text-[11px] text-gray-500">Pay when your order arrives at your door</p>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Review Sidebar (Col 4) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-6 sticky top-24">
          <h2 className="text-base font-extrabold text-gray-900 dark:text-white border-b border-gray-100 dark:border-violet-900/30 pb-3">
            Review Your Order
          </h2>

          {/* Cart Mini List */}
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-xs">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-contain bg-gray-50 dark:bg-[#121940] p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white truncate">{item.name}</p>
                  <p className="text-gray-400 text-[11px]">Qty: {item.quantity}</p>
                </div>
                <span className="font-extrabold text-gray-800 dark:text-gray-200">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Breakdown */}
          <div className="space-y-2.5 text-xs border-t border-gray-100 dark:border-violet-900/30 pt-4">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(cartSubtotal)}</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount</span>
                <span>-{formatCurrency(cartDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Delivery Charges</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost)}
              </span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Estimated Tax (18%)</span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(cartTax)}</span>
            </div>
            <div className="border-t border-gray-200 dark:border-violet-900/40 pt-3 flex justify-between text-base font-black text-gray-900 dark:text-white">
              <span>Total Payable</span>
              <span className="text-brand-violet text-lg">{formatCurrency(finalTotal)}</span>
            </div>
          </div>

          {/* Submit Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-violet-600/30 active:scale-[0.98] transition-all"
          >
            <Lock className="w-4 h-4" />
            <span>Place Order ({formatCurrency(finalTotal)})</span>
          </button>

          <p className="text-[10px] text-gray-400 text-center leading-tight">
            By placing your order, you agree to ShopSphere's Demo Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};
