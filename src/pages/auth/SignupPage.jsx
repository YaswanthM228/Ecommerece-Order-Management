import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { Logo } from '../../components/common/Logo';
import { useShop } from '../../context/ShopContext';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ name: formData.name || 'New Member', email: formData.email });
    navigate('/');
  };

  const handlePreFill = () => {
    setFormData({
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      password: 'mypassword2026'
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] dark:bg-[#070A1E] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="inline-block">
          <Logo size="large" variant="dark" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">
          Create Your ShopSphere Account
        </h2>
        <p className="text-xs text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-brand-violet hover:underline">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-[#0E1433] py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-gray-100 dark:border-violet-950/40 space-y-6">
          <button
            type="button"
            onClick={handlePreFill}
            className="w-full py-2.5 px-4 rounded-2xl bg-violet-100 dark:bg-violet-950/60 hover:bg-violet-200 text-brand-violet dark:text-violet-300 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-violet-300/50"
          >
            <Sparkles className="w-4 h-4 text-brand-violet" />
            <span>Pre-fill Sample Information</span>
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Yash Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Create Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet"
                />
              </div>
            </div>

            <p className="text-[10px] text-gray-500">
              By creating an account, you agree to ShopSphere's Demo Conditions of Use and Privacy Notice.
            </p>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
