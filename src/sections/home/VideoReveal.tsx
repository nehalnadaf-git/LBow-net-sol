'use client'

import { useEffect, useRef, useCallback } from 'react'

/* ═══════════════════════════════════════════════════════════════════════
   VideoReveal — lightweight full-screen video section with blur reveal.

   Animation strategy (zero GSAP, zero scroll events, zero per-frame JS):
   • IntersectionObserver adds class "vr-revealed" to section once (fires once).
   • CSS @keyframes in globals.css handle all animation on the compositor thread.
   • Desktop: filter:blur(18px → 0) + opacity — premium blur-unmasking effect.
   • Mobile/Touch: translateY(14px → 0) + opacity — cheaper, equally smooth.
   • Reduced-motion: words shown instantly, no animation.
   • Video: autoPlay + muted + loop + playsInline with iOS fallback.
   ═══════════════════════════════════════════════════════════════════════ */
export default function VideoReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)

  /* ─── Video autoplay — iOS requires play() after user interaction ─── */
  const attemptVideoPlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    const p = video.play()
    if (p !== undefined) {
      p.catch(() => {
        const resume = () => {
          video.play().catch(() => {})
          document.removeEventListener('touchstart', resume)
          document.removeEventListener('click', resume)
        }
        document.addEventListener('touchstart', resume, { once: true, passive: true })
        document.addEventListener('click', resume, { once: true })
      })
    }
  }, [])

  /* ─── One-shot IntersectionObserver — just adds CSS class ────────── */
  useEffect(() => {
    attemptVideoPlay()

    const section = sectionRef.current
    if (!section) return

    // Reduced-motion: reveal immediately, no observer needed
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      section.classList.add('vr-revealed')
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('vr-revealed')
          obs.disconnect() // fires once only
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(section)

    return () => obs.disconnect()
  }, [attemptVideoPlay])

  /* ─── Render ──────────────────────────────────────────────────────── */
  return (
    <section
      id="video-reveal"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A0A0B]"
      style={{
        height: '100dvh',
        minHeight: '100svh',
      }}
    >
      {/* ═══ Layer 0: Video background ══════════════════════════════ */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/img-001.webp"
        aria-label="Industrial piping installation video background"
        role="img"
        onContextMenu={(e) => e.preventDefault()}
        style={{ transform: 'translateZ(0)' }}
      >
        <source
          src="https://res.cloudinary.com/djdzxaenj/video/upload/v1782307818/Video-Hero_hixatu.mp4"
          type="video/mp4"
        />
      </video>

      {/* ═══ Layer 1: Dark gradient overlay — animates lighter as text reveals */}
      <div
        className="vr-overlay absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(10,11,13,0.88) 0%, rgba(10,11,13,0.55) 50%, rgba(10,11,13,0.22) 100%)',
        }}
      />

      {/* ═══ Layer 2: Headline text ══════════════════════════════════ */}
      <div
        className="absolute inset-0 z-[2] flex flex-col items-center justify-center pointer-events-none select-none"
        aria-label="Industrial Piping Excellence"
        role="heading"
        aria-level={2}
      >
        <div className="flex flex-col items-center gap-0 text-center">

          {/* INDUSTRIAL */}
          <span
            className="vr-word vr-word-1 block font-heading font-black text-[#EEEEEE] leading-none tracking-[-0.04em] uppercase text-[2.4rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[110px]"
            style={{ textShadow: '0 2px 28px rgba(0,0,0,0.75)' }}
          >
            INDUSTRIAL
          </span>

          {/* PIPING — green metallic shimmer */}
          <span
            className="vr-word vr-word-2 block font-heading font-black leading-none tracking-[-0.04em] uppercase metallic-shimmer-text text-[2.4rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[110px]"
          >
            PIPING
          </span>

          {/* EXCELLENCE */}
          <span
            className="vr-word vr-word-3 block font-heading font-black text-[#EEEEEE] leading-none tracking-[-0.04em] uppercase text-[2.4rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-[110px]"
            style={{ textShadow: '0 2px 28px rgba(0,0,0,0.75)' }}
          >
            EXCELLENCE
          </span>

        </div>
      </div>


    </section>
  )
}
