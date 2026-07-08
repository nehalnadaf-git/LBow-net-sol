import type { Metadata } from 'next';
import Link from 'next/link';
import { locations, getTier1Locations, getTier2CityLocations } from '@/lib/locations';
import { BASE_URL, localBusinessSchemaBase } from '@/lib/seo';
import { MapPin } from 'lucide-react';
import { DotMatrixBg } from '@/components/backgrounds/DotMatrixBg';

export const metadata: Metadata = {
  title: 'Locations — Where We Supply | LBow Network Solutions Bangalore',
  description:
    'LBow Network Solutions supplies PPR & PPCH pipes across Bangalore industrial zones, Karnataka cities, and pan-India. Free demo available. Call +91 8123501407.',
  keywords: ['PPR pipe supplier Bangalore', 'pipe dealer Bangalore industrial areas', 'PPCH pipe Karnataka supply'],
  alternates: {
    canonical: `${BASE_URL}/locations`,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Locations', item: `${BASE_URL}/locations` },
  ],
};

const tier1 = getTier1Locations();
const tier2Cities = getTier2CityLocations();
const combined = locations.find((l) => l.slug === 'karnataka-supply');
const panIndia = locations.find((l) => l.slug === 'pan-india-supply');

function LocationCard({ location }: { location: { slug: string; displayName: string; tagline: string; dominantIndustries: string[]; tier: number } }) {
  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group bg-white rounded-xl overflow-hidden border border-[rgba(30,32,33,0.12)] transition-all duration-300 hover:border-[#0A0A0B] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] p-5 sm:p-6 flex flex-col"
    >
      <div className="flex items-center gap-2 mb-3">
        <MapPin size={16} className="text-[#2E7D32]" />
        <span className="font-heading font-semibold text-base sm:text-lg text-[#0A0A0B]">
          {location.displayName}
        </span>
      </div>
      <p className="font-body text-sm text-[#434343] leading-relaxed mb-4 flex-1">
        {location.tagline}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {location.dominantIndustries.slice(0, 3).map((ind, i) => (
          <span key={i} className="bg-[rgba(46,125,50,0.08)] text-[#2E7D32] rounded-full px-2.5 py-0.5 font-body text-[0.65rem] font-medium">
            {ind}
          </span>
        ))}
      </div>
      <span className="font-body font-semibold text-sm text-[#0A0A0B] group-hover:text-[#2E7D32] transition-colors">
        View Details →
      </span>
    </Link>
  );
}

export default function LocationsIndex() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchemaBase) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section
        className="relative overflow-hidden w-full pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 text-center"
        style={{ background: 'linear-gradient(160deg, #F0F7F1 0%, #FAFFFE 35%, #EDF4FF 70%, #F4FBF5 100%)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none" style={{ background: 'linear-gradient(90deg, #2E7D32 0%, #1565C0 100%)' }} />
        <DotMatrixBg isLight={true} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="font-body font-medium text-xs sm:text-sm uppercase tracking-[0.1em] mb-4" style={{ color: '#2E7D32' }}>
            Service Coverage
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-[3rem] lg:text-[3.5rem] leading-[1.1] mb-6" style={{ background: 'linear-gradient(90deg, #2E7D32 0%, #1565C0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Where We Supply — Bangalore, Karnataka &amp; Pan-India
          </h1>
          <p className="font-body text-sm sm:text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#3D5040' }}>
            From our base in T Dasarahalli, Bangalore — serving industrial zones across the city, Karnataka, and nationwide.
          </p>
        </div>
      </section>

      {/* Tier 1: Bangalore Industrial Zones */}
      <section className="relative w-full bg-[#FAFAF9] py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-[rgba(46,125,50,0.08)] text-[#2E7D32] px-4 py-1.5 rounded-full font-body text-xs font-medium mb-4">
              Free Demo Available
            </div>
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-[#0A0A0B]">
              Bangalore Industrial Zones
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {tier1.map((loc) => (
              <LocationCard key={loc.slug} location={loc} />
            ))}
          </div>
        </div>
      </section>

      {/* Tier 2: Karnataka Cities */}
      <section className="relative w-full py-16 sm:py-20 lg:py-28" style={{ background: 'linear-gradient(180deg, #0D1118 0%, #0F1520 50%, #0D1118 100%)' }}>
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-white/5 text-[#A6A6A6] px-4 py-1.5 rounded-full font-body text-xs font-medium mb-4">
              Courier &amp; Freight Delivery
            </div>
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-white">
              Karnataka Cities
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {tier2Cities.map((loc) => (
              <div
                key={loc.slug}
                className="rounded-xl border border-white/5 hover:border-white/15 transition-all duration-300 p-5 sm:p-6"
                style={{ background: 'linear-gradient(135deg, #0D1118 0%, #131c2e 100%)' }}
              >
                <Link href={`/locations/${loc.slug}`} className="group block">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={16} className="text-[#2E7D32]" />
                    <span className="font-heading font-semibold text-base text-white">{loc.displayName}</span>
                  </div>
                  <p className="font-body text-sm text-[#A6A6A6] leading-relaxed mb-4">{loc.tagline}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {loc.dominantIndustries.slice(0, 3).map((ind, i) => (
                      <span key={i} className="bg-[rgba(46,125,50,0.1)] text-[#2E7D32] rounded-full px-2.5 py-0.5 font-body text-[0.65rem] font-medium">
                        {ind}
                      </span>
                    ))}
                  </div>
                  <span className="font-body font-semibold text-sm text-[#A6A6A6] group-hover:text-white transition-colors">
                    View Details →
                  </span>
                </Link>
              </div>
            ))}

            {/* Combined Karnataka page */}
            {combined && (
              <div
                className="rounded-xl border border-white/5 hover:border-white/15 transition-all duration-300 p-5 sm:p-6"
                style={{ background: 'linear-gradient(135deg, #0D1118 0%, #131c2e 100%)' }}
              >
                <Link href={`/locations/${combined.slug}`} className="group block">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={16} className="text-[#2E7D32]" />
                    <span className="font-heading font-semibold text-base text-white">{combined.displayName}</span>
                  </div>
                  <p className="font-body text-sm text-[#A6A6A6] leading-relaxed mb-4">
                    Tumakuru, Davanagere, Hassan &amp; Raichur — courier and freight supply.
                  </p>
                  <span className="font-body font-semibold text-sm text-[#A6A6A6] group-hover:text-white transition-colors">
                    View Details →
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tier 3: Pan-India */}
      {panIndia && (
        <section className="relative w-full bg-[#FAFAF9] py-16 sm:py-20">
          <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
            <div className="bg-white rounded-xl border border-[rgba(30,32,33,0.12)] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-[rgba(46,125,50,0.08)] text-[#2E7D32] px-3 py-1 rounded-full font-body text-xs font-medium mb-3">
                  Pan-India Delivery
                </div>
                <h2 className="font-heading font-semibold text-xl sm:text-2xl text-[#0A0A0B] mb-2">
                  We Also Deliver Across India
                </h2>
                <p className="font-body text-sm text-[#434343] max-w-xl">
                  Courier (small orders) and freight truck (bulk) to Gujarat, Maharashtra, Tamil Nadu, Telangana, and all states. No minimum order quantity.
                </p>
              </div>
              <Link
                href={`/locations/${panIndia.slug}`}
                className="inline-flex items-center gap-2 bg-[#0A0A0B] hover:bg-[#434343] text-[#EEEEEE] font-body font-semibold rounded-md px-6 py-3 transition-all duration-300 text-sm whitespace-nowrap"
              >
                Pan-India Supply Details →
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
