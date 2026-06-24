'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PipeCrossSectionBg } from '../../components/backgrounds/PipeCrossSectionBg';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  'PPR Pipe Fitting Dealers',
  'Pipe Dealers',
  'Pipe Manufacturers',
  'Brass Ball Valve Dealers',
  'Plastic Product Manufacturers',
  'Rubber Product Manufacturers',
  'Industrial Machinery Manufacturers',
  'Building Material Manufacturers',
  'Building Material Wholesalers',
  'Air Compressor Pipe Line Installation Services',
  'Cooling Tower Pipeline Services',
  'FRP Lining Services',
];

const Categories = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const pills = section.querySelectorAll('.category-pill');

    gsap.fromTo(
      pills,
      { opacity: 0, scale: 0.93 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        stagger: 0.03,
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
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-28">
      {/* Premium Background Graphics */}
      <PipeCrossSectionBg isLight={true} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="font-body font-medium text-xs sm:text-sm uppercase tracking-[0.1em] text-[#434343] mb-3 sm:mb-4">
            What We Deal In
          </div>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-[2.5rem] text-[#0A0A0B]">
            Our Product Categories
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-pill bg-white rounded-lg px-6 py-3 border border-[rgba(10,10,11,0.15)] font-body font-medium text-sm text-[#0A0A0B] text-center transition-all duration-300 hover:border-[#0A0A0B] hover:bg-[#0A0A0B] hover:text-[#EEEEEE] hover:-translate-y-0.5 cursor-default"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
