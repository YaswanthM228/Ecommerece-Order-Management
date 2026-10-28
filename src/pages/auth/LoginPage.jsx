import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { useShop } from '../../context/ShopContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useShop();

  const [email, setEmail] = useState('yash.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ name: 'Yash Sharma', email });
    navigate('/');
  };

  const handleDemoLogin = () => {
    loginUser({ name: 'Yash Sharma', email: 'yash.sharma@example.com' });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] dark:bg-[#070A1E] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="inline-block">
          <Logo size="large" variant="dark" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">
          Sign In to Your Account
        </h2>
        <p className="text-xs text-gray-500">
          Or{' '}
          <Link to="/signup" className="font-bold text-brand-violet hover:underline">
            create a new ShopSphere account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-[#0E1433] py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-gray-100 dark:border-violet-950/40 space-y-6">
          {/* Quick Demo Login Pill */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-4 rounded-2xl bg-violet-100 dark:bg-violet-950/60 hover:bg-violet-200 text-brand-violet dark:text-violet-300 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-violet-300/50"
          >
            <Sparkles className="w-4 h-4 text-brand-violet" />
            <span>1-Click Demo Sign In (Yash Sharma)</span>
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <Link to="/forgot-password" className="text-[11px] text-brand-violet font-semibold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-brand-violet rounded border-gray-300 focus:ring-brand-violet"
              />
              <label htmlFor="remember-me" className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                Remember this device
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch to Admin Login Demo */}
          <div className="pt-4 border-t border-gray-100 dark:border-violet-900/30 text-center">
            <Link
              to="/admin/login"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Are you a store manager? Go to Admin Portal →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
