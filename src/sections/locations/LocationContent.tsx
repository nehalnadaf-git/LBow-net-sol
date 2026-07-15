'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, CheckCircle, Truck, ArrowRight, Wrench } from 'lucide-react';
import { DotMatrixBg } from '../../components/backgrounds/DotMatrixBg';
import { PipeTopologyBg } from '../../components/backgrounds/PipeTopologyBg';
import type { Location } from '@/lib/locations';
import { products } from '@/lib/products';
import { locationWhatsAppUrl } from '@/lib/whatsapp';

gsap.registerPlugin(ScrollTrigger);

interface LocationContentProps {
  location: Location;
}

// Show a curated selection of the most relevant products.
// These slugs MUST exist in src/lib/products.ts.
const FEATURED_PRODUCT_SLUGS = [
  'ppr-green-pipe',
  'ppr-blue-pipe',
  'brass-ball-valve',
  'pneumatic-fittings',
];

const LocationContent = ({ location }: LocationContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.loc-animate',
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

  const featuredProducts = products.filter((p) => FEATURED_PRODUCT_SLUGS.includes(p.slug));

  // Parse description — split by double newline, preserve **bold** heading patterns
  const descParagraphs = location.description
    .split('\n\n')
    .filter((p) => p.trim().length > 0);

  return (
    <>
      {/* Description */}
      <section ref={contentRef} className="relative overflow-hidden w-full bg-[#F8F9FA] py-16 sm:py-20 lg:py-28">
        <DotMatrixBg isLight={true} />
        <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 lg:gap-16">
            {/* Left: Description */}
            <div className="loc-animate">
              <div className="font-body font-medium text-xs uppercase tracking-[0.1em] text-[#6B7280] mb-4">
                Service Area Overview
              </div>
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-[#0A0F1E] mb-6 leading-tight">
                Why Industries in {location.displayName} Choose LBow Network Solutions
              </h2>
              <div className="space-y-4">
                {descParagraphs.map((para, i) => {
                  // Render lines with **bold** text
                  const boldProcessed = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                  return (
                    <p
                      key={i}
                      className="font-body text-sm sm:text-base text-[#374151] leading-[1.75]"
                      dangerouslySetInnerHTML={{ __html: boldProcessed }}
                    />
                  );
                })}
              </div>

              {/* Dominant Industries */}
              <div className="mt-8">
                <h3 className="font-heading font-semibold text-base text-[#0A0A0B] mb-4">
                  Dominant Industries in {location.displayName}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {location.dominantIndustries.map((industry, i) => (
                    <span
                      key={i}
                      className="bg-[rgba(46,125,50,0.08)] text-[#2E7D32] rounded-full px-4 py-1.5 font-body text-xs font-medium"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Quick Info */}
            <div className="loc-animate space-y-5">
              {/* Delivery Info */}
              <div className="bg-white rounded-xl border border-[rgba(15,23,42,0.08)] p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Truck size={20} className="text-[#2E7D32]" />
                  <h3 className="font-heading font-semibold text-base text-[#0A0F1E]">Delivery to {location.displayName}</h3>
                </div>
                {location.tier === 1 ? (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#2E7D32] mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-[#374151]">
                        <strong>Free demo</strong> available for all product ranges — call to schedule
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#2E7D32] mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-[#374151]">No minimum order quantity</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#2E7D32] mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-[#374151]">Same-day / next-day for stock items</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#2E7D32] mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-[#374151]">Courier delivery for smaller orders</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#2E7D32] mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-[#374151]">Freight truck for bulk orders</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#2E7D32] mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-[#374151]">No minimum order quantity</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#9CA3AF] mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-[#374151]">Delivery charges apply outside 22km zone</p>
                    </div>
                  </div>
                )}
                {location.distanceFromBangalore && (
                  <div className="flex items-start gap-2 mt-3 pt-3 border-t border-[rgba(15,23,42,0.06)]">
                    <MapPin size={14} className="text-[#6B7280] mt-0.5 flex-shrink-0" />
                    <p className="font-body text-xs text-[#6B7280]">{location.distanceFromBangalore}</p>
                  </div>
                )}
              </div>

              {/* CTA Card */}
              <div className="rounded-xl p-5 text-center bg-[#2E7D32]">
                <h3 className="font-heading font-semibold text-base text-white mb-2">
                  Get a Quote for {location.displayName}
                </h3>
                <p className="font-body text-xs text-white/70 mb-4">
                  No minimum order. Prompt response during business hours.
                </p>
                <a
                  href="tel:+918123501407"
                  className="block w-full text-center bg-white hover:bg-[#F0F4F8] text-[#2E7D32] font-body font-semibold text-sm rounded-md px-5 py-2.5 transition-all duration-300 mb-3"
                >
                  Call +91 8123501407
                </a>
                <a
                  href={locationWhatsAppUrl(location.displayName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#25D366] hover:bg-[#128C7E] text-white font-body font-semibold text-sm rounded-md px-5 py-2.5 transition-all duration-300"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Products */}
      <section className="relative overflow-hidden w-full py-16 sm:py-20 lg:py-28 bg-[#F8F9FA]">
        <DotMatrixBg isLight={true} />
        <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">

          {/* Section Header */}
          <div className="mb-10 sm:mb-12 lg:mb-14">
            <div className="font-body font-medium text-xs uppercase tracking-[0.1em] text-[#2E7D32] mb-3">
              Products We Supply
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0A0F1E] leading-tight">
              Piping Solutions for {location.displayName}
            </h2>
          </div>

          {/* Product Cards — same markup as ProductsGrid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-7">
            {featuredProducts.map((product) => (
              <div
                key={product.slug}
                className="group bg-white rounded-2xl overflow-hidden border border-[rgba(15,23,42,0.08)] transition-all duration-300 hover:border-[rgba(15,23,42,0.18)] hover:-translate-y-2 hover:shadow-[0_20px_56px_rgba(15,23,42,0.10)] flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-5 py-5 lg:px-6 lg:py-6">
                  <span className="inline-block font-body font-semibold text-[0.65rem] uppercase tracking-wide bg-[rgba(46,125,50,0.08)] text-[#2E7D32] px-3 py-1 rounded-full mb-3 self-start">
                    {product.category}
                  </span>
                  <h3 className="font-heading font-bold text-base sm:text-lg lg:text-[1.05rem] xl:text-lg text-[#0A0F1E] mb-2 leading-snug">
                    {product.name}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#374151] mb-5 leading-relaxed line-clamp-2 flex-1">
                    {product.shortDescription}
                  </p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center justify-center gap-2 w-full text-center bg-[#0A0F1E] hover:bg-[#2E7D32] text-white font-body font-bold text-sm rounded-xl px-5 py-2.5 transition-all duration-300 mt-auto group/btn"
                  >
                    View Details
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Products CTA */}
          <div className="mt-10 sm:mt-12 flex justify-center">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2.5 bg-[#2E7D32] hover:bg-[#256427] text-white font-body font-semibold text-sm rounded-xl px-8 py-3.5 transition-all duration-300 shadow-[0_4px_20px_rgba(46,125,50,0.25)] hover:shadow-[0_8px_32px_rgba(46,125,50,0.40)] hover:-translate-y-0.5"
            >
              View All Products
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </section>


      {/* Nearby Zones (for Tier 1 only) */}
      {location.nearbyZones && location.nearbyZones.length > 0 && (
        <section className="relative overflow-hidden w-full bg-[#F8F9FA] py-12 sm:py-14 border-t border-[rgba(15,23,42,0.06)]">
          <DotMatrixBg isLight={true} />
          <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
            <h3 className="font-heading font-semibold text-base text-[#0A0F1E] mb-4">
              Nearby Zones We Also Serve
            </h3>
            <div className="flex flex-wrap gap-3">
              {location.nearbyZones.map((slug) => (
                <Link
                  key={slug}
                  href={`/locations/${slug}`}
                  className="bg-white rounded-full px-5 py-2 border border-[rgba(15,23,42,0.08)] font-body text-sm text-[#0A0F1E] hover:border-[#0A0F1E] transition-colors capitalize"
                >
                  {slug.replace(/-/g, ' ')}
                </Link>
              ))}
              <Link
                href="/locations"
                className="bg-white rounded-full px-5 py-2 border border-[rgba(15,23,42,0.08)] font-body text-sm text-[#374151] hover:border-[#0A0F1E] transition-colors"
              >
                View All Locations →
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default LocationContent;
