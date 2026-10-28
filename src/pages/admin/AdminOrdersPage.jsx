import React, { useState } from 'react';
import { ShoppingCart, Search, Eye, CheckCircle2, Clock, Truck, X, FileText } from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';
import { Link } from 'react-router-dom';

export const AdminOrdersPage = () => {
  const { orders, updateOrderStatus } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeOrderModal, setActiveOrderModal] = useState(null);

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Orders Fulfillment ({orders.length})
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor incoming purchases, dispatch packages, and update shipment progress.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#0E1433] p-5 rounded-2xl border border-gray-100 dark:border-violet-950/40 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order ID, customer name..."
            className="w-full pl-12 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 rounded-xl focus:outline-none focus:border-brand-violet text-gray-800 dark:text-white"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold capitalize transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-brand-violet text-white shadow-md'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-[#0E1433] rounded-3xl border border-gray-100 dark:border-violet-950/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-violet-900/40 bg-gray-50/50 dark:bg-white/5 text-gray-400 uppercase text-xs font-bold tracking-wider">
                <th className="py-4 px-5">Order ID</th>
                <th className="py-4 px-5">Date</th>
                <th className="py-4 px-5">Customer</th>
                <th className="py-4 px-5">Items</th>
                <th className="py-4 px-5">Total Amount</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-violet-900/30">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-5 font-mono font-bold text-brand-violet text-sm">
                    #{o.id}
                  </td>
                  <td className="py-4 px-5 text-gray-500 font-medium">{o.date}</td>
                  <td className="py-4 px-5">
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{o.customer.name}</p>
                    <p className="text-xs text-gray-400">{o.customer.city}</p>
                  </td>
                  <td className="py-4 px-5 font-semibold text-gray-700 dark:text-gray-300">
                    {o.items.length} item(s)
                  </td>
                  <td className="py-4 px-5 font-black text-gray-900 dark:text-white text-base">
                    {formatCurrency(o.total)}
                  </td>
                  <td className="py-4 px-5">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                      className="py-1.5 px-3 rounded-xl text-xs sm:text-sm font-bold bg-gray-100 dark:bg-[#141B3B] border border-gray-200 dark:border-violet-900/50 text-gray-800 dark:text-white focus:outline-none"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => setActiveOrderModal(o)}
                      className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-brand-violet transition-colors"
                      title="Inspect Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {activeOrderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#0E1433] w-full max-w-lg rounded-3xl shadow-2xl border border-violet-100 dark:border-violet-900/50 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 dark:border-violet-900/40">
              <div>
                <h3 className="font-black text-lg text-gray-900 dark:text-white">
                  Order #{activeOrderModal.id} Details
                </h3>
                <span className="text-xs text-gray-400">Placed on {activeOrderModal.date}</span>
              </div>
              <button
                onClick={() => setActiveOrderModal(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5">
                <span className="text-gray-400 block text-xs uppercase font-bold tracking-wider mb-1">Shipping Address:</span>
                <p className="font-bold text-gray-900 dark:text-white text-base">{activeOrderModal.customer.name}</p>
                <p className="text-gray-600 dark:text-gray-300 mt-0.5">{activeOrderModal.customer.address}, {activeOrderModal.customer.city} - {activeOrderModal.customer.pincode}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Phone: {activeOrderModal.customer.phone}</p>
              </div>

              <div>
                <span className="text-gray-400 block text-xs uppercase font-bold tracking-wider mb-2">Ordered Products:</span>
                <div className="space-y-2.5">
                  {activeOrderModal.items.map((it, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-gray-100 dark:border-violet-900/20 pb-2.5">
                      <div className="flex items-center gap-3">
                        <img src={it.image} alt={it.name} className="w-12 h-12 object-contain rounded-xl bg-gray-50 dark:bg-white/5 p-1" />
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-sm">{it.name}</p>
                          <p className="text-gray-400 text-xs">Qty: {it.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-800 dark:text-white text-sm">
                        {formatCurrency(it.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-between font-extrabold text-base text-gray-900 dark:text-white">
                <span>Grand Total:</span>
                <span className="text-brand-violet text-lg">{formatCurrency(activeOrderModal.total)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-violet-900/40 flex justify-end gap-3">
              <Link
                to={`/order-confirmation/${activeOrderModal.id}`}
                target="_blank"
                className="px-5 py-2.5 rounded-xl bg-brand-violet hover:bg-brand-violet-deep text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Print Official Invoice</span>
              </Link>
              <button
                onClick={() => setActiveOrderModal(null)}
                className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 font-bold text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
