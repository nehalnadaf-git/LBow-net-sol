'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
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
import { Phone } from 'lucide-react';

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
    <section ref={sectionRef} className="relative overflow-hidden w-full py-16 sm:py-20 lg:py-28 bg-[#F0F4F8]">
      <DotMatrixBg isLight={true} />
      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">

        {/* Desktop: FAQ left, CTA right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-10 lg:gap-16 xl:gap-20">

          {/* FAQ column */}
          <div>
            <div className="font-body font-medium text-xs uppercase tracking-[0.1em] text-[#2E7D32] mb-3">
              Common Questions
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[2rem] text-[#0A0F1E] mb-8 leading-tight">
              FAQs — {productName}
            </h2>
            <div className="bg-white rounded-2xl border border-[rgba(15,23,42,0.08)] shadow-sm px-6 lg:px-8 py-2">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b border-[rgba(15,23,42,0.07)] last:border-0">
                    <AccordionTrigger className="text-[#0A0F1E] hover:text-[#2E7D32] text-left font-semibold text-sm sm:text-base py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#374151] text-sm leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Sticky CTA sidebar */}
          <div className="lg:sticky lg:top-28 lg:self-start space-y-5">
            {/* Quote card */}
            <div className="bg-white rounded-2xl border border-[rgba(15,23,42,0.08)] shadow-sm p-7">
              <h3 className="font-heading font-bold text-lg text-[#0A0F1E] mb-2">
                Ready to Order?
              </h3>
              <p className="font-body text-sm text-[#374151] leading-relaxed mb-6">
                No minimum order quantity. Free product demo available — call or WhatsApp to schedule.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+918123501407"
                  className="flex items-center justify-center gap-2 w-full text-center bg-[#0A0F1E] hover:bg-[#1a2035] text-white font-body font-bold text-sm rounded-xl px-5 py-3.5 transition-all duration-300 hover:scale-[1.02] shadow-sm"
                >
                  <Phone size={15} />
                  Call +91 81235 01407
                </a>
                <a
                  href={`https://wa.me/918123501407?text=Hi, I'm interested in ${encodeURIComponent(productName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full text-center bg-[#25D366] hover:bg-[#128C7E] text-white font-body font-bold text-sm rounded-xl px-5 py-3.5 transition-all duration-300 hover:scale-[1.02] shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-[rgba(15,23,42,0.08)] shadow-sm p-6">
              <h3 className="font-heading font-bold text-sm text-[#0A0F1E] mb-4 pb-3 border-b border-[rgba(15,23,42,0.07)]">
                Quick Links
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'All Products', href: '/products' },
                  { label: 'Our Services', href: '/services' },
                  { label: 'Contact Us', href: '/contact' },
                  { label: 'Locations', href: '/locations' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between font-body text-sm text-[#374151] hover:text-[#2E7D32] transition-colors py-1.5 group"
                  >
                    {item.label}
                    <svg className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#2E7D32] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductFAQSection;
