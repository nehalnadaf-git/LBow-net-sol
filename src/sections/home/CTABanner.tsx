'use client'

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { PipeFlowBg } from '../../components/backgrounds/PipeFlowBg';

gsap.registerPlugin(ScrollTrigger);

const CTABanner = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const eyebrow  = section.querySelector('.cta-eyebrow');
      const heading  = section.querySelector('.cta-heading');
      const subtext  = section.querySelector('.cta-subtext');
      const buttons  = section.querySelector('.cta-buttons');
      const glowOrb  = section.querySelector('.cta-glow');

      // Initial hidden states
      gsap.set([eyebrow, subtext, buttons], { opacity: 0, y: 24 });
      gsap.set(heading, {
        opacity: 0, y: 50,
        clipPath: 'inset(0 0 100% 0)',
      });
      if (glowOrb) gsap.set(glowOrb, { scale: 0.4, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      // Glow orb blooms first
      if (glowOrb) {
        tl.to(glowOrb, {
          scale: 1, opacity: 1,
          duration: 0.52, ease: 'power2.out',
        }, 0);
      }

      tl.to(eyebrow, {
        opacity: 1, y: 0,
        duration: 0.38, ease: 'power3.out',
      }, 0.05)
      .to(heading, {
        opacity: 1, y: 0,
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.52, ease: 'power4.out',
      }, 0.12)
      .to(subtext, {
        opacity: 1, y: 0,
        duration: 0.38, ease: 'power3.out',
      }, 0.28)
      .to(buttons, {
        opacity: 1, y: 0,
        duration: 0.38, ease: 'back.out(1.6)',
      }, 0.38);

      // Heading subtle parallax drift
      gsap.to(heading, {
        y: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.45,
        },
      });

      // Glow orb parallax
      if (glowOrb) {
        gsap.to(glowOrb, {
          y: -28,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.45,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-28">
      <PipeFlowBg isLight={true} />

      {/* Glow orb */}
      <div className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-[#2E7D32]/8 blur-[100px] pointer-events-none will-change-transform" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <p className="cta-eyebrow font-body text-xs uppercase tracking-[0.2em] text-[#2E7D32] font-semibold mb-3 sm:mb-4 will-change-transform">
          Let&apos;s Work Together
        </p>

        <h2 className="cta-heading font-heading font-semibold text-2xl sm:text-3xl md:text-[2.8rem] text-[#0A0A0B] max-w-3xl mx-auto mb-4 sm:mb-6 leading-[1.15] will-change-transform">
          Ready to Upgrade Your Piping Infrastructure?
        </h2>
        <p className="cta-subtext font-body text-sm sm:text-base md:text-lg text-[#434343] max-w-2xl mx-auto mb-8 sm:mb-10 will-change-transform">
          Get a free consultation and quote for your industrial piping needs. We
          respond within 24 hours.
        </p>

        <div className="cta-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center will-change-transform">
          <a
            href="tel:+919606419076"
            className="inline-flex items-center justify-center bg-[#2E7D32] text-white hover:bg-[#256428] font-body font-semibold rounded-md px-8 py-3.5 transition-all duration-300 shadow-[0_4px_20px_rgba(46,125,50,0.28)] hover:shadow-[0_6px_28px_rgba(46,125,50,0.4)] hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
          >
            Call Us Now
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-transparent border-2 border-[#0A0A0B] text-[#0A0A0B] hover:bg-[#0A0A0B] hover:text-[#EEEEEE] font-body font-semibold rounded-md px-8 py-3.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
          >
            Send Enquiry
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
