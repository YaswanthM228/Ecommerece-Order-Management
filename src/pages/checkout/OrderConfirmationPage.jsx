import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Printer,
  ArrowRight,
  Truck
} from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';
import { Logo } from '../../components/common/Logo';

export const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const { orders } = useShop();

  const invoiceRef = useRef(null);
  const order = orders.find((o) => o.id === orderId) || orders[0];

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="w-full px-6 sm:px-8 py-16 text-center">
        <p className="text-gray-500 mb-4 text-base">Order record not found.</p>
        <Link to="/" className="text-brand-violet font-bold text-sm underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full px-6 sm:px-8 py-6 sm:py-8 space-y-8 min-w-0">
      {/* Top Success Banner */}
      <div className="text-center bg-gradient-to-br from-violet-600/10 via-purple-600/10 to-indigo-600/10 dark:from-violet-950/40 dark:to-indigo-950/30 border border-violet-200 dark:border-violet-900/40 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-5 shadow-xl shadow-emerald-500/30">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <span className="text-xs font-black tracking-widest uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1.5 rounded-full">
          Order Successfully Placed
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white mt-4 mb-2">
          Thank you for shopping with ShopSphere!
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          We have received your order <span className="font-mono font-bold text-brand-violet">#{order.id}</span>. A confirmation email has been dispatched to {order.customer.email}.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-7">
          <button
            onClick={handlePrint}
            className="px-6 py-3 rounded-full bg-white dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-sm font-bold text-gray-800 dark:text-gray-200 hover:border-brand-violet flex items-center gap-2 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4 text-brand-violet" />
            <span>Print Invoice</span>
          </button>

          <Link
            to="/track-order"
            className="px-6 py-3 rounded-full bg-brand-violet hover:bg-brand-violet-deep text-white text-sm font-bold flex items-center gap-2 shadow-md shadow-violet-600/30 transition-all"
          >
            <Truck className="w-4 h-4" />
            <span>Track Delivery</span>
          </Link>
        </div>
      </div>

      {/* Itemized Printable Invoice Preview (full width) */}
      <div
        ref={invoiceRef}
        className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-violet-950/40 shadow-xl space-y-8"
      >
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-violet-900/40">
          <div>
            <Logo size="normal" variant="dark" />
            <p className="text-xs text-gray-400 mt-2 font-medium">
              ShopSphere Retail Pvt. Ltd. • GSTIN: 29AABCU9603R1ZX
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-xs font-black uppercase tracking-widest text-brand-violet bg-violet-50 dark:bg-violet-950/80 px-3 py-1 rounded-full">
              Tax Invoice / Receipt
            </span>
            <p className="text-xl font-black text-gray-900 dark:text-white mt-1.5">
              Invoice #{order.id}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Date: {order.date}</p>
          </div>
        </div>

        {/* Customer & Billing Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div className="space-y-1.5">
            <span className="text-gray-400 font-extrabold uppercase tracking-wider text-xs">Billed & Shipped To:</span>
            <p className="font-extrabold text-gray-900 dark:text-white text-base">{order.customer.name}</p>
            <p className="text-gray-600 dark:text-gray-300">{order.customer.address}</p>
            <p className="text-gray-600 dark:text-gray-300">{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
            <p className="text-gray-500 font-medium">Phone: {order.customer.phone}</p>
          </div>

          <div className="space-y-1.5 sm:text-right">
            <span className="text-gray-400 font-extrabold uppercase tracking-wider text-xs">Payment & Status:</span>
            <p className="font-extrabold text-gray-900 dark:text-white text-base">{order.paymentMethod}</p>
            <p className="text-emerald-600 dark:text-emerald-400 font-bold">Payment Status: {order.paymentStatus}</p>
            <p className="text-gray-600 dark:text-gray-300">Delivery: {order.deliveryMethod || 'Standard Delivery'}</p>
          </div>
        </div>

        {/* Product Line Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-violet-900/40 text-gray-400 uppercase text-xs font-extrabold tracking-wider">
                <th className="py-3.5 px-3">Item Description</th>
                <th className="py-3.5 px-3 text-center">Qty</th>
                <th className="py-3.5 px-3 text-right">Unit Price</th>
                <th className="py-3.5 px-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-violet-900/30">
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-4 px-3 flex items-center gap-3.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-contain bg-gray-50 dark:bg-[#121940] p-1.5 shrink-0"
                    />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.subtitle || item.brand}</p>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-center font-bold text-gray-700 dark:text-gray-300">
                    {item.quantity}
                  </td>
                  <td className="py-4 px-3 text-right font-medium text-gray-700 dark:text-gray-300">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="py-4 px-3 text-right font-black text-gray-900 dark:text-white">
                    {formatCurrency(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Summary Totals */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-5 border-t border-gray-100 dark:border-violet-900/40">
          <div className="text-xs sm:text-sm text-gray-400 max-w-sm space-y-1">
            <p className="font-bold text-gray-600 dark:text-gray-300">Digital Tax Invoice Simulation</p>
            <p>
              This is a digital receipt simulation for demonstration purposes. Thank you for testing the ShopSphere UI experience.
            </p>
          </div>

          <div className="w-full sm:w-72 space-y-2.5 text-sm">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal:</span>
              <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount:</span>
                <span>-{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping:</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Tax (GST 18%):</span>
              <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(order.tax)}</span>
            </div>
            <div className="border-t border-gray-200 dark:border-violet-900/40 pt-3 flex justify-between text-base font-black text-gray-900 dark:text-white">
              <span>Grand Total:</span>
              <span className="text-brand-violet text-lg sm:text-xl">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-violet hover:underline"
        >
          <span>Continue Shopping on ShopSphere</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
