export interface BrandFAQ {
  question: string;
  answer: string;
}

export interface Brand {
  slug: string;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  dealershipDetails: {
    certificateValidFrom: string;
    certificateValidTo: string;
    signedBy: string;
    designation: string;
    dealerCity: string;
  };
  productRange: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  faqs: BrandFAQ[];
}

export const brands: Brand[] = [
  {
    slug: 'prince-pipes',
    name: 'Prince Pipes',
    fullName: 'Prince Pipes and Fittings Limited',
    tagline: 'Authorized Dealer in Bangalore — Prince Pipes and Fittings Limited',
    description: `LBow Network Solutions is an Authorized Dealer for Prince Pipes and Fittings Limited in Bangalore. Our dealership is backed by a verified Authorized Dealership Certificate issued by Prince Pipes and Fittings Limited, valid from 2025 to 2027, signed by Vipul Chheda, Executive Director of Prince Pipes.

Prince Pipes and Fittings Limited is one of India's leading manufacturers of piping systems and fittings, with a wide product portfolio including pipes, fittings, water tanks, and bathware. The company operates multiple manufacturing plants across India and has an established distribution network serving builders, plumbers, contractors, and industrial customers nationwide.

As the Authorized Dealer for Prince Pipes in Bangalore, LBow Network Solutions offers:

**Genuine Prince Pipes Products**: All Prince Pipes products supplied by LBow Network Solutions are genuine manufacturer-authorised products. Our authorized dealership status ensures that customers receive authentic products with full manufacturer warranty and quality assurance.

**Comprehensive Product Range**: Our dealership covers the Prince Pipes product portfolio including pipes (PPR, UPVC, CPVC, SWR, column pipes), fittings (a complete range to match the pipe systems), water storage tanks (Sintex, Aqua, and other Prince Pipes branded tanks), and bathware products.

**Bangalore Coverage**: Our Prince Pipes supply serves Bangalore and the Bangalore Urban/Rural region. For enquiries about Prince Pipes products, contact LBow Network Solutions at +91 8123501407.

**Technical Support**: Our team is knowledgeable about the Prince Pipes product range and can advise on product selection, sizing, and compatibility for your project requirements.

In addition to our Prince Pipes authorized dealership, LBow Network Solutions also supplies an independent range of industrial PPR, PPRC, and PPCH pipes (unbranded/generic) for industrial and commercial customers requiring specific industrial-grade piping solutions beyond the Prince Pipes branded range.`,
    dealershipDetails: {
      certificateValidFrom: '2025',
      certificateValidTo: '2027',
      signedBy: 'Vipul Chheda',
      designation: 'Executive Director, Prince Pipes and Fittings Limited',
      dealerCity: 'Bangalore',
    },
    productRange: [
      'Pipes (PPR, UPVC, CPVC, SWR, Column Pipes)',
      'Fittings (complete range matching pipe systems)',
      'Water Storage Tanks',
      'Bathware products',
    ],
    metaTitle: 'Prince Pipes Authorized Dealer in Bangalore | LBow Network Solutions',
    metaDescription:
      'LBow Network Solutions is an Authorized Dealer for Prince Pipes and Fittings Limited in Bangalore (certificate 2025–2027). Call +91 8123501407.',
    keywords: [
      'Prince Pipes authorized dealer Bangalore',
      'Prince Pipes dealer Bangalore',
      'Prince Pipes fittings Bangalore',
      'Prince Pipes water tank Bangalore',
      'authorized pipe dealer Bangalore',
    ],
    faqs: [
      {
        question: 'Is LBow Network Solutions an Authorized Dealer for Prince Pipes?',
        answer:
          'Yes. LBow Network Solutions holds an Authorized Dealership Certificate from Prince Pipes and Fittings Limited, valid from 2025 to 2027, signed by Vipul Chheda, Executive Director. All Prince Pipes products we supply are genuine manufacturer-authorised products.',
      },
      {
        question: 'Which Prince Pipes products can LBow Network Solutions supply in Bangalore?',
        answer:
          'As an Authorized Dealer, we can supply the Prince Pipes product range including pipes (PPR, UPVC, CPVC, SWR, and column pipes), fittings (full range matching the pipe systems), water storage tanks, and bathware products.',
      },
      {
        question: 'Does LBow Network Solutions only supply Prince Pipes branded products?',
        answer:
          'No. In addition to our Prince Pipes authorized dealership, we also supply an independent range of industrial PPR, PPRC, and PPCH pipes (unbranded/generic) from our own supply line. This industrial range is suited to B2B and industrial customers requiring specific high-pressure or chemical-resistant piping specifications.',
      },
      {
        question: 'Does Prince Pipes offer a product warranty?',
        answer:
          'Prince Pipes and Fittings Limited provides manufacturer warranties on their products. Please contact us for specific warranty terms for the product you are purchasing. Our authorized dealer status ensures that any warranty claims can be properly registered and processed.',
      },
      {
        question: 'Can you supply Prince Pipes products for a large project in Bangalore?',
        answer:
          'Yes. We handle Prince Pipes supply for both small-scale and large project requirements in Bangalore. Contact us with your project take-off list or specifications and we will provide a competitive quotation with delivery arrangement.',
      },
    ],
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
