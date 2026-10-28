import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search, ShoppingBag, Sparkles } from 'lucide-react';
import { Logo } from '../../components/common/Logo';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-16 text-center">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="relative inline-block">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-tr from-violet-600/20 via-purple-600/30 to-indigo-600/20 border border-violet-500/30 flex items-center justify-center mx-auto shadow-2xl backdrop-blur-md">
            <span className="text-6xl sm:text-7xl font-black bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-500 bg-clip-text text-transparent">
              404
            </span>
          </div>
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand-violet text-white flex items-center justify-center shadow-lg">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            The page or product you're looking for might have been moved, renamed, or is temporarily unavailable in the ShopSphere catalog.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 font-bold text-sm flex items-center gap-2 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-violet-600/30 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            to="/categories"
            className="px-6 py-3 rounded-full bg-violet-50 dark:bg-violet-950/60 hover:bg-violet-100 text-brand-violet dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/40 font-bold text-sm flex items-center gap-2 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Browse Categories</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
