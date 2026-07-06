'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// ignoreMobileResize disabled — we handle this ourselves with a width-only debounce
// (iOS address-bar height changes are filtered out; real viewport switches are not)
ScrollTrigger.config({ ignoreMobileResize: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // ── Reduced-motion preference ─────────────────────────────────────────
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Touch device detection ────────────────────────────────────────────
    // On touch devices, native scroll is already buttery smooth and works
    // perfectly with ScrollTrigger pin. Lenis smooth scroll on touch adds
    // a virtual scroll layer that conflicts with ScrollTrigger's pin
    // position calculations, causing jitter, wrong spacer heights, and
    // sections bleeding over pinned content.
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // ── Lenis configuration ───────────────────────────────────────────────
    const lenis = new Lenis({
      // Desktop: lerp 0.082 = premium "velvet" smooth scroll (0.1 was slightly slow)
      // Touch/Mobile: lerp 1 = no smoothing (native scroll pass-through)
      // Reduced motion: lerp 1 = instant
      lerp: (reducedMotion || isTouchDevice) ? 1 : 0.082,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      // Desktop only: smooth wheel. On touch devices, disable entirely
      // so native momentum scroll works unimpeded with ScrollTrigger pins.
      smoothWheel: !(reducedMotion || isTouchDevice),
      // 1:1 finger-to-scroll on mobile — prevents overshoot
      touchMultiplier: 1.0,
      // Natural wheel speed (0.85 was slightly sluggish)
      wheelMultiplier: 1.0,
      infinite: false,
      // We drive RAF via GSAP ticker — prevents double rAF loop
      autoRaf: false,
    });

    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with every Lenis frame
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Add Lenis to GSAP ticker so they share the same rAF loop
    gsap.ticker.add(updateTicker);
    // Disable GSAP's own lag smoothing — Lenis handles frame smoothing
    gsap.ticker.lagSmoothing(0);

    // ── Refresh ScrollTrigger after fonts/images/layout settle ─────────────
    ScrollTrigger.refresh();
    const onLoad = () => {
      // Delayed refresh ensures layout is fully settled (fonts painted, etc.)
      setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad, { once: true });
    }

    // ── ResizeObserver: re-refresh on body width change (font swap, image load) ──
    // Height-only changes (iOS address bar, virtual keyboard) are ignored to
    // prevent redundant ScrollTrigger recalculations on every iOS scroll.
    let resizeTimer: ReturnType<typeof setTimeout>;
    let lastROWidth = document.body.offsetWidth;
    const ro = new ResizeObserver(() => {
      const currentWidth = document.body.offsetWidth;
      if (currentWidth === lastROWidth) return; // height-only change — skip
      lastROWidth = currentWidth;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    ro.observe(document.body);

    // ── Window resize: refresh only on WIDTH change (device switch) ─────────────
    // Height-only changes (iOS address bar) are ignored to prevent jitter.
    let lastWidth = window.innerWidth;
    let viewportResizeTimer: ReturnType<typeof setTimeout>;
    const onViewportResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth === lastWidth) return; // height-only change — ignore
      lastWidth = currentWidth;
      clearTimeout(viewportResizeTimer);
      viewportResizeTimer = setTimeout(() => {
        // Recalculate all ScrollTrigger positions after viewport width change
        ScrollTrigger.refresh(true);
      }, 250);
    };
    window.addEventListener('resize', onViewportResize, { passive: true });

    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('SW registered:', registration.scope);
            }
          })
          .catch((error) => {
            if (process.env.NODE_ENV === 'development') {
              console.log('SW registration failed:', error);
            }
          });
      });
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(updateTicker);
      ro.disconnect();
      window.removeEventListener('resize', onViewportResize);
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
