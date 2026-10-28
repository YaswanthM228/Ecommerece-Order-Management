import React, { useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Package,
  Truck,
  Printer,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calendar,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';
import { Logo } from '../../components/common/Logo';

export const OrderDetailViewPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { orders } = useShop();
  const invoiceRef = useRef(null);

  const isInvoiceView = location.pathname.endsWith('/invoice');

  // Search by exact ID, or substring ID (e.g. without ORD- prefix)
  const order = orders.find(
    (o) =>
      String(o.id).toLowerCase() === String(orderId).toLowerCase() ||
      String(o.id).toLowerCase().replace(/^ord-/, '') === String(orderId).toLowerCase().replace(/^ord-/, '')
  ) || orders[0];

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="w-full px-6 sm:px-8 py-16 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Order Not Found</h2>
        <p className="text-gray-500 mb-6 text-sm">We couldn't locate any order matching reference #{orderId}.</p>
        <Link to="/orders" className="px-6 py-2.5 rounded-full bg-brand-violet text-white font-bold text-sm">
          View All Orders
        </Link>
      </div>
    );
  }

  const customerName = order.customer?.name || order.customer_name || 'Demo Shopper';
  const customerEmail = order.customer?.email || order.customer_email || 'customer@shopsphere.io';
  const customerAddress = order.customer?.address || order.shipping_address_line || 'Flat 402, Prestige Palms';
  const customerCity = order.customer?.city || order.city || 'Bengaluru';
  const customerState = order.customer?.state || order.state || 'Karnataka';
  const customerPincode = order.customer?.pincode || order.postal_code || '560103';
  const customerPhone = order.customer?.phone || order.customer_phone || '+91 98765 12345';
  const orderItems = order.items || [];

  return (
    <div className="w-full px-6 sm:px-8 py-6 sm:py-8 space-y-8 min-w-0">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-violet-900/30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 text-gray-700 dark:text-gray-300 transition-colors"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {isInvoiceView ? 'Official Tax Invoice' : `Order Details #${order.id}`}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Placed on {order.date} • Status: <span className="font-bold text-brand-violet">{order.status}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-white dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-sm font-bold text-gray-800 dark:text-gray-200 hover:border-brand-violet flex items-center gap-2 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4 text-brand-violet" />
            <span>Print Invoice</span>
          </button>

          <Link
            to={`/track-order?id=${order.id}`}
            className="px-5 py-2.5 rounded-xl bg-brand-violet hover:bg-brand-violet-deep text-white text-sm font-bold flex items-center gap-2 shadow-md shadow-violet-600/30 transition-all"
          >
            <Truck className="w-4 h-4" />
            <span>Track Delivery</span>
          </Link>
        </div>
      </div>

      {/* Invoice Document Box */}
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
            <p className="font-extrabold text-gray-900 dark:text-white text-base">{customerName}</p>
            <p className="text-gray-600 dark:text-gray-300">{customerAddress}</p>
            <p className="text-gray-600 dark:text-gray-300">{customerCity}, {customerState} - {customerPincode}</p>
            <p className="text-gray-500 font-medium">Phone: {customerPhone}</p>
            <p className="text-gray-500 font-medium">Email: {customerEmail}</p>
          </div>

          <div className="space-y-1.5 sm:text-right">
            <span className="text-gray-400 font-extrabold uppercase tracking-wider text-xs">Payment & Shipping Details:</span>
            <p className="font-extrabold text-gray-900 dark:text-white text-base">{order.paymentMethod || 'Online Payment'}</p>
            <p className="text-emerald-600 dark:text-emerald-400 font-bold">Payment Status: {order.paymentStatus || 'Paid'}</p>
            <p className="text-gray-600 dark:text-gray-300">Delivery Method: {order.deliveryMethod || 'Standard Express Delivery'}</p>
            <p className="text-xs text-gray-400">Carrier: BlueDart Air Express</p>
          </div>
        </div>

        {/* Line Items Table */}
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
              {orderItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-contain rounded-xl bg-gray-50 dark:bg-white/5 p-1 shrink-0"
                        />
                      )}
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.subtitle || item.brand || 'SKU Verified'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-center font-bold text-gray-700 dark:text-gray-300">
                    {item.quantity}
                  </td>
                  <td className="py-3.5 px-3 text-right text-gray-600 dark:text-gray-300">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-black text-gray-900 dark:text-white">
                    {formatCurrency(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Summary */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-6 border-t border-gray-200 dark:border-violet-900/40">
          <div className="space-y-1 text-xs text-gray-400 max-w-sm">
            <p className="font-bold text-gray-700 dark:text-gray-300">Thank you for your business!</p>
            <p>This is a computer-generated tax invoice and requires no physical signature under Indian Information Technology Act 2000.</p>
          </div>

          <div className="w-full sm:w-72 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal:</span>
              <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(order.subtotal || order.total * 0.85)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Estimated GST (18%):</span>
              <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(order.tax || order.total * 0.15)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping Fee:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">FREE</span>
            </div>
            <div className="flex justify-between text-base font-black text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-violet-900/40">
              <span>Total Paid:</span>
              <span className="text-brand-violet text-lg">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailViewPage;
