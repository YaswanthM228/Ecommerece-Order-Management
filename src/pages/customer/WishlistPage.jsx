import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';
import { ProductCard } from '../../components/products/ProductCard';

export const WishlistPage = () => {
  const { wishlist, products, addToCart, toggleWishlist } = useShop();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="w-full px-6 sm:px-8 py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Heart className="w-12 h-12" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
          Your Wishlist is Empty
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-8 leading-relaxed">
          Save your favourite gadgets, watches, shoes, and lifestyle pieces to inspect specs and purchase anytime.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-violet-600/30 hover:scale-105 transition-all"
        >
          <span>Discover Products</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full px-6 sm:px-8 py-6 min-w-0 space-y-8">
      <div className="pb-4 border-b border-gray-200 dark:border-violet-900/30 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            My Wishlist
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {wishlistedProducts.length} items saved for future purchase
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        {wishlistedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
