export interface LifestyleItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface BenefitStripItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: 'Truck' | 'ShieldCheck' | 'RotateCcw' | 'Headphones';
}

export interface SustainabilityPrincipleItem {
  id: string;
  title: string;
  description: string;
  iconName: 'Leaf' | 'Recycle' | 'Globe2';
}

export const LIFESTYLE_CARDS: LifestyleItem[] = [
  {
    id: 'individuals',
    title: 'For Individuals',
    description: 'Personalized comfort for a better you.',
    image: '/images/mindfree/lifestyle-individual.webp',
    href: '/mattresses?lifestyle=individual',
  },
  {
    id: 'couples',
    title: 'For Couples',
    description: 'Comfort designed for restful nights together.',
    image: '/images/mindfree/lifestyle-couples.webp',
    href: '/mattresses?lifestyle=couples',
  },
  {
    id: 'kids',
    title: 'For Kids',
    description: 'Thoughtful comfort for growing dreams.',
    image: '/images/mindfree/lifestyle-kids.webp',
    href: '/mattresses?lifestyle=kids',
  },
  {
    id: 'seniors',
    title: 'For Seniors',
    description: 'Comfort options for changing sleep needs.',
    image: '/images/mindfree/lifestyle-seniors.webp',
    href: '/mattresses?lifestyle=seniors',
  },
  {
    id: 'active',
    title: 'For Active Lifestyles',
    description: 'Recharge and wake ready to move.',
    image: '/images/mindfree/lifestyle-active.webp',
    href: '/mattresses?lifestyle=active',
  },
];

export const CUSTOMER_BENEFITS: BenefitStripItem[] = [
  {
    id: 'delivery',
    title: 'Free Delivery',
    subtitle: 'Across India',
    iconName: 'Truck',
  },
  {
    id: 'warranty',
    title: '10 Years',
    subtitle: 'Quality Assurance',
    iconName: 'ShieldCheck',
  },
  {
    id: 'returns',
    title: 'Easy Returns',
    subtitle: 'Hassle-free process',
    iconName: 'RotateCcw',
  },
  {
    id: 'support',
    title: 'Dedicated Support',
    subtitle: "We're here to help",
    iconName: 'Headphones',
  },
];

export const SUSTAINABILITY_PRINCIPLES: SustainabilityPrincipleItem[] = [
  {
    id: 'materials',
    title: 'Eco-Friendly Materials',
    description: 'Thoughtfully sourced for a cleaner planet.',
    iconName: 'Leaf',
  },
  {
    id: 'manufacturing',
    title: 'Responsible Manufacturing',
    description: 'Minimizing waste, maximising positive impact.',
    iconName: 'Recycle',
  },
  {
    id: 'future',
    title: 'A Healthier Tomorrow',
    description: 'Better sleep for you and a brighter future for all.',
    iconName: 'Globe2',
  },
];
