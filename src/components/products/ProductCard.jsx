import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';

export const ProductCard = ({ product, priority = false }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const wishlisted = isInWishlist(product.id);

  // Exact Badge Colors from reference design
  const badgeStyles = {
    'Best Seller': 'bg-[#F97316] text-white',
    'Limited Deal': 'bg-[#EF4444] text-white',
    'New': 'bg-[#4F46E5] text-white',
    'Trending': 'bg-[#F59E0B] text-white',
    'Premium': 'bg-[#2563EB] text-white',
    'Popular': 'bg-[#E11D48] text-white',
  };

  return (
    <div className="group relative bg-white dark:bg-[#0E1433] rounded-3xl p-3 border border-gray-100 dark:border-violet-950/40 shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Media container */}
      <div className="relative aspect-square w-full rounded-2xl bg-white dark:bg-[#121940] overflow-hidden mb-2.5 flex items-center justify-center border border-gray-50 dark:border-violet-900/20">
        {/* Promotional Badge on Top-Left */}
        {product.badge && (
          <span
            className={`absolute top-2.5 left-2.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-full z-10 shadow-sm tracking-wide ${
              badgeStyles[product.badge] || 'bg-brand-violet text-white'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart Button on Top-Right */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full backdrop-blur-md transition-all duration-200 ${
            wishlisted
              ? 'bg-rose-50 text-rose-500 shadow-sm scale-105'
              : 'bg-white/80 dark:bg-black/40 text-gray-400 hover:text-rose-500 hover:scale-105'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-rose-500 stroke-rose-500' : ''}`} />
        </button>

        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center p-2.5">
          <img
            src={product.image}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-contain object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        </Link>
      </div>

      {/* Information Area */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-extrabold text-xs sm:text-[13px] text-gray-900 dark:text-white line-clamp-1 group-hover:text-brand-violet dark:group-hover:text-violet-400 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Subtitle / Key Specs (e.g. Intel i5 | 16GB | 512GB SSD) */}
          <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5 mb-1.5 font-medium">
            {product.subtitle || product.brand}
          </p>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-1.5 flex-wrap mb-1">
            <span className="text-xs sm:text-sm font-black text-gray-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            {product.discount > 0 && (
              <span className="text-[9px] font-bold text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-1 py-0.2 rounded">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-2.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
            </div>
            <span className="font-bold text-gray-800 dark:text-gray-200 text-[11px]">
              {product.rating}
            </span>
            <span className="text-[10px] text-gray-400">
              ({product.reviewsCount > 999 ? `${(product.reviewsCount / 1000).toFixed(1)}k` : product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-violet-600/20 active:scale-[0.98] transition-all"
        >
          <ShoppingCart className="w-3 h-3" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};
