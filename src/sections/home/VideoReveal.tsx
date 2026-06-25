'use client'

import { useLayoutEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Prevent iOS address-bar resize thrashing ScrollTrigger calculations
ScrollTrigger.config({ ignoreMobileResize: true })

/* ─── Curtain panel images ────────────────────────────────────────────── */
const CURTAIN_IMAGES = [
  '/images/img-curtain-001.webp',
  '/images/img-curtain-002.webp',
  '/images/img-curtain-003.webp',
  '/images/img-curtain-004.webp',
] as const

/* ─── Reduced-motion helper ───────────────────────────────────────────── */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* ═══════════════════════════════════════════════════════════════════════
   VideoReveal — scroll-driven curtain + video reveal section
   
   Architecture:
   ┌─────────────────────────────────────────────────┐
   │  z-0  Video background (mp4, autoplay, muted)   │
   │  z-1  Dark overlay (opacity animated)            │
   │  z-2  Green radial glow (scales in)              │
   │  z-3  4× curtain columns (slide L/R on scroll)   │
   │  z-4  Floating headline text (fades/drifts in)    │
   │  z-5  Scroll indicator (fades out early)          │
   └─────────────────────────────────────────────────┘
   
   Device optimizations:
   • Mobile:  no blur filter (GPU-expensive per frame), shorter scrub,
              tighter column offsets, smaller text, 100dvh height
   • Tablet:  intermediate sizing, balanced scroll distance
   • Desktop: full blur filter, wider offsets, longer scrub
   • iOS:     100dvh/100svh fallback, ignoreMobileResize,
              playsInline for autoplay, -webkit-overflow-scrolling
   • Android: playsInline, preload="metadata" for battery
   • PWA:     safe-area insets respected via env() in scroll indicator
   • a11y:    prefers-reduced-motion skips all GSAP animations
   ═══════════════════════════════════════════════════════════════════════ */
export default function VideoReveal() {
  /* ─── Refs ────────────────────────────────────────────────────────── */
  const sectionRef         = useRef<HTMLElement>(null)
  const videoRef           = useRef<HTMLVideoElement>(null)
  const overlayRef         = useRef<HTMLDivElement>(null)
  const glowRef            = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  // Curtain column refs
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)
  const col3Ref = useRef<HTMLDivElement>(null)
  const col4Ref = useRef<HTMLDivElement>(null)

  // Text fragment refs
  const frag1Ref = useRef<HTMLDivElement>(null)
  const frag2Ref = useRef<HTMLDivElement>(null)
  const frag3Ref = useRef<HTMLDivElement>(null)

  /* ─── Ensure video plays on iOS (user gesture policy fallback) ──── */
  const attemptVideoPlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked — retry on first user interaction
        const resumePlay = () => {
          video.play().catch(() => {})
          document.removeEventListener('touchstart', resumePlay)
          document.removeEventListener('click', resumePlay)
        }
        document.addEventListener('touchstart', resumePlay, { once: true, passive: true })
        document.addEventListener('click', resumePlay, { once: true })
      })
    }
  }, [])

  /* ─── Main animation setup ────────────────────────────────────────── */
  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Skip all animations if user prefers reduced motion
    if (prefersReducedMotion()) {
      // Still show everything, just without animation
      gsap.set([frag1Ref.current, frag2Ref.current, frag3Ref.current], { opacity: 1 })
      gsap.set([col1Ref.current, col2Ref.current, col3Ref.current, col4Ref.current], { x: 0 })
      attemptVideoPlay()
      return
    }

    // Start video playback
    attemptVideoPlay()

    /* ─── Responsive animation via matchMedia ──────────────────────── */
    const mm = gsap.matchMedia()

    mm.add(
      {
        // Small phones (iPhone SE, Galaxy S series, etc.)
        isSmallMobile: '(max-width: 374px)',
        // Standard mobile (375px–767px)
        isMobile: '(min-width: 375px) and (max-width: 767px)',
        // Tablets (768px–1023px)
        isTablet: '(min-width: 768px) and (max-width: 1023px)',
        // Desktop (1024px+)
        isDesktop: '(min-width: 1024px)',
      },
      (context) => {
        const { isSmallMobile, isMobile, isTablet } = context.conditions!

        /* ── Responsive values ───────────────────────────────────── */
        // Outer columns slide further than inner ones for depth
        const outerSlide = isSmallMobile ? '140%' : isMobile ? '135%' : isTablet ? '120%' : '110%'
        const innerSlide = isSmallMobile ? '80%' : isMobile ? '75%' : isTablet ? '65%' : '60%'

        // Mobile: shorter scroll distance (thumb-friendly)
        const scrollEnd = isSmallMobile || isMobile ? '+=100%' : isTablet ? '+=120%' : '+=150%'

        // Video initial scale — subtle dezoom effect
        const videoStartScale = isSmallMobile || isMobile ? 1.04 : 1.12

        // Text parallax drift (reduced on mobile to avoid clipping)
        const textDrift = isSmallMobile ? -10 : isMobile ? -16 : -40

        // Use blur only on desktop — too GPU-expensive per scrub frame on mobile
        const useBlur = !(isSmallMobile || isMobile || isTablet)

        /* ── Main ScrollTrigger timeline ─────────────────────────── */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: scrollEnd,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: true,
            // Recalculate on resize/orientation change
            invalidateOnRefresh: true,
            // Force 3D for smoother compositing during pin
            pinType: 'fixed',
          },
        })

        /* ── Phase 1: Curtain columns blast apart (0 → 1) ────────── */
        tl.fromTo(
          col1Ref.current,
          { x: '0%' },
          { x: `-${outerSlide}`, ease: 'power2.inOut' },
          0,
        )
        tl.fromTo(
          col2Ref.current,
          { x: '0%' },
          { x: `-${innerSlide}`, ease: 'power2.inOut' },
          0,
        )
        tl.fromTo(
          col3Ref.current,
          { x: '0%' },
          { x: `${innerSlide}`, ease: 'power2.inOut' },
          0,
        )
        tl.fromTo(
          col4Ref.current,
          { x: '0%' },
          { x: `${outerSlide}`, ease: 'power2.inOut' },
          0,
        )

        /* ── Dark overlay lifts as curtains open ─────────────────── */
        if (overlayRef.current) {
          tl.fromTo(
            overlayRef.current,
            { opacity: 0.7 },
            { opacity: 0.3, ease: 'power1.out' },
            0,
          )
        }

        /* ── Video de-zooms subtly ───────────────────────────────── */
        if (videoRef.current) {
          tl.fromTo(
            videoRef.current,
            { scale: videoStartScale },
            { scale: 1, ease: 'power2.out' },
            0,
          )
        }

        /* ── Green glow blooms behind text ───────────────────────── */
        if (glowRef.current) {
          tl.fromTo(
            glowRef.current,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, ease: 'power2.out' },
            0.2,
          )
        }

        /* ── Text fragments materialize ──────────────────────────── */
        const textEls = [frag1Ref.current, frag2Ref.current, frag3Ref.current]
        tl.fromTo(
          textEls,
          {
            opacity: 0,
            ...(useBlur ? { filter: 'blur(12px)' } : {}),
          },
          {
            opacity: 1,
            ...(useBlur ? { filter: 'blur(0px)' } : {}),
            stagger: 0.06,
            ease: 'power2.out',
          },
          0.25,
        )

        /* ── Upward parallax drift ───────────────────────────────── */
        tl.fromTo(
          textEls,
          { y: 0 },
          { y: textDrift, ease: 'none' },
          0.35,
        )

        /* ── Scroll indicator fades out early ────────────────────── */
        if (scrollIndicatorRef.current) {
          tl.fromTo(
            scrollIndicatorRef.current,
            { opacity: 1 },
            { opacity: 0, ease: 'power2.out' },
            0.08,
          )
        }
      },
      section, // Scope for cleanup
    )

    return () => {
      mm.revert()
    }
  }, [attemptVideoPlay])

  /* ─── Render ──────────────────────────────────────────────────────── */
  return (
    <section
      id="video-reveal"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A0A0B]"
      style={{
        // Modern viewport units with robust fallbacks:
        // 1. dvh = dynamic viewport height (accounts for iOS Safari toolbar)
        // 2. svh = small viewport height (stable, never changes)
        // 3. vh  = legacy fallback
        height: '100dvh',
        minHeight: '100svh',
        // Isolate stacking context so internal z-indices don't leak
        isolation: 'isolate',
        // Elevate above neighboring sections
        zIndex: 10,
        // Smooth touch scrolling on iOS
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* ═══ Layer 0: Video background ═══════════════════════════════ */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline=""
        preload="metadata"
        poster="/images/img-001.webp"
        // Prevent context menu on long-press (mobile)
        onContextMenu={(e) => e.preventDefault()}
        style={{
          // Hardware-accelerated compositing hint
          transform: 'translateZ(0)',
        }}
      >
        <source
          src="https://res.cloudinary.com/djdzxaenj/video/upload/v1782307818/Video-Hero_hixatu.mp4"
          type="video/mp4"
        />
      </video>

      {/* ═══ Layer 1: Dark overlay ═══════════════════════════════════ */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#0A0A0B]/70 z-[1] will-change-[opacity]"
      />

      {/* ═══ Layer 2: Green depth glow ══════════════════════════════ */}
      <div
        ref={glowRef}
        className="absolute inset-0 z-[2] pointer-events-none will-change-[transform,opacity]"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(46,125,50,0.22) 0%, transparent 70%)',
          // Start invisible — animated in by ScrollTrigger
          opacity: 0,
        }}
      />

      {/* ═══ Layer 3: Curtain columns ═══════════════════════════════ */}
      <div className="absolute inset-0 z-[3]" aria-hidden="true">
        {[col1Ref, col2Ref, col3Ref, col4Ref].map((ref, i) => (
          <div
            key={i}
            ref={ref}
            className="absolute top-0 h-full will-change-transform"
            style={{
              // Each column is exactly 25% wide
              left: `${i * 25}%`,
              width: '25%',
              // Curtain image
              backgroundImage: `url(${CURTAIN_IMAGES[i]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              // GPU compositing
              transform: 'translateZ(0)',
            }}
          >
            {/* Edge shadow for depth between panels */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  i < 2
                    ? 'linear-gradient(to right, transparent 50%, rgba(10,10,11,0.7) 100%)'
                    : 'linear-gradient(to left, transparent 50%, rgba(10,10,11,0.7) 100%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* ═══ Layer 4: Floating headline text ════════════════════════ */}
      <div
        className="absolute z-[4] inset-0 flex flex-col items-center justify-center gap-0 pointer-events-none select-none"
        aria-label="Industrial Piping Excellence"
        role="heading"
        aria-level={2}
      >
        {/* INDUSTRIAL */}
        <div ref={frag1Ref} className="opacity-0 will-change-[transform,opacity,filter]">
          <span
            className={[
              'block font-heading font-black text-[#EEEEEE] leading-none',
              'tracking-[-0.04em] uppercase',
              // Responsive text sizing — mobile-first
              'text-[2.6rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[110px]',
              // Text shadow for legibility over images
              'drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)]',
            ].join(' ')}
          >
            INDUSTRIAL
          </span>
        </div>

        {/* PIPING — green metallic shimmer */}
        <div ref={frag2Ref} className="opacity-0 will-change-[transform,opacity,filter]">
          <span
            className={[
              'block font-heading font-black leading-none',
              'tracking-[-0.04em] uppercase metallic-shimmer-text',
              'text-[2.6rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[110px]',
              'drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)]',
            ].join(' ')}
          >
            PIPING
          </span>
        </div>

        {/* EXCELLENCE */}
        <div ref={frag3Ref} className="opacity-0 will-change-[transform,opacity,filter]">
          <span
            className={[
              'block font-heading font-black text-[#EEEEEE] leading-none',
              'tracking-[-0.04em] uppercase',
              'text-[2.6rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[110px]',
              'drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)]',
            ].join(' ')}
          >
            EXCELLENCE
          </span>
        </div>
      </div>

      {/* ═══ Layer 5: Scroll indicator ══════════════════════════════ */}
      <div
        ref={scrollIndicatorRef}
        className="absolute z-[5] flex flex-col items-center gap-3"
        style={{
          // Use safe-area inset for devices with home indicators (iPhone X+)
          bottom: 'calc(max(2rem, env(safe-area-inset-bottom, 0px)) + 0.5rem)',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <span className="font-body text-[0.65rem] sm:text-xs text-white/40 uppercase tracking-widest">
          Scroll to explore
        </span>
        <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <div className="w-1 h-1 rounded-full bg-[#4ADE80] absolute left-1/2 -translate-x-1/2 scroll-indicator-dot" />
        </div>
      </div>
    </section>
  )
}
