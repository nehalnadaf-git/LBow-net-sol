import type { Metadata } from 'next';
import AboutHero from '@/sections/about/AboutHero';
import OurStory from '@/sections/about/OurStory';
import BusinessDetails from '@/sections/about/BusinessDetails';
import Categories from '@/sections/about/Categories';
import { localBusinessSchemaBase, BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About Us — LBow Network Solutions | PPR Pipe Dealers Bangalore',
  description:
    "Learn about LBow Network Solutions — established in 2018, we are one of Bangalore's leading PPR pipe fitting dealers and industrial piping solution providers.",
  alternates: {
    canonical: 'https://lbownetworksolutions.com/about',
  },
  openGraph: {
    title: 'About LBow Network Solutions | PPR Pipe Dealers Bangalore',
    description: "Established in 2018. Bangalore's trusted PPR pipe fitting dealer and industrial piping solution provider.",
    url: 'https://lbownetworksolutions.com/about',
    images: [{ url: 'https://lbownetworksolutions.com/og-image.jpg', width: 1200, height: 630, alt: 'LBow Network Solutions — About Us' }],
  },
};

export default function About() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: `${BASE_URL}/about` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchemaBase) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutHero />
      <OurStory />
      <BusinessDetails />
      <Categories />
    </>
  );
}
