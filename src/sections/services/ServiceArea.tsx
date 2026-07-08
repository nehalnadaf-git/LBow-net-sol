'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotMatrixBg } from '../../components/backgrounds/DotMatrixBg';

gsap.registerPlugin(ScrollTrigger);

const areas = [
  'T Dasarahalli',
  'Peenya',
  'Nelamangala',
  'Hesaraghatta',
  'Yeshwanthpur',
  'Rajajinagar',
  'Vijayanagar',
  'Magadi Road',
  'Koramangala',
  'Electronic City',
  'Whitefield',
  'Hosur Road',
];

const ServiceArea = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mapEl = section.querySelector('.map-placeholder');
    const pills = section.querySelectorAll('.area-pill');

    gsap.fromTo(
      mapEl,
      { opacity: 0, scale: 0.97 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.42,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      pills,
      { opacity: 0, scale: 0.93 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        stagger: 0.04,
        delay: 0.12,
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
    <section ref={sectionRef} className="relative overflow-hidden w-full py-16 sm:py-20 lg:py-28" style={{ background: 'linear-gradient(180deg, #0D1118 0%, #0F1520 50%, #0D1118 100%)' }}>
      {/* Premium Background Graphics */}
      <DotMatrixBg isLight={false} />

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="font-body font-medium text-xs sm:text-sm uppercase tracking-[0.1em] text-[#A6A6A6] mb-3 sm:mb-4">
            Service Area
          </div>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-[2.5rem] text-[#EEEEEE] mb-4 sm:mb-6">
            Serving Across India
          </h2>
          <p className="font-body text-sm sm:text-base text-[#A6A6A6] max-w-2xl mx-auto">
            Based in T Dasarahalli, Bangalore — we supply and install across India. Free demo available on request.
          </p>
        </div>

        {/* Map Embed */}
        <div className="map-placeholder w-full h-[280px] sm:h-[360px] lg:h-[420px] rounded-xl overflow-hidden border border-white/5">
          <iframe
            title="LBow Network Solutions — T Dasarahalli, Bangalore"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0665828826434!2d77.5184732!3d13.0461059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d9fc3dcf213%3A0xec0a5df81eedd4dd!2sLBow%20Network%20Solutions!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Service Areas */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-6 sm:mt-8">
          {areas.map((area, index) => (
            <span
              key={index}
              className="area-pill bg-[#121315] rounded-full px-4 sm:px-5 py-1.5 sm:py-2 border border-white/5 font-body text-xs sm:text-sm text-[#EEEEEE]"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
