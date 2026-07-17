'use client'

import { useRef, useEffect, useCallback } from 'react'
import { reviews } from '@/lib/reviews'

/* ═══════════════════════════════════════════════════════════════════
   ReviewsSection — rAF-driven infinite marquee with drag support.

   Auto-scroll:   requestAnimationFrame loop at ~0.5 px/frame.
   Drag (mouse):  mousedown → mousemove → mouseup (document-level).
   Drag (touch):  touchstart → touchmove → touchend.
   Momentum:      velocity captured from last pointer delta, decays at 0.94.
   Loop:          Two identical track copies. When offset ≤ -halfWidth,
                  snap back by halfWidth — perfectly seamless.
   Hover:         Pauses auto-scroll; drag still works.
   Reduced-motion: Auto-scroll disabled; drag still works.
   ═══════════════════════════════════════════════════════════════════ */

const AUTO_SPEED   = 0.5   // px per frame
const FRICTION     = 0.94  // momentum decay per frame
const MIN_VELOCITY = 0.08  // stop threshold

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? '#F59E0B' : 'none'}
          stroke={i < count ? '#F59E0B' : '#D1D5DB'}
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <article
      className="
        flex-shrink-0 overflow-hidden
        w-[272px] xs:w-[300px] sm:w-[320px] md:w-[340px] lg:w-[360px]
        h-[224px] sm:h-[236px]
        bg-white rounded-2xl
        border border-[rgba(15,23,42,0.08)]
        shadow-[0_2px_12px_rgba(15,23,42,0.07)]
        p-4 sm:p-5 flex flex-col gap-2.5 mx-2.5
        transition-shadow duration-300 select-none
        hover:shadow-[0_8px_32px_rgba(15,23,42,0.12),0_0_0_1px_rgba(46,125,50,0.08)]
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 flex-shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0
              font-heading font-bold text-xs sm:text-sm text-white"
            style={{ backgroundColor: review.avatarColor }}
            aria-hidden="true"
          >
            {review.initials}
          </div>
          <div className="min-w-0">
            <p className="font-heading font-semibold text-[#0A0F1E] text-sm leading-tight truncate">
              {review.name}
            </p>
            <p className="font-body text-[#6B7280] text-[11px] mt-0.5">Google Review</p>
          </div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" aria-label="Google" className="flex-shrink-0 opacity-70">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>

      {/* Stars */}
      <div className="flex-shrink-0">
        <StarRating count={review.rating} />
      </div>

      {/* Review text — scrollable when content exceeds card height */}
      <div className="flex-1 overflow-y-auto review-text-scroll">
        <p className="font-body text-[#374151] text-sm leading-relaxed break-words pr-0.5">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>
    </article>
  )
}



export default function ReviewsSection() {
  const trackRef    = useRef<HTMLDivElement>(null)
  const wrapRef     = useRef<HTMLDivElement>(null)

  // All state in refs — no re-renders in the hot path
  const posRef         = useRef(0)
  const velocityRef    = useRef(0)
  const halfWidth      = useRef(0)
  const isDragging     = useRef(false)
  const isHovered      = useRef(false)
  const dragStartX     = useRef(0)
  const dragStartPos   = useRef(0)
  const lastPointerX   = useRef(0)
  const touchStartY    = useRef(0)
  const directionLocked= useRef<'h' | 'v' | null>(null)
  const rafId          = useRef<number | null>(null)
  const reducedMotion  = useRef(false)

  /* ── rAF loop ─────────────────────────────────────────────────── */
  useEffect(() => {
    reducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const track = trackRef.current
    if (!track) return

    // Measure after paint so cards are laid out
    const measure = () => {
      halfWidth.current = track.scrollWidth / 2
    }
    measure()
    window.addEventListener('resize', measure)

    const tick = () => {
      const hw = halfWidth.current

      if (!isDragging.current) {
        if (!isHovered.current && !reducedMotion.current) {
          // Auto-scroll left
          posRef.current -= AUTO_SPEED
        }
        // Momentum decay after drag release
        if (Math.abs(velocityRef.current) > MIN_VELOCITY) {
          posRef.current  += velocityRef.current
          velocityRef.current *= FRICTION
        } else {
          velocityRef.current = 0
        }
      }

      // Seamless loop
      if (hw > 0) {
        if (posRef.current <= -hw) posRef.current += hw
        if (posRef.current >  0)  posRef.current -= hw
      }

      track.style.transform = `translateX(${posRef.current}px)`
      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      window.removeEventListener('resize', measure)
    }
  }, [])

  /* ── Mouse drag ────────────────────────────────────────────────── */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current  = true
    velocityRef.current = 0
    dragStartX.current  = e.clientX
    dragStartPos.current = posRef.current
    lastPointerX.current = e.clientX
    document.body.style.cursor     = 'grabbing'
    document.body.style.userSelect = 'none'
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      const delta = e.clientX - dragStartX.current
      posRef.current      = dragStartPos.current + delta
      velocityRef.current = e.clientX - lastPointerX.current
      lastPointerX.current = e.clientX
    }
    const onUp = () => {
      if (!isDragging.current) return
      isDragging.current = false
      document.body.style.cursor     = ''
      document.body.style.userSelect = ''
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup',   onUp)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup',   onUp)
    }
  }, [])

  /* ── Touch drag ────────────────────────────────────────────────── */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current    = true
    velocityRef.current   = 0
    dragStartX.current    = e.touches[0].clientX
    dragStartPos.current  = posRef.current
    lastPointerX.current  = e.touches[0].clientX
    touchStartY.current   = e.touches[0].clientY
    directionLocked.current = null
  }, [])

  useEffect(() => {
    const onMove = (e: TouchEvent) => {
      if (!isDragging.current) return
      const x  = e.touches[0].clientX
      const y  = e.touches[0].clientY

      // Lock direction on first significant movement
      if (!directionLocked.current) {
        const dx = Math.abs(x - dragStartX.current)
        const dy = Math.abs(y - touchStartY.current)
        if (dx > 4 || dy > 4) {
          directionLocked.current = dx >= dy ? 'h' : 'v'
        }
      }

      // Vertical gesture → let inner scroll handle it, don't drag carousel
      if (directionLocked.current === 'v') {
        isDragging.current = false
        return
      }

      const delta = x - dragStartX.current
      posRef.current      = dragStartPos.current + delta
      velocityRef.current = x - lastPointerX.current
      lastPointerX.current = x
    }
    const onEnd = () => { isDragging.current = false }
    document.addEventListener('touchmove', onMove, { passive: true })
    document.addEventListener('touchend',  onEnd)
    return () => {
      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('touchend',  onEnd)
    }
  }, [])

  /* ── Render ────────────────────────────────────────────────────── */
  return (
    <section
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24 bg-[#F8F9FA]"
      aria-labelledby="reviews-heading"
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #2E7D32 30%, #1565C0 70%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Header — centered like every other section */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 mb-10 sm:mb-12 text-center">
        <p className="font-body font-medium text-xs uppercase tracking-[0.12em] text-[#2E7D32] mb-2">
          Client Testimonials
        </p>
        <h2
          id="reviews-heading"
          className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-[#0A0F1E] leading-tight"
        >
          What Our Clients Say
        </h2>
        <p className="font-body text-sm text-[#6B7280] mt-2">
          Real reviews from Google Maps · Bangalore
        </p>

        {/* Rating badge — centered below heading */}
        <a
          href="https://maps.app.goo.gl/po7L5EmBkASsmHbX9"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-3 bg-white mt-6
            border border-[rgba(15,23,42,0.10)] rounded-xl px-4 py-3
            shadow-[0_2px_8px_rgba(15,23,42,0.06)]
            hover:shadow-[0_4px_16px_rgba(15,23,42,0.10)]
            hover:border-[rgba(46,125,50,0.2)]
            transition-all duration-300 group
          "
          aria-label="View all reviews on Google Maps"
        >
          <div className="flex gap-0.5" aria-hidden="true">
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
              </svg>
            ))}
          </div>
          <div className="text-left">
            <p className="font-heading font-bold text-[#0A0F1E] text-sm leading-none">5.0 / 5</p>
            <p className="font-body text-[#6B7280] text-[11px] mt-0.5">29 reviews · Google Maps</p>
          </div>
          <svg
            className="w-4 h-4 text-[#6B7280] group-hover:translate-x-0.5 transition-transform duration-200"
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
          </svg>
        </a>
      </div>

      {/* Carousel */}
      <div
        ref={wrapRef}
        className="relative overflow-hidden"
        style={{ cursor: 'grab' }}
        onMouseDown={onMouseDown}
        onMouseEnter={() => { isHovered.current = true }}
        onMouseLeave={() => { isHovered.current = false }}
        onTouchStart={onTouchStart}
        role="region"
        aria-label="Client reviews carousel — drag to scroll"
      >
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #F8F9FA 0%, transparent 100%)' }}
          aria-hidden="true"
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #F8F9FA 0%, transparent 100%)' }}
          aria-hidden="true"
        />

        {/* Track — two copies for seamless loop */}
        <div
          ref={trackRef}
          className="flex w-max py-3"
          style={{ willChange: 'transform' }}
          aria-live="off"
        >
          {reviews.map((r, i) => <ReviewCard key={`a-${i}`} review={r} />)}
          {reviews.map((r, i) => <ReviewCard key={`b-${i}`} review={r} />)}
        </div>
      </div>

      {/* Write a Review CTA */}
      <div className="flex justify-center mt-8 sm:mt-10">
        <a
          href="https://g.page/r/CedsqS_rsUYhEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2
            bg-[#0A0F1E] hover:bg-[#1a2035] text-white
            font-body font-semibold text-sm
            rounded-lg px-6 py-3
            shadow-[0_4px_14px_rgba(10,15,30,0.18)]
            hover:shadow-[0_6px_20px_rgba(10,15,30,0.25)]
            transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
          "
        >
          {/* Star icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B" aria-hidden="true">
            <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
          </svg>
          Write a Review on Google
        </a>
      </div>
    </section>
  )
}
