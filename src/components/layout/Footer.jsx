import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { Send, CheckCircle2, ShieldCheck, Truck, RefreshCw, Headphones, Heart } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#090D26] text-gray-400 pt-16 pb-12 border-t border-violet-950/50 mt-16 transition-colors">
      <div className="w-full px-6 sm:px-8 lg:px-12 min-w-0">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-violet-900/30">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="normal" variant="light" />
            <p className="text-sm text-gray-400 max-w-md leading-relaxed mt-3">
              ShopSphere is your destination for next-gen technology, premium fashion, and elevated living essentials. Designed for smarter living and bigger possibilities.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="w-10 h-10 rounded-xl bg-white/5 border border-violet-900/40 flex items-center justify-center text-gray-300 hover:text-white hover:bg-violet-600 transition-all cursor-pointer font-bold">
                𝕏
              </span>
              <span className="w-10 h-10 rounded-xl bg-white/5 border border-violet-900/40 flex items-center justify-center text-gray-300 hover:text-white hover:bg-violet-600 transition-all cursor-pointer font-bold">
                in
              </span>
              <span className="w-10 h-10 rounded-xl bg-white/5 border border-violet-900/40 flex items-center justify-center text-gray-300 hover:text-white hover:bg-violet-600 transition-all cursor-pointer font-bold">
                ig
              </span>
              <span className="w-10 h-10 rounded-xl bg-white/5 border border-violet-900/40 flex items-center justify-center text-gray-300 hover:text-white hover:bg-violet-600 transition-all cursor-pointer font-bold">
                fb
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3.5">
            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">Shopping</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/category/electronics" className="hover:text-white transition-colors">Electronics & Gadgets</Link></li>
              <li><Link to="/category/mens-fashion" className="hover:text-white transition-colors">Men's & Women's Fashion</Link></li>
              <li><Link to="/category/home-living" className="hover:text-white transition-colors">Home & Living</Link></li>
              <li><Link to="/deals" className="hover:text-white transition-colors">Today's Deals</Link></li>
              <li><Link to="/vip-membership" className="hover:text-white transition-colors">VIP Membership</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3.5">
            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/support" className="hover:text-white transition-colors">Help Center & FAQ</Link></li>
              <li><Link to="/track-order" className="hover:text-white transition-colors">Track Your Order</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/support" className="hover:text-white transition-colors">Shipping Policies</Link></li>
              <li><Link to="/admin/dashboard" className="text-violet-400 hover:text-violet-300 font-bold transition-colors">Admin Portal Demo</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3.5">
            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">Stay Connected</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Subscribe to unlock flash sales, early access drops, and exclusive voucher codes.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-[#111836] border border-violet-900/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-violet"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 bg-brand-violet hover:bg-brand-violet-deep text-white rounded-lg flex items-center justify-center text-sm transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500 block">No spam. Unsubscribe at any time.</span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 ShopSphere. Designed with care for modern commerce. Demo prototype.</p>
          <div className="flex items-center gap-6">
            <Link to="/support" className="hover:text-gray-300">Privacy Policy</Link>
            <Link to="/support" className="hover:text-gray-300">Terms of Service</Link>
            <Link to="/support" className="hover:text-gray-300">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
