'use client'

import React, { useId } from 'react';

interface PipeCrossSectionBgProps {
  isLight?: boolean;
}

/**
 * PipeCrossSectionBg — minimal fine-line grid background.
 * Replaces the complex CAD cross-section drawings with a clean grid.
 */
export const PipeCrossSectionBg: React.FC<PipeCrossSectionBgProps> = ({ isLight = false }) => {
  const uid = useId();
  const lineColor = isLight ? 'rgba(30,32,33,0.07)' : 'rgba(238,238,238,0.05)';

  const ids = {
    grid: `${uid}-grid`,
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
          <pattern id={ids.grid} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={lineColor} strokeWidth="0.5" />
          </pattern>

          <radialGradient id={ids.fade} cx="50%" cy="50%" r="65%">
            <stop offset="0%"   stopColor="white" stopOpacity="1"   />
            <stop offset="60%"  stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0"   />
          </radialGradient>
          <mask id={ids.mask}>
            <rect width="100%" height="100%" fill={`url(#${ids.fade})`} />
          </mask>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${ids.grid})`} mask={`url(#${ids.mask})`} />
      </svg>
    </div>
  );
};
