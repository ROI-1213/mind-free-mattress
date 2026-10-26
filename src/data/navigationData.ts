export interface UtilityItem {
  id: string;
  label: string;
  icon: 'leaf' | 'truck' | 'shield' | 'moon' | 'map-pin' | 'package' | 'headphones' | 'phone';
  href: string;
}

export interface MattressCategory {
  id: string;
  name: string;
  image: string;
  href: string;
  badge?: string;
}

export interface CoreMaterial {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
}

export interface TopDesign {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
  isMegaMenu?: boolean;
  badge?: string;
  badgeColor?: string;
  children?: { label: string; href: string }[];
}

export const UTILITY_LEFT_ITEMS: UtilityItem[] = [
  { id: 'cert', label: '100% Certified Materials', icon: 'leaf', href: '#materials' },
  { id: 'ship', label: 'Free Shipping Across India', icon: 'truck', href: '#shipping' },
  { id: 'warranty', label: '10 Years Warranty', icon: 'shield', href: '#warranty' },
  { id: 'trial', label: '100 Nights Risk Free Trial', icon: 'moon', href: '#trial' },
];

export const UTILITY_RIGHT_ITEMS: UtilityItem[] = [
  { id: 'store', label: 'Store Locator', icon: 'map-pin', href: '#stores' },
  { id: 'track', label: 'Track Order', icon: 'package', href: '#track' },
];

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'mattresses', label: 'Mattresses', href: '/mattresses', hasDropdown: true, isMegaMenu: true },
  {
    id: 'pillows',
    label: 'Pillows',
    href: '/pillows',
    hasDropdown: true,
    children: [
      { label: 'Ergonomic Memory Foam Pillow', href: '/pillows/memory' },
      { label: 'Natural Latex Pillow', href: '/pillows/latex' },
      { label: 'Cooling Gel Pillow', href: '/pillows/cooling' },
      { label: 'Microfiber Plush Pillow', href: '/pillows/microfiber' },
    ],
  },
  {
    id: 'why-mindfree',
    label: 'Why Mindfree',
    href: '/why-mindfree',
    hasDropdown: true,
    children: [
      { label: 'Our Sleep Philosophy', href: '/about' },
      { label: 'Zero-Toxic Certifications', href: '/certifications' },
      { label: 'Customer Reviews (4.9/5)', href: '/reviews' },
      { label: 'Sustainability & ESG', href: '/sustainability' },
    ],
  },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export const MATTRESS_CATEGORIES: MattressCategory[] = [
  { id: 'all', name: 'All 14 Mattresses', image: '/images/type_all.png', href: '/mattresses/all' },
  { id: 'foam', name: 'Foam Mattresses', image: '/images/type_memory.png', href: '/mattresses/foam' },
  { id: 'spring', name: 'Spring Mattresses', image: '/images/type_spring.png', href: '/mattresses/spring' },
  { id: 'orthopedic', name: 'Orthopedic & Back Support', image: '/images/type_ortho.png', href: '/mattresses/orthopedic' },
  { id: 'latex', name: 'Latex & Hybrid', image: '/images/type_latex.png', href: '/mattresses/latex' },
  { id: 'cooling', name: 'Luxury Cooling & Comfort', image: '/images/type_hybrid.png', href: '/mattresses/cooling' },
];

export const CORE_MATERIALS: CoreMaterial[] = [
  {
    id: 'spring',
    name: 'Spring',
    description: 'Strong support & durability',
    image: '/images/mat_spring.png',
    href: '/materials/spring',
  },
  {
    id: 'ep-foam',
    name: 'EP Foam',
    description: 'High resilience & comfort',
    image: '/images/mat_ep_foam.png',
    href: '/materials/ep-foam',
  },
  {
    id: 'rebound-foam',
    name: 'Rebound Foam',
    description: 'Bounce back comfort',
    image: '/images/mat_rebound.png',
    href: '/materials/rebound-foam',
  },
  {
    id: 'memory-foam',
    name: 'Memory Foam',
    description: 'Pressure relief & body support',
    image: '/images/mat_memory.png',
    href: '/materials/memory-foam',
  },
  {
    id: 'latex',
    name: 'Latex',
    description: 'Natural, breathable & hypoallergenic',
    image: '/images/mat_latex.png',
    href: '/materials/latex',
  },
];

export const TOP_DESIGNS: TopDesign[] = [
  {
    id: 'normal-bed',
    name: 'Normal Bed',
    description: 'Classic comfort for everyday sleep',
    image: '/images/design_normal.png',
    href: '/designs/normal-bed',
  },
  {
    id: 'pillow-top',
    name: 'Pillow Top',
    description: 'Extra soft cushioning layer',
    image: '/images/design_pillow_top.png',
    href: '/designs/pillow-top',
  },
  {
    id: 'euro-top',
    name: 'Euro Top',
    description: 'Premium plush comfort',
    image: '/images/design_euro_top.png',
    href: '/designs/euro-top',
  },
];
