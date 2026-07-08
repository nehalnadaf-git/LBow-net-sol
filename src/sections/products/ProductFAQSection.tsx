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
import type { ProductFAQ } from '@/lib/products';

gsap.registerPlugin(ScrollTrigger);

interface ProductFAQSectionProps {
  faqs: ProductFAQ[];
  productName: string;
}

const ProductFAQSection = ({ faqs, productName }: ProductFAQSectionProps) => {
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
    <section ref={sectionRef} className="relative overflow-hidden w-full py-16 sm:py-20 lg:py-24" style={{ background: 'linear-gradient(180deg, #0D1118 0%, #0F1520 50%, #0D1118 100%)' }}>
      <DotMatrixBg isLight={false} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="font-body font-medium text-xs uppercase tracking-[0.1em] text-[#A6A6A6] mb-3">
          Common Questions
        </div>
        <h2 className="font-heading font-semibold text-xl sm:text-2xl text-white mb-8">
          FAQs — {productName}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-white hover:text-[#2E7D32]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#A6A6A6]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default ProductFAQSection;
