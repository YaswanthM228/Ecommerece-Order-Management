import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Smartphone,
  Laptop,
  Shirt,
  Sparkles,
  Armchair,
  Heart,
  Dumbbell,
  BookOpen,
  Gamepad2,
  ShoppingBag,
  Car,
  MoreHorizontal,
  Tag,
  Flame
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CustomerCategoryBar = () => {
  const { setSelectedCategory } = useShop();

  const categoriesList = [
    { name: 'Mobiles', slug: 'mobiles-tablets', icon: Smartphone },
    { name: 'Laptops', slug: 'laptops-accessories', icon: Laptop },
    { name: "Men's Fashion", slug: 'mens-fashion', icon: Shirt },
    { name: "Women's Fashion", slug: 'womens-fashion', icon: Sparkles },
    { name: 'Home & Living', slug: 'home-living', icon: Armchair },
    { name: 'Beauty', slug: 'beauty-personal-care', icon: Heart },
    { name: 'Sports', slug: 'sports-fitness', icon: Dumbbell },
    { name: 'Books', slug: 'books-stationery', icon: BookOpen },
    { name: 'Toys & Games', slug: 'toys-games', icon: Gamepad2 },
    { name: 'Grocery', slug: 'grocery-essentials', icon: ShoppingBag },
    { name: 'Automotive', slug: 'automotive', icon: Car },
    { name: 'All Categories', slug: 'all', icon: MoreHorizontal },
  ];

  return (
    <nav className="bg-white dark:bg-[#0C1130] border-b border-gray-100 dark:border-violet-950/40 px-6 sm:px-8 py-2.5 transition-colors duration-200">
      <div className="flex items-center justify-between gap-6 overflow-x-auto no-scrollbar text-sm">
        {/* Category Links */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {categoriesList.map((cat) => {
            const Icon = cat.icon;
            return (
              <NavLink
                key={cat.name}
                to={cat.slug === 'all' ? '/categories' : `/category/${cat.slug}`}
                onClick={() => setSelectedCategory(cat.slug)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap text-xs sm:text-sm ${
                    isActive
                      ? 'bg-violet-100 dark:bg-violet-950 text-brand-violet dark:text-violet-300 ring-1 ring-violet-500/30'
                      : 'text-gray-700 dark:text-gray-300 hover:text-brand-violet dark:hover:text-violet-300 hover:bg-gray-100 dark:hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5 shrink-0 text-brand-violet/80 dark:text-violet-400" />
                <span>{cat.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Quick Highlights: Today's Deals & Flash Sale */}
        <div className="hidden xl:flex items-center gap-4 shrink-0 pl-4 border-l border-gray-200 dark:border-violet-900/30">
          <NavLink
            to="/deals"
            className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors whitespace-nowrap"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>Today's Deals</span>
          </NavLink>
          <NavLink
            to="/products?discount=true"
            className="flex items-center gap-1.5 text-xs font-bold text-brand-violet dark:text-violet-400 hover:text-violet-300 transition-colors whitespace-nowrap"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Extra 20% Off</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
