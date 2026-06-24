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
    const tl = gsap.timeline();

    tl.to(labelRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: 0.5,
    })
      .to(
        line1Ref.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.7
      )
      .to(
        line2Ref.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.85
      )
      .to(
        line3Ref.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        1.0
      )
      .to(
        subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        1.2
      )
      .to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        1.4
      )
      .to(
        scrollIndicatorRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        1.55
      )
      .to(
        scrollIndicatorDesktopRef.current,
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        1.55
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#FAFAF9] via-[#FFFFFF] to-[#F5F5F4]">
      {/* Subtle Background engineering grid */}
      <DotMatrixBg isLight={true} />

      {/* Premium Backlight Mesh Glow behind 3D Pipes (Vibrant green blending) */}
      {/* Desktop Spotlight */}
      <div className="hidden md:block absolute right-[8%] top-[8%] w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#2E7D32]/40 via-[#4ADE80]/30 to-[#A5D6A7]/20 blur-[120px] pointer-events-none z-0" />
      {/* Mobile Spotlight */}
      <div className="block md:hidden absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 w-[390px] h-[390px] rounded-full bg-gradient-to-br from-[#2E7D32]/45 via-[#4ADE80]/35 to-[#A5D6A7]/25 blur-[75px] pointer-events-none z-0" />

      {/* 3D Background */}
      <PPRPipes3D />

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full flex flex-col items-start md:absolute md:top-1/2 md:-translate-y-1/2 md:left-[8%] md:bottom-auto md:right-auto md:w-auto md:max-w-xl md:mx-0">
        {/* Full-bleed bottom gradient blur overlay (Mobile only, no borders or margins) */}
        <div className="w-full relative px-6 pb-12 pt-20 md:p-0 md:bg-transparent md:border-none md:rounded-none md:shadow-none flex flex-col items-start bg-transparent overflow-hidden">
          
          {/* Progressive Multi-Layer Gradient Blur (Mobile only, edge-to-edge) */}
          {/* Layer 1: Base blur layer (covers entire block, fades to transparent at top) */}
          <div 
            className="absolute inset-0 z-0 bg-[#0A0B0D]/30 backdrop-blur-[6px] md:hidden"
            style={{
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
            }}
          />
          {/* Layer 2: Intermediate blur layer (covers bottom 75%) */}
          <div 
            className="absolute inset-0 z-0 bg-[#0A0B0D]/20 backdrop-blur-[12px] md:hidden"
            style={{
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 75%)'
            }}
          />
          {/* Layer 3: Intense bottom frosted glass blur layer (covers bottom 45%) */}
          <div 
            className="absolute inset-0 z-0 bg-white/10 backdrop-blur-[24px] md:hidden"
            style={{
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 45%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 45%)'
            }}
          />

          {/* Interactive Card Content (sits above backdrop) */}
          <div className="relative z-10 w-full flex flex-col items-start">
            
            {/* Typographic Capsule Badge with live pulsing indicator */}
            <div
              ref={labelRef}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-white mb-6 opacity-0 translate-y-5 shadow-sm md:border-[#2E7D32]/10 md:bg-[#2E7D32]/5 md:text-[#2E7D32]"
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
              <div ref={line1Ref} className="text-[1.85rem] xs:text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] opacity-0 translate-y-10">
                <span className="text-white md:hidden">Piping Solutions</span>
                <span className="hidden md:inline-block"><span className="metallic-shimmer-text">Piping Solutions</span></span>
              </div>
              <div ref={line2Ref} className="text-[1.85rem] xs:text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] opacity-0 translate-y-10 mt-1 md:mt-0">
                for All <span className="font-editorial text-white md:text-[#0A0A0B]">Industrial</span>
              </div>
              <div ref={line3Ref} className="text-[1.85rem] xs:text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] opacity-0 translate-y-10 mt-1 md:mt-0">
                <span className="font-editorial">Applications</span>
              </div>
            </h1>

            {/* Technical divider line */}
            <div className="w-12 h-[2px] bg-[#2E7D32] my-5 rounded-full opacity-60 hidden md:block" />

            <p
              ref={subtitleRef}
              className="font-body text-sm xs:text-base md:text-lg text-white/70 md:text-[#434343] max-w-[540px] mt-4 md:mt-1 text-left mx-0 opacity-0 translate-y-5 leading-relaxed"
            >
              Since 2018, delivering premium PPR pipe fittings, PPCH pipelines, and
              cooling tower systems across Bangalore.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-xs sm:max-w-none mx-0 opacity-0 translate-y-5"
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

            {/* Scroll to explore indicator — mobile only (desktop version is centered at section bottom) */}
            <div
              ref={scrollIndicatorRef}
              className="flex flex-col items-start gap-2 mt-8 w-full opacity-0 translate-y-5 md:hidden"
            >
              <div className="flex flex-col items-start gap-2 pl-2">
                <div className="w-px h-8 bg-white/20 relative overflow-hidden">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] absolute left-1/2 -translate-x-1/2 scroll-indicator-dot" />
                </div>
                <span className="font-body text-[0.7rem] text-white/50 uppercase tracking-wide">
                  Scroll to explore
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll to explore — desktop only, centered at section bottom */}
      <div
        ref={scrollIndicatorDesktopRef}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 opacity-0 translate-y-5"
      >
        <div className="w-px h-10 bg-[#434343]/30 relative overflow-hidden">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2E7D32] absolute left-1/2 -translate-x-1/2 scroll-indicator-dot" />
        </div>
        <span className="font-body text-[0.68rem] text-[#434343]/70 uppercase tracking-widest">
          Scroll to explore
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
