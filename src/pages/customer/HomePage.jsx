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
  Heart,
  Check
} from 'lucide-react';
import { ProductCard } from '../../components/products/ProductCard';
import { CategoryTile } from '../../components/products/CategoryTile';
import { CountdownTimer } from '../../components/products/CountdownTimer';
import { useShop } from '../../context/ShopContext';
import { categories } from '../../data/mockCategories';

export const HomePage = () => {
  const navigate = useNavigate();
  const { products, setSelectedCategory } = useShop();

  // Hero carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      badge: 'NEXT GEN TECH',
      headlinePart1: 'Upgrade',
      headlinePart2: 'Your World',
      subline: 'Latest Gadgets. Smarter Living. Bigger Possibilities.',
      cta: 'Shop Electronics',
      category: 'electronics',
      discount: '50%',
      // High-aesthetic tech devices composition
      laptopImg: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80',
      phoneImg: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=500&q=80',
      watchImg: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80',
      headphonesImg: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=500&q=80',
      earbudsImg: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=80',
      brands: ['Apple', 'Samsung', 'OnePlus', 'boAt', 'JBL']
    },
    {
      badge: 'FESTIVAL OF FASHION',
      headlinePart1: 'Redefine',
      headlinePart2: 'Your Style',
      subline: 'Autumn & Winter Drops from Global Designer Brands.',
      cta: 'Explore Apparel',
      category: 'mens-fashion',
      discount: '45%',
      laptopImg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80',
      phoneImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80',
      watchImg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
      headphonesImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
      earbudsImg: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80',
      brands: ['Nike', 'Zara', 'Puma', 'Levis', 'H&M']
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  // Group products matching reference design
  const dealProducts = products.filter((p) => p.isDeal).slice(0, 6);
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);
  const bestSellerProducts = products.filter((p) => p.isBestSeller).slice(0, 4);
  const recommendedProducts = products.filter((p) => p.isRecommended).slice(0, 4);

  return (
    <div className="space-y-7 sm:space-y-9 p-4 sm:p-6 lg:p-7 max-w-[1600px] mx-auto select-none">
      {/* 1. Hero & Side Banners Grid (Exact Reference Matching) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        {/* Main Hero Banner (Col 8) */}
        <div className="lg:col-span-8 rounded-3xl overflow-hidden relative min-h-[440px] sm:min-h-[480px] bg-gradient-to-br from-[#090D26] via-[#140E3E] to-[#2B1059] text-white p-6 sm:p-10 flex flex-col justify-between shadow-2xl border border-violet-900/40 group">
          {/* Cosmic Aura & Neon Light Rings in background */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-violet-600/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
          
          {/* Subtle neon ring arc */}
          <div className="absolute right-12 top-16 w-80 h-80 rounded-full border border-violet-500/30 opacity-70 pointer-events-none" />
          <div className="absolute right-8 top-12 w-96 h-96 rounded-full border border-purple-400/15 opacity-40 pointer-events-none" />

          {/* Top Left: Badge & Headline */}
          <div className="relative z-10 max-w-md">
            <span className="inline-block text-[10px] sm:text-xs font-black tracking-widest uppercase text-violet-300 bg-violet-500/20 border border-violet-400/30 px-3.5 py-1 rounded-full mb-3 backdrop-blur-md">
              {heroSlides[currentSlide].badge}
            </span>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-white">
              {heroSlides[currentSlide].headlinePart1} <br />
              <span className="bg-gradient-to-r from-violet-300 via-purple-200 to-white bg-clip-text text-transparent">
                {heroSlides[currentSlide].headlinePart2}
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-violet-200/80 mt-3 mb-6 max-w-sm leading-relaxed font-medium">
              {heroSlides[currentSlide].subline}
            </p>

            <button
              onClick={() => {
                setSelectedCategory(heroSlides[currentSlide].category);
                navigate(`/category/${heroSlides[currentSlide].category}`);
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full shadow-xl shadow-violet-600/40 transition-all active:scale-95 group/btn"
            >
              <span>{heroSlides[currentSlide].cta}</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Floating "Up to 50% Off" Circular Badge (Matches reference) */}
          <div className="absolute top-8 sm:top-10 right-8 sm:right-28 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-600 text-white flex flex-col items-center justify-center text-center p-1 shadow-2xl border-2 border-violet-300/60 ring-4 ring-violet-500/20 animate-pulse">
            <span className="text-[9px] uppercase font-bold tracking-wider leading-none">Up to</span>
            <span className="text-base sm:text-xl font-black leading-tight">50%</span>
            <span className="text-[9px] font-bold uppercase leading-none">Off</span>
          </div>

          {/* Tech Composition on Glowing Pedestal (Matches Reference Centerpiece) */}
          <div className="absolute right-4 sm:right-8 bottom-16 sm:bottom-14 w-64 sm:w-[420px] h-48 sm:h-64 pointer-events-none hidden sm:flex items-end justify-center">
            {/* Glowing circular pedestal base */}
            <div className="absolute bottom-2 w-64 sm:w-80 h-12 bg-gradient-to-r from-violet-600/40 via-purple-500/50 to-indigo-600/40 rounded-full blur-md" />
            <div className="absolute bottom-4 w-52 sm:w-64 h-3 bg-violet-400/40 rounded-full blur-xs" />

            <div className="relative w-full h-full flex items-end justify-center">
              {/* Laptop in center-left */}
              <img
                src={heroSlides[currentSlide].laptopImg}
                alt="Laptop"
                className="w-48 sm:w-60 object-contain z-10 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] -translate-x-4 mb-2"
              />
              {/* Phone standing beside */}
              <img
                src={heroSlides[currentSlide].phoneImg}
                alt="Smartphone"
                className="w-20 sm:w-24 object-contain z-20 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] -translate-x-2 mb-1"
              />
              {/* Smartwatch */}
              <img
                src={heroSlides[currentSlide].watchImg}
                alt="Smartwatch"
                className="w-14 sm:w-16 object-contain z-30 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)] -translate-x-1 mb-0"
              />
              {/* Over-ear headphones on right */}
              <img
                src={heroSlides[currentSlide].headphonesImg}
                alt="Headphones"
                className="w-24 sm:w-28 object-contain z-10 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] translate-x-2 mb-3"
              />
            </div>
          </div>

          {/* Carousel Arrows on Left and Right edges */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors z-20"
            title="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors z-20"
            title="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Bottom Brand Strip & Indicator Dots */}
          <div className="relative z-10 pt-4 border-t border-violet-800/40 flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-4 text-xs font-semibold text-violet-300/80">
              <span className="text-[10px] text-violet-400 uppercase tracking-widest font-black">BRANDS:</span>
              <div className="flex items-center gap-3">
                {heroSlides[currentSlide].brands.map((b) => (
                  <span
                    key={b}
                    onClick={() => navigate(`/products?q=${b}`)}
                    className="hover:text-white transition-colors cursor-pointer text-xs font-bold tracking-wide"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Pagination Indicators */}
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
          </div>
        </div>

        {/* 3 Stacked Promotional Cards (Col 4) */}
        <div className="lg:col-span-4 flex flex-col gap-3.5 justify-between">
          {/* Card 1: Fashion Trends */}
          <div className="flex-1 rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-[#2A0845] to-[#1F0735] text-white relative overflow-hidden flex items-center justify-between shadow-md border border-purple-800/30 group">
            <div className="relative z-10 max-w-[62%]">
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">Fashion Trends</h3>
              <p className="text-xs text-purple-200 mt-1 mb-3 font-bold">Min. 40% Off</p>
              <button
                onClick={() => {
                  setSelectedCategory('mens-fashion');
                  navigate('/category/mens-fashion');
                }}
                className="text-xs font-bold bg-white text-purple-950 hover:bg-purple-100 px-3.5 py-1.5 rounded-xl inline-flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80"
              alt="Fashion Trends"
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-md shrink-0"
            />
          </div>

          {/* Card 2: Home Essentials */}
          <div className="flex-1 rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-[#0F1E4A] to-[#0A1435] text-white relative overflow-hidden flex items-center justify-between shadow-md border border-blue-800/30 group">
            <div className="relative z-10 max-w-[62%]">
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">Home Essentials</h3>
              <p className="text-[11px] text-blue-200 mt-0.5">Make Your Space Better</p>
              <p className="text-xs text-blue-300 font-bold mb-3">Min. 30% Off</p>
              <button
                onClick={() => {
                  setSelectedCategory('home-living');
                  navigate('/category/home-living');
                }}
                className="text-xs font-bold bg-white text-blue-950 hover:bg-blue-100 px-3.5 py-1.5 rounded-xl inline-flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80"
              alt="Home Essentials"
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-md shrink-0"
            />
          </div>

          {/* Card 3: Beauty & Care */}
          <div className="flex-1 rounded-3xl p-4 sm:p-5 bg-gradient-to-r from-[#430838] to-[#2D0525] text-white relative overflow-hidden flex items-center justify-between shadow-md border border-pink-900/30 group">
            <div className="relative z-10 max-w-[62%]">
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">Beauty & Care</h3>
              <p className="text-[11px] text-pink-200 mt-0.5">Glow Every Day</p>
              <p className="text-xs text-pink-300 font-bold mb-3">Min. 40% Off</p>
              <button
                onClick={() => {
                  setSelectedCategory('beauty-personal-care');
                  navigate('/category/beauty-personal-care');
                }}
                className="text-xs font-bold bg-white text-pink-950 hover:bg-pink-100 px-3.5 py-1.5 rounded-xl inline-flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80"
              alt="Beauty & Care"
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-md shrink-0"
            />
          </div>
        </div>
      </section>

      {/* 2. Service Benefits Strip */}
      <section className="bg-white dark:bg-[#0E1433] rounded-3xl p-4 sm:p-5 border border-gray-100 dark:border-violet-950/40 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-violet-950/40 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3.5 px-3 py-1">
            <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-brand-violet dark:text-violet-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">Free Shipping</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">On Orders Above ₹999</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3.5 px-3 py-1">
            <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-brand-violet dark:text-violet-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">Easy Returns</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Within 7 Days</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3.5 px-3 py-1">
            <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-brand-violet dark:text-violet-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">Secure Payment</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">100% Safe & Secure</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3.5 px-3 py-1">
            <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-brand-violet dark:text-violet-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">24/7 Support</h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">We're Here for You</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3.5 px-3 py-1">
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

      {/* 3. Top Categories Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">
            Top Categories
          </h2>
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

      {/* 4. Today's Deals Section + Dedicated VIP Promo Card (Matches Reference Image) */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500 fill-rose-500" />
              <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">
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

        {/* Desktop Layout: 6 Deal Cards + Dedicated VIP Card on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* 6 Products Grid (Col 10 on wide screens) */}
          <div className="lg:col-span-9 xl:col-span-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
            {dealProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} priority={idx < 4} />
            ))}
          </div>

          {/* ShopSphere VIP Card Widget (Col 3 or 2 on wide screen, exactly matching reference image right side!) */}
          <div className="lg:col-span-3 xl:col-span-2 rounded-3xl p-5 bg-gradient-to-b from-[#180F3E] via-[#241355] to-[#3B1778] text-white border border-violet-500/40 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300">
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold tracking-tight">ShopSphere</h3>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">VIP</span>
                </div>
              </div>

              <p className="text-xs font-bold text-violet-200">
                Unlock Exclusive Benefits
              </p>

              <ul className="text-[11px] text-violet-200/90 space-y-2 pt-1 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Extra 10% Off</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Early Access to Sales</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Free & Fast Delivery</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Exclusive Support</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 relative z-10 space-y-3">
              <button
                onClick={() => navigate('/vip-membership')}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg transition-transform active:scale-95"
              >
                <span>Join VIP Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* VIP Card Representation at bottom */}
              <div className="w-full h-24 rounded-2xl bg-gradient-to-tr from-purple-900 to-indigo-900 border border-amber-400/30 p-2.5 flex flex-col justify-between shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-amber-300">ShopSphere VIP</span>
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <p className="text-[10px] font-mono tracking-widest text-violet-300">•••• 4289</p>
                <span className="text-[8px] text-violet-300/80 uppercase">GOLD PRIVILEGE MEMBER</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-violet" />
              <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">
                New Arrivals
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Latest products just for you</p>
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

      {/* 6. Best-Selling Products Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">
                Best Selling Products
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Trending across ShopSphere</p>
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

      {/* 7. Recommended For You Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <h2 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">
                Recommended For You
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Picked based on your interests</p>
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
