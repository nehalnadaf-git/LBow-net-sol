'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, TrendingUp, Users, FileText, Shield, Briefcase } from 'lucide-react';
import { HexGridBg } from '../../components/backgrounds/HexGridBg';
import AnimatedCounter from '../../components/ui/AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

interface DetailItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
  label: string;
  /** If set, this card renders a counting number animation up to `countTo` */
  countTo?: number;
  /** Suffix after the counted number (e.g. ' Years') */
  countSuffix?: string;
  /** Animation delay in seconds */
  countDelay?: number;
}

const details: DetailItem[] = [
  { icon: Building2, value: '2018', label: 'Year Established', countTo: 2018, countDelay: 0 },
  { icon: TrendingUp, value: '₹1–5 Crores', label: 'Annual Turnover' },
  { icon: Users, value: '< 10', label: 'Team Size' },
  { icon: FileText, value: '29AUIPV4726C2ZB', label: 'GST Number' },
  { icon: Shield, value: '10 Years', label: 'Product Warranty', countTo: 10, countSuffix: ' Years', countDelay: 0.1 },
  { icon: Briefcase, value: 'Dealers, Manufacturers, Wholesalers', label: 'Business Nature' },
];

const BusinessDetails = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.detail-card');

    gsap.fromTo(
      cards,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.42,
        stagger: 0.06,
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
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#0A0A0B] py-12 sm:py-14 lg:py-20">
      {/* Premium Background Graphics */}
      <HexGridBg isLight={false} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">
          {details.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <div key={index} className="detail-card flex flex-col items-center">
                <Icon size={32} className="text-[#EEEEEE] mb-2 sm:mb-3 sm:w-10 sm:h-10" />
                <div className="font-heading font-bold text-sm sm:text-lg md:text-xl lg:text-[1.75rem] text-white mb-1 sm:mb-2 leading-tight">
                  {detail.countTo !== undefined ? (
                    <AnimatedCounter
                      to={detail.countTo}
                      suffix={detail.countSuffix ?? ''}
                      delay={detail.countDelay ?? 0}
                      duration={1.8}
                    />
                  ) : (
                    detail.value
                  )}
                </div>
                <div className="font-body text-xs sm:text-sm text-[#A6A6A6]">{detail.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BusinessDetails;
