import React, { useState } from 'react';
import {
  Crown,
  Check,
  Zap,
  Truck,
  ShieldCheck,
  Headphones,
  Tag,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const VIPMembershipPage = () => {
  const { user, showToast } = useShop();
  const [billingCycle, setBillingCycle] = useState('annual'); // annual | monthly
  const [isSubscribed, setIsSubscribed] = useState(user?.isVip || false);

  const handleJoin = (planName) => {
    setIsSubscribed(true);
    showToast(`Congratulations! You are now an active ShopSphere VIP ${planName} Member!`);
  };

  const perks = [
    { title: 'Unlimited Free Express Delivery', desc: 'No minimum cart value required on any order.' },
    { title: 'Extra 10% Instant Discount', desc: 'Applies automatically at checkout on all products.' },
    { title: '24-Hour Early Access', desc: 'Shop blockbuster Diwali, Prime, and Holiday sales ahead of everyone else.' },
    { title: 'Exclusive VIP Deals', desc: 'Special members-only pricing on Apple, Dell, Nike & premium fragrances.' },
    { title: 'Priority 24/7 Dedicated Support', desc: 'Dedicated concierge line with instant agent resolution.' },
    { title: 'Hassle-Free 14-Day Returns', desc: 'Double the return window with doorstep priority pickup.' }
  ];

  return (
    <div className="max-w-[1440px] mx-auto p-4 sm:p-6 lg:p-8 space-y-12">
      {/* Hero */}
      <div className="rounded-3xl bg-gradient-to-br from-[#120B2F] via-[#241355] to-[#431A7A] text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl border border-violet-500/30">
        <div className="w-48 h-48 bg-violet-500/20 rounded-full blur-3xl absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>ShopSphere VIP Club</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Elevate Your Shopping World
          </h1>

          <p className="text-sm sm:text-base text-violet-200">
            Enjoy unlimited free delivery, guaranteed 10% extra savings, and first-in-line access to global drops.
          </p>

          {/* Billing Switch */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === 'annual'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Annual (Save 40%)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Monthly Plan
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Regular Customer */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-8 border border-gray-200 dark:border-violet-900/40 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Standard Account</h3>
            <p className="text-xs text-gray-500">Everyday shopping access with standard delivery.</p>
            <div className="text-3xl font-black text-gray-900 dark:text-white">
              ₹0 <span className="text-xs font-normal text-gray-400">/ forever</span>
            </div>

            <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300 pt-4 border-t border-gray-100 dark:border-violet-900/30">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Standard 3-5 day delivery</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Free delivery only above ₹999</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 line-through">
                <span>Extra 10% off coupon code</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 line-through">
                <span>Early access to flash sales</span>
              </li>
            </ul>
          </div>

          <button
            disabled
            className="w-full mt-8 py-3 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-400 text-xs font-bold"
          >
            Current Standard Plan
          </button>
        </div>

        {/* VIP Member Card */}
        <div className="bg-gradient-to-b from-[#1C1242] to-[#2B1466] text-white rounded-3xl p-8 border-2 border-amber-400/60 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-amber-400 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full">
            Recommended
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-extrabold text-white">VIP Club Pass</h3>
            </div>
            <p className="text-xs text-violet-200">The ultimate e-commerce advantage.</p>
            <div className="text-3xl font-black text-amber-300">
              {billingCycle === 'annual' ? '₹999' : '₹99'}{' '}
              <span className="text-xs font-normal text-violet-200">
                {billingCycle === 'annual' ? '/ year (Just ₹83/mo)' : '/ month'}
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-violet-100 pt-4 border-t border-violet-800/60">
              {perks.map((p, i) => (
                <li key={i} className="flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{p.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => handleJoin(billingCycle === 'annual' ? 'Annual' : 'Monthly')}
            className="w-full mt-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>{isSubscribed ? 'Membership Active ✓' : 'Subscribe to VIP Club'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
