import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Tag,
  Flame,
  Crown,
  Sparkles,
  TrendingUp,
  Heart
} from 'lucide-react';
import { ProductCard } from '../../components/products/ProductCard';
import { CategoryTile } from '../../components/products/CategoryTile';
import { CountdownTimer } from '../../components/products/CountdownTimer';
import { useShop, formatCurrency } from '../../context/ShopContext';
import { categories } from '../../data/mockCategories';

export const HomePage = () => {
  const navigate = useNavigate();
  const { products, setSelectedCategory } = useShop();

  // Hero carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      badge: 'NEXT GEN TECH',
      headline: 'Upgrade Your World',
      subline: 'Latest Gadgets. Smarter Living. Bigger Possibilities.',
      cta: 'Shop Electronics',
      category: 'electronics',
      discount: 'Up to 50% Off',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
      brands: ['Apple', 'Samsung', 'OnePlus', 'boAt', 'JBL']
    },
    {
      badge: 'FESTIVAL OF FASHION',
      headline: 'Redefine Your Style',
      subline: 'Autumn & Winter Drops from Global Designer Brands.',
      cta: 'Explore Apparel',
      category: 'mens-fashion',
      discount: 'Min. 40% Off',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      brands: ['Nike', 'Zara', 'Puma', 'Levis', 'H&M']
    },
    {
      badge: 'HOME SANCTUARY',
      headline: 'Elevate Every Room',
      subline: 'Modern Ergonomics, Ambient Decor, and Smart Spaces.',
      cta: 'Discover Living',
      category: 'home-living',
      discount: 'Flat 35% Off',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      brands: ['Urban Ladder', 'Green Soul', 'IKEA', 'Philips']
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Group products
  const dealProducts = products.filter((p) => p.isDeal).slice(0, 6);
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);
  const bestSellerProducts = products.filter((p) => p.isBestSeller).slice(0, 4);
  const recommendedProducts = products.filter((p) => p.isRecommended).slice(0, 4);

  return (
    <div className="space-y-8 sm:space-y-10 p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* 1. Hero & Side Banners Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Hero Banner (Col 8) */}
        <div className="lg:col-span-8 rounded-3xl overflow-hidden relative min-h-[420px] sm:min-h-[460px] bg-gradient-to-br from-[#090D26] via-[#161042] to-[#2E1260] text-white p-6 sm:p-10 flex flex-col justify-between shadow-2xl border border-violet-900/30">
          {/* Cosmic Aura & Pedestal Glow */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-violet-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Pill / Badge & Headline */}
          <div className="relative z-10 max-w-md">
            <span className="inline-block text-[10px] sm:text-xs font-black tracking-widest uppercase bg-violet-500/30 border border-violet-400/40 text-violet-200 px-3 py-1 rounded-full mb-3 backdrop-blur-md">
              {heroSlides[currentSlide].badge}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
              {heroSlides[currentSlide].headline}
            </h1>
            <p className="text-xs sm:text-sm text-violet-200/90 mt-3 mb-6 leading-relaxed">
              {heroSlides[currentSlide].subline}
            </p>

            <button
              onClick={() => {
                setSelectedCategory(heroSlides[currentSlide].category);
                navigate(`/category/${heroSlides[currentSlide].category}`);
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg shadow-violet-700/40 transition-all active:scale-95"
            >
              <span>{heroSlides[currentSlide].cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Hero Imagery Composed */}
          <div className="absolute right-4 sm:right-10 bottom-8 sm:bottom-12 w-48 sm:w-80 h-48 sm:h-72 pointer-events-none hidden sm:block">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Floating Discount Badge */}
              <div className="absolute -top-4 right-4 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-brand-violet to-indigo-500 text-white flex flex-col items-center justify-center text-center p-1 shadow-xl border-2 border-white/40 animate-pulse">
                <span className="text-[9px] uppercase font-bold tracking-wider leading-none">Up to</span>
                <span className="text-sm sm:text-base font-black leading-tight">50%</span>
                <span className="text-[9px] font-bold uppercase leading-none">Off</span>
              </div>

              {/* Glowing Pedestal & Tech Composition */}
              <img
                src={heroSlides[currentSlide].image}
                alt="Hero Showcase"
                className="w-full h-full object-contain rounded-2xl filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
              />
            </div>
          </div>

          {/* Bottom Brand Strip & Carousel Controls */}
          <div className="relative z-10 pt-6 border-t border-violet-800/40 flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-4 text-xs font-semibold text-violet-300/80">
              <span className="text-[11px] text-violet-400 uppercase tracking-wider">Top Brands:</span>
              {heroSlides[currentSlide].brands.map((b) => (
                <span key={b} className="hover:text-white transition-colors cursor-pointer">
                  {b}
                </span>
              ))}
            </div>

            {/* Arrows & Dots */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                title="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1.5">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentSlide ? 'w-6 bg-brand-violet' : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                title="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Stacked Promotional Banners (Col 4) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Banner 1: Fashion Trends */}
          <div className="flex-1 rounded-3xl p-5 bg-gradient-to-r from-purple-900 to-indigo-950 text-white relative overflow-hidden flex items-center justify-between shadow-md border border-purple-800/30 group">
            <div className="relative z-10 max-w-[60%]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">New Season</span>
              <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">Fashion Trends</h3>
              <p className="text-xs text-purple-200 mt-0.5 mb-3 font-semibold">Min. 40% Off</p>
              <button
                onClick={() => {
                  setSelectedCategory('mens-fashion');
                  navigate('/category/mens-fashion');
                }}
                className="text-xs font-bold bg-white text-purple-950 hover:bg-purple-100 px-3 py-1.5 rounded-xl inline-flex items-center gap-1 transition-all"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80"
              alt="Fashion Trends"
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-md"
            />
          </div>

          {/* Banner 2: Home Essentials */}
          <div className="flex-1 rounded-3xl p-5 bg-gradient-to-r from-[#172554] to-[#1e1b4b] text-white relative overflow-hidden flex items-center justify-between shadow-md border border-blue-800/30 group">
            <div className="relative z-10 max-w-[60%]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">Interior</span>
              <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">Home Essentials</h3>
              <p className="text-xs text-blue-200 mt-0.5 mb-3 font-semibold">Make Your Space Better</p>
              <button
                onClick={() => {
                  setSelectedCategory('home-living');
                  navigate('/category/home-living');
                }}
                className="text-xs font-bold bg-white text-blue-950 hover:bg-blue-100 px-3 py-1.5 rounded-xl inline-flex items-center gap-1 transition-all"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80"
              alt="Home Essentials"
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-md"
            />
          </div>

          {/* Banner 3: Beauty & Care */}
          <div className="flex-1 rounded-3xl p-5 bg-gradient-to-r from-[#4A044E] to-[#3B0764] text-white relative overflow-hidden flex items-center justify-between shadow-md border border-pink-900/30 group">
            <div className="relative z-10 max-w-[60%]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300">Self Care</span>
              <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">Beauty & Care</h3>
              <p className="text-xs text-pink-200 mt-0.5 mb-3 font-semibold">Glow Every Day</p>
              <button
                onClick={() => {
                  setSelectedCategory('beauty-personal-care');
                  navigate('/category/beauty-personal-care');
                }}
                className="text-xs font-bold bg-white text-pink-950 hover:bg-pink-100 px-3 py-1.5 rounded-xl inline-flex items-center gap-1 transition-all"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80"
              alt="Beauty & Care"
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-md"
            />
          </div>
        </div>
      </section>

      {/* 2. Service Benefits Strip */}
      <section className="bg-white dark:bg-[#0E1433] rounded-3xl p-4 sm:p-5 border border-gray-100 dark:border-violet-950/40 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-violet-950/40 text-center md:text-left">
          {/* Benefit 1 */}
          <div className="flex items-center justify-center md:justify-start gap-3.5 px-2 py-1">
            <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-brand-violet dark:text-violet-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">Free Shipping</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">On Orders Above ₹999</p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="flex items-center justify-center md:justify-start gap-3.5 px-2 py-1">
            <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-brand-violet dark:text-violet-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">Easy Returns</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Within 7 Days</p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="flex items-center justify-center md:justify-start gap-3.5 px-2 py-1">
            <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-brand-violet dark:text-violet-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">Secure Payment</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">100% Safe & Secure</p>
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="flex items-center justify-center md:justify-start gap-3.5 px-2 py-1">
            <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-brand-violet dark:text-violet-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">24/7 Support</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">We're Here for You</p>
            </div>
          </div>

          {/* Benefit 5 */}
          <div className="flex items-center justify-center md:justify-start gap-3.5 px-2 py-1">
            <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-brand-violet dark:text-violet-400 flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">Best Offers</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">On Top Brands</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Top Categories Horizontal Strip */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Top Categories
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Explore items across all departments</p>
          </div>
          <Link
            to="/categories"
            className="text-xs font-bold text-brand-violet hover:text-brand-violet-deep dark:text-violet-400 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <CategoryTile key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 4. Today's Deals Section (With countdown & VIP card banner) */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Today's Deals
              </h2>
            </div>
            <CountdownTimer />
          </div>

          <Link
            to="/deals"
            className="text-xs font-bold text-brand-violet hover:text-brand-violet-deep dark:text-violet-400 flex items-center gap-1 group"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6-Column Responsive Product Grid + VIP Promo Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {dealProducts.map((p, idx) => (
            <ProductCard key={p.id} product={p} priority={idx < 4} />
          ))}
        </div>
      </section>

      {/* 5. VIP Club Highlight Banner */}
      <section className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#170E3A] via-[#261559] to-[#3B197A] text-white border border-violet-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-extrabold uppercase mb-3">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>ShopSphere VIP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black leading-tight text-white">
            Unlock Unlimited Free Delivery & Extra 10% Off
          </h2>
          <p className="text-xs sm:text-sm text-violet-200 mt-2 mb-4 leading-relaxed">
            Join the VIP club to get early access to blockbuster sales, premium priority customer support, and members-only cashbacks.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('/vip-membership')}
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              <span>Join VIP Now (₹999/yr)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-violet-300 font-medium">Cancel anytime • 30-day money-back guarantee</span>
          </div>
        </div>

        <div className="relative z-10 w-60 h-44 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-4 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold">ShopSphere VIP</p>
                <p className="text-[10px] text-violet-300">Gold Tier Card</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-400/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">ACTIVE</span>
          </div>
          <p className="text-sm font-mono tracking-widest text-violet-200">•••• •••• •••• 4289</p>
          <div className="flex justify-between text-[10px] text-violet-300 border-t border-white/10 pt-2">
            <span>MEMBER SINCE 2026</span>
            <span>UNLIMITED PERKS</span>
          </div>
        </div>
      </section>

      {/* 6. New Arrivals Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-violet" />
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                New Arrivals
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Latest products just added for you</p>
          </div>
          <Link
            to="/new-arrivals"
            className="text-xs font-bold text-brand-violet hover:text-brand-violet-deep dark:text-violet-400 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {newProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 7. Best-Selling Products Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Best Selling Products
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Top rated and loved across India</p>
          </div>
          <Link
            to="/best-sellers"
            className="text-xs font-bold text-brand-violet hover:text-brand-violet-deep dark:text-violet-400 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestSellerProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 8. Recommended For You Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Recommended For You
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Handpicked selections based on your shopping preferences</p>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-brand-violet hover:text-brand-violet-deep dark:text-violet-400 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommendedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};
