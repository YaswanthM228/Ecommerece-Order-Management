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
      <div className="max-w-4xl mx-auto p-8 sm:p-16 text-center">
        <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-8">
          Save your favourite gadgets, watches, shoes, and lifestyle pieces to buy them anytime.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg shadow-violet-600/30 hover:scale-105 transition-all"
        >
          <span>Discover Products</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="pb-4 border-b border-gray-200 dark:border-violet-900/30 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            My Wishlist
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {wishlistedProducts.length} items saved
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {wishlistedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
