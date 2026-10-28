import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  ShoppingCart,
  Package,
  Users,
  ArrowUpRight,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Download
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { useShop, formatCurrency } from '../../context/ShopContext';
import {
  revenueData,
  orderStatusStats,
  topSellingStats
} from '../../data/mockReports';

export const AdminDashboardPage = () => {
  const { products, orders, customers, updateOrderStatus } = useShop();

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 3850000);
  const totalOrdersCount = orders.length + 3280;

  const lowStockItems = products.filter((p) => p.stock < 15);

  return (
    <div className="space-y-8">
      {/* 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase">Gross Sales Revenue</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white">
            {formatCurrency(totalRevenue)}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <span>↑ +18.4%</span>
            <span className="text-gray-400 font-normal">vs last month</span>
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase">Total Orders</span>
            <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/50 text-brand-violet dark:text-violet-400 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white">
            {totalOrdersCount.toLocaleString()}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <span>↑ +12.1%</span>
            <span className="text-gray-400 font-normal">fulfillment rate 98%</span>
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase">Live Catalog</span>
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white">
            {products.length} Products
          </div>
          <p className="text-[11px] text-brand-violet font-semibold mt-1 flex items-center gap-1">
            <span>Across 11 Categories</span>
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase">Registered Customers</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white">
            1,480
          </div>
          <p className="text-[11px] text-amber-500 font-semibold mt-1 flex items-center gap-1">
            <span>★ 38% VIP Members</span>
          </p>
        </div>
      </div>

      {/* 2 Recharts Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Area Chart (Col 8) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white">
                Revenue Trajectory (6 Months)
              </h3>
              <p className="text-xs text-gray-400">Actual sales revenue versus quarterly targets</p>
            </div>
            <span className="text-xs font-bold text-brand-violet bg-violet-50 dark:bg-violet-950 px-3 py-1 rounded-full">
              FY 2026
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4338CA" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4338CA" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `₹${val / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), 'Revenue']}
                  contentStyle={{
                    backgroundColor: '#090D26',
                    borderColor: '#7C3AED',
                    borderRadius: '16px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#7C3AED"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                  name="Actual Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#4338CA"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#colorTarget)"
                  name="Target Goal"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Distribution (Col 4) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white">
              Order Fulfillment Ratio
            </h3>
            <p className="text-xs text-gray-400">Current active shipment statuses</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {orderStatusStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090D26',
                    borderColor: '#7C3AED',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '11px'
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(val) => <span className="text-xs text-gray-600 dark:text-gray-300">{val}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders & Low Stock Alert Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders Table (Col 8) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-violet-900/30">
            <div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
                Recent Orders
              </h3>
              <p className="text-xs text-gray-400">Manage dispatch & delivery statuses</p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-bold text-brand-violet hover:underline flex items-center gap-1"
            >
              <span>View All Orders</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-gray-100 dark:border-violet-900/40 text-gray-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3">Order ID</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Amount</th>
                  <th className="py-3 px-3">Payment</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-violet-900/30">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-brand-violet">
                      #{order.id}
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-800 dark:text-gray-200">
                      {order.customer.name}
                    </td>
                    <td className="py-3 px-3 font-extrabold text-gray-900 dark:text-white">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="py-3 px-3 text-gray-500">
                      {order.paymentMethod.split(' ')[0]}
                    </td>
                    <td className="py-3 px-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="p-1 rounded-lg text-xs font-bold bg-gray-100 dark:bg-[#141B3B] border border-gray-200 dark:border-violet-900/50 text-gray-800 dark:text-white focus:outline-none"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts (Col 4) */}
        <div className="lg:col-span-4 bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-violet-900/30">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">
              Inventory Restock Alerts
            </h3>
          </div>

          <div className="space-y-3">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-center gap-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-contain bg-white dark:bg-[#121940] p-1 shrink-0"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <p className="font-bold text-gray-900 dark:text-white truncate">{item.name}</p>
                  <span className="text-amber-600 dark:text-amber-400 font-bold block mt-0.5">
                    Only {item.stock} left in warehouse
                  </span>
                </div>
                <Link
                  to="/admin/inventory"
                  className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] font-black uppercase tracking-wider transition-colors shrink-0"
                >
                  Restock
                </Link>
              </div>
            ))}
          </div>

          <Link
            to="/admin/inventory"
            className="block text-center text-xs font-bold text-brand-violet hover:underline pt-2"
          >
            Manage full warehouse inventory →
          </Link>
        </div>
      </div>
    </div>
  );
};
