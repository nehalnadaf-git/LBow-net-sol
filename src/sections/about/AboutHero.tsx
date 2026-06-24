'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PipeTopologyBg } from '../../components/backgrounds/PipeTopologyBg';

const AboutHero = () => {
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: 'power3.out' })
      .to(headingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.5)
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.8);

    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative overflow-hidden w-full bg-[#0A0A0B] pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 md:pb-32 text-center">
      {/* Premium Background Graphics */}
      <PipeTopologyBg isLight={false} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <div ref={labelRef} className="font-body font-medium text-xs sm:text-sm uppercase tracking-[0.1em] text-[#A6A6A6] mb-3 sm:mb-4 opacity-0 translate-y-4">
          About Us
        </div>
        <h1 ref={headingRef} className="font-heading font-bold text-2xl sm:text-3xl md:text-[3rem] lg:text-[3.5rem] text-white leading-[1.1] mb-4 sm:mb-6 opacity-0 translate-y-8">
          Building Bangalore&apos;s Infrastructure, One Pipe at a Time
        </h1>
        <p ref={subtitleRef} className="font-body text-sm sm:text-base md:text-lg text-[#A6A6A6] max-w-2xl mx-auto opacity-0 translate-y-5">
          Since 2018, LBow Network Solutions has been the trusted name in industrial piping solutions across Bangalore.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
