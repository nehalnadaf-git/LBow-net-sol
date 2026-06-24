import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { locations, getLocationBySlug } from '@/lib/locations';
import { BASE_URL, localBusinessSchemaBase } from '@/lib/seo';
import LocationHero from '@/sections/locations/LocationHero';
import LocationContent from '@/sections/locations/LocationContent';
import LocationFAQSection from '@/sections/locations/LocationFAQSection';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};
  return {
    title: location.metaTitle,
    description: location.metaDescription,
    keywords: location.keywords,
    alternates: {
      canonical: `${BASE_URL}/locations/${location.slug}`,
    },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: `${BASE_URL}/locations/${location.slug}`,
      siteName: 'LBow Network Solutions',
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  // LocalBusiness with area served
  const localBizSchema = {
    ...localBusinessSchemaBase,
    areaServed: location.type === 'pan-india' ? 'India' : [location.displayName, 'Bangalore', 'Karnataka'],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: location.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: `${BASE_URL}/locations` },
      { '@type': 'ListItem', position: 3, name: location.displayName, item: `${BASE_URL}/locations/${location.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <div className="absolute top-20 left-0 right-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <nav className="font-body text-xs text-white/60 flex gap-2 items-center pt-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations" className="hover:text-white transition-colors">Locations</Link>
          <span>/</span>
          <span className="text-white">{location.displayName}</span>
        </nav>
      </div>

      <LocationHero
        h1Suffix={location.h1Suffix}
        tagline={location.tagline}
        tier={location.tier}
      />
      <LocationContent location={location} />
      <LocationFAQSection faqs={location.faqs} locationName={location.displayName} />
    </>
  );
}
