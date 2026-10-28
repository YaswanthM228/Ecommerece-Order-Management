import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const BrandsPage = () => {
  const { products } = useShop();

  const brands = [
    { name: 'Apple', count: 12, category: 'Mobiles & Tablets', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&q=80' },
    { name: 'Dell', count: 8, category: 'Laptops & Accessories', image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80' },
    { name: 'Nike', count: 18, category: "Men's Fashion", image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80' },
    { name: 'boAt', count: 15, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80' },
    { name: 'OnePlus', count: 9, category: 'Mobiles & Tablets', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80' },
    { name: 'Sony', count: 14, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
    { name: 'Versace', count: 6, category: 'Beauty & Personal Care', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=400&q=80' },
    { name: 'Green Soul', count: 7, category: 'Home & Living', image: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=400&q=80' },
    { name: 'Zara', count: 22, category: "Women's Fashion", image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80' }
  ];

  return (
    <div className="w-full px-6 sm:px-8 py-6 min-w-0 space-y-8">
      <div className="pb-4 border-b border-gray-200 dark:border-violet-900/30">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Featured Brand Partners
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Explore genuine items backed by official brand warranty and guaranteed authenticity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((b) => (
          <Link
            key={b.name}
            to={`/products?q=${encodeURIComponent(b.name)}`}
            className="group bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between"
          >
            <div className="aspect-video w-full rounded-2xl bg-gray-50 dark:bg-[#121940] overflow-hidden mb-4 p-2 flex items-center justify-center">
              <img
                src={b.image}
                alt={b.name}
                className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-lg text-gray-900 dark:text-white group-hover:text-brand-violet transition-colors">
                  {b.name}
                </h3>
                <span className="text-sm text-gray-400">{b.category}</span>
              </div>
              <span className="w-9 h-9 rounded-full bg-violet-50 dark:bg-violet-950/60 text-brand-violet flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
