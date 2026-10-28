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
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
            Customer Directory ({customers.length})
          </h2>
          <p className="text-xs text-gray-500">
            View lifetime order histories, VIP membership tiers, and toggle account access.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white dark:bg-[#0E1433] p-4 rounded-2xl border border-gray-100 dark:border-violet-950/40 shadow-sm">
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customers by name, email..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 rounded-xl focus:outline-none focus:border-brand-violet text-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-[#0E1433] rounded-3xl border border-gray-100 dark:border-violet-950/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-violet-900/40 bg-gray-50/50 dark:bg-white/5 text-gray-400 uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Tier</th>
                <th className="py-3.5 px-4">Orders</th>
                <th className="py-3.5 px-4">Total Spent</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-violet-900/30">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <img
                      src={cust.avatar}
                      alt={cust.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-violet-500/30"
                    />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{cust.name}</p>
                      <p className="text-[10px] text-gray-400">Joined {cust.joinDate}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-gray-800 dark:text-gray-200">{cust.email}</p>
                    <p className="text-[10px] text-gray-400">{cust.phone}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    {cust.tier.includes('VIP') ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">
                        <Crown className="w-3 h-3" />
                        {cust.tier}
                      </span>
                    ) : (
                      <span className="text-gray-500 font-semibold">{cust.tier}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-700 dark:text-gray-300">
                    {cust.totalOrders}
                  </td>
                  <td className="py-3.5 px-4 font-black text-gray-900 dark:text-white">
                    {formatCurrency(cust.totalSpent)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        cust.status === 'Active'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                      }`}
                    >
                      {cust.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => toggleCustomerStatus(cust.id)}
                      className="text-xs font-bold text-brand-violet hover:underline"
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
