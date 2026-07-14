'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, FileText, Shield, Briefcase, Award, BadgeCheck, Hash, User } from 'lucide-react';
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
  { icon: Building2,    value: '2018',                               label: 'Year Established',            countTo: 2018, countDelay: 0 },
  { icon: User,         value: 'Neeladhar Naick Vadithe',             label: 'Proprietor' },
  { icon: FileText,     value: '29AUIPV4726C2ZB',                    label: 'GST Number' },
  { icon: Shield,       value: '10 Years',                           label: 'Product Warranty',            countTo: 10, countSuffix: ' Years', countDelay: 0.1 },
  { icon: Briefcase,    value: 'Dealers, Manufacturers, Wholesalers', label: 'Business Nature' },
  { icon: Award,        value: 'Prince Pipes',                        label: 'Authorized Dealer' },
  { icon: BadgeCheck,   value: 'MSME',                                label: 'Certified Business' },
  { icon: Hash,         value: 'UDYAM-KR-03-0717969',                 label: 'Udyam Registration No.' },
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
    <section ref={sectionRef} className="relative overflow-hidden w-full py-12 sm:py-14 lg:py-20 bg-[#EDF7EE]">
      {/* Premium Background Graphics */}
      <HexGridBg isLight={true} />

      {/* Top + bottom divider lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2E7D32]/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2E7D32]/15 to-transparent" />

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          {details.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <div key={index} className="detail-card flex flex-col items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/20 flex items-center justify-center mb-3 sm:mb-4">
                  <Icon size={20} className="text-[#2E7D32]" />
                </div>
                <div className="font-heading font-bold text-sm sm:text-lg md:text-xl lg:text-[1.75rem] text-[#0A0F1E] mb-1 sm:mb-2 leading-tight">
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
                <div className="font-body text-xs sm:text-sm text-[#6B7280]">{detail.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BusinessDetails;
