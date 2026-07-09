'use client'

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wrench, Factory, Wind, Droplets, Shield, Settings, ArrowRight } from 'lucide-react';
import { PipeFlowBg } from '../../components/backgrounds/PipeFlowBg';
import { useScrollReveal, REVEAL_TRIGGER_DEFAULTS, getParallaxTriggerDefaults, isMobileDevice } from '../../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

/* ─── Service data ─── */
const services = [
  { icon: Wind,     title: 'Air Compressor Pipeline',    description: 'Professional installation of compressed air pipelines for factories, workshops, and industrial facilities. Leak-free, pressure-rated PPR & PPCH solutions.',           image: '/images/services/air-compressor-pipeline.webp' },
  { icon: Droplets, title: 'Cooling Tower Pipelines',    description: 'Complete design and installation of cooling tower pipeline systems for industrial HVAC and process cooling applications with long service life.',                 image: '/images/services/cooling-tower-pipelines.webp' },
  { icon: Shield,   title: 'Chiller Line Pipelines',     description: 'Specialized chiller pipeline solutions with FRP lining for superior corrosion resistance — extending infrastructure life in data centers and cold rooms.',  image: '/images/services/chiller-line-pipelines.webp' },
  { icon: Factory,  title: 'Chemical Line Pipelines',    description: 'Chemical-resistant PPRC and PPCH pipeline systems engineered for safe, reliable industrial chemical and acid transport across manufacturing plants.',       image: '/images/services/chemical-line-pipelines.webp' },
  { icon: Wrench,   title: 'Vacuum Line Systems',        description: 'Precision vacuum pipeline installation for pharmaceutical, food processing, and laboratory industries — ensuring zero-contamination, airtight performance.', image: '/images/services/vacuum-line-systems.webp' },
  { icon: Settings, title: 'Water Line & General Piping', description: 'Hot and cold water lines, PPR supply and installation for all industrial water distribution, utilities, and plumbing — from 20mm to 315mm.',             image: '/images/services/water-line-general-piping.webp' },
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

    // ── Per-card image parallax — desktop only (too heavy for mobile GPUs) ──
    if (!isMobileDevice()) {
      const parallax = getParallaxTriggerDefaults();
      cards.forEach((card) => {
        const img = card.querySelector('.card-visual-inner');
        if (!img) return;
        gsap.to(img, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: card, ...parallax },
        });
      });
    }
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#F8F9FA] py-16 sm:py-20 lg:py-28">
      <PipeFlowBg isLight={true} />

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="services-header text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="font-body font-medium text-xs sm:text-sm uppercase tracking-[0.1em] text-[#6B7280] mb-3 sm:mb-4">
            Our Services
          </div>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-[2.8rem] text-[#0A0F1E] mb-4 sm:mb-6">
            Industrial Pipeline Solutions
          </h2>
          <p className="font-body text-sm sm:text-base text-[#374151] max-w-2xl mx-auto">
            From air compressor pipelines and cooling towers to chiller lines, chemical lines, vacuum lines, and water lines — we design, supply, and install complete pipeline systems for every industry.
          </p>
        </div>

        {/* Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`service-card group bg-white rounded-2xl overflow-hidden border border-[rgba(30,32,33,0.10)] transition-all duration-500 hover:-translate-y-2 ${
                  index % 2 === 0
                    ? 'hover:border-[#2E7D32]/40 hover:shadow-[0_20px_60px_rgba(46,125,50,0.12)]'
                    : 'hover:border-[#1565C0]/30 hover:shadow-[0_20px_60px_rgba(21,101,192,0.10)]'
                }`}
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

                  {/* Icon badge — alternates green (odd) / PPR blue (even) */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center z-10">
                    <Icon size={16} className={`sm:hidden ${index % 2 === 0 ? 'text-[#4ADE80]' : 'text-[#42A5F5]'}`} />
                    <Icon size={18} className={`hidden sm:block ${index % 2 === 0 ? 'text-[#4ADE80]' : 'text-[#42A5F5]'}`} />
                  </div>
                </div>

                {/* Card content */}
                <div className="p-5 sm:p-7">
                  <h3 className="font-heading font-semibold text-lg sm:text-xl text-[#0A0F1E] mb-2 sm:mb-3">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-[#374151] leading-relaxed mb-4 sm:mb-5">
                    {service.description}
                  </p>
                  <Link
                    href="/services"
                    className={`inline-flex items-center gap-1.5 font-body font-semibold text-sm group/link ${
                      index % 2 === 0 ? 'text-[#2E7D32]' : 'text-[#1565C0]'
                    }`}
                  >
                    Learn More
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Services Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 justify-center bg-[#0A0F1E] text-white
                       hover:bg-[#1a2035] font-body font-semibold rounded-lg px-8 sm:px-10 py-3 sm:py-3.5
                       text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                       shadow-sm"
          >
            View All Services
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
