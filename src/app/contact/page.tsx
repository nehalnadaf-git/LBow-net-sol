import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactHero from '@/sections/contact/ContactHero';
import ContactSplit from '@/sections/contact/ContactSplit';
import MapSection from '@/sections/contact/MapSection';

export const metadata: Metadata = {
  title: 'Contact Us — Get a Free Quote | LBow Network Solutions Bangalore',
  description:
    'Contact LBow Network Solutions for PPR pipe fittings, PPCH pipelines, cooling tower systems. Call +91 8123501407. Located at T Dasarahalli, Bangalore.',
  alternates: {
    canonical: 'https://lbownetworksolutions.com/contact',
  },
};

export default function Contact() {
  return (
    <>
      <ContactHero />
      <Suspense fallback={null}>
        <ContactSplit />
      </Suspense>
      <MapSection />
    </>
  );
}

