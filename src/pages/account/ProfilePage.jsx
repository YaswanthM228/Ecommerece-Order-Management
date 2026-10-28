import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Crown,
  Edit2,
  Check,
  Plus,
  Trash2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ProfilePage = () => {
  const { user, showToast } = useShop();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Yash Sharma',
    email: user?.email || 'yash.sharma@example.com',
    phone: '+91 98765 43210'
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      tag: 'Home (Default)',
      line1: 'Flat 402, Skyline Towers, 12th Main Road',
      area: 'Indiranagar, Bengaluru',
      pincode: '560038'
    },
    {
      id: 2,
      tag: 'Office',
      line1: 'Level 5, Brigade Tech Gardens',
      area: 'Whitefield, Bengaluru',
      pincode: '560066'
    }
  ]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
    showToast('Profile information updated!');
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-violet-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center gap-6 shadow-xl border border-violet-800/40">
        <img
          src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover ring-4 ring-violet-400 shadow-2xl"
        />
        <div className="space-y-1 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-black">{profileData.name}</h1>
            <span className="inline-flex items-center gap-1 text-[10px] bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              <Crown className="w-3 h-3 text-slate-950" />
              VIP Gold Member
            </span>
          </div>
          <p className="text-xs text-violet-200">{profileData.email} • {profileData.phone}</p>
          <p className="text-[11px] text-violet-300">ShopSphere Member since January 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Details */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-violet-900/30">
            <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
              Personal Information
            </h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-bold text-brand-violet hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="text-gray-500 font-semibold block mb-1">Full Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white disabled:opacity-75 focus:outline-none focus:border-brand-violet"
              />
            </div>
            <div>
              <label className="text-gray-500 font-semibold block mb-1">Email Address</label>
              <input
                type="email"
                disabled={!isEditing}
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white disabled:opacity-75 focus:outline-none focus:border-brand-violet"
              />
            </div>
            <div>
              <label className="text-gray-500 font-semibold block mb-1">Phone Number</label>
              <input
                type="text"
                disabled={!isEditing}
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white disabled:opacity-75 focus:outline-none focus:border-brand-violet"
              />
            </div>

            {isEditing && (
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-violet text-white font-bold text-xs shadow-md hover:bg-brand-violet-deep transition-colors"
              >
                Save Changes
              </button>
            )}
          </form>
        </div>

        {/* Saved Addresses */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-violet-900/30">
            <h3 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white">
              Saved Delivery Addresses
            </h3>
            <button
              onClick={() => showToast('Address manager ready')}
              className="text-xs font-bold text-brand-violet hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New</span>
            </button>
          </div>

          <div className="space-y-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="p-4 rounded-2xl border border-gray-200 dark:border-violet-900/40 bg-gray-50/50 dark:bg-white/5 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-gray-900 dark:text-white">{addr.tag}</span>
                  <button
                    onClick={() => {
                      setAddresses(addresses.filter((a) => a.id !== addr.id));
                      showToast('Address removed', 'info');
                    }}
                    className="text-rose-500 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{addr.line1}</p>
                <p className="text-gray-500">{addr.area} - {addr.pincode}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
