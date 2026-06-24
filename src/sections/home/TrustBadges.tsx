'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Truck, Calendar, Phone } from 'lucide-react';
import { DotMatrixBg } from '../../components/backgrounds/DotMatrixBg';
import { PipeCrossSectionBg } from '../../components/backgrounds/PipeCrossSectionBg';

gsap.registerPlugin(ScrollTrigger);

const badges = [
  { icon: Shield, value: '10 Years', label: 'Product Warranty' },
  { icon: Truck, value: 'Free Delivery', label: 'Above ₹22,000 within 22km' },
  { icon: Calendar, value: 'Since 2018', label: 'Serving Bangalore Industries' },
  { icon: Phone, value: '+91 9606419076', label: 'Call or WhatsApp Now' },
];

const TrustBadges = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.badge-card');
    const line = section.querySelector('.divider-line');

    gsap.set(cards, { opacity: 0, y: 50 });

    if (line) gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
        toggleActions: 'play none none none',
      },
    });

    // Divider line swipes in first
    if (line) {
      tl.to(line, { scaleX: 1, duration: 0.6, ease: 'power3.out' }, 0);
    }

    // Cards stagger up
    tl.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      stagger: {
        amount: 0.55,
        ease: 'power2.inOut',
      },
      ease: 'power3.out',
    }, 0.1);

    // Parallax ambient float on icons
    section.querySelectorAll('.badge-icon').forEach((icon) => {
      gsap.to(icon, {
        y: -8,
        duration: 2 + Math.random() * 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: Math.random() * 1.5,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#0A0A0B] py-14 sm:py-16 lg:py-20">
      <DotMatrixBg isLight={false} />
      <PipeCrossSectionBg isLight={false} />

      {/* Subtle top divider line */}
      <div className="divider-line absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2E7D32]/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-6 lg:gap-8">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="badge-card group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1 will-change-transform"
              >
                {/* Icon Wrapper */}
                <div className="badge-icon w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/25 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-[#4ADE80]/50 transition-all duration-300 shadow-sm">
                  <Icon size={24} className="text-[#4ADE80]" />
                </div>

                {/* Stat/Highlight Value */}
                <div className="font-heading font-bold text-base sm:text-xl lg:text-2xl text-[#EEEEEE] mb-1.5 sm:mb-2 leading-tight">
                  {badge.value}
                </div>

                {/* Stat Subtitle */}
                <div className="font-body text-[0.65rem] sm:text-xs text-[#A6A6A6] uppercase tracking-[0.1em] leading-normal max-w-[180px]">
                  {badge.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
