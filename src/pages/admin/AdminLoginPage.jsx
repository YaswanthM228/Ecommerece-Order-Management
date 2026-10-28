import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, Store } from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { useShop } from '../../context/ShopContext';

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useShop();

  const [email, setEmail] = useState('admin@shopsphere.io');
  const [password, setPassword] = useState('admin123');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginAdmin();
    navigate('/admin/dashboard');
  };

  const handleDemoFill = () => {
    setEmail('admin@shopsphere.io');
    setPassword('admin123');
    loginAdmin();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#070A1E] text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="w-96 h-96 bg-violet-600/20 rounded-full blur-3xl absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 relative z-10">
        <div className="inline-block">
          <Logo size="large" variant="light" to="/" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
          <span>Internal Merchant Portal</span>
        </div>
        <h2 className="text-2xl font-black text-white">
          ShopSphere Admin Console
        </h2>
        <p className="text-xs text-gray-400">
          Restricted management environment for store inventory, analytics, and fulfillment.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
        <div className="bg-[#0E1433] py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-violet-900/50 space-y-6">
          {/* Quick 1-Click Demo Login */}
          <button
            type="button"
            onClick={handleDemoFill}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xl shadow-violet-600/30 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>1-Click Demo Admin Sign In</span>
          </button>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-violet-900/40"></div>
            <span className="flex-shrink mx-4 text-[10px] text-gray-400 uppercase font-semibold">Or enter credentials</span>
            <div className="flex-grow border-t border-violet-900/40"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-[#141B3B] border border-violet-900/50 text-white focus:outline-none focus:border-brand-violet"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-300 block mb-1">
                Admin Security Key / Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-[#141B3B] border border-violet-900/50 text-white focus:outline-none focus:border-brand-violet"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <span>Access Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-3 border-t border-violet-900/30 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Return to Customer Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
