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
    <div className="max-w-[1000px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="pb-4 border-b border-gray-200 dark:border-violet-900/30">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Customize your ShopSphere theme, notification preferences, and privacy controls.
        </p>
      </div>

      <div className="space-y-6">
        {/* Theme Preference */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">Visual Appearance</h3>
            <p className="text-xs text-gray-500">Toggle between Light and Dark interface theme.</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Notifications Preference */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-violet-900/30">
            Communication Preferences
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-200">Order & Delivery Notifications</p>
                <p className="text-gray-400">Receive real-time updates when an order is packed and out for delivery.</p>
              </div>
              <input
                type="checkbox"
                checked={orderAlerts}
                onChange={(e) => setOrderAlerts(e.target.checked)}
                className="w-4 h-4 text-brand-violet rounded focus:ring-brand-violet"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-200">Exclusive Flash Deals & Newsletters</p>
                <p className="text-gray-400">Occasional updates on blockbuster festivals, VIP drops, and coupons.</p>
              </div>
              <input
                type="checkbox"
                checked={promotionalEmails}
                onChange={(e) => setPromotionalEmails(e.target.checked)}
                className="w-4 h-4 text-brand-violet rounded focus:ring-brand-violet"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-bold text-gray-800 dark:text-gray-200">SMS & WhatsApp Alerts</p>
                <p className="text-gray-400">Instant delivery agent OTP and tracking alerts directly to your mobile phone.</p>
              </div>
              <input
                type="checkbox"
                checked={smsUpdates}
                onChange={(e) => setSmsUpdates(e.target.checked)}
                className="w-4 h-4 text-brand-violet rounded focus:ring-brand-violet"
              />
            </label>
          </div>
        </div>

        {/* Currency & Region */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-3">
          <h3 className="font-extrabold text-sm text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-violet-900/30">
            Regional Preferences
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gray-500 font-semibold block mb-1">Display Currency</label>
              <select className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none">
                <option value="INR">INR (₹) — Indian Rupee</option>
                <option value="USD" disabled>USD ($) — Global (Demo)</option>
              </select>
            </div>
            <div>
              <label className="text-gray-500 font-semibold block mb-1">Language</label>
              <select className="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none">
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
