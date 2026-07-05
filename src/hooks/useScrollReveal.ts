'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Returns true if the user prefers reduced motion.
 * When true, all scroll animations should be skipped or instant.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Returns true on touch/pointer:coarse devices (iOS, Android).
 * Use to skip heavy parallax effects that waste GPU on mobile.
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Shared ScrollTrigger defaults for all section reveal animations.
 * - start: 'top 88%' — triggers slightly before element fully enters viewport
 * - toggleActions: 'play none none none' — fire once, no reverse
 */
export const REVEAL_TRIGGER_DEFAULTS = {
  start: 'top 88%',
  toggleActions: 'play none none none' as const,
};

/**
 * Returns parallax ScrollTrigger defaults, evaluated lazily at call time.
 * scrub: 1 on desktop = silky lag that feels premium.
 * scrub: true on touch = direct 1:1 mapping, no added lag (native momentum).
 * Called as a function so isMobileDevice() is evaluated fresh each time
 * (not frozen at module-load time, which breaks DevTools device switching).
 */
export function getParallaxTriggerDefaults() {
  return {
    start: 'top bottom',
    end: 'bottom top',
    scrub: isMobileDevice() ? true : 1,
  };
}

/** @deprecated Use getParallaxTriggerDefaults() instead */
export const PARALLAX_TRIGGER_DEFAULTS = {
  start: 'top bottom',
  end: 'bottom top',
  scrub: 1 as number | boolean,
};

/**
 * Premium entrance animation presets for reuse across sections.
 * Tuned for mobile-first: no blur (GPU-expensive), tight y offsets, fast durations.
 */
export const ANIM = {
  /** Standard text element reveal */
  fadeUp: {
    from: { opacity: 0, y: 20 },
    duration: 0.4,
    ease: 'power3.out',
  },
  /** Heading reveal — slightly more travel, snappy ease */
  headingUp: {
    from: { opacity: 0, y: 28 },
    duration: 0.45,
    ease: 'power4.out',
  },
  /** Card / image pop-in */
  cardIn: {
    from: { opacity: 0, y: 18, scale: 0.97 },
    duration: 0.42,
    ease: 'back.out(1.4)',
  },
  /** Slide in from left */
  slideLeft: {
    from: { opacity: 0, x: -24 },
    duration: 0.45,
    ease: 'power3.out',
  },
  /** Slide in from right */
  slideRight: {
    from: { opacity: 0, x: 24 },
    duration: 0.45,
    ease: 'power3.out',
  },
};

/**
 * useScrollReveal — runs a GSAP animation when the container enters the viewport.
 * Automatically respects prefers-reduced-motion and cleans up on unmount.
 *
 * @param callback  Function that sets up GSAP animations. Called once after mount
 *                  inside a gsap.context scoped to the ref — cleanup is automatic.
 * @param deps      Optional dependency array (usually empty — animations are one-shot).
 */
export function useScrollReveal(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  deps: React.DependencyList = [],
): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion — skip all animation setup
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Callback runs inside gsap.context scope — all GSAP calls are
      // automatically registered and reverted on cleanup. No ctx param needed.
      callbackRef.current();
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
