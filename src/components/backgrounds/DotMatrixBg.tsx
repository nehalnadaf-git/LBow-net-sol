'use client'

import React, { useId } from 'react';

interface DotMatrixBgProps {
  isLight?: boolean;
}

/**
 * DotMatrixBg — minimal dot-grid background.
 * Light mode: very faint dots on white/light surfaces.
 * Dark mode:  very faint dots on dark surfaces.
 */
export const DotMatrixBg: React.FC<DotMatrixBgProps> = ({ isLight = false }) => {
  const uid = useId();
  const dotColor = isLight ? 'rgba(30,32,33,0.12)' : 'rgba(238,238,238,0.08)';

  const ids = {
    dot: `${uid}-dot`,
    fade: `${uid}-fade`,
    mask: `${uid}-mask`,
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      <svg
        className="w-full h-full"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Dot pattern — 28px grid, 1px dot */}
          <pattern id={ids.dot} width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.85" fill={dotColor} />
          </pattern>

          {/* Radial fade — denser in centre, dissolves at edges */}
          <radialGradient id={ids.fade} cx="50%" cy="50%" r="65%">
            <stop offset="0%"   stopColor="white" stopOpacity="1"    />
            <stop offset="55%"  stopColor="white" stopOpacity="0.7"  />
            <stop offset="100%" stopColor="white" stopOpacity="0"    />
          </radialGradient>
          <mask id={ids.mask}>
            <rect width="100%" height="100%" fill={`url(#${ids.fade})`} />
          </mask>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${ids.dot})`} mask={`url(#${ids.mask})`} />
      </svg>
    </div>
  );
};
