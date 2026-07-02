'use client'

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import PPRPipes3D from '../../components/PPRPipes3D';
import { DotMatrixBg } from '../../components/backgrounds/DotMatrixBg';

const HeroSection = () => {
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorDesktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial states via GSAP (owns the transform stack, prevents CSS conflict)
    gsap.set([
      labelRef.current,
      line1Ref.current,
      line2Ref.current,
      line3Ref.current,
      subtitleRef.current,
      ctaRef.current,
      scrollIndicatorRef.current,
      scrollIndicatorDesktopRef.current,
    ], { opacity: 0 });
    gsap.set([labelRef.current, subtitleRef.current, ctaRef.current], { y: 16 });
    gsap.set([scrollIndicatorRef.current, scrollIndicatorDesktopRef.current], { y: 16, xPercent: -50 });
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], { y: 28 });

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(labelRef.current, {
      opacity: 1, y: 0,
      duration: 0.4,
      ease: 'power3.out',
    })
      .to(
        line1Ref.current,
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
        0.2
      )
      .to(
        line2Ref.current,
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
        0.3
      )
      .to(
        line3Ref.current,
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
        0.4
      )
      .to(
        subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out' },
        0.55
      )
      .to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out' },
        0.65
      )
      .to(
        scrollIndicatorRef.current,
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' },
        0.75
      )
      .to(
        scrollIndicatorDesktopRef.current,
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' },
        0.75
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#FAFAF9] via-[#FFFFFF] to-[#F5F5F4]">
      {/* Subtle Background engineering grid */}
      <DotMatrixBg isLight={true} />

      {/* Backlight glow behind 3D Pipes — plain CSS radial-gradient, zero GPU filter cost */}
      {/* Desktop Spotlight */}
      <div className="hidden md:block absolute right-[8%] top-[8%] w-[700px] h-[700px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(46,125,50,0.18) 0%, rgba(74,222,128,0.10) 35%, rgba(165,214,167,0.04) 65%, transparent 100%)' }}
      />
      {/* Mobile Spotlight */}
      <div className="block md:hidden absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 w-[390px] h-[390px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(46,125,50,0.20) 0%, rgba(74,222,128,0.10) 40%, transparent 70%)' }}
      />

      {/* 3D Background */}
      <PPRPipes3D />

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full flex flex-col items-start md:absolute md:top-1/2 md:-translate-y-1/2 md:left-[8%] md:bottom-auto md:right-auto md:w-auto md:max-w-xl md:mx-0">
        {/* Full-bleed bottom gradient overlay with larger bottom padding to clear the scroll indicator */}
        <div className="w-full relative px-6 pb-28 pt-20 md:p-0 md:bg-transparent md:border-none md:rounded-none md:shadow-none flex flex-col items-start bg-transparent overflow-hidden">
          
          {/* Single solid gradient overlay — replaces 3 stacked backdrop-blur layers. */}
          <div
            className="absolute inset-0 z-0 md:hidden"
            style={{
              background: 'linear-gradient(to top, rgba(10,11,13,0.85) 0%, rgba(10,11,13,0.50) 60%, rgba(10,11,13,0.0) 100%)'
            }}
          />

          {/* Interactive Card Content (sits above backdrop) */}
          <div className="relative z-10 w-full flex flex-col items-start">
            
            {/* Typographic Capsule Badge with live pulsing indicator */}
            <div
              ref={labelRef}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-white mb-6 shadow-sm md:border-[#2E7D32]/10 md:bg-[#2E7D32]/5 md:text-[#2E7D32]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E7D32] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E7D32]"></span>
              </span>
              <span className="font-body font-semibold text-[0.68rem] xs:text-xs uppercase tracking-[0.12em] text-white md:text-[#2E7D32]">
                <span className="inline sm:hidden">Trusted Pipe Solutions</span>
                <span className="hidden sm:inline">Bangalore&apos;s Trusted Pipe Solution Provider</span>
              </span>
            </div>

            <h1 className="font-heading font-bold text-white md:text-[#0A0A0B] leading-[1.1] tracking-tight text-left">
              <div ref={line1Ref} className="text-[1.85rem] xs:text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[5.5rem]">
                <span className="text-white md:hidden">Piping Solutions</span>
                <span className="hidden md:inline-block"><span className="metallic-shimmer-text">Piping Solutions</span></span>
              </div>
              <div ref={line2Ref} className="text-[1.85rem] xs:text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] mt-1 md:mt-0">
                for <span className="font-editorial text-white md:text-[#0A0A0B]">Industrial</span>
              </div>
              <div ref={line3Ref} className="text-[1.85rem] xs:text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] mt-1 md:mt-0">
                <span className="font-editorial">Applications</span>
              </div>
            </h1>

            {/* Technical divider line */}
            <div className="w-12 h-[2px] bg-[#2E7D32] my-5 rounded-full opacity-60 hidden md:block" />

            <p
              ref={subtitleRef}
              className="font-body text-sm xs:text-base md:text-lg text-white/70 md:text-[#434343] max-w-[540px] mt-4 md:mt-1 text-left mx-0 leading-relaxed"
            >
              Since 2018, delivering premium PPR pipe fittings, PPCH pipelines, and
              cooling tower systems across Bangalore.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-xs sm:max-w-none mx-0"
            >
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#2E7D32] hover:bg-[#256428] text-white font-body font-semibold rounded-md px-8 py-3.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base shadow-[0_4px_14px_rgba(46,125,50,0.2)] hover:shadow-lg md:bg-[#0A0A0B] md:hover:bg-[#434343] md:shadow-[0_4px_14px_rgba(30,32,33,0.12)]"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent border border-white/20 text-white hover:bg-white/5 font-body font-semibold rounded-md px-8 py-3.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm md:text-base md:border-[#0A0A0B] md:text-[#0A0A0B] md:hover:bg-[#0A0A0B] md:hover:text-[#EEEEEE]"
              >
                Get a Free Quote
              </Link>
            </div>
            {/* Scroll indicator spacer for mobile alignment */}
            <div className="h-4 md:hidden" />

          </div>
        </div>
      </div>

      {/* Scroll to explore — mobile only, centered at section bottom */}
      <div
        ref={scrollIndicatorRef}
        className="flex md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1.5 opacity-0"
      >
        <div className="flex flex-col items-center h-12">
          <div className="w-[1.5px] bg-gradient-to-b from-white/60 to-transparent scroll-line-anim" />
          <svg
            className="w-4 h-4 text-[#4ADE80] scroll-chevron-anim mt-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <span className="font-body text-[0.58rem] text-white/50 uppercase tracking-[0.2em] font-bold">
          Scroll to explore
        </span>
      </div>

      {/* Scroll to explore — desktop only, centered at section bottom */}
      <div
        ref={scrollIndicatorDesktopRef}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1.5 opacity-0"
      >
        <div className="flex flex-col items-center h-14">
          <div className="w-[1.5px] bg-gradient-to-b from-[#2E7D32] to-transparent scroll-line-anim" />
          <svg
            className="w-4 h-4 text-[#2E7D32] scroll-chevron-anim mt-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <span className="font-body text-[0.62rem] text-[#434343]/60 uppercase tracking-[0.24em] font-bold">
          Scroll to explore
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
