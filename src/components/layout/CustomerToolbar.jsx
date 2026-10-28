import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Mic,
  Heart,
  ShoppingCart,
  ChevronDown,
  User,
  Package,
  Settings,
  LogOut,
  Shield,
  Menu,
  Crown
} from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';
import { categories } from '../../data/mockCategories';

export const CustomerToolbar = ({ onOpenSidebar }) => {
  const navigate = useNavigate();
  const {
    cartItemCount,
    cartTotal,
    wishlist,
    user,
    logoutUser,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useShop();

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const categoryRef = useRef(null);
  const accountRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setCategoryDropdownOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    navigate(`/products?q=${encodeURIComponent(localSearch)}&cat=${selectedCategory}`);
  };

  const handleCategorySelect = (catSlug) => {
    setSelectedCategory(catSlug);
    setCategoryDropdownOpen(false);
    navigate(catSlug === 'all' ? '/products' : `/category/${catSlug}`);
  };

  const selectedCatLabel =
    selectedCategory === 'all'
      ? 'All Categories'
      : categories.find((c) => c.slug === selectedCategory)?.name || 'All Categories';

  return (
    <header className="sticky top-0 z-20 bg-white/95 dark:bg-[#090D26]/95 backdrop-blur-md border-b border-gray-100 dark:border-violet-950/40 px-4 sm:px-6 py-2.5 transition-colors duration-200">
      <div className="flex items-center justify-between gap-3 sm:gap-6">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar Container matching reference */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-3xl flex items-center bg-gray-50/80 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 rounded-full pl-3 pr-1.5 py-1 focus-within:border-brand-violet focus-within:ring-2 focus-within:ring-violet-400/20 transition-all shadow-sm"
        >
          {/* Category Dropdown Pill */}
          <div className="relative shrink-0" ref={categoryRef}>
            <button
              type="button"
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:text-brand-violet px-2.5 py-1.5 rounded-full hover:bg-gray-200/50 dark:hover:bg-white/5 transition-colors"
            >
              <span className="truncate max-w-[110px]">{selectedCatLabel}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {categoryDropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-[#111836] rounded-2xl shadow-2xl border border-gray-100 dark:border-violet-900/50 py-2 z-50 animate-fade-in max-h-72 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => handleCategorySelect('all')}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-violet-50 dark:hover:bg-violet-950/50 transition-colors ${
                    selectedCategory === 'all'
                      ? 'text-brand-violet font-bold'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleCategorySelect(c.slug)}
                    className={`w-full text-left px-4 py-2 text-xs hover:bg-violet-50 dark:hover:bg-violet-950/50 transition-colors flex items-center justify-between ${
                      selectedCategory === c.slug
                        ? 'text-brand-violet font-bold bg-violet-50/70 dark:bg-violet-950/40'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] text-gray-400 font-normal">({c.count})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-gray-200 dark:bg-violet-900/50 mx-1.5" />

          {/* Search Input */}
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search for products, brands and more..."
            className="flex-1 bg-transparent px-2 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none min-w-0"
          />

          {/* Search Button (purple rounded square with search icon) */}
          <button
            type="submit"
            className="bg-brand-violet hover:bg-brand-violet-deep text-white p-2 rounded-xl flex items-center justify-center transition-all shadow-md shadow-violet-600/30 active:scale-95 shrink-0"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Microphone Icon beside search button (as in screenshot) */}
          <button
            type="button"
            title="Voice Search (Demo)"
            className="flex items-center justify-center p-2 text-gray-400 hover:text-brand-violet transition-colors ml-1"
          >
            <Mic className="w-4 h-4" />
          </button>
        </form>

        {/* Right Actions: Wishlist, Cart, Profile (Matches Screenshot) */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-gray-700 dark:text-gray-200 hover:text-brand-violet dark:hover:text-violet-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors relative"
            title="Wishlist"
          >
            <div className="relative">
              <Heart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold hidden md:inline">Wishlist</span>
          </Link>

          {/* Cart Icon + Badge + Label: "Cart ₹2,499" */}
          <Link
            to="/cart"
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-violet-50 dark:bg-violet-950/50 hover:bg-violet-100 dark:hover:bg-violet-900/60 text-brand-violet dark:text-violet-300 transition-colors border border-violet-200/60 dark:border-violet-800/40 shadow-sm"
            title="Shopping Cart"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-violet text-white text-[10px] font-black px-1.5 py-0.2 rounded-full min-w-[18px] text-center shadow-md">
                  {cartItemCount}
                </span>
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-gray-500 dark:text-violet-300/80 font-medium leading-none">Cart</span>
              <span className="text-xs font-black leading-tight text-gray-900 dark:text-white">
                {formatCurrency(cartTotal)}
              </span>
            </div>
          </Link>

          {/* User Account Dropdown */}
          <div className="relative" ref={accountRef}>
            <button
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              className="flex items-center gap-2 p-1 sm:px-2 sm:py-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-violet-500/50 shadow-sm"
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                  Hello, {user ? user.name.split(' ')[0] : 'Guest'}
                </span>
                <span className="text-xs font-extrabold text-gray-800 dark:text-white flex items-center gap-1 leading-tight">
                  Account
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </span>
              </div>
            </button>

            {accountDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-[#111836] rounded-2xl shadow-2xl border border-gray-100 dark:border-violet-900/50 py-2 z-50 animate-fade-in divide-y divide-gray-100 dark:divide-violet-900/30">
                <div className="px-4 py-3">
                  <p className="text-xs font-bold text-gray-900 dark:text-white">{user?.name || 'Guest User'}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{user?.email || 'guest@shopsphere.demo'}</p>
                  {user?.isVip && (
                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 font-black px-2 py-0.5 rounded-full">
                      <Crown className="w-3 h-3 text-amber-500" />
                      VIP Gold Member
                    </span>
                  )}
                </div>

                <div className="py-1 text-xs">
                  <Link
                    to="/account/profile"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-violet-50 dark:hover:bg-violet-950/50 text-gray-700 dark:text-gray-300"
                  >
                    <User className="w-4 h-4 text-brand-violet" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/account/orders"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-violet-50 dark:hover:bg-violet-950/50 text-gray-700 dark:text-gray-300"
                  >
                    <Package className="w-4 h-4 text-brand-violet" />
                    <span>My Orders</span>
                  </Link>
                  <Link
                    to="/vip-membership"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-violet-50 dark:hover:bg-violet-950/50 text-amber-600 dark:text-amber-400 font-semibold"
                  >
                    <Crown className="w-4 h-4" />
                    <span>VIP Club Benefits</span>
                  </Link>
                  <Link
                    to="/account/settings"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-violet-50 dark:hover:bg-violet-950/50 text-gray-700 dark:text-gray-300"
                  >
                    <Settings className="w-4 h-4 text-brand-violet" />
                    <span>Account Settings</span>
                  </Link>
                </div>

                {/* Admin Portal Gateway */}
                <div className="py-1 text-xs">
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setAccountDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-extrabold"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin Portal</span>
                  </Link>
                </div>

                <div className="py-1 text-xs">
                  {user ? (
                    <button
                      onClick={() => {
                        logoutUser();
                        setAccountDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-brand-violet hover:bg-violet-50 dark:hover:bg-violet-950/40 font-semibold"
                    >
                      <User className="w-4 h-4" />
                      <span>Sign In / Register</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
