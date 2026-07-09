'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HexGridBg } from '../../components/backgrounds/HexGridBg';
import { prefersReducedMotion } from '../../hooks/useScrollReveal';

interface ProductDetailHeroProps {
  category: string;
  name: string;
  tagline: string;
  breadcrumb?: React.ReactNode;
}

const ProductDetailHero = ({ category, name, tagline, breadcrumb }: ProductDetailHeroProps) => {
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
      className="relative overflow-hidden w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-10 sm:pb-14 md:pb-16 text-center"
      style={{ background: 'linear-gradient(160deg, #F0F7F1 0%, #FAFFFE 35%, #EDF4FF 70%, #F4FBF5 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none" style={{ background: 'linear-gradient(90deg, #2E7D32 0%, #1565C0 100%)' }} />
      <HexGridBg isLight={true} />

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Breadcrumb — always left-aligned */}
        {breadcrumb && (
          <div className="text-left mb-7 sm:mb-8">
            {breadcrumb}
          </div>
        )}

        {/* Hero content — centered */}
        <div className="max-w-3xl lg:max-w-4xl mx-auto">
          <div
            ref={labelRef}
            className="inline-flex items-center gap-2 bg-[rgba(46,125,50,0.08)] text-[#2E7D32] rounded-full px-4 py-1.5 font-body font-semibold text-xs uppercase tracking-[0.08em] mb-5 will-change-transform"
          >
            {category}
          </div>
          <h1
            ref={headingRef}
            className="font-heading font-bold text-3xl sm:text-4xl md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] leading-[1.08] mb-5 sm:mb-6 will-change-transform"
            style={{ background: 'linear-gradient(90deg, #2E7D32 0%, #1565C0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            {name}
          </h1>
          <p
            ref={subtitleRef}
            className="font-body text-base sm:text-lg lg:text-xl max-w-2xl mx-auto will-change-transform leading-relaxed"
            style={{ color: '#374151' }}
          >
            {tagline}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailHero;
