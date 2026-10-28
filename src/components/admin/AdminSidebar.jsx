import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  Users,
  Boxes,
  BarChart3,
  Settings,
  Store,
  LogOut,
  ShieldCheck,
  X
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useShop } from '../../context/ShopContext';

export const AdminSidebar = ({ isOpen, onClose }) => {
  const { logoutAdmin } = useShop();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { name: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 },
    { name: 'Store Settings', path: '/admin/settings', icon: Settings },
  ];

  const content = (
    <div className="flex flex-col h-full bg-[#080C24] text-slate-300 w-64 select-none border-r border-violet-950/40">
      {/* Brand Header */}
      <div className="p-5 pb-4 flex items-center justify-between border-b border-violet-900/30">
        <div className="flex items-center gap-2">
          <Logo size="normal" variant="light" to="/admin/dashboard" showTagline={false} />
          <span className="text-xs font-black uppercase tracking-wider bg-violet-600 text-white px-2.5 py-0.5 rounded-full ml-1">
            PORTAL
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-700/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-violet-900/30 space-y-2.5">
        <Link
          to="/"
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 hover:bg-emerald-900/50 transition-colors"
        >
          <Store className="w-4 h-4 shrink-0" />
          <span>Switch to Storefront</span>
        </Link>

        <button
          onClick={() => {
            logoutAdmin();
            navigate('/admin/login');
          }}
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out Admin</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 z-30 w-64 overflow-hidden">
        {content}
      </aside>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="relative z-10 w-72 h-full shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
