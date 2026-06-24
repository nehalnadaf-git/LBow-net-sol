'use client'

import React from 'react';

interface PipeCrossSectionBgProps {
  isLight?: boolean;
}

export const PipeCrossSectionBg: React.FC<PipeCrossSectionBgProps> = ({ isLight = false }) => {
  const strokeColor = isLight ? 'rgba(30,32,33,0.06)' : 'rgba(238,238,238,0.04)';
  const accentStrokeColor = isLight ? 'rgba(46,125,50,0.35)' : 'rgba(74,222,128,0.3)';
  const labelColor = isLight ? 'rgba(30,32,33,0.3)' : 'rgba(238,238,238,0.25)';
  const labelColorActive = isLight ? '#2E7D32' : '#4ADE80';
  const gridColor = isLight ? 'rgba(30,32,33,0.025)' : 'rgba(238,238,238,0.015)';

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Technical grid paper pattern */}
          <pattern id="technical-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={gridColor} strokeWidth="0.5" />
          </pattern>

          {/* Vignette mask to fade grid towards center to avoid overlapping text layouts */}
          <radialGradient id="grid-vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="60%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </radialGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-vignette)" />
          </mask>

          {/* Film Grain Noise filter for high-end textured look */}
          <filter id="blueprint-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values={`0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 ${isLight ? 0.006 : 0.012} 0`} />
          </filter>
        </defs>

        {/* Film grain noise rect */}
        <rect width="100%" height="100%" filter="url(#blueprint-noise)" className="opacity-70" />

        {/* Technical grid paper backdrop */}
        <rect width="100%" height="100%" fill="url(#technical-grid)" mask="url(#grid-mask)" />

        {/* CAD Blueprint Top Right */}
        <g transform="translate(850, 200)">
          {/* Outer ring ticks */}
          <circle cx="0" cy="0" r="170" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="2, 6" fill="none" />
          
          {/* Concentric Pipe walls */}
          <g fill="none">
            <circle cx="0" cy="0" r="160" stroke={strokeColor} strokeWidth="0.75" />
            <circle cx="0" cy="0" r="140" stroke={accentStrokeColor} strokeWidth="1.25" />
            <circle cx="0" cy="0" r="115" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="4,4" />
            <circle cx="0" cy="0" r="90" stroke={strokeColor} strokeWidth="0.75" />
            <circle cx="0" cy="0" r="75" stroke={accentStrokeColor} strokeWidth="1.5" />
            <circle cx="0" cy="0" r="40" stroke={strokeColor} strokeWidth="0.75" />
          </g>

          {/* Crosshair axis lines */}
          <g stroke={strokeColor} strokeWidth="0.75" opacity="0.6">
            <line x1="-200" y1="0" x2="200" y2="0" strokeDasharray="8,4,2,4" />
            <line x1="0" y1="-200" x2="0" y2="200" strokeDasharray="8,4,2,4" />
            
            {/* Diagonal engineering guidelines */}
            <line x1="-140" y1="-140" x2="140" y2="140" strokeWidth="0.5" strokeDasharray="1,3" />
            <line x1="140" y1="-140" x2="-140" y2="140" strokeWidth="0.5" strokeDasharray="1,3" />
          </g>

          {/* Callouts & Technical specs */}
          <g stroke={strokeColor} fill="none" strokeWidth="0.75">
            <path d="M 113 -113 L 160 -160 H 220" />
            <path d="M 0 75 H -80 V 110" />
          </g>
          
          <text x="165" y="-166" fill={labelColorActive} fontSize="8" fontFamily="monospace" letterSpacing="1px" fontWeight="bold">110mm SDR 6 PN20</text>
          <text x="-75" y="105" fill={labelColor} fontSize="8" fontFamily="monospace" letterSpacing="0.5px">WALL THICKNESS 18.3mm</text>
          
          {/* CAD Metadata block */}
          <text x="120" y="150" fill={labelColor} fontSize="7" fontFamily="monospace" opacity="0.6">DWG NO: PPR-110-06</text>
          <text x="120" y="162" fill={labelColor} fontSize="7" fontFamily="monospace" opacity="0.6">SCALE: 1:1</text>
          <text x="120" y="174" fill={labelColorActive} fontSize="7" fontFamily="monospace" opacity="0.7" fontWeight="bold">SYS: NORMAL</text>

          {/* Pitch Circle markers */}
          <circle cx="0" cy="0" r="150" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="1,5" fill="none" />
        </g>

        {/* CAD Blueprint Bottom Left */}
        <g transform="translate(150, 600)">
          {/* Outer ticks */}
          <circle cx="0" cy="0" r="210" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="2, 6" fill="none" />

          {/* Concentric Pipe walls */}
          <g fill="none">
            <circle cx="0" cy="0" r="200" stroke={strokeColor} strokeWidth="0.75" />
            <circle cx="0" cy="0" r="180" stroke={accentStrokeColor} strokeWidth="1.25" />
            <circle cx="0" cy="0" r="150" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="5,5" />
            <circle cx="0" cy="0" r="120" stroke={strokeColor} strokeWidth="0.75" />
            <circle cx="0" cy="0" r="100" stroke={accentStrokeColor} strokeWidth="2" />
            <circle cx="0" cy="0" r="50" stroke={strokeColor} strokeWidth="0.75" />
          </g>

          {/* Crosshair axis lines */}
          <g stroke={strokeColor} strokeWidth="0.75" opacity="0.6">
            <line x1="-240" y1="0" x2="240" y2="0" strokeDasharray="8,4,2,4" />
            <line x1="0" y1="-240" x2="0" y2="240" strokeDasharray="8,4,2,4" />
            
            {/* Diagonal engineering guidelines */}
            <line x1="-141" y1="-141" x2="141" y2="141" strokeWidth="0.5" strokeDasharray="1,3" />
            <line x1="141" y1="-141" x2="-141" y2="141" strokeWidth="0.5" strokeDasharray="1,3" />
          </g>

          {/* Specs */}
          <g stroke={strokeColor} fill="none" strokeWidth="0.75">
            <path d="M -100 0 V -120 H -160" />
          </g>
          
          <text x="-155" y="-126" fill={labelColor} fontSize="8" fontFamily="monospace" letterSpacing="0.5px">PPR-C INDUSTRIAL</text>
          
          {/* CAD Metadata block */}
          <text x="-210" y="150" fill={labelColor} fontSize="7" fontFamily="monospace" opacity="0.6">DWG NO: PPR-C-200</text>
          <text x="-210" y="162" fill={labelColor} fontSize="7" fontFamily="monospace" opacity="0.6">TOLERANCE: +/-0.2mm</text>
          <text x="-210" y="174" fill={labelColorActive} fontSize="7" fontFamily="monospace" opacity="0.7" fontWeight="bold">CLASS: PN16</text>
        </g>
      </svg>
    </div>
  );
};

