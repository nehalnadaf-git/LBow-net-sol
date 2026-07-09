'use client'

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, PlayCircle, Calendar, Phone } from 'lucide-react';
import { DotMatrixBg } from '../../components/backgrounds/DotMatrixBg';
import { PipeCrossSectionBg } from '../../components/backgrounds/PipeCrossSectionBg';
import AnimatedCounter from '../../components/ui/AnimatedCounter';
import { useScrollReveal, REVEAL_TRIGGER_DEFAULTS } from '../../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

interface BadgeItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
  label: string;
  countTo?: number;
  countSuffix?: string;
  countDelay?: number;
}

const badges: BadgeItem[] = [
  { icon: Shield,      value: '10 Years',       label: 'Product Warranty on PPR Pipes',  countTo: 10,   countSuffix: ' Years', countDelay: 0    },
  { icon: PlayCircle,  value: 'Free Demo',      label: 'Available on Request' },
  { icon: Calendar,    value: 'Since 2018',     label: 'Serving Across India',           countTo: 2018, countSuffix: '',        countDelay: 0.1 },
  { icon: Phone,       value: '+91 81235 01407', label: 'Call or WhatsApp Now' },
];

const TrustBadges = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, () => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.badge-card');
    const line = section.querySelector('.divider-line');

    // ── Initial states ────────────────────────────────────────────────────
    // Tighter y offset (18px vs 50px) = snappier, more premium motion
    gsap.set(cards, { opacity: 0, y: 18, scale: 0.96 });
    if (line) gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        ...REVEAL_TRIGGER_DEFAULTS,  // start: 'top 85%' — earlier trigger
      },
    });

    // Divider line swipes in first
    if (line) {
      tl.to(line, { scaleX: 1, duration: 0.35, ease: 'power3.out' }, 0);
    }

    // Cards stagger pop-in with micro-spring — back.out(1.4) adds premium feel
    tl.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      stagger: {
        amount: 0.20,
        ease: 'power2.inOut',
      },
      ease: 'back.out(1.4)',
    }, 0.05);
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full py-14 sm:py-16 lg:py-20 bg-[#EDF7EE]">
      <DotMatrixBg isLight={true} />
      <PipeCrossSectionBg isLight={true} />

      {/* Subtle top/bottom divider lines */}
      <div className="divider-line absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2E7D32]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2E7D32]/20 to-transparent" />

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-6 lg:gap-8">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="badge-card group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1 will-change-transform"
              >
                {/* Icon Wrapper — CSS float animation */}
                <div className="badge-icon-float w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/20 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#2E7D32]/18 group-hover:border-[#2E7D32]/40 transition-all duration-300 shadow-sm">
                  <Icon size={24} className="text-[#2E7D32]" />
                </div>

                {/* Stat/Highlight Value */}
                <div className="font-heading font-bold text-base sm:text-xl lg:text-2xl text-[#0A0F1E] mb-1.5 sm:mb-2 leading-tight">
                  {badge.countTo !== undefined ? (
                    <AnimatedCounter
                      to={badge.countTo}
                      suffix={badge.countSuffix ?? ''}
                      delay={badge.countDelay ?? 0}
                      duration={1.8}
                    />
                  ) : (
                    badge.value
                  )}
                </div>

                {/* Stat Subtitle */}
                <div className="font-body text-[0.65rem] sm:text-xs text-[#6B7280] uppercase tracking-[0.1em] leading-normal max-w-[180px]">
                  {badge.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
