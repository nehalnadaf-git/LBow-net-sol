'use client'

import React, { useId } from 'react';

interface HexGridBgProps {
  isLight?: boolean;
}

export const HexGridBg: React.FC<HexGridBgProps> = ({ isLight = false }) => {
  const uid = useId();
  const strokeColor = isLight ? 'rgba(30,32,33,0.06)' : 'rgba(238,238,238,0.045)';
  const accentColor = isLight ? '#2E7D32' : '#4ADE80';
  const labelColor = isLight ? 'rgba(30,32,33,0.25)' : 'rgba(238,238,238,0.18)';

  // Unique IDs per instance to prevent SVG defs collision
  const ids = {
    pipeGrid: `${uid}-hex-pipe-grid`,
    vignette: `${uid}-hex-vignette`,
    mask: `${uid}-hex-mask`,
    grain: `${uid}-hex-grain`,
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
          {/* Detailed schematic piping & molecular pattern */}
          <pattern
            id={ids.pipeGrid}
            width="208"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            {/* Seamless Isometric Grid Lines */}
            <path
              d="M0,0 L52,30 L104,0 L156,30 L208,0 M0,120 L52,90 L104,120 L156,90 L208,120 M0,0 V120 M104,0 V120 M208,0 V120 M52,30 V90 M156,30 V90"
              stroke={strokeColor}
              strokeWidth="0.5"
              fill="none"
            />

            {/* Technical double-line pipes for 3D piping visualization */}
            {/* Vertical main pipe at X=104 */}
            <line x1="101" y1="0" x2="101" y2="120" stroke={strokeColor} strokeWidth="0.5" />
            <line x1="107" y1="0" x2="107" y2="120" stroke={strokeColor} strokeWidth="0.5" />
            <line x1="104" y1="0" x2="104" y2="120" stroke={accentColor} strokeWidth="0.5" strokeDasharray="3,4" opacity="0.4" />

            {/* Vertical main pipe at X=0 / X=208 (seamless borders) */}
            <line x1="205" y1="0" x2="205" y2="120" stroke={strokeColor} strokeWidth="0.5" />
            <line x1="3" y1="0" x2="3" y2="120" stroke={strokeColor} strokeWidth="0.5" />
            <line x1="0" y1="0" x2="0" y2="120" stroke={accentColor} strokeWidth="0.5" strokeDasharray="3,4" opacity="0.4" />
            <line x1="208" y1="0" x2="208" y2="120" stroke={accentColor} strokeWidth="0.5" strokeDasharray="3,4" opacity="0.4" />

            {/* Flanges & Joints on the vertical pipes */}
            <line x1="98" y1="40" x2="110" y2="40" stroke={strokeColor} strokeWidth="1" />
            <line x1="98" y1="42" x2="110" y2="42" stroke={strokeColor} strokeWidth="1" />
            <line x1="98" y1="80" x2="110" y2="80" stroke={strokeColor} strokeWidth="1" />
            <line x1="98" y1="82" x2="110" y2="82" stroke={strokeColor} strokeWidth="1" />

            <line x1="202" y1="60" x2="214" y2="60" stroke={strokeColor} strokeWidth="1" />
            <line x1="202" y1="62" x2="214" y2="62" stroke={strokeColor} strokeWidth="1" />
            <line x1="-6" y1="60" x2="6" y2="60" stroke={strokeColor} strokeWidth="1" />
            <line x1="-6" y1="62" x2="6" y2="62" stroke={strokeColor} strokeWidth="1" />

            {/* Hexagonal Pipe Coupler Joints at major nodes */}
            {/* Node 1: (52, 60) */}
            <polygon points="52,48 62,54 62,66 52,72 42,66 42,54" stroke={strokeColor} strokeWidth="0.75" fill="none" />
            <polygon points="52,52 60,56 60,64 52,68 44,64 44,56" stroke={accentColor} strokeWidth="0.5" fill="none" opacity="0.6" />
            <polygon points="52,56 56,58 56,62 52,64 48,62 48,58" stroke={accentColor} strokeWidth="0.75" fill="none" opacity="0.6" />

            {/* Node 2: (156, 60) */}
            <polygon points="156,48 166,54 166,66 156,72 146,66 146,54" stroke={strokeColor} strokeWidth="0.75" fill="none" />
            <polygon points="156,52 164,56 164,64 156,68 148,64 148,56" stroke={accentColor} strokeWidth="0.5" fill="none" opacity="0.6" />
            <polygon points="156,56 160,58 160,62 156,64 152,62 152,58" stroke={accentColor} strokeWidth="0.75" fill="none" opacity="0.6" />

            {/* Technical valves (Schematic symbols) */}
            {/* Valve 1: (104, 60) */}
            <g transform="translate(104, 60)">
              <polygon points="-8,-5 -8,5 0,0" fill="none" stroke={strokeColor} strokeWidth="0.75" />
              <polygon points="8,-5 8,5 0,0" fill="none" stroke={strokeColor} strokeWidth="0.75" />
              <line x1="0" y1="0" x2="0" y2="-7" stroke={strokeColor} strokeWidth="0.75" />
              <line x1="-4" y1="-7" x2="4" y2="-7" stroke={strokeColor} strokeWidth="0.75" />
            </g>

            {/* Diamond Technical Gauges */}
            {/* Gauge 1: (52, 30) */}
            <g transform="translate(52, 30)" opacity="0.7">
              <polygon points="0,-7 7,0 0,7 -7,0" stroke={strokeColor} strokeWidth="0.75" fill="none" />
              <line x1="0" y1="0" x2="4" y2="-4" stroke={accentColor} strokeWidth="1" />
              <line x1="-1" y1="0" x2="1" y2="0" stroke={strokeColor} strokeWidth="1" />
              <line x1="0" y1="-1" x2="0" y2="1" stroke={strokeColor} strokeWidth="1" />
            </g>
            
            {/* Gauge 2: (156, 90) */}
            <g transform="translate(156, 90)" opacity="0.7">
              <polygon points="0,-7 7,0 0,7 -7,0" stroke={strokeColor} strokeWidth="0.75" fill="none" />
              <line x1="0" y1="0" x2="-3" y2="-4" stroke={accentColor} strokeWidth="1" />
              <line x1="-1" y1="0" x2="1" y2="0" stroke={strokeColor} strokeWidth="1" />
              <line x1="0" y1="-1" x2="0" y2="1" stroke={strokeColor} strokeWidth="1" />
            </g>

            {/* Polypropylene Random Copolymer (PPR) Chemistry Nodes */}
            <g fontSize="6" fontFamily="monospace" fill={labelColor} textAnchor="middle" opacity="0.55">
              {/* Monomer chain elements near nodes */}
              <text x="52" y="18">PP-R</text>
              <text x="156" y="18">PP-CH</text>
              <text x="52" y="108">PPR-C</text>
              <text x="156" y="108">DIN 8077</text>
              
              {/* Chemical chain details */}
              <text x="104" y="24" fontSize="5" fill={accentColor} opacity="0.3">-[CH₂-CH(CH₃)]n-</text>
              <text x="104" y="106" fontSize="5" fill={accentColor} opacity="0.3">SDR 6 / PN20</text>
            </g>

            {/* Micro measurements / CAD style dimensions */}
            <g stroke={strokeColor} strokeWidth="0.5" opacity="0.5">
              {/* Dimension line 1 */}
              <line x1="120" y1="20" x2="140" y2="20" strokeDasharray="1,2" />
              <line x1="120" y1="18" x2="120" y2="22" />
              <line x1="140" y1="18" x2="140" y2="22" />
              
              {/* Dimension line 2 */}
              <line x1="68" y1="100" x2="88" y2="100" strokeDasharray="1,2" />
              <line x1="68" y1="98" x2="68" y2="102" />
              <line x1="88" y1="98" x2="88" y2="102" />
            </g>
            <g fontSize="4.5" fontFamily="monospace" fill={labelColor} opacity="0.5">
              <text x="130" y="16" textAnchor="middle">32mm</text>
              <text x="78" y="96" textAnchor="middle">110</text>
            </g>

            {/* Subtle flow direction chevrons */}
            <path d="M 40,20 L 44,20 L 42,16 Z" fill={accentColor} opacity="0.25" transform="rotate(30, 42, 18)" />
            <path d="M 144,20 L 148,20 L 146,16 Z" fill={accentColor} opacity="0.25" transform="rotate(30, 146, 18)" />
            <path d="M 60,100 L 64,100 L 62,96 Z" fill={accentColor} opacity="0.25" transform="rotate(210, 62, 98)" />
            <path d="M 164,100 L 168,100 L 166,96 Z" fill={accentColor} opacity="0.25" transform="rotate(210, 166, 98)" />
          </pattern>

          {/* Vignette mask to fade grid towards screen edges */}
          <radialGradient id={ids.vignette} cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="50%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0.15" />
          </radialGradient>
          <mask id={ids.mask}>
            <rect width="100%" height="100%" fill={`url(#${ids.vignette})`} />
          </mask>

        </defs>

        {/* Hex grid with radial vignette mask */}
        <rect width="100%" height="100%" fill={`url(#${ids.pipeGrid})`} mask={`url(#${ids.mask})`} />
      </svg>
    </div>
  );
};
