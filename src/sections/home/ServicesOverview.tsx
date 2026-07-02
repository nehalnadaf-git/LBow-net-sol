'use client'

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wrench, Factory, Wind, Droplets, Shield, Settings, ArrowRight } from 'lucide-react';
import { PipeFlowBg } from '../../components/backgrounds/PipeFlowBg';
import { useScrollReveal, REVEAL_TRIGGER_DEFAULTS, PARALLAX_TRIGGER_DEFAULTS } from '../../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

/* ─── Service data ─── */
const services = [
  { icon: Wrench,   title: 'Pipe Supply & Installation',   description: 'We supply and professionally install PPR, PPRC, and PPCH pipe systems for residential, commercial, and industrial applications across Bangalore.', image: '/images/services/pipe-supply.webp' },
  { icon: Factory,  title: 'Industrial Pipeline Systems',  description: 'Complete PPCH pipeline design, supply, and installation for factories, processing plants, and heavy industrial facilities.',                          image: '/images/services/industrial-pipeline.webp' },
  { icon: Wind,     title: 'Air Compressor Pipe Lines',    description: 'Professional air compressor pipe line installation ensuring efficient, leak-free compressed air distribution in your facility.',                        image: '/images/services/air-compressor.webp' },
  { icon: Droplets, title: 'Cooling Tower Pipelines',      description: 'Design and installation of complete cooling tower pipeline systems for industrial cooling and HVAC applications.',                                       image: '/images/services/cooling-tower.webp' },
  { icon: Shield,   title: 'FRP Lining Services',          description: 'Specialized FRP lining in chiller pipe lines for corrosion resistance, extending the life of your piping infrastructure.',                             image: '/images/services/frp-lining.webp' },
  { icon: Settings, title: 'Maintenance & Support',        description: 'Ongoing maintenance, inspection, and repair services to keep your piping systems running at peak performance.',                                         image: '/images/services/maintenance.webp' },
];


/* ─── Component ─── */
const ServicesOverview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, () => {
    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector('.services-header');
    const cards  = section.querySelectorAll('.service-card');

    // ── Header entrance ───────────────────────────────────────────────────
    // Simple y+opacity — no clipPath (expensive on Safari mobile)
    if (header) {
      gsap.set(header, { opacity: 0, y: 20 });
      gsap.to(header, {
        opacity: 1, y: 0,
        duration: 0.42, ease: 'power4.out',
        scrollTrigger: {
          trigger: header,
          ...REVEAL_TRIGGER_DEFAULTS,  // start: 'top 85%'
        },
      });
    }

    // ── Cards stagger reveal ──────────────────────────────────────────────
    // y: 16 (was 30), scale: 0.98 (was 0.97) — tighter, snappier
    // stagger amount: 0.22 (was 0.30) — faster cascade
    gsap.set(cards, {
      opacity: 0,
      y: 16,
      scale: 0.98,
    });

    gsap.to(cards, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.42,
      stagger: { amount: 0.22, from: 'start', ease: 'power2.inOut' },
      ease: 'back.out(1.3)',
      scrollTrigger: {
        trigger: section.querySelector('.services-grid'),
        ...REVEAL_TRIGGER_DEFAULTS,
      },
    });

    // ── Per-card image parallax — scrub: true = zero lag ─────────────────
    cards.forEach((card) => {
      const img = card.querySelector('.card-visual-inner');
      if (!img) return;
      gsap.to(img, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          ...PARALLAX_TRIGGER_DEFAULTS,  // scrub: true
        },
      });
    });
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-28">
      <PipeFlowBg isLight={true} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="services-header text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="font-body font-medium text-xs sm:text-sm uppercase tracking-[0.1em] text-[#434343] mb-3 sm:mb-4">
            What We Offer
          </div>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-[2.8rem] text-[#0A0A0B] mb-4 sm:mb-6">
            End-to-End Piping Solutions
          </h2>
          <p className="font-body text-sm sm:text-base text-[#434343] max-w-2xl mx-auto">
            From supply to installation — we handle every aspect of your industrial piping needs.
          </p>
        </div>

        {/* Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="service-card group bg-white rounded-2xl overflow-hidden border border-[rgba(30,32,33,0.10)] transition-all duration-500 hover:border-[#2E7D32]/40 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(46,125,50,0.12)]"
              >
                {/* Visual panel — overflow clip for inner parallax */}
                <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-[#0A0B0D]">
                  <div className="card-visual-inner absolute inset-0 scale-[1.12] will-change-transform">
                    {service.image && (
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                  </div>

                  {/* Hover shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center z-10">
                    <Icon size={16} className="text-[#4ADE80] sm:hidden" />
                    <Icon size={18} className="text-[#4ADE80] hidden sm:block" />
                  </div>
                </div>

                {/* Card content */}
                <div className="p-5 sm:p-7">
                  <h3 className="font-heading font-semibold text-lg sm:text-xl text-[#0A0A0B] mb-2 sm:mb-3">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-[#434343] leading-relaxed mb-4 sm:mb-5">
                    {service.description}
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-[#2E7D32] group/link"
                  >
                    Learn More
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
