import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ThemeToggle = ({ compact = false }) => {
  const { theme, toggleTheme } = useShop();
  const isDark = theme === 'dark';

  if (compact) {
    return (
      <button
        onClick={() => toggleTheme()}
        title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-brand-surface-dark dark:hover:bg-brand-surface-darker text-gray-700 dark:text-gray-300 transition-colors"
      >
        {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-brand-violet" />}
      </button>
    );
  }

  return (
    <div className="bg-[#0D1333] border border-violet-900/40 p-1 rounded-full flex items-center justify-between text-xs font-semibold w-full max-w-[200px]">
      <button
        type="button"
        onClick={() => toggleTheme('light')}
        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full transition-all duration-200 ${
          !isDark
            ? 'bg-white text-gray-900 shadow-md font-bold'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500' : 'text-gray-400'}`} />
        <span>Light</span>
      </button>

      <button
        type="button"
        onClick={() => toggleTheme('dark')}
        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-full transition-all duration-200 ${
          isDark
            ? 'bg-brand-violet text-white shadow-md font-bold'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-violet-200' : 'text-gray-400'}`} />
        <span>Dark</span>
      </button>
    </div>
  );
};
