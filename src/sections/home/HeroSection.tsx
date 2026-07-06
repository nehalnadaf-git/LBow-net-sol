'use client'

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PPRPipes3D from '../../components/PPRPipes3D';
import { DotMatrixBg } from '../../components/backgrounds/DotMatrixBg';
import { prefersReducedMotion } from '../../hooks/useScrollReveal';

// Register at module level so it is always available before useEffect runs
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  /* ── Hero section root ref (for ScrollTrigger) ─────────────────────── */
  const heroSectionRef = useRef<HTMLElement>(null);

  /* ── Mobile refs ───────────────────────────────────────────────────── */
  const mLabelRef    = useRef<HTMLDivElement>(null);
  const mLine1Ref    = useRef<HTMLDivElement>(null);
  const mLine2Ref    = useRef<HTMLDivElement>(null);
  const mLine3Ref    = useRef<HTMLDivElement>(null);
  const mSubtitleRef = useRef<HTMLParagraphElement>(null);
  const mCtaRef      = useRef<HTMLDivElement>(null);

  /* ── Tablet refs ───────────────────────────────────────────────────── */
  const tLabelRef    = useRef<HTMLDivElement>(null);
  const tLine1Ref    = useRef<HTMLDivElement>(null);
  const tLine2Ref    = useRef<HTMLDivElement>(null);
  const tLine3Ref    = useRef<HTMLDivElement>(null);
  const tSubtitleRef = useRef<HTMLParagraphElement>(null);
  const tCtaRef      = useRef<HTMLDivElement>(null);

  /* ── Desktop refs ──────────────────────────────────────────────────── */
  const dLabelRef    = useRef<HTMLDivElement>(null);
  const dLine1Ref    = useRef<HTMLDivElement>(null);
  const dLine2Ref    = useRef<HTMLDivElement>(null);
  const dLine3Ref    = useRef<HTMLDivElement>(null);
  const dSubtitleRef = useRef<HTMLParagraphElement>(null);
  const dCtaRef      = useRef<HTMLDivElement>(null);

  /* ── Scroll indicators ───────────────────────────────────────────────── */
  const scrollIndicatorRef        = useRef<HTMLDivElement>(null);
  const scrollIndicatorDesktopRef = useRef<HTMLDivElement>(null);

  /* ── Desktop divider (green rule between headline and subtitle) ───────── */
  const dDividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allEls = [
      mLabelRef.current, mLine1Ref.current, mLine2Ref.current,
      mLine3Ref.current, mSubtitleRef.current, mCtaRef.current,
      tLabelRef.current, tLine1Ref.current, tLine2Ref.current,
      tLine3Ref.current, tSubtitleRef.current, tCtaRef.current,
      dLabelRef.current, dLine1Ref.current, dLine2Ref.current,
      dLine3Ref.current, dSubtitleRef.current, dCtaRef.current,
      dDividerRef.current,
      scrollIndicatorRef.current, scrollIndicatorDesktopRef.current,
    ];

    // Grab all floating spec tags for intro reveal & scroll animations
    const specTags = gsap.utils.toArray('.floating-spec-tag');

    if (prefersReducedMotion()) {
      // Instantly reveal everything — no animation for reduced-motion users.
      // Without this, scroll indicators (opacity:0 inline) and all GSAP-controlled
      // elements stay invisible forever when the animation is skipped.
      gsap.set(allEls, { opacity: 1, y: 0, scale: 1 });
      // Restore divider to its design opacity (70%) rather than fully opaque
      gsap.set(dDividerRef.current, { opacity: 0.7 });
      gsap.set(specTags, { opacity: 1, scale: 1 });
      return;
    }

    gsap.set(allEls, { opacity: 0 });
    gsap.set(specTags, { opacity: 0, scale: 0.5 });
    gsap.set([
      mLabelRef.current, tLabelRef.current, dLabelRef.current,
      mSubtitleRef.current, tSubtitleRef.current, dSubtitleRef.current,
      mCtaRef.current, tCtaRef.current, dCtaRef.current,
    ], { y: 16 });
    gsap.set([scrollIndicatorRef.current, scrollIndicatorDesktopRef.current], { y: 16 });
    gsap.set([
      mLine1Ref.current, mLine2Ref.current, mLine3Ref.current,
      tLine1Ref.current, tLine2Ref.current, tLine3Ref.current,
      dLine1Ref.current, dLine2Ref.current, dLine3Ref.current,
    ], { y: 28 });

    const tl = gsap.timeline({ delay: 0.3 });

    tl
      .to([mLabelRef.current, tLabelRef.current, dLabelRef.current], { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
      .to([mLine1Ref.current, tLine1Ref.current, dLine1Ref.current], { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 0.2)
      .to([mLine2Ref.current, tLine2Ref.current, dLine2Ref.current], { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 0.3)
      .to([mLine3Ref.current, tLine3Ref.current, dLine3Ref.current], { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 0.4)
      // Divider fades in right after the last headline line, at its design opacity
      .to(dDividerRef.current, { opacity: 0.7, duration: 0.35, ease: 'power3.out' }, 0.5)
      .to([mSubtitleRef.current, tSubtitleRef.current, dSubtitleRef.current], { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out' }, 0.55)
      .to([mCtaRef.current, tCtaRef.current, dCtaRef.current], { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out' }, 0.65)
      .to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, 0.75)
      .to(scrollIndicatorDesktopRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, 0.75)
      .to(specTags, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: 0.12,
        ease: 'elastic.out(1.0, 0.7)'
      }, 0.5);

    // Fade and scroll tags upwards as hero scrolls away
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: 'top top',
        end: 'bottom 40%',
        scrub: true,
      }
    });
    scrollTl.to(specTags, {
      opacity: 0,
      y: -60,
      stagger: 0.05,
      ease: 'power1.in',
    });

    return () => { 
      tl.kill(); 
      scrollTl.kill();
    };
  }, []);

  return (
    <section
      ref={heroSectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#FAFAF9] via-[#FFFFFF] to-[#F5F5F4]"
      style={{ minHeight: '100svh' }}
    >
      {/* Background dot grid */}
      <DotMatrixBg isLight={true} />

      {/* ── Spotlights ──────────────────────────────────────────────────── */}
      {/* Desktop spotlight — behind pipes on the right */}
      <div
        className="hidden md:block absolute right-[8%] top-[8%] w-[700px] h-[700px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(46,125,50,0.16) 0%, rgba(21,101,192,0.10) 40%, rgba(66,165,245,0.04) 65%, transparent 100%)' }}
      />
      {/* Mobile/tablet spotlight — centered in upper area */}
      <div
        className="block md:hidden absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(46,125,50,0.16) 0%, rgba(21,101,192,0.09) 45%, transparent 70%)' }}
      />

      {/* 3D Pipes canvas — covers full section, z-index 0 */}
      <PPRPipes3D />

      {/* ── FLOATING SPEC TAGS ──────────────────────────────────────────── */}
      {/* Rendered at z-10 — behind text (z-20) but above the raw canvas (z-0) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="relative w-full h-full max-w-[1700px] mx-auto px-6 lg:px-16 xl:px-24">

          {/* ── Desktop Tags (md+) ─────────────────────────────────────── */}
          <div className="hidden md:block absolute top-[22%] left-[54%] badge-icon-float floating-spec-tag" style={{ animationDelay: '0s' }}>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A0A0B]/80 border border-white/10 backdrop-blur-md text-[#EEEEEE] font-body text-[11px] font-semibold shadow-lg whitespace-nowrap">
              <span>📏</span> 20mm–315mm Range
            </div>
          </div>
          <div className="hidden md:block absolute top-[15%] left-[78%] badge-icon-float floating-spec-tag" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2E7D32]/85 border border-[#2E7D32]/30 backdrop-blur-md text-white font-body text-[11px] font-semibold shadow-lg whitespace-nowrap">
              <span>✅</span> Food Grade Certified
            </div>
          </div>
          <div className="hidden md:block absolute top-[58%] left-[58%] badge-icon-float floating-spec-tag" style={{ animationDelay: '1.2s' }}>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1565C0]/85 border border-[#1565C0]/30 backdrop-blur-md text-white font-body text-[11px] font-semibold shadow-lg whitespace-nowrap">
              <span>🌡️</span> -5°C to +95°C
            </div>
          </div>
          <div className="hidden md:block absolute top-[52%] left-[76%] badge-icon-float floating-spec-tag" style={{ animationDelay: '1.8s' }}>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A0A0B]/80 border border-white/10 backdrop-blur-md text-[#EEEEEE] font-body text-[11px] font-semibold shadow-lg whitespace-nowrap">
              <span>⏳</span> 50-Year Life Span
            </div>
          </div>

          {/* ── Mobile Tags (<md) — positioned close to the 3D pipes organically ── */}
          {/* Tag 1: Upper-left (near green elbow) */}
          <div className="md:hidden absolute top-[15%] left-[12%] badge-icon-float floating-spec-tag" style={{ animationDelay: '0s' }}>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0A0A0B]/75 border border-white/10 backdrop-blur-sm text-white font-body text-[10px] font-semibold shadow-md whitespace-nowrap">
              <span>📏</span> 20mm–315mm
            </div>
          </div>
          {/* Tag 2: Upper-right (near top of pipes) */}
          <div className="md:hidden absolute top-[21%] right-[10%] badge-icon-float floating-spec-tag" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2E7D32]/85 border border-[#2E7D32]/25 backdrop-blur-sm text-white font-body text-[10px] font-semibold shadow-md whitespace-nowrap">
              <span>✅</span> Food Grade
            </div>
          </div>
          {/* Tag 3: Mid-left (near blue elbow) */}
          <div className="md:hidden absolute top-[30%] left-[16%] badge-icon-float floating-spec-tag" style={{ animationDelay: '1.2s' }}>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1565C0]/85 border border-[#1565C0]/25 backdrop-blur-sm text-white font-body text-[10px] font-semibold shadow-md whitespace-nowrap">
              <span>🌡️</span> -5°C to +95°C
            </div>
          </div>
          {/* Tag 4: Mid-right (near green pipe body) */}
          <div className="md:hidden absolute top-[38%] right-[12%] badge-icon-float floating-spec-tag" style={{ animationDelay: '1.8s' }}>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0A0A0B]/75 border border-white/10 backdrop-blur-sm text-white font-body text-[10px] font-semibold shadow-md whitespace-nowrap">
              <span>⏳</span> 50-Year Life
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT (<md) ─────────────────────────────────────────── */}
      {/*
        Full-height flex column. Content is pinned to the bottom half.
        The upper half is transparent — shows the 3D pipes clearly.
        Gradient starts at 45% from bottom to fully cover text area.
        pb uses safe-area-inset for iOS home bar compatibility.
      */}
      <div className="md:hidden absolute inset-0 z-20 flex flex-col justify-end">
        {/* Dark readability gradient — covers lower 65% of screen, softened */}
        <div
          className="absolute bottom-0 left-0 right-0 z-0"
          style={{
            height: '65%',
            background: 'linear-gradient(to top, rgba(10,11,13,0.72) 0%, rgba(10,11,13,0.38) 45%, transparent 100%)',
          }}
        />

        <div
          className="relative z-10 px-5 flex flex-col items-start"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 5rem)' }}
        >
          {/* Badge */}
          <div
            ref={mLabelRef}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/8 mb-4 shadow-sm"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E7D32] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E7D32]" />
            </span>
            <span className="font-body font-semibold text-[0.65rem] uppercase tracking-[0.12em] text-white/90">
              Trusted Pipe Solutions
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-bold text-white leading-[1.08] tracking-tight text-left">
            <div ref={mLine1Ref} className="text-[2rem] sm:text-[2.5rem]">Piping Solutions</div>
            <div ref={mLine2Ref} className="text-[2rem] sm:text-[2.5rem] mt-0.5">
              for <span className="font-editorial">Industrial</span>
            </div>
            <div ref={mLine3Ref} className="text-[2rem] sm:text-[2.5rem] mt-0.5">
              <span className="font-editorial">Applications</span>
            </div>
          </h1>

          {/* Subtitle */}
          <p ref={mSubtitleRef} className="font-body text-[0.82rem] sm:text-sm text-white/65 mt-3 leading-relaxed max-w-[320px]">
            Since 2018, delivering premium PPR pipes and fittings, PPCH, CPVC, PPH, UPVC for industries.
          </p>

          {/* CTAs */}
          <div ref={mCtaRef} className="flex flex-col sm:flex-row gap-2.5 mt-5 w-full">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-[#2E7D32] hover:bg-[#256428] text-white font-body font-semibold rounded-lg px-6 py-3.5 transition-all duration-300 active:scale-[0.97] text-sm shadow-[0_4px_20px_rgba(46,125,50,0.3)] w-full sm:w-auto"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/15 font-body font-semibold rounded-lg px-6 py-3.5 transition-all duration-300 active:scale-[0.97] text-sm backdrop-blur-sm w-full sm:w-auto"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>

      {/* ── TABLET LAYOUT (md–lg, 768px–1023px) ────────────────────────── */}
      {/*
        Tablet uses the same dark-overlay approach as mobile (pipes are
        centered and dominate, text anchors to the bottom-left).
        Slightly larger font than mobile, same safe-area padding.
      */}
      <div className="hidden md:flex lg:hidden absolute inset-0 z-20 flex-col justify-end">
        {/* Dark readability gradient — covers lower 60%, softened */}
        <div
          className="absolute bottom-0 left-0 right-0 z-0"
          style={{
            height: '60%',
            background: 'linear-gradient(to top, rgba(10,11,13,0.75) 0%, rgba(10,11,13,0.40) 50%, transparent 100%)',
          }}
        />

        <div
          className="relative z-10 px-8 flex flex-col items-start max-w-xl"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 5rem)' }}
        >
          {/* Badge */}
          <div
            ref={tLabelRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/8 mb-5 shadow-sm"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E7D32] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E7D32]" />
            </span>
            <span className="font-body font-semibold text-[0.68rem] uppercase tracking-[0.12em] text-white/90">
              Trusted Pipe Solutions
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-bold text-white leading-[1.07] tracking-tight text-left">
            <div ref={tLine1Ref} className="text-[2.6rem]">Piping Solutions</div>
            <div ref={tLine2Ref} className="text-[2.6rem] mt-0.5">
              for <span className="font-editorial">Industrial</span>
            </div>
            <div ref={tLine3Ref} className="text-[2.6rem] mt-0.5">
              <span className="font-editorial">Applications</span>
            </div>
          </h1>

          {/* Subtitle */}
          <p ref={tSubtitleRef} className="font-body text-sm text-white/65 mt-4 leading-relaxed max-w-sm">
            Since 2018, delivering premium PPR pipes and fittings, PPCH, CPVC, PPH, UPVC for industries.
          </p>

          {/* CTAs */}
          <div ref={tCtaRef} className="flex flex-row gap-3 mt-6">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-[#2E7D32] hover:bg-[#256428] text-white font-body font-semibold rounded-lg px-7 py-3.5 transition-all duration-300 active:scale-[0.98] text-sm shadow-[0_4px_20px_rgba(46,125,50,0.3)]"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/15 font-body font-semibold rounded-lg px-7 py-3.5 transition-all duration-300 active:scale-[0.98] text-sm backdrop-blur-sm"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (lg+, 1024px+) ──────────────────────────────── */}
      {/*
        Light background. Text on the left. Pipes rendered right by THREE.js camera.
        No gradient overlay needed — light bg naturally separates.
      */}
      <div className="hidden lg:flex absolute inset-0 pt-[72px] items-center z-20">
        <div className="w-full max-w-[1700px] mx-auto px-8 lg:px-16 xl:px-24">
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              ref={dLabelRef}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2E7D32]/15 bg-[#2E7D32]/6 mb-6 shadow-sm"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E7D32] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E7D32]" />
              </span>
              <span className="font-body font-semibold text-xs uppercase tracking-[0.12em] text-[#2E7D32]">
                Bangalore&apos;s Trusted Pipe Solution Provider
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-bold text-[#0A0A0B] leading-[1.07] tracking-tight text-left">
              <div ref={dLine1Ref} style={{ fontSize: 'clamp(3rem, 4.8vw, 5.5rem)' }}>
                <span className="metallic-shimmer-text">Piping Solutions</span>
              </div>
              <div ref={dLine2Ref} style={{ fontSize: 'clamp(3rem, 4.8vw, 5.5rem)' }}>
                for <span className="font-editorial text-[#0A0A0B]">Industrial</span>
              </div>
              <div ref={dLine3Ref} style={{ fontSize: 'clamp(3rem, 4.8vw, 5.5rem)' }}>
                <span className="font-editorial">Applications</span>
              </div>
            </h1>

            {/* Divider */}
            <div ref={dDividerRef} className="w-10 h-[2px] bg-[#2E7D32] my-5 rounded-full" />

            {/* Subtitle */}
            <p ref={dSubtitleRef} className="font-body text-base lg:text-lg text-[#434343] leading-relaxed max-w-md">
              Since 2018, delivering premium PPR pipes and fittings, PPCH, CPVC, PPH, UPVC for industries.
            </p>

            {/* CTAs */}
            <div ref={dCtaRef} className="flex flex-row gap-4 mt-8">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-[#0A0A0B] hover:bg-[#1a1a1b] text-[#EEEEEE] font-body font-semibold rounded-lg px-8 py-3.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-base shadow-[0_4px_14px_rgba(30,32,33,0.14)]"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-transparent border border-[#0A0A0B] text-[#0A0A0B] hover:bg-[#0A0A0B] hover:text-[#EEEEEE] font-body font-semibold rounded-lg px-8 py-3.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-base"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── SCROLL INDICATORS ───────────────────────────────────────────── */}
      {/* Mobile / Tablet scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="lg:hidden absolute z-30 flex flex-col items-center gap-1.5"
        style={{
          opacity: 0,
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.25rem)',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div className="flex flex-col items-center h-10">
          <div className="w-[1.5px] bg-gradient-to-b from-white/50 to-transparent scroll-line-anim" />
          <svg className="w-3.5 h-3.5 text-[#4ADE80] scroll-chevron-anim mt-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <span className="font-body text-[0.56rem] text-white/45 uppercase tracking-[0.2em] font-bold">Scroll to explore</span>
      </div>

      {/* Desktop scroll indicator */}
      <div
        ref={scrollIndicatorDesktopRef}
        className="hidden lg:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-1.5"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center h-14">
          <div className="w-[1.5px] bg-gradient-to-b from-[#2E7D32] to-transparent scroll-line-anim" />
          <svg className="w-4 h-4 text-[#2E7D32] scroll-chevron-anim mt-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <span className="font-body text-[0.62rem] text-[#434343]/60 uppercase tracking-[0.24em] font-bold">Scroll to explore</span>
      </div>
    </section>
  );
};

export default HeroSection;
