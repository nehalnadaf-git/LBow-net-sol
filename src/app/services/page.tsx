import type { Metadata } from 'next';
import ServicesHero from '@/sections/services/ServicesHero';
import ServicesDetail from '@/sections/services/ServicesDetail';
import ServiceArea from '@/sections/services/ServiceArea';

export const metadata: Metadata = {
  title: 'Services — Industrial Piping Solutions | LBow Network Solutions',
  description:
    'Professional pipe supply, installation, FRP lining, cooling tower pipelines, and air compressor pipe line services across Bangalore by LBow Network Solutions.',
  alternates: {
    canonical: 'https://lbownetworksolutions.com/services',
  },
};

export default function Services() {
  return (
    <>
      <ServicesHero />
      <ServicesDetail />
      <ServiceArea />
    </>
  );
}