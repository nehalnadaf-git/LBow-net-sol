'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotMatrixBg } from '../../components/backgrounds/DotMatrixBg';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion';
import type { LocationFAQ } from '@/lib/locations';

gsap.registerPlugin(ScrollTrigger);

interface LocationFAQSectionProps {
  faqs: LocationFAQ[];
  locationName: string;
}

const LocationFAQSection = ({ faqs, locationName }: LocationFAQSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-24">
      <DotMatrixBg isLight={true} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="font-body font-medium text-xs uppercase tracking-[0.1em] text-[#434343] mb-3">
          Common Questions
        </div>
        <h2 className="font-heading font-semibold text-xl sm:text-2xl text-[#0A0A0B] mb-8">
          FAQs — {locationName}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-[rgba(30,32,33,0.1)]">
              <AccordionTrigger className="text-[#0A0A0B] hover:text-[#2E7D32] text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#434343]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default LocationFAQSection;
