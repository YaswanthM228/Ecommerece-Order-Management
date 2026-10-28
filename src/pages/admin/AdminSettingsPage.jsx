import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, DollarSign, Truck, Store } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AdminSettingsPage = () => {
  const { showToast } = useShop();

  const [settings, setSettings] = useState({
    storeName: 'ShopSphere India',
    tagline: 'Your World. Your Choice.',
    supportEmail: 'care@shopsphere.demo',
    supportPhone: '+91 1800 420 8899',
    gstin: '29AABCU9603R1ZX',
    currency: 'INR',
    defaultTaxRate: 18,
    freeShippingMin: 999,
    standardShippingFee: 99
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Store configuration saved successfully!');
  };

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-gray-200 dark:border-violet-900/30">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
          Store Configuration & Policies
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage general metadata, tax calculations, free delivery thresholds, and regulatory compliance.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-sm">
        {/* General Store Details */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3.5 border-b border-gray-100 dark:border-violet-900/30">
            <Store className="w-5 h-5 text-brand-violet" />
            <h3 className="font-bold text-base text-gray-900 dark:text-white">Business Identity</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">Store Legal Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">Brand Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">GSTIN Identification</label>
              <input
                type="text"
                value={settings.gstin}
                onChange={(e) => setSettings({ ...settings, gstin: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet text-sm"
              />
            </div>
          </div>
        </div>

        {/* Shipping & Tax Rules */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3.5 border-b border-gray-100 dark:border-violet-900/30">
            <Truck className="w-5 h-5 text-brand-violet" />
            <h3 className="font-bold text-base text-gray-900 dark:text-white">Shipping & Taxes</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">Free Delivery Min. (₹)</label>
              <input
                type="number"
                value={settings.freeShippingMin}
                onChange={(e) => setSettings({ ...settings, freeShippingMin: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">Standard Delivery Fee (₹)</label>
              <input
                type="number"
                value={settings.standardShippingFee}
                onChange={(e) => setSettings({ ...settings, standardShippingFee: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet text-sm"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">Default GST Rate (%)</label>
              <input
                type="number"
                value={settings.defaultTaxRate}
                onChange={(e) => setSettings({ ...settings, defaultTaxRate: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white focus:outline-none focus:border-brand-violet text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-7 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-violet-600/30 transition-all"
          >
            <Save className="w-5 h-5" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
