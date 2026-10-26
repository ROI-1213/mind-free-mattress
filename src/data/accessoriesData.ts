export interface AccessoryItem {
  id: string;
  sku: string;
  name: string;
  category: 'pillow' | 'protector' | 'sheets' | 'duvet';
  tagline: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  dimensions: string;
  material: string;
  firmnessOrLoft?: string;
  sizes: { id: string; label: string; price: number; sku: string }[];
  keyFeatures: string[];
  careInstructions: string[];
}

export const PILLOWS_CATALOGUE: AccessoryItem[] = [
  {
    id: 'cervical-memory-foam',
    sku: 'MF-PIL-MEM-01',
    name: 'Ergonomic Cervical Memory Foam Pillow',
    category: 'pillow',
    tagline: 'Dual-height contoured contouring for gentle neck and cervical spinal decompression',
    price: 2499,
    originalPrice: 3499,
    image: '/images/pillows/pillow-cervical.jpg',
    rating: 4.9,
    reviewsCount: 312,
    badge: 'Orthopedic Choice',
    dimensions: '24" × 16" × 4.5"',
    material: 'High-density pressure-relieving viscoelastic memory foam with cooling bamboo knit outer shell',
    firmnessOrLoft: 'Contoured Ergonomic (Medium)',
    sizes: [
      { id: 'standard', label: 'Standard (24" × 16")', price: 2499, sku: 'MF-PIL-MEM-STD' },
      { id: 'king', label: 'King (28" × 18")', price: 2999, sku: 'MF-PIL-MEM-KNG' },
    ],
    keyFeatures: [
      'Dual-arch cervical cradle relieves morning neck stiffness',
      'Slow-rebound open-cell memory foam maintains shape for years',
      'Removable, machine-washable anti-bacterial bamboo outer cover',
      'Zero toxic off-gassing, CertiPUR-US certified foam core',
    ],
    careInstructions: [
      'Machine wash outer bamboo cover in cold water on gentle cycle',
      'Do not wash memory foam core; spot clean with damp cloth only',
      'Air dry flat in a shaded, well-ventilated area away from direct sunlight',
    ],
  },
  {
    id: 'organic-latex-pillow',
    sku: 'MF-PIL-LAT-01',
    name: '100% Pure Botanical Pin-Core Latex Pillow',
    category: 'pillow',
    tagline: 'Naturally resilient, aerated organic latex providing springy buoyancy and cool airflow',
    price: 3299,
    originalPrice: 4499,
    image: '/images/pillows/pillow-latex.jpg',
    rating: 4.95,
    reviewsCount: 245,
    badge: 'Eco-Certified',
    dimensions: '26" × 16" × 5.5"',
    material: '100% Natural tree-tapped Hevea latex with GOLS organic certification and organic cotton cover',
    firmnessOrLoft: 'Medium-Plush Buoyancy (6.0 / 10)',
    sizes: [
      { id: 'standard', label: 'Standard Loft (26" × 16")', price: 3299, sku: 'MF-PIL-LAT-STD' },
      { id: 'contour', label: 'Cervical Contour (26" × 16")', price: 3599, sku: 'MF-PIL-LAT-CNT' },
    ],
    keyFeatures: [
      'Thousands of pin-core aeration channels create continuous airflow',
      'Naturally resistant to dust mites, mildew, and allergenic microbes',
      'Zero sinkhole sag—delivers continuous buoyant springback',
      'GOLS certified organic latex without chemical foaming agents',
    ],
    careInstructions: [
      'Organic cotton cover is zipper-removable and machine washable',
      'Do not machine wash or squeeze the latex core',
      'Keep protected with pillow protector; store in cool dry place',
    ],
  },
  {
    id: 'cooling-gel-pillow',
    sku: 'MF-PIL-GEL-01',
    name: 'Dual-Zone Thermoregulating Cooling Gel Pillow',
    category: 'pillow',
    tagline: 'Engineered phase-change cooling surface layer bonded to adaptive pressure-relief core',
    price: 2999,
    originalPrice: 3999,
    image: '/images/pillows/pillow-cooling-gel.jpg',
    rating: 4.85,
    reviewsCount: 189,
    badge: 'Cooling Tech',
    dimensions: '24" × 16" × 5.0"',
    material: 'Solid hydro-gel cooling matrix over contouring memory foam with breathable ice-silk outer cover',
    firmnessOrLoft: 'Balanced Medium (5.5 / 10)',
    sizes: [
      { id: 'standard', label: 'Standard (24" × 16")', price: 2999, sku: 'MF-PIL-GEL-STD' },
      { id: 'queen', label: 'Queen (26" × 18")', price: 3499, sku: 'MF-PIL-GEL-QEN' },
    ],
    keyFeatures: [
      'Thermal-conductive gel pad dissipates trapped head and neck heat',
      'Sub-surface cooling keeps sleep surface 2°C cooler than room temperature',
      'Reversible design: Cooling side for summer, plush side for winter',
      'Instant contouring support for side and back sleepers',
    ],
    careInstructions: [
      'Remove and machine wash ice-silk cover in cold water',
      'Wipe cooling gel surface with mild damp cloth',
      'Do not tumble dry; dry in shade',
    ],
  },
  {
    id: 'microfiber-hotel-pillow',
    sku: 'MF-PIL-MIC-01',
    name: 'Bespoke 7-Star Hotel Microfiber Plush Pillow (Pair)',
    category: 'pillow',
    tagline: 'Ultra-fine 0.7D virgin micro-cluster fibers encased in 300 thread count crisp cotton cambric',
    price: 1899,
    originalPrice: 2499,
    image: '/images/pillows/pillow-microfiber-pair.jpg',
    rating: 4.8,
    reviewsCount: 410,
    badge: 'Set of 2',
    dimensions: '27" × 18" (Pair)',
    material: 'Virgin conjugated micro-cluster down-alternative encased in 100% long-staple cotton satin',
    firmnessOrLoft: 'Cloud-Soft Fluffable (4.0 / 10)',
    sizes: [
      { id: 'standard-pair', label: 'Standard Set of 2', price: 1899, sku: 'MF-PIL-MIC-2PK' },
      { id: 'king-pair', label: 'King Size Set of 2', price: 2399, sku: 'MF-PIL-MIC-K2PK' },
    ],
    keyFeatures: [
      'Simulates genuine goose-down softness without allergic feathers or quills',
      'Gusseted 2-inch border prevents fiber clumping and maintains even height',
      'Hypoallergenic and odorless virgin synthetic down clusters',
      'Includes two complimentary bespoke pillows in luxury travel tote',
    ],
    careInstructions: [
      'Fully machine washable on delicate cycle with mild detergent',
      'Tumble dry low with wool dryer balls to restore full loft',
      'Fluff daily by hand for optimal buoyancy',
    ],
  },
];

export const ACCESSORIES_CATALOGUE: AccessoryItem[] = [
  {
    id: 'bamboo-protector',
    sku: 'MF-ACC-PRT-01',
    name: 'Hypoallergenic Waterproof Bamboo Mattress Protector',
    category: 'protector',
    tagline: 'Whisper-quiet breathable TPU barrier that shields against spills, perspiration, and dust mites',
    price: 1999,
    originalPrice: 2799,
    image: '/images/mindfree/craft-durable.webp',
    rating: 4.92,
    reviewsCount: 520,
    badge: 'Atelier Essential',
    dimensions: 'Fits mattresses up to 14" deep',
    material: 'Organic bamboo terry surface with medical-grade micro-porous membrane and 360° elastic skirt',
    sizes: [
      { id: 'single', label: 'Single (75" × 36")', price: 1599, sku: 'MF-PRT-SGL' },
      { id: 'double', label: 'Double (75" × 48")', price: 1799, sku: 'MF-PRT-DBL' },
      { id: 'queen', label: 'Queen (78" × 60")', price: 1999, sku: 'MF-PRT-QEN' },
      { id: 'king', label: 'King (78" × 72")', price: 2299, sku: 'MF-PRT-KNG' },
    ],
    keyFeatures: [
      '100% Waterproof protection without plastic crinkle noise',
      'Naturally thermo-neutral bamboo allows air circulation while blocking fluids',
      'Deep pocket skirt hugs mattresses from 6" to 14" thickness without shifting',
      'Guards against dust mites, allergens, bedbugs, and sweat stains',
    ],
    careInstructions: [
      'Machine wash cold with mild detergent; avoid bleach or fabric softeners',
      'Tumble dry on low heat only; high heat can damage the waterproof membrane',
      'Do not iron or dry clean',
    ],
  },
  {
    id: 'cotton-sheet-set',
    sku: 'MF-ACC-SHT-01',
    name: '400 Thread Count Organic Long-Staple Cotton Sheet Set',
    category: 'sheets',
    tagline: 'Lustrous satin weave woven from hand-picked Indian Suvin long-staple organic cotton',
    price: 3499,
    originalPrice: 4999,
    image: '/images/mindfree/sustainability-bedroom.webp',
    rating: 4.9,
    reviewsCount: 198,
    badge: 'GOTS Organic',
    dimensions: 'Fitted Sheet + Flat Sheet + 2 Standard Pillowcases',
    material: '100% GOTS-certified organic combed long-staple cotton satin weave',
    sizes: [
      { id: 'queen', label: 'Queen Complete Set', price: 3499, sku: 'MF-SHT-QEN' },
      { id: 'king', label: 'King Complete Set', price: 3999, sku: 'MF-SHT-KNG' },
    ],
    keyFeatures: [
      '400 TC satin weave balances silky luster with durable crisp longevity',
      'Becomes noticeably softer with every wash cycle',
      'Deep 16" pockets with heavy-duty 1-inch elastic band all around',
      'Free from chemical wrinkle treatments, phthalates, and formaldehyde',
    ],
    careInstructions: [
      'Machine wash warm with like colors on gentle cycle',
      'Tumble dry low; remove promptly to reduce natural wrinkling',
      'Warm iron if desired for hotel-crisp finish',
    ],
  },
  {
    id: 'mulberry-silk-pillowcase',
    sku: 'MF-ACC-SLK-01',
    name: 'Grade 6A Pure Mulberry Silk Pillowcase Pair',
    category: 'sheets',
    tagline: '22-Momme pure mulberry silk that preserves hair moisture and prevents sleep creases',
    price: 2799,
    originalPrice: 3899,
    image: '/images/mindfree/craftsmanship-bedroom.webp',
    rating: 4.96,
    reviewsCount: 164,
    badge: 'Luxury Beauty',
    dimensions: '20" × 30" (Set of 2)',
    material: '100% Pure Grade 6A Mulberry Silk, 22 Momme heavyweight quality with hidden envelope zipper',
    sizes: [
      { id: 'standard-pair', label: 'Standard Pair (20" × 30")', price: 2799, sku: 'MF-SLK-STD' },
      { id: 'king-pair', label: 'King Pair (20" × 36")', price: 3299, sku: 'MF-SLK-KNG' },
    ],
    keyFeatures: [
      'Zero friction weave reduces sleep wrinkles and prevents morning hair frizz',
      'Non-absorbent natural silk proteins keep night creams on your face, not your pillow',
      'Naturally hypoallergenic, dust-mite repelling, and temperature regulating',
      'Concealed luxury side zipper ensures pillow never slides out',
    ],
    careInstructions: [
      'Hand wash or machine wash in mesh laundry bag on delicate cold cycle',
      'Use pH-neutral silk detergent only; no bleach or enzymatic agents',
      'Air dry flat away from direct sunlight; iron inside out on lowest silk setting',
    ],
  },
  {
    id: 'botanical-micro-duvet',
    sku: 'MF-ACC-DVT-01',
    name: 'All-Season Botanical Micro-Loft Temperature Balancing Duvet',
    category: 'duvet',
    tagline: 'Lightweight 350 GSM cloud warmth with box-baffle construction that never shifts',
    price: 4999,
    originalPrice: 6999,
    image: '/images/mindfree/why-choose-bedroom.webp',
    rating: 4.88,
    reviewsCount: 132,
    badge: 'All-Weather',
    dimensions: 'Available in Queen (90" × 90") and King (104" × 90")',
    material: 'Botanical lyocell microfiber fill encased in 100% organic cotton percale shell with corner ties',
    sizes: [
      { id: 'queen', label: 'Queen (90" × 90")', price: 4999, sku: 'MF-DVT-QEN' },
      { id: 'king', label: 'King (104" × 90")', price: 5999, sku: 'MF-DVT-KNG' },
    ],
    keyFeatures: [
      'Engineered for Indian climate versatility: Cozy in AC, breathable in monsoon',
      'Box-stitch quilt chambers ensure filling never bunches into corners',
      '8 Built-in corner and side anchor loops keep duvet cover locked in place',
      'Ultra-fine hypoallergenic fibers resistant to dust mites and allergens',
    ],
    careInstructions: [
      'Machine wash cold on gentle cycle in front-loading large capacity machine',
      'Tumble dry low heat with clean dryer balls until thoroughly dry',
      'Can also be professionally dry cleaned',
    ],
  },
];
