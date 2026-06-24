import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { brands } from '@/lib/brands';
import { BASE_URL, localBusinessSchemaBase } from '@/lib/seo';
import { CheckCircle, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Brands We Carry | Prince Pipes Authorized Dealer Bangalore | LBow',
  description:
    'LBow Network Solutions is an Authorized Dealer for Prince Pipes and Fittings Limited in Bangalore (certificate 2025–2027). Call +91 9606419076.',
  alternates: { canonical: `${BASE_URL}/brands` },
};

export default function BrandsIndex() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchemaBase) }} />

      {/* Hero */}
      <section className="relative w-full bg-[#0A0A0B] pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 text-center">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="font-body font-medium text-xs sm:text-sm uppercase tracking-[0.1em] text-[#A6A6A6] mb-4">
            Authorized Dealerships
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-[3rem] lg:text-[3.5rem] text-white leading-[1.1] mb-6">
            Brands We Carry
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg text-[#A6A6A6] max-w-2xl mx-auto">
            Authorized dealer with manufacturer certificates — genuine products with full warranty.
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="relative w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group bg-white rounded-xl border border-[rgba(30,32,33,0.12)] hover:border-[#0A0A0B] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-400 p-6 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={16} className="text-[#2E7D32]" />
                  <span className="font-body text-xs text-[#2E7D32] font-medium uppercase tracking-[0.06em]">
                    Authorized Dealer
                  </span>
                </div>
                <h2 className="font-heading font-bold text-xl text-[#0A0A0B] mb-2">{brand.name}</h2>
                <p className="font-body text-sm text-[#434343] mb-4 flex-1">{brand.tagline}</p>
                <div className="flex items-center justify-between pt-4 border-t border-[rgba(30,32,33,0.08)]">
                  <span className="font-body text-xs text-[#434343]">
                    Certificate: {brand.dealershipDetails.certificateValidFrom}–{brand.dealershipDetails.certificateValidTo}
                  </span>
                  <span className="font-body font-semibold text-sm text-[#0A0A0B] group-hover:text-[#2E7D32] transition-colors">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dealer Certificate Section */}
      <section className="relative w-full bg-[#0A0A0B] py-16 sm:py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2E7D32]/30 bg-[#2E7D32]/10 mb-5">
              <Award size={14} className="text-[#2E7D32]" />
              <span className="font-body font-medium text-xs uppercase tracking-[0.1em] text-[#2E7D32]">
                Official Certification
              </span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-4">
              Our Dealer Certificate
            </h2>
            <p className="font-body text-sm sm:text-base text-[#A6A6A6] max-w-xl mx-auto">
              Issued by Prince Pipes and Fittings Limited — certifying LBow Network Solutions as an
              Authorised Dealer for 2025–2027. Every product you receive is genuine and manufacturer-backed.
            </p>
          </div>

          {/* Certificate Image */}
          <div className="relative max-w-3xl mx-auto">
            {/* Glow ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#2E7D32]/25 via-transparent to-[#2E7D32]/10 blur-sm pointer-events-none" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
              <Image
                src="/images/dealer-certificate.jpeg"
                alt="Prince Pipes Authorised Dealer Certificate — LBow Network Solutions, Bangalore 2025–2027"
                width={1200}
                height={848}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
            {/* Verified badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#2E7D32] shadow-[0_8px_24px_rgba(46,125,50,0.35)] whitespace-nowrap">
              <CheckCircle size={13} className="text-white flex-shrink-0" />
              <span className="font-body font-semibold text-xs text-white uppercase tracking-[0.08em]">
                Verified Authorised Dealer
              </span>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center font-body text-xs text-[#A6A6A6]/50 mt-12 leading-relaxed">
            Certificate valid 2025–2027 &middot; Issued by Prince Pipes and Fittings Limited &middot; Signed by Executive Director Vipul Chheda
          </p>
        </div>
      </section>
    </>
  );
}
