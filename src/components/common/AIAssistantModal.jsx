import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, ArrowRight, ShoppingCart } from 'lucide-react';
import { useShop, formatCurrency } from '../../context/ShopContext';
import { useNavigate } from 'react-router-dom';

export const AIAssistantModal = () => {
  const { isAIAssistantOpen, setIsAIAssistantOpen, products, addToCart } = useShop();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello Yash! 👋 I am your ShopSphere AI Shopping Guide. How can I help you find the best tech, fashion, or deals today?"
    }
  ]);
  const [input, setInput] = useState('');

  if (!isAIAssistantOpen) return null;

  const quickPrompts = [
    "Recommend a work laptop under ₹50,000",
    "Show me trending sneakers",
    "What are today's top electronic deals?",
    "How do I join ShopSphere VIP?"
  ];

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Predefined smart responses
    setTimeout(() => {
      let reply = "I can help you browse through our catalog! Check our Electronics and Fashion collections for the latest arrivals.";
      let suggestedProduct = null;

      const lower = query.toLowerCase();
      if (lower.includes('laptop') || lower.includes('50000') || lower.includes('work')) {
        suggestedProduct = products.find(p => p.id === 'prod-1');
        reply = "I strongly recommend the **Dell Inspiron 15**! It features an Intel 13th Gen i5, 16GB RAM, and 512GB SSD for ₹49,999 (21% off today).";
      } else if (lower.includes('sneaker') || lower.includes('shoes') || lower.includes('nike')) {
        suggestedProduct = products.find(p => p.id === 'prod-2');
        reply = "The **Nike Air Max Sneakers** are trending right now at ₹7,999. They combine timeless styling with Air cushioning.";
      } else if (lower.includes('deal') || lower.includes('discount')) {
        suggestedProduct = products.find(p => p.id === 'prod-4');
        reply = "Today's hottest deal is the **OnePlus Nord Buds 2** at 40% OFF (₹2,999), followed by boAt Wave Pro at 38% OFF!";
      } else if (lower.includes('vip') || lower.includes('membership')) {
        reply = "ShopSphere VIP gives you an extra 10% off on all purchases, unlimited Free Delivery, and early access to festival sales for just ₹999/yr!";
      } else {
        suggestedProduct = products[0];
        reply = `Here is our top rated product right now: **${products[0].name}** at ${formatCurrency(products[0].price)}. Would you like to check it out?`;
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply, product: suggestedProduct }]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#0E132B] w-full max-w-lg rounded-3xl shadow-2xl border border-violet-100 dark:border-violet-900/50 flex flex-col h-[580px] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">ShopSphere AI Assistant</h3>
                <span className="text-[10px] bg-emerald-400 text-slate-900 font-extrabold px-1.5 py-0.5 rounded-full">LIVE</span>
              </div>
              <p className="text-xs text-violet-100/80">Smart shopping recommendations</p>
            </div>
          </div>
          <button
            onClick={() => setIsAIAssistantOpen(false)}
            className="p-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50 dark:bg-[#0A0E24]">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.sender === 'user'
                    ? 'bg-brand-violet text-white rounded-br-none shadow-sm'
                    : 'bg-white dark:bg-[#141B3B] text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-violet-900/40 rounded-bl-none shadow-sm'
                }`}
              >
                {m.text}

                {/* Optional embedded product card inside AI answer */}
                {m.product && (
                  <div className="mt-3 p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800/50 flex items-center gap-3">
                    <img src={m.product.image} alt={m.product.name} className="w-14 h-14 object-cover rounded-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{m.product.name}</p>
                      <p className="text-xs text-brand-violet font-semibold">{formatCurrency(m.product.price)}</p>
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => {
                            addToCart(m.product);
                          }}
                          className="text-[10px] bg-brand-violet text-white px-2 py-0.5 rounded flex items-center gap-1"
                        >
                          <ShoppingCart className="w-3 h-3" /> Add
                        </button>
                        <button
                          onClick={() => {
                            setIsAIAssistantOpen(false);
                            navigate(`/product/${m.product.id}`);
                          }}
                          className="text-[10px] text-gray-600 dark:text-gray-300 underline"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Prompts */}
        <div className="p-2 border-t border-gray-100 dark:border-violet-900/30 bg-white dark:bg-[#0E132B]">
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/60 dark:hover:bg-violet-900 text-violet-700 dark:text-violet-300 font-medium transition-colors text-[11px]"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white dark:bg-[#0E132B] border-t border-gray-100 dark:border-violet-900/30 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about products, deals, or recommendations..."
            className="flex-1 bg-gray-100 dark:bg-[#141B3B] text-gray-800 dark:text-white text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-brand-violet focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            className="bg-brand-violet hover:bg-brand-violet-deep text-white px-4 rounded-xl flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
