'use client'

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotMatrixBg } from '../../components/backgrounds/DotMatrixBg';
import { products } from '@/lib/products';

gsap.registerPlugin(ScrollTrigger);

const ProductsGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.product-grid-card');

    gsap.fromTo(
      cards,
      { opacity: 0, y: 28, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
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
    <section ref={sectionRef} className="relative overflow-hidden w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-28">
      {/* Premium Background Graphics */}
      <DotMatrixBg isLight={true} />

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.slug}
              className="product-grid-card bg-white rounded-xl overflow-hidden border border-[rgba(30,32,33,0.12)] transition-all duration-300 hover:border-[#0A0A0B] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)]"
            >
              <div className="h-[200px] sm:h-[230px] lg:h-[260px] overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-4 sm:px-6 sm:py-6">
                <span className="inline-block font-body font-medium text-[0.65rem] sm:text-[0.7rem] uppercase bg-[rgba(46,125,50,0.08)] text-[#2E7D32] px-3 py-1 rounded-full mb-2 sm:mb-3">
                  {product.category}
                </span>
                <h3 className="font-heading font-semibold text-lg sm:text-xl text-[#0A0A0B] mb-2">
                  {product.name}
                </h3>
                <p className="font-body text-xs text-[#434343] mb-4 leading-relaxed line-clamp-2">
                  {product.shortDescription}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className="block w-full text-center bg-[#0A0A0B] hover:bg-[#434343] text-[#EEEEEE] font-body font-semibold text-sm rounded-md px-6 py-2.5 transition-all duration-300 mt-2"
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

export default ProductsGrid;
