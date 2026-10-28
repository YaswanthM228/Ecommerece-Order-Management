import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  LayoutGrid,
  Flame,
  Sparkles,
  TrendingUp,
  Award,
  Gift,
  Truck,
  HelpCircle,
  Bell,
  Heart,
  User,
  Crown,
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import { useShop } from '../../context/ShopContext';

export const CustomerSidebar = ({ isOpen, onClose }) => {
  const { unreadNotificationsCount, wishlist, user } = useShop();
  const navigate = useNavigate();

  const mainNavLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Categories', path: '/categories', icon: LayoutGrid },
    { name: 'Deals', path: '/deals', icon: Flame },
    { name: 'New Arrivals', path: '/new-arrivals', icon: Sparkles },
    { name: 'Best Sellers', path: '/best-sellers', icon: TrendingUp },
    { name: 'Brands', path: '/brands', icon: Award },
    { name: 'Gift Cards', path: '/gift-cards', icon: Gift },
    { name: 'Track Order', path: '/track-order', icon: Truck },
  ];

  const secondaryNavLinks = [
    { name: 'Help & Support', path: '/support', icon: HelpCircle },
    {
      name: 'Notifications',
      path: '/account/notifications',
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : null
    },
    {
      name: 'Wishlist',
      path: '/wishlist',
      icon: Heart,
      badge: wishlist.length > 0 ? wishlist.length : null
    },
    { name: 'My Account', path: '/account/profile', icon: User },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#090D26] text-gray-300 w-64 select-none border-r border-violet-950/40">
      {/* Top Branding Section */}
      <div className="p-5 pb-4 flex items-center justify-between border-b border-violet-900/30">
        <Logo size="normal" variant="light" />
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Scrollable Navigation Body */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Main Navigation */}
        <div className="space-y-1">
          {mainNavLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-700/30 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-violet-900/30 my-3" />

        {/* Secondary Navigation */}
        <div className="space-y-1">
          {secondaryNavLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-violet-900/40 text-violet-300 border border-violet-700/40 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span className="truncate">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-brand-violet text-white text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-sm">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* VIP Membership Promo Card (as in reference image) */}
        <div className="rounded-2xl p-4 bg-gradient-to-br from-[#1C134A] via-[#2A166A] to-[#3B178A] border border-violet-500/30 text-white relative overflow-hidden shadow-xl shadow-purple-950/40 group">
          {/* Subtle celestial background orb */}
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-violet-400/20 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-300">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-tight">ShopSphere</h4>
              <p className="text-[10px] text-violet-200/80 font-medium -mt-0.5">Premium Membership</p>
            </div>
          </div>

          <ul className="text-[11px] text-violet-200/90 space-y-1 mb-3">
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span>Extra 10% Off</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span>Free Delivery</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span>Early Access</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span>Exclusive Deals</span>
            </li>
          </ul>

          <button
            onClick={() => {
              if (onClose) onClose();
              navigate('/vip-membership');
            }}
            className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-400 hover:to-indigo-400 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-violet-900/40 transition-all active:scale-95"
          >
            <span>Join Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Theme Control */}
      <div className="p-4 border-t border-violet-900/30 flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 z-30 w-64 overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile / Tablet Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="relative z-10 w-72 h-full shadow-2xl animate-slide-right">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
