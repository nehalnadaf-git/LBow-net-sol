export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  specifications: ProductSpec[];
  applications: string[];
  industries: string[];
  relatedProducts: string[];
  image: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  faqs: ProductFAQ[];
}

export const products: Product[] = [
  {
    slug: 'ppr-pipe-unions',
    name: 'PPR Pipe Unions',
    category: 'Pipe Union',
    tagline: 'Leak-proof brass-insert unions for hot and cold water systems',
    shortDescription:
      'High-quality PPR pipe unions with brass inserts for reliable, leak-proof connections in hot and cold water distribution systems.',
    fullDescription: `PPR (Polypropylene Random Copolymer) pipe unions are precision-engineered fittings designed for creating separable, leak-proof joints in water distribution and industrial plumbing systems. Manufactured from virgin PPR resin, these unions incorporate brass inserts for superior threaded connections that resist corrosion and maintain torque integrity over the long term.

The heat fusion (socket fusion) welding process creates a molecular-level bond between the union body and the PPR pipe, eliminating the risk of joint separation under pressure or thermal expansion. This makes PPR pipe unions the ideal choice for both hot water (up to 95°C) and cold water systems in residential, commercial, and light industrial applications.

At LBow Network Solutions, our PPR pipe unions are sourced from manufacturers who adhere to industry-standard production specifications, ensuring dimensional consistency and pressure integrity across every batch. The unions are available in sizes ranging from ½ inch to 4 inches to accommodate varying flow requirements.

These unions are particularly valuable in maintenance-prone sections of a pipeline, as they allow individual pipe segments or equipment (such as pumps, meters, and filters) to be disconnected and serviced without cutting the pipe. The dual-union design further simplifies disassembly in confined spaces.

Our 10-year product warranty covers manufacturing defects, and all unions undergo pressure testing before dispatch.`,
    specifications: [
      { label: 'Material', value: 'PPR (Polypropylene Random Copolymer)' },
      { label: 'Insert Material', value: 'Brass (for threaded connections)' },
      { label: 'Temperature Rating', value: 'Up to 95°C (continuous service)' },
      { label: 'Pressure Rating', value: 'PN10 / PN16 (1.0–1.6 MPa)' },
      { label: 'Color', value: 'Green / Grey' },
      { label: 'Joining Method', value: 'Heat fusion (socket fusion) welding' },
      { label: 'Size Range', value: '½ inch to 4 inches (DN15–DN110)' },
      { label: 'Standard', value: 'Manufactured to industry-standard specifications' },
      { label: 'Warranty', value: '10 years' },
    ],
    applications: [
      'Hot and cold water distribution systems',
      'Domestic plumbing and commercial buildings',
      'Industrial process water lines',
      'Equipment isolation (pumps, filters, meters)',
      'HVAC chilled water circuits',
      'Food and beverage facility water supply',
    ],
    industries: [
      'Manufacturing plants',
      'Commercial construction',
      'Food processing',
      'Pharmaceuticals',
      'HVAC contractors',
    ],
    relatedProducts: ['ppr-pipe-fittings', 'ppch-industrial-pipeline', 'cooling-tower-pipeline'],
    image: '/images/product-ppr-unions.webp',
    metaTitle: 'PPR Pipe Unions in Bangalore | LBow Network Solutions',
    metaDescription:
      'Buy PPR pipe unions with brass inserts in Bangalore. Hot & cold water rated up to 95°C, 10-year warranty. Call +91 9606419076.',
    keywords: [
      'PPR pipe unions Bangalore',
      'brass insert PPR union',
      'PPR pipe union supplier Bangalore',
      'hot water pipe union',
      'heat fusion pipe fittings',
    ],
    faqs: [
      {
        question: 'What temperature can PPR pipe unions handle?',
        answer:
          'PPR pipe unions are rated for continuous service up to 95°C, making them suitable for hot water supply lines, solar water heater systems, and light industrial hot-process lines.',
      },
      {
        question: 'How are PPR pipe unions joined to the pipeline?',
        answer:
          'PPR pipe unions are joined using heat fusion (socket fusion) welding. A special welding tool heats both the pipe end and the union socket simultaneously to the fusion temperature, and they are then pressed together to form a permanent, monolithic joint.',
      },
      {
        question: 'Why do PPR pipe unions have brass inserts?',
        answer:
          'Brass inserts provide the threaded connection point where the union mates with other fittings or equipment. Brass is corrosion-resistant and maintains thread integrity under torque, preventing the softening or deformation that can occur with pure plastic threads over time.',
      },
      {
        question: 'What sizes of PPR pipe unions are available?',
        answer:
          'We supply PPR pipe unions from ½ inch (DN15) up to 4 inches (DN110). Contact us with your specific size requirements and we will confirm stock availability and lead time.',
      },
      {
        question: 'Do you offer free delivery for PPR pipe union orders in Bangalore?',
        answer:
          'Yes. We offer free delivery within 22km of our T Dasarahalli, Bangalore location. For locations beyond 22km, delivery charges apply — orders are dispatched by courier (small quantities) or freight truck (bulk orders) with no minimum order quantity.',
      },
    ],
  },
  {
    slug: 'pprc-chemical-pipe',
    name: 'PPRC Chemical Pipe',
    category: 'Chemical Pipe',
    tagline: 'Superior chemical resistance for industrial process pipelines',
    shortDescription:
      'PPRC pipes engineered for chemical resistance in industrial plants, pharmaceutical facilities, and processing environments.',
    fullDescription: `PPRC (Polypropylene Random Copolymer - Chemical grade) pipes are specifically formulated for use in aggressive chemical environments where standard piping materials would corrode, degrade, or contaminate the process fluid. The inherent inertness of polypropylene makes PPRC an ideal material for transporting a wide range of acids, alkalis, salts, and organic compounds at elevated temperatures.

Unlike metal pipes that require protective coatings or linings, PPRC chemical pipes are chemically inert throughout their wall thickness. This eliminates the risk of lining delamination and ensures a consistent bore diameter over the pipe's service life — a critical factor in precise-flow applications.

PPRC chemical pipes are joined using the same heat fusion welding method as standard PPR pipes, creating seamless, homogeneous joints that offer the same chemical resistance as the pipe body itself. There are no adhesives, solvent cements, or mechanical fasteners at the joint — eliminating the common failure point present in other plastic pipe systems.

At LBow Network Solutions, we supply PPRC chemical pipes for industrial customers in Bangalore's pharmaceutical corridor (Jigani, Bommasandra), chemical processing facilities, and laboratory infrastructure. The pipes are available in straight lengths and can be combined with PPRC fittings (tees, elbows, reducers, flanges) for complete system installation.

The blue and green colour coding distinguishes PPRC chemical pipes from standard PPR pipes, preventing mix-ups during installation and maintenance.`,
    specifications: [
      { label: 'Material', value: 'PPRC (Chemical Grade Polypropylene Random Copolymer)' },
      { label: 'Temperature Rating', value: 'Up to 95°C' },
      { label: 'Chemical Resistance', value: 'Resistant to acids, alkalis, salts, and most organic solvents' },
      { label: 'Color', value: 'Blue / Green (chemical-grade identification)' },
      { label: 'Joining Method', value: 'Heat fusion (socket fusion / butt fusion) welding' },
      { label: 'Shape', value: 'Round (circular cross-section)' },
      { label: 'Standard', value: 'Manufactured to industry-standard specifications' },
      { label: 'Warranty', value: '10 years' },
    ],
    applications: [
      'Chemical dosing and transfer lines',
      'Pharmaceutical process pipelines',
      'Laboratory acid/alkali drainage',
      'Electroplating and surface treatment facilities',
      'Water treatment chemical feed lines',
      'Fertilizer and agrochemical plants',
    ],
    industries: [
      'Pharmaceuticals and biotechnology',
      'Chemical manufacturing',
      'Water treatment',
      'Electronics manufacturing',
      'Fertilizer production',
      'Research and testing laboratories',
    ],
    relatedProducts: ['ppch-industrial-pipeline', 'ppr-pipe-fittings', 'frp-lining-chiller-pipes'],
    image: '/images/product-pprc-pipe.webp',
    metaTitle: 'PPRC Chemical Pipe Supplier in Bangalore | LBow Network Solutions',
    metaDescription:
      'PPRC chemical-resistant pipes for industrial plants and pharma facilities in Bangalore. Heat fusion welded, up to 95°C. Call +91 9606419076.',
    keywords: [
      'PPRC chemical pipe Bangalore',
      'chemical resistant pipe supplier Bangalore',
      'PPRC pipe industrial Bangalore',
      'polypropylene chemical pipe',
      'pharma grade pipe Bangalore',
    ],
    faqs: [
      {
        question: 'What chemicals is PPRC pipe resistant to?',
        answer:
          'PPRC pipes are resistant to most dilute and concentrated acids (hydrochloric, sulphuric, phosphoric), alkalis (sodium hydroxide, potassium hydroxide), salts, and a wide range of organic solvents. For specific chemical compatibility, we recommend consulting a chemical resistance chart for polypropylene.',
      },
      {
        question: 'Is PPRC pipe suitable for pharmaceutical clean rooms?',
        answer:
          'Yes. PPRC chemical pipes are non-toxic, non-leaching, and maintain a smooth bore that resists biofilm accumulation. They are widely used in pharmaceutical and biotech facilities for process water and chemical transfer lines.',
      },
      {
        question: 'What is the difference between PPR and PPRC pipe?',
        answer:
          'Both are made from polypropylene random copolymer, but PPRC (chemical grade) uses a specific formulation that enhances chemical resistance. Standard PPR is optimised for water service (hot/cold), while PPRC is specifically designed for chemical transport applications.',
      },
      {
        question: 'Can PPRC pipe be used outdoors?',
        answer:
          'PPRC pipes have limited UV resistance and should be protected from prolonged direct sunlight in outdoor installations. Underground installation or use of UV-protective sleeves/cladding is recommended for exposed outdoor runs.',
      },
      {
        question: 'Do you supply PPRC fittings to match the pipes?',
        answer:
          'Yes. We supply matching PPRC fittings including elbows, tees, couplers, reducers, and flanges to complete your chemical pipeline system. Contact us for a system quotation.',
      },
    ],
  },
  {
    slug: 'ppch-industrial-pipeline',
    name: 'PPCH Pipe Line for Industrial',
    category: 'Industrial Pipeline',
    tagline: 'High-pressure PPCH pipelines rated up to 16 bar for heavy industry',
    shortDescription:
      'PPCH industrial pipelines designed for compressed air, high-pressure process systems, and demanding manufacturing environments up to 16 bar.',
    fullDescription: `PPCH (Polypropylene Copolymer High-pressure) pipes represent the heavy-duty tier of polypropylene piping solutions. Engineered specifically for high-pressure industrial applications, PPCH pipelines are rated up to 16 bar working pressure — significantly exceeding the capabilities of standard PPR or PPRC systems — while retaining the corrosion-free, low-maintenance characteristics that make polypropylene the material of choice for modern industrial facilities.

PPCH industrial pipelines are the preferred choice for compressed air distribution, high-pressure process water systems, industrial chilled water circuits, and other demanding applications where metal pipework would be susceptible to corrosion, scaling, or conductivity issues.

The heat fusion welding joint technology eliminates threaded and flanged connections as potential leak points, creating a fully continuous, homogeneous pipeline system. This is especially valuable in compressed air systems, where even minor leaks represent significant energy losses and operational inefficiency.

Unlike steel or copper pipework, PPCH does not corrode, scale internally, or require external protective coatings. This translates directly into lower lifetime maintenance costs and ensures that compressed air or process fluid remains free from rust or scale contamination.

LBow Network Solutions has installed PPCH industrial pipelines for manufacturing facilities across Bangalore's industrial belt — including factories in Peenya, Nelamangala, and Bommasandra industrial areas. Our experienced technical team can advise on pressure system design, pipe sizing, and flow rate optimisation.`,
    specifications: [
      { label: 'Material', value: 'PPCH (Polypropylene Copolymer High-pressure)' },
      { label: 'Working Pressure', value: 'Up to 16 bar (1.6 MPa)' },
      { label: 'Temperature Rating', value: 'Suitable for industrial operating temperatures' },
      { label: 'Joining Method', value: 'Heat fusion (socket fusion / electrofusion) welding' },
      { label: 'Type', value: 'Industrial pressure pipe' },
      { label: 'Applications', value: 'Compressed air, high-pressure process, chilled water' },
      { label: 'Standard', value: 'Manufactured to industry-standard specifications' },
      { label: 'Warranty', value: '10 years' },
    ],
    applications: [
      'Compressed air distribution systems (up to 16 bar)',
      'Industrial process water high-pressure lines',
      'Chilled water circuits in large HVAC systems',
      'Pneumatic tool supply networks',
      'High-pressure rinse and wash systems',
      'Industrial automation fluid circuits',
    ],
    industries: [
      'Automotive manufacturing',
      'Machine tool and engineering',
      'Textile manufacturing',
      'Food and beverage processing',
      'Electronics assembly',
      'General manufacturing',
    ],
    relatedProducts: ['ppch-pipe-fittings', 'air-compressor-pipeline', 'cooling-tower-pipeline'],
    image: '/images/product-ppch-industrial.webp',
    metaTitle: 'PPCH Industrial Pipeline Supplier Bangalore | LBow Network Solutions',
    metaDescription:
      'PPCH high-pressure industrial pipelines rated up to 16 bar in Bangalore. Compressed air, process systems. Call +91 9606419076.',
    keywords: [
      'PPCH industrial pipeline Bangalore',
      'high pressure pipe Bangalore',
      'compressed air pipe system Bangalore',
      'PPCH pipe 16 bar',
      'industrial pipe supplier Bangalore',
    ],
    faqs: [
      {
        question: 'What pressure rating does PPCH pipe support?',
        answer:
          'PPCH industrial pipelines are rated for working pressures up to 16 bar (1.6 MPa). This makes them suitable for compressed air distribution, high-pressure process water, and other demanding industrial applications.',
      },
      {
        question: 'Is PPCH pipe suitable for compressed air systems?',
        answer:
          'Yes. PPCH is widely used for compressed air distribution networks in factories and manufacturing plants. The heat fusion welded joints are leak-free, which is critical for energy efficiency in compressed air systems where even small leaks cause significant power wastage.',
      },
      {
        question: 'How does PPCH compare to steel pipe for industrial use?',
        answer:
          'PPCH does not corrode, does not require painting or protective coatings, and has a smooth bore that resists scaling. While steel pipe has greater structural strength, PPCH offers superior corrosion resistance, lower weight, and significantly lower installation and lifetime maintenance costs for fluid transport applications.',
      },
      {
        question: 'Can PPCH pipe be used for high-temperature industrial applications?',
        answer:
          'PPCH is suitable for typical industrial operating temperatures. For applications exceeding standard temperature limits, please contact us to discuss the specific system requirements and we will recommend the most appropriate piping solution.',
      },
      {
        question: 'What sizes of PPCH industrial pipe do you supply?',
        answer:
          'We supply PPCH industrial pipes across a range of diameters to suit different flow and pressure requirements. Contact us with your system specifications — flow rate, pressure, and run lengths — and we will provide appropriate sizing recommendations.',
      },
    ],
  },
  {
    slug: 'ppr-pipe-fittings',
    name: 'PPR Pipe Fittings',
    category: 'Pipe Fittings',
    tagline: 'Complete range of PPR elbows, tees, couplers and reducers',
    shortDescription:
      'Full range of PPR pipe fittings including elbows, tees, couplers, and reducers for building complete PPR pipeline systems.',
    fullDescription: `PPR pipe fittings form the connective backbone of any PPR piping system. At LBow Network Solutions, we supply a comprehensive range of PPR fittings engineered to match the material properties and pressure ratings of PPR pipes — ensuring a uniform, monolithic system from supply to point-of-use.

Our PPR fitting range includes: elbows (45° and 90°), equal and reducing tees, straight couplers, reducing couplers, end caps, cross joints, male and female threaded adapters (with brass inserts), pipe clips and supports, ball valves, and check valves — everything required to build a complete PPR pipeline system for hot water, cold water, or process fluid distribution.

All fittings are joined using heat fusion (socket fusion) welding, the same process used for PPR pipes. This creates a fully homogeneous joint with no adhesives, solvent cements, or O-ring seals that could fail over time. Properly executed heat fusion joints are stronger than the pipe body itself and carry the same pressure and temperature ratings.

PPR fittings are dimensionally engineered to match the pipe outer diameters, ensuring precise alignment and full-bore flow without turbulence-inducing restrictions at joints. The smooth internal bore of PPR pipe and fittings minimises pressure drop and flow resistance compared to metal fittings with rougher bores.

At LBow Network Solutions, we stock PPR fittings in sizes from ½ inch (DN15) to 4 inches (DN110), covering the full range of residential, commercial, and light industrial piping requirements. Our technical team can assist with take-off calculations for complete projects to ensure no items are missed.`,
    specifications: [
      { label: 'Material', value: 'PPR (Polypropylene Random Copolymer)' },
      { label: 'Temperature Rating', value: 'Up to 95°C (continuous service)' },
      { label: 'Pressure Rating', value: 'PN10 / PN16 (1.0–1.6 MPa)' },
      { label: 'Color', value: 'Green' },
      { label: 'Joining Method', value: 'Heat fusion (socket fusion) welding' },
      { label: 'Size Range', value: '½ inch to 4 inches (DN15–DN110)' },
      { label: 'Types Available', value: 'Elbows, tees, couplers, reducers, end caps, adapters, valves' },
      { label: 'Warranty', value: '10 years' },
    ],
    applications: [
      'Residential and commercial hot/cold water plumbing',
      'Industrial process water distribution',
      'Solar water heater systems',
      'HVAC chilled and hot water circuits',
      'Agricultural irrigation headers',
      'Swimming pool and water treatment piping',
    ],
    industries: [
      'Construction and real estate',
      'Manufacturing plants',
      'Hotels and hospitality',
      'Food and beverage',
      'Pharmaceuticals',
      'HVAC contractors',
    ],
    relatedProducts: ['ppr-pipe-unions', 'pprc-chemical-pipe', 'cooling-tower-pipeline'],
    image: '/images/product-ppr-fittings.webp',
    metaTitle: 'PPR Pipe Fittings Dealer in Bangalore | LBow Network Solutions',
    metaDescription:
      'PPR elbows, tees, couplers, reducers — complete range from Bangalore dealer. 10-year warranty, heat fusion welded. Call +91 9606419076.',
    keywords: [
      'PPR pipe fittings Bangalore',
      'PPR elbow tee coupler Bangalore',
      'PPR fittings dealer Bangalore',
      'heat fusion fittings Bangalore',
      'pipe fittings supplier Bangalore',
    ],
    faqs: [
      {
        question: 'What types of PPR fittings do you stock?',
        answer:
          'We stock a comprehensive range including 90° and 45° elbows, equal and reducing tees, straight and reducing couplers, end caps, cross joints, male and female threaded adapters with brass inserts, ball valves, and pipe supports. Contact us for a full catalogue.',
      },
      {
        question: 'Can PPR fittings be used with standard PPR pipes from other brands?',
        answer:
          'PPR fittings are dimensionally standardised and will typically be compatible with PPR pipes of the same nominal diameter from any manufacturer, provided both comply with the same dimensional standards. However, we recommend using fittings and pipes from a consistent source for guaranteed compatibility.',
      },
      {
        question: 'How are PPR fittings connected to PPR pipes?',
        answer:
          'PPR fittings are joined using heat fusion (socket fusion) welding. The pipe end and fitting socket are simultaneously heated to fusion temperature using a welding tool, then quickly pressed together and held for a few seconds while the joint solidifies. No adhesives, solvents, or clamps are needed.',
      },
      {
        question: 'What is the maximum temperature for PPR fittings?',
        answer:
          'PPR fittings are rated for continuous service up to 95°C, matching the temperature rating of PPR pipes. This covers all typical hot water supply applications including solar water heaters and central hot water systems.',
      },
      {
        question: 'Do you offer bulk pricing for PPR fittings?',
        answer:
          'Yes. We offer competitive pricing for bulk project orders with no minimum order quantity. Contact us at +91 9606419076 or via WhatsApp with your project take-off list for a custom quote.',
      },
    ],
  },
  {
    slug: 'ppch-pipe-fittings',
    name: 'PPCH Pipe Fittings',
    category: 'PPCH Fittings',
    tagline: 'High-pressure PPCH fittings for industrial compressed air and process systems',
    shortDescription:
      'PPCH fittings rated up to 16 bar for completing PPCH high-pressure industrial pipeline systems in factories and processing plants.',
    fullDescription: `PPCH pipe fittings are the high-pressure counterparts to standard PPR fittings, engineered to match the pressure and performance specifications of PPCH industrial pipelines. With a working pressure rating up to 16 bar, PPCH fittings are designed for compressed air systems, high-pressure process lines, and other demanding industrial applications where standard plastic fittings would be inadequate.

The PPCH fitting range includes all the connective components required to build a complete high-pressure industrial pipeline system: 90° and 45° elbows for direction changes, tees and wyes for branch connections, couplers and reducers for pipe joining and size transitions, flanged adapters for equipment connections, and end caps for system termination.

Like PPCH pipes, all PPCH fittings are joined using heat fusion welding technology. This is especially critical in high-pressure systems — the fusion-welded joint creates a homogeneous, seamless connection that matches the full pressure rating of the pipe and fitting, with no O-ring seals, adhesives, or mechanical clamps that could become the weakest point in the system.

PPCH fittings are particularly valuable in compressed air distribution networks where leak-free performance is not just a quality concern but a direct energy efficiency and cost factor. A well-installed PPCH compressed air system with fusion-welded fittings can operate for decades with minimal maintenance.

At LBow Network Solutions, we supply PPCH pipe fittings to manufacturing plants, engineering works, and industrial contractors across Bangalore and Karnataka. Our technical team can assist with system design, pipe routing, and fitting selection for new installations and system upgrades.`,
    specifications: [
      { label: 'Material', value: 'PPCH (Polypropylene Copolymer High-pressure)' },
      { label: 'Working Pressure', value: 'Up to 16 bar (1.6 MPa)' },
      { label: 'Joining Method', value: 'Heat fusion welding' },
      { label: 'Types Available', value: 'Elbows, tees, couplers, reducers, flanged adapters, end caps' },
      { label: 'Compatibility', value: 'Designed for use with PPCH industrial pipes' },
      { label: 'Applications', value: 'Compressed air, high-pressure process, industrial fluid systems' },
      { label: 'Warranty', value: '10 years' },
    ],
    applications: [
      'Compressed air distribution network connections',
      'High-pressure industrial process system joints',
      'Branch connections in manufacturing plant pipework',
      'Equipment connections in pneumatic systems',
      'Industrial chiller and cooling system connections',
      'Size transitions in multi-diameter pressure systems',
    ],
    industries: [
      'Automotive manufacturing',
      'Machine tool and engineering',
      'Textile production',
      'Food and beverage processing',
      'Pharmaceutical manufacturing',
      'Electronics and semiconductor fabrication',
    ],
    relatedProducts: ['ppch-industrial-pipeline', 'air-compressor-pipeline', 'ppr-pipe-fittings'],
    image: '/images/product-ppch-fittings.webp',
    metaTitle: 'PPCH Pipe Fittings Supplier Bangalore | LBow Network Solutions',
    metaDescription:
      'PPCH high-pressure fittings up to 16 bar for industrial compressed air and process systems in Bangalore. Call +91 9606419076.',
    keywords: [
      'PPCH pipe fittings Bangalore',
      'high pressure pipe fittings Bangalore',
      'PPCH fittings industrial Bangalore',
      'compressed air pipe fittings',
      'industrial pipe fittings supplier Bangalore',
    ],
    faqs: [
      {
        question: 'What pressure rating do PPCH fittings support?',
        answer:
          'PPCH pipe fittings are rated for working pressures up to 16 bar (1.6 MPa), matching the pressure capability of PPCH industrial pipes. This makes them suitable for compressed air systems and high-pressure industrial process lines.',
      },
      {
        question: 'Can PPCH fittings be used with PPR or PPRC pipes?',
        answer:
          'No. PPCH fittings are specifically designed for PPCH pipes and the dimensions may differ from standard PPR pipe fittings. Mixing PPCH fittings with PPR pipes (or vice versa) is not recommended as it may result in incompatible joint dimensions and reduced pressure integrity.',
      },
      {
        question: 'Are PPCH fittings suitable for outdoor industrial installations?',
        answer:
          'PPCH fittings have limited UV resistance. For outdoor installations, we recommend providing UV protection through cladding, insulation, or paint. Underground or enclosed installations are preferred. Contact us for guidance on your specific application.',
      },
      {
        question: 'How are PPCH fittings connected in a compressed air system?',
        answer:
          'PPCH fittings are joined using heat fusion welding, which creates a seamless, homogeneous joint rated to the same pressure as the pipe body. In compressed air systems, this eliminates potential leak points at every joint — a critical factor since compressed air leaks represent wasted energy and increased compressor running costs.',
      },
      {
        question: 'Do you supply PPCH fittings for system upgrades or repairs?',
        answer:
          'Yes. We supply PPCH fittings for both new installations and system upgrades or repairs. Bring us your system drawing or describe your requirements and we can provide a complete fitting list and quotation.',
      },
    ],
  },
  {
    slug: 'cooling-tower-pipeline',
    name: 'Cooling Tower Pipeline',
    category: 'Cooling System',
    tagline: 'Corrosion-resistant piping systems for industrial cooling tower circuits',
    shortDescription:
      'PPR and PPCH cooling tower pipeline systems for industrial facilities — corrosion-free, low-maintenance, and engineered for continuous operation.',
    fullDescription: `Industrial cooling towers are among the most demanding environments for piping systems. The combination of continuously circulating water, dissolved minerals, biocides, and scale inhibitors creates a corrosive environment that rapidly degrades conventional metal pipework. PPR and PPCH cooling tower pipeline systems offer a superior alternative — inherently corrosion-free, scale-resistant, and capable of maintaining flow rates and pressure integrity over decades of continuous service.

Cooling tower piping circuits typically comprise a supply line (chilled water or condenser water from the tower to the process equipment), a return line (warm water returning to the tower for cooling), bypass lines, and chemical dosing connections. At LBow Network Solutions, we design and supply complete cooling tower pipeline packages — pipes, fittings, valves, and unions — tailored to the specific flow rates and pressure requirements of each installation.

PPR pipes are the standard choice for cooling tower circuits operating at ambient to moderately elevated temperatures, while PPCH pipes are selected for applications requiring higher working pressures. Both materials are fully compatible with standard water treatment chemicals used in cooling tower maintenance, including biocides, scale inhibitors, and corrosion inhibitors.

The heat fusion welded joint system eliminates potential leak points — a critical factor in cooling tower circuits where water loss represents both an operational and water treatment cost. Unlike flanged or threaded metal connections that require periodic re-tightening and gasket replacement, fusion-welded PPR/PPCH joints remain permanently leak-free under normal operating conditions.

We have supplied cooling tower pipeline systems for industrial facilities across Bangalore's manufacturing belt, including food processing plants, pharmaceutical manufacturers, and heavy engineering works. Our 10-year product warranty provides assurance of long-term performance.`,
    specifications: [
      { label: 'Pipe Material', value: 'PPR or PPCH depending on pressure requirements' },
      { label: 'Working Pressure', value: 'PPR: up to 1.6 MPa; PPCH: up to 16 bar' },
      { label: 'Chemical Compatibility', value: 'Compatible with standard cooling tower treatment chemicals' },
      { label: 'Joining Method', value: 'Heat fusion welding (leak-free permanent joints)' },
      { label: 'Temperature Range', value: 'Suitable for cooling tower operating temperatures' },
      { label: 'Components Supplied', value: 'Pipes, fittings, unions, valves, supports' },
      { label: 'Warranty', value: '10 years' },
    ],
    applications: [
      'Industrial cooling tower supply and return circuits',
      'Condenser water distribution systems',
      'Chilled water secondary circuits',
      'Chemical dosing connection headers',
      'Cooling water bypass and balancing lines',
      'Evaporative cooler distribution piping',
    ],
    industries: [
      'Food and beverage manufacturing',
      'Pharmaceutical and biotech',
      'Automotive and heavy engineering',
      'Plastic and rubber manufacturing',
      'Data centres and server rooms',
      'Textile manufacturing',
    ],
    relatedProducts: ['ppch-industrial-pipeline', 'frp-lining-chiller-pipes', 'air-compressor-pipeline'],
    image: '/images/product-cooling-tower.webp',
    metaTitle: 'Cooling Tower Pipeline Supplier Bangalore | LBow Network Solutions',
    metaDescription:
      'PPR & PPCH cooling tower pipeline systems for industrial facilities in Bangalore. Corrosion-free, heat fusion welded. Call +91 9606419076.',
    keywords: [
      'cooling tower pipeline Bangalore',
      'cooling tower pipe supplier Bangalore',
      'industrial cooling system piping',
      'PPR cooling tower pipe',
      'PPCH cooling water pipeline',
    ],
    faqs: [
      {
        question: 'What type of pipe is best for cooling tower circuits?',
        answer:
          'PPR pipes are suitable for most standard cooling tower circuits operating at ambient to moderate temperatures and pressures. For higher-pressure chiller systems or applications requiring greater mechanical strength, PPCH pipes rated up to 16 bar are recommended. We can advise on the appropriate selection for your specific system.',
      },
      {
        question: 'Are PPR/PPCH pipes compatible with cooling tower treatment chemicals?',
        answer:
          'Yes. Both PPR and PPCH are chemically resistant to the standard range of cooling tower treatment chemicals, including biocides (chlorine, bromine compounds), scale inhibitors, and corrosion inhibitors used in industrial water treatment programmes.',
      },
      {
        question: 'How long do PPR/PPCH cooling tower pipelines last?',
        answer:
          'PPR and PPCH cooling tower pipelines are designed for long service life. Our products carry a 10-year warranty, and properly installed polypropylene pipe systems routinely deliver 20–30 years of service life in typical cooling tower environments — significantly outlasting metal pipework in corrosive water conditions.',
      },
      {
        question: 'Can you supply a complete cooling tower piping package?',
        answer:
          'Yes. We supply complete cooling tower piping packages including pipes, elbows, tees, couplers, unions, ball valves, and support brackets. Contact us with your system layout or flow/pressure specifications for a custom package quotation.',
      },
      {
        question: 'Do you provide cooling tower pipeline installation guidance?',
        answer:
          'Yes. We provide technical guidance on pipe sizing, pressure drop calculations, and heat fusion welding best practices. For large industrial installations, our team can also assist with on-site technical support for the installation team.',
      },
    ],
  },
  {
    slug: 'frp-lining-chiller-pipes',
    name: 'FRP Lining in Chiller Pipe Lines',
    category: 'Pipe Lining',
    tagline: 'Extend chiller pipe service life by 10+ years with FRP protective lining',
    shortDescription:
      'FRP (Fibre Reinforced Plastic) lining for chiller pipe lines — protects against internal corrosion and extends service life by 10+ years.',
    fullDescription: `FRP (Fibre Reinforced Plastic) lining is a protective rehabilitation technique applied to the interior of existing chiller pipe lines that have begun showing signs of corrosion, pitting, or reduced flow capacity due to scale buildup. Rather than replacing the entire pipe system — a costly and time-consuming process that requires plant shutdown — FRP lining provides a cost-effective alternative that restores the pipe's internal bore, eliminates corrosion, and significantly extends the pipe's remaining service life.

The FRP lining process involves cleaning the internal pipe surface to remove existing corrosion and scale, then applying a fibre-reinforced epoxy composite layer that bonds permanently to the pipe wall. The result is a smooth, corrosion-resistant interior surface that prevents future oxidation and scale adhesion, restoring the original flow characteristics of the pipe.

Key benefits of FRP lining for chiller pipes:
- Extends pipe service life by 10+ years (delaying full pipe replacement)
- Eliminates ongoing corrosion without full system shutdown
- Restores smooth bore for improved flow efficiency
- Provides a chemical barrier against aggressive cooling water chemistry
- Cost-effective compared to full pipe replacement, especially for large-diameter chiller mains
- Minimal disruption to plant operations during installation

FRP lining is particularly valuable for industrial chiller systems in Bangalore's manufacturing sector, where chiller downtime directly impacts production capacity. The lining is applied in situ (in-place) without removing the pipe from service for extended periods.

At LBow Network Solutions, we provide FRP lining services for chiller pipe lines as part of our industrial piping solutions portfolio. We also supply complete chiller pipe systems (PPR/PPCH) for new installations where replacement is the preferred option.`,
    specifications: [
      { label: 'Lining Material', value: 'Fibre Reinforced Plastic (FRP) — epoxy composite' },
      { label: 'Service Life Extension', value: '10+ years beyond current pipe condition' },
      { label: 'Application Method', value: 'In-situ (in-place) lining without pipe removal' },
      { label: 'Internal Surface', value: 'Smooth bore restoring original flow characteristics' },
      { label: 'Chemical Resistance', value: 'Resistant to chiller water chemistry and treatment chemicals' },
      { label: 'Temperature Rating', value: 'Suitable for chiller operating temperatures' },
      { label: 'Pipe Diameter', value: 'Applicable to a range of pipe diameters — contact for specifics' },
    ],
    applications: [
      'Chiller plant supply and return main pipe rehabilitation',
      'Industrial cooling circuit pipe restoration',
      'District cooling system pipe lining',
      'Corroded process pipe internal protection',
      'Large-diameter pipe corrosion barrier installation',
      'Flow restoration for scaled or pitted chiller pipes',
    ],
    industries: [
      'Pharmaceutical and biotech manufacturing',
      'Food and beverage processing',
      'Data centres and IT facilities',
      'Automotive manufacturing',
      'Large commercial buildings with district cooling',
      'Hospital and healthcare facilities',
    ],
    relatedProducts: ['cooling-tower-pipeline', 'ppch-industrial-pipeline', 'air-compressor-pipeline'],
    image: '/images/service-ppch-industrial.webp',
    metaTitle: 'FRP Lining for Chiller Pipes in Bangalore | LBow Network Solutions',
    metaDescription:
      'FRP lining for chiller pipe lines in Bangalore — extends service life 10+ years, restores flow. Industrial pipe rehabilitation. Call +91 9606419076.',
    keywords: [
      'FRP lining chiller pipes Bangalore',
      'chiller pipe rehabilitation Bangalore',
      'pipe lining service Bangalore',
      'FRP pipe lining industrial',
      'chiller pipe corrosion protection',
    ],
    faqs: [
      {
        question: 'What is FRP lining and how does it protect chiller pipes?',
        answer:
          'FRP (Fibre Reinforced Plastic) lining is a protective composite layer applied to the interior of existing pipes. It creates a smooth, corrosion-resistant barrier between the pipe wall and the flowing fluid, preventing further corrosion and scale buildup while restoring the original bore diameter.',
      },
      {
        question: 'How much can FRP lining extend the life of chiller pipes?',
        answer:
          'FRP lining can extend the service life of corroded chiller pipes by 10 or more years, depending on the original pipe condition and the operating environment. This provides a significant cost benefit compared to full pipe replacement, particularly for large-diameter mains where replacement costs are substantial.',
      },
      {
        question: 'Do chiller pipes need to be taken out of service for FRP lining?',
        answer:
          'FRP lining is an in-situ (in-place) process. While a controlled shutdown of the specific pipe section is required during lining application and curing, the process is significantly faster and less disruptive than full pipe replacement, which would require removal, cutting, and re-installation of new pipe sections.',
      },
      {
        question: 'Is FRP lining suitable for pipes with heavy corrosion?',
        answer:
          'FRP lining is most effective when the pipe retains structural integrity. For pipes with severe corrosion that has compromised the wall thickness, full replacement may be necessary. A pipe inspection (visual or ultrasonic thickness measurement) is recommended before deciding between lining and replacement.',
      },
      {
        question: 'Can you supply replacement PPR or PPCH pipes if lining is not suitable?',
        answer:
          'Yes. If inspection reveals that FRP lining is not appropriate due to pipe condition, we can supply complete PPR or PPCH replacement pipe systems. Contact us to discuss both options and we will help you make the most cost-effective decision for your situation.',
      },
    ],
  },
  {
    slug: 'air-compressor-pipeline',
    name: 'Air Compressor Pipe Line',
    category: 'Compressed Air',
    tagline: 'Leak-free PPCH compressed air distribution for factories and workshops',
    shortDescription:
      'Complete PPCH air compressor pipeline systems for factory compressed air distribution — rated up to 16 bar, heat fusion welded for zero-leak performance.',
    fullDescription: `A compressed air system is often called the "fourth utility" in manufacturing — alongside electricity, water, and gas. The efficiency of your compressed air distribution network has a direct impact on production capacity, energy consumption, and operating costs. PPCH air compressor pipelines provide the modern solution: a corrosion-free, leak-free, low-maintenance compressed air distribution system that is faster to install than metal pipework and significantly more efficient over its service life.

Compressed air leaks are the single biggest source of energy waste in most factory compressed air systems. Studies consistently show that poorly maintained metal pipe systems can waste 20–30% of compressed air output through leaks at corroded joints, worn fittings, and degraded thread connections. A PPCH compressed air pipeline eliminates these failure modes — heat fusion welded joints are permanently leak-free, and PPCH does not corrode internally.

The smooth bore of PPCH pipes also reduces pressure drop along the distribution main, ensuring consistent working pressure at every point-of-use outlet — whether powering pneumatic tools, feeding automated assembly equipment, or supplying air to industrial processes.

PPCH air compressor pipeline systems can be designed in ring main, radial spur, or combined layouts to suit any factory floor plan. We supply complete system packages including the main distribution ring, drop legs, isolation valves, pressure regulators, and drain points for condensate management.

At LBow Network Solutions, we have supplied PPCH compressed air pipeline systems for factories across Peenya, Nelamangala, Bommasandra, and Bidadi industrial areas in Bangalore. Our team can provide system design guidance, pipe sizing calculations, and technical specifications for your facility.`,
    specifications: [
      { label: 'Pipe Material', value: 'PPCH (Polypropylene Copolymer High-pressure)' },
      { label: 'Working Pressure', value: 'Up to 16 bar (1.6 MPa)' },
      { label: 'Joining Method', value: 'Heat fusion welding — permanent leak-free joints' },
      { label: 'Layout Options', value: 'Ring main, radial spur, or combined' },
      { label: 'Components', value: 'Pipes, elbows, tees, reducers, isolation valves, condensate drains' },
      { label: 'Internal Surface', value: 'Smooth bore — minimal pressure drop' },
      { label: 'Corrosion', value: 'Zero internal corrosion — no rust contamination of air supply' },
      { label: 'Warranty', value: '10 years' },
    ],
    applications: [
      'Factory compressed air distribution ring mains',
      'Workshop pneumatic tool supply networks',
      'Automated manufacturing line air supply',
      'Pneumatic conveying system air headers',
      'Industrial spray painting compressed air supply',
      'Packaging line and bottling plant air systems',
    ],
    industries: [
      'Automotive and auto-components manufacturing',
      'General engineering and machine shops',
      'Textile and garment manufacturing',
      'Food and beverage packaging',
      'Plastics processing and moulding',
      'Pharmaceutical manufacturing',
    ],
    relatedProducts: ['ppch-industrial-pipeline', 'ppch-pipe-fittings', 'cooling-tower-pipeline'],
    image: '/images/product-ppch-industrial.webp',
    metaTitle: 'Air Compressor Pipeline Supplier Bangalore | LBow Network Solutions',
    metaDescription:
      'PPCH compressed air distribution pipelines rated up to 16 bar for Bangalore factories. Leak-free heat fusion welded. Call +91 9606419076.',
    keywords: [
      'air compressor pipeline Bangalore',
      'compressed air pipe system Bangalore factory',
      'PPCH compressed air pipe',
      'factory compressed air distribution',
      'air compressor pipe supplier Bangalore',
    ],
    faqs: [
      {
        question: 'Why choose PPCH over aluminium or galvanised steel for compressed air pipes?',
        answer:
          'PPCH does not corrode internally, eliminating rust contamination of the compressed air supply — a common issue with galvanised steel that degrades over time. Unlike aluminium, PPCH is not subject to electrolytic corrosion. Heat fusion welded PPCH joints are permanently leak-free, reducing energy waste compared to threaded metal connections that leak over time.',
      },
      {
        question: 'What working pressure is the PPCH air compressor pipeline rated for?',
        answer:
          'PPCH air compressor pipelines are rated for working pressures up to 16 bar (1.6 MPa). Most factory compressed air systems operate at 6–10 bar, so PPCH provides a comfortable safety margin for standard industrial applications.',
      },
      {
        question: 'How do compressed air leaks affect energy costs?',
        answer:
          'In typical factory compressed air systems, leaks account for 20–30% of total compressed air output. This wasted air requires the compressor to run longer, consuming more electricity. A leak-free PPCH system can reduce compressed air energy costs significantly — often paying for the system upgrade within a few years through energy savings alone.',
      },
      {
        question: 'Can you design a compressed air distribution system layout for our factory?',
        answer:
          'Yes. We provide technical consultation for compressed air system design, including ring main sizing, pressure drop calculations, drop leg positioning, and condensate management. Contact us with your factory floor plan and operating pressure requirements.',
      },
      {
        question: 'Do you supply the complete compressed air pipeline system or just the pipes?',
        answer:
          'We supply complete compressed air pipeline packages including PPCH pipes, elbows, tees, reducers, isolation valves, condensate drains, and pipe supports. We can supply either individual components or a complete system package based on your requirements.',
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as Product[];
}
