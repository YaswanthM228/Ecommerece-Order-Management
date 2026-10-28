import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link, useParams, useLocation, useNavigate } from 'react-router-dom';
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
  Heart,
  ArrowLeft,
  Flame,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';
import { ProductCard } from '../../components/products/ProductCard';

export const ProductListingPage = () => {
  const { categorySlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('q') || searchParams.get('query') || '';
  const initialCat = categorySlug || searchParams.get('category') || searchParams.get('cat') || 'all';

  const { products, categories, addToCart, toggleWishlist, isInWishlist } = useShop();

  // Mode detection based on pathname
  const isDealsRoute = location.pathname.includes('/deals') || searchParams.get('deal') === 'true';
  const isNewArrivalsRoute = location.pathname.includes('/new-arrivals');
  const isBestSellersRoute = location.pathname.includes('/best-sellers');

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState(350000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state whenever URL or route changes
  useEffect(() => {
    const nextCat = categorySlug || searchParams.get('category') || searchParams.get('cat') || 'all';
    setSelectedCategory(nextCat);
  }, [categorySlug, searchParams, location.pathname]);

  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));
    return ['all', ...list.sort()];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search text matching
        if (queryParam) {
          const matchQuery =
            p.name.toLowerCase().includes(queryParam.toLowerCase()) ||
            (p.category && p.category.toLowerCase().includes(queryParam.toLowerCase())) ||
            (p.brand && p.brand.toLowerCase().includes(queryParam.toLowerCase())) ||
            (p.description && p.description.toLowerCase().includes(queryParam.toLowerCase())) ||
            (p.sku && p.sku.toLowerCase().includes(queryParam.toLowerCase()));
          if (!matchQuery) return false;
        }

        // Special collection routes
        if (isDealsRoute && !p.isDeal) return false;
        if (isNewArrivalsRoute && !p.isNew) return false;
        if (isBestSellersRoute && !p.isBestSeller) return false;
        if (searchParams.get('discount') === 'true' && (!p.discount || p.discount < 10)) return false;

        // Category filter
        if (selectedCategory !== 'all') {
          const targetSlug = selectedCategory.toLowerCase();
          // Support alias "electronics" -> mobiles or laptops
          if (targetSlug === 'electronics') {
            if (p.categorySlug !== 'mobiles-tablets' && p.categorySlug !== 'laptops-accessories') {
              return false;
            }
          } else {
            const matchesSlug = p.categorySlug && p.categorySlug.toLowerCase() === targetSlug;
            const matchesName = p.category && p.category.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-') === targetSlug;
            const matchesExact = p.category && p.category.toLowerCase() === targetSlug;
            if (!matchesSlug && !matchesName && !matchesExact) {
              return false;
            }
          }
        }

        // Brand filter
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
          return false;
        }

        // Minimum rating
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }

        // Price ceiling
        if (p.price > priceRange) {
          return false;
        }

        // Stock availability
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
        return 0;
      });
  }, [
    products,
    queryParam,
    selectedCategory,
    selectedBrand,
    minRating,
    priceRange,
    inStockOnly,
    sortBy,
    isDealsRoute,
    isNewArrivalsRoute,
    isBestSellersRoute
  ]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setMinRating(0);
    setPriceRange(350000);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
    if (categorySlug) {
      navigate('/products');
    }
  };

  const getPageHeaderTitle = () => {
    if (queryParam) return `Search Results for "${queryParam}"`;
    if (isDealsRoute) return "Today's Exclusive Deals";
    if (searchParams.get('discount') === 'true') return 'Special Discount Offers';
    if (isNewArrivalsRoute) return 'New Arrivals & Fresh Drops';
    if (isBestSellersRoute) return 'Best Selling Products';
    if (selectedCategory === 'all') return 'All Products Catalog';
    const foundCat = categories.find((c) => c.slug === selectedCategory);
    return foundCat ? foundCat.name : selectedCategory.replace(/-/g, ' ');
  };

  const currentCategoryName =
    selectedCategory === 'all'
      ? 'All Products'
      : categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory;

  const filterSidebar = (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-gray-900 dark:text-white mb-3">
          Category
        </h4>
        <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
          <label className="flex items-center justify-between text-xs sm:text-sm cursor-pointer p-2 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-950/40">
            <div className="flex items-center gap-2.5">
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
            <span className="text-xs text-gray-400">({products.length})</span>
          </label>
          {categories.map((c) => (
            <label
              key={c.id}
              className="flex items-center justify-between text-xs sm:text-sm cursor-pointer p-2 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-950/40"
            >
              <div className="flex items-center gap-2.5">
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
              <span className="text-xs text-gray-400">({c.count})</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-violet-900/30" />

      {/* Price Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
            Max Price
          </h4>
          <span className="text-sm font-extrabold text-brand-violet dark:text-violet-400">
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
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹1,000</span>
          <span>₹1,50,000</span>
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-violet-900/30" />

      {/* Brand Filter */}
      <div>
        <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-gray-900 dark:text-white mb-2.5">
          Brand
        </h4>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/50 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus:border-brand-violet"
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
        <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-gray-900 dark:text-white mb-2.5">
          Customer Rating
        </h4>
        <div className="space-y-2">
          {[4, 3, 2].map((stars) => (
            <label
              key={stars}
              className="flex items-center gap-2.5 text-xs sm:text-sm cursor-pointer text-gray-700 dark:text-gray-300"
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
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold">& Up</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-violet-900/30" />

      {/* Availability Toggle */}
      <div>
        <label className="flex items-center gap-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="rounded text-brand-violet focus:ring-brand-violet w-4 h-4"
          />
          <span className="font-semibold">In Stock Only</span>
        </label>
      </div>

      {/* Reset Filters */}
      <button
        onClick={clearFilters}
        className="w-full py-2.5 px-3.5 rounded-xl border border-gray-200 dark:border-violet-900/40 text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center justify-center gap-2 transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Reset Filters</span>
      </button>
    </div>
  );

  return (
    <div className="w-full px-6 sm:px-8 py-6 sm:py-8 space-y-6 min-w-0">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
        <Link to="/" className="hover:text-brand-violet">Home</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-bold">
          {getPageHeaderTitle()}
        </span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-violet-900/30">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            {getPageHeaderTitle()}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Showing <span className="font-bold text-brand-violet">{filteredProducts.length}</span> curated products
          </p>
        </div>

        {/* Toolbar: Sort, View Toggle, Mobile Filter Button */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-violet" />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <span className="hidden sm:inline text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2.5 rounded-xl bg-white dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-brand-violet shadow-sm"
            >
              <option value="featured">Featured & Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>

          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-[#111836] p-1 rounded-xl border border-gray-200 dark:border-violet-900/40">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
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
              className={`p-2 rounded-lg transition-colors ${
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Desktop Filter Sidebar (Col 3) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm sticky top-28">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-violet-900/30">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-brand-violet" />
              <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">Filters</h3>
            </div>
            <button
              onClick={clearFilters}
              className="text-xs sm:text-sm font-bold text-brand-violet hover:underline"
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
                  <h3 className="font-extrabold text-base text-gray-900 dark:text-white">Filter Products</h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {filterSidebar}
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full mt-6 py-3 rounded-2xl bg-brand-violet text-white font-bold text-sm shadow-lg"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        )}

        {/* Product Grid / List Results (Col 9 / full remaining width) */}
        <div className="lg:col-span-9 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-[#0E1433] rounded-3xl border border-gray-100 dark:border-violet-950/40 p-8">
              <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-950/60 text-brand-violet flex items-center justify-center mx-auto mb-4">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">No matching products found</h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mb-6">
                Try loosening your filters, adjusting the price range, or searching with broader keywords.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 rounded-full bg-brand-violet text-white text-xs sm:text-sm font-bold shadow-md hover:bg-brand-violet-deep transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4.5">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white dark:bg-[#0E1433] rounded-3xl p-5 border border-gray-100 dark:border-violet-950/40 shadow-sm flex flex-col sm:flex-row gap-6 items-center hover:shadow-card-hover transition-all"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-40 h-40 object-contain rounded-2xl bg-gray-50 dark:bg-[#121940] p-3 shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-2 text-left">
                    <div className="flex items-center gap-2.5">
                      {p.badge && (
                        <span className="text-xs font-black uppercase bg-violet-100 dark:bg-violet-950 text-brand-violet px-2.5 py-0.5 rounded-full">
                          {p.badge}
                        </span>
                      )}
                      <span className="text-xs sm:text-sm text-gray-400 font-bold">{p.brand}</span>
                    </div>
                    <Link to={`/product/${p.id}`}>
                      <h3 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white hover:text-brand-violet transition-colors">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {p.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-500 pt-1">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="font-bold text-gray-800 dark:text-gray-200">{p.rating}</span>
                      <span className="text-gray-400">({p.reviewsCount} reviews)</span>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-violet-900/30">
                    <div>
                      <span className="text-lg sm:text-xl font-black text-gray-900 dark:text-white block">
                        {formatCurrency(p.price)}
                      </span>
                      {p.originalPrice && (
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          {formatCurrency(p.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(p)}
                      className="px-5 py-2.5 rounded-xl bg-brand-violet hover:bg-brand-violet-deep text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-violet-600/30 transition-all"
                    >
                      <ShoppingCart className="w-4 h-4" />
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
