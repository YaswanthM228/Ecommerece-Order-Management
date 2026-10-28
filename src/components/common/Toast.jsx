import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Toast = () => {
  const { toast } = useShop();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle pointer-events-none">
      <div className="flex items-center gap-3 bg-[#0B1028]/95 border border-violet-500/30 text-white px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md max-w-md pointer-events-auto">
        {icons[toast.type] || icons.success}
        <span className="text-sm font-medium leading-snug">{toast.message}</span>
      </div>
    </div>
  );
};
