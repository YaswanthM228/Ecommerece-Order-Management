import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Download, Calendar, Filter, TrendingUp, Sparkles } from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';
import { salesByCategoryData, topSellingStats, revenueData } from '../../data/mockReports';

export const AdminReportsPage = () => {
  const { showToast } = useShop();
  const [timeRange, setTimeRange] = useState('6months');

  const handleExportCSV = () => {
    showToast('Report CSV exported successfully! Download starting...');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Executive Analytics & Reports
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Export transaction logs, examine sales breakdowns by department, and track volume metrics.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="p-2.5 text-sm font-semibold rounded-xl bg-white dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none"
          >
            <option value="30days">Last 30 Days</option>
            <option value="6months">Past 6 Months</option>
            <option value="year">FY 2026 To Date</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="px-5 py-2.5 rounded-xl bg-brand-violet hover:bg-brand-violet-deep text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Bar Chart: Sales Volume by Category */}
      <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-4">
        <h3 className="font-black text-lg sm:text-xl text-gray-900 dark:text-white">
          Category Share (% of Total Store Revenue)
        </h3>
        <div className="h-80 sm:h-96 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesByCategoryData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={13} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={13} tickLine={false} tickFormatter={(val) => `${val}%`} />
              <Tooltip
                formatter={(val) => [`${val}% of Total Revenue`, 'Share']}
                contentStyle={{
                  backgroundColor: '#090D26',
                  borderColor: '#7C3AED',
                  borderRadius: '14px',
                  color: '#fff',
                  fontSize: '13px'
                }}
              />
              <Bar dataKey="value" fill="#7C3AED" radius={[8, 8, 0, 0]} name="Share Percentage" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing SKUs Table */}
      <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-4">
        <h3 className="font-black text-lg sm:text-xl text-gray-900 dark:text-white">
          Top Grossing Products Ranking
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-violet-900/40 bg-gray-50/50 dark:bg-white/5 text-gray-400 uppercase text-xs font-bold tracking-wider">
                <th className="py-4 px-5">Rank</th>
                <th className="py-4 px-5">Product Name</th>
                <th className="py-4 px-5 text-center">Units Sold</th>
                <th className="py-4 px-5 text-center">In Warehouse</th>
                <th className="py-4 px-5 text-right">Total Sales Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-violet-900/30">
              {topSellingStats.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-5 font-black text-brand-violet text-base">
                    #{idx + 1}
                  </td>
                  <td className="py-4 px-5 font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                    {item.name}
                  </td>
                  <td className="py-4 px-5 text-center font-semibold text-gray-700 dark:text-gray-300">
                    {item.sold}
                  </td>
                  <td className="py-4 px-5 text-center text-gray-500 font-medium">
                    {item.stock}
                  </td>
                  <td className="py-4 px-5 text-right font-black text-gray-900 dark:text-white text-base">
                    {formatCurrency(item.revenue)}
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
