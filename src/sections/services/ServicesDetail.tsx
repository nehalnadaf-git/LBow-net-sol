'use client'

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PipeTopologyBg } from '../../components/backgrounds/PipeTopologyBg';
import { useScrollReveal, REVEAL_TRIGGER_DEFAULTS } from '../../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    image: '/images/services/air-compressor-pipeline.webp',
    title: 'Air Compressor Pipeline',
    description:
      'We design and install professional compressed air pipeline systems using PPCH and PPR piping for factories, workshops, and industrial facilities. Leak-free heat fusion welded joints ensure zero energy loss from your compressed air network.',
    features: [
      'Rated up to 16 bar working pressure',
      'Ring main, radial spur, or combined layouts',
      'Zero internal corrosion — no rust contamination',
      'Smooth bore for minimal pressure drop',
    ],
    color: 'green',
    imageLeft: true,
  },
  {
    image: '/images/services/cooling-tower-pipelines.webp',
    title: 'Cooling Tower Pipelines',
    description:
      'Complete design, supply, and installation of cooling tower pipeline systems for industrial HVAC and process cooling. PPR and PPCH materials ensure corrosion-free, low-maintenance operation over decades.',
    features: [
      'Corrosion-resistant PPR/PPCH materials',
      'Compatible with all cooling tower treatment chemicals',
      'Heat fusion welded — permanently leak-free',
      '10-year product warranty',
    ],
    color: 'blue',
    imageLeft: false,
  },
  {
    image: '/images/services/chiller-line-pipelines.webp',
    title: 'Chiller Line Pipelines',
    description:
      'Specialized chiller pipeline solutions including supply, return, and bypass lines — with optional FRP lining for superior corrosion resistance. Extends infrastructure life in data centers, pharmaceutical plants, and cold rooms.',
    features: [
      'FRP lining option for 10+ year life extension',
      'Suitable for chiller operating temperatures',
      'Restores smooth bore for improved flow efficiency',
      'In-situ lining with minimal plant disruption',
    ],
    color: 'green',
    imageLeft: true,
  },
  {
    image: '/images/services/chemical-line-pipelines.webp',
    title: 'Chemical Line Pipelines',
    description:
      'Chemical-resistant PPRC and PPCH pipeline systems engineered for safe and reliable industrial chemical and acid transport. Ideal for pharmaceutical, sugar factory, chemical, and automobile industry applications.',
    features: [
      'Resistant to acids, alkalis, salts, and solvents',
      'Heat fusion welded — no adhesive joint failures',
      'Non-toxic, non-leaching for safe chemical transport',
      'Custom fabrication and system design available',
    ],
    color: 'blue',
    imageLeft: false,
  },
  {
    image: '/images/services/vacuum-line-systems.webp',
    title: 'Vacuum Line Systems',
    description:
      'Precision vacuum pipeline installation for pharmaceutical, food processing, and laboratory industries. Airtight, zero-contamination performance with heat fusion welded joints that hold vacuum without degradation.',
    features: [
      'Zero-contamination airtight performance',
      'Suitable for pharmaceutical and food-grade use',
      'Food grade certified materials available',
      'Modular design for easy expansion',
    ],
    color: 'green',
    imageLeft: true,
  },
  {
    image: '/images/services/water-line-general-piping.webp',
    title: 'Water Line & General Piping',
    description:
      'Hot and cold water lines, PPR supply and full installation for all industrial water distribution, utilities, and plumbing requirements. Available from 20mm to 315mm to suit every scale of project.',
    features: [
      'Full range: 20mm to 315mm pipe diameter',
      'Temperature rated -5°C to +95°C',
      'Food grade certified for potable water',
      '50-year design life span',
    ],
    color: 'blue',
    imageLeft: false,
  },
];


const ServicesDetail = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, () => {
    const section = sectionRef.current;
    if (!section) return;

    const rows = section.querySelectorAll('.service-row');

    rows.forEach((row) => {
      const image    = row.querySelector('.service-image');
      const text     = row.querySelector('.service-text');
      const features = row.querySelectorAll('.service-feature');

      // ── Image reveal — pure y+opacity (no x-shift on mobile = no jank) ──
      gsap.fromTo(
        image,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.45,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            ...REVEAL_TRIGGER_DEFAULTS,  // start: 'top 85%'
          },
        }
      );

      // ── Text reveal — slightly delayed from image ─────────────────────
      gsap.fromTo(
        text,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.42,
          ease: 'power3.out',
          delay: 0.06,
          scrollTrigger: {
            trigger: row,
            ...REVEAL_TRIGGER_DEFAULTS,
          },
        }
      );

      // ── Feature bullets stagger in ────────────────────────────────────
      if (features.length) {
        gsap.fromTo(
          features,
          { opacity: 0, x: -12 },
          {
            opacity: 1, x: 0,
            duration: 0.3,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-28">
      {/* Premium Background Graphics */}
      <PipeTopologyBg isLight={true} />

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-row grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center py-10 sm:py-12 lg:py-16 ${
              index < services.length - 1 ? 'border-b border-[rgba(30,32,33,0.1)]' : ''
            }`}
            data-image-left={service.imageLeft}
          >
            {/* Image */}
            <div className={`service-image ${!service.imageLeft ? 'lg:order-2' : ''}`}>
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Text */}
            <div className={`service-text ${!service.imageLeft ? 'lg:order-1' : ''}`}>
              <h3 className="font-heading font-semibold text-xl md:text-2xl text-[#0A0A0B] mb-4">
                {service.title}
              </h3>
              <p className="font-body text-sm md:text-base text-[#434343] leading-relaxed mb-4">
                {service.description}
              </p>
              <ul className="flex flex-col gap-2 mb-6">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="service-feature flex items-start gap-2 font-body text-sm text-[#434343]"
                  >
                    <span className={`font-bold mt-0.5 ${service.color === 'blue' ? 'text-[#1565C0]' : 'text-[#2E7D32]'}`}>&#x2713;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#0A0A0B] hover:bg-[#434343] text-[#EEEEEE] font-body font-semibold text-sm rounded-md px-6 py-2.5 transition-all duration-300"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesDetail;
