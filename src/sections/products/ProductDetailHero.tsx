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
    <section className="relative overflow-hidden w-full bg-[#0A0A0B] pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 md:pb-32 text-center">
      <HexGridBg isLight={false} />
      {breadcrumb && (
        <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 mb-5 text-left">
          {breadcrumb}
        </div>
      )}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        <div ref={labelRef} className="font-body font-medium text-xs sm:text-sm uppercase tracking-[0.1em] text-[#A6A6A6] mb-3 sm:mb-4 will-change-transform">
          {category}
        </div>
        <h1 ref={headingRef} className="font-heading font-bold text-2xl sm:text-3xl md:text-[3rem] lg:text-[3.5rem] text-white leading-[1.1] mb-4 sm:mb-6 will-change-transform">
          {name}
        </h1>
        <p ref={subtitleRef} className="font-body text-sm sm:text-base md:text-lg text-[#A6A6A6] max-w-2xl mx-auto will-change-transform">
          {tagline}
        </p>
      </div>
    </section>
  );
};

export default ProductDetailHero;
