'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// ── ignoreMobileResize: true ─────────────────────────────────────────────────
// FIX: On iOS Safari, the address bar shows/hides during scrolling, changing
// window.innerHeight by ~50–88px. With false, every address-bar toggle triggers
// ScrollTrigger.refresh() → all triggers recalculate → content jumps mid-scroll.
// true = GSAP ignores height-only viewport changes on mobile. Real orientation
// changes are handled by our width-only ResizeObserver + window resize handler.
ScrollTrigger.config({ ignoreMobileResize: true });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // ── Reduced-motion preference ─────────────────────────────────────────
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Use CSS pointer media query, NOT navigator.maxTouchPoints, to detect
    // true touch-primary devices. Safari on macOS reports maxTouchPoints=5
    // for the trackpad — that falsely skips Lenis on desktop Mac Safari,
    // removing smooth scroll entirely. pointer:coarse = finger (phone/tablet).
    // pointer:fine = mouse or trackpad (desktop Safari gets Lenis correctly).
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    // ── Lenis: desktop-only smooth scroll ─────────────────────────────────
    // FIX: On touch devices, skip Lenis entirely. Native mobile scroll is
    // already butter-smooth and works perfectly with ScrollTrigger. Lenis on
    // touch adds a JS middle-man (touchstart/move/end listeners, virtualised
    // scroll position, per-frame RAF updates) that costs 1-2 frames of lag
    // and can conflict with ScrollTrigger's position calculations.
    //
    // Without Lenis on touch, ScrollTrigger reads the native scroll position
    // directly — zero overhead, zero lag, zero conflicts.
    let lenis: Lenis | null = null;
    let updateTicker: ((time: number) => void) | null = null;

    // ── Always disable GSAP lag smoothing ─────────────────────────────────
    // GSAP's default lag smoothing (250ms) freezes scrub animations during
    // frame spikes. On iOS with WebGL running, spikes are common. Disabling
    // this ensures scrub progress always advances even after a heavy frame.
    gsap.ticker.lagSmoothing(0);

    if (!isTouchDevice && !reducedMotion) {
      lenis = new Lenis({
        lerp: 0.082,                // Premium "velvet" smooth scroll
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1.0,
        wheelMultiplier: 1.0,
        infinite: false,
        autoRaf: false,             // We drive RAF via GSAP ticker
      });

      lenisRef.current = lenis;

      // Keep ScrollTrigger in sync with every Lenis frame
      lenis.on('scroll', ScrollTrigger.update);

      updateTicker = (time: number) => {
        lenis!.raf(time * 1000);
      };

      // Add Lenis to GSAP ticker so they share the same rAF loop
      gsap.ticker.add(updateTicker);
    } else {
      // ── Touch / reduced-motion: no Lenis, but keep ScrollTrigger in sync ──
      // Without Lenis, ScrollTrigger.update() is only called from native scroll
      // events, which on iOS fire asynchronously (not every rAF frame). This
      // causes the scrub timeline to desync from the Three.js render — pipes
      // appear to freeze or not respond to scroll.
      //
      // Fix: add a minimal GSAP ticker callback that calls ScrollTrigger.update()
      // every frame. This replicates exactly what Lenis was providing, at zero
      // cost (no scroll virtualisation, no lerp, just a one-line update call).
      const touchSTUpdate = () => ScrollTrigger.update();
      gsap.ticker.add(touchSTUpdate);
      // Store as updateTicker so cleanup removes it
      updateTicker = touchSTUpdate;
      lenisRef.current = null;
    }

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
      if (lenis) {
        lenis.destroy();
      }
      lenisRef.current = null;
      if (updateTicker) {
        gsap.ticker.remove(updateTicker);
      }
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
