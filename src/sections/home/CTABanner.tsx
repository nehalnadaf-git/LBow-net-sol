'use client'

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PipeFlowBg } from '../../components/backgrounds/PipeFlowBg';

/* CTABanner — no GSAP, no ScrollTrigger, no parallax, no glow orb.
   Entrance: one IntersectionObserver → CSS transition fires once. */
const CTABanner = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Reduced-motion: show immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      section.classList.add('cta-revealed');
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('cta-revealed');
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cta-section relative overflow-hidden w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-28"
    >
      <PipeFlowBg isLight={true} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <p className="cta-eyebrow font-body text-xs uppercase tracking-[0.2em] text-[#2E7D32] font-semibold mb-3 sm:mb-4">
          Let&apos;s Work Together
        </p>

        <h2 className="cta-heading font-heading font-semibold text-2xl sm:text-3xl md:text-[2.8rem] text-[#0A0A0B] max-w-3xl mx-auto mb-4 sm:mb-6 leading-[1.15]">
          Ready to Upgrade Your Piping Infrastructure?
        </h2>

        <p className="cta-subtext font-body text-sm sm:text-base md:text-lg text-[#434343] max-w-2xl mx-auto mb-8 sm:mb-10">
          Get a free consultation and quote for your industrial piping needs. We respond within 24 hours.
        </p>

        <div className="cta-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a
            href="tel:+919606419076"
            className="inline-flex items-center justify-center bg-[#2E7D32] text-white hover:bg-[#256428] font-body font-semibold rounded-md px-8 py-3.5 transition-colors duration-200 shadow-[0_4px_20px_rgba(46,125,50,0.28)] text-sm sm:text-base"
          >
            Call Us Now
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-transparent border-2 border-[#0A0A0B] text-[#0A0A0B] hover:bg-[#0A0A0B] hover:text-[#EEEEEE] font-body font-semibold rounded-md px-8 py-3.5 transition-colors duration-200 text-sm sm:text-base"
          >
            Send Enquiry
            <ArrowRight size={14} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
