'use client'

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PipeTopologyBg } from '../../components/backgrounds/PipeTopologyBg';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    image: '/images/service-ppr-installation.webp',
    title: 'PPR Pipe Supply & Installation',
    description:
      'We supply and install complete PPR (Polypropylene Random Copolymer) piping systems for hot and cold water applications. Our PPR pipes and fittings are heat-fused for leak-proof joints that last decades. Suitable for residential buildings, commercial complexes, and industrial facilities.',
    features: [
      'Heat fusion welding for permanent joints',
      'Corrosion and chemical resistant',
      'Suitable for temperatures up to 95°C',
      'Smooth inner surface prevents scale buildup',
    ],
    imageLeft: true,
  },
  {
    image: '/images/service-ppch-industrial.webp',
    title: 'PPCH Industrial Pipeline Systems',
    description:
      'Our PPCH (Polypropylene Homopolymer) pipeline systems are designed for heavy-duty industrial applications. These high-pressure pipes can handle aggressive chemicals, high temperatures, and demanding operating conditions in factories and processing plants.',
    features: [
      'High pressure rating up to 16 bar',
      'Chemical resistant for industrial fluids',
      'UV stabilized for outdoor installations',
      'Custom fabrication and fitting available',
    ],
    imageLeft: false,
  },
  {
    image: '/images/service-ppch-industrial.webp',
    title: 'Air Compressor Pipe Line Installation',
    description:
      'We design and install efficient compressed air distribution systems using specialized piping materials. Our installations minimize pressure drops and ensure clean, dry air reaches every point of use in your facility.',
    features: [
      'Optimized pipe sizing for minimal pressure loss',
      'Leak-free push-fit or threaded connections',
      'Modular system for easy expansion',
      'Supports pressures up to 16 bar',
    ],
    imageLeft: true,
  },
  {
    image: '/images/product-cooling-tower.webp',
    title: 'Cooling Tower Pipeline',
    description:
      'We provide complete cooling tower piping solutions including supply, return, and make-up water lines. Our systems are designed for the unique demands of evaporative cooling systems, ensuring efficient heat rejection and minimal water waste.',
    features: [
      'Corrosion-resistant materials for wet environments',
      'Properly sized for design flow rates',
      'Integration with existing HVAC systems',
      'UV and algae-resistant piping options',
    ],
    imageLeft: false,
  },
  {
    image: '/images/service-ppr-installation.webp',
    title: 'FRP Lining in Chiller Pipe Lines',
    description:
      'Our specialized FRP (Fiberglass Reinforced Plastic) lining services protect chiller pipe lines from corrosion, erosion, and chemical attack. The seamless lining extends pipe life by 10+ years and maintains system efficiency.',
    features: [
      'Seamless corrosion protection',
      'Smooth surface maintains flow efficiency',
      'Resistant to chlorides and acids',
      '10+ year service life extension',
    ],
    imageLeft: true,
  },
];

const ServicesDetail = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rows = section.querySelectorAll('.service-row');

    rows.forEach((row) => {
      const image = row.querySelector('.service-image');
      const text = row.querySelector('.service-text');
      const isLeft = row.getAttribute('data-image-left') === 'true';

      gsap.fromTo(
        image,
        { opacity: 0, x: isLeft ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        text,
        { opacity: 0, x: isLeft ? 30 : -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger && section.contains(t.trigger as Element)) t.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-28">
      {/* Premium Background Graphics */}
      <PipeTopologyBg isLight={true} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
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
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-auto rounded-xl object-cover shadow-md"
                loading="lazy"
              />
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
                    className="flex items-start gap-2 font-body text-sm text-[#434343]"
                  >
                    <span className="text-[#2E7D32] font-bold mt-0.5">&#x2713;</span>
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
