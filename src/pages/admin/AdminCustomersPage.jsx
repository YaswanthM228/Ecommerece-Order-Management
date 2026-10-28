import React, { useState } from 'react';
import { Users, Search, Crown, Shield, Mail, Phone, ToggleLeft, ToggleRight } from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';

export const AdminCustomersPage = () => {
  const { customers, toggleCustomerStatus } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Customer Directory ({customers.length})
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            View lifetime order histories, VIP membership tiers, and toggle account access.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white dark:bg-[#0E1433] p-5 rounded-2xl border border-gray-100 dark:border-violet-950/40 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customers by name, email..."
            className="w-full pl-12 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 rounded-xl focus:outline-none focus:border-brand-violet text-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-[#0E1433] rounded-3xl border border-gray-100 dark:border-violet-950/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-violet-900/40 bg-gray-50/50 dark:bg-white/5 text-gray-400 uppercase text-xs font-bold tracking-wider">
                <th className="py-4 px-5">Customer</th>
                <th className="py-4 px-5">Contact</th>
                <th className="py-4 px-5">Tier</th>
                <th className="py-4 px-5">Orders</th>
                <th className="py-4 px-5">Total Spent</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-violet-900/30">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-5 flex items-center gap-3.5">
                    <img
                      src={cust.avatar}
                      alt={cust.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-violet-500/30 shrink-0"
                    />
                    <div>
                      <p className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">{cust.name}</p>
                      <p className="text-xs text-gray-400">Joined {cust.joinDate}</p>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-gray-800 dark:text-gray-200 font-medium text-sm">{cust.email}</p>
                    <p className="text-xs text-gray-400">{cust.phone}</p>
                  </td>
                  <td className="py-4 px-5">
                    {cust.tier.includes('VIP') ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full">
                        <Crown className="w-3.5 h-3.5" />
                        {cust.tier}
                      </span>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400 font-semibold text-sm">{cust.tier}</span>
                    )}
                  </td>
                  <td className="py-4 px-5 font-bold text-gray-700 dark:text-gray-300 text-sm">
                    {cust.totalOrders}
                  </td>
                  <td className="py-4 px-5 font-black text-gray-900 dark:text-white text-base">
                    {formatCurrency(cust.totalSpent)}
                  </td>
                  <td className="py-4 px-5">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        cust.status === 'Active'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                      }`}
                    >
                      {cust.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => toggleCustomerStatus(cust.id)}
                      className="text-sm font-bold text-brand-violet hover:underline"
                    >
                      {cust.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
