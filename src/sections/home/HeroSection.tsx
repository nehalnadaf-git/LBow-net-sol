'use client'

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PPRPipes3D from '../../components/PPRPipes3D';
import { DotMatrixBg } from '../../components/backgrounds/DotMatrixBg';
import { prefersReducedMotion } from '../../hooks/useScrollReveal';

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

  /* ── Desktop refs ──────────────────────────────────────────────────── */
  const dLabelRef    = useRef<HTMLDivElement>(null);
  const dLine1Ref    = useRef<HTMLDivElement>(null);
  const dLine2Ref    = useRef<HTMLDivElement>(null);
  const dLine3Ref    = useRef<HTMLDivElement>(null);
  const dSubtitleRef = useRef<HTMLParagraphElement>(null);
  const dCtaRef      = useRef<HTMLDivElement>(null);

  /* ── Scroll indicators ─────────────────────────────────────────────── */
  const scrollIndicatorRef        = useRef<HTMLDivElement>(null);
  const scrollIndicatorDesktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const allEls = [
      mLabelRef.current, mLine1Ref.current, mLine2Ref.current,
      mLine3Ref.current, mSubtitleRef.current, mCtaRef.current,
      dLabelRef.current, dLine1Ref.current, dLine2Ref.current,
      dLine3Ref.current, dSubtitleRef.current, dCtaRef.current,
      scrollIndicatorRef.current, scrollIndicatorDesktopRef.current,
    ];

    // Grab all floating spec tags for intro reveal & scroll animations
    const specTags = gsap.utils.toArray('.floating-spec-tag');

    gsap.set(allEls, { opacity: 0 });
    gsap.set(specTags, { opacity: 0, scale: 0.5 });
    gsap.set([mLabelRef.current, dLabelRef.current, mSubtitleRef.current, dSubtitleRef.current, mCtaRef.current, dCtaRef.current], { y: 16 });
    // Note: scroll indicators already have -translate-x-1/2 via Tailwind; no xPercent here
    gsap.set([scrollIndicatorRef.current, scrollIndicatorDesktopRef.current], { y: 16 });
    gsap.set([mLine1Ref.current, mLine2Ref.current, mLine3Ref.current, dLine1Ref.current, dLine2Ref.current, dLine3Ref.current], { y: 28 });

    const tl = gsap.timeline({ delay: 0.3 });

    tl
      .to([mLabelRef.current, dLabelRef.current], { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
      .to([mLine1Ref.current, dLine1Ref.current], { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 0.2)
      .to([mLine2Ref.current, dLine2Ref.current], { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 0.3)
      .to([mLine3Ref.current, dLine3Ref.current], { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 0.4)
      .to([mSubtitleRef.current, dSubtitleRef.current], { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out' }, 0.55)
      .to([mCtaRef.current, dCtaRef.current], { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out' }, 0.65)
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
        trigger: heroSectionRef.current,   // ← correct: only the hero section
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
    <section ref={heroSectionRef} className="relative w-full min-h-svh overflow-hidden bg-gradient-to-br from-[#FAFAF9] via-[#FFFFFF] to-[#F5F5F4]">
      {/* Background grid */}
      <DotMatrixBg isLight={true} />

      {/* Desktop spotlight */}
      <div
        className="hidden md:block absolute right-[8%] top-[8%] w-[700px] h-[700px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(46,125,50,0.16) 0%, rgba(21,101,192,0.10) 40%, rgba(66,165,245,0.04) 65%, transparent 100%)' }}
      />
      {/* Mobile spotlight */}
      <div
        className="block md:hidden absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[390px] h-[390px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(46,125,50,0.18) 0%, rgba(21,101,192,0.10) 45%, transparent 70%)' }}
      />

      {/* 3D Pipes — absolutely covers full section; THREE.js camera positions pipes to the right */}
      <PPRPipes3D />

      {/* ── MOBILE LAYOUT ─────────────────────────────────────────────── */}
      <div className="md:hidden absolute inset-0 z-20 flex flex-col justify-end">
        <div
          className="absolute bottom-0 left-0 right-0 h-[60%] z-0"
          style={{ background: 'linear-gradient(to top, rgba(10,11,13,0.92) 0%, rgba(10,11,13,0.5) 60%, transparent 100%)' }}
        />

        <div className="relative z-10 px-6 pt-6 pb-28 flex flex-col items-start">
          <div
            ref={mLabelRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 mb-5 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E7D32] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E7D32]" />
            </span>
            <span className="font-body font-semibold text-[0.68rem] uppercase tracking-[0.12em] text-white">
              Trusted Pipe Solutions
            </span>
          </div>

          <h1 className="font-heading font-bold text-white leading-[1.1] tracking-tight text-left">
            <div ref={mLine1Ref} className="text-[1.85rem] xs:text-[2.25rem] sm:text-5xl">Piping Solutions</div>
            <div ref={mLine2Ref} className="text-[1.85rem] xs:text-[2.25rem] sm:text-5xl mt-1">
              for <span className="font-editorial">Industrial</span>
            </div>
            <div ref={mLine3Ref} className="text-[1.85rem] xs:text-[2.25rem] sm:text-5xl mt-1">
              <span className="font-editorial">Applications</span>
            </div>
          </h1>

          <p ref={mSubtitleRef} className="font-body text-sm xs:text-base text-white/70 mt-4 leading-relaxed">
            Since 2018, delivering premium PPR pipes and fittings, PPCH, CPVC, PPH, UPVC for industries.
          </p>


          <div ref={mCtaRef} className="flex flex-col xs:flex-row gap-3 mt-7 w-full">
            <Link
              href="/products"
              className="w-full xs:w-auto inline-flex items-center justify-center bg-[#2E7D32] hover:bg-[#256428] text-white font-body font-semibold rounded-md px-8 py-3.5 transition-all duration-300 active:scale-[0.98] text-sm shadow-[0_4px_14px_rgba(46,125,50,0.2)]"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="w-full xs:w-auto inline-flex items-center justify-center bg-transparent border border-white/20 text-white hover:bg-white/5 font-body font-semibold rounded-md px-8 py-3.5 transition-all duration-300 active:scale-[0.98] text-sm"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ────────────────────────────────────────────── */}
      {/*
        The 3D canvas is position:absolute width:100% height:100% and THREE.js
        camera places the pipes visually to the right. The text is a simple
        left-aligned block — no grid needed. max-w-2xl keeps readable line length.
      */}
      <div className="hidden md:flex absolute inset-0 pt-[72px] items-center z-20">
        <div className="w-full max-w-[1700px] mx-auto px-6 lg:px-16 xl:px-24">
          <div className="max-w-2xl">
            {/* Badge */}
            <div
              ref={dLabelRef}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2E7D32]/10 bg-[#2E7D32]/5 mb-6 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E7D32] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E7D32]" />
              </span>
              <span className="font-body font-semibold text-xs uppercase tracking-[0.12em] text-[#2E7D32]">
                Bangalore&apos;s Trusted Pipe Solution Provider
              </span>
            </div>

            <h1 className="font-heading font-bold text-[#0A0A0B] leading-[1.08] tracking-tight text-left">
              <div ref={dLine1Ref} style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}>
                <span className="metallic-shimmer-text">Piping Solutions</span>
              </div>
              <div ref={dLine2Ref} style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}>
                for <span className="font-editorial text-[#0A0A0B]">Industrial</span>
              </div>
              <div ref={dLine3Ref} style={{ fontSize: 'clamp(3rem, 5vw, 5.5rem)' }}>
                <span className="font-editorial">Applications</span>
              </div>
            </h1>

            <div className="w-12 h-[2px] bg-[#2E7D32] my-5 rounded-full opacity-60" />

            <p ref={dSubtitleRef} className="font-body text-base lg:text-lg text-[#434343] leading-relaxed max-w-md">
              Since 2018, delivering premium PPR pipes and fittings, PPCH, CPVC, PPH, UPVC for industries.
            </p>

            <div ref={dCtaRef} className="flex flex-row gap-4 mt-8">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-[#0A0A0B] hover:bg-[#434343] text-[#EEEEEE] font-body font-semibold rounded-md px-8 py-3.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-base shadow-[0_4px_14px_rgba(30,32,33,0.12)]"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-transparent border border-[#0A0A0B] text-[#0A0A0B] hover:bg-[#0A0A0B] hover:text-[#EEEEEE] font-body font-semibold rounded-md px-8 py-3.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-base"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── FLOATING SPEC TAGS OVER THE 3D PIPES ───────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="relative w-full h-full max-w-[1700px] mx-auto px-6 lg:px-16 xl:px-24">
          
          {/* Desktop Floating Tags (only visible on md+) */}
          {/* Tag 1: Top-left of blue pipe */}
          <div className="hidden md:block absolute top-[22%] left-[54%] badge-icon-float floating-spec-tag" style={{ animationDelay: '0s' }}>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A0A0B]/80 border border-white/10 backdrop-blur-md text-[#EEEEEE] font-body text-[11px] font-semibold shadow-lg">
              <span>📏</span> 20mm–315mm Range
            </div>
          </div>

          {/* Tag 2: Top-right of green pipe */}
          <div className="hidden md:block absolute top-[15%] left-[78%] badge-icon-float floating-spec-tag" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2E7D32]/85 border border-[#2E7D32]/30 backdrop-blur-md text-white font-body text-[11px] font-semibold shadow-lg">
              <span>✅</span> Food Grade Certified
            </div>
          </div>

          {/* Tag 3: Mid-left (blue elbow) */}
          <div className="hidden md:block absolute top-[58%] left-[58%] badge-icon-float floating-spec-tag" style={{ animationDelay: '1.2s' }}>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1565C0]/85 border border-[#1565C0]/30 backdrop-blur-md text-white font-body text-[11px] font-semibold shadow-lg">
              <span>🌡️</span> -5°C to +95°C
            </div>
          </div>

          {/* Tag 4: Lower-right (green elbow) */}
          <div className="hidden md:block absolute top-[52%] left-[76%] badge-icon-float floating-spec-tag" style={{ animationDelay: '1.8s' }}>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A0A0B]/80 border border-white/10 backdrop-blur-md text-[#EEEEEE] font-body text-[11px] font-semibold shadow-lg">
              <span>⏳</span> 50-Year Life Span
            </div>
          </div>

          {/* Mobile Floating Tags (only visible on <md) */}
          {/* Alternating staggered layout (left, right, left, right) at different heights to prevent overlap */}
          {/* Tag 1: Upper-left */}
          <div className="md:hidden absolute top-[12%] left-[18%] badge-icon-float floating-spec-tag" style={{ animationDelay: '0s' }}>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0A0A0B]/70 border border-white/10 backdrop-blur-sm text-white font-body text-[9px] font-medium shadow-md">
              <span>📏</span> 20mm–315mm
            </div>
          </div>

          {/* Tag 2: Upper-right */}
          <div className="md:hidden absolute top-[22%] right-[4%] badge-icon-float floating-spec-tag" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2E7D32]/80 border border-[#2E7D32]/25 backdrop-blur-sm text-white font-body text-[9px] font-medium shadow-md">
              <span>✅</span> Food Grade
            </div>
          </div>

          {/* Tag 3: Mid-left */}
          <div className="md:hidden absolute top-[32%] left-[14%] badge-icon-float floating-spec-tag" style={{ animationDelay: '1.2s' }}>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1565C0]/85 border border-[#1565C0]/25 backdrop-blur-sm text-white font-body text-[9px] font-medium shadow-md">
              <span>🌡️</span> -5°C to +95°C
            </div>
          </div>

          {/* Tag 4: Mid-right */}
          <div className="md:hidden absolute top-[42%] right-[4%] badge-icon-float floating-spec-tag" style={{ animationDelay: '1.8s' }}>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0A0A0B]/70 border border-white/10 backdrop-blur-sm text-white font-body text-[9px] font-medium shadow-md">
              <span>⏳</span> 50-Year Life
            </div>
          </div>


        </div>
      </div>

      {/* Scroll indicator — mobile */}
      <div
        ref={scrollIndicatorRef}
        className="flex md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-1.5 opacity-0"
      >
        <div className="flex flex-col items-center h-12">
          <div className="w-[1.5px] bg-gradient-to-b from-white/60 to-transparent scroll-line-anim" />
          <svg className="w-4 h-4 text-[#4ADE80] scroll-chevron-anim mt-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <span className="font-body text-[0.58rem] text-white/50 uppercase tracking-[0.2em] font-bold">Scroll to explore</span>
      </div>

      {/* Scroll indicator — desktop */}
      <div
        ref={scrollIndicatorDesktopRef}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-1.5 opacity-0"
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
