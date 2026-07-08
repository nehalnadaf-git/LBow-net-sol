'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PipeTopologyBg } from '../../components/backgrounds/PipeTopologyBg';
import { prefersReducedMotion } from '../../hooks/useScrollReveal';

const AboutHero = () => {
  const labelRef    = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.set([labelRef.current, headingRef.current, subtitleRef.current], { opacity: 0 });
    gsap.set(labelRef.current,    { y: 14 });
    gsap.set(headingRef.current,  { y: 22 });
    gsap.set(subtitleRef.current, { y: 16 });

    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(labelRef.current,    { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out' })
      .to(headingRef.current,  { opacity: 1, y: 0, duration: 0.45, ease: 'power4.out' }, 0.1)
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out' }, 0.22);

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      className="relative overflow-hidden w-full pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 text-center"
      style={{ background: 'linear-gradient(160deg, #F0F7F1 0%, #FAFFFE 35%, #EDF4FF 70%, #F4FBF5 100%)' }}
    >
      {/* Thin green→blue accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none" style={{ background: 'linear-gradient(90deg, #2E7D32 0%, #1565C0 100%)' }} />
      {/* Background graphic — light mode */}
      <PipeTopologyBg isLight={true} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        <div ref={labelRef} className="font-body font-medium text-xs sm:text-sm uppercase tracking-[0.1em] mb-3 sm:mb-4 will-change-transform" style={{ color: '#2E7D32' }}>
          About Us
        </div>
        <h1 ref={headingRef} className="font-heading font-bold text-2xl sm:text-3xl md:text-[3rem] lg:text-[3.5rem] leading-[1.1] mb-4 sm:mb-6 will-change-transform" style={{ background: 'linear-gradient(90deg, #2E7D32 0%, #1565C0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Trusted Industrial Piping Partner Since 2018
        </h1>
        <p ref={subtitleRef} className="font-body text-sm sm:text-base md:text-lg max-w-2xl mx-auto will-change-transform" style={{ color: '#3D5040' }}>
          Delivering premium PPR pipes and fittings, PPCH, CPVC, PPH, and UPVC pipeline systems for industries across India.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
