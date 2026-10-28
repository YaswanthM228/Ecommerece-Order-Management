import React, { useState } from 'react';
import { HelpCircle, Mail, Phone, MessageSquare, ShieldCheck, ChevronDown, Send } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const SupportPage = () => {
  const { showToast } = useShop();
  const [openFaq, setOpenFaq] = useState(0);
  const [ticketSent, setTicketSent] = useState(false);

  const faqs = [
    {
      q: 'How do I track my ShopSphere order?',
      a: 'Go to the "Track Order" page in the navigation or enter your Order ID directly on the tracking screen. You will see real-time updates as your package moves.'
    },
    {
      q: 'What is the return policy for electronics and fashion?',
      a: 'All eligible items can be returned within 7 days of delivery. VIP members enjoy an extended 14-day hassle-free doorstep return window.'
    },
    {
      q: 'How does ShopSphere VIP membership work?',
      a: 'ShopSphere VIP gives you unlimited free express delivery on every order, flat 10% instant discount, and 24-hour early access to mega festival sales for ₹999/year.'
    },
    {
      q: 'What payment methods are supported?',
      a: 'We accept UPI (GPay, PhonePe, Paytm, BHIM), all major Credit/Debit cards, NetBanking from 50+ Indian banks, and Cash on Delivery.'
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setTicketSent(true);
    showToast('Support ticket #TKT-4891 submitted! Our team will reply shortly.');
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-brand-violet bg-violet-100 dark:bg-violet-950 px-3 py-1 rounded-full">
          Customer Care
        </span>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          How Can We Help You Today?
        </h1>
        <p className="text-xs text-gray-500">
          Search frequently asked questions or submit an inquiry to our 24/7 support team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-950 text-brand-violet flex items-center justify-center mx-auto">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">Call Support</h3>
          <p className="text-xs text-gray-500">+91 1800 420 8899</p>
          <span className="text-[10px] text-emerald-500 font-bold block">Toll-Free 24/7</span>
        </div>

        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-500 flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">Email Us</h3>
          <p className="text-xs text-gray-500">care@shopsphere.demo</p>
          <span className="text-[10px] text-gray-400 block">Avg. response: &lt; 2 hours</span>
        </div>

        <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 border border-gray-100 dark:border-violet-950/40 shadow-sm text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-500 flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">AI Assistant</h3>
          <p className="text-xs text-gray-500">Instant answers 24/7</p>
          <span className="text-[10px] text-brand-violet font-bold block">Click Floating Icon</span>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white dark:bg-[#0E1433] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-violet-950/40 shadow-sm space-y-4">
        <h2 className="text-lg font-black text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-violet-900/40">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 dark:border-violet-900/30 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="p-4 pt-0 text-xs text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-50 dark:border-violet-900/20 bg-gray-50/50 dark:bg-white/5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
