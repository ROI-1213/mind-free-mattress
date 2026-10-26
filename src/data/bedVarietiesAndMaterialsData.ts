export type BedVarietyId = 'normal-bed' | 'pillow-top-bed' | 'euro-top-bed';
export type ConstructionMaterialId = 'spring' | 'ep-foam' | 'rebound-foam' | 'memory-foam' | 'latex';

export interface BedVarietyItem {
  id: BedVarietyId;
  number: string;
  name: string;
  badge: string;
  tagline: string;
  bullets: [string, string];
  image: string;
  secondaryImage: string;
  diagramImage: string;
  profileHeight: string;
  firmnessFeel: string;
  surfaceConstruction: string;
  edgeProfile: string;
  idealFor: string[];
  compatibleMaterials: ConstructionMaterialId[];
  extendedDescription: string;
  architecturalHighlights: {
    label: string;
    value: string;
  }[];
  selectorTopDesignId: 'normal-top' | 'pillow-top' | 'euro-top';
}

export interface ConstructionMaterialItem {
  id: ConstructionMaterialId;
  number: string;
  name: string;
  description: string;
  extendedNote: string;
  badge: string;
  roleInMattress: string;
  image: string;
  thumbnail: string;
  keyProperties: [string, string, string];
  typicalPlacement: string;
  layerColor: string;
  layerBorderColor: string;
  layerAccentColor: string;
  layerPattern: 'springs' | 'ep-cell' | 'rebound-matrix' | 'memory-wave' | 'latex-pincore';
}

export const BED_VARIETIES: BedVarietyItem[] = [
  {
    id: 'normal-bed',
    number: '01',
    name: 'Normal Bed',
    badge: 'Classic Silhouette',
    tagline: 'Timeless Flat-Crown Architecture',
    bullets: [
      'Classic design with a comfortable and supportive sleeping surface.',
      'Suitable for everyday sleeping comfort.',
    ],
    image: '/images/mindfree/showroom/latex-display.webp',
    secondaryImage: '/images/mindfree/mindfree-top-designs.webp',
    diagramImage: '/images/design_normal.png',
    profileHeight: '20 cm (8 in)',
    firmnessFeel: 'Balanced & Supportive',
    surfaceConstruction: 'Tight-top quilted damask panel',
    edgeProfile: 'Clean tailored perimeter piping',
    idealFor: [
      'Everyday family and master bedrooms',
      'Back and stomach sleepers seeking direct support',
      'Minimalist platform and contemporary bed frames',
    ],
    compatibleMaterials: ['spring', 'ep-foam', 'rebound-foam', 'memory-foam', 'latex'],
    extendedDescription:
      'The Normal Bed features a classic tight-top construction where the quilted fabric cover is tailored directly over the comfort and support layers. Without an external topper gusset, you experience immediate, responsive contact with the underlying mattress core—making it an enduring choice for consistent, everyday sleeping comfort.',
    architecturalHighlights: [
      { label: 'Top Profile', value: 'Classic Tight-Top Quilted Surface' },
      { label: 'Comfort Feel', value: 'Direct, Supportive & Responsive' },
      { label: 'Standard Height', value: '20 cm (8 Inches)' },
      { label: 'Sheet Fit', value: 'Fits all standard fitted sheets effortlessly' },
    ],
    selectorTopDesignId: 'normal-top',
  },
  {
    id: 'pillow-top-bed',
    number: '02',
    name: 'Pillow Top Bed',
    badge: 'Plush Cloud Loft',
    tagline: 'Elevated Cushioning Topper',
    bullets: [
      'Features an additional cushioned comfort layer on top.',
      'Provides a plush and soft sleeping experience.',
    ],
    image: '/images/mindfree/showroom/spring-display.webp',
    secondaryImage: '/images/mindfree/mindfree-top-designs.webp',
    diagramImage: '/images/design_pillow_top.png',
    profileHeight: '25 cm (10 in)',
    firmnessFeel: 'Plush & Cloud-Soft',
    surfaceConstruction: 'Dedicated stitched pillow comfort crown',
    edgeProfile: 'indented gusset seam beneath top pillow layer',
    idealFor: [
      'Side sleepers needing extra shoulder & hip cushioning',
      'Those who love a soft, enveloping hotel-bed feel',
      'Sleepers seeking gentle surface pressure relief',
    ],
    compatibleMaterials: ['spring', 'ep-foam', 'rebound-foam', 'memory-foam', 'latex'],
    extendedDescription:
      'The Pillow Top Bed is crafted with an additional cushioned comfort layer sewn onto the top of the mattress, distinguished by a subtle side indentation between the topper and the support core. This extra loft gently cradles your body upon lie-down while the foundational layers underneath maintain healthy postural support.',
    architecturalHighlights: [
      { label: 'Top Profile', value: 'Cushioned Pillow-Loft Crown' },
      { label: 'Comfort Feel', value: 'Plush, Soft & Pressure-Relieving' },
      { label: 'Standard Height', value: '25 cm (10 Inches)' },
      { label: 'Surface Loft', value: '+5 cm dedicated comfort cushioning' },
    ],
    selectorTopDesignId: 'pillow-top',
  },
  {
    id: 'euro-top-bed',
    number: '03',
    name: 'Euro Top Bed',
    badge: 'Tailored Luxury',
    tagline: 'Flush Edge-to-Edge Gusset',
    bullets: [
      'Features an integrated, edge-to-edge comfort layer.',
      'Offers a luxurious appearance and a smooth, comfortable sleeping surface.',
    ],
    image: '/images/mindfree/craft-durable.webp',
    secondaryImage: '/images/mindfree/mindfree-orthopedic.webp',
    diagramImage: '/images/design_euro_top.png',
    profileHeight: '30 cm (12 in)',
    firmnessFeel: 'Luxurious Plush-Balanced',
    surfaceConstruction: 'Integrated flush-bordered Euro comfort panel',
    edgeProfile: 'Uniform stacked architectural edge with double piping',
    idealFor: [
      'Luxury master suites & couples sharing the bed',
      'Combination sleepers who use the full width of the bed',
      'Those desiring plush comfort with crisp edge-to-edge stability',
    ],
    compatibleMaterials: ['spring', 'ep-foam', 'rebound-foam', 'memory-foam', 'latex'],
    extendedDescription:
      'The Euro Top Bed integrates its plush comfort padding directly beneath the outer quilted gusset so the edges sit completely flush with the main mattress body. This edge-to-edge engineering delivers a refined architectural silhouette, superior perimeter stability, and a smooth, sumptuous sleeping surface.',
    architecturalHighlights: [
      { label: 'Top Profile', value: 'Integrated Edge-to-Edge Euro Panel' },
      { label: 'Comfort Feel', value: 'Smooth, Luxurious & Uniform' },
      { label: 'Standard Height', value: '30 cm (12 Inches)' },
      { label: 'Edge Support', value: 'Flush perimeter for 100% usable sleep surface' },
    ],
    selectorTopDesignId: 'euro-top',
  },
];

export const CONSTRUCTION_MATERIALS: ConstructionMaterialItem[] = [
  {
    id: 'spring',
    number: '01',
    name: 'Spring',
    description: 'Provides structural support, responsiveness, and airflow.',
    extendedNote:
      'Used as the primary support core in our spring and hybrid constructions, independent coils respond dynamically to movement while promoting internal air circulation.',
    badge: 'Structural Core',
    roleInMattress: 'Support Foundation & Airflow Core',
    image: '/images/mindfree/3d-pocket-springs.webp',
    thumbnail: '/images/mat_spring.png',
    keyProperties: ['Structural Support', 'Active Responsiveness', 'Continuous Airflow'],
    typicalPlacement: 'Core Support Layer',
    layerColor: '#E5E8EA',
    layerBorderColor: '#8C9A94',
    layerAccentColor: '#0A2E73',
    layerPattern: 'springs',
  },
  {
    id: 'ep-foam',
    number: '02',
    name: 'EP Foam',
    description: 'A foam material used in mattress construction for comfort and support.',
    extendedNote:
      'Engineered to offer dependable cushioning and structural stability, EP Foam can serve as a supportive transition layer or foundational foam core depending on the mattress model.',
    badge: 'Balanced Support',
    roleInMattress: 'Comfort & Structural Transition',
    image: '/images/mindfree/3d-ep-foam.webp',
    thumbnail: '/images/mat_ep_foam.png',
    keyProperties: ['Balanced Cushioning', 'Dependable Support', 'Shape Retention'],
    typicalPlacement: 'Transition or Base Support Layer',
    layerColor: '#F4EFE6',
    layerBorderColor: '#D1AC6B',
    layerAccentColor: '#E3262E',
    layerPattern: 'ep-cell',
  },
  {
    id: 'rebound-foam',
    number: '03',
    name: 'Rebound Foam',
    description: 'Helps deliver responsive cushioning and support.',
    extendedNote:
      'Formulated for resilient recovery, Rebound Foam gently pushes back against body weight to prevent excessive sinking and maintain comfortable posture.',
    badge: 'Resilient Recovery',
    roleInMattress: 'Responsive Cushioning & Posture Support',
    image: '/images/mindfree/difference-breathable-cooler.webp',
    thumbnail: '/images/mat_rebound.png',
    keyProperties: ['Responsive Cushioning', 'Quick Recovery', 'Postural Pushback'],
    typicalPlacement: 'Supportive Comfort / Transition Layer',
    layerColor: '#E8ECE6',
    layerBorderColor: '#9FB3A6',
    layerAccentColor: '#0A2E73',
    layerPattern: 'rebound-matrix',
  },
  {
    id: 'memory-foam',
    number: '04',
    name: 'Memory Foam',
    description: 'Conforms to body contours to help relieve pressure.',
    extendedNote:
      'Visco-elastic Memory Foam adapts closely to the natural curves of your shoulders, back, and hips, evenly distributing weight for targeted pressure relief.',
    badge: 'Body Contouring',
    roleInMattress: 'Adaptive Pressure-Relieving Comfort',
    image: '/images/mindfree/mindfree-memory-foam.webp',
    thumbnail: '/images/mat_memory.png',
    keyProperties: ['Body Contouring', 'Pressure Point Relief', 'Motion Dampening'],
    typicalPlacement: 'Upper Comfort / Cushioning Layer',
    layerColor: '#EDE7DC',
    layerBorderColor: '#C5A059',
    layerAccentColor: '#E3262E',
    layerPattern: 'memory-wave',
  },
  {
    id: 'latex',
    number: '05',
    name: 'Latex',
    description: 'Offers responsive comfort, resilience, and durability.',
    extendedNote:
      'Featuring pin-core ventilation channels, Latex combines buoyant elasticity with long-lasting structural resilience for an uplifting, breathable sleep surface.',
    badge: 'Buoyant & Durable',
    roleInMattress: 'Responsive Comfort & Long-Term Resilience',
    image: '/images/mindfree/3d-latex-pincore.webp',
    thumbnail: '/images/mat_latex.png',
    keyProperties: ['Responsive Comfort', 'Natural Resilience', 'Long-Lasting Durability'],
    typicalPlacement: 'Primary Comfort Layer',
    layerColor: '#DCE6DC',
    layerBorderColor: '#7A9A84',
    layerAccentColor: '#0A2E73',
    layerPattern: 'latex-pincore',
  },
];

export interface SampleConstructionPreset {
  id: string;
  name: string;
  subtitle: string;
  bedVarietyId: BedVarietyId;
  note: string;
  layers: {
    role: string;
    materialId?: ConstructionMaterialId;
    customName?: string;
    customDesc?: string;
    thicknessLabel: string;
  }[];
}

export const SAMPLE_CONSTRUCTION_PRESETS: SampleConstructionPreset[] = [
  {
    id: 'classic-support',
    name: 'Classic Everyday Construction',
    subtitle: 'Example using Normal Bed profile with Rebound & EP Foam support',
    bedVarietyId: 'normal-bed',
    note: 'Materials vary by model — this example shows a supportive foam construction.',
    layers: [
      {
        role: 'Sleeping Surface (Normal Bed)',
        customName: 'Classic Tight-Top Quilted Cover',
        customDesc: 'Classic design with a comfortable and supportive sleeping surface.',
        thicknessLabel: 'Quilted Crown',
      },
      {
        role: 'Responsive Comfort Layer',
        materialId: 'rebound-foam',
        thicknessLabel: 'Comfort Layer',
      },
      {
        role: 'Support Foundation',
        materialId: 'ep-foam',
        thicknessLabel: 'Support Core',
      },
    ],
  },
  {
    id: 'pillow-top-plush',
    name: 'Plush Cushion Construction',
    subtitle: 'Example using Pillow Top Bed profile with Memory Foam & Spring core',
    bedVarietyId: 'pillow-top-bed',
    note: 'Materials vary by model — this example pairs a cushioned pillow top with contouring foam and springs.',
    layers: [
      {
        role: 'Pillow Top Comfort Crown',
        customName: 'Attached Cushioned Pillow Top',
        customDesc: 'Features an additional cushioned comfort layer on top for a plush and soft sleeping experience.',
        thicknessLabel: 'Pillow Top Layer',
      },
      {
        role: 'Contouring Layer',
        materialId: 'memory-foam',
        thicknessLabel: 'Pressure Relief',
      },
      {
        role: 'Transition Layer',
        materialId: 'ep-foam',
        thicknessLabel: 'Transition Support',
      },
      {
        role: 'Structural Core',
        materialId: 'spring',
        thicknessLabel: 'Spring System',
      },
    ],
  },
  {
    id: 'euro-top-luxury',
    name: 'Luxury Edge-to-Edge Construction',
    subtitle: 'Example using Euro Top Bed profile with Latex, Rebound Foam & Spring',
    bedVarietyId: 'euro-top-bed',
    note: 'Materials vary by model — this example illustrates a multi-layer Euro Top configuration.',
    layers: [
      {
        role: 'Euro Top Integrated Panel',
        customName: 'Flush Edge-to-Edge Euro Top',
        customDesc: 'Features an integrated, edge-to-edge comfort layer for a luxurious appearance and smooth sleeping surface.',
        thicknessLabel: 'Euro Top Panel',
      },
      {
        role: 'Resilient Comfort Layer',
        materialId: 'latex',
        thicknessLabel: 'Latex Comfort',
      },
      {
        role: 'Responsive Support Layer',
        materialId: 'rebound-foam',
        thicknessLabel: 'Rebound Support',
      },
      {
        role: 'Structural Core',
        materialId: 'spring',
        thicknessLabel: 'Spring Core',
      },
    ],
  },
];
