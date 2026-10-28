import React, { useState, useMemo } from 'react';
import { useSearchParams, Link, useParams } from 'react-router-dom';
import {
  Filter,
  Grid,
  List,
  ChevronDown,
  Star,
  X,
  SlidersHorizontal,
  RotateCcw,
  ShoppingCart,
  Heart
} from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';
import { ProductCard } from '../../components/products/ProductCard';
import { categories } from '../../data/mockCategories';

export const ProductListingPage = () => {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const catParam = categorySlug || searchParams.get('cat') || 'all';

  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(catParam);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState(150000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));
    return ['all', ...list];
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (queryParam) {
          const matchQuery =
            p.name.toLowerCase().includes(queryParam.toLowerCase()) ||
            p.category.toLowerCase().includes(queryParam.toLowerCase()) ||
            p.brand.toLowerCase().includes(queryParam.toLowerCase()) ||
            p.description.toLowerCase().includes(queryParam.toLowerCase());
          if (!matchQuery) return false;
        }

        // Category
        if (selectedCategory !== 'all') {
          if (p.categorySlug !== selectedCategory && p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }

        // Brand
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
          return false;
        }

        // Rating
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }

        // Price
        if (p.price > priceRange) {
          return false;
        }

        // Stock
        if (inStockOnly && p.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured default
      });
  }, [products, queryParam, selectedCategory, selectedBrand, minRating, priceRange, inStockOnly, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setMinRating(0);
    setPriceRange(150000);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const currentCategoryName =
    selectedCategory === 'all'
      ? 'All Products'
      : categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory;

  const filterSidebar = (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
          Category
        </h4>
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          <label className="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-950/40">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="cat"
                checked={selectedCategory === 'all'}
                onChange={() => setSelectedCategory('all')}
                className="text-brand-violet focus:ring-brand-violet"
              />
              <span className={selectedCategory === 'all' ? 'font-bold text-brand-violet' : 'text-gray-700 dark:text-gray-300'}>
                All Categories
              </span>
            </div>
            <span className="text-[10px] text-gray-400">({products.length})</span>
          </label>
          {categories.map((c) => (
            <label
              key={c.id}
              className="flex items-center justify-between text-xs cursor-pointer p-1.5 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-950/40"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="cat"
                  checked={selectedCategory === c.slug}
                  onChange={() => setSelectedCategory(c.slug)}
                  className="text-brand-violet focus:ring-brand-violet"
                />
                <span className={selectedCategory === c.slug ? 'font-bold text-brand-violet' : 'text-gray-700 dark:text-gray-300'}>
                  {c.name}
                </span>
              </div>
              <span className="text-[10px] text-gray-400">({c.count})</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-violet-900/30" />

      {/* Price Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
            Max Price
          </h4>
          <span className="text-xs font-bold text-brand-violet dark:text-violet-400">
            {formatCurrency(priceRange)}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="150000"
          step="1000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-brand-violet cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>₹1,000</span>
          <span>₹1,50,000</span>
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-violet-900/30" />

      {/* Brand Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
          Brand
        </h4>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/50 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:border-brand-violet"
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b === 'all' ? 'All Brands' : b}
            </option>
          ))}
        </select>
      </div>

      <div className="border-t border-gray-100 dark:border-violet-900/30" />

      {/* Minimum Rating */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {[4, 3, 2].map((stars) => (
            <label
              key={stars}
              className="flex items-center gap-2 text-xs cursor-pointer text-gray-700 dark:text-gray-300"
            >
              <input
                type="radio"
                name="rating"
                checked={minRating === stars}
                onChange={() => setMinRating(stars)}
                className="text-brand-violet focus:ring-brand-violet"
              />
              <div className="flex items-center text-amber-400">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-[11px]">& Up</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-violet-900/30" />

      {/* Availability Toggle */}
      <div>
        <label className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="rounded text-brand-violet focus:ring-brand-violet"
          />
          <span className="font-medium">In Stock Only</span>
        </label>
      </div>

      {/* Reset Filters */}
      <button
        onClick={clearFilters}
        className="w-full py-2 px-3 rounded-xl border border-gray-200 dark:border-violet-900/40 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center justify-center gap-1.5 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Filters</span>
      </button>
    </div>
  );

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-brand-violet">Home</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-semibold">
          {currentCategoryName}
        </span>
        {queryParam && <span>(Search: "{queryParam}")</span>}
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-violet-900/30">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {currentCategoryName}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Showing <span className="font-bold text-brand-violet">{filteredProducts.length}</span> curated products
          </p>
        </div>

        {/* Toolbar: Sort, View Toggle, Mobile Filter Button */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-xs font-semibold text-gray-700 dark:text-gray-200 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-violet" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="hidden sm:inline text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 rounded-xl bg-white dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-xs font-semibold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-brand-violet shadow-sm"
            >
              <option value="featured">Featured & Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>

          {/* View Mode Toggle (Grid / List) */}
          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-[#111836] p-1 rounded-xl border border-gray-200 dark:border-violet-900/40">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-brand-violet text-brand-violet dark:text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-brand-violet text-brand-violet dark:text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm sticky top-24">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-violet-900/30">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-violet" />
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Filters</h3>
            </div>
            <button
              onClick={clearFilters}
              className="text-[11px] font-semibold text-brand-violet hover:underline"
            >
              Clear All
            </button>
          </div>
          {filterSidebar}
        </aside>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileFilterOpen(false)}
            />
            <div className="relative ml-auto w-80 max-w-full h-full bg-white dark:bg-[#0E1433] p-6 shadow-2xl overflow-y-auto z-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-violet-900/40">
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">Filter Products</h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {filterSidebar}
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full mt-6 py-3 rounded-2xl bg-brand-violet text-white font-bold text-xs shadow-lg"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        )}

        {/* Product Grid / List Results */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#0E1433] rounded-3xl border border-gray-100 dark:border-violet-950/40 p-8">
              <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-950/60 text-brand-violet flex items-center justify-center mx-auto mb-4">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No matching products found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mb-6">
                Try loosening your filters, adjusting the price range, or searching with broader keywords.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 rounded-full bg-brand-violet text-white text-xs font-bold shadow-md hover:bg-brand-violet-deep transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-[#0E1433] rounded-3xl p-4 border border-gray-100 dark:border-violet-950/40 shadow-sm flex flex-col sm:flex-row gap-5 items-center hover:shadow-card-hover transition-all"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-36 h-36 object-contain rounded-2xl bg-gray-50 dark:bg-[#121940] p-2 shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1.5 text-left">
                    <div className="flex items-center gap-2">
                      {p.badge && (
                        <span className="text-[10px] font-bold bg-violet-100 dark:bg-violet-950 text-brand-violet px-2 py-0.5 rounded-full">
                          {p.badge}
                        </span>
                      )}
                      <span className="text-xs text-gray-400 font-semibold">{p.brand}</span>
                    </div>
                    <Link to={`/product/${p.id}`}>
                      <h3 className="font-bold text-base text-gray-900 dark:text-white hover:text-brand-violet transition-colors">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {p.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-amber-500 pt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="font-bold text-gray-800 dark:text-gray-200">{p.rating}</span>
                      <span className="text-gray-400">({p.reviewsCount} reviews)</span>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-violet-900/30">
                    <div>
                      <span className="text-lg font-black text-gray-900 dark:text-white block">
                        {formatCurrency(p.price)}
                      </span>
                      {p.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatCurrency(p.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(p)}
                      className="px-4 py-2 rounded-xl bg-brand-violet hover:bg-brand-violet-deep text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-violet-600/30 transition-all"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
