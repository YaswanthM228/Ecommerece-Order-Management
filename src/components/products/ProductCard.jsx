import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';

export const ProductCard = ({ product, priority = false }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const wishlisted = isInWishlist(product.id);

  const badgeStyles = {
    'Best Seller': 'bg-[#F97316] text-white',
    'Limited Deal': 'bg-[#EF4444] text-white',
    'Deal of the Day': 'bg-gradient-to-r from-rose-500 to-amber-500 text-white',
    'New': 'bg-[#4F46E5] text-white',
    'Trending': 'bg-[#F59E0B] text-white',
    'Featured': 'bg-[#7C3AED] text-white',
    'Premium': 'bg-[#2563EB] text-white',
    'Popular': 'bg-[#E11D48] text-white',
    'Bestseller': 'bg-[#F97316] text-white',
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className="group relative bg-white dark:bg-[#0E1433] rounded-3xl p-3.5 sm:p-4 border border-gray-100 dark:border-violet-950/40 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden min-w-0"
    >
      {/* Media container */}
      <div className="relative aspect-square w-full rounded-2xl bg-gray-50/70 dark:bg-[#121940] overflow-hidden mb-3 flex items-center justify-center border border-gray-100/80 dark:border-violet-900/20">
        {/* Promotional Badge on Top-Left */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full z-10 shadow-sm tracking-wide ${
              badgeStyles[product.badge] || 'bg-brand-violet text-white'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart Button on Top-Right */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            wishlisted
              ? 'bg-rose-50 text-rose-500 shadow-sm scale-105'
              : 'bg-white/85 dark:bg-black/50 text-gray-400 hover:text-rose-500 hover:scale-105'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 stroke-rose-500' : ''}`} />
        </motion.button>

        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center p-3">
          <img
            src={product.image}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-contain object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        </Link>
      </div>

      {/* Information Area with Readable 14-16px Typography */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Title (Target: 14-16px) */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-extrabold text-[15px] sm:text-base text-gray-900 dark:text-white line-clamp-1 group-hover:text-brand-violet dark:group-hover:text-violet-400 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Subtitle / Key Specs (e.g. Intel i5 | 16GB | 512GB SSD) */}
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1 mb-2 font-medium">
            {product.subtitle || product.brand}
          </p>

          {/* Pricing Row (Target: 16-20px) */}
          <div className="flex items-baseline gap-2 flex-wrap mb-1.5">
            <span className="text-base sm:text-lg font-black text-gray-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-xs font-bold text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
            </div>
            <span className="font-bold text-gray-800 dark:text-gray-200 text-xs sm:text-sm">
              {product.rating}
            </span>
            <span className="text-xs text-gray-400">
              ({product.reviewsCount > 999 ? `${(product.reviewsCount / 1000).toFixed(1)}k` : product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => addToCart(product)}
          className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-violet-600/25 active:scale-[0.98] transition-all"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
