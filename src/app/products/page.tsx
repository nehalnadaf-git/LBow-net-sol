import type { Metadata } from 'next';
import ProductsHero from '@/sections/products/ProductsHero';
import ProductsGrid from '@/sections/products/ProductsGrid';
import ProductBanner from '@/sections/products/ProductBanner';

export const metadata: Metadata = {
  title: 'Products — PPR Pipes & Fittings | LBow Network Solutions Bangalore',
  description:
    'Browse our complete range of PPR pipe fittings, PPRC chemical pipes, PPCH industrial pipelines, cooling tower systems and more. 10-year warranty on all products.',
  alternates: {
    canonical: 'https://lbownetworksolutions.com/products',
  },
  openGraph: {
    title: 'PPR Pipes, PPCH & PPRC Pipe Fittings | LBow Network Solutions',
    description: 'Full range of PPR, PPRC, PPCH industrial pipes & fittings. 10-year warranty. Authorized Prince Pipes dealer in Bangalore.',
    url: 'https://lbownetworksolutions.com/products',
    images: [{ url: 'https://lbownetworksolutions.com/og-image.jpg', width: 1200, height: 630, alt: 'LBow Network Solutions — PPR Pipe Products' }],
  },
};

export default function Products() {
  return (
    <>
      <ProductsHero />
      <ProductsGrid />
      <ProductBanner />
    </>
  );
}
