import { localBusinessSchemaBase } from '@/lib/seo';
import HeroSection from '@/sections/home/HeroSection';
import TrustBadges from '@/sections/home/TrustBadges';
import AboutIntro from '@/sections/home/AboutIntro';
import ProductsPreview from '@/sections/home/ProductsPreview';
import ServicesOverview from '@/sections/home/ServicesOverview';
import ReviewsSection from '@/sections/home/ReviewsSection';
import VideoReveal from '@/sections/home/VideoReveal';
import CTABanner from '@/sections/home/CTABanner';

const videoObjectSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'Industrial Piping Excellence — LBow Network Solutions',
  description:
    'LBow Network Solutions — industrial piping specialists in Bangalore. Supplying PPR, PPRC, PPCH pipes and fittings for cooling towers, chiller lines, compressor pipelines, and process pipework since 2018.',
  thumbnailUrl: 'https://lbownetworksolutions.com/images/img-001.webp',
  uploadDate: '2024-06-01T00:00:00+05:30',
  duration: 'PT30S',
  contentUrl:
    'https://res.cloudinary.com/djdzxaenj/video/upload/v1782307818/Video-Hero_hixatu.mp4',
  embedUrl: 'https://lbownetworksolutions.com/#video-reveal',
  publisher: {
    '@type': 'Organization',
    name: 'LBow Network Solutions',
    url: 'https://lbownetworksolutions.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://lbownetworksolutions.com/web-app-manifest-512x512.png',
    },
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchemaBase) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectSchema) }}
      />
      <HeroSection />
      <TrustBadges />
      <AboutIntro />
      <ProductsPreview />
      <ServicesOverview />
      <VideoReveal />
      <ReviewsSection />
      <CTABanner />
    </>
  );
}

