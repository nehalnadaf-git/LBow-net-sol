import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ClientProviders from '@/components/ClientProviders';

export const metadata: Metadata = {
  title: 'LBow Network Solutions — PPR Pipe Fitting Dealers in Bangalore | T Dasarahalli',
  description:
    "LBow Network Solutions is Bangalore's trusted PPR pipe fitting dealer and industrial piping solution provider. 10 year warranty. Free delivery above 22K within 22Km. Call +91 9606419076.",
  keywords:
    'PPR pipe fittings, PPCH pipe, PPRC chemical pipe, cooling tower pipeline, pipe dealers Bangalore, T Dasarahalli, industrial piping solutions',
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
  maximumScale: 5,
};

const BASE_URL = 'https://lbownetworksolutions.com';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'LBow Network Solutions',
  description: 'PPR Pipe Fitting Dealers and Industrial Piping Solution Provider in Bangalore',
  url: BASE_URL,
  telephone: '+91-9606419076',
  email: 'lbownetwork9solutions@gmail.com',
  logo: `${BASE_URL}/web-app-manifest-512x512.png`,
  image: `${BASE_URL}/og-image.jpg`,
  hasMap: 'https://www.google.com/maps/place/?q=place_id:0x3bae3d9fc3dcf213:0xec0a5df81eedd4dd',
  sameAs: [
    'https://www.google.com/maps/place/?q=place_id:0x3bae3d9fc3dcf213:0xec0a5df81eedd4dd',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '51/3, Officers Model Colony, T Dasarahalli, Opposite Eco Fresh Mart',
    addressLocality: 'Bangalore',
    postalCode: '560057',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.0461059,
    longitude: 77.5210481,
  },
  areaServed: [
    'T Dasarahalli', 'Peenya', 'Nelamangala', 'Hesaraghatta',
    'Yeshwanthpur', 'Rajajinagar', 'Vijayanagar', 'Magadi Road',
    'Koramangala', 'Electronic City', 'Whitefield', 'Hosur Road', 'Bangalore',
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
  paymentAccepted: 'Net Banking, Cheque, Demand Draft, UPI, Cash',
  currenciesAccepted: 'INR',
  priceRange: '$$',
  foundingDate: '2018',
  vatID: '29AUIPV4726C2ZB',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LBow Network Solutions',
  url: BASE_URL,
  logo: `${BASE_URL}/web-app-manifest-512x512.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9606419076',
    contactType: 'customer service',
    availableLanguage: ['English', 'Kannada', 'Hindi'],
  },
  foundingDate: '2018',
  sameAs: [
    'https://www.google.com/maps/place/?q=place_id:0x3bae3d9fc3dcf213:0xec0a5df81eedd4dd',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'LBow Network Solutions',
  url: BASE_URL,
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
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
