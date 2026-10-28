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
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
            Customer Orders Fulfillment ({orders.length})
          </h2>
          <p className="text-xs text-gray-500">
            Monitor incoming purchases, dispatch packages, and update shipment progress.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#0E1433] p-4 rounded-2xl border border-gray-100 dark:border-violet-950/40 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order ID, customer name..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 rounded-xl focus:outline-none focus:border-brand-violet text-gray-800 dark:text-white"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-brand-violet text-white shadow-md'
                  : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
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
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-violet-900/40 bg-gray-50/50 dark:bg-white/5 text-gray-400 uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-violet-900/30">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-brand-violet">
                    #{o.id}
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">{o.date}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-gray-900 dark:text-white">{o.customer.name}</p>
                    <p className="text-[10px] text-gray-400">{o.customer.city}</p>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    {o.items.length} item(s)
                  </td>
                  <td className="py-3.5 px-4 font-black text-gray-900 dark:text-white">
                    {formatCurrency(o.total)}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                      className="p-1 rounded-lg text-xs font-bold bg-gray-100 dark:bg-[#141B3B] border border-gray-200 dark:border-violet-900/50 text-gray-800 dark:text-white focus:outline-none"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setActiveOrderModal(o)}
                      className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-brand-violet transition-colors"
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
          <div className="bg-white dark:bg-[#0E1433] w-full max-w-lg rounded-3xl shadow-2xl border border-violet-100 dark:border-violet-900/50 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-violet-900/40">
              <div>
                <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                  Order #{activeOrderModal.id} Details
                </h3>
                <span className="text-xs text-gray-400">Placed on {activeOrderModal.date}</span>
              </div>
              <button
                onClick={() => setActiveOrderModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Shipping Address:</span>
                <p className="font-bold text-gray-900 dark:text-white">{activeOrderModal.customer.name}</p>
                <p className="text-gray-500">{activeOrderModal.customer.address}, {activeOrderModal.customer.city} - {activeOrderModal.customer.pincode}</p>
                <p className="text-gray-500">Phone: {activeOrderModal.customer.phone}</p>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold mb-2">Ordered Products:</span>
                <div className="space-y-2">
                  {activeOrderModal.items.map((it, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-gray-100 dark:border-violet-900/20 pb-2">
                      <div className="flex items-center gap-2">
                        <img src={it.image} alt={it.name} className="w-10 h-10 object-contain rounded-lg bg-gray-50 dark:bg-white/5 p-1" />
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{it.name}</p>
                          <p className="text-gray-400">Qty: {it.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-800 dark:text-white">
                        {formatCurrency(it.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-between font-extrabold text-sm text-gray-900 dark:text-white">
                <span>Grand Total:</span>
                <span className="text-brand-violet">{formatCurrency(activeOrderModal.total)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-violet-900/40 flex justify-end gap-3">
              <Link
                to={`/order-confirmation/${activeOrderModal.id}`}
                target="_blank"
                className="px-4 py-2 rounded-xl bg-violet-50 dark:bg-violet-950/80 text-brand-violet text-xs font-bold flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Customer Invoice</span>
              </Link>
              <button
                onClick={() => setActiveOrderModal(null)}
                className="px-4 py-2 rounded-xl bg-brand-violet text-white text-xs font-bold"
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
