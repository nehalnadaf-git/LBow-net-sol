'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotMatrixBg } from '../../components/backgrounds/DotMatrixBg';
import type { Product } from '@/lib/products';

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
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-24 border-t border-[rgba(30,32,33,0.08)]">
      <DotMatrixBg isLight={true} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="font-body font-medium text-xs uppercase tracking-[0.1em] text-[#434343] mb-3">
          Related Products
        </div>
        <h2 className="font-heading font-semibold text-xl sm:text-2xl text-[#0A0A0B] mb-8">
          You May Also Need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.slug}
              className="related-card bg-white rounded-xl overflow-hidden border border-[rgba(30,32,33,0.12)] transition-all duration-400 hover:border-[#0A0A0B] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]"
            >
              <div className="h-[180px] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-4 sm:px-5 sm:py-5">
                <span className="inline-block font-body font-medium text-[0.65rem] uppercase bg-[rgba(46,125,50,0.08)] text-[#2E7D32] px-3 py-1 rounded-full mb-2">
                  {product.category}
                </span>
                <h3 className="font-heading font-semibold text-base sm:text-lg text-[#0A0A0B] mb-3">
                  {product.name}
                </h3>
                <Link
                  href={`/products/${product.slug}`}
                  className="block w-full text-center bg-[#0A0A0B] hover:bg-[#434343] text-[#EEEEEE] font-body font-semibold text-sm rounded-md px-5 py-2.5 transition-all duration-300"
                >
                  View Details
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
