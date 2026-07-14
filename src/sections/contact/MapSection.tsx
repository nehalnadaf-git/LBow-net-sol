'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotMatrixBg } from '../../components/backgrounds/DotMatrixBg';

gsap.registerPlugin(ScrollTrigger);

const MapSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.38,
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
    <section ref={sectionRef} className="relative overflow-hidden w-full h-[280px] sm:h-[360px] lg:h-[450px] bg-[#F0F4F8]">
      {/* Background */}
      <DotMatrixBg isLight={true} />

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4782.813797719785!2d77.5284327!3d13.036615099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d3b529b6b31%3A0x2146b1eb2fa96ce7!2sLBow%20Network%20Solutions!5e1!3m2!1sen!2sin!4v1784014577507!5m2!1sen!2sin"
        width="100%"
        height="100%"
        className="relative z-10"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="LBow Network Solutions Location — Peenya, Bengaluru"
      />
    </section>
  );
};

export default MapSection;
