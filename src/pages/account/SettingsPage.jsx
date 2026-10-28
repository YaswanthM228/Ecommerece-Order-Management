import React, { useState } from 'react';
import { Settings, Moon, Sun, Bell, Shield, Key, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ThemeToggle } from '../../components/common/ThemeToggle';

export const SettingsPage = () => {
  const { showToast } = useShop();

  const [orderAlerts, setOrderAlerts] = useState(true);
  const [promotionalEmails, setPromotionalEmails] = useState(false);
  const [smsUpdates, setSmsUpdates] = useState(true);

  const handleSavePreferences = (e) => {
    e.preventDefault();
    showToast('Preferences successfully updated!');
  };

  return (
    <div className="w-full px-6 sm:px-8 py-6 min-w-0 space-y-8">
      <div className="pb-4 border-b border-gray-200 dark:border-violet-900/30">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Customize your ShopSphere theme, notification preferences, and privacy controls.
        </p>
      </div>

      <div className="space-y-6">
        {/* Theme Preference */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 sm:p-7 border border-gray-100 dark:border-violet-950/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white">Visual Appearance</h3>
            <p className="text-sm text-gray-500 mt-0.5">Toggle between Light and Dark interface theme.</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Notifications Preference */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-5">
          <h3 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white pb-3.5 border-b border-gray-100 dark:border-violet-900/30">
            Communication Preferences
          </h3>

          <div className="space-y-4 text-sm">
            <label className="flex items-center justify-between cursor-pointer py-1">
              <div className="pr-4">
                <p className="font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-base">Order & Delivery Notifications</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-0.5">Receive real-time updates when an order is packed and out for delivery.</p>
              </div>
              <input
                type="checkbox"
                checked={orderAlerts}
                onChange={(e) => setOrderAlerts(e.target.checked)}
                className="w-5 h-5 text-brand-violet rounded focus:ring-brand-violet shrink-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1 border-t border-gray-100 dark:border-violet-900/20 pt-4">
              <div className="pr-4">
                <p className="font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-base">Exclusive Flash Deals & Newsletters</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-0.5">Occasional updates on blockbuster festivals, VIP drops, and coupons.</p>
              </div>
              <input
                type="checkbox"
                checked={promotionalEmails}
                onChange={(e) => setPromotionalEmails(e.target.checked)}
                className="w-5 h-5 text-brand-violet rounded focus:ring-brand-violet shrink-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1 border-t border-gray-100 dark:border-violet-900/20 pt-4">
              <div className="pr-4">
                <p className="font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-base">SMS & WhatsApp Alerts</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-0.5">Instant delivery agent OTP and tracking alerts directly to your mobile phone.</p>
              </div>
              <input
                type="checkbox"
                checked={smsUpdates}
                onChange={(e) => setSmsUpdates(e.target.checked)}
                className="w-5 h-5 text-brand-violet rounded focus:ring-brand-violet shrink-0"
              />
            </label>
          </div>
        </div>

        {/* Currency & Region */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white pb-3.5 border-b border-gray-100 dark:border-violet-900/30">
            Regional Preferences
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <div>
              <label className="text-gray-600 dark:text-gray-300 font-semibold block mb-1.5">Display Currency</label>
              <select className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none font-medium">
                <option value="INR">INR (₹) — Indian Rupee</option>
                <option value="USD" disabled>USD ($) — Global (Demo)</option>
              </select>
            </div>
            <div>
              <label className="text-gray-600 dark:text-gray-300 font-semibold block mb-1.5">Language</label>
              <select className="w-full p-3 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none font-medium">
                <option value="en">English (India)</option>
                <option value="hi" disabled>Hindi (Coming Soon)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
