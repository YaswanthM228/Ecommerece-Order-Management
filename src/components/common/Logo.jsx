import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({
  size = 'normal',
  variant = 'light',
  showTagline = true,
  layout = 'horizontal', // 'horizontal' | 'vertical'
  to = '/'
}) => {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const iconSize = isLarge ? 64 : isSmall ? 36 : (layout === 'vertical' ? 56 : 46);
  const textSize = isLarge ? 'text-2xl sm:text-3xl' : isSmall ? 'text-lg' : (layout === 'vertical' ? 'text-2xl' : 'text-xl sm:text-2xl');

  return (
    <Link
      to={to}
      className={`inline-flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet rounded-xl ${
        layout === 'vertical' ? 'flex-col text-center gap-2.5' : 'gap-3 text-left'
      }`}
    >
      {/* 3D Glowing Orbital Planet Symbol with Specular Neon Ring */}
      <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_0_16px_rgba(139,92,246,0.7)]"
        >
          <defs>
            <radialGradient id="sphereCoreGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#EDE9FE" />
              <stop offset="25%" stopColor="#C4B5FD" />
              <stop offset="55%" stopColor="#8B5CF6" />
              <stop offset="85%" stopColor="#5B21B6" />
              <stop offset="100%" stopColor="#1E0B3B" />
            </radialGradient>

            <linearGradient id="ringNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="30%" stopColor="#C084FC" />
              <stop offset="70%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>

            <linearGradient id="ringFrontGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#DDD6FE" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.3" />
            </linearGradient>

            <filter id="cosmicAura" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Ambient Radiant Cosmic Glow behind */}
          <circle cx="32" cy="32" r="23" fill="#8B5CF6" opacity="0.4" filter="url(#cosmicAura)" />

          {/* Back half of tilted orbit ring */}
          <ellipse
            cx="32"
            cy="32"
            rx="27"
            ry="9.5"
            transform="rotate(-28 32 32)"
            stroke="url(#ringNeonGrad)"
            strokeWidth="3.4"
            strokeDasharray="42 42"
            strokeDashoffset="12"
            opacity="0.5"
          />

          {/* Planet Spherical Body */}
          <circle cx="32" cy="32" r="17.5" fill="url(#sphereCoreGrad)" />

          {/* Specular Highlight on Sphere */}
          <ellipse cx="27" cy="24" rx="8" ry="4.5" transform="rotate(-32 27 24)" fill="#FFFFFF" opacity="0.5" />

          {/* Subtle shopping contour curve inside sphere */}
          <path
            d="M 23 33.5 Q 32 40 41 33.5"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Front half of tilted orbit ring with metallic neon sheen */}
          <path
            d="M 6.5 35 C 9.5 46.5, 33 46.5, 53.5 32.5 C 58.5 29, 58.5 25, 55 23"
            stroke="url(#ringFrontGlow)"
            strokeWidth="3.8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Front orbit ring colored accent line */}
          <path
            d="M 9 37 C 14 45.5, 34 45.5, 51 34"
            stroke="url(#ringNeonGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.95"
          />

          {/* Luminous orbital satellite / sparkle */}
          <circle cx="51.5" cy="23.5" r="3.2" fill="#FFFFFF" filter="url(#cosmicAura)" />
          <circle cx="51.5" cy="23.5" r="1.6" fill="#E0E7FF" />
          <circle cx="13" cy="41" r="1.6" fill="#DDD6FE" />
        </svg>
      </div>

      {/* Typography */}
      <div className={`flex flex-col ${layout === 'vertical' ? 'items-center' : 'items-start'}`}>
        <div
          className={`font-black tracking-tight leading-none ${textSize} ${
            variant === 'dark' ? 'text-gray-900 dark:text-white' : 'text-white'
          }`}
        >
          <span>Shop</span>
          <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
            Sphere
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-extrabold tracking-[0.2em] uppercase text-violet-300 mt-1.5">
            Your World. Your Choice.
          </span>
        )}
      </div>
    </Link>
  );
};
