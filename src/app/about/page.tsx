import type { Metadata } from 'next';
import AboutHero from '@/sections/about/AboutHero';
import OurStory from '@/sections/about/OurStory';
import BusinessDetails from '@/sections/about/BusinessDetails';
import Categories from '@/sections/about/Categories';

export const metadata: Metadata = {
  title: 'About Us — LBow Network Solutions | PPR Pipe Dealers Bangalore',
  description:
    "Learn about LBow Network Solutions — established in 2018, we are one of Bangalore's leading PPR pipe fitting dealers and industrial piping solution providers.",
  alternates: {
    canonical: 'https://lbownetworksolutions.com/about',
  },
};

export default function About() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <BusinessDetails />
      <Categories />
    </>
  );
}
