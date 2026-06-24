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