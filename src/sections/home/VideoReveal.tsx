'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Stop iOS address-bar resize events from thrashing ScrollTrigger
ScrollTrigger.config({ ignoreMobileResize: true })

const curtainImages = [
  '/images/img-curtain-001.webp',
  '/images/img-curtain-002.webp',
  '/images/img-curtain-003.webp',
  '/images/img-curtain-004.webp',
]

export default function VideoReveal() {
  const sectionRef         = useRef<HTMLElement>(null)
  const col1Ref            = useRef<HTMLDivElement>(null)
  const col2Ref            = useRef<HTMLDivElement>(null)
  const col3Ref            = useRef<HTMLDivElement>(null)
  const col4Ref            = useRef<HTMLDivElement>(null)
  const frag1Ref           = useRef<HTMLDivElement>(null)
  const frag2Ref           = useRef<HTMLDivElement>(null)
  const frag3Ref           = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const overlayRef         = useRef<HTMLDivElement>(null)
  const glowRef            = useRef<HTMLDivElement>(null)
  const videoRef           = useRef<HTMLVideoElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const mm = gsap.matchMedia()

    mm.add({
      isMobile: '(max-width: 767px)',
      isDesktop: '(min-width: 768px)'
    }, (context) => {
      const isMobile = context.conditions?.isMobile || false
      const outerSlide = isMobile ? '135%' : '110%'
      const innerSlide = isMobile ? '75%'  : '60%'

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          // Mobile: shorter scroll distance so curtain opens within thumb reach
          end: isMobile ? '+=100%' : '+=150%',
          pin: true,
          // Default pinType ('fixed') works now because:
          // 1. Lenis is disabled on touch devices (lerp:1 pass-through)
          // 2. Native scroll + position:fixed = rock-solid on all browsers
          pinSpacing: true,
          anticipatePin: 1,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      // ── Phase 1: Curtain columns blast apart ─────────────────────────────
      tl.fromTo(col1Ref.current, { x: '0%' }, { x: `-${outerSlide}`, ease: 'power2.inOut' }, 0)
      tl.fromTo(col2Ref.current, { x: '0%' }, { x: `-${innerSlide}`, ease: 'power2.inOut' }, 0)
      tl.fromTo(col3Ref.current, { x: '0%' }, { x:  `${innerSlide}`, ease: 'power2.inOut' }, 0)
      tl.fromTo(col4Ref.current, { x: '0%' }, { x:  `${outerSlide}`, ease: 'power2.inOut' }, 0)

      // ── Dark overlay lifts as curtains open ──────────────────────────────
      if (overlayRef.current) {
        tl.fromTo(overlayRef.current,
          { opacity: 0.7 },
          { opacity: 0.3, ease: 'power1.out' },
          0
        )
      }

      // ── Video slightly de-zooms as curtains open ──────────────────────────
      if (videoRef.current) {
        tl.fromTo(videoRef.current,
          { scale: isMobile ? 1.04 : 1.12 },
          { scale: 1, ease: 'power2.out' },
          0
        )
      }

      // ── Green glow blooms behind text ─────────────────────────────────────
      if (glowRef.current) {
        tl.fromTo(glowRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, ease: 'power2.out' },
          0.2
        )
      }

      // ── Text fragments materialize ────────────────────────────────────────
      // Mobile: pure opacity (no blur — avoids expensive GPU filter per frame)
      tl.fromTo(
        [frag1Ref.current, frag2Ref.current, frag3Ref.current],
        { opacity: 0, ...(isMobile ? {} : { filter: 'blur(12px)' }) },
        { opacity: 1, ...(isMobile ? {} : { filter: 'blur(0px)' }), stagger: 0.06, ease: 'power2.out' },
        0.25
      )

      // ── Upward parallax drift (reduced on mobile) ─────────────────────────
      tl.fromTo(
        [frag1Ref.current, frag2Ref.current, frag3Ref.current],
        { y: 0 },
        { y: isMobile ? -16 : -40, ease: 'none' },
        0.35
      )

      // ── Scroll indicator fades out early ─────────────────────────────────
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.out' },
          0.08
        )
      }
    }, section)

    return () => {
      mm.revert()
    }
  }, [])

  return (
    <section
      id="video-reveal"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A0A0B]"
      style={{
        height: '100dvh',
        minHeight: '100svh',
        // Elevate above neighbors to prevent stacking context bleed
        zIndex: 10,
        // Own stacking context so internal z-[1]..z-[5] don't leak
        isolation: 'isolate',
      }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0 will-change-transform"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/img-001.webp"
      >
        <source src="https://res.cloudinary.com/djdzxaenj/video/upload/v1782307818/Video-Hero_hixatu.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-[#0A0A0B]/70 z-[1]" />

      {/* Green depth glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(46,125,50,0.22) 0%, transparent 70%)',
        }}
      />

      {/* Curtain Columns */}
      <div className="absolute inset-0 z-[3]">
        {[col1Ref, col2Ref, col3Ref, col4Ref].map((ref, i) => (
          <div
            key={i}
            ref={ref}
            className="absolute top-0 w-1/4 h-full will-change-transform"
            style={{
              left: `${i * 25}%`,
              backgroundImage: `url(${curtainImages[i]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: i < 2
                  ? 'linear-gradient(to right, transparent 50%, rgba(10,10,11,0.7) 100%)'
                  : 'linear-gradient(to left, transparent 50%, rgba(10,10,11,0.7) 100%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Floating Headlines */}
      <div className="absolute z-[4] inset-0 flex flex-col items-center justify-center gap-0 pointer-events-none select-none">
        <div ref={frag1Ref} className="opacity-0 will-change-transform">
          <span className="text-[2.6rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-heading font-black text-[#EEEEEE] leading-none tracking-[-0.04em] uppercase drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)]">
            INDUSTRIAL
          </span>
        </div>
        <div ref={frag2Ref} className="opacity-0 will-change-transform">
          <span className="text-[2.6rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-heading font-black leading-none tracking-[-0.04em] uppercase metallic-shimmer-text drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)]">
            PIPING
          </span>
        </div>
        <div ref={frag3Ref} className="opacity-0 will-change-transform">
          <span className="text-[2.6rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-heading font-black text-[#EEEEEE] leading-none tracking-[-0.04em] uppercase drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)]">
            EXCELLENCE
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-3"
      >
        <span className="font-body text-[0.65rem] sm:text-xs text-white/40 uppercase tracking-widest">Scroll to explore</span>
        <div className="w-px h-8 sm:h-10 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <div className="w-1 h-1 rounded-full bg-[#4ADE80] absolute left-1/2 -translate-x-1/2 scroll-indicator-dot" />
        </div>
      </div>
    </section>
  )
}
