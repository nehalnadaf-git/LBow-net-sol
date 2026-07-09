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
    slug: 'ppr-green-pipe',
    name: 'PPR Green Pipe & Fittings',
    category: 'PPR Pipes',
    tagline: 'Prince GREENFIT PP-R — IS:15801 certified hot & cold water pipe, 20mm to 160mm, up to 95°C',
    shortDescription:
      'Prince GREENFIT PPR (Polypropylene Random Copolymer) pipes and fittings for hot and cold water plumbing and industrial piping. IS:15801 certified, heat-fusion jointed, rated to 95°C continuous service. Available 20mm to 160mm.',
    fullDescription: `Prince GREENFIT PP-R (Polypropylene Random Copolymer) is a high-performance piping system for residential, commercial, and industrial hot and cold water distribution. At LBow Network Solutions, we are an authorised Prince dealer supplying the complete GREENFIT range across Bangalore and Karnataka.

GREENFIT pipes are manufactured from Polypropylene Random Copolymer resin and conform to IS:15801 (pipes) and DIN 16962 (fittings). They are compliant with IS:10500 for contact with foodstuff, pharmaceuticals, and drinking water, making them safe for potable water applications in kitchens, hospitals, food processing plants, and pharmaceutical facilities.

**Single-Layer and Triple-Layer Options:**
GREENFIT is available in single-layer (green) for indoor use and triple-layer construction (green outer, white middle, off-white inner) for outdoor UV-exposed installations. The triple-layer design provides ultraviolet resistance without compromising the internal food-grade surface.

**GREENFIT Thermex — Insulated Pipes:**
For extreme thermal environments, GREENFIT Thermex pipes incorporate an insulating layer that reduces linear expansion and contraction — particularly important in long-run, high-temperature installations.

**Heat-Fusion Jointing:**
GREENFIT pipes and fittings are joined by polyfusion (socket fusion) welding, which creates a homogeneous, monolithic bond stronger than the pipe body itself. No adhesives, solvent cements, or O-ring seals are used. A properly installed GREENFIT system has a design service life of 50+ years with zero joint maintenance.

**Key Performance Advantages:**
- Highly resistant to oxidation, calcification, and scaling — bore stays full-flow for life
- Bacteriologically neutral and non-toxic; safe for potable water and food contact
- Low coefficient of friction for excellent flow rates
- Good thermal insulation — minimises heat loss in hot water lines
- Excellent noise insulation properties
- Resistant to a wide range of industrial fluids and aggressive chemicals

We stock GREENFIT pipes from 20mm to 160mm and the complete fitting range (elbows, tees, couplers, reducers, end caps, threaded adapters with brass inserts, unions) for immediate dispatch from Bangalore.`,
    specifications: [
      { label: 'Material', value: 'PP-R — Polypropylene Random Copolymer (virgin resin)' },
      { label: 'Brand System', value: 'Prince GREENFIT (Authorised Dealer: LBow Network Solutions)' },
      { label: 'Colour', value: 'Green (single-layer) / Green-White-Off-White (triple-layer, UV-resistant)' },
      { label: 'Pipe Size Range', value: '20 mm to 315 mm (standard range)' },
      { label: 'Fitting Size Range', value: '20 mm to 315 mm' },
      { label: 'Temperature Range', value: 'Up to 95°C continuous service (insulation required below 0°C)' },
      { label: 'Pressure Rating (Pipes)', value: 'PN 10, PN 16, PN 20 (depending on size and class)' },
      { label: 'Pressure Rating (Fittings)', value: 'PN 20 and PN 25' },
      { label: 'Pipe Standard', value: 'IS:15801' },
      { label: 'Fitting Standard', value: 'DIN 16962' },
      { label: 'Water Quality Standard', value: 'IS:10500 — safe for drinking water, food, and pharma contact' },
      { label: 'Jointing Method', value: 'Polyfusion (socket fusion) heat-fusion welding — no adhesives' },
      { label: 'Special Variants', value: 'GREENFIT Triple-Layer (UV-resistant outdoor) | GREENFIT Thermex (thermally insulated)' },
      { label: 'Service Life', value: '50+ years (properly installed)' },
    ],
    applications: [
      'Indoor and outdoor hot and cold water distribution in residential and commercial buildings',
      'Industrial process water and fluid transport lines',
      'HVAC heating, cooling, and chilled water circuits (AHUs, cooling towers)',
      'Floor, wall, and radiator heating systems',
      'Solar water heater feed and return lines',
      'Drinking water, food and beverage facility water supply',
      'Pharmaceutical and clean water process lines',
      'Compressed air and industrial fluid transport',
    ],
    industries: [
      'Construction and real estate (residential and commercial)',
      'Manufacturing and industrial plants',
      'Food and beverage processing',
      'Pharmaceuticals and biotech',
      'HVAC and MEP contractors',
      'Hospitals and healthcare facilities',
      'Hotels and hospitality',
    ],
    relatedProducts: ['ppr-blue-pipe', 'ppr-fittings-green', 'brass-ball-valve'],
    image: '/images/product-ppr-green-pipe.webp',
    metaTitle: 'Prince GREENFIT PPR Pipe Supplier Bangalore | LBow Network Solutions',
    metaDescription:
      'Buy Prince GREENFIT PPR pipes 20mm–160mm in Bangalore. IS:15801 certified, up to 95°C, triple-layer UV option. Authorised Prince dealer. Call +91 8123501407.',
    keywords: [
      'Prince GREENFIT PPR pipe Bangalore',
      'PPR pipe supplier Bangalore',
      'IS 15801 PPR pipe',
      'Prince PPR pipe dealer Bangalore',
      'hot cold water PPR pipe Bangalore',
      'GREENFIT PPR industrial piping',
    ],
    faqs: [
      {
        question: 'What is Prince GREENFIT PPR pipe?',
        answer:
          'Prince GREENFIT is a Polypropylene Random Copolymer (PP-R) piping system manufactured by Prince Pipes & Fittings Ltd. It is certified to IS:15801 (pipes) and DIN 16962 (fittings) and is suitable for hot and cold water plumbing, industrial fluid lines, and HVAC systems. LBow Network Solutions is an authorised Prince dealer supplying GREENFIT across Bangalore.',
      },
      {
        question: 'What sizes of GREENFIT PPR pipe are available?',
        answer:
          'We supply Prince GREENFIT PPR pipes from 20mm to 160mm, covering the full standard range. Contact us for availability on specific sizes and pressure classes (PN10, PN16, PN20).',
      },
      {
        question: 'What is the difference between single-layer and triple-layer GREENFIT?',
        answer:
          'Single-layer GREENFIT (green) is designed for indoor installations. Triple-layer GREENFIT has a green outer layer, white middle layer, and off-white inner layer — the outer layer is UV-resistant, making it suitable for outdoor exposed installations without degradation.',
      },
      {
        question: 'What is GREENFIT Thermex?',
        answer:
          'GREENFIT Thermex is a specialised insulated pipe variant within the GREENFIT range that includes a thermal insulation layer. It reduces linear expansion and contraction in long runs and high-temperature applications, making it ideal for hot water mains in large facilities.',
      },
      {
        question: 'What temperature can GREENFIT PPR pipe handle?',
        answer:
          'Prince GREENFIT PPR pipe is rated for continuous service up to 95°C, making it suitable for both hot water distribution and solar water heater systems. For sub-zero temperature applications, the piping system must be insulated.',
      },
      {
        question: 'Is GREENFIT PPR pipe safe for drinking water?',
        answer:
          'Yes. Prince GREENFIT PPR complies with IS:10500 for contact with foodstuff, pharmaceuticals, and drinking water. The material is non-toxic and bacteriologically neutral — safe for potable water systems in homes, hospitals, and food processing facilities.',
      },
      {
        question: 'How are GREENFIT PPR pipes joined?',
        answer:
          'GREENFIT pipes and fittings are joined using polyfusion (socket fusion) heat-fusion welding. The fusion process creates a homogeneous, monolithic joint — no adhesives, solvent cements, or O-rings are used. The joint is stronger than the pipe body itself and requires no ongoing maintenance.',
      },
    ],
  },
  {
    slug: 'ppr-blue-pipe',
    name: 'PPR Blue Pipe & Fittings',
    category: 'PPR Pipes',
    tagline: 'Prince GREENFIT Blue — glass-fibre reinforced PP-R for compressed air, vacuum & industrial lines',
    shortDescription:
      'Prince GREENFIT Blue — a 3-layer glass-fibre reinforced PP-R piping system rated from -20°C to 95°C with PN10 to PN20 pressure ratings. Designed for compressed air, vacuum lines, and industrial process fluids. No corrosion, no scaling.',
    fullDescription: `Prince GREENFIT Blue is a specialist Polypropylene Random Copolymer (PP-R) industrial piping system engineered specifically for compressed air, vacuum, and process gas distribution in manufacturing, automation, and industrial environments. At LBow Network Solutions, we supply the full GREENFIT Blue range as an authorised Prince dealer.

**Three-Layer Construction:**
Unlike standard single-layer PPR pipes, GREENFIT Blue features a three-layer design:
- Inner and outer layers of PP-R for chemical resistance and smooth bore
- Middle layer of PP-R reinforced with glass fibre for enhanced structural rigidity and significantly reduced linear expansion/contraction

The glass-fibre reinforced middle layer is the key differentiator — it gives GREENFIT Blue greater stiffness and pressure retention at elevated temperatures compared to unreinforced PPR, and dramatically reduces the thermal expansion that can cause stress in long runs.

**Clean Air Advantage:**
GREENFIT Blue eliminates the contamination and corrosion problems that plague metal compressed air systems. Steel and copper pipes corrode internally, releasing rust particles, scale, and moisture into the air supply — contaminating pneumatic tools, valves, and sensitive instruments. GREENFIT Blue's inert PP-R bore delivers perfectly clean, dry, uncontaminated compressed air to every point of use.

**Leak-Free by Design:**
Polyfusion heat-fusion welding creates permanent, monolithic joints throughout the system. Unlike threaded metal joints (which require ongoing PTFE tape re-application and can loosen under vibration), GREENFIT Blue joints never work loose, never corrode, and require no maintenance. Compressed air leaks are a direct and significant energy cost — a leak-free polyfusion system pays for itself rapidly.

**Extended Temperature Range:**
The -20°C to 95°C operating range makes GREENFIT Blue suitable for both chilled process lines (refrigeration condensate, cold water) and hot fluid lines, with the glass-fibre reinforcement maintaining structural integrity across the full range.

**Standards Compliance:**
GREENFIT Blue pipes conform to IS:15801 and fittings to DIN 16962, the same internationally recognised standards as the GREENFIT green range.

We supply GREENFIT Blue in the full size range and PN class from our Bangalore stock. Contact us for sizing guidance, take-off calculations, and project pricing.`,
    specifications: [
      { label: 'Material', value: 'PP-R — Polypropylene Random Copolymer' },
      { label: 'Brand System', value: 'Prince GREENFIT Blue (Authorised Dealer: LBow Network Solutions)' },
      { label: 'Construction', value: '3-layer: PP-R inner/outer | PP-R + Glass-fibre reinforced middle layer' },
      { label: 'Colour', value: 'Blue' },
      { label: 'Pipe Size Range', value: '20 mm to 315 mm' },
      { label: 'Temperature Range', value: '-20°C to 95°C (insulation required below 0°C)' },
      { label: 'Pressure Rating (Pipes)', value: 'PN 10, PN 16, PN 20' },
      { label: 'Pressure Rating (Fittings)', value: 'PN 20, PN 25' },
      { label: 'Pipe Standard', value: 'IS:15801' },
      { label: 'Fitting Standard', value: 'DIN 16962' },
      { label: 'Jointing Method', value: 'Polyfusion (socket fusion) heat-fusion welding — no adhesives, no threads' },
      { label: 'Key Advantage', value: 'Glass-fibre reinforced middle layer — reduced thermal expansion, higher rigidity' },
      { label: 'UV Resistance', value: 'UV-resistant outer layer — suitable for outdoor exposed installations' },
    ],
    applications: [
      'Compressed air main and branch distribution lines in factories',
      'Vacuum piping systems — clean, sealed, no contamination',
      'Instrument air supply for pneumatic controls and instrumentation',
      'Nitrogen and inert gas distribution lines',
      'Industrial process water and fluid transport',
      'Cold process lines and chilled water circuits (-20°C capable)',
      'Outdoor UV-exposed industrial piping installations',
    ],
    industries: [
      'Automotive and auto-components manufacturing',
      'Electronics and semiconductor assembly',
      'Machine building and industrial automation',
      'Pharmaceutical and biotech manufacturing',
      'Food and beverage processing plants',
      'Textile manufacturing',
      'General manufacturing and engineering',
    ],
    relatedProducts: ['ppr-green-pipe', 'ppr-fittings-blue', 'brass-ball-valve'],
    image: '/images/product-ppr-blue-pipe.webp',
    metaTitle: 'Prince GREENFIT Blue PPR Pipe Supplier Bangalore | LBow Network Solutions',
    metaDescription:
      'Prince GREENFIT Blue glass-fibre reinforced PP-R pipes for compressed air, vacuum, and industrial lines in Bangalore. -20°C to 95°C, PN10–PN20. Authorised Prince dealer. Call +91 8123501407.',
    keywords: [
      'Prince GREENFIT Blue PPR pipe Bangalore',
      'compressed air PPR pipe Bangalore',
      'glass fibre reinforced PPR pipe',
      'Prince PPR pipe dealer Bangalore',
      'industrial compressed air pipe Bangalore',
      'vacuum pipe PPR industrial',
    ],
    faqs: [
      {
        question: 'What is Prince GREENFIT Blue PPR pipe used for?',
        answer:
          'Prince GREENFIT Blue is a specialised PP-R piping system designed primarily for compressed air, vacuum lines, instrument air, and inert gas distribution in industrial environments. Its glass-fibre reinforced middle layer gives it greater rigidity and reduced thermal expansion compared to standard PPR, making it ideal for long-run industrial compressed air systems.',
      },
      {
        question: 'What makes GREENFIT Blue different from GREENFIT (green)?',
        answer:
          'GREENFIT Blue has a three-layer construction with a PP-R + glass-fibre reinforced middle layer. This gives it higher structural rigidity, reduced linear thermal expansion, and suitability for compressed air and vacuum applications. The standard GREENFIT (green) is a single or triple-layer PP-R optimised for hot and cold water plumbing. Both are IS:15801 certified and heat-fusion welded.',
      },
      {
        question: 'Why use GREENFIT Blue for compressed air instead of metal pipes?',
        answer:
          'Steel and copper compressed air pipes corrode internally, releasing rust particles, scale, and moisture that contaminate pneumatic tools, valves, and instruments. GREENFIT Blue is fully inert — no corrosion, no scaling, no contamination. The heat-fusion joints are also permanently leak-free, eliminating the energy losses from threaded joint air leaks that are common in metal systems.',
      },
      {
        question: 'What temperature range does GREENFIT Blue support?',
        answer:
          'GREENFIT Blue operates across a wide range from -20°C to 95°C. Below 0°C, the piping system should be insulated. This range makes it suitable for both chilled process lines and hot fluid applications.',
      },
      {
        question: 'What pressure classes are available for GREENFIT Blue?',
        answer:
          'Pipes are available in PN10, PN16, and PN20 pressure classes. Fittings are rated PN20 and PN25. The appropriate pressure class depends on your system working pressure and temperature — our team can assist with the correct selection.',
      },
      {
        question: 'Are GREENFIT Blue pipes suitable for outdoor installation?',
        answer:
          'Yes. The outer layer of GREENFIT Blue is UV-resistant, making it suitable for outdoor and direct sunlight exposed installations without degradation. This is a significant advantage over standard PPR pipes that require UV protection when installed outdoors.',
      },
    ],
  },
  {
    slug: 'ppr-fittings-green',
    name: 'PPR Fittings (Green)',
    category: 'PPR Fittings',
    tagline: 'Complete range of green PPR elbows, tees, couplers, and reducers',
    shortDescription:
      'Complete range of green PPR fittings — elbows, tees, couplers, reducers, and unions for every residential and industrial piping need.',
    fullDescription: `Green PPR fittings are the connective components that complete your PPR piping system. At LBow Network Solutions, we supply a comprehensive range covering every connection type required: 90° and 45° elbows for direction changes, equal and reducing tees for branch connections, straight and reducing couplers, end caps, male and female threaded adapters (with brass inserts), pipe clips, and unions.

All green PPR fittings are manufactured from the same virgin PPR resin as our pipes, with the same temperature and pressure ratings. Heat fusion welding creates a homogeneous, monolithic joint between pipe and fitting — there are no O-rings, adhesives, or mechanical fasteners that could fail over time.

The green colour range coordinates with PPR green pipes for a clean, professional installation finish. Brass-insert fittings (male and female adapters) provide the threaded connection point for equipment interfaces, maintaining the corrosion resistance of brass threads while keeping the system body in PPR.

We stock green PPR fittings from ½ inch (DN15) to 4 inches (DN110) for immediate dispatch. Larger sizes and special configurations are available on order. Our technical team can assist with material take-off for complete projects.`,
    specifications: [
      { label: 'Material', value: 'PPR — Polypropylene Random Copolymer' },
      { label: 'Colour', value: 'Green' },
      { label: 'Temperature Rating', value: 'Up to 95°C (continuous service)' },
      { label: 'Pressure Rating', value: 'PN10 / PN16 (1.0–1.6 MPa)' },
      { label: 'Joining Method', value: 'Heat fusion (socket fusion) welding' },
      { label: 'Size Range', value: '½ inch to 4 inches (DN15–DN110)' },
      { label: 'Types Available', value: 'Elbows (45°/90°), tees, couplers, reducers, end caps, adapters, unions' },
      { label: 'Insert Material', value: 'Brass (threaded adapters)' },
      { label: 'Warranty', value: '10 years' },
    ],
    applications: [
      'Residential and commercial hot/cold water plumbing',
      'Industrial process water distribution',
      'Solar water heater systems',
      'HVAC chilled and hot water circuits',
      'Food and beverage facility water supply',
      'Agricultural irrigation headers',
    ],
    industries: [
      'Construction and real estate',
      'Manufacturing plants',
      'Food and beverage',
      'Pharmaceuticals',
      'HVAC contractors',
      'Hotels and hospitality',
    ],
    relatedProducts: ['ppr-green-pipe', 'ppr-fittings-blue', 'brass-ball-valve'],
    image: '/images/product-ppr-fittings-green.webp',
    metaTitle: 'PPR Green Fittings Supplier in Bangalore | LBow Network Solutions',
    metaDescription:
      'PPR green elbows, tees, couplers, reducers — complete range from Bangalore dealer. 10-year warranty. Call +91 8123501407.',
    keywords: [
      'PPR green fittings Bangalore',
      'PPR elbow tee coupler Bangalore',
      'green PPR fittings dealer',
      'PPR pipe fittings supplier',
      'heat fusion fittings Bangalore',
    ],
    faqs: [
      {
        question: 'What types of green PPR fittings do you stock?',
        answer:
          'We stock 90° and 45° elbows, equal and reducing tees, straight and reducing couplers, end caps, male and female threaded adapters with brass inserts, unions, and pipe supports.',
      },
      {
        question: 'Are green PPR fittings compatible with PPR blue pipes?',
        answer:
          'Yes. PPR fittings of the same nominal diameter are dimensionally compatible regardless of colour. Both are joined using heat fusion welding.',
      },
      {
        question: 'What is the maximum temperature for PPR fittings?',
        answer:
          'PPR fittings are rated for continuous service up to 95°C, matching the temperature rating of PPR pipes.',
      },
      {
        question: 'Do you offer bulk pricing for PPR fittings?',
        answer:
          'Yes. We offer competitive pricing for bulk project orders. Contact us at +91 8123501407 or via WhatsApp with your project take-off list for a custom quote.',
      },
      {
        question: 'Do you supply PPR fittings for both green and blue pipe systems?',
        answer:
          'Yes. We stock fittings in both green and blue to match your pipe selection. Both types use the same heat fusion welding process.',
      },
    ],
  },
  {
    slug: 'ppr-fittings-blue',
    name: 'PPR Fittings (Blue)',
    category: 'PPR Fittings',
    tagline: 'Blue PPR fittings with brass inserts for industrial hot and cold water systems',
    shortDescription:
      'Full set of blue PPR fittings with brass inserts for hot and cold water applications in industrial and commercial setups.',
    fullDescription: `Blue PPR fittings complete the blue PPR pipe system for industrial and commercial installations where colour-coded piping is used. Available in the same comprehensive range as our green fittings — elbows, tees, couplers, reducers, unions, and threaded adapters — all manufactured from virgin PPR resin with brass inserts where required.

Blue PPR fittings are especially popular in larger industrial facilities and commercial buildings where maintenance teams use colour coding to identify cold water lines (blue), hot water lines (red/green), and other services at a glance. Using matching blue fittings with blue pipes produces a clean, professional installation that is easy to trace and maintain.

Like all our PPR fittings, the blue range is joined using heat fusion welding. The resulting joint is permanent, pressure-rated to PN16, and requires no ongoing maintenance. Brass-insert adapters provide durable threaded connection points for equipment interfaces without compromising the corrosion-free nature of the overall system.

We supply blue PPR fittings from ½ inch (DN15) to 4 inches (DN110). Contact us for a complete material list and project pricing.`,
    specifications: [
      { label: 'Material', value: 'PPR — Polypropylene Random Copolymer' },
      { label: 'Colour', value: 'Blue' },
      { label: 'Temperature Rating', value: 'Up to 95°C (continuous service)' },
      { label: 'Pressure Rating', value: 'PN10 / PN16 (1.0–1.6 MPa)' },
      { label: 'Joining Method', value: 'Heat fusion (socket fusion) welding' },
      { label: 'Size Range', value: '½ inch to 4 inches (DN15–DN110)' },
      { label: 'Types Available', value: 'Elbows (45°/90°), tees, couplers, reducers, end caps, adapters, unions' },
      { label: 'Insert Material', value: 'Brass (threaded adapters)' },
      { label: 'Warranty', value: '10 years' },
    ],
    applications: [
      'Colour-coded cold water distribution systems',
      'Industrial hot and cold water plumbing',
      'Equipment connections in process plants',
      'Commercial building services',
      'HVAC chilled water connections',
      'Hospital and healthcare water systems',
    ],
    industries: [
      'Manufacturing plants',
      'Commercial construction',
      'Hospitals and healthcare',
      'HVAC contractors',
      'Food and beverage',
      'Pharmaceuticals',
    ],
    relatedProducts: ['ppr-blue-pipe', 'ppr-fittings-green', 'brass-ball-valve'],
    image: '/images/product-ppr-fittings-blue.webp',
    metaTitle: 'PPR Blue Fittings Supplier in Bangalore | LBow Network Solutions',
    metaDescription:
      'PPR blue fittings with brass inserts for industrial installations in Bangalore. Full range, heat fusion welded. Call +91 8123501407.',
    keywords: [
      'PPR blue fittings Bangalore',
      'blue PPR pipe fittings',
      'colour coded PPR fittings',
      'PPR fittings industrial',
      'pipe fittings supplier Bangalore',
    ],
    faqs: [
      {
        question: 'What is the advantage of blue PPR fittings over green?',
        answer:
          'The advantage is purely visual — blue fittings with blue pipes create a colour-coded system that helps identify cold water lines from hot water lines and other services in large facilities. Performance is identical.',
      },
      {
        question: 'Can blue PPR fittings be used with green PPR pipes?',
        answer:
          'Technically yes, since dimensions are the same. However, for a clean colour-coded installation, we recommend matching pipe and fitting colours.',
      },
      {
        question: 'Do blue PPR fittings have the same pressure and temperature rating as green?',
        answer:
          'Yes. Both blue and green PPR fittings are rated for PN16 pressure and continuous service up to 95°C.',
      },
      {
        question: 'What sizes are available in blue PPR fittings?',
        answer:
          'We supply blue PPR fittings from ½ inch (DN15) to 4 inches (DN110). Contact us for specific sizes and project quantities.',
      },
      {
        question: 'Do you supply both pipes and fittings in blue PPR?',
        answer:
          'Yes. We stock both blue PPR pipes (20mm–315mm) and the complete range of blue PPR fittings for a fully matched system.',
      },
    ],
  },
  {
    slug: 'brass-ball-valve',
    name: 'Brass Ball Valve',
    category: 'Valves',
    tagline: 'High-quality brass ball valves for reliable flow control in water, air, and chemical lines',
    shortDescription:
      'High-quality brass ball valves for reliable flow control in water, air, and light chemical lines — quarter-turn operation, bubble-tight shut-off.',
    fullDescription: `Brass ball valves are the workhorse of industrial isolation valves — simple, reliable, and durable. At LBow Network Solutions, we supply high-quality brass ball valves suitable for water, compressed air, and light chemical service lines across a wide range of sizes and end connections.

The quarter-turn operation (90° from full open to full closed) makes brass ball valves fast to operate, easy to inspect visually (the handle position shows valve state at a glance), and suitable for both manual and actuated operation. The full-bore design ensures no flow restriction when open, maintaining system efficiency.

Our brass ball valves feature PTFE-seated balls for bubble-tight shut-off, chrome-plated brass balls for corrosion resistance, and stems with blow-out proof design for safe operation under pressure. Available in threaded (BSP/NPT) and socket-weld ends to suit different connection requirements.

Brass ball valves are an essential component in PPR pipe systems — typically installed at equipment connections, branch points, and zone isolation positions throughout the distribution network. We stock standard sizes for immediate supply and can source special sizes on request.`,
    specifications: [
      { label: 'Body Material', value: 'Brass (dezincification-resistant grade)' },
      { label: 'Ball Material', value: 'Chrome-plated brass' },
      { label: 'Seat Material', value: 'PTFE (bubble-tight shut-off)' },
      { label: 'Operation', value: 'Quarter-turn (90°) manual handle' },
      { label: 'End Connections', value: 'Threaded (BSP/NPT) and socket-weld options' },
      { label: 'Pressure Rating', value: 'Up to 16 bar (1.6 MPa)' },
      { label: 'Temperature Rating', value: 'Up to 120°C (PTFE seats)' },
      { label: 'Size Range', value: '½ inch to 4 inches' },
      { label: 'Standard', value: 'Industry standard specifications' },
    ],
    applications: [
      'PPR and PPCH pipeline isolation valves',
      'Compressed air line shut-off points',
      'Water distribution system zone isolation',
      'Equipment connection isolation',
      'HVAC water system control valves',
      'Light chemical line isolation',
    ],
    industries: [
      'Manufacturing and industrial plants',
      'HVAC and MEP contractors',
      'Food and beverage processing',
      'Pharmaceuticals',
      'Automotive manufacturing',
      'Commercial construction',
    ],
    relatedProducts: ['butterfly-valve', 'ppr-green-pipe', 'pneumatic-fittings'],
    image: '/images/product-brass-ball-valve.webp',
    metaTitle: 'Brass Ball Valve Supplier in Bangalore | LBow Network Solutions',
    metaDescription:
      'Quality brass ball valves for water, air, and chemical lines in Bangalore. Quarter-turn, bubble-tight, 16 bar rated. Call +91 8123501407.',
    keywords: [
      'brass ball valve Bangalore',
      'industrial ball valve supplier',
      'ball valve for PPR pipe',
      'quarter turn valve Bangalore',
      'flow control valve industrial',
    ],
    faqs: [
      {
        question: 'What is a brass ball valve used for?',
        answer:
          'Brass ball valves are used for isolating (shutting off) flow in water, compressed air, and light chemical pipelines. The quarter-turn handle makes them fast and easy to operate.',
      },
      {
        question: 'What pressure rating do your brass ball valves have?',
        answer:
          'Our brass ball valves are rated up to 16 bar (1.6 MPa), suitable for most industrial water and compressed air applications.',
      },
      {
        question: 'Can brass ball valves be used with PPR pipes?',
        answer:
          'Yes. Brass ball valves with threaded ends connect to PPR systems via PPR male/female threaded adapters. They are the standard isolation valve choice for PPR pipeline systems.',
      },
      {
        question: 'What sizes of brass ball valves do you supply?',
        answer:
          'We supply brass ball valves from ½ inch to 4 inches. Contact us for specific sizes and quantities.',
      },
      {
        question: 'Are brass ball valves suitable for hot water lines?',
        answer:
          'Yes. With PTFE seats, our brass ball valves are rated up to 120°C, making them suitable for hot water distribution systems.',
      },
    ],
  },
  {
    slug: 'butterfly-valve',
    name: 'Butterfly Valve',
    category: 'Valves',
    tagline: 'Industrial-grade butterfly valves for large-bore lines — quick-acting and corrosion resistant',
    shortDescription:
      'Industrial-grade butterfly valves for large-bore lines — lightweight, quick-acting, and corrosion resistant for water and HVAC applications.',
    fullDescription: `Butterfly valves are the preferred choice for large-bore pipeline isolation and flow control where the compact, lightweight design of ball valves becomes impractical or cost-prohibitive at larger diameters. LBow Network Solutions supplies industrial-grade butterfly valves for water treatment, HVAC, and process piping applications.

The butterfly valve disc rotates 90° within the valve body to open or close flow. The concentric (centric) disc design is suitable for low-pressure water and HVAC service, while eccentric designs are available for higher-pressure or tighter shut-off requirements. Wafer-type butterfly valves are sandwiched between flanges, making them compact and easy to install in tight spaces.

Our butterfly valves are available with different disc and seat materials to suit the application: EPDM-seated valves for water and HVAC service, NBR seats for oil-resistant applications, and PTFE seats for chemical service. Disc materials include ductile iron (epoxy coated), 316 stainless steel, and aluminium alloy.

Butterfly valves are commonly installed on cooling tower supply and return lines, chiller headers, HVAC air handling units, and large-diameter water mains — anywhere that a compact, lightweight, low-torque isolation valve is preferred over a heavy gate or ball valve.`,
    specifications: [
      { label: 'Type', value: 'Wafer / Lug type butterfly valve' },
      { label: 'Body Material', value: 'Ductile iron / Cast iron' },
      { label: 'Disc Material', value: 'Ductile iron (epoxy coated), SS316, or aluminium' },
      { label: 'Seat Material', value: 'EPDM, NBR, or PTFE depending on application' },
      { label: 'Operation', value: 'Quarter-turn (90°) — manual lever or gear operated' },
      { label: 'End Connection', value: 'Wafer (between flanges) or lug type' },
      { label: 'Pressure Rating', value: 'Up to 16 bar' },
      { label: 'Temperature Rating', value: 'Up to 120°C (EPDM); up to 180°C (PTFE)' },
      { label: 'Size Range', value: '2 inches (DN50) to 24 inches (DN600)' },
    ],
    applications: [
      'Cooling tower supply and return main isolation',
      'Chiller header flow control',
      'HVAC air handling unit water control',
      'Large-diameter water main isolation',
      'Industrial process water flow control',
      'Fire suppression system control valves',
    ],
    industries: [
      'HVAC and MEP contractors',
      'Water treatment plants',
      'Manufacturing and industrial plants',
      'Commercial buildings',
      'Food and beverage processing',
      'Power and utilities',
    ],
    relatedProducts: ['brass-ball-valve', 'ppr-green-pipe', 'ss-fittings'],
    image: '/images/product-butterfly-valve.webp',
    metaTitle: 'Butterfly Valve Supplier in Bangalore | LBow Network Solutions',
    metaDescription:
      'Industrial butterfly valves for cooling towers, HVAC, and large-bore water lines in Bangalore. DN50 to DN600. Call +91 8123501407.',
    keywords: [
      'butterfly valve Bangalore',
      'industrial butterfly valve supplier',
      'wafer butterfly valve',
      'HVAC butterfly valve',
      'large bore valve Bangalore',
    ],
    faqs: [
      {
        question: 'What is a butterfly valve used for?',
        answer:
          'Butterfly valves are used for isolating or regulating flow in large-bore pipelines. They are commonly used in cooling tower lines, HVAC systems, water mains, and industrial process piping.',
      },
      {
        question: 'What is the difference between wafer and lug butterfly valves?',
        answer:
          'Wafer butterfly valves are clamped between two pipe flanges and rely on the flanges for retention. Lug butterfly valves have threaded inserts allowing them to be bolted independently on each side — useful when one end of the pipeline needs to be removable without disturbing the other side.',
      },
      {
        question: 'What size butterfly valves do you supply?',
        answer:
          'We supply butterfly valves from 2 inches (DN50) to 24 inches (DN600). Contact us for specific sizes and actuator options.',
      },
      {
        question: 'Can butterfly valves be used with cooling tower pipelines?',
        answer:
          'Yes. Butterfly valves are the standard choice for cooling tower supply and return main isolation due to their compact size, light weight, and low operating torque at large diameters.',
      },
      {
        question: 'Are motorised butterfly valves available?',
        answer:
          'Yes. We supply butterfly valves with electric actuators for automated flow control. Contact us for actuator specifications and control options.',
      },
    ],
  },
  {
    slug: 'ss-fittings',
    name: 'SS Fittings',
    category: 'SS Fittings',
    tagline: 'Stainless steel fittings for hygienic, high-pressure, and corrosive environments',
    shortDescription:
      'Stainless steel fittings for hygienic, high-pressure, and corrosive environments including food processing, pharma, and chemical industries.',
    fullDescription: `Stainless steel (SS) fittings are the premium choice for pipeline connections in hygienic, high-pressure, and corrosive environments where brass or PPR would be unsuitable. LBow Network Solutions supplies SS fittings in 304 and 316 grades for a wide range of industrial applications.

SS 304 fittings are suitable for general corrosive environments, food and beverage applications, and moderate chemical service. SS 316 fittings offer superior resistance to chloride attack, making them the preferred choice for marine environments, pharmaceutical clean-in-place systems, and aggressive chemical service.

Our SS fitting range includes compression fittings, push-fit fittings, threaded fittings (male/female BSP and NPT), flanged connections, clamp-end fittings (tri-clover / sanitary fittings for hygienic applications), and tube-to-tube unions. The smooth internal bore of SS fittings meets sanitary requirements and resists biofilm accumulation.

SS fittings are frequently used in conjunction with our PPR and PPCH pipe systems — at equipment connections, instrument tapping points, and any location where the superior hygiene or pressure characteristics of stainless steel are required at the interface.`,
    specifications: [
      { label: 'Material Grade', value: 'SS 304 or SS 316 (specified on order)' },
      { label: 'Finish', value: 'Polished (for hygienic applications) or bead-blasted' },
      { label: 'Connection Types', value: 'Compression, push-fit, threaded (BSP/NPT), flanged, tri-clover (sanitary)' },
      { label: 'Pressure Rating', value: 'Up to 40 bar (varies by type and size)' },
      { label: 'Temperature Rating', value: '-196°C to +800°C (material range)' },
      { label: 'Size Range', value: '¼ inch to 4 inches' },
      { label: 'Standards', value: 'ASTM A403 / DIN / ISO' },
    ],
    applications: [
      'Food and beverage hygienic process piping',
      'Pharmaceutical clean-in-place (CIP) systems',
      'Chemical dosing and transfer lines',
      'High-pressure instrument connections',
      'Marine and offshore piping',
      'Brewery and dairy facility piping',
    ],
    industries: [
      'Food and beverage processing',
      'Pharmaceuticals and biotech',
      'Chemical manufacturing',
      'Brewery and dairy',
      'Marine and offshore',
      'Research and laboratories',
    ],
    relatedProducts: ['brass-fittings', 'pneumatic-fittings', 'butterfly-valve'],
    image: '/images/product-ss-fittings.webp',
    metaTitle: 'Stainless Steel Fittings Supplier in Bangalore | LBow Network Solutions',
    metaDescription:
      'SS 304 and SS 316 stainless steel fittings for food, pharma, and chemical industries in Bangalore. Call +91 8123501407.',
    keywords: [
      'stainless steel fittings Bangalore',
      'SS fittings supplier industrial',
      'SS 316 fittings Bangalore',
      'hygienic pipe fittings',
      'food grade fittings Bangalore',
    ],
    faqs: [
      {
        question: 'What is the difference between SS 304 and SS 316 fittings?',
        answer:
          'SS 304 is suitable for general food, beverage, and corrosive applications. SS 316 contains molybdenum which gives superior resistance to chloride and acid attack, making it the better choice for pharmaceutical, marine, and aggressive chemical environments.',
      },
      {
        question: 'Are stainless steel fittings food grade certified?',
        answer:
          'Yes. Our SS fittings in polished sanitary finish meet food grade hygiene requirements and are suitable for food, beverage, dairy, and pharmaceutical applications.',
      },
      {
        question: 'What types of SS fittings do you supply?',
        answer:
          'We supply compression fittings, threaded fittings, push-fit fittings, flanged connections, and sanitary tri-clover fittings in both SS 304 and SS 316.',
      },
      {
        question: 'Can SS fittings be used with PPR pipes?',
        answer:
          'SS fittings connect to PPR systems via threaded adapters. They are used at equipment interfaces, instrument connections, and any point where stainless steel properties are required.',
      },
      {
        question: 'What pressure rating do your SS fittings support?',
        answer:
          'Pressure ratings vary by type and size. Compression and threaded fittings are typically rated up to 40 bar. Contact us for specific ratings for your application.',
      },
    ],
  },
  {
    slug: 'brass-fittings',
    name: 'Brass Fittings',
    category: 'Brass Fittings',
    tagline: 'Precision-machined brass fittings for threaded connections in air, water, and gas lines',
    shortDescription:
      'Precision-machined brass fittings for threaded connections in air, water, and gas line applications — reliable, corrosion-resistant, and widely compatible.',
    fullDescription: `Brass fittings are among the most versatile and widely used pipeline connection components in industrial and plumbing applications. LBow Network Solutions supplies a comprehensive range of precision-machined brass fittings for compressed air, water, and gas line threaded connections.

Our brass fitting range includes: male and female threaded adapters (BSP and NPT), elbow fittings (45° and 90°), equal and reducing tees, couplers, nipples, hex bushes, and union connectors. All are manufactured from free-machining brass (CuZn39Pb3) for precise thread form and reliable sealing.

Brass fittings are used extensively at the interface between PPR/PPCH pipeline systems and threaded equipment connections — compressor outlets, pressure gauge tapping points, filter connections, and solenoid valve ports. The corrosion resistance of brass in water and air service, combined with its ease of machining, makes it the standard material for threaded connection points.

Dezincification-resistant (DZR) brass fittings are available for applications in aggressive water conditions. BSP (British Standard Pipe) and NPT (National Pipe Thread) thread standards are both stocked. PTFE thread tape or thread sealant should be used for leak-free threaded assembly.`,
    specifications: [
      { label: 'Material', value: 'Brass CuZn39Pb3 (free-machining brass)' },
      { label: 'Thread Standards', value: 'BSP (G) and NPT available' },
      { label: 'Pressure Rating', value: 'Up to 25 bar (varies by size)' },
      { label: 'Temperature Rating', value: 'Up to 120°C' },
      { label: 'Size Range', value: '⅛ inch to 4 inches' },
      { label: 'Types Available', value: 'Adapters, elbows, tees, couplers, nipples, unions, bushes' },
      { label: 'Finish', value: 'Natural brass / nickel plated (on request)' },
    ],
    applications: [
      'Compressed air system threaded connections',
      'Equipment connections in PPR/PPCH systems',
      'Water distribution threaded fittings',
      'Gas line fittings (LPG, natural gas)',
      'Instrument and gauge tapping points',
      'Solenoid valve and actuator connections',
    ],
    industries: [
      'Manufacturing plants',
      'Automotive and engineering',
      'HVAC and MEP contractors',
      'Food and beverage',
      'Pharmaceuticals',
      'General construction',
    ],
    relatedProducts: ['ss-fittings', 'pneumatic-fittings', 'brass-ball-valve'],
    image: '/images/product-brass-fittings.webp',
    metaTitle: 'Brass Fittings Supplier in Bangalore | LBow Network Solutions',
    metaDescription:
      'Precision brass fittings for compressed air, water, and gas lines in Bangalore. BSP and NPT threads. Call +91 8123501407.',
    keywords: [
      'brass fittings Bangalore',
      'brass pipe fittings supplier',
      'BSP brass fittings Bangalore',
      'compressed air brass fittings',
      'industrial brass fittings',
    ],
    faqs: [
      {
        question: 'What thread standards are your brass fittings available in?',
        answer:
          'We stock brass fittings in both BSP (British Standard Pipe — G thread) and NPT (National Pipe Thread) standards. Specify which thread type you require when ordering.',
      },
      {
        question: 'Can brass fittings be used with PPR pipes?',
        answer:
          'Yes. Brass male or female threaded adapters connect to PPR pipes via heat fusion welding. This is the standard way to create a threaded connection point in a PPR pipe system.',
      },
      {
        question: 'What is the pressure rating of your brass fittings?',
        answer:
          'Our brass fittings are rated up to 25 bar for smaller sizes, with ratings varying by size. They are suitable for most compressed air and water service applications.',
      },
      {
        question: 'Are brass fittings suitable for gas lines?',
        answer:
          'Yes. Brass fittings are commonly used for LPG and natural gas line connections. Ensure fittings are rated for gas service and use an appropriate gas-grade thread sealant.',
      },
      {
        question: 'Do you supply nickel-plated brass fittings?',
        answer:
          'Yes. Nickel-plated brass fittings are available on request for applications requiring improved appearance or corrosion resistance in damp environments.',
      },
    ],
  },
  {
    slug: 'pneumatic-fittings',
    name: 'Pneumatic Fittings',
    category: 'Pneumatic',
    tagline: 'Push-to-connect and compression pneumatic fittings for air compressor lines',
    shortDescription:
      'Push-to-connect and compression pneumatic fittings for air compressor lines and automated industrial systems — quick assembly, leak-free performance.',
    fullDescription: `Pneumatic fittings connect compressed air components — compressors, valves, actuators, cylinders, and tools — into a complete, leak-free pneumatic system. LBow Network Solutions supplies a comprehensive range of pneumatic fittings suitable for PU tubing, nylon tubing, and metal tube pneumatic circuits.

Our pneumatic fitting range includes push-to-connect (push-in) fittings for quick toolless assembly with PU and nylon tubing, compression fittings for metal tube and high-vibration applications, and threaded adapters for connecting pneumatic components to the compressed air distribution network. Fitting bodies are available in brass, aluminium alloy, and nickel-plated brass.

Push-to-connect pneumatic fittings are ideal for machine-building and automation applications where frequent connections and disconnections are required. The spring-loaded collet grips the tube on insertion and releases with a push on the release ring. One-touch fittings dramatically reduce assembly time compared to compression fittings.

Pneumatic fittings are used throughout factory compressed air systems — from the main air receiver and compressor outlet, through the distribution ring main, to individual machine drops and tool connection points. Selecting the correct fitting type and size is critical for maintaining system pressure and preventing air leaks, which represent a direct energy cost.`,
    specifications: [
      { label: 'Types', value: 'Push-to-connect (push-in), compression, threaded adapters' },
      { label: 'Body Material', value: 'Brass, aluminium alloy, nickel-plated brass' },
      { label: 'Compatible Tubing', value: 'PU, nylon, polyethylene, and metal tube' },
      { label: 'Tube OD Range', value: '4mm to 16mm (push-in); ¼ inch to 1 inch (compression)' },
      { label: 'Thread', value: 'BSP and metric (M5, M6) thread options' },
      { label: 'Pressure Rating', value: 'Up to 10 bar (push-in); up to 16 bar (compression)' },
      { label: 'Temperature Rating', value: '-20°C to +80°C (push-in); up to 120°C (metal compression)' },
      { label: 'Types Available', value: 'Straight, elbow, tee, cross, reducer, bulkhead, Y-splitter' },
    ],
    applications: [
      'Machine automation pneumatic circuits',
      'Air compressor line connections',
      'Pneumatic tool supply drops',
      'Actuator and cylinder connections',
      'Pneumatic valve manifold connections',
      'Air line filtration and regulation systems',
    ],
    industries: [
      'Automotive manufacturing',
      'Electronics assembly',
      'Machine building and automation',
      'Food and beverage packaging',
      'Textile manufacturing',
      'General manufacturing',
    ],
    relatedProducts: ['pu-frl-airgun', 'brass-fittings', 'brass-ball-valve'],
    image: '/images/product-pneumatic-fittings.webp',
    metaTitle: 'Pneumatic Fittings Supplier in Bangalore | LBow Network Solutions',
    metaDescription:
      'Push-to-connect and compression pneumatic fittings for compressed air systems in Bangalore. Fast assembly, leak-free. Call +91 8123501407.',
    keywords: [
      'pneumatic fittings Bangalore',
      'push to connect fittings',
      'compressed air fittings',
      'pneumatic pipe fittings industrial',
      'PU tube fittings Bangalore',
    ],
    faqs: [
      {
        question: 'What is a push-to-connect pneumatic fitting?',
        answer:
          'A push-to-connect (push-in) fitting allows you to connect PU or nylon tubing by simply pushing the tube end into the fitting. A spring-loaded collet grips the tube and creates an airtight seal. No tools are needed. To release the tube, push the release ring and pull the tube.',
      },
      {
        question: 'What tubing is compatible with push-in pneumatic fittings?',
        answer:
          'Push-in fittings are compatible with PU (polyurethane), nylon, and polyethylene tubing of the correct OD. Ensure the tubing OD matches the fitting port size for a secure, leak-free connection.',
      },
      {
        question: 'What pressure rating do pneumatic fittings have?',
        answer:
          'Push-in fittings are typically rated up to 10 bar. Metal compression fittings are rated up to 16 bar. Always verify the fitting rating matches your system working pressure.',
      },
      {
        question: 'Do you supply pneumatic fittings for machine automation?',
        answer:
          'Yes. We supply a full range of push-in pneumatic fittings including straight, elbow, tee, and bulkhead types for machine building and automation applications.',
      },
      {
        question: 'Can pneumatic fittings be used with brass compression fittings on the same system?',
        answer:
          'Yes. Push-in fittings and compression fittings can be used on the same system. Push-in fittings are typically used for flexible tubing circuits, while brass compression fittings are used for hard tubing or high-vibration connections.',
      },
    ],
  },
  {
    slug: 'pu-frl-airgun',
    name: 'PU/FRL/Airgun',
    category: 'Air Tools & Accessories',
    tagline: 'Complete compressed air accessories — PU tubing, FRL units, pneumatic airguns, coiled hoses and quick-connect fittings for industrial compressed air setups',
    shortDescription:
      'PU tubing (straight & coiled), FRL units (Filter-Regulator-Lubricator), pneumatic airguns, and quick-connect fittings for complete compressed air tool setups. Multi-colour PU tubes 4mm–16mm OD, self-retracting coiled hoses, and ergonomic safety airguns for factories and workshops across Bangalore.',
    fullDescription: `A high-performance compressed air tool setup requires more than pipes — it needs quality PU tubing for flexible connections, FRL units for air treatment and pressure control, airguns for cleaning and blowing, and the right quick-connect fittings throughout. LBow Network Solutions supplies the complete range of compressed air accessories to factories, workshops, and industrial plants across Bangalore and Karnataka.

**PU Tubing (Polyurethane Tubing) — Straight & Coiled:**
Flexible, lightweight, and kink-resistant PU tubing is the industry standard for pneumatic machine circuits and air tool connections. We supply PU tubing in multiple colours — blue, red, yellow, black, transparent, green, and white — for easy circuit identification and colour-coding. Available in straight lengths for fixed machine circuit connections, and as self-retracting coiled hoses that extend and retract automatically. Sizes from 4mm to 16mm OD.

**Coiled Hoses with Quick-Connect Fittings:**
Our coiled PU hoses come pre-fitted with brass push-to-connect quick couplers at both ends. The coiled design eliminates tripping hazards, reduces floor clutter, and provides self-retraction — extending up to 3–5m and compressing to approximately 1m. Available in blue, yellow, and transparent.

**FRL Units (Filter-Regulator-Lubricator):**
FRL units condition compressed air at each tool drop point. The filter bowl removes moisture, compressor oil carry-over, and particulates that damage air tools and clog solenoid valves. The regulator controls downstream working pressure with precision — typically 4–6 bar for most pneumatic tools. The lubricator injects an adjustable fine oil mist to protect air tools with moving parts (motors, cylinders, grinders, impact tools), extending their service life. We supply modular FRL units as a combined assembly or as individual components. Port sizes from ¼" to 1" BSP.

**Pneumatic Airguns:**
Industrial ergonomic pistol-grip airguns for cleaning, blowing, cooling, and drying on production lines. Our airguns feature a comfortable rubber grip, a lever trigger for easy one-handed operation, and a precision nozzle for directed airflow. Available with safety nozzles meeting occupational health standards — reducing noise and preventing skin contact with high-pressure air.

**Quick-Connect Fittings:**
Brass push-in quick-connect couplers and adaptors compatible with standard BSP thread fittings, for connecting PU tubing directly to solenoid valves, manifolds, and air tools.

We supply these accessories to automotive plants, electronics assembly, plastics processors, textile units, and packaging lines across Bangalore.`,
    specifications: [
      { label: 'PU Tubing Material', value: 'Polyurethane (PU) — food-grade option available' },
      { label: 'PU Tubing Sizes', value: '4mm to 16mm OD (standard range)' },
      { label: 'PU Tubing Colours', value: 'Blue, Red, Yellow, Black, Transparent, Green, White' },
      { label: 'PU Tubing Working Pressure', value: 'Up to 10 bar' },
      { label: 'Coiled Hose Extended Length', value: '3m to 5m (self-retracting)' },
      { label: 'Coiled Hose Retracted Length', value: 'Approx. 0.9m to 1.2m' },
      { label: 'FRL Filter Rating', value: '5 micron standard; 0.01 micron high-efficiency option' },
      { label: 'FRL Pressure Range', value: '0.05 – 1.0 MPa (0.5 – 10 bar)' },
      { label: 'FRL Port Sizes', value: '¼ inch to 1 inch BSP' },
      { label: 'Airgun Operating Pressure', value: '4 to 8 bar' },
      { label: 'Airgun Trigger', value: 'Ergonomic pistol-grip lever trigger — safety nozzle available' },
      { label: 'Quick-Connect Fittings', value: 'Brass push-in couplers — BSP compatible' },
    ],
    applications: [
      'Machine pneumatic circuit flexible connections',
      'Air tool supply drops with FRL conditioning',
      'Production line part cleaning and blowing',
      'Mould blowing in plastics processing',
      'Tool connection hose sets',
      'Point-of-use air treatment and regulation',
    ],
    industries: [
      'Automotive and auto-components manufacturing',
      'Electronics assembly',
      'Plastics processing',
      'Textile and garment manufacturing',
      'General machine shops',
      'Packaging and bottling plants',
    ],
    relatedProducts: ['pneumatic-fittings', 'brass-fittings', 'brass-ball-valve'],
    image: '/images/Pu,Frl,Airgun.webp',
    metaTitle: 'PU Tubing, FRL Units & Airguns Supplier Bangalore | LBow Network Solutions',
    metaDescription:
      'PU tubing, FRL (Filter-Regulator-Lubricator) units, and industrial airguns for compressed air systems in Bangalore. Call +91 8123501407.',
    keywords: [
      'PU tubing Bangalore',
      'FRL unit supplier Bangalore',
      'industrial airgun Bangalore',
      'compressed air accessories',
      'filter regulator lubricator Bangalore',
    ],
    faqs: [
      {
        question: 'What does FRL stand for in compressed air systems?',
        answer:
          'FRL stands for Filter-Regulator-Lubricator. The filter removes moisture and particulates that damage tools and valves. The regulator controls downstream working pressure (typically 4–6 bar). The lubricator injects a fine oil mist to protect air-powered tools with moving parts, extending service life significantly.',
      },
      {
        question: 'Do I need an FRL unit for every compressed air tool?',
        answer:
          'For air tools with moving parts (grinders, drills, impact wrenches, cylinders), an FRL unit significantly extends tool life. For blowing and cleaning with an airgun, at minimum a filter and regulator are recommended. We can advise on the right configuration for your setup.',
      },
      {
        question: 'What is the difference between straight PU tubing and coiled hose?',
        answer:
          'Straight PU tubing is used for fixed machine circuit connections where the hose does not move. Coiled hoses are self-retracting — they extend to reach the work area and retract automatically, keeping the workspace tidy and reducing tripping hazards on assembly lines and maintenance stations.',
      },
      {
        question: 'What colours of PU tubing are available?',
        answer:
          'We supply PU tubing in blue, red, yellow, black, transparent, green, and white. Using different colours for different circuits (supply, exhaust, signal lines) makes troubleshooting and maintenance significantly easier.',
      },
      {
        question: 'What size FRL unit do I need?',
        answer:
          'FRL sizing depends on the air flow (consumption) of your tools and working pressure. Port sizes range from ¼” BSP for small tools to 1” BSP for high-flow applications. Contact us with your tool air consumption in Nl/min or CFM and we will recommend the right unit.',
      },
      {
        question: 'Are your airguns safe for industrial use?',
        answer:
          'Yes. Our industrial airguns are available with safety nozzles that comply with occupational health and safety standards. Safety nozzles prevent direct high-pressure air contact with skin and reduce noise levels for prolonged workshop use.',
      },
    ],
  },

  {
    slug: 'ppr-fusion-equipment',
    name: 'PPR Fusion Equipment',
    category: 'Fusion Equipment',
    tagline: 'Prince PPR Fusion Equipment — 20–63mm socket fusion welding kit with dies, clamp, and all accessories for PPR/PPRC/PPCH piping systems',
    shortDescription:
      'Prince PPR Fusion Equipment for pipe diameters 20mm to 63mm. Complete socket fusion kit includes heating unit, Teflon-coated socket dies (20–63mm), pipe alignment clamp, hardware set, and power cable. 220–420V, 50–60Hz. The professional tool for permanent, leak-free PPR pipe jointing.',
    fullDescription: `Prince PPR Fusion Equipment is the essential professional tool for creating leak-proof, permanent socket-fusion joints in PPR, PPRC, and PP-R piping systems. At LBow Network Solutions, we supply Prince PPR Fusion Equipment along with the complete Prince PPR pipe and fitting range — giving our customers a single-source solution for both piping materials and installation tools.

**What is Socket Fusion (Polyfusion) Welding?**
Socket fusion joins PPR pipes and fittings by simultaneously heating both the pipe end and the fitting socket to 260°C using Teflon-coated socket dies mounted on the machine's heating plate. The heated surfaces are then pushed together, where the molten polymer cools and forms a homogeneous, monolithic bond that is actually stronger than the pipe body. There are no adhesives, solvents, O-rings, or mechanical connectors involved.

**Complete Kit Includes:**
This machine is supplied as a full working kit, ready to use out of the box. The kit includes the main heating unit with temperature indicator, a full set of Teflon-coated socket dies for sizes 20mm, 25mm, 32mm, 40mm, 50mm, and 63mm, a pipe clamping/alignment vice, mounting screws and hardware, and a 3-pin power cable rated for Indian 220V supply.

**Machine Features:**
The machine uses a robust aluminium heating plate with precision-machined die sockets. The thermostat maintains a consistent welding temperature of 260°C (±10°C) — the exact temperature required for reliable PP-R fusion. The heating element reaches working temperature in approximately 5–6 minutes and is ready to use. The ergonomic handle design allows one-person operation for pipe diameters up to 63mm.

**Why Correct Fusion Equipment Matters:**
Poor-quality or incorrect tools lead to cold welds, over-heated joints, misaligned connections, and eventually leaks — especially under the high temperatures and pressures of industrial piping. Using Prince genuine fusion equipment with Prince PPR pipes and fittings ensures consistent, factory-standard joint quality throughout your installation.

**Installation at a Glance:**
- Cut pipe square using a pipe cutter or guillotine shears
- Clean pipe end and fitting socket
- Heat pipe end and fitting socket simultaneously on the correct-size die (typically 5–10 seconds heating time depending on size)
- Remove and push together immediately with firm, steady pressure
- Hold still for 15–30 seconds while the joint sets
- Allow full cooling time before pressure testing

We supply this machine to plumbers, MEP contractors, industrial maintenance teams, and facility managers across Bangalore and Karnataka who install Prince GREENFIT, PPRC, or PPCH piping systems.`,
    specifications: [
      { label: 'Brand', value: 'Prince Piping Systems' },
      { label: 'Pipe Size Range', value: '20mm to 63mm (socket dies included for all sizes)' },
      { label: 'Supply Voltage', value: '220V – 420V AC' },
      { label: 'Frequency', value: '50Hz – 60Hz' },
      { label: 'Welding Temperature', value: '260°C ± 20°C (thermostat controlled)' },
      { label: 'Heating Plate', value: 'Aluminium alloy with Teflon-coated die sockets' },
      { label: 'Socket Dies Included', value: '20mm, 25mm, 32mm, 40mm, 50mm, 63mm — full set' },
      { label: 'Accessories', value: 'Pipe alignment clamp, mounting bolts, hardware set, power cable (3-pin Indian plug)' },
      { label: 'Suitable Pipe Types', value: 'PPR (PP-R), PPRC, PPCH — polypropylene piping systems' },
      { label: 'Warm-Up Time', value: 'Approx. 5–6 minutes to reach working temperature' },
      { label: 'Application', value: 'Socket fusion (polyfusion) heat welding of PPR/PPRC pipes and fittings' },
    ],
    applications: [
      'Socket fusion jointing of PPR/PPRC/PPCH pipes and fittings (20mm–63mm)',
      'Residential and commercial hot and cold water plumbing installations',
      'HVAC chilled water and heating circuit piping',
      'Industrial process water and fluid transport line installation',
      'Compressed air piping installation using PPCH pipes',
      'Solar water heater feed and return pipe jointing',
      'Pharmaceutical and food-grade water piping systems',
      'Repair and maintenance of existing PPR piping networks',
    ],
    industries: [
      'Plumbing and MEP contractors',
      'Construction and real estate',
      'HVAC and facilities management',
      'Manufacturing and industrial plants',
      'Food and beverage processing',
      'Pharmaceuticals and biotech',
      'Hospitals and healthcare',
    ],
    relatedProducts: ['ppr-green-pipe', 'pprc-chemical-pipe', 'ppch-industrial-pipe'],
    image: '/images/product-ppr-fusion-equipment.webp',
    metaTitle: 'PPR Fusion Equipment — Prince 20–63mm Socket Fusion Kit | LBow Network Solutions Bangalore',
    metaDescription:
      'Buy Prince PPR Fusion Equipment (20–63mm) in Bangalore. Complete socket fusion kit with dies, clamp, and accessories for PPR/PPRC/PPCH pipe jointing. Authorised Prince dealer. Call +91 8123501407.',
    keywords: [
      'PPR fusion equipment Bangalore',
      'PPR fusion machine 20-63mm',
      'socket fusion equipment Bangalore',
      'Prince PPR fusion kit',
      'PPR pipe jointing equipment Bangalore',
      'polyfusion equipment Bangalore',
      'PPR welding equipment Bangalore',
    ],
    faqs: [
      {
        question: 'What pipe sizes does this fusion machine handle?',
        answer:
          'The machine comes with a full set of Teflon-coated socket dies for 20mm, 25mm, 32mm, 40mm, 50mm, and 63mm — covering the most common residential and commercial PPR pipe sizes. For larger sizes (75mm and above), a separate heavy-duty fusion machine is required.',
      },
      {
        question: 'Can I use this machine with any brand of PPR pipe?',
        answer:
          'Yes — the machine is compatible with all standard PPR, PPRC, and PP-R pipes and fittings conforming to IS:15801 or DIN 8077/8078. However, we recommend using it with Prince pipes and fittings for the best results, as we are an authorised Prince dealer and can guarantee material consistency.',
      },
      {
        question: 'How long does it take to make a fusion joint?',
        answer:
          'For 20mm pipe, the heating time is approximately 5 seconds, with a 4-second push and 15-second cooling hold. For 63mm pipe, heating time increases to around 12 seconds, with a 6-second push and 30-second cooling hold. Always follow the manufacturer\'s temperature and time chart for the specific size being welded.',
      },
      {
        question: 'What voltage is the machine rated for?',
        answer:
          'The machine is rated for 220V–420V AC, 50–60Hz. It is suitable for standard Indian single-phase 230V supply. A standard 15A socket is sufficient for operation.',
      },
      {
        question: 'Do I need separate training to use this machine?',
        answer:
          'The machine is straightforward to use, but we strongly recommend that installation is carried out by trained plumbers or MEP technicians who understand polyfusion welding procedures — including correct heating times, fusion pressures, and cooling periods. Incorrect technique leads to weak joints that can fail under pressure.',
      },
      {
        question: 'Is this machine available with a demo?',
        answer:
          'Yes. We offer a free product demonstration for bulk purchasers and MEP contractors. Contact us at +91 81235 01407 or WhatsApp us to schedule a demo at our Bangalore store.',
      },
    ],
  },
];

/* ─── Helper functions used by /products/[slug] page ─── */

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slugs: string[]): Product[] {
  return slugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined);
}
