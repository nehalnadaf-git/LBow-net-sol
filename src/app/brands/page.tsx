import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { brands } from '@/lib/brands';
import { BASE_URL, localBusinessSchemaBase } from '@/lib/seo';
import { CheckCircle, Award } from 'lucide-react';
import { PipeFlowBg } from '@/components/backgrounds/PipeFlowBg';

export const metadata: Metadata = {
  title: 'Brands We Carry | Prince Pipes Authorized Dealer Bangalore | LBow',
  description:
    'LBow Network Solutions is an Authorized Dealer for Prince Pipes and Fittings Limited in Bangalore (certificate 2025–2027). Call +91 8123501407.',
  alternates: { canonical: `${BASE_URL}/brands` },
};

export default function BrandsIndex() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchemaBase) }} />

      {/* Hero */}
      <section className="relative overflow-hidden w-full bg-[#0A0A0B] pt-28 sm:pt-36 md:pt-44 pb-16 sm:pb-24 text-center">
        <PipeFlowBg isLight={false} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
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
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group bg-white rounded-xl border border-[rgba(30,32,33,0.12)] hover:border-[#0A0A0B] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Certificate thumbnail — Prince Pipes only */}
                {brand.slug === 'prince-pipes' && (
                  <div className="w-full h-36 overflow-hidden bg-[#f5ede6] flex-shrink-0 relative">
                    <Image
                      src="/images/dealer-certificate.jpeg"
                      alt="Prince Pipes Authorised Dealer Certificate"
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
                    <div className="absolute top-2 right-2 inline-flex items-center gap-1 bg-[#2E7D32] text-white text-[0.6rem] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      <Award size={9} />
                      Certified
                    </div>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
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
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
