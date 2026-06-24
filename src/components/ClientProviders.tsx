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
    // ── Lenis configuration ───────────────────────────────────────────────
    // duration: 0.8 — shorter than default (1.2) so Lenis doesn't add
    // too much extra lag on mobile where native momentum already feels smooth.
    // Combined with scrub: true in VideoReveal, the curtain animation maps
    // directly to Lenis's interpolated scroll position with zero double-lag.
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => {
        // Expo ease-out: fast initial response, slow settle — premium feel
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      // Touch multiplier: 1.0 keeps 1:1 finger-to-scroll ratio on mobile
      // Higher values cause the page to overshoot the finger → feels wrong
      touchMultiplier: 1.0,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with every Lenis frame
    // This is critical: Lenis updates window.scrollY incrementally, and
    // ScrollTrigger.update() re-reads it to advance scrub animations.
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Add Lenis to GSAP ticker so they share the same rAF loop
    gsap.ticker.add(updateTicker);
    // Disable GSAP's own lag smoothing — Lenis handles it
    gsap.ticker.lagSmoothing(0);

    // ── Refresh ScrollTrigger after fonts/images/layout settle ─────────────
    ScrollTrigger.refresh();
    const onLoad = () => {
      // Delayed refresh ensures layout is fully settled (fonts painted, etc.)
      setTimeout(() => ScrollTrigger.refresh(), 300);
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
