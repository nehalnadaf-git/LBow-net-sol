'use client'

import React from 'react';

interface PipeTopologyBgProps {
  isLight?: boolean;
}

export const PipeTopologyBg: React.FC<PipeTopologyBgProps> = ({ isLight = false }) => {
  const strokeColor = isLight ? 'rgba(30,32,33,0.06)' : 'rgba(238,238,238,0.04)';
  const nodeColor = isLight ? 'rgba(46, 125, 50, 0.35)' : 'rgba(46, 125, 50, 0.25)';
  const pulseColor = isLight ? 'rgba(46, 125, 50, 0.65)' : 'rgba(74, 222, 128, 0.55)';

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @keyframes pulse-node-ring {
              0%, 100% { r: 3px; opacity: 0.3; }
              50% { r: 8px; opacity: 0.9; }
            }
            @keyframes topology-flow {
              to {
                stroke-dashoffset: -30;
              }
            }
            .node-pulse-1 {
              animation: pulse-node-ring 4s infinite ease-in-out;
              transform-origin: 200px 300px;
            }
            .node-pulse-2 {
              animation: pulse-node-ring 5s infinite ease-in-out;
              transform-origin: 700px 450px;
            }
            .node-pulse-3 {
              animation: pulse-node-ring 6s infinite ease-in-out;
              transform-origin: 400px 150px;
            }
            .node-pulse-4 {
              animation: pulse-node-ring 4.5s infinite ease-in-out;
              transform-origin: 850px 600px;
            }
            .topo-flow-line {
              stroke-dasharray: 5, 15;
              animation: topology-flow 4s linear infinite;
            }
          `}</style>

          {/* Edge Fading Linear Gradients for pipelines */}
          <linearGradient id="pipe-fade-h" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="10%" stopColor={strokeColor} />
            <stop offset="90%" stopColor={strokeColor} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          <linearGradient id="pipe-fade-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor={strokeColor} />
            <stop offset="85%" stopColor={strokeColor} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Film Grain Noise filter for high-end textured look */}
          <filter id="topo-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values={`0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 ${isLight ? 0.006 : 0.012} 0`} />
          </filter>
        </defs>

        {/* Film grain noise rect */}
        <rect width="100%" height="100%" filter="url(#topo-noise)" className="opacity-70" />

        {/* Pipeline network lines */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Main pipeline 1 */}
          <path d="M -50 300 H 200 L 250 350 V 500 H 450 L 500 450 V 200 H 700 L 750 250 V 450 H 1050" stroke="url(#pipe-fade-h)" strokeWidth="1.5" />
          
          {/* Parallel pipeline 1 offset */}
          <path d="M -50 285 H 190 L 235 330 V 490 H 440 L 490 440 V 215 H 690 L 735 260 V 465 H 1050" stroke="url(#pipe-fade-h)" strokeWidth="0.75" />

          {/* Secondary branch 2 */}
          <path d="M 400 -50 V 150 L 450 200 H 500" stroke="url(#pipe-fade-v)" strokeWidth="1.25" />
          <path d="M 450 200 L 350 300 H 100 V 450 L 50 500 V 850" stroke="url(#pipe-fade-v)" strokeWidth="1.25" />

          {/* High-pressure loop */}
          <path d="M 700 100 H 850 L 900 150 V 600 L 850 650 H 600 L 550 600 V 550" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M 685 115 H 840 L 885 160 V 590 L 840 635 H 610 L 565 590 V 560" stroke={strokeColor} strokeWidth="0.75" />

          {/* Bottom branch */}
          <path d="M 250 850 V 600 L 300 550 H 550" stroke="url(#pipe-fade-v)" strokeWidth="1.25" />

          {/* Glowing Animated Flows (Subtle overlay for premium movement) */}
          <path d="M -50 300 H 200 L 250 350 V 500 H 450 L 500 450 V 200 H 700 L 750 250 V 450 H 1050" stroke={pulseColor} strokeWidth="0.75" className="topo-flow-line" opacity="0.35" />
          <path d="M 700 100 H 850 L 900 150 V 600 L 850 650 H 600 L 550 600 V 550" stroke={pulseColor} strokeWidth="0.75" className="topo-flow-line" opacity="0.25" />
        </g>

        {/* Junction Nodes (Precise Engineering Plus Ticks instead of simple dots) */}
        <path
          d="
            M 196 300 H 204 M 200 296 V 304
            M 246 350 H 254 M 250 346 V 354
            M 246 500 H 254 M 250 496 V 504
            M 446 500 H 454 M 450 496 V 504
            M 496 450 H 504 M 500 446 V 454
            M 496 200 H 504 M 500 196 V 204
            M 696 200 H 704 M 700 196 V 204
            M 746 250 H 754 M 750 246 V 254
            M 746 450 H 754 M 750 446 V 454
            M 446 200 H 454 M 450 196 V 204
            M 346 300 H 354 M 350 296 V 304
            M 96 300 H 104 M 100 296 V 304
            M 96 450 H 104 M 100 446 V 454
            M 46 500 H 54 M 50 496 V 504
            M 846 100 H 854 M 850 96 V 104
            M 896 150 H 904 M 900 146 V 154
            M 896 600 H 904 M 900 596 V 604
            M 846 650 H 854 M 850 646 V 654
            M 596 650 H 604 M 600 646 V 654
            M 546 600 H 554 M 550 596 V 604
            M 296 550 H 304 M 300 546 V 554
          "
          stroke={nodeColor}
          strokeWidth="0.75"
          fill="none"
        />

        {/* Animated indicators (Open pulsing rings instead of solid pulsing dots) */}
        <g stroke={pulseColor} strokeWidth="0.75" fill="none">
          <circle cx="200" cy="300" className="node-pulse-1" />
          <circle cx="700" cy="450" className="node-pulse-2" />
          <circle cx="400" cy="150" className="node-pulse-3" />
          <circle cx="850" cy="600" className="node-pulse-4" />
        </g>
      </svg>
    </div>
  );
};

