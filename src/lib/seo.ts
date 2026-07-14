export const BASE_URL = 'https://lbownetworksolutions.com';

export const geoCoordinates = {
  latitude: 13.0461059,
  longitude: 77.5210481,
};

export const PLACE_ID = '0x3bae3d9fc3dcf213:0xec0a5df81eedd4dd';

export const defaultMetaTitle = 'PPR & PPCH Pipe Dealer in Bangalore | LBow Network Solutions';
export const defaultMetaDescription =
  "LBow Network Solutions — Authorized Prince Pipes dealer & industrial PPR, PPRC, PPCH pipe supplier in Bangalore since 2018. Free demo available. Call +91 8123501407.";

export const defaultKeywords = [
  'PPR pipe dealer Bangalore',
  'PPCH industrial pipe Bangalore',
  'PPRC chemical pipe Bangalore',
  'Prince Pipes authorized dealer Bangalore',
  'industrial piping solutions Bangalore',
  'cooling tower pipeline Bangalore',
  'FRP lining chiller pipes',
  'air compressor pipeline',
  'Peenya pipe supplier',
];

export const localBusinessSchemaBase = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'LBow Network Solutions',
  description:
    'Authorized Prince Pipes dealer and industrial PPR, PPRC, PPCH pipe supplier in Bangalore. 8+ years of experience since 2018.',
  url: BASE_URL,
  telephone: '+91-8123501407',
  email: 'lbownetwork9solutions@gmail.com',
  logo: `${BASE_URL}/web-app-manifest-512x512.png`,
  image: `${BASE_URL}/og-image.jpg`,
  hasMap: `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`,
  sameAs: [`https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No.273/2, ST No.20/20/1, 8th Main Road, 8th Cross, Opp. RTO Track, Peenya 1st Block, Peenya 1st Stage',
    addressLocality: 'Bengaluru',
    postalCode: '560058',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: geoCoordinates.latitude,
    longitude: geoCoordinates.longitude,
  },
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
  founder: {
    '@type': 'Person',
    name: 'Neeladhar Naick Vadithe',
    jobTitle: 'Proprietor',
  },
  vatID: '29AUIPV4726C2ZB',
  identifier: [
    { '@type': 'PropertyValue', name: 'GSTIN', value: '29AUIPV4726C2ZB' },
    { '@type': 'PropertyValue', name: 'Udyam Registration Number', value: 'UDYAM-KR-03-0717969' },
  ],
};
