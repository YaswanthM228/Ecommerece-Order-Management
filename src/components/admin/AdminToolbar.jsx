import React from 'react';
import { Menu, Bell, Search, Shield, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { Link } from 'react-router-dom';

export const AdminToolbar = ({ onOpenSidebar, pageTitle = 'Dashboard' }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/95 dark:bg-[#080C24]/95 backdrop-blur-md border-b border-gray-100 dark:border-violet-950/40 px-6 sm:px-8 py-3.5 transition-colors">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 font-medium hidden sm:inline">Admin /</span>
            <h1 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white">
              {pageTitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <Link
            to="/"
            target="_blank"
            className="hidden md:flex items-center gap-1.5 text-sm font-bold text-violet-600 dark:text-violet-400 hover:underline px-3.5 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950/60"
          >
            <span>Live Store</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <ThemeToggle compact />

          <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-violet-900/40">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
              AD
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Admin Control</p>
              <p className="text-xs text-gray-400 leading-tight">admin@shopsphere.io</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
