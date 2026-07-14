import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ClientProviders from '@/components/ClientProviders';

export const metadata: Metadata = {
  title: 'LBow Network Solutions — PPR Pipe Fitting Dealers in Bangalore | Peenya',
  description:
    "LBow Network Solutions is Bangalore's trusted PPR pipe fitting dealer and industrial piping solution provider. 10 year warranty. Free demo available. Call +91 8123501407.",
  keywords:
    'PPR pipe fittings, PPCH pipe, PPRC chemical pipe, cooling tower pipeline, pipe dealers Bangalore, Peenya, industrial piping solutions',
  authors: [{ name: 'LBow Network Solutions' }],
  alternates: {
    canonical: 'https://lbownetworksolutions.com',
  },
  openGraph: {
    type: 'website',
    title: 'LBow Network Solutions — PPR Pipe Fitting Dealers in Bangalore',
    description:
      "Bangalore's trusted PPR pipe fitting dealer and industrial piping solution provider since 2018. 10 year warranty.",
    url: 'https://lbownetworksolutions.com',
    siteName: 'LBow Network Solutions',
    images: [
      {
        url: 'https://lbownetworksolutions.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LBow Network Solutions — PPR Pipe Fitting Dealers in Bangalore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LBow Network Solutions — PPR Pipe Fitting Dealers in Bangalore',
    description: "Bangalore's trusted PPR pipe fitting dealer since 2018. 10 year warranty.",
    images: ['https://lbownetworksolutions.com/og-image.jpg'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'LBow',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
  // maximumScale intentionally omitted — pinch-zoom must remain accessible on iOS
};


const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LBow Network Solutions',
  url: 'https://lbownetworksolutions.com',
  logo: 'https://lbownetworksolutions.com/web-app-manifest-512x512.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-8123501407',
    contactType: 'customer service',
    availableLanguage: ['English', 'Kannada', 'Hindi'],
  },
  foundingDate: '2018',
  sameAs: [
    'https://www.google.com/maps/place/?q=place_id:0x3bae3d3b529b6b31:0x2146b1eb2fa96ce7',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'LBow Network Solutions',
  url: 'https://lbownetworksolutions.com',
  description: 'PPR Pipe Fitting Dealers and Industrial Piping Solution Provider in Bangalore',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="LBow" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="13.0461059;77.5210481" />
        <meta name="ICBM" content="13.0461059, 77.5210481" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <ClientProviders>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </ClientProviders>
      </body>
    </html>
  );
}
