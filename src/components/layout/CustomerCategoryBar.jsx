import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Laptop,
  Shirt,
  Armchair,
  Sparkles,
  Dumbbell,
  BookOpen,
  Gamepad2,
  ShoppingBag,
  Car,
  MoreHorizontal,
  Tag,
  Store,
  Flame
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CustomerCategoryBar = () => {
  const { setSelectedCategory } = useShop();

  const categoriesList = [
    { name: 'Electronics', slug: 'electronics', icon: Laptop },
    { name: 'Fashion', slug: 'mens-fashion', icon: Shirt },
    { name: 'Home & Living', slug: 'home-living', icon: Armchair },
    { name: 'Beauty', slug: 'beauty-personal-care', icon: Sparkles },
    { name: 'Sports', slug: 'sports-fitness', icon: Dumbbell },
    { name: 'Books', slug: 'books-stationery', icon: BookOpen },
    { name: 'Toys', slug: 'toys-games', icon: Gamepad2 },
    { name: 'Grocery', slug: 'grocery-essentials', icon: ShoppingBag },
    { name: 'Automotive', slug: 'automotive', icon: Car },
    { name: 'More', slug: 'all', icon: MoreHorizontal },
  ];

  return (
    <nav className="bg-white dark:bg-[#0C1130] border-b border-gray-100 dark:border-violet-950/40 px-4 sm:px-6 py-2 transition-colors duration-200">
      <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar text-xs">
        {/* Category Links */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {categoriesList.map((cat) => {
            const Icon = cat.icon;
            return (
              <NavLink
                key={cat.name}
                to={cat.slug === 'all' ? '/categories' : `/category/${cat.slug}`}
                onClick={() => setSelectedCategory(cat.slug)}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-violet-100 dark:bg-violet-950/70 text-brand-violet dark:text-violet-300 ring-1 ring-violet-500/30'
                      : 'text-gray-600 dark:text-gray-300 hover:text-brand-violet dark:hover:text-violet-300 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Right Promotional Actions */}
        <div className="hidden xl:flex items-center gap-3 shrink-0 pl-4 border-l border-gray-200 dark:border-violet-900/40 font-semibold">
          <Link
            to="/deals"
            className="flex items-center gap-1.5 text-rose-500 hover:text-rose-600 dark:text-rose-400 hover:underline transition-colors"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Offers</span>
          </Link>

          <Link
            to="/admin/login"
            className="flex items-center gap-1.5 text-violet-600 dark:text-violet-400 hover:underline transition-colors"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Sell on ShopSphere</span>
          </Link>

          <Link
            to="/deals"
            className="flex items-center gap-1.5 text-amber-500 hover:text-amber-600 dark:text-amber-400 hover:underline transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Deals</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
