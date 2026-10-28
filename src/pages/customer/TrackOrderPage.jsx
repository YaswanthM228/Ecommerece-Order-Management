import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  Search,
  ExternalLink,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';

export const TrackOrderPage = () => {
  const [searchParams] = useSearchParams();
  const { orders } = useShop();

  const initialId = searchParams.get('id') || (orders.length > 0 ? orders[0].id : 'ORD-89421');
  const [orderQuery, setOrderQuery] = useState(initialId);
  const [activeOrder, setActiveOrder] = useState(
    orders.find((o) => o.id === initialId) || orders[0]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const found = orders.find((o) => o.id.toLowerCase() === orderQuery.trim().toLowerCase());
    if (found) {
      setActiveOrder(found);
    } else {
      setActiveOrder(null);
    }
  };

  const steps = [
    { title: 'Order Placed', desc: 'Received & verified by merchant', done: true, time: '24 Oct, 10:30 AM' },
    { title: 'Packed & Dispatched', desc: 'Shipped via BlueDart Air', done: true, time: '24 Oct, 04:15 PM' },
    { title: 'In Transit', desc: 'Reached Bengaluru Hub', done: true, time: '25 Oct, 11:00 AM' },
    { title: 'Out for Delivery', desc: 'Agent: Ramesh (+91 98112 34567)', done: activeOrder?.status === 'Delivered', time: 'Today, 09:00 AM' },
    { title: 'Delivered', desc: 'Delivered with OTP confirmation', done: activeOrder?.status === 'Delivered', time: activeOrder?.status === 'Delivered' ? 'Today, 02:45 PM' : 'Expected by 6 PM' }
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Search Order Tracker Header */}
      <div className="bg-gradient-to-r from-violet-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-wider text-violet-300 bg-white/10 px-3 py-1 rounded-full">
            Real-Time Package Tracking
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-3 mb-2">
            Track Your ShopSphere Shipment
          </h1>
          <p className="text-xs sm:text-sm text-violet-200 mb-6">
            Enter your order tracking ID to get live delivery updates, estimated arrival times, and courier details.
          </p>

          <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="e.g. ORD-89421"
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 text-white placeholder:text-violet-300 text-xs sm:text-sm border border-violet-400/40 focus:outline-none focus:bg-white/20"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-violet hover:bg-brand-violet-deep text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors"
            >
              Track
            </button>
          </form>
        </div>
      </div>

      {activeOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tracking Timeline (Col 8) */}
          <div className="lg:col-span-8 bg-white dark:bg-[#0E1433] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100 dark:border-violet-900/40">
              <div>
                <span className="text-xs text-gray-400 font-bold">SHIPMENT TRACKING</span>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">
                  Order #{activeOrder.id}
                </h3>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto ${
                activeOrder.status === 'Delivered'
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400'
              }`}>
                Status: {activeOrder.status}
              </span>
            </div>

            {/* Vertical Stepper */}
            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-violet-200 dark:before:bg-violet-900">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  <div
                    className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-white ring-4 ring-white dark:ring-[#0E1433] ${
                      step.done ? 'bg-brand-violet' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    {step.done ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{step.desc}</p>
                    <span className="text-[10px] text-brand-violet font-semibold block mt-1">
                      {step.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courier & Delivery Card (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Delivery Details
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-gray-400 block text-[11px]">Courier Partner:</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">BlueDart Express SuperFast</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Tracking AWB:</span>
                  <span className="font-mono font-bold text-brand-violet">BLD8942109823</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[11px]">Delivery Address:</span>
                  <p className="text-gray-700 dark:text-gray-300 mt-0.5">
                    {activeOrder.customer.address}, {activeOrder.customer.city} - {activeOrder.customer.pincode}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-violet-900/40 flex items-center justify-between">
                <span className="text-xs text-gray-500">Need help?</span>
                <Link to="/support" className="text-xs font-bold text-brand-violet hover:underline">
                  Support Center
                </Link>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Items In This Package
              </h4>
              <div className="space-y-2">
                {activeOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-contain rounded-lg bg-gray-50 dark:bg-white/5 p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 dark:text-white truncate">{item.name}</p>
                      <p className="text-gray-400 text-[10px]">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-12 text-center border border-gray-100 dark:border-violet-950/40">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-800 dark:text-white mb-1">
            No order found with ID "{orderQuery}"
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Please verify the order ID from your confirmation email or orders history.
          </p>
          <Link to="/account/orders" className="text-xs font-bold text-brand-violet underline">
            View My Orders
          </Link>
        </div>
      )}
    </div>
  );
};
