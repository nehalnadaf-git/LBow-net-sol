'use client'

import React, { useId } from 'react';

interface PipeFlowBgProps {
  isLight?: boolean;
}

/**
 * PipeFlowBg — minimal dot-grid background.
 * Replaces the old wave/flow lines with a simple, clean dot pattern.
 */
export const PipeFlowBg: React.FC<PipeFlowBgProps> = ({ isLight = false }) => {
  const uid = useId();
  const dotColor = isLight ? 'rgba(30,32,33,0.10)' : 'rgba(238,238,238,0.07)';

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
          <pattern id={ids.dot} width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.85" fill={dotColor} />
          </pattern>

          <radialGradient id={ids.fade} cx="50%" cy="50%" r="65%">
            <stop offset="0%"   stopColor="white" stopOpacity="1"   />
            <stop offset="55%"  stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0"   />
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
