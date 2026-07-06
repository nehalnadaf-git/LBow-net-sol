'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, CheckCircle, Truck } from 'lucide-react';
import { DotMatrixBg } from '../../components/backgrounds/DotMatrixBg';
import { PipeTopologyBg } from '../../components/backgrounds/PipeTopologyBg';
import type { Location } from '@/lib/locations';
import { products } from '@/lib/products';
import { locationWhatsAppUrl } from '@/lib/whatsapp';

gsap.registerPlugin(ScrollTrigger);

interface LocationContentProps {
  location: Location;
}

// Show a selection of relevant products
const FEATURED_PRODUCT_SLUGS = [
  'ppch-industrial-pipeline',
  'ppr-pipe-unions',
  'pprc-chemical-pipe',
  'air-compressor-pipeline',
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
      <section ref={contentRef} className="relative overflow-hidden w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-28">
        <DotMatrixBg isLight={true} />
        <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 lg:gap-16">
            {/* Left: Description */}
            <div className="loc-animate">
              <div className="font-body font-medium text-xs uppercase tracking-[0.1em] text-[#434343] mb-4">
                Service Area Overview
              </div>
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-[#0A0A0B] mb-6 leading-tight">
                Why Industries in {location.displayName} Choose LBow Network Solutions
              </h2>
              <div className="space-y-4">
                {descParagraphs.map((para, i) => {
                  // Render lines with **bold** text
                  const boldProcessed = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                  return (
                    <p
                      key={i}
                      className="font-body text-sm sm:text-base text-[#434343] leading-[1.75]"
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
              <div className="bg-white rounded-xl border border-[rgba(30,32,33,0.12)] p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Truck size={20} className="text-[#2E7D32]" />
                  <h3 className="font-heading font-semibold text-base text-[#0A0A0B]">Delivery to {location.displayName}</h3>
                </div>
                {location.tier === 1 ? (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#2E7D32] mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-[#434343]">
                        <strong>Free demo</strong> available for all product ranges — call to schedule
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#2E7D32] mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-[#434343]">No minimum order quantity</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#2E7D32] mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-[#434343]">Same-day / next-day for stock items</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#2E7D32] mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-[#434343]">Courier delivery for smaller orders</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#2E7D32] mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-[#434343]">Freight truck for bulk orders</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#2E7D32] mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-[#434343]">No minimum order quantity</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle size={15} className="text-[#A6A6A6] mt-0.5 flex-shrink-0" />
                      <p className="font-body text-sm text-[#434343]">Delivery charges apply outside 22km zone</p>
                    </div>
                  </div>
                )}
                {location.distanceFromBangalore && (
                  <div className="flex items-start gap-2 mt-3 pt-3 border-t border-[rgba(30,32,33,0.08)]">
                    <MapPin size={14} className="text-[#434343] mt-0.5 flex-shrink-0" />
                    <p className="font-body text-xs text-[#434343]">{location.distanceFromBangalore}</p>
                  </div>
                )}
              </div>

              {/* CTA Card */}
              <div className="bg-[#0A0A0B] rounded-xl p-5 text-center">
                <h3 className="font-heading font-semibold text-base text-white mb-2">
                  Get a Quote for {location.displayName}
                </h3>
                <p className="font-body text-xs text-[#A6A6A6] mb-4">
                  No minimum order. Prompt response during business hours.
                </p>
                <a
                  href="tel:+918123501407"
                  className="block w-full text-center bg-[#EEEEEE] hover:bg-[#434343] hover:text-[#EEEEEE] text-[#0A0A0B] font-body font-semibold text-sm rounded-md px-5 py-2.5 transition-all duration-300 mb-3"
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
      <section className="relative overflow-hidden w-full bg-[#0A0A0B] py-16 sm:py-20">
        <PipeTopologyBg isLight={false} />
        <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="font-body font-medium text-xs uppercase tracking-[0.1em] text-[#A6A6A6] mb-3">
            Products We Supply
          </div>
          <h2 className="font-heading font-semibold text-xl sm:text-2xl text-white mb-8">
            Piping Solutions for {location.displayName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <div
                key={product.slug}
                className="bg-[#121315] rounded-xl border border-white/5 p-4 hover:border-white/15 transition-all duration-300"
              >
                <span className="inline-block font-body font-medium text-[0.65rem] uppercase bg-[rgba(46,125,50,0.1)] text-[#2E7D32] px-2.5 py-1 rounded-full mb-3">
                  {product.category}
                </span>
                <h3 className="font-heading font-semibold text-sm text-white mb-3 leading-tight">
                  {product.name}
                </h3>
                <Link
                  href={`/products/${product.slug}`}
                  className="block text-center bg-[#EEEEEE] hover:bg-[#434343] hover:text-[#EEEEEE] text-[#0A0A0B] font-body font-semibold text-xs rounded-md px-4 py-2 transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-body font-semibold text-sm text-[#A6A6A6] hover:text-white transition-colors"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Nearby Zones (for Tier 1 only) */}
      {location.nearbyZones && location.nearbyZones.length > 0 && (
        <section className="relative overflow-hidden w-full bg-[#FAFAF9] py-12 sm:py-14 border-t border-[rgba(30,32,33,0.06)]">
          <DotMatrixBg isLight={true} />
          <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
            <h3 className="font-heading font-semibold text-base text-[#0A0A0B] mb-4">
              Nearby Zones We Also Serve
            </h3>
            <div className="flex flex-wrap gap-3">
              {location.nearbyZones.map((slug) => (
                <Link
                  key={slug}
                  href={`/locations/${slug}`}
                  className="bg-white rounded-full px-5 py-2 border border-[rgba(30,32,33,0.12)] font-body text-sm text-[#0A0A0B] hover:border-[#0A0A0B] transition-colors capitalize"
                >
                  {slug.replace(/-/g, ' ')}
                </Link>
              ))}
              <Link
                href="/locations"
                className="bg-white rounded-full px-5 py-2 border border-[rgba(30,32,33,0.12)] font-body text-sm text-[#434343] hover:border-[#0A0A0B] transition-colors"
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
