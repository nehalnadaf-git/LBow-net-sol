import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactHero from '@/sections/contact/ContactHero';
import ContactSplit from '@/sections/contact/ContactSplit';
import MapSection from '@/sections/contact/MapSection';
import { localBusinessSchemaBase, BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us — Get a Free Quote | LBow Network Solutions Bangalore',
  description:
    'Contact LBow Network Solutions for PPR pipe fittings, PPCH pipelines, cooling tower systems. Call +91 8123501407. Located at Peenya, Bengaluru.',
  alternates: {
    canonical: 'https://lbownetworksolutions.com/contact',
  },
  openGraph: {
    title: 'Contact LBow Network Solutions — Get a Free Quote',
    description: 'PPR pipe fittings & industrial piping. Call +91 8123501407. Free demo available. Peenya, Bengaluru.',
    url: 'https://lbownetworksolutions.com/contact',
    images: [{ url: 'https://lbownetworksolutions.com/og-image.jpg', width: 1200, height: 630, alt: 'Contact LBow Network Solutions Bangalore' }],
  },
};

export default function Contact() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE_URL}/contact` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchemaBase) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ContactHero />
      <Suspense fallback={null}>
        <ContactSplit />
      </Suspense>
      <MapSection />
    </>
  );
}

