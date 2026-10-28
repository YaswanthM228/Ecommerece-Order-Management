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
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
            Category Taxonomy ({categoryList.length})
          </h2>
          <p className="text-xs text-gray-500">
            Structure your storefront navigation and product grouping hierarchies.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-brand-violet hover:bg-brand-violet-deep text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categoryList.map((cat) => (
          <div
            key={cat.id}
            className="bg-white dark:bg-[#0E1433] rounded-3xl p-5 border border-gray-100 dark:border-violet-950/40 shadow-sm flex items-center gap-4 hover:shadow-card-hover transition-all"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-14 h-14 rounded-2xl object-cover bg-gray-50 dark:bg-white/5 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white truncate">
                {cat.name}
              </h3>
              <p className="text-[11px] text-gray-400 font-mono">/{cat.slug}</p>
              <span className="text-[10px] font-semibold text-brand-violet bg-violet-50 dark:bg-violet-950 px-2 py-0.2 rounded-full inline-block mt-1">
                {cat.count} products
              </span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#0E1433] w-full max-w-md rounded-3xl shadow-2xl border border-violet-100 dark:border-violet-900/50 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-violet-900/40">
              <h3 className="font-extrabold text-base text-gray-900 dark:text-white">Add Category</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Category Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gaming Gear"
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={newCat.image}
                  onChange={(e) => setNewCat({ ...newCat, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-violet-900/40">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-500 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-violet text-white font-bold shadow-md"
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
