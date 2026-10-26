export interface StatItem {
  value: string;
  label: string;
  iconName: 'Layers' | 'Gem' | 'ShieldCheck';
}

export interface MattressLayer {
  id: string;
  name: string;
  subtitle: string;
  iconName: 'Sparkles' | 'Activity' | 'Boxes' | 'Leaf' | 'Wind';
  // Position as percentage on desktop visual
  desktopPos: {
    top: string;
    left: string;
  };
  // Leader line anchor target
  targetPos: {
    x: string;
    y: string;
  };
}

export interface BenefitItem {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: 'Leaf' | 'Cpu' | 'Home' | 'ShieldCheck';
}

export interface SleepFeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  iconName: 'Activity' | 'Wind' | 'Moon';
  href: string;
}

export const DIFFERENCE_STATS: StatItem[] = [
  {
    value: '5+',
    label: 'Mattress Types',
    iconName: 'Layers',
  },
  {
    value: '50,000+',
    label: 'Happy Sleepers',
    iconName: 'Gem',
  },
  {
    value: '10 Years',
    label: 'Quality Assurance',
    iconName: 'ShieldCheck',
  },
];

export const MATTRESS_LAYERS: MattressLayer[] = [
  {
    id: 'cover',
    name: 'Breathable Fabric Cover',
    subtitle: 'Belgian Damask & Double Piping',
    iconName: 'Sparkles',
    desktopPos: { top: '14%', left: '4%' },
    targetPos: { x: '28%', y: '19%' },
  },
  {
    id: 'memory-foam',
    name: 'Memory Foam Comfort Layer',
    subtitle: 'Adaptive Pressure Relief',
    iconName: 'Activity',
    desktopPos: { top: '30%', left: '2%' },
    targetPos: { x: '24%', y: '33%' },
  },
  {
    id: 'resilient-foam',
    name: 'Resilient Foam Layer',
    subtitle: 'High-Resilience Pin-Core Latex & Transition',
    iconName: 'Wind',
    desktopPos: { top: '48%', left: '2%' },
    targetPos: { x: '26%', y: '49%' },
  },
  {
    id: 'pocket-spring',
    name: 'Pocket Spring Support System',
    subtitle: 'Tempered Zero-Motion Steel Coils',
    iconName: 'Boxes',
    desktopPos: { top: '46%', left: '68%' },
    targetPos: { x: '60%', y: '58%' },
  },
  {
    id: 'natural-coir',
    name: 'Natural Coir Base Layer',
    subtitle: 'High-Density Spinal Support',
    iconName: 'Leaf',
    desktopPos: { top: '68%', left: '68%' },
    targetPos: { x: '56%', y: '72%' },
  },
];

export const MATERIAL_BENEFITS: BenefitItem[] = [
  {
    id: 'materials',
    number: '01',
    title: 'Premium Materials',
    description: 'We use high-quality, carefully sourced materials for lasting comfort and natural breathability.',
    iconName: 'Leaf',
  },
  {
    id: 'technology',
    number: '02',
    title: 'Advanced Sleep Technology',
    description: 'Thoughtful multi-zone engineering for personalized spinal alignment and pressure relief.',
    iconName: 'Cpu',
  },
  {
    id: 'indian-homes',
    number: '03',
    title: 'Designed for Indian Homes',
    description: 'Comfort solutions crafted specifically for diverse Indian climates, temperatures, and lifestyles.',
    iconName: 'Home',
  },
  {
    id: 'durability',
    number: '04',
    title: 'Durability You Can Trust',
    description: 'Built to endure over 10 years of consistent, high-resilience performance with strict quality standards.',
    iconName: 'ShieldCheck',
  },
];

export const SLEEP_FEATURES: SleepFeatureItem[] = [
  {
    id: 'pressure-relief',
    number: '01',
    title: 'Pressure Relief & Body Support',
    description: 'Experience balanced support that adapts smoothly to your natural body contours and sleep posture.',
    image: '/images/mindfree/difference-pressure-relief.webp',
    iconName: 'Activity',
    href: '/craftsmanship/pressure-relief',
  },
  {
    id: 'breathable-cooler',
    number: '02',
    title: 'Breathable for Cooler Sleep',
    description: 'Engineered with open-cell micro-perforations to allow unrestricted airflow for a fresh, comfortable night.',
    image: '/images/mindfree/difference-breathable-cooler.webp',
    iconName: 'Wind',
    href: '/craftsmanship/airflow-cooling',
  },
  {
    id: 'motion-isolation',
    number: '03',
    title: 'Motion Isolation for Undisturbed Sleep',
    description: 'Independent pocketed coils ensure minimal partner disturbance for a deeply peaceful, restorative rest.',
    image: '/images/mindfree/difference-motion-isolation.webp',
    iconName: 'Moon',
    href: '/craftsmanship/motion-isolation',
  },
];
