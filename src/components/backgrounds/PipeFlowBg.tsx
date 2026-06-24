'use client'

import React from 'react';

interface PipeFlowBgProps {
  isLight?: boolean;
}

export const PipeFlowBg: React.FC<PipeFlowBgProps> = ({ isLight = false }) => {
  const strokeColor = isLight ? 'rgba(30,32,33,0.05)' : 'rgba(238,238,238,0.035)';
  const flowColor = isLight ? 'rgba(46, 125, 50, 0.45)' : 'rgba(74, 222, 128, 0.45)';

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @keyframes flow-dash {
              to {
                stroke-dashoffset: -100;
              }
            }
            .flow-line {
              stroke-dasharray: 12, 24;
              animation: flow-dash 15s linear infinite;
            }
            .flow-line-fast {
              stroke-dasharray: 8, 16;
              animation: flow-dash 10s linear infinite;
            }
            .flow-line-slow {
              stroke-dasharray: 20, 30;
              animation: flow-dash 22s linear infinite;
            }
          `}</style>

          {/* Linear Gradients to gracefully fade paths towards borders */}
          <linearGradient id="flow-fade-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="12%" stopColor={strokeColor} />
            <stop offset="88%" stopColor={strokeColor} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Film Grain Noise filter for high-end textured look */}
          <filter id="flow-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values={`0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 ${isLight ? 0.006 : 0.012} 0`} />
          </filter>
        </defs>

        {/* Film grain noise rect */}
        <rect width="100%" height="100%" filter="url(#flow-noise)" className="opacity-70" />

        {/* Dynamic flowing fluid lines */}
        <g stroke="url(#flow-fade-grad)" fill="none">
          {/* Flow 1: Top wave */}
          <path d="M -100 150 C 200 50, 400 250, 700 100 C 850 25, 950 120, 1100 80" strokeWidth="1.5" />
          <path d="M -100 160 C 200 60, 400 260, 700 110 C 850 35, 950 130, 1100 90" strokeWidth="0.75" />
          <path d="M -100 150 C 200 50, 400 250, 700 100 C 850 25, 950 120, 1100 80" stroke={flowColor} strokeWidth="1" className="flow-line-slow" opacity="0.8" />

          {/* Flow 2: Mid-screen wave */}
          <path d="M -100 300 C 150 450, 350 200, 650 400 C 800 500, 950 350, 1100 420" strokeWidth="1.5" />
          <path d="M -100 312 C 150 462, 350 212, 650 412 C 800 512, 950 362, 1100 432" strokeWidth="0.75" />
          <path d="M -100 300 C 150 450, 350 200, 650 400 C 800 500, 950 350, 1100 420" stroke={flowColor} strokeWidth="1.25" className="flow-line" opacity="0.8" />

          {/* Flow 3: Bottom wave */}
          <path d="M -100 450 C 300 550, 500 350, 800 500 C 900 550, 1000 480, 1100 520" strokeWidth="1.5" />
          <path d="M -100 450 C 300 550, 500 350, 800 500 C 900 550, 1000 480, 1100 520" stroke={flowColor} strokeWidth="1.5" className="flow-line-fast" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
};


