export interface MattressCollectionItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  tag: string;
  rating: number;
  reviewsCount: number;
  firmness: string;
  height: string;
  trial: string;
  warranty: string;
  startingPrice: string;
  mainImage: string;
  thumbnails: string[];
  benefits: { title: string; desc?: string }[];
  href: string;
  badge?: string;
}

export interface PromoPanelData {
  id: string;
  category: string;
  headline: string;
  supportingText: string;
  ctaText: string;
  ctaHref: string;
  image: string;
  theme: 'forest' | 'ivory' | 'sage';
  badge?: string;
  features?: string[];
}

export const MATTRESS_COLLECTIONS: MattressCollectionItem[] = [
  {
    id: 'orthopedic',
    number: '01',
    name: 'Orthopedic Mattresses',
    tagline: 'Precision Spinal Alignment & Postural Care',
    description: "Thoughtfully engineered support for a more comfortable and balanced night's rest.",
    tag: 'Doctor Recommended',
    rating: 4.9,
    reviewsCount: 1420,
    firmness: 'Medium-Firm (7.5/10)',
    height: '8" & 10"',
    trial: '100 Nights',
    warranty: '10 Years',
    startingPrice: '₹14,999',
    mainImage: '/images/mindfree/mindfree-orthopedic.webp',
    thumbnails: [
      '/images/mindfree/mindfree-orthopedic.webp',
      '/images/mindfree/mindfree-orthopedic-detail1.webp',
      '/images/mindfree/mindfree-orthopedic-detail2.webp',
    ],
    benefits: [
      { title: 'Supportive comfort' },
      { title: 'Balanced body support' },
      { title: 'Durable construction' },
      { title: 'Multiple comfort options' },
    ],
    href: '/mattresses/orthopedic',
    badge: 'Best for Back Care',
  },
  {
    id: 'memory-foam',
    number: '02',
    name: 'Memory Foam Mattresses',
    tagline: 'Zero-Gravity Cloud Contour Technology',
    description: 'Adaptive cushioning that responds to your body and creates a more personalized sleep experience.',
    tag: 'Adaptive Contouring',
    rating: 4.9,
    reviewsCount: 980,
    firmness: 'Plush-Medium (6/10)',
    height: '6", 8" & 10"',
    trial: '100 Nights',
    warranty: '10 Years',
    startingPrice: '₹12,499',
    mainImage: '/images/mindfree/mindfree-memory-foam.webp',
    thumbnails: [
      '/images/mindfree/mindfree-memory-foam.webp',
      '/images/mindfree/mindfree-memory-foam-detail1.webp',
      '/images/mindfree/mindfree-memory-foam-detail2.webp',
    ],
    benefits: [
      { title: 'Pressure-relieving comfort' },
      { title: 'Adaptive contouring' },
      { title: 'Comfortable cushioning' },
      { title: 'Contemporary sleep technology' },
    ],
    href: '/mattresses/memory-foam',
    badge: 'Pressure Relief',
  },
  {
    id: 'latex',
    number: '03',
    name: 'Latex Mattresses',
    tagline: '100% Pure Organic Eco-Pin Core',
    description: 'Discover naturally inspired comfort with a breathable feel and responsive support.',
    tag: '100% Natural Organic',
    rating: 5.0,
    reviewsCount: 840,
    firmness: 'Medium-Responsive (6.5/10)',
    height: '8" & 10"',
    trial: '100 Nights',
    warranty: '12 Years',
    startingPrice: '₹22,999',
    mainImage: '/images/mindfree/mindfree-latex.webp',
    thumbnails: [
      '/images/mindfree/mindfree-latex.webp',
      '/images/mindfree/mindfree-latex-detail1.webp',
      '/images/mindfree/mindfree-latex-detail2.webp',
    ],
    benefits: [
      { title: 'Breathable construction' },
      { title: 'Responsive comfort' },
      { title: 'Natural-material options' },
      { title: 'Long-lasting support' },
    ],
    href: '/mattresses/latex',
    badge: 'Eco Pure Organic',
  },
  {
    id: 'spring',
    number: '04',
    name: 'Spring Mattresses',
    tagline: 'Zero Motion Transfer Pocket Springs',
    description: 'Discover responsive support through carefully engineered spring systems.',
    tag: 'Independent Coils',
    rating: 4.8,
    reviewsCount: 1120,
    firmness: 'Medium-Bouncy (6.5/10)',
    height: '8", 10" & 12"',
    trial: '100 Nights',
    warranty: '10 Years',
    startingPrice: '₹16,499',
    mainImage: '/images/mindfree/mindfree-spring.webp',
    thumbnails: [
      '/images/mindfree/mindfree-spring.webp',
      '/images/mindfree/mindfree-spring-detail1.webp',
      '/images/mindfree/mindfree-spring-detail2.webp',
    ],
    benefits: [
      { title: 'Responsive support' },
      { title: 'Structured construction' },
      { title: 'Comfortable cushioning' },
      { title: 'Multiple spring options' },
    ],
    href: '/mattresses/spring',
    badge: 'Zero Motion',
  },
  {
    id: 'coir',
    number: '05',
    name: 'Coir Mattresses',
    tagline: 'High-Density Breathable Coir Core',
    description: 'Explore firm, supportive comfort using coconut coir-based mattress construction.',
    tag: 'Firm & Cool',
    rating: 4.7,
    reviewsCount: 650,
    firmness: 'Firm (8.5/10)',
    height: '5" & 6"',
    trial: '100 Nights',
    warranty: '7 Years',
    startingPrice: '₹9,999',
    mainImage: '/images/mindfree/mindfree-coir.webp',
    thumbnails: [
      '/images/mindfree/mindfree-coir.webp',
      '/images/mindfree/mindfree-coir-detail1.webp',
      '/images/mindfree/mindfree-coir-detail2.webp',
    ],
    benefits: [
      { title: 'Coir-based construction' },
      { title: 'Firm comfort options' },
      { title: 'Breathable material structure' },
      { title: 'Traditional support feel' },
    ],
    href: '/mattresses/coir',
    badge: 'Traditional Firm',
  },
  {
    id: 'hybrid',
    number: '06',
    name: 'Hybrid Mattresses',
    tagline: 'Pocket Springs Infused With Gel Latex',
    description: 'Experience a thoughtful combination of supportive construction and cushioning comfort.',
    tag: 'Ultimate Multi-Layer',
    rating: 4.95,
    reviewsCount: 1680,
    firmness: 'Adaptive Luxury (7/10)',
    height: '10" & 12"',
    trial: '100 Nights',
    warranty: '15 Years',
    startingPrice: '₹26,999',
    mainImage: '/images/mindfree/mindfree-hybrid.webp',
    thumbnails: [
      '/images/mindfree/mindfree-hybrid.webp',
      '/images/mindfree/mindfree-hybrid-detail1.webp',
      '/images/mindfree/mindfree-hybrid-detail2.webp',
    ],
    benefits: [
      { title: 'Layered construction' },
      { title: 'Balanced comfort' },
      { title: 'Responsive support' },
      { title: 'Multiple material combinations' },
    ],
    href: '/mattresses/hybrid',
    badge: 'Luxury Flagship',
  },
];

export const PROMO_PANELS: PromoPanelData[] = [
  {
    id: 'core-materials',
    category: 'BY CORE MATERIAL',
    headline: 'Engineered for Better Sleep',
    supportingText: 'Explore the materials behind your comfort — from certified organic latex to tempered steel coils.',
    ctaText: 'Explore Materials',
    ctaHref: '/materials/all',
    image: '/images/mindfree/mindfree-exploded-layers.webp',
    theme: 'forest',
    badge: '5 Master Layers',
    features: ['Aerated Pin-Core Latex', 'High-Resilience EP Foam', 'Pocketed Spring Coils'],
  },
  {
    id: 'top-designs',
    category: 'BY TOP DESIGN',
    headline: 'Choose Your Comfort Style',
    supportingText: 'Three distinctive quilted silhouettes engineered for your exact contouring preference.',
    ctaText: 'Explore Designs',
    ctaHref: '/designs/all',
    image: '/images/mindfree/mindfree-top-designs.webp',
    theme: 'ivory',
    badge: '3 Comfort Profiles',
    features: ['Normal Bed (Classic)', 'Pillow Top (Cushioned)', 'Euro Top (Plush Flushed)'],
  },
  {
    id: 'mattress-finder',
    category: 'SLEEP QUIZ',
    headline: 'Find Your Perfect Match',
    supportingText: 'Answer a few quick questions about your sleeping posture and uncover your personalized mattress.',
    ctaText: 'Take the Quiz',
    ctaHref: '/mattress-finder',
    image: '/images/mindfree/mindfree-quiz-finder.webp',
    theme: 'sage',
    badge: '60-Sec Diagnostic',
    features: ['Posture Analysis', 'Firmness Recommendation', 'Partner Motion Profile'],
  },
];
