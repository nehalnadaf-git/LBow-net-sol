'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotMatrixBg } from '../../components/backgrounds/DotMatrixBg';
import type { Product } from '@/lib/products';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.related-card',
        { opacity: 0, y: 28, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.42,
          stagger: 0.06,
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

  if (!products || products.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#F8F9FA] py-16 sm:py-20 lg:py-24 border-t border-[rgba(15,23,42,0.07)]">
      <DotMatrixBg isLight={true} />
      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="font-body font-medium text-xs uppercase tracking-[0.1em] text-[#2E7D32] mb-2">
              Related Products
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0A0F1E]">
              You May Also Need
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-[#374151] hover:text-[#2E7D32] transition-colors whitespace-nowrap"
          >
            View All Products <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards grid — up to 4 on xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
          {products.map((product) => (
            <div
              key={product.slug}
              className="related-card group bg-white rounded-2xl overflow-hidden border border-[rgba(15,23,42,0.08)] transition-all duration-300 hover:border-[rgba(15,23,42,0.18)] hover:-translate-y-2 hover:shadow-[0_20px_48px_rgba(15,23,42,0.10)] flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col flex-1 px-5 py-5 lg:px-6 lg:py-6">
                <span className="inline-block font-body font-semibold text-[0.65rem] uppercase tracking-wide bg-[rgba(46,125,50,0.08)] text-[#2E7D32] px-3 py-1 rounded-full mb-3 self-start">
                  {product.category}
                </span>
                <h3 className="font-heading font-bold text-base lg:text-[1.05rem] text-[#0A0F1E] mb-4 leading-snug flex-1">
                  {product.name}
                </h3>
                <Link
                  href={`/products/${product.slug}`}
                  className="flex items-center justify-center gap-2 w-full text-center bg-[#0A0F1E] hover:bg-[#2E7D32] text-white font-body font-bold text-sm rounded-xl px-5 py-2.5 transition-all duration-300 mt-auto group/btn"
                >
                  View Details
                  <ArrowRight size={13} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
