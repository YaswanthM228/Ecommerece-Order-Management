import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Toast = () => {
  const { toast } = useShop();

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex flex-col bg-[#0B1028]/95 border border-violet-500/40 text-white rounded-2xl shadow-2xl backdrop-blur-md max-w-md pointer-events-auto overflow-hidden ring-1 ring-white/10"
          >
            <div className="flex items-center gap-3 px-4 py-3">
              {icons[toast.type] || icons.success}
              <span className="text-sm font-semibold leading-snug">{toast.message}</span>
            </div>
            {/* Shimmering Progress Bar */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 3.2, ease: 'linear' }}
              className={`h-1 ${
                toast.type === 'error'
                  ? 'bg-rose-500'
                  : toast.type === 'info'
                  ? 'bg-sky-500'
                  : 'bg-gradient-to-r from-violet-500 to-indigo-500'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
