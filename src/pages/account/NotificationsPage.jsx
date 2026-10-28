import React from 'react';
import { Bell, Check, Clock, Sparkles, Tag, Truck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const NotificationsPage = () => {
  const { notifications, markAllNotificationsRead } = useShop();

  const getIcon = (title) => {
    if (title.includes('Dispatched') || title.includes('Delivered')) {
      return <Truck className="w-5 h-5 text-indigo-500" />;
    }
    if (title.includes('VIP')) {
      return <Sparkles className="w-5 h-5 text-amber-500" />;
    }
    return <Tag className="w-5 h-5 text-rose-500" />;
  };

  return (
    <div className="max-w-[1000px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="pb-4 border-b border-gray-200 dark:border-violet-900/30 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Notifications Center
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Stay informed on order status, price drops, and flash deals.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-4 py-2 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-brand-violet text-xs font-bold hover:bg-violet-100 transition-colors"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
              n.unread
                ? 'bg-white dark:bg-[#0E1433] border-violet-300 dark:border-violet-700/60 shadow-sm'
                : 'bg-gray-50/50 dark:bg-white/5 border-gray-100 dark:border-violet-900/20 opacity-80'
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
              {getIcon(n.title)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate">
                  {n.title}
                </h4>
                <span className="text-[10px] text-gray-400 shrink-0">{n.time}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{n.message}</p>
            </div>

            {n.unread && (
              <span className="w-2.5 h-2.5 rounded-full bg-brand-violet shrink-0 mt-1.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
