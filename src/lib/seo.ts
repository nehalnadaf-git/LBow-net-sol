export const BASE_URL = 'https://lbownetworksolutions.com';

export const geoCoordinates = {
  latitude: 13.0461059,
  longitude: 77.5210481,
};

export const PLACE_ID = '0x3bae3d9fc3dcf213:0xec0a5df81eedd4dd';

export const defaultMetaTitle = 'PPR & PPCH Pipe Dealer in Bangalore | LBow Network Solutions';
export const defaultMetaDescription =
  "LBow Network Solutions — Authorized Prince Pipes dealer & industrial PPR, PPRC, PPCH pipe supplier in Bangalore since 2018. Free delivery within 22km. Call +91 9606419076.";

export const defaultKeywords = [
  'PPR pipe dealer Bangalore',
  'PPCH industrial pipe Bangalore',
  'PPRC chemical pipe Bangalore',
  'Prince Pipes authorized dealer Bangalore',
  'industrial piping solutions Bangalore',
  'cooling tower pipeline Bangalore',
  'FRP lining chiller pipes',
  'air compressor pipeline',
  'T Dasarahalli pipe supplier',
];

export const localBusinessSchemaBase = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'LBow Network Solutions',
  description:
    'Authorized Prince Pipes dealer and industrial PPR, PPRC, PPCH pipe supplier in Bangalore. 8+ years of experience since 2018.',
  url: BASE_URL,
  telephone: '+91-9606419076',
  email: 'lbownetwork9solutions@gmail.com',
  logo: `${BASE_URL}/icon-512x512.png`,
  image: `${BASE_URL}/og-image.jpg`,
  hasMap: `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`,
  sameAs: [`https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`],
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
  vatID: '29AUIPV4726C2ZB',
};
