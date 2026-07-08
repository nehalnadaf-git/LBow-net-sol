'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Phone } from 'lucide-react';
import { DotMatrixBg } from '../../components/backgrounds/DotMatrixBg';
import { PipeTopologyBg } from '../../components/backgrounds/PipeTopologyBg';
import type { Product } from '@/lib/products';
import { productWhatsAppUrl } from '@/lib/whatsapp';

gsap.registerPlugin(ScrollTrigger);

interface ProductDetailContentProps {
  product: Product;
}

const ProductDetailContent = ({ product }: ProductDetailContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-content-block',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, contentRef);
    return () => ctx.revert();
  }, []);

  const paragraphs = product.fullDescription
    .split('\n\n')
    .filter((p) => p.trim().length > 0);

  return (
    <>
      {/* Description + Specs */}
      <section ref={contentRef} className="relative overflow-hidden w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-28">
        <DotMatrixBg isLight={true} />
        <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-10 sm:gap-12 lg:gap-16">
            {/* Left: Description */}
            <div className="product-content-block">
              <div className="font-body font-medium text-xs uppercase tracking-[0.1em] text-[#434343] mb-4">
                About This Product
              </div>
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-[#0A0A0B] mb-6 leading-tight">
                {product.name}
              </h2>
              <div className="space-y-4">
                {paragraphs.map((para, i) => (
                  <p key={i} className="font-body text-sm sm:text-base text-[#434343] leading-[1.75]">
                    {para.trim()}
                  </p>
                ))}
              </div>
            </div>

            {/* Right: Specs + Image */}
            <div className="product-content-block space-y-6">
              {/* Product Image */}
              <div className="rounded-xl overflow-hidden border border-[rgba(30,32,33,0.12)] shadow-lg">
                <img
                  src={product.image}
                  alt={`${product.name} — LBow Network Solutions Bangalore`}
                  className="w-full h-[220px] sm:h-[260px] object-cover"
                  loading="lazy"
                />
              </div>

              {/* Specifications */}
              <div className="bg-white rounded-xl border border-[rgba(30,32,33,0.12)] p-5 sm:p-6">
                <h3 className="font-heading font-semibold text-base sm:text-lg text-[#0A0A0B] mb-4">
                  Technical Specifications
                </h3>
                <div className="space-y-3">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className="flex justify-between gap-4 border-b border-[rgba(30,32,33,0.08)] pb-3 last:border-0 last:pb-0">
                      <span className="font-body font-medium text-xs sm:text-sm text-[#434343] uppercase tracking-[0.04em]">
                        {spec.label}
                      </span>
                      <span className="font-body text-xs sm:text-sm text-[#0A0A0B] text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications + Industries */}
      <section ref={appsRef} className="relative overflow-hidden w-full py-16 sm:py-20 lg:py-28" style={{ background: 'linear-gradient(180deg, #0D1118 0%, #0F1520 50%, #0D1118 100%)' }}>
        <PipeTopologyBg isLight={false} />
        <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
            {/* Applications */}
            <div>
              <div className="font-body font-medium text-xs uppercase tracking-[0.1em] text-[#A6A6A6] mb-4">
                Applications
              </div>
              <h2 className="font-heading font-semibold text-xl sm:text-2xl text-white mb-6">
                Where This Product Is Used
              </h2>
              <ul className="space-y-3">
                {product.applications.map((app, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-[#2E7D32] mt-1 flex-shrink-0" />
                    <span className="font-body text-sm sm:text-base text-[#A6A6A6] leading-relaxed">{app}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <div className="font-body font-medium text-xs uppercase tracking-[0.1em] text-[#A6A6A6] mb-4">
                Industries Served
              </div>
              <h2 className="font-heading font-semibold text-xl sm:text-2xl text-white mb-6">
                Sectors That Rely on This Product
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {product.industries.map((industry, i) => (
                  <span
                    key={i}
                    className="bg-[#121315] rounded-full px-4 py-2 border border-white/5 font-body text-xs sm:text-sm text-[#EEEEEE]"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden w-full bg-[#FAFAF9] py-12 sm:py-16">
        <DotMatrixBg isLight={true} />
        <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 bg-white rounded-xl border border-[rgba(30,32,33,0.12)] shadow-sm">
            <div>
              <h3 className="font-heading font-semibold text-lg sm:text-xl text-[#0A0A0B] mb-1">
                Interested in {product.name}?
              </h3>
              <p className="font-body text-sm text-[#434343]">
                No minimum order quantity. Free demo available — call to schedule.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="tel:+918123501407"
                className="inline-flex items-center justify-center gap-2 bg-[#0A0A0B] hover:bg-[#434343] text-[#EEEEEE] font-body font-semibold rounded-md px-6 py-3 transition-all duration-300 text-sm whitespace-nowrap"
              >
                <Phone size={16} />
                Call +91 8123501407
              </a>
              <a
                href={productWhatsAppUrl(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-body font-semibold rounded-md px-6 py-3 transition-all duration-300 text-sm whitespace-nowrap"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailContent;
