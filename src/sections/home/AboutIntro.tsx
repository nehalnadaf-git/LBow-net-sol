'use client'

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { PipeTopologyBg } from '../../components/backgrounds/PipeTopologyBg';

gsap.registerPlugin(ScrollTrigger);

const AboutIntro = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const label     = section.querySelector('.about-label');
      const heading   = section.querySelector('.about-heading');
      const para1     = section.querySelector('.about-para-1');
      const para2     = section.querySelector('.about-para-2');
      const stats     = section.querySelectorAll('.about-stat');
      const cta       = section.querySelector('.about-cta');
      const imageWrap = section.querySelector('.about-image-wrap');
      const imageEl   = section.querySelector('.about-image');
      const decorator = section.querySelector('.about-decorator');

      // ── Initial hidden states ───────────────────────────────────────
      gsap.set([label, heading, para1, para2, cta], { opacity: 0 });
      gsap.set(label,   { x: -20, y: 6 });
      gsap.set(heading, { y: 40, clipPath: 'inset(0 0 100% 0)' });
      gsap.set([para1, para2], { y: 28, filter: 'blur(4px)' });
      gsap.set(cta,     { y: 16, x: -10 });
      gsap.set(stats,   { opacity: 0, y: 30, scale: 0.92 });
      gsap.set(imageWrap, { opacity: 0, x: 50 });
      if (decorator) gsap.set(decorator, { scaleY: 0, transformOrigin: 'top center' });

      // ── Main entrance timeline ───────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      if (decorator) {
        tl.to(decorator, { scaleY: 1, duration: 0.38, ease: 'power3.out' }, 0);
      }

      tl.to(label, {
        opacity: 1, x: 0, y: 0,
        duration: 0.38, ease: 'power3.out',
      }, 0.05)
      .to(heading, {
        opacity: 1, y: 0,
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.52, ease: 'power4.out',
      }, 0.12)
      .to(para1, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.42, ease: 'power3.out',
      }, 0.25)
      .to(para2, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.42, ease: 'power3.out',
      }, 0.33)
      .to(stats, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.42,
        stagger: 0.06,
        ease: 'back.out(1.6)',
      }, 0.38)
      .to(cta, {
        opacity: 1, y: 0, x: 0,
        duration: 0.38, ease: 'power3.out',
      }, 0.52)

      // Image slide-in
      .to(imageWrap, {
        opacity: 1, x: 0,
        duration: 0.65, ease: 'power3.out',
      }, 0.08);

      // ── Continuous scroll-linked parallax on image ──────────────────
      if (imageEl) {
        gsap.fromTo(imageEl,
          { yPercent: 4 },
          {
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.45,
            },
          }
        );
      }

      // ── Label parallax (drifts upward slightly faster) ───────────────
      if (label) {
        gsap.to(label, {
          y: -10,
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
      <PipeTopologyBg isLight={true} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 sm:gap-12 lg:gap-16 items-center">

          {/* Left Column */}
          <div>
            {/* Vertical decorator line */}
            <div className="about-decorator w-[2px] h-16 bg-gradient-to-b from-[#2E7D32] to-[#2E7D32]/0 mb-6 rounded-full" />

            <div className="about-label font-body font-medium text-sm uppercase tracking-[0.1em] text-[#434343] mb-4 will-change-transform">
              About LBow Network Solutions
            </div>
            <h2 className="about-heading font-heading font-semibold text-2xl sm:text-3xl md:text-[2.8rem] text-[#0A0A0B] leading-[1.15] mb-5 sm:mb-6 will-change-transform">
              Your Trusted Partner for Industrial Piping in Bangalore
            </h2>
            <p className="about-para-1 font-body text-base text-[#434343] leading-[1.7] mb-4 will-change-transform">
              Established in 2018, LBow Network Solutions has grown to become
              one of Bangalore&apos;s leading PPR pipe fitting dealers and
              industrial piping solution providers. From residential plumbing to
              large-scale industrial installations, we deliver quality,
              durability, and unmatched expertise to every project. Our
              commitment to customer satisfaction has helped us build a vast base
              of loyal clients across Bangalore.
            </p>
            <p className="about-para-2 font-body text-base text-[#434343] leading-[1.7] mb-8 will-change-transform">
              We specialize in PPR pipe unions, PPRC chemical pipes, PPCH pipe
              lines for industrial use, PPR pipe fittings, PPCH pipe fittings,
              cooling tower pipelines, and FRP lining in chiller pipe lines. Our
              products come with a 10-year warranty, and we offer free delivery
              on orders above ₹22,000 within a 22km radius.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 mt-6 sm:mt-8">
              {[
                { value: '8+', label: 'Years of Excellence' },
                { value: '1000+', label: 'Projects Completed' },
                { value: '50+', label: 'Industrial Clients' },
              ].map((stat, i) => (
                <div key={i} className="about-stat will-change-transform">
                  <div className="font-heading font-bold text-2xl">
                    <span className="metallic-shimmer-text">{stat.value}</span>
                  </div>
                  <div className="font-body text-sm text-[#434343]">{stat.label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="about-cta inline-flex items-center gap-2 mt-8 font-body font-semibold text-sm text-[#0A0A0B] hover:text-[#434343] hover:underline group will-change-transform"
            >
              Learn More About Us
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Column — Image */}
          <div
            className="about-image-wrap relative overflow-hidden rounded-xl shadow-2xl will-change-transform"
          >
            {/* Decorative green border accent */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-[#2E7D32]/20 z-10 pointer-events-none" />
            <div className="absolute -top-px -left-px -right-px -bottom-px rounded-xl shadow-[inset_0_0_60px_rgba(46,125,50,0.07)] z-10 pointer-events-none" />

            <div className="overflow-hidden rounded-xl">
              <img
                className="about-image w-full h-auto object-cover scale-[1.15] will-change-transform"
                src="/images/service-ppr-installation.webp"
                alt="Green PPR pipe installations in a Bangalore factory"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
