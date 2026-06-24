import HeroSection from '@/sections/home/HeroSection';
import TrustBadges from '@/sections/home/TrustBadges';
import AboutIntro from '@/sections/home/AboutIntro';
import ProductsPreview from '@/sections/home/ProductsPreview';
import ServicesOverview from '@/sections/home/ServicesOverview';
import VideoReveal from '@/sections/home/VideoReveal';
import CTABanner from '@/sections/home/CTABanner';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <AboutIntro />
      <ProductsPreview />
      <ServicesOverview />
      <VideoReveal />
      <CTABanner />
    </>
  );
}
