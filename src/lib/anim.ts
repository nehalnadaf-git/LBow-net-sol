/**
 * src/lib/anim.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised animation config — single source of truth for all GSAP timings.
 * Premium, snappy feel: short durations, responsive scrub, early triggers.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Entrance animations ──────────────────────────────────────────────────────
export const DUR = {
  xs:  0.25,   // micro — badge, icon flash
  sm:  0.38,   // fast  — label, small element
  md:  0.52,   // main  — heading reveal
  lg:  0.65,   // full  — image, hero element
} as const;

// ── Easing presets ───────────────────────────────────────────────────────────
export const EASE = {
  out:   'power3.out',   // general entrance
  snappy:'power4.out',   // headings / clip-path
  back:  'back.out(1.6)',// stats / badges (slight overshoot)
  none:  'none',         // scrub parallax
} as const;

// ── ScrollTrigger defaults ───────────────────────────────────────────────────
export const ST = {
  /** Standard element reveal — fires as element enters viewport */
  start:   'top 88%',
  /** Wide elements (full-width banners, sections) */
  startWide: 'top 82%',
  /** Once-only, non-reversing */
  once:    { toggleActions: 'play none none none' as const },
  /** Parallax scrub — responsive, not laggy */
  scrub:   0.45,
} as const;

// ── Stagger presets ──────────────────────────────────────────────────────────
export const STAGGER = {
  fast:   { amount: 0.20, from: 'start' as const },  // tight lists
  cards:  { amount: 0.30, from: 'start' as const },  // card grids
  loose:  { amount: 0.40, from: 'start' as const },  // large sections
} as const;

// ── Initial offsets (translate, scale) ──────────────────────────────────────
export const FROM = {
  y:    28,   // vertical slide distance (px)
  yLg:  40,   // for large/hero elements
  x:    20,   // horizontal slide
  xLg:  30,   // for image panels
  scale:0.95, // subtle scale-up
} as const;
