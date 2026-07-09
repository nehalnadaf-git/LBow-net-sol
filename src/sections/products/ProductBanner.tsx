'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Truck, Phone } from 'lucide-react';
import { PipeCrossSectionBg } from '../../components/backgrounds/PipeCrossSectionBg';

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    icon: ShieldCheck,
    title: '10-Year Warranty',
    text: 'On all pipe products — manufacturer backed',
    color: '#2E7D32',
  },
  {
    icon: Truck,
    title: 'Free Demo Available',
    text: 'Call to schedule a no-obligation product demo',
    color: '#1565C0',
  },
  {
    icon: Phone,
    title: 'Direct Line',
    text: '+91 81235 01407 — Mon–Sat, 9am–6pm',
    color: '#2E7D32',
  },
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
        stagger: 0.08,
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
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#F8F9FA] py-10 sm:py-14 lg:py-16">
      <PipeCrossSectionBg isLight={true} />

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="banner-item flex items-start gap-4 bg-white rounded-2xl border border-[rgba(15,23,42,0.08)] p-5 sm:p-6 lg:p-7 shadow-sm"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${item.color}14` }}
                >
                  <Icon size={22} style={{ color: item.color }} />
                </div>
                <div>
                  <div className="font-heading font-bold text-sm sm:text-base text-[#0A0F1E] mb-1">
                    {item.title}
                  </div>
                  <div className="font-body text-xs sm:text-sm text-[#374151] leading-relaxed">
                    {item.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductBanner;
