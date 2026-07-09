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

      <LocationHero
        h1Suffix={location.h1Suffix}
        tagline={location.tagline}
        tier={location.tier}
        breadcrumb={
          <nav className="font-body text-xs text-[#6B7280] flex gap-2 items-center">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-[#0A0F1E] transition-colors">Locations</Link>
            <span>/</span>
            <span className="text-[#0A0F1E]">{location.displayName}</span>
          </nav>
        }
      />
      <LocationContent location={location} />
      <LocationFAQSection faqs={location.faqs} locationName={location.displayName} />
    </>
  );
}
