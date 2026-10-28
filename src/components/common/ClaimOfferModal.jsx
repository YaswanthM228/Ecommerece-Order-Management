import React from 'react';
import { Gift, X, Sparkles, Check, Copy } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ClaimOfferModal = () => {
  const { isClaimOfferOpen, setIsClaimOfferOpen, applyCoupon, showToast } = useShop();

  if (!isClaimOfferOpen) return null;

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code);
    applyCoupon(code);
    showToast(`Code ${code} applied to cart!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#0E132B] w-full max-w-md rounded-3xl shadow-2xl border border-violet-100 dark:border-violet-900/50 p-6 relative overflow-hidden text-center">
        {/* Close Button */}
        <button
          onClick={() => setIsClaimOfferOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-violet-900/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative background glow */}
        <div className="w-32 h-32 bg-violet-500/20 rounded-full blur-3xl absolute -top-10 -left-10 pointer-events-none" />

        {/* Gift Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/30">
          <Gift className="w-8 h-8 animate-bounce-subtle" />
        </div>

        <span className="inline-block text-[11px] font-bold tracking-wider uppercase bg-violet-100 dark:bg-violet-950 text-brand-violet px-3 py-1 rounded-full mb-2">
          Exclusive Reward
        </span>

        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
          Claim Flat 10% Off
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Use this instant coupon on your next order across all premium electronics, fashion, and home lifestyle collections!
        </p>

        {/* Coupon Box */}
        <div className="bg-violet-50 dark:bg-[#141B3B] border-2 border-dashed border-violet-300 dark:border-violet-700/60 p-4 rounded-2xl flex items-center justify-between mb-6">
          <div className="text-left">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Coupon Code</p>
            <p className="text-xl font-black text-brand-violet dark:text-violet-400 tracking-wider">SPHERE10</p>
          </div>
          <button
            onClick={() => copyCode('SPHERE10')}
            className="flex items-center gap-1.5 bg-brand-violet hover:bg-brand-violet-deep text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Apply Now</span>
          </button>
        </div>

        <button
          onClick={() => setIsClaimOfferOpen(false)}
          className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-semibold transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
