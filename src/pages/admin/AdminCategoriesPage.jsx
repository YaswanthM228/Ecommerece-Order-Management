import React, { useState } from 'react';
import { Layers, Plus, Edit2, Trash2, X } from 'lucide-react';
import { categories as initialCategories } from '../../data/mockCategories';
import { useShop } from '../../context/ShopContext';

export const AdminCategoriesPage = () => {
  const { showToast } = useShop();
  const [categoryList, setCategoryList] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', slug: '', count: 10, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=300&q=80' });

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCat.name) return;
    const slug = newCat.slug || newCat.name.toLowerCase().replace(/\s+/g, '-');
    const created = { id: `cat-${Date.now()}`, ...newCat, slug };
    setCategoryList([created, ...categoryList]);
    setIsModalOpen(false);
    showToast(`Category "${newCat.name}" created!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Category Taxonomy ({categoryList.length})
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Structure your storefront navigation and product grouping hierarchies.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-brand-violet hover:bg-brand-violet-deep text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryList.map((cat) => (
          <div
            key={cat.id}
            className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm flex items-center gap-4 hover:shadow-card-hover transition-all"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-16 h-16 rounded-2xl object-cover bg-gray-50 dark:bg-white/5 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base text-gray-900 dark:text-white truncate">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-400 font-mono mt-0.5">/{cat.slug}</p>
              <span className="text-xs font-semibold text-brand-violet bg-violet-50 dark:bg-violet-950 px-2.5 py-0.5 rounded-full inline-block mt-2">
                {cat.count} products
              </span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#0E1433] w-full max-w-md rounded-3xl shadow-2xl border border-violet-100 dark:border-violet-900/50 p-6 sm:p-8">
            <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 dark:border-violet-900/40">
              <h3 className="font-black text-lg text-gray-900 dark:text-white">Add Category</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4 pt-4 text-sm">
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Category Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gaming Gear"
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={newCat.image}
                  onChange={(e) => setNewCat({ ...newCat, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-violet-900/40">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-violet hover:bg-brand-violet-deep text-white font-bold text-sm shadow-md transition-all"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
