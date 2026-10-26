export interface BrandPillarItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Leaf' | 'Settings' | 'Users' | 'Heart';
}

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  iconName: 'Bed' | 'Star' | 'ShieldCheck' | 'Truck';
}

export interface CraftDetailItem {
  id: string;
  title: string;
  description: string;
  image: string;
  iconName: 'Leaf' | 'Waves' | 'ShieldCheck' | 'Home';
}

export interface CustomerStoryItem {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
  image: string;
  avatar: string;
}

export const BRAND_PILLARS: BrandPillarItem[] = [
  {
    id: 'craftsmanship',
    title: 'Thoughtful Craftsmanship',
    description: 'Carefully designed for lasting comfort.',
    iconName: 'Leaf',
  },
  {
    id: 'tested',
    title: 'Rigorously Tested',
    description: 'Quality you can trust.',
    iconName: 'Settings',
  },
  {
    id: 'every-home',
    title: 'Sleep for Every Home',
    description: 'Comfort solutions for modern Indian homes.',
    iconName: 'Users',
  },
  {
    id: 'better-tomorrow',
    title: 'A Better Tomorrow',
    description: 'Creating healthier sleep experiences for generations.',
    iconName: 'Heart',
  },
];

export const TRUST_METRICS: MetricItem[] = [
  {
    id: 'sleepers',
    value: '50,000+',
    label: 'Happy Sleepers',
    iconName: 'Bed',
  },
  {
    id: 'rating',
    value: '4.8/5',
    label: 'Average Rating',
    iconName: 'Star',
  },
  {
    id: 'warranty',
    value: '10 Years',
    label: 'Quality Assurance',
    iconName: 'ShieldCheck',
  },
  {
    id: 'delivery',
    value: 'Pan India',
    label: 'Delivery',
    iconName: 'Truck',
  },
];

export const CRAFT_DETAILS: CraftDetailItem[] = [
  {
    id: 'fabrics',
    title: 'Premium Fabrics',
    description: 'Soft, breathable and skin-friendly materials.',
    image: '/images/mindfree/craft-fabrics.webp',
    iconName: 'Leaf',
  },
  {
    id: 'adaptive',
    title: 'Adaptive Comfort',
    description: 'Responds to your body for balanced support.',
    image: '/images/mindfree/difference-pressure-relief.webp',
    iconName: 'Waves',
  },
  {
    id: 'durable',
    title: 'Durable Construction',
    description: 'Made to last with strict quality standards.',
    image: '/images/mindfree/craft-durable.webp',
    iconName: 'ShieldCheck',
  },
  {
    id: 'indian-homes',
    title: 'Designed for Indian Homes',
    description: 'Styles and comfort for every home and lifestyle.',
    image: '/images/mindfree/craftsmanship-bedroom.webp',
    iconName: 'Home',
  },
];

export const CUSTOMER_STORIES: CustomerStoryItem[] = [
  {
    id: 'ananya',
    name: 'Ananya P.',
    location: 'Bengaluru, Karnataka',
    quote: 'My sleep quality has improved a lot. The comfort is exactly what I needed.',
    rating: 5,
    image: '/images/mindfree/story-ananya.webp',
    avatar: '/images/mindfree/story-ananya.webp',
  },
  {
    id: 'karthik',
    name: 'Karthik R.',
    location: 'Mysuru, Karnataka',
    quote: 'Great support and perfect comfort. Waking up feels so much better now.',
    rating: 5,
    image: '/images/mindfree/story-karthik.webp',
    avatar: '/images/mindfree/story-karthik.webp',
  },
  {
    id: 'lakshmi',
    name: 'Lakshmi M.',
    location: 'Mangaluru, Karnataka',
    quote: 'The mattress gives excellent support. I sleep more peacefully every night.',
    rating: 5,
    image: '/images/mindfree/story-lakshmi.webp',
    avatar: '/images/mindfree/story-lakshmi.webp',
  },
];
