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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5!2d77.5210481!3d13.0461059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d9fc3dcf213%3A0xec0a5df81eedd4dd!2sLbow%20Network%20Solutions!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        width="100%"
        height="100%"
        className="relative z-10"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="LBow Network Solutions Location — T Dasarahalli, Bangalore"
      />
    </section>
  );
};

export default MapSection;
