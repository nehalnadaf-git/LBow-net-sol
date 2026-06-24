'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Truck, Phone } from 'lucide-react';
import { PipeCrossSectionBg } from '../../components/backgrounds/PipeCrossSectionBg';

gsap.registerPlugin(ScrollTrigger);

const items = [
  { icon: ShieldCheck, text: '10 Year Warranty on All Products' },
  { icon: Truck, text: 'Free Delivery Above ₹22,000 within 22km' },
  { icon: Phone, text: 'Call: +91 9606419076' },
];

const ProductBanner = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll('.banner-item');

    gsap.fromTo(
      elements,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.38,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#FAFAF9] py-10 sm:py-14 lg:py-16">
      {/* Premium Background Graphics */}
      <PipeCrossSectionBg isLight={true} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row flex-wrap gap-5 sm:gap-8 md:gap-12 justify-center items-center">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="banner-item flex items-center gap-3"
              >
                <Icon size={28} className="text-[#0A0A0B] flex-shrink-0 sm:w-8 sm:h-8" />
                <span className="font-body font-semibold text-sm md:text-base text-[#0A0A0B]">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductBanner;
