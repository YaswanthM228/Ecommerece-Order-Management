import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Truck, FileText, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';

export const OrdersHistoryPage = () => {
  const navigate = useNavigate();
  const { orders } = useShop();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400';
      case 'Shipped':
        return 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400';
      case 'Processing':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300';
    }
  };

  return (
    <div className="w-full px-6 sm:px-8 py-6 min-w-0 space-y-8">
      <div className="pb-4 border-b border-gray-200 dark:border-violet-900/30">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          My Orders History
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Review previous purchases, download tax invoices, and track shipments in real time.
        </p>
      </div>

      <div className="space-y-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-5"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-violet-900/30 text-sm">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <span className="text-gray-400 block text-xs uppercase font-bold tracking-wider">Order ID</span>
                  <span className="font-bold font-mono text-gray-900 dark:text-white text-base">#{order.id}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs uppercase font-bold tracking-wider">Placed On</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{order.date}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-xs uppercase font-bold tracking-wider">Total Amount</span>
                  <span className="font-black text-brand-violet text-base">{formatCurrency(order.total)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full ${getStatusBadge(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>

            {/* Items row */}
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 text-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded-2xl bg-gray-50 dark:bg-white/5 p-1.5 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base truncate">{item.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{item.subtitle || item.brand}</p>
                    <p className="text-gray-600 dark:text-gray-300 font-semibold mt-1">Qty: {item.quantity} • {formatCurrency(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-100 dark:border-violet-900/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4 text-brand-violet" />
                <span>Payment: {order.paymentMethod}</span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/order-confirmation/${order.id}`}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 text-sm font-bold flex items-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4 text-brand-violet" />
                  <span>Invoice</span>
                </Link>

                <Link
                  to={`/track-order?id=${order.id}`}
                  className="px-5 py-2.5 rounded-xl bg-brand-violet hover:bg-brand-violet-deep text-white text-sm font-bold flex items-center gap-2 shadow-md shadow-violet-600/30 transition-all"
                >
                  <Truck className="w-4 h-4" />
                  <span>Track Package</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
