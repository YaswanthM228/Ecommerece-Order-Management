import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Check,
  AlertCircle,
  Package,
  Sparkles
} from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';
import { categories } from '../../data/mockCategories';

export const AdminProductsPage = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useShop();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const initialForm = {
    name: '',
    subtitle: '',
    brand: '',
    category: 'Electronics',
    categorySlug: 'electronics',
    price: 9999,
    originalPrice: 12999,
    discount: 23,
    stock: 25,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'High-performance audio and hardware engineered for modern everyday productivity.'
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData(prod);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'all' || p.categorySlug === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
            Products Inventory ({products.length})
          </h2>
          <p className="text-xs text-gray-500">
            Create, update stock, modify pricing, and maintain product descriptions.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-violet-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#0E1433] p-4 rounded-2xl border border-gray-100 dark:border-violet-950/40 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or brand..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 rounded-xl focus:outline-none focus:border-brand-violet text-gray-800 dark:text-white"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-56 p-2 text-xs rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
        >
          <option value="all">All Departments</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-[#0E1433] rounded-3xl border border-gray-100 dark:border-violet-950/40 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-violet-900/40 bg-gray-50/50 dark:bg-white/5 text-gray-400 uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Badge</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-violet-900/30">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 object-contain rounded-xl bg-gray-50 dark:bg-[#121940] p-1 shrink-0"
                    />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white line-clamp-1">{p.name}</p>
                      <p className="text-[11px] text-gray-400 font-medium">{p.brand}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">
                    {p.category}
                  </td>
                  <td className="py-3.5 px-4 font-black text-gray-900 dark:text-white">
                    {formatCurrency(p.price)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`font-bold px-2.5 py-0.5 rounded-full text-[11px] ${
                        p.stock < 15
                          ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-600'
                          : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600'
                      }`}
                    >
                      {p.stock} units
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold uppercase bg-violet-50 dark:bg-violet-950 text-brand-violet px-2 py-0.5 rounded-full">
                      {p.badge || 'Standard'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 transition-colors"
                        title="Edit product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete product "${p.name}"?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#0E1433] w-full max-w-xl rounded-3xl shadow-2xl border border-violet-100 dark:border-violet-900/50 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-violet-900/40">
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                {editingProduct ? 'Edit Product Details' : 'Add New Product to ShopSphere'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dell Inspiron 15 Laptop"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Dell"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Category Department
                  </label>
                  <select
                    value={formData.categorySlug}
                    onChange={(e) => {
                      const sel = categories.find((c) => c.slug === e.target.value);
                      setFormData({
                        ...formData,
                        categorySlug: e.target.value,
                        category: sel ? sel.name : 'Electronics'
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Price (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Original Price
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Stock Units
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Promotional Badge
                </label>
                <select
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
                >
                  <option value="Best Seller">Best Seller</option>
                  <option value="Limited Deal">Limited Deal</option>
                  <option value="New">New Arrival</option>
                  <option value="Trending">Trending</option>
                  <option value="Premium">Premium</option>
                  <option value="Popular">Popular</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-violet-900/40">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-violet hover:bg-brand-violet-deep text-white font-bold shadow-md shadow-violet-600/30 transition-all"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
