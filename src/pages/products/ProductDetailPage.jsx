import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  MapPin,
  Check,
  Share2,
  ChevronRight,
  MessageSquare,
  ThumbsUp
} from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';
import { ProductCard } from '../../components/products/ProductCard';

export const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist, showToast } = useShop();

  const product = products.find((p) => p.id === productId) || products[0];
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeMessage, setPincodeMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'reviews' | 'features'

  const wishlisted = isInWishlist(product.id);

  // Pincode validation demo
  const checkDeliveryPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
      setPincodeMessage({ valid: false, text: 'Please enter a valid 6-digit Indian PIN code.' });
      return;
    }
    setPincodeMessage({
      valid: true,
      text: `Express Delivery available to ${pincode}! Guaranteed delivery by Friday with Free VIP Shipping.`
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link copied to clipboard!');
  };

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.categorySlug === product.categorySlug || p.brand === product.brand))
    .slice(0, 4);

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-brand-violet">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/category/${product.categorySlug}`} className="hover:text-brand-violet">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 dark:text-white font-semibold truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Product Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery (Col 6) */}
        <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
            {gallery.map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(imgUrl)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-[#0E1433] p-1.5 border-2 transition-all overflow-hidden flex items-center justify-center ${
                  selectedImage === imgUrl
                    ? 'border-brand-violet shadow-md scale-105'
                    : 'border-gray-200 dark:border-violet-900/30 hover:border-violet-400'
                }`}
              >
                <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-contain rounded-xl" />
              </button>
            ))}
          </div>

          {/* Main Large Image Container */}
          <div className="flex-1 bg-white dark:bg-[#0E1433] rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-violet-950/40 shadow-sm flex items-center justify-center relative min-h-[380px] sm:min-h-[460px] group">
            {product.badge && (
              <span className="absolute top-5 left-5 text-xs font-black uppercase px-3 py-1 rounded-full bg-brand-violet text-white shadow-md z-10">
                {product.badge}
              </span>
            )}
            <button
              onClick={handleShare}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-gray-50 dark:bg-[#151D44] text-gray-500 hover:text-brand-violet transition-colors z-10 shadow-sm"
              title="Share Product"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full max-h-[360px] object-contain group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right Column: Buying Details (Col 6) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Brand & Title */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-extrabold text-brand-violet uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{product.category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
              {product.subtitle}
            </p>
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/40 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400 underline cursor-pointer">
              {product.reviewsCount} verified ratings
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              In Stock ({product.stock} units available)
            </span>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-violet-50/60 dark:bg-[#12193E] border border-violet-100 dark:border-violet-900/40">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-gray-900 dark:text-white">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-gray-400 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              {product.discount > 0 && (
                <span className="text-xs font-bold text-rose-600 bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded-full">
                  Save {product.discount}%
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
              Inclusive of all taxes. EMI starts at ₹{Math.round(product.price / 12)}/month.
            </p>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Quantity:</span>
              <div className="flex items-center bg-gray-100 dark:bg-[#111836] rounded-xl border border-gray-200 dark:border-violet-900/40 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-violet-900/40 transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-xs">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-violet-900/40 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-600/30 active:scale-[0.98] transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Buy Now</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-center ${
                  wishlisted
                    ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-500'
                    : 'border-gray-200 dark:border-violet-900/40 text-gray-500 hover:text-rose-500 hover:border-rose-300'
                }`}
                title={wishlisted ? 'Remove Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-rose-500 stroke-rose-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Delivery & Pincode Checker */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1433] border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white">
              <MapPin className="w-4 h-4 text-brand-violet" />
              <span>Check Delivery & Availability</span>
            </div>
            <form onSubmit={checkDeliveryPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit Pincode (e.g. 560038)"
                className="flex-1 px-3 py-2 text-xs bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 rounded-xl focus:outline-none focus:border-brand-violet"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-brand-violet text-white text-xs font-bold rounded-xl hover:bg-brand-violet-deep transition-colors"
              >
                Check
              </button>
            </form>
            {pincodeMessage && (
              <p className={`text-xs font-semibold ${pincodeMessage.valid ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                {pincodeMessage.text}
              </p>
            )}
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-3 gap-3 text-center pt-2">
            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-violet-900/20">
              <Truck className="w-4 h-4 text-brand-violet mx-auto mb-1" />
              <span className="text-[10px] font-bold block text-gray-700 dark:text-gray-300">Free Delivery</span>
              <span className="text-[9px] text-gray-400">On orders above ₹999</span>
            </div>
            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-violet-900/20">
              <RotateCcw className="w-4 h-4 text-brand-violet mx-auto mb-1" />
              <span className="text-[10px] font-bold block text-gray-700 dark:text-gray-300">7 Days Return</span>
              <span className="text-[9px] text-gray-400">Hassle-free replacement</span>
            </div>
            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-violet-900/20">
              <ShieldCheck className="w-4 h-4 text-brand-violet mx-auto mb-1" />
              <span className="text-[10px] font-bold block text-gray-700 dark:text-gray-300">Brand Warranty</span>
              <span className="text-[9px] text-gray-400">100% Genuine product</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Description, Reviews */}
      <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-6">
        <div className="flex gap-4 border-b border-gray-100 dark:border-violet-900/40 pb-3">
          <button
            onClick={() => setActiveTab('specs')}
            className={`text-xs sm:text-sm font-bold pb-2 transition-colors relative ${
              activeTab === 'specs'
                ? 'text-brand-violet dark:text-violet-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-violet'
                : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`text-xs sm:text-sm font-bold pb-2 transition-colors relative ${
              activeTab === 'features'
                ? 'text-brand-violet dark:text-violet-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-violet'
                : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'
            }`}
          >
            Overview & Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-xs sm:text-sm font-bold pb-2 transition-colors relative ${
              activeTab === 'reviews'
                ? 'text-brand-violet dark:text-violet-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-violet'
                : 'text-gray-500 hover:text-gray-800 dark:hover:text-white'
            }`}
          >
            Verified Reviews ({product.reviewsCount})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'specs' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <tbody className="divide-y divide-gray-100 dark:divide-violet-900/30">
                {product.specs && Object.keys(product.specs).length > 0 ? (
                  Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-500 dark:text-gray-400 w-1/3 sm:w-1/4">
                        {key}
                      </td>
                      <td className="py-3 px-4 text-gray-800 dark:text-gray-200 font-medium">
                        {value}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-4 text-gray-400">Standard specifications apply for this genuine item.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl space-y-3">
            <p>{product.description}</p>
            <p>
              Engineered with premium materials and tested rigorously to deliver unmatched reliability and performance. Every unit comes backed by certified brand warranty and full technical support.
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-violet-900/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-base font-black text-gray-900 dark:text-white">Customer Feedback</p>
                <p className="text-xs text-gray-500">94% of buyers recommend this product</p>
              </div>
              <button
                onClick={() => showToast('Review modal opened')}
                className="px-4 py-2 rounded-xl bg-brand-violet text-white text-xs font-bold shadow-md hover:bg-brand-violet-deep transition-all"
              >
                Write a Review
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl border border-gray-100 dark:border-violet-900/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-gray-800 dark:text-white">Vikram K.</span>
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  "Exceeded all my expectations! Build quality is top notch and delivery was extremely fast."
                </p>
                <span className="text-[10px] text-gray-400 block pt-1">Verified Purchase • 2 days ago</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
            Related Products You Might Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
