export interface LayerFeature {
  title: string;
  subtitle: string;
  icon: string;
}

export interface MattressLayerData {
  id: string;
  layerNumber: string; // e.g. "LAYER 01 / 07"
  index: number;
  name: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  image: string;
  features: [LayerFeature, LayerFeature, LayerFeature];
  specs: {
    thickness: string;
    density: string;
    composition: string;
  };
  // 3D physical visualization properties
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  closedY: number;
  explodedY: number;
  color: string;
  accentColor: string;
  roughness: number;
  metalness: number;
  textureType: 'quilted' | 'foam-ep' | 'foam-rebound' | 'memory-foam' | 'latex-pincore' | 'pocket-springs' | 'natural-coir';
  isHeroThumbnail: boolean;
  thumbnailLabel?: string;
  thumbnailNumber?: string;
  hotspot: {
    position: [number, number, number];
    label: string;
    side: 'left' | 'right';
  };
}

export const MATTRESS_LAYERS: MattressLayerData[] = [
  {
    id: 'fabric-cover',
    layerNumber: 'LAYER 01 / 07',
    index: 0,
    name: 'Quilted Fabric Cover',
    subtitle: 'Breathable Belgian Damask Knit',
    description: 'Ultra-plush Belgian damask jacquard woven cover infused with natural silk and silver fibers, delivering whisper-soft tactile comfort, anti-dust-mite defense, and instant temperature regulation.',
    detailedDescription: 'Hand-tufted with reinforced double piping and champagne gold edge stitching. Engineered with open-pore breathable micro-threads that allow continuous ambient air exchange across the entire sleeping surface.',
    image: '/images/mindfree/craft-fabrics.webp',
    features: [
      {
        title: 'Belgian Damask Knit',
        subtitle: 'Plush luxury tactile touch',
        icon: 'Sparkles',
      },
      {
        title: 'Airflow Regulating',
        subtitle: 'Disperses night body heat',
        icon: 'Wind',
      },
      {
        title: 'Hypoallergenic Weave',
        subtitle: 'Natural anti-bacterial shield',
        icon: 'ShieldCheck',
      },
    ],
    specs: {
      thickness: '3.5 cm',
      density: '480 GSM',
      composition: 'Belgian Damask Silk-Blend Knit',
    },
    dimensions: { width: 3.2, height: 0.14, depth: 4.2 },
    closedY: 0.62,
    explodedY: 1.35,
    color: '#FBF9F4',
    accentColor: '#E3262E',
    roughness: 0.85,
    metalness: 0.05,
    textureType: 'quilted',
    isHeroThumbnail: true,
    thumbnailLabel: 'Fabric Cover',
    thumbnailNumber: '01',
    hotspot: {
      position: [1.68, 1.35, -0.6],
      label: 'Breathable Cover',
      side: 'right',
    },
  },
  {
    id: 'ep-foam',
    layerNumber: 'LAYER 02 / 07',
    index: 1,
    name: 'EP Transition Foam',
    subtitle: 'High-Resilience Pressure Transition',
    description: 'Engineered Polymer (EP) foam slab with uniform open-cell micro-porosity, providing a buoyant transition that cushions surface pressure while supporting the body’s natural contours.',
    detailedDescription: 'Acts as an acoustic and kinetic dampener between the plush upper quilting and core orthopedic zones, preventing body sinking and maintaining continuous posture integrity throughout the night.',
    image: '/images/mindfree/3d-ep-foam.webp',
    features: [
      {
        title: 'High Resilience Slab',
        subtitle: 'Progressive contour support',
        icon: 'Layers',
      },
      {
        title: 'Open-Cell Structure',
        subtitle: 'Zero heat trapped in core',
        icon: 'Flame',
      },
      {
        title: 'Edge Reinforcement',
        subtitle: 'Uniform surface stability',
        icon: 'BoxSelect',
      },
    ],
    specs: {
      thickness: '4.0 cm',
      density: '38 kg/m³',
      composition: 'Engineered Polymer Open-Cell Foam',
    },
    dimensions: { width: 3.16, height: 0.12, depth: 4.16 },
    closedY: 0.49,
    explodedY: 0.98,
    color: '#F4EFE6',
    accentColor: '#D1AC6B',
    roughness: 0.75,
    metalness: 0.02,
    textureType: 'foam-ep',
    isHeroThumbnail: false,
    hotspot: {
      position: [-1.68, 0.98, -0.3],
      label: 'EP Comfort Foam',
      side: 'left',
    },
  },
  {
    id: 'rebound-foam',
    layerNumber: 'LAYER 03 / 07',
    index: 2,
    name: 'High-Rebound Foam',
    subtitle: 'Dynamic Dynamic Posture Core',
    description: 'High-density orthopedic rebound foam calibrated to gently push back against heavier pressure zones like the hips and lumbar spine, maintaining ergonomic horizontal alignment.',
    detailedDescription: 'Featuring ultra-fast recovery response times that eliminate that stuck-in-the-mud sensation, making rolling over effortless while isolating localized kinetic movement.',
    image: '/images/mindfree/difference-breathable-cooler.webp',
    features: [
      {
        title: 'Rapid Dynamic Recovery',
        subtitle: 'Instant response to motion',
        icon: 'Zap',
      },
      {
        title: 'Spinal Alignment',
        subtitle: 'Orthopedic ergonomic posture',
        icon: 'Activity',
      },
      {
        title: 'Anti-Sag Architecture',
        subtitle: '10-year durability guarantee',
        icon: 'Shield',
      },
    ],
    specs: {
      thickness: '4.5 cm',
      density: '45 kg/m³',
      composition: 'High-Density Ortho Rebound Foam',
    },
    dimensions: { width: 3.16, height: 0.12, depth: 4.16 },
    closedY: 0.37,
    explodedY: 0.65,
    color: '#E8ECE6',
    accentColor: '#0A2E73',
    roughness: 0.70,
    metalness: 0.02,
    textureType: 'foam-rebound',
    isHeroThumbnail: false,
    hotspot: {
      position: [1.68, 0.65, 0.2],
      label: 'Rebound Layer',
      side: 'right',
    },
  },
  {
    id: 'memory-foam',
    layerNumber: 'LAYER 04 / 07',
    index: 3,
    name: 'Cooling Memory Foam',
    subtitle: 'Visco-Elastic Pressure Relief',
    description: 'Infused with cooling micro-gel pearls that actively absorb and dissipate excess body heat while the visco-elastic cellular matrix adapts millimeter-by-millimeter to your body silhouette.',
    detailedDescription: 'Dissipates peak pressure points at the shoulders and hips by over 42% compared to standard mattresses, enhancing blood micro-circulation and eliminating morning stiffness.',
    image: '/images/mindfree/difference-pressure-relief.webp',
    features: [
      {
        title: 'Pressure Redistribution',
        subtitle: 'Relieves stress at joints & hips',
        icon: 'Maximize2',
      },
      {
        title: 'Zero Motion Transfer',
        subtitle: 'Sleep undisturbed by partners',
        icon: 'Moon',
      },
      {
        title: 'Infused Gel Pearls',
        subtitle: 'Active thermal equilibrium',
        icon: 'Droplets',
      },
    ],
    specs: {
      thickness: '5.0 cm',
      density: '55 kg/m³',
      composition: 'Air-Cool Visco-Elastic Foam',
    },
    dimensions: { width: 3.16, height: 0.14, depth: 4.16 },
    closedY: 0.24,
    explodedY: 0.32,
    color: '#E4DFD3',
    accentColor: '#E3262E',
    roughness: 0.65,
    metalness: 0.03,
    textureType: 'memory-foam',
    isHeroThumbnail: true,
    thumbnailLabel: 'Memory Foam',
    thumbnailNumber: '02',
    hotspot: {
      position: [-1.68, 0.32, 0.5],
      label: 'Pressure Relief Gel',
      side: 'left',
    },
  },
  {
    id: 'latex-layer',
    layerNumber: 'LAYER 05 / 07',
    index: 4,
    name: 'Pin-Core Natural Latex',
    subtitle: '100% Organic Aerated Latex',
    description: 'Sourced from organic sustainable rubber tree plantations. Engineered with thousands of vertical pin-core aeration micro-channels that inhale fresh air and exhale humid heat with every movement.',
    detailedDescription: 'Offers natural elasticity and instantaneous uplifting buoyancy that supports without trapping heat. Naturally anti-fungal, hypoallergenic, and antibacterial.',
    image: '/images/mindfree/3d-latex-pincore.webp',
    features: [
      {
        title: 'Pin-Core Air Columns',
        subtitle: '360° continuous circulation',
        icon: 'Compass',
      },
      {
        title: 'Organic Latex Milk',
        subtitle: 'Sustainable botanical origin',
        icon: 'Leaf',
      },
      {
        title: 'Dynamic Springback',
        subtitle: 'Buoyant floating sensation',
        icon: 'TrendingUp',
      },
    ],
    specs: {
      thickness: '4.0 cm',
      density: '75 kg/m³',
      composition: '100% Natural Organic Hevea Latex',
    },
    dimensions: { width: 3.16, height: 0.12, depth: 4.16 },
    closedY: 0.11,
    explodedY: -0.02,
    color: '#DCE6DC',
    accentColor: '#0A2E73',
    roughness: 0.60,
    metalness: 0.05,
    textureType: 'latex-pincore',
    isHeroThumbnail: true,
    thumbnailLabel: 'Latex Layer',
    thumbnailNumber: '03',
    hotspot: {
      position: [1.68, -0.02, 0.8],
      label: 'Aerated Latex',
      side: 'right',
    },
  },
  {
    id: 'pocket-springs',
    layerNumber: 'LAYER 06 / 07',
    index: 5,
    name: 'Zoned Pocket Springs',
    subtitle: 'Independent High-Carbon Steel Coils',
    description: 'Over 850 individually encased carbon-tempered steel coils, each sealed within its own breathable acoustic spunbond fabric pocket. Each coil flexes independently to support your body.',
    detailedDescription: 'Features 5 distinct firmness zones engineered for the head, shoulders, lumbar spine, knees, and ankles. Reinforced perimeter edge encasement prevents edge roll-off.',
    image: '/images/mindfree/3d-pocket-springs.webp',
    features: [
      {
        title: '850+ Independent Coils',
        subtitle: 'Targeted individual flex response',
        icon: 'Disc',
      },
      {
        title: '5-Zone Ergonomics',
        subtitle: 'Precision lumbar reinforcement',
        icon: 'Target',
      },
      {
        title: 'Perimeter Edge Guard',
        subtitle: 'Prevents edge sag and roll-off',
        icon: 'Maximize',
      },
    ],
    specs: {
      thickness: '16.0 cm',
      density: '2.0 mm Steel Gauge',
      composition: 'Carbon-Tempered Tempered Steel',
    },
    dimensions: { width: 3.14, height: 0.32, depth: 4.14 },
    closedY: -0.12,
    explodedY: -0.42,
    color: '#E5E8EA',
    accentColor: '#8C9A94',
    roughness: 0.40,
    metalness: 0.45,
    textureType: 'pocket-springs',
    isHeroThumbnail: true,
    thumbnailLabel: 'Pocket Springs',
    thumbnailNumber: '04',
    hotspot: {
      position: [-1.68, -0.42, 1.1],
      label: 'Pocketed Coils',
      side: 'left',
    },
  },
  {
    id: 'natural-coir',
    layerNumber: 'LAYER 07 / 07',
    index: 6,
    name: 'Organic Coconut Coir',
    subtitle: 'Dense Coir Fiber Base Foundation',
    description: 'Thick, dense mattress foundation created by intertwining natural coconut husk coir fibers rubberized with natural organic latex. Provides natural breathability, firmness, and moisture resistance.',
    detailedDescription: 'Creates an unyielding, flat foundation that prevents mattress sagging, disperses downward load evenly across the bed slats, and ensures decades of structural integrity.',
    image: '/images/mindfree/3d-natural-coir.webp',
    features: [
      {
        title: 'Organic Coconut Fibers',
        subtitle: 'Eco-friendly natural base',
        icon: 'Feather',
      },
      {
        title: 'Rubberized Bond',
        subtitle: 'Resists moisture & humidity',
        icon: 'CheckCircle2',
      },
      {
        title: 'Heavy-Duty Base',
        subtitle: 'Eliminates sag & warping',
        icon: 'Anchor',
      },
    ],
    specs: {
      thickness: '4.5 cm',
      density: '90 kg/m³',
      composition: 'Rubberized Natural Coconut Coir',
    },
    dimensions: { width: 3.16, height: 0.12, depth: 4.16 },
    closedY: -0.34,
    explodedY: -0.80,
    color: '#84603E',
    accentColor: '#E3262E',
    roughness: 0.95,
    metalness: 0.01,
    textureType: 'natural-coir',
    isHeroThumbnail: true,
    thumbnailLabel: 'Natural Coir',
    thumbnailNumber: '05',
    hotspot: {
      position: [1.68, -0.80, 1.3],
      label: 'Coir Base',
      side: 'right',
    },
  },
];
