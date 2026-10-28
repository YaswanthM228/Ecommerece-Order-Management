import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

export const CategoryTile = ({ category }) => {
  const { setSelectedCategory } = useShop();

  return (
    <Link
      to={`/category/${category.slug}`}
      onClick={() => setSelectedCategory(category.slug)}
      className="group flex flex-col items-center text-center p-2.5 rounded-2xl bg-white dark:bg-[#0E1433] border border-gray-100 dark:border-violet-950/40 hover:border-violet-300 dark:hover:border-violet-700/50 hover:shadow-card-hover transition-all duration-300 w-24 sm:w-28 shrink-0 select-none"
    >
      {/* Category Image Box */}
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/20 p-1.5 flex items-center justify-center overflow-hidden mb-2 group-hover:scale-105 transition-transform duration-300">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Category Name */}
      <span className="text-[11px] font-bold text-gray-700 dark:text-gray-200 group-hover:text-brand-violet dark:group-hover:text-violet-400 transition-colors line-clamp-2 leading-tight">
        {category.name}
      </span>
    </Link>
  );
};
