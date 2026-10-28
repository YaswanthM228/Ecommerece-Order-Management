/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          violet: '#7C3AED',
          'violet-deep': '#5B21B6',
          'violet-light': '#8B5CF6',
          indigo: '#4338CA',
          'indigo-light': '#6366F1',
          navy: '#0B1028',
          sidebar: '#090D26',
          'sidebar-dark': '#06091D',
          'sidebar-active': 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
          surface: '#FFFFFF',
          'surface-dark': '#111836',
          'surface-darker': '#0E132B',
          bg: '#F7F8FC',
          'bg-dark': '#070A1E',
          border: '#E5E7EB',
          'border-dark': '#1F294D',
          text: '#111827',
          'text-dark': '#F8FAFC',
          muted: '#64748B',
          'muted-dark': '#94A3B8',
          success: '#16A34A',
          warning: '#F59E0B',
          error: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 4px 20px -2px rgba(124, 58, 237, 0.15)',
        'brand-lg': '0 10px 30px -4px rgba(124, 58, 237, 0.25)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 28px -6px rgba(124, 58, 237, 0.12), 0 4px 12px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #090D26 0%, #171040 50%, #2A1054 100%)',
        'purple-gradient': 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)',
        'vip-gradient': 'linear-gradient(135deg, #1A1344 0%, #301B6B 50%, #4C1D95 100%)',
      }
    },
  },
  plugins: [],
}
