export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQItem[] = [
  // ── General ────────────────────────────────────────────────────────
  {
    category: 'General',
    question: 'What is LBow Network Solutions?',
    answer:
      'LBow Network Solutions is a Bangalore-based PPR pipe fitting dealer and industrial piping solution provider, established in 2018. We are an Authorized Dealer for Prince Pipes and Fittings Limited and also supply an independent industrial range of PPR, PPRC, and PPCH pipes and fittings for industrial and commercial customers.',
  },
  {
    category: 'General',
    question: 'Where is LBow Network Solutions located?',
    answer:
      'No.273/2, ST No.20/20/1, 8th Main 8th Cross, Opp. RTO Track, Peenya 1st Stage, Peenya, Bengaluru – 560058. We are open Monday to Saturday, 9:00 AM to 7:00 PM.',
  },
  {
    category: 'General',
    question: 'How long has LBow Network Solutions been in business?',
    answer:
      'LBow Network Solutions was established in 2018. We have 8+ years of experience supplying PPR, PPRC, PPCH, and Prince Pipes branded piping solutions to residential, commercial, and industrial customers across Bangalore and Karnataka.',
  },
  {
    category: 'General',
    question: 'What are your business hours?',
    answer:
      'We are open Monday to Saturday, 9:00 AM to 7:00 PM. We are closed on Sundays. For urgent enquiries outside business hours, you can reach us via WhatsApp at +91 8123501407.',
  },
  {
    category: 'General',
    question: 'What payment methods do you accept?',
    answer:
      'We accept Net Banking, Cheque, Demand Draft, UPI, and Cash payments.',
  },

  // ── Ordering & MOQ ──────────────────────────────────────────────────
  {
    category: 'Ordering & MOQ',
    question: 'Is there a minimum order quantity?',
    answer:
      'No. There is no minimum order quantity (MOQ) at LBow Network Solutions. We supply both small single-item orders and large bulk procurement orders. Whether you need a few fittings for a repair job or complete piping for a large factory installation, we can fulfil your requirement.',
  },
  {
    category: 'Ordering & MOQ',
    question: 'How do I place an order?',
    answer:
      'You can place an order by calling us at +91 8123501407, sending a WhatsApp message to +91 8123501407, or emailing us at lbownetwork9solutions@gmail.com. For project orders, share your pipe schedule or specifications and we will provide a quotation.',
  },
  {
    category: 'Ordering & MOQ',
    question: 'Can I order just a few fittings or a single length of pipe?',
    answer:
      'Yes. We have no minimum order quantity. You can order as few items as you need — even a single fitting or a single pipe length. This is particularly useful for maintenance and repair requirements where you need to match a specific component.',
  },
  {
    category: 'Ordering & MOQ',
    question: 'Do you offer bulk discounts for large project orders?',
    answer:
      'Yes. We offer competitive pricing for bulk project orders. Contact us with your project take-off list or pipe schedule and we will provide a project-specific quotation. Call +91 8123501407 or WhatsApp us for a quick response.',
  },
  {
    category: 'Ordering & MOQ',
    question: 'Can I get a price quote before placing an order?',
    answer:
      'Yes. Contact us via phone (+91 8123501407), WhatsApp, or email with your requirements and we will provide a quotation promptly during business hours. We typically respond to enquiries within 2 hours.',
  },

  // ── Delivery & Logistics ──────────────────────────────────────────────
  {
    category: 'Delivery & Logistics',
    question: 'Do you offer a free demo in Bangalore?',
    answer:
      'Yes. We offer a free demo for all our product ranges — PPR, PPRC, PPCH pipes, fittings, valves, and pneumatic products. Visit our Peenya, Bengaluru location or call +91 8123501407 to schedule a demo.',
  },
  {
    category: 'Delivery & Logistics',
    question: 'What is the delivery charge for orders outside the 22km free zone?',
    answer:
      'Contact us with your location for delivery cost estimates. For urgent requirements, call +91 8123501407 or WhatsApp us.',
  },
  {
    category: 'Delivery & Logistics',
    question: 'Do you deliver to other cities in Karnataka?',
    answer:
      'Yes. We deliver to all Karnataka cities including Hubli-Dharwad, Mangaluru, Belagavi, Mysuru, Tumakuru, Davanagere, Hassan, Raichur, and others. Smaller orders go by courier, bulk orders by freight truck. Delivery charges apply. No minimum order quantity.',
  },
  {
    category: 'Delivery & Logistics',
    question: 'Do you deliver pipe orders across India?',
    answer:
      'Yes. We deliver industrial PPR, PPRC, and PPCH pipe orders across India via courier (smaller orders) and freight truck (bulk orders). Delivery charges apply for all locations outside our free 22km Bangalore zone. No minimum order quantity. Contact us for pan-India delivery pricing.',
  },
  {
    category: 'Delivery & Logistics',
    question: 'What is the typical delivery time?',
    answer:
      'For stock items within the free 22km Bangalore delivery zone, we can typically deliver same-day or next working day. For courier orders in Karnataka, transit time is 2–4 working days. For freight deliveries to other states, delivery time varies by location — contact us for an estimate.',
  },

  // ── Products ──────────────────────────────────────────────────────────
  {
    category: 'Products',
    question: 'What is the difference between PPR, PPRC, and PPCH pipes?',
    answer:
      'PPR (Polypropylene Random Copolymer) is the standard grade for hot and cold water systems, rated up to 95°C. PPRC (Chemical grade) is specifically formulated for chemical transport applications with enhanced chemical resistance. PPCH (Polypropylene Copolymer High-pressure) is the heavy-duty grade rated up to 16 bar working pressure, designed for compressed air and high-pressure industrial systems.',
  },
  {
    category: 'Products',
    question: 'What temperature can PPR pipes handle?',
    answer:
      'PPR pipes are rated for continuous service up to 95°C, making them suitable for hot water supply systems, solar water heater connections, and light industrial hot-water process lines.',
  },
  {
    category: 'Products',
    question: 'What pressure rating do PPCH pipes support?',
    answer:
      'PPCH industrial pipes are rated for working pressures up to 16 bar (1.6 MPa). This makes them suitable for compressed air distribution, high-pressure process water, and other demanding industrial applications where standard PPR or PPRC pipe would be inadequate.',
  },
  {
    category: 'Products',
    question: 'What is heat fusion welding and why is it important?',
    answer:
      'Heat fusion welding (socket fusion or butt fusion) is the standard joining method for PPR, PPRC, and PPCH pipes. The pipe end and fitting socket are simultaneously heated to fusion temperature, then pressed together to create a monolithic, permanently bonded joint. This joint has no adhesives, O-ring seals, or mechanical connections — making it permanently leak-free and as strong as the pipe body itself.',
  },
  {
    category: 'Products',
    question: 'What is the product warranty on your pipes?',
    answer:
      'Our pipes come with a 10-year product warranty covering manufacturing defects. This warranty applies to both our industrial unbranded range and the Prince Pipes branded products we supply.',
  },

  // ── Prince Pipes Dealership ────────────────────────────────────────────
  {
    category: 'Prince Pipes Dealership',
    question: 'Is LBow Network Solutions an Authorized Dealer for Prince Pipes?',
    answer:
      'Yes. LBow Network Solutions is an Authorized Dealer for Prince Pipes and Fittings Limited. Our dealership certificate is valid from 2025 to 2027, signed by Vipul Chheda, Executive Director of Prince Pipes and Fittings Limited.',
  },
  {
    category: 'Prince Pipes Dealership',
    question: 'Which Prince Pipes products can you supply?',
    answer:
      'As an Authorized Dealer, we supply the Prince Pipes product range including pipes (PPR, UPVC, CPVC, SWR, column pipes), fittings (a complete range matching the pipe systems), water storage tanks, and bathware products. Availability of specific products may vary — contact us to confirm.',
  },
  {
    category: 'Prince Pipes Dealership',
    question: 'Are your Prince Pipes products genuine?',
    answer:
      'Yes. All Prince Pipes products supplied by LBow Network Solutions are genuine manufacturer-authorised products. Our Authorized Dealer status ensures customers receive authentic Prince Pipes products with full manufacturer warranty.',
  },

  // ── Industrial Applications ────────────────────────────────────────────
  {
    category: 'Industrial Applications',
    question: 'What pipe is best for compressed air systems in a factory?',
    answer:
      'PPCH industrial pipelines are the recommended choice for factory compressed air systems. Rated up to 16 bar, PPCH provides the pressure capability needed for industrial air distribution while delivering permanently leak-free joints (heat fusion welded) that eliminate the energy waste associated with leaky metal compressed air systems. The smooth bore also minimises pressure drop.',
  },
  {
    category: 'Industrial Applications',
    question: 'What pipe is suitable for chemical plants and pharma facilities?',
    answer:
      'PPRC (chemical grade) pipes are the standard choice for chemical transfer and process lines in chemical plants and pharmaceutical facilities. PPRC is resistant to most acids, alkalis, salts, and organic solvents. For utility water and process water systems in these facilities, standard PPR is commonly used.',
  },
  {
    category: 'Industrial Applications',
    question: 'Can PPR or PPCH pipes be used in cooling tower systems?',
    answer:
      'Yes. PPR and PPCH pipes are both suitable for cooling tower circuit applications. PPR is used for lower-pressure cooling water distribution, while PPCH is specified for higher-pressure chiller circuits. Both are compatible with standard cooling tower water treatment chemicals and are corrosion-free in the mineral-rich cooling water environment.',
  },
  {
    category: 'Industrial Applications',
    question: 'What is FRP lining for chiller pipes and when is it needed?',
    answer:
      'FRP (Fibre Reinforced Plastic) lining is a rehabilitation technique applied to the interior of existing chiller pipes that have developed internal corrosion or scale buildup. It creates a smooth, corrosion-resistant inner layer that extends the pipe\'s service life by 10+ years. It is used as a cost-effective alternative to full pipe replacement when the pipe retains structural integrity but the interior surface is degraded.',
  },
  {
    category: 'Industrial Applications',
    question: 'Do you supply pipes for the pharmaceutical industry in Bangalore?',
    answer:
      'Yes. We supply PPRC chemical pipes and PPR process water pipes for pharmaceutical and biotech facilities in Bangalore, particularly in the Jigani and Bommasandra industrial areas where the pharma sector is concentrated. We understand the material and cleanliness requirements of pharmaceutical piping applications.',
  },
];

export const faqCategories = [
  'General',
  'Ordering & MOQ',
  'Delivery & Logistics',
  'Products',
  'Prince Pipes Dealership',
  'Industrial Applications',
] as const;

export type FAQCategory = typeof faqCategories[number];

export function getFAQsByCategory(category: FAQCategory): FAQItem[] {
  return faqs.filter((f) => f.category === category);
}
