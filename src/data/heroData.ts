export interface HeroLayerCallout {
  label: string;
  sublabel?: string;
  topPercent: number;
}

export interface HeroSlideData {
  id: string;
  eyebrow: string;
  headlineTop: string;
  headlineMiddle?: string;
  headlineHighlight: string;
  supportingText: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  primaryCtaCategory?: string;
  buttonVariant?: 'solid-red' | 'outline-red';
  secondaryCtaText: string;
  secondaryCtaHref: string;
  imageWebp: string;
  imageJpg: string;
  thumbnailWebp: string;
  altText: string;
  theme: 'light' | 'garden' | 'night';
  layerCallouts?: HeroLayerCallout[];
}

export interface HeroBenefit {
  id: string;
  title: string;
  subtitle?: string;
  icon: 'leaf' | 'spine' | 'moon' | 'shield';
}

export interface MaterialStripItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  href: string;
}

export const HERO_SLIDES: HeroSlideData[] = [
  {
    id: 'premium-comfort',
    eyebrow: 'MINDFREE MATTRESS COLLECTION',
    headlineTop: 'PREMIUM COMFORT',
    headlineHighlight: 'FOR A BETTER TOMORROW',
    supportingText:
      'Experience restful sleep with premium mattresses designed for superior comfort, support and long-lasting freshness.',
    primaryCtaText: 'Explore Mattresses',
    primaryCtaHref: '#catalogue-grid',
    primaryCtaCategory: 'all',
    buttonVariant: 'solid-red',
    secondaryCtaText: 'View All Categories',
    secondaryCtaHref: '#catalogue-grid',
    imageWebp: '/images/hero-banner-1.jpg',
    imageJpg: '/images/hero-banner-1.jpg',
    thumbnailWebp: '/images/hero-banner-1.jpg',
    altText: 'Premium Comfort For A Better Tomorrow - Mindfree luxury quilted orthopedic mattress in a modern bedroom',
    theme: 'light',
  },
  {
    id: 'thoughtful-layers',
    eyebrow: 'MULTI-LAYER SLEEP ENGINEERING',
    headlineTop: 'THOUGHTFUL LAYERS',
    headlineHighlight: 'FOR DEEPER SLEEP',
    supportingText:
      'A perfect combination of advanced materials and thoughtful design for complete sleep support.',
    primaryCtaText: 'Know Our Technology',
    primaryCtaHref: '#mattress-collection',
    primaryCtaCategory: 'spring',
    buttonVariant: 'outline-red',
    secondaryCtaText: 'Explore Mattresses',
    secondaryCtaHref: '#catalogue-grid',
    imageWebp: '/images/hero-banner-2.jpg',
    imageJpg: '/images/hero-banner-2.jpg',
    thumbnailWebp: '/images/hero-banner-2.jpg',
    altText: 'Thoughtful Layers For Deeper Sleep - 6-layer exploded mattress anatomy diagram',
    theme: 'light',
    layerCallouts: [
      { label: 'Premium Knitted Fabric', topPercent: 21 },
      { label: 'Comfort Foam Layer', topPercent: 32 },
      { label: 'High Density Foam', topPercent: 43 },
      { label: 'Support Foam Layer', topPercent: 55 },
      { label: 'Pocket / Bonnel Spring', sublabel: '(for spring models)', topPercent: 68 },
      { label: 'Base Support Foam', topPercent: 82 },
    ],
  },
  {
    id: 'stay-cool',
    eyebrow: 'ADVANCED AIRFLOW & BREATHABILITY',
    headlineTop: 'STAY COOL',
    headlineHighlight: 'SLEEP FRESH',
    supportingText:
      'Breathable fabrics and advanced materials help you stay cool and comfortable all night long.',
    primaryCtaText: 'Discover Cooling Comfort',
    primaryCtaHref: '#catalogue-grid',
    primaryCtaCategory: 'cooling',
    buttonVariant: 'solid-red',
    secondaryCtaText: 'Explore Mattresses',
    secondaryCtaHref: '#catalogue-grid',
    imageWebp: '/images/hero-banner-3.jpg',
    imageJpg: '/images/hero-banner-3.jpg',
    thumbnailWebp: '/images/hero-banner-3.jpg',
    altText: 'Stay Cool Sleep Fresh - Breathable cooling mattress with active airflow',
    theme: 'light',
  },
  {
    id: 'every-stage',
    eyebrow: 'ORTHOPEDIC SPINAL ALIGNMENT',
    headlineTop: 'SUPPORT FOR',
    headlineHighlight: 'EVERY STAGE OF LIFE',
    supportingText:
      'Our mattresses are designed to provide the right support for your spine, so you wake up refreshed and ready for a better day.',
    primaryCtaText: 'Explore the Range',
    primaryCtaHref: '#catalogue-grid',
    primaryCtaCategory: 'orthopedic',
    buttonVariant: 'solid-red',
    secondaryCtaText: 'View All Models',
    secondaryCtaHref: '#catalogue-grid',
    imageWebp: '/images/hero-banner-4.jpg',
    imageJpg: '/images/hero-banner-4.jpg',
    thumbnailWebp: '/images/hero-banner-4.jpg',
    altText: 'Support For Every Stage Of Life - Peaceful spinal alignment sleep on Mindfree mattress',
    theme: 'light',
  },
];

export const HERO_BENEFITS: HeroBenefit[] = [
  {
    id: 'materials',
    title: 'Natural & Safe',
    subtitle: 'Materials',
    icon: 'leaf',
  },
  {
    id: 'ortho',
    title: 'Orthopedic',
    subtitle: 'Support',
    icon: 'spine',
  },
  {
    id: 'trial',
    title: '100 Nights',
    subtitle: 'Risk Free Trial',
    icon: 'moon',
  },
  {
    id: 'warranty',
    title: '10 Years',
    subtitle: 'Warranty',
    icon: 'shield',
  },
];

export const MATERIAL_STRIP_ITEMS: MaterialStripItem[] = [
  {
    id: 'spring',
    name: 'Spring',
    subtitle: 'Strong Support',
    image: '/images/mat_spring.png',
    href: '/materials/spring',
  },
  {
    id: 'ep-foam',
    name: 'EP Foam',
    subtitle: 'High Resilience',
    image: '/images/mat_ep_foam.png',
    href: '/materials/ep-foam',
  },
  {
    id: 'rebound-foam',
    name: 'Rebound Foam',
    subtitle: 'Bounce Back',
    image: '/images/mat_rebound.png',
    href: '/materials/rebound-foam',
  },
  {
    id: 'memory-foam',
    name: 'Memory Foam',
    subtitle: 'Pressure Relief',
    image: '/images/mat_memory.png',
    href: '/materials/memory-foam',
  },
  {
    id: 'latex',
    name: 'Latex',
    subtitle: 'Breathable & Natural',
    image: '/images/mat_latex.png',
    href: '/materials/latex',
  },
];
