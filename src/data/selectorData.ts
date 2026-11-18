export type MattressMaterialId = 'spring' | 'ep-foam' | 'rebound-foam' | 'memory-foam' | 'latex';
export type TopDesignId = 'normal-top' | 'pillow-top' | 'euro-top';
export type MattressSizeId = 'single' | 'double' | 'queen' | 'king';

export interface SelectorMaterialOption {
  id: MattressMaterialId;
  name: string;
  badge?: string;
  shortDesc: string;
  thumbnail: string;
  feel: string;
  baseFirmnessScore: number;
}

export interface SelectorTopDesignOption {
  id: TopDesignId;
  name: string;
  shortDesc: string;
  profileImage: string;
  addedHeight: string;
  comfortFeel: string;
}

export interface SelectorSizeOption {
  id: MattressSizeId;
  name: string;
  dimensionsInches: string;
  dimensionsCm: string;
  recommendedFor: string;
  isPopular?: boolean;
}

export interface CatalogueProductMatch {
  id: string;
  sku: string;
  name: string;
  series: string;
  tagline: string;
  description: string;
  materialId: MattressMaterialId;
  topDesignId: TopDesignId;
  image: string;
  secondaryImage?: string;
  firmnessScore: number;
  firmnessLabel: string;
  height: string;
  warrantyYears: number;
  trialNights: number;
  freeDelivery: boolean;
  prices: Record<MattressSizeId, number>;
  originalPrices: Record<MattressSizeId, number>;
  keyFeatures: string[];
  stockStatus: 'in_stock' | 'low_stock' | 'custom_order';
  shippingNotice: string;
  targetHref: string;
}

export const SELECTOR_MATERIALS: SelectorMaterialOption[] = [
  {
    id: 'spring',
    name: 'Pocket Spring',
    badge: 'Popular',
    shortDesc: '850+ individual pocket coils for responsive bounce & zero motion transfer.',
    thumbnail: '/images/mat_spring.png',
    feel: 'Responsive & Bouncy',
    baseFirmnessScore: 7.5,
  },
  {
    id: 'ep-foam',
    name: 'EP Foam',
    badge: 'Orthopedic',
    shortDesc: 'Engineered high-resilience expanded polymer for targeted spinal alignment.',
    thumbnail: '/images/mat_ep_foam.png',
    feel: 'Firm & Postural',
    baseFirmnessScore: 8.0,
  },
  {
    id: 'rebound-foam',
    name: 'Rebound Foam',
    badge: 'Durable',
    shortDesc: 'High-density bonded rebound matrix offering resilient bounce-back support.',
    thumbnail: '/images/mat_rebound.png',
    feel: 'Medium-Firm & Resilient',
    baseFirmnessScore: 7.0,
  },
  {
    id: 'memory-foam',
    name: 'Memory Foam',
    badge: 'Pressure Relief',
    shortDesc: 'Air-cool visco-elastic foam providing zero-gravity weightless contouring.',
    thumbnail: '/images/mat_memory.png',
    feel: 'Plush & Contouring',
    baseFirmnessScore: 6.0,
  },
  {
    id: 'latex',
    name: 'Natural Latex',
    badge: '100% Organic',
    shortDesc: 'Eco-certified pin-core aerated latex for breathable, hypoallergenic comfort.',
    thumbnail: '/images/mat_latex.png',
    feel: 'Balanced & Breathable',
    baseFirmnessScore: 6.8,
  },
];

export const SELECTOR_TOP_DESIGNS: SelectorTopDesignOption[] = [
  {
    id: 'normal-top',
    name: 'Normal Top',
    shortDesc: 'A classic, flat mattress-top profile with clean quilted ticking.',
    profileImage: '/images/design_normal.png',
    addedHeight: '20 cm (8 in)',
    comfortFeel: 'Structured & Direct',
  },
  {
    id: 'pillow-top',
    name: 'Pillow Top',
    shortDesc: 'An additional cushioned top layer with a visibly plush, cloud-like profile.',
    profileImage: '/images/design_pillow_top.png',
    addedHeight: '25 cm (10 in)',
    comfortFeel: 'Deep Cloud Loft',
  },
  {
    id: 'euro-top',
    name: 'Euro Top',
    shortDesc: 'An integrated cushioned top panel with a clean, tailored architectural edge.',
    profileImage: '/images/design_euro_top.png',
    addedHeight: '30 cm (12 in)',
    comfortFeel: 'Tailored Luxury Comfort',
  },
];

export const SELECTOR_SIZES: SelectorSizeOption[] = [
  {
    id: 'single',
    name: 'Single',
    dimensionsInches: '36 × 75 in',
    dimensionsCm: '91 × 190 cm',
    recommendedFor: 'Solo sleepers, teenagers & guest bedrooms',
  },
  {
    id: 'double',
    name: 'Double',
    dimensionsInches: '48 × 75 in',
    dimensionsCm: '122 × 190 cm',
    recommendedFor: 'Spacious solo sleep or studio living',
  },
  {
    id: 'queen',
    name: 'Queen',
    dimensionsInches: '60 × 78 in',
    dimensionsCm: '152 × 198 cm',
    recommendedFor: 'Couples & master bedrooms',
    isPopular: true,
  },
  {
    id: 'king',
    name: 'King',
    dimensionsInches: '72 × 78 in',
    dimensionsCm: '183 × 198 cm',
    recommendedFor: 'Expansive master suites & maximum space',
  },
];

const RAW_CATALOGUE_MATCHES: Record<string, CatalogueProductMatch> = {
  // SPRING CONFIGURATIONS
  'spring_normal-top': {
    id: 'spring_normal-top',
    sku: 'MF-SP-NT01',
    name: 'Mindfree Essential Classic Spring',
    series: 'Signature Spring Collection',
    tagline: 'Precision Pocket Coils with Classic Belgian Damask Finish',
    description: 'Constructed with 850+ heat-tempered carbon pocket coils and a streamlined flat quilted cover. Provides exceptional motion isolation and active posture alignment.',
    materialId: 'spring',
    topDesignId: 'normal-top',
    image: '/images/mindfree/mindfree-spring.webp',
    secondaryImage: '/images/mindfree/showroom/spring-display.webp',
    firmnessScore: 7.5,
    firmnessLabel: 'Medium-Firm (7.5 / 10)',
    height: '20 cm (8.0 in)',
    warrantyYears: 10,
    trialNights: 100,
    freeDelivery: true,
    prices: {
      single: 14499,
      double: 17499,
      queen: 19499,
      king: 22499,
    },
    originalPrices: {
      single: 17999,
      double: 21999,
      queen: 24499,
      king: 27999,
    },
    keyFeatures: [
      '850+ Independent carbon pocket coils',
      'Dual edge-guard perimeter reinforcement',
      'Anti-dust mite Belgian knit cover',
      'Zero partner motion transmission',
    ],
    stockStatus: 'in_stock',
    shippingNotice: 'In Stock · Ships within 24 Hours',
    targetHref: '#collection',
  },
  'spring_pillow-top': {
    id: 'spring_pillow-top',
    sku: 'MF-SP-PT02',
    name: 'Mindfree Royal Pillow-Top Spring',
    series: 'Signature Spring Collection',
    tagline: 'Deep Cushioned Pillow Layer Over Zoned Motion Isolation Coils',
    description: 'Combines independent pocketed coils with an opulent 5 cm stitched pillow layer. Delivers instant cloud-soft surface cushioning followed by robust orthopedic core support.',
    materialId: 'spring',
    topDesignId: 'pillow-top',
    image: '/images/mindfree/showroom/spring-display.webp',
    secondaryImage: '/images/mindfree/mindfree-spring.webp',
    firmnessScore: 7.0,
    firmnessLabel: 'Balanced Medium (7.0 / 10)',
    height: '25 cm (10.0 in)',
    warrantyYears: 10,
    trialNights: 100,
    freeDelivery: true,
    prices: {
      single: 16999,
      double: 20499,
      queen: 22999,
      king: 26499,
    },
    originalPrices: {
      single: 20999,
      double: 25499,
      queen: 28999,
      king: 32999,
    },
    keyFeatures: [
      'Extra 5 cm stitched cloud-loft pillow topper',
      'Multi-zone pocket springs for lumbar relief',
      'Cool-weave breathable side ventilation border',
      'High-resilience foam transition layer',
    ],
    stockStatus: 'in_stock',
    shippingNotice: 'In Stock · Ships within 24–48 Hours',
    targetHref: '#collection',
  },
  'spring_euro-top': {
    id: 'spring_euro-top',
    sku: 'MF-SP-ET03',
    name: 'Mindfree Sovereign Euro-Top Spring',
    series: 'Signature Spring Collection',
    tagline: 'Tailored Architectural Euro Gusset with 5-Zone Pocketed Coils',
    description: 'Our flagship hybrid spring model featuring an integrated flush euro-top construction. Elegant tailoring prevents edge collapse while providing luxurious contouring comfort.',
    materialId: 'spring',
    topDesignId: 'euro-top',
    image: '/images/mindfree/mindfree-top-designs.webp',
    secondaryImage: '/images/mindfree/showroom/spring-display.webp',
    firmnessScore: 7.2,
    firmnessLabel: 'Medium-Firm Luxury (7.2 / 10)',
    height: '30 cm (12.0 in)',
    warrantyYears: 12,
    trialNights: 100,
    freeDelivery: true,
    prices: {
      single: 18999,
      double: 22999,
      queen: 25999,
      king: 29999,
    },
    originalPrices: {
      single: 23999,
      double: 28999,
      queen: 32499,
      king: 37499,
    },
    keyFeatures: [
      'Engineered flush euro-panel with champagne piping',
      '5-Zone biomechanical spine alignment matrix',
      'Heavy-gauge perimeter steel support rail',
      'Antimicrobial organic bamboo cover fabric',
    ],
    stockStatus: 'in_stock',
    shippingNotice: 'In Stock · Ships within 24 Hours',
    targetHref: '#collection',
  },

  // EP FOAM CONFIGURATIONS
  'ep-foam_normal-top': {
    id: 'ep-foam_normal-top',
    sku: 'MF-EP-NT01',
    name: 'Mindfree Ortho-Firm EP Core',
    series: 'Orthopedic Spine Care',
    tagline: 'High-Density Polymer Core for Doctor-Approved Lumbar Posture',
    description: 'High-resilience expanded polymer mattress with a firm, balanced flat profile. Recommended by sleep specialists for individuals suffering from lower back stiffness.',
    materialId: 'ep-foam',
    topDesignId: 'normal-top',
    image: '/images/mindfree/mindfree-orthopedic.webp',
    firmnessScore: 8.5,
    firmnessLabel: 'Firm Orthopedic (8.5 / 10)',
    height: '20 cm (8.0 in)',
    warrantyYears: 10,
    trialNights: 100,
    freeDelivery: true,
    prices: {
      single: 12999,
      double: 15499,
      queen: 17499,
      king: 19999,
    },
    originalPrices: {
      single: 15999,
      double: 18999,
      queen: 21999,
      king: 24999,
    },
    keyFeatures: [
      'High-density open-cell EP polymer core',
      'Direct spinal decompression geometry',
      'Zero-sag 10-year durability guarantee',
      'Breathable botanical cotton outer shell',
    ],
    stockStatus: 'in_stock',
    shippingNotice: 'In Stock · Ships within 24 Hours',
    targetHref: '#collection',
  },
  'ep-foam_pillow-top': {
    id: 'ep-foam_pillow-top',
    sku: 'MF-EP-PT02',
    name: 'Mindfree Ortho-Cushion Pillow-Top',
    series: 'Orthopedic Spine Care',
    tagline: 'Dual-Layered Orthopedic Support with Plush Pressure-Relief Topper',
    description: 'Balances deep orthopedic spinal alignment with a soft, forgiving pillow-top layer to alleviate pressure at the shoulder blades and pelvic bones.',
    materialId: 'ep-foam',
    topDesignId: 'pillow-top',
    image: '/images/mindfree/mindfree-orthopedic.webp',
    firmnessScore: 7.8,
    firmnessLabel: 'Medium-Firm Ortho (7.8 / 10)',
    height: '25 cm (10.0 in)',
    warrantyYears: 10,
    trialNights: 100,
    freeDelivery: true,
    prices: {
      single: 15499,
      double: 18499,
      queen: 20999,
      king: 23999,
    },
    originalPrices: {
      single: 18999,
      double: 22999,
      queen: 25999,
      king: 29999,
    },
    keyFeatures: [
      'Dual-density structure: Soft top + Firm base',
      'Therapeutic pressure-point decompression',
      'Reinforced side perimeter stability',
      'Hypoallergenic dust-mite repellent fabric',
    ],
    stockStatus: 'in_stock',
    shippingNotice: 'In Stock · Ships within 24–48 Hours',
    targetHref: '#collection',
  },
  'ep-foam_euro-top': {
    id: 'ep-foam_euro-top',
    sku: 'MF-EP-ET03',
    name: 'Mindfree Executive Ortho Euro-Top',
    series: 'Orthopedic Spine Care',
    tagline: 'Architectural Tailored Orthopedic Design with Enhanced Edge Hold',
    description: 'A luxurious orthopedic solution featuring an integrated euro-top cushion panel. Delivers uncompromising postural support with a clean, contemporary hotel-suite finish.',
    materialId: 'ep-foam',
    topDesignId: 'euro-top',
    image: '/images/mindfree/mindfree-top-designs.webp',
    firmnessScore: 8.0,
    firmnessLabel: 'Structured Orthopedic (8.0 / 10)',
    height: '30 cm (12.0 in)',
    warrantyYears: 10,
    trialNights: 100,
    freeDelivery: true,
    prices: {
      single: 16999,
      double: 20499,
      queen: 22999,
      king: 26499,
    },
    originalPrices: {
      single: 20999,
      double: 24999,
      queen: 28499,
      king: 32499,
    },
    keyFeatures: [
      'Reinforced box-stitched euro border',
      'High-grade EP foam core + memory transition',
      'Zero toxic off-gassing certification',
      'Ergonomic multi-zone posture support',
    ],
    stockStatus: 'in_stock',
    shippingNotice: 'In Stock · Ships within 24 Hours',
    targetHref: '#collection',
  },

  // REBOUND FOAM CONFIGURATIONS
  'rebound-foam_normal-top': {
    id: 'rebound-foam_normal-top',
    sku: 'MF-RB-NT01',
    name: 'Mindfree Rebound Active Core',
    series: 'Resilient Rebound Series',
    tagline: 'High-Density Bonded Rebound Matrix for Instant Dynamic Recovery',
    description: 'Engineered for sleepers who prefer rapid kinetic response. Bonded high-density rebound foam instantly regains its shape, preventing any body impression dips.',
    materialId: 'rebound-foam',
    topDesignId: 'normal-top',
    image: '/images/mindfree/mindfree-coir.webp',
    firmnessScore: 7.8,
    firmnessLabel: 'Firm & Resilient (7.8 / 10)',
    height: '20 cm (8.0 in)',
    warrantyYears: 8,
    trialNights: 100,
    freeDelivery: true,
    prices: {
      single: 11499,
      double: 13999,
      queen: 15999,
      king: 18499,
    },
    originalPrices: {
      single: 14499,
      double: 17499,
      queen: 19999,
      king: 22999,
    },
    keyFeatures: [
      'Ultra high-density bonded rebound core',
      'Instant shape recovery & active bounce',
      'Durable edge-to-edge support',
      'Breathable organic cotton casing',
    ],
    stockStatus: 'in_stock',
    shippingNotice: 'In Stock · Ships within 24 Hours',
    targetHref: '#collection',
  },
  'rebound-foam_pillow-top': {
    id: 'rebound-foam_pillow-top',
    sku: 'MF-RB-PT02',
    name: 'Mindfree Rebound Cloud Cushion',
    series: 'Resilient Rebound Series',
    tagline: 'Resilient Core with Quilted Pillow-Top for Balanced Cloud Bounce',
    description: 'Combines the long-lasting resilience of rebound foam with a generous pillow topper that softens surface contact for everyday restorative comfort.',
    materialId: 'rebound-foam',
    topDesignId: 'pillow-top',
    image: '/images/mindfree/mindfree-coir.webp',
    firmnessScore: 7.2,
    firmnessLabel: 'Medium-Firm Bounce (7.2 / 10)',
    height: '25 cm (10.0 in)',
    warrantyYears: 8,
    trialNights: 100,
    freeDelivery: true,
    prices: {
      single: 13999,
      double: 16999,
      queen: 18999,
      king: 21999,
    },
    originalPrices: {
      single: 17499,
      double: 20999,
      queen: 23499,
      king: 26999,
    },
    keyFeatures: [
      'Sewn-on plush micro-cushion topper',
      'Heavy-duty rebound base prevents sagging',
      'Cool-flow ventilation eyelets',
      'Dual-tone forest green piping',
    ],
    stockStatus: 'in_stock',
    shippingNotice: 'In Stock · Ships within 24–48 Hours',
    targetHref: '#collection',
  },
  'rebound-foam_euro-top': {
    id: 'rebound-foam_euro-top',
    sku: 'MF-RB-ET03',
    name: 'Mindfree Rebound Pro Euro-Top',
    series: 'Resilient Rebound Series',
    tagline: 'Architectural Euro-Tailored Construction with High-Elastic Rebound',
    description: 'A durable luxury mattress built with high-elastic rebound foam and an integrated euro panel. Engineered for supreme durability in upscale master bedrooms.',
    materialId: 'rebound-foam',
    topDesignId: 'euro-top',
    image: '/images/mindfree/mindfree-top-designs.webp',
    firmnessScore: 7.5,
    firmnessLabel: 'Balanced Firm (7.5 / 10)',
    height: '30 cm (12.0 in)',
    warrantyYears: 10,
    trialNights: 100,
    freeDelivery: true,
    prices: {
      single: 15499,
      double: 18499,
      queen: 20999,
      king: 24499,
    },
    originalPrices: {
      single: 19499,
      double: 22999,
      queen: 25999,
      king: 29999,
    },
    keyFeatures: [
      'Tailored euro edge eliminates roll-off',
      'Multi-density rebound foam layers',
      'Hypoallergenic damask jacquard fabric',
      '10-Year anti-sag guarantee',
    ],
    stockStatus: 'in_stock',
    shippingNotice: 'In Stock · Ships within 24 Hours',
    targetHref: '#collection',
  },

  // MEMORY FOAM CONFIGURATIONS
  'memory-foam_normal-top': {
    id: 'memory-foam_normal-top',
    sku: 'MF-MF-NT01',
    name: 'Mindfree Zero-G Memory Foam',
    series: 'Adaptive Memory Foam',
    tagline: 'Cooling Gel-Infused Visco-Elastic Matrix for Zero-Gravity Rest',
    description: 'Engineered with open-cell cooling memory foam that gently cradles your body contours, redistributing body weight and virtually eliminating painful pressure hotspots.',
    materialId: 'memory-foam',
    topDesignId: 'normal-top',
    image: '/images/mindfree/mindfree-memory-foam.webp',
    secondaryImage: '/images/mindfree/showroom/memory-foam-display.webp',
    firmnessScore: 6.0,
    firmnessLabel: 'Plush-Medium (6.0 / 10)',
    height: '20 cm (8.0 in)',
    warrantyYears: 10,
    trialNights: 100,
    freeDelivery: true,
    prices: {
      single: 13999,
      double: 16999,
      queen: 18999,
      king: 21999,
    },
    originalPrices: {
      single: 17499,
      double: 20999,
      queen: 23499,
      king: 26999,
    },
    keyFeatures: [
      'Air-cool visco-elastic open-cell matrix',
      'Micro-gel thermal dissipation beads',
      'Zero-pressure spinal decompression',
      'Washable zippered bamboo velour cover',
    ],
    stockStatus: 'in_stock',
    shippingNotice: 'In Stock · Ships within 24 Hours',
    targetHref: '#collection',
  },
  'memory-foam_pillow-top': {
    id: 'memory-foam_pillow-top',
    sku: 'MF-MF-PT02',
    name: 'Mindfree Cloud-Rest Pillow-Top Memory',
    series: 'Adaptive Memory Foam',
    tagline: 'Multi-Zone Contouring with Sumptuous Gel-Memory Pillow Layer',
    description: 'An indulgent sleep experience with a 5 cm plush cooling pillow-top sewn directly over a supportive high-density transition core. Sink in while staying properly supported.',
    materialId: 'memory-foam',
    topDesignId: 'pillow-top',
    image: '/images/mindfree/showroom/memory-foam-display.webp',
    secondaryImage: '/images/mindfree/mindfree-memory-foam.webp',
    firmnessScore: 5.5,
    firmnessLabel: 'Ultra-Plush Cloud (5.5 / 10)',
    height: '25 cm (10.0 in)',
    warrantyYears: 10,
    trialNights: 100,
    freeDelivery: true,
    prices: {
      single: 16999,
      double: 20499,
      queen: 22999,
      king: 26499,
    },
    originalPrices: {
      single: 20999,
      double: 25499,
      queen: 28999,
      king: 32999,
    },
    keyFeatures: [
      'Sumptuous 5 cm cooling gel memory pillow topper',
      'Zoned pressure relief for side & back sleepers',
      'Thermal-regulating microclimate fabric',
      'Motion isolation eliminates partner disturbance',
    ],
    stockStatus: 'in_stock',
    shippingNotice: 'In Stock · Ships within 24–48 Hours',
    targetHref: '#collection',
  },
  'memory-foam_euro-top': {
    id: 'memory-foam_euro-top',
    sku: 'MF-MF-ET03',
    name: 'Mindfree Signature Contour Euro-Top',
    series: 'Adaptive Memory Foam',
    tagline: 'Flagship Luxury Memory Foam with Architectural Tailored Euro Panel',
    description: 'Our top-tier memory foam configuration with an integrated euro-top panel. Combines four progressive layers of cooling gel, transition latex, and high-density foundation.',
    materialId: 'memory-foam',
    topDesignId: 'euro-top',
    image: '/images/mindfree/showroom/memory-foam-display.webp',
    secondaryImage: '/images/mindfree/mindfree-top-designs.webp',
    firmnessScore: 6.2,
    firmnessLabel: 'Plush-Medium Luxury (6.2 / 10)',
    height: '30 cm (12.0 in)',
    warrantyYears: 12,
    trialNights: 100,
    freeDelivery: true,
    prices: {
      single: 18999,
      double: 22999,
      queen: 25499,
      king: 29999,
    },
    originalPrices: {
      single: 23999,
      double: 28999,
      queen: 32499,
      king: 37499,
    },
    keyFeatures: [
      'Integrated euro-panel with reinforced edge support',
      'Phase-change temperature neutralization fabric',
      '4 Progressive contouring & orthopedic layers',
      'Gold-embroidered Mindfree hallmark label',
    ],
    stockStatus: 'in_stock',
    shippingNotice: 'In Stock · Ships within 24 Hours',
    targetHref: '#collection',
  },

  // LATEX CONFIGURATIONS
  'latex_normal-top': {
    id: 'latex_normal-top',
    sku: 'MF-LX-NT01',
    name: 'Mindfree Pure Organic Latex',
    series: 'Botanical Latex Collection',
    tagline: '100% GOLS-Certified Organic Pin-Core Aerated Latex Slab',
    description: 'Crafted from pure natural rubber tree sap without synthetic petrochemicals. Features thousands of pin-core aeration channels for cool, buoyant, hypoallergenic rest.',
    materialId: 'latex',
    topDesignId: 'normal-top',
    image: '/images/mindfree/mindfree-latex.webp',
    secondaryImage: '/images/mindfree/showroom/latex-display.webp',
    firmnessScore: 6.8,
    firmnessLabel: 'Balanced Adaptive (6.8 / 10)',
    height: '20 cm (8.0 in)',
    warrantyYears: 12,
    trialNights: 100,
    freeDelivery: true,
    prices: {
      single: 21999,
      double: 26499,
      queen: 29999,
      king: 34999,
    },
    originalPrices: {
      single: 26999,
      double: 32499,
      queen: 36999,
      king: 42999,
    },
    keyFeatures: [
      '100% GOLS & eco-INSTITUT certified organic latex',
      'Continuous pin-core micro-airflow circulation',
      'Naturally antibacterial, anti-fungal & dust-mite proof',
      'GOTS organic certified unbleached cotton cover',
    ],
    stockStatus: 'in_stock',
    shippingNotice: 'In Stock · Ships within 24 Hours',
    targetHref: '#collection',
  },
  'latex_pillow-top': {
    id: 'latex_pillow-top',
    sku: 'MF-LX-PT02',
    name: 'Mindfree Eco-Luxe Pillow-Top Latex',
    series: 'Botanical Latex Collection',
    tagline: 'Natural Latex Core with Quilted Organic Wool & Latex Pillow Topper',
    description: 'An ultra-luxurious botanical mattress with a separate organic wool and pin-core latex pillow layer. Delivers unparalleled plushness while remaining 100% natural and breathable.',
    materialId: 'latex',
    topDesignId: 'pillow-top',
    image: '/images/mindfree/showroom/latex-display.webp',
    secondaryImage: '/images/mindfree/mindfree-latex.webp',
    firmnessScore: 6.2,
    firmnessLabel: 'Plush Natural Loft (6.2 / 10)',
    height: '25 cm (10.0 in)',
    warrantyYears: 12,
    trialNights: 100,
    freeDelivery: true,
    prices: {
      single: 24999,
      double: 29999,
      queen: 33999,
      king: 39499,
    },
    originalPrices: {
      single: 30999,
      double: 36999,
      queen: 41999,
      king: 48999,
    },
    keyFeatures: [
      'Organic New Zealand wool + latex cloud topper',
      'Pin-core aeration prevents night-sweat accumulation',
      'Sustainably harvested biodegradable components',
      'Zero volatile organic compounds (VOCs)',
    ],
    stockStatus: 'in_stock',
    shippingNotice: 'In Stock · Ships within 24–48 Hours',
    targetHref: '#collection',
  },
  'latex_euro-top': {
    id: 'latex_euro-top',
    sku: 'MF-LX-ET03',
    name: 'Mindfree Sovereign Botanical Euro-Top',
    series: 'Botanical Latex Collection',
    tagline: 'Masterpiece 7-Zone Organic Latex with Integrated Tailored Euro-Panel',
    description: 'The pinnacle of natural sleep engineering. A 30 cm architectural masterpiece with 7 ergonomic density zones that cradle the head, shoulders, lumbar, hips, and calves.',
    materialId: 'latex',
    topDesignId: 'euro-top',
    image: '/images/mindfree/showroom/latex-display.webp',
    secondaryImage: '/images/mindfree/mindfree-top-designs.webp',
    firmnessScore: 6.6,
    firmnessLabel: '7-Zone Luxury Latex (6.6 / 10)',
    height: '30 cm (12.0 in)',
    warrantyYears: 15,
    trialNights: 100,
    freeDelivery: true,
    prices: {
      single: 27499,
      double: 32999,
      queen: 36999,
      king: 43499,
    },
    originalPrices: {
      single: 33999,
      double: 40999,
      queen: 45999,
      king: 53999,
    },
    keyFeatures: [
      '7 Biomechanical zoned densities for optimal spine posture',
      'Tailored architectural euro border with forest-green piping',
      '15-Year unconditional manufacturer warranty',
      '100% Certified vegan & zero synthetic additives',
    ],
    stockStatus: 'in_stock',
    shippingNotice: 'In Stock · Ships within 24 Hours',
    targetHref: '#collection',
  },
};

export const CATALOGUE_MATCHES: Record<string, CatalogueProductMatch> = Object.fromEntries(
  Object.entries(RAW_CATALOGUE_MATCHES).map(([key, match]) => [
    key,
    {
      ...match,
      prices: {
        single: match.prices.single * 2,
        double: match.prices.double * 2,
        queen: match.prices.queen * 2,
        king: match.prices.king * 2,
      },
      originalPrices: {
        single: match.originalPrices.single * 2,
        double: match.originalPrices.double * 2,
        queen: match.originalPrices.queen * 2,
        king: match.originalPrices.king * 2,
      },
    },
  ])
);

export function getMatchingProduct(
  materialId: MattressMaterialId,
  topDesignId: TopDesignId
): CatalogueProductMatch {
  const key = `${materialId}_${topDesignId}`;
  return (
    CATALOGUE_MATCHES[key] ||
    CATALOGUE_MATCHES['spring_euro-top']
  );
}

export function formatPriceINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
