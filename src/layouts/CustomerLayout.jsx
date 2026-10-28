import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CustomerSidebar } from '../components/layout/CustomerSidebar';
import { CustomerToolbar } from '../components/layout/CustomerToolbar';
import { CustomerCategoryBar } from '../components/layout/CustomerCategoryBar';
import { Footer } from '../components/layout/Footer';
import { Toast } from '../components/common/Toast';
import { AIAssistantModal } from '../components/common/AIAssistantModal';
import { ClaimOfferModal } from '../components/common/ClaimOfferModal';
import { Bot, Gift } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CustomerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setIsAIAssistantOpen, setIsClaimOfferOpen } = useShop();

  return (
    <div className="min-h-screen bg-[#F7F8FC] dark:bg-[#070A1E] text-[#111827] dark:text-[#F8FAFC] flex transition-colors duration-200">
      {/* Fixed/Sticky Sidebar on Desktop */}
      <CustomerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area (occupies remaining width) */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Sticky Toolbar */}
        <CustomerToolbar onOpenSidebar={() => setSidebarOpen(true)} />

        {/* Horizontal Category Navigation Bar */}
        <CustomerCategoryBar />

        {/* Dynamic Route Content */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating Utilities on Bottom-Right (as seen in the reference image) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Claim Offer Pill */}
        <button
          onClick={() => setIsClaimOfferOpen(true)}
          className="flex items-center gap-2 bg-white dark:bg-[#0F1535] text-brand-violet dark:text-violet-300 font-bold text-xs px-3.5 py-2 rounded-full shadow-xl hover:shadow-2xl border border-violet-200 dark:border-violet-700/60 hover:scale-105 transition-all group"
        >
          <Gift className="w-4 h-4 text-brand-violet animate-bounce-subtle" />
          <span>Claim Offer</span>
        </button>

        {/* AI Shopping Assistant Floating Bubble */}
        <button
          onClick={() => setIsAIAssistantOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs px-4 py-3 rounded-full shadow-2xl hover:shadow-violet-600/50 hover:scale-105 active:scale-95 transition-all group"
          title="Open AI Shopping Guide"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline">AI Shopping Assistant</span>
        </button>
      </div>

      {/* Modals & Toast */}
      <AIAssistantModal />
      <ClaimOfferModal />
      <Toast />
    </div>
  );
};
