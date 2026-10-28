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
    <div className="w-full px-6 sm:px-8 py-6 min-w-0 space-y-8">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-violet-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center gap-6 shadow-xl border border-violet-800/40">
        <img
          src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover ring-4 ring-violet-400 shadow-2xl"
        />
        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <h1 className="text-2xl sm:text-3xl font-black">{profileData.name}</h1>
            <span className="inline-flex items-center gap-1.5 text-xs bg-amber-400 text-slate-950 font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5 text-slate-950" />
              VIP Gold Member
            </span>
          </div>
          <p className="text-sm text-violet-200">{profileData.email} • {profileData.phone}</p>
          <p className="text-xs text-violet-300">ShopSphere Member since January 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Details */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 dark:border-violet-900/30">
            <h3 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white">
              Personal Information
            </h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm font-bold text-brand-violet hover:underline flex items-center gap-1.5"
            >
              <Edit2 className="w-4 h-4" />
              <span>{isEditing ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-sm">
            <div>
              <label className="text-gray-600 dark:text-gray-300 font-semibold block mb-1.5">Full Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white disabled:opacity-75 focus:outline-none focus:border-brand-violet text-sm"
              />
            </div>
            <div>
              <label className="text-gray-600 dark:text-gray-300 font-semibold block mb-1.5">Email Address</label>
              <input
                type="email"
                disabled={!isEditing}
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white disabled:opacity-75 focus:outline-none focus:border-brand-violet text-sm"
              />
            </div>
            <div>
              <label className="text-gray-600 dark:text-gray-300 font-semibold block mb-1.5">Phone Number</label>
              <input
                type="text"
                disabled={!isEditing}
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#111836] border border-gray-200 dark:border-violet-900/40 text-gray-800 dark:text-white disabled:opacity-75 focus:outline-none focus:border-brand-violet text-sm"
              />
            </div>

            {isEditing && (
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-violet text-white font-bold text-sm shadow-md hover:bg-brand-violet-deep transition-colors"
              >
                Save Changes
              </button>
            )}
          </form>
        </div>

        {/* Saved Addresses */}
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 dark:border-violet-900/30">
            <h3 className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white">
              Saved Delivery Addresses
            </h3>
            <button
              onClick={() => showToast('Address manager ready')}
              className="text-sm font-bold text-brand-violet hover:underline flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New</span>
            </button>
          </div>

          <div className="space-y-3.5">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="p-4 rounded-2xl border border-gray-200 dark:border-violet-900/40 bg-gray-50/50 dark:bg-white/5 space-y-1 text-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-gray-900 dark:text-white">{addr.tag}</span>
                  <button
                    onClick={() => {
                      setAddresses(addresses.filter((a) => a.id !== addr.id));
                      showToast('Address removed', 'info');
                    }}
                    className="text-rose-500 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{addr.line1}</p>
                <p className="text-gray-500">{addr.area} - {addr.pincode}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
