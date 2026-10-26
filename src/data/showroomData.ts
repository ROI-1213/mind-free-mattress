export interface ShowroomFeature {
  title: string;
  subtitle: string;
}

export interface SignatureMattressModel {
  id: string;
  number: string;
  label: string; // e.g. "01 / RESPONSIVE COMFORT"
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  ctaText: string;
  route: string;
  image: string;
  macroImage: string;
  plinthStyle: 'dark-green' | 'travertine-stone' | 'olive-stone';
  isHero: boolean;
  specs: {
    height: string;
    firmness: string;
    firmnessScore: number; // e.g. 7.5 out of 10
    composition: string;
    warranty: string;
    trial: string;
  };
  sizes: string[];
  features: [ShowroomFeature, ShowroomFeature, ShowroomFeature];
}

export const SIGNATURE_MATTRESSES: SignatureMattressModel[] = [
  {
    id: 'spring-collection',
    number: '01',
    label: '01 / RESPONSIVE COMFORT',
    title: 'Spring Collection',
    subtitle: 'Independent Pocketed Carbon Steel Coils',
    tagline: 'Dynamic Spinal Response & Breathable Kinetic Isolation',
    description: 'Discover responsive support and the construction of spring-based comfort. Engineered with over 850 individually encased carbon-tempered coils that adapt instantly to every micro-movement without transferring partner motion.',
    ctaText: 'Explore Spring →',
    route: '/mattresses/spring',
    image: '/images/mindfree/showroom/spring-display.webp',
    macroImage: '/images/mindfree/3d-pocket-springs.webp',
    plinthStyle: 'dark-green',
    isHero: false,
    specs: {
      height: '32 cm (12.5 in)',
      firmness: 'Medium-Firm',
      firmnessScore: 7.5,
      composition: '850+ Zoned Pocket Springs, High-Resilience Transition Foam, Belgian Damask Knit',
      warranty: '10 Years Comprehensive Assurance',
      trial: '100 Nights Risk-Free Trial',
    },
    sizes: ['Single (36 × 72 in)', 'Queen (60 × 78 in)', 'King (72 × 78 in)', 'Custom Dimensions'],
    features: [
      {
        title: 'Independent Coil Flex',
        subtitle: 'Targeted flex prevents partner disturbance',
      },
      {
        title: '5-Zone Lumbar Alignment',
        subtitle: 'Optimal orthopedic spine support',
      },
      {
        title: 'Reinforced Perimeter Edge',
        subtitle: '100% usable surface without edge sag',
      },
    ],
  },
  {
    id: 'memory-foam-collection',
    number: '02',
    label: '02 / ADAPTIVE COMFORT',
    title: 'Memory Foam Collection',
    subtitle: 'Cooling Gel-Infused Visco-Elastic Matrix',
    tagline: 'Deep Zero-Pressure Weightlessness & Contouring Luxury',
    description: 'Explore the cushioning layers and material details behind memory foam comfort. Calibrated to relieve stress at major pressure points while dissipating heat via infused micro-gel pearls for restorative rest.',
    ctaText: 'Explore Memory Foam →',
    route: '/mattresses/memory-foam',
    image: '/images/mindfree/showroom/memory-foam-display.webp',
    macroImage: '/images/mindfree/difference-pressure-relief.webp',
    plinthStyle: 'travertine-stone',
    isHero: true,
    specs: {
      height: '30 cm (12.0 in)',
      firmness: 'Plush-Medium',
      firmnessScore: 6.0,
      composition: 'Air-Cool Visco-Elastic Foam, High-Density Support Core, Belgian Damask Silk Cover',
      warranty: '10 Years Comprehensive Assurance',
      trial: '100 Nights Risk-Free Trial',
    },
    sizes: ['Single (36 × 72 in)', 'Queen (60 × 78 in)', 'King (72 × 78 in)', 'Custom Dimensions'],
    features: [
      {
        title: 'Deep Pressure Redistribution',
        subtitle: 'Relieves stress at shoulders & hips',
      },
      {
        title: 'Cooling Micro-Gel Beads',
        subtitle: 'Maintains optimal sleeping temperature',
      },
      {
        title: 'Adaptive Silhouette Contouring',
        subtitle: 'Envelops the body without sinking',
      },
    ],
  },
  {
    id: 'latex-collection',
    number: '03',
    label: '03 / NATURAL COMFORT',
    title: 'Latex Collection',
    subtitle: '100% Organic Aerated Pin-Core Latex',
    tagline: 'Botanical Purity, Buoyant Uplift & 360° Air Circulation',
    description: 'Explore latex construction and the materials used in responsive comfort. Naturally hypoallergenic, dust-mite resistant, and sustainably harvested from organic rubber plantations with vertical aeration channels.',
    ctaText: 'Explore Latex →',
    route: '/mattresses/latex',
    image: '/images/mindfree/showroom/latex-display.webp',
    macroImage: '/images/mindfree/3d-latex-pincore.webp',
    plinthStyle: 'olive-stone',
    isHero: false,
    specs: {
      height: '28 cm (11.0 in)',
      firmness: 'Balanced Adaptive',
      firmnessScore: 6.5,
      composition: '100% Natural Organic Hevea Latex, Pin-Core Aeration, Organic Bamboo Jacquard',
      warranty: '10 Years Comprehensive Assurance',
      trial: '100 Nights Risk-Free Trial',
    },
    sizes: ['Single (36 × 72 in)', 'Queen (60 × 78 in)', 'King (72 × 78 in)', 'Custom Dimensions'],
    features: [
      {
        title: 'Pin-Core Micro Air Channels',
        subtitle: 'Continuous 360° airflow and heat escape',
      },
      {
        title: '100% Botanical Hevea Latex',
        subtitle: 'Zero chemical off-gassing, eco-certified',
      },
      {
        title: 'Instant Resilient Uplift',
        subtitle: 'Effortless turning without feeling stuck',
      },
    ],
  },
];
