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
  openGraph: {
    title: 'Industrial Piping Services — LBow Network Solutions Bangalore',
    description: 'Pipe supply, installation, FRP lining, cooling tower pipelines & air compressor piping across Bangalore.',
    url: 'https://lbownetworksolutions.com/services',
    images: [{ url: 'https://lbownetworksolutions.com/og-image.jpg', width: 1200, height: 630, alt: 'LBow Network Solutions — Industrial Piping Services' }],
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
