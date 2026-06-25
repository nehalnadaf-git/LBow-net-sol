'use client'

import React from 'react';

interface DotMatrixBgProps {
  isLight?: boolean;
}

export const DotMatrixBg: React.FC<DotMatrixBgProps> = ({ isLight = false }) => {
  const gridColor = isLight ? 'rgba(30,32,33,0.04)' : 'rgba(238,238,238,0.025)';
  const subGridColor = isLight ? 'rgba(30,32,33,0.015)' : 'rgba(238,238,238,0.01)';
  const borderOutlineColor = isLight ? 'rgba(30,32,33,0.08)' : 'rgba(238,238,238,0.05)';

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      <svg
        className="w-full h-full"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Seamless technical grid pattern */}
          <pattern
            id="technical-grid-pattern"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Sub-grid lines (fine scale) */}
            <path
              d="M 20 0 L 20 80 M 40 0 L 40 80 M 60 0 L 60 80 M 0 20 L 80 20 M 0 40 L 80 40 M 0 60 L 80 60"
              fill="none"
              stroke={subGridColor}
              strokeWidth="0.4"
            />
            {/* Major grid lines */}
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke={gridColor}
              strokeWidth="0.6"
            />
          </pattern>

          {/* Vignette mask to fade grid towards borders */}
          <radialGradient id="grid-vignette-fade" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="45%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0.15" />
          </radialGradient>
          <mask id="grid-fade-mask">
            <rect width="100%" height="100%" fill="url(#grid-vignette-fade)" />
          </mask>

          {/* Lightweight static grain pattern */}
          <pattern id="dotmatrix-grain" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="1" height="1" x="0" y="2" fill={isLight ? 'rgba(30,32,33,0.03)' : 'rgba(238,238,238,0.015)'} />
            <rect width="1" height="1" x="2" y="0" fill={isLight ? 'rgba(30,32,33,0.02)' : 'rgba(238,238,238,0.01)'} />
            <rect width="1" height="1" x="3" y="3" fill={isLight ? 'rgba(30,32,33,0.025)' : 'rgba(238,238,238,0.012)'} />
          </pattern>

          {/* Premium Gradient for brackets */}
          <linearGradient id="bracket-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isLight ? 'rgba(30,32,33,0.12)' : 'rgba(74,222,128,0.2)'} />
            <stop offset="100%" stopColor={isLight ? 'rgba(30,32,33,0.02)' : 'rgba(238,238,238,0.03)'} />
          </linearGradient>
        </defs>
        
        {/* Static grain texture */}
        <rect width="100%" height="100%" fill="url(#dotmatrix-grain)" />

        {/* Repeating technical grid pattern with vignette fade mask */}
        <rect width="100%" height="100%" fill="url(#technical-grid-pattern)" mask="url(#grid-fade-mask)" />

        {/* Outer technical brackets inside the viewport bounds */}
        <g>
          {/* Top-Left Corner Bracket */}
          <path d="M 24 48 H 48 V 24" stroke="url(#bracket-grad)" strokeWidth="0.75" fill="none" />
          <line x1="28" y1="28" x2="38" y2="38" stroke={borderOutlineColor} strokeWidth="0.5" />

          {/* Top-Right Corner Bracket */}
          <svg x="100%" y="0" style={{ overflow: 'visible' }}>
            <path d="M -24 48 H -48 V 24" stroke="url(#bracket-grad)" strokeWidth="0.75" fill="none" />
            <line x1="-28" y1="28" x2="-38" y2="38" stroke={borderOutlineColor} strokeWidth="0.5" />
          </svg>

          {/* Bottom-Left Corner Bracket */}
          <svg x="0" y="100%" style={{ overflow: 'visible' }}>
            <path d="M 24 -48 H 48 V -24" stroke="url(#bracket-grad)" strokeWidth="0.75" fill="none" />
            <line x1="28" y1="-28" x2="38" y2="-38" stroke={borderOutlineColor} strokeWidth="0.5" />
          </svg>

          {/* Bottom-Right Corner Bracket */}
          <svg x="100%" y="100%" style={{ overflow: 'visible' }}>
            <path d="M -24 -48 H -48 V -24" stroke="url(#bracket-grad)" strokeWidth="0.75" fill="none" />
            <line x1="-28" y1="-28" x2="-38" y2="-38" stroke={borderOutlineColor} strokeWidth="0.5" />
          </svg>

          {/* Micro alignment ticks along center lines */}
          <svg x="50%" y="0" style={{ overflow: 'visible' }}>
            <line x1="0" y1="20" x2="0" y2="30" stroke={borderOutlineColor} strokeWidth="0.75" />
          </svg>
          <svg x="50%" y="100%" style={{ overflow: 'visible' }}>
            <line x1="0" y1="-30" x2="0" y2="-20" stroke={borderOutlineColor} strokeWidth="0.75" />
          </svg>
          <svg x="0" y="50%" style={{ overflow: 'visible' }}>
            <line x1="20" y1="0" x2="30" y2="0" stroke={borderOutlineColor} strokeWidth="0.75" />
          </svg>
          <svg x="100%" y="50%" style={{ overflow: 'visible' }}>
            <line x1="-30" y1="0" x2="-20" y2="0" stroke={borderOutlineColor} strokeWidth="0.75" />
          </svg>
        </g>
      </svg>
    </div>
  );
};
