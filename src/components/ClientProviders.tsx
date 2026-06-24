'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Stop iOS address-bar resize events from thrashing ScrollTrigger
ScrollTrigger.config({ ignoreMobileResize: true });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // ── Reduced-motion preference ─────────────────────────────────────────
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Lenis configuration ───────────────────────────────────────────────
    // lerp: 0.1 — the industry-standard linear interpolation factor used by
    // premium sites. Each frame advances 10% toward the target, giving an
    // immediate initial response with a silky natural deceleration.
    // Far superior to duration-based easing (was 0.9s) — no double-lag on mobile.
    const lenis = new Lenis({
      lerp: reducedMotion ? 1 : 0.1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !reducedMotion,
      // 1:1 finger-to-scroll on mobile — prevents overshoot
      touchMultiplier: 1.0,
      // Slight wheel resistance for desktop precision
      wheelMultiplier: 0.85,
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

    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('SW registered:', registration.scope);
          })
          .catch((error) => {
            console.log('SW registration failed:', error);
          });
      });
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(updateTicker);
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
