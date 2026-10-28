import React, { useState } from 'react';
import { Boxes, Search, Plus, Minus, AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';

export const AdminInventoryPage = () => {
  const { products, updateProduct, showToast } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStock, setFilterStock] = useState('all'); // all | low | healthy

  const handleAdjustStock = (id, delta) => {
    const prod = products.find((p) => p.id === id);
    if (!prod) return;
    const newStock = Math.max(0, prod.stock + delta);
    updateProduct(id, { stock: newStock });
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStock === 'low') return matchSearch && p.stock < 15;
    if (filterStock === 'healthy') return matchSearch && p.stock >= 15;
    return matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Warehouse Inventory & Stock
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Real-time fulfillment center inventory counts and quick stock adjustments.
          </p>
        </div>
      </div>

      {/* Filter / Search */}
      <div className="bg-white dark:bg-[#0E1433] p-5 rounded-2xl border border-gray-100 dark:border-violet-950/40 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search SKU by product or brand..."
            className="w-full pl-12 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 rounded-xl focus:outline-none focus:border-brand-violet text-gray-800 dark:text-white"
          />
        </div>

        <div className="flex gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => setFilterStock('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
              filterStock === 'all'
                ? 'bg-brand-violet text-white shadow-md'
                : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
            }`}
          >
            All Items ({products.length})
          </button>
          <button
            onClick={() => setFilterStock('low')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
              filterStock === 'low'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-gray-100 dark:bg-white/5 text-amber-600 dark:text-amber-400 hover:bg-gray-200 dark:hover:bg-white/10'
            }`}
          >
            Low Stock Alert ({products.filter((p) => p.stock < 15).length})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#0E1433] rounded-3xl border border-gray-100 dark:border-violet-950/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-violet-900/40 bg-gray-50/50 dark:bg-white/5 text-gray-400 uppercase text-xs font-bold tracking-wider">
                <th className="py-4 px-5">SKU / Item</th>
                <th className="py-4 px-5">Unit Price</th>
                <th className="py-4 px-5">Stock Status</th>
                <th className="py-4 px-5 text-center">Quick Adjust</th>
                <th className="py-4 px-5 text-right">Inventory Valuation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-violet-900/30">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-5 flex items-center gap-3.5">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 object-contain rounded-2xl bg-gray-50 dark:bg-[#121940] p-1.5 shrink-0"
                    />
                    <div>
                      <p className="font-bold text-sm sm:text-base text-gray-900 dark:text-white line-clamp-1">{p.name}</p>
                      <p className="text-xs font-mono text-gray-400">ID: {p.id}</p>
                    </div>
                  </td>
                  <td className="py-4 px-5 font-semibold text-gray-800 dark:text-gray-200 text-sm">
                    {formatCurrency(p.price)}
                  </td>
                  <td className="py-4 px-5">
                    {p.stock < 15 ? (
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-3 py-1 rounded-full">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <span>Low Stock ({p.stock} units)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Healthy ({p.stock} units)</span>
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleAdjustStock(p.id, -5)}
                        className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 flex items-center justify-center font-bold text-xs"
                        title="-5 units"
                      >
                        -5
                      </button>
                      <button
                        onClick={() => handleAdjustStock(p.id, -1)}
                        className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 flex items-center justify-center font-bold text-xs"
                        title="-1 unit"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-12 text-center font-black text-sm text-gray-900 dark:text-white">
                        {p.stock}
                      </span>
                      <button
                        onClick={() => handleAdjustStock(p.id, +1)}
                        className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 flex items-center justify-center font-bold text-xs"
                        title="+1 unit"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleAdjustStock(p.id, +10)}
                        className="w-8 h-8 rounded-xl bg-violet-100 hover:bg-violet-200 dark:bg-violet-950 dark:hover:bg-violet-900 text-brand-violet font-bold text-xs flex items-center justify-center"
                        title="+10 units restock"
                      >
                        +10
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-right font-black text-gray-900 dark:text-white text-base">
                    {formatCurrency(p.price * p.stock)}
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
