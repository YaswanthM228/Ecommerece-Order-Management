import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ size = 'normal', variant = 'light', showTagline = true, to = '/' }) => {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const iconSize = isLarge ? 52 : isSmall ? 28 : 40;
  const textSize = isLarge ? 'text-2xl' : isSmall ? 'text-lg' : 'text-xl';

  return (
    <Link to={to} className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet rounded-lg">
      {/* 3D Glowing Orbital Planet Symbol */}
      <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_0_12px_rgba(124,58,237,0.5)]"
        >
          <defs>
            <radialGradient id="sphereCore" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="35%" stopColor="#8B5CF6" />
              <stop offset="70%" stopColor="#6D28D9" />
              <stop offset="100%" stopColor="#311042" />
            </radialGradient>
            
            <linearGradient id="orbitRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="50%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>

            <linearGradient id="ringGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818CF8" stopOpacity="0.2" />
            </linearGradient>

            <filter id="cosmicBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Ambient Cosmic Aura */}
          <circle cx="32" cy="32" r="24" fill="#7C3AED" opacity="0.3" filter="url(#cosmicBlur)" />

          {/* Back half of tilted orbit ring */}
          <ellipse
            cx="32"
            cy="32"
            rx="27"
            ry="10"
            transform="rotate(-26 32 32)"
            stroke="url(#orbitRing)"
            strokeWidth="3.2"
            strokeDasharray="45 45"
            strokeDashoffset="12"
            opacity="0.5"
          />

          {/* Central Sphere / Planet */}
          <circle cx="32" cy="32" r="17" fill="url(#sphereCore)" />

          {/* Inner Light Reflection / Highlight */}
          <ellipse cx="27" cy="25" rx="8" ry="4" transform="rotate(-30 27 25)" fill="#FFFFFF" opacity="0.4" />
          
          {/* Subtle shopping basket contour arc inside sphere */}
          <path
            d="M 24 33 Q 32 39 40 33"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Front half of tilted orbit ring with metallic sheen */}
          <path
            d="M 7 35 C 10 46, 32 46, 52 33 C 58 29, 58 26, 55 24"
            stroke="url(#ringGlow)"
            strokeWidth="3.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Glowing orbital star/satellite */}
          <circle cx="51" cy="24" r="2.8" fill="#FFFFFF" filter="url(#cosmicBlur)" />
          <circle cx="14" cy="40" r="1.6" fill="#DDD6FE" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className={`font-extrabold tracking-tight leading-none ${textSize} ${variant === 'dark' ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
          <span>Shop</span>
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Sphere</span>
        </div>
        {showTagline && (
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-violet-300/70 mt-1">
            Your World. Your Choice.
          </span>
        )}
      </div>
    </Link>
  );
};
