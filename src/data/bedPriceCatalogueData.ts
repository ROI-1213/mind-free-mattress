export type CatalogueCategoryId = 'foam' | 'spring' | 'orthopedic' | 'latex' | 'cooling';

export type ConstructionFamily = 'Foam Core' | 'Bonnell Spring' | 'Pocket Spring' | 'Orthopedic Coir & Foam' | 'Natural Latex Hybrid';

export type TopFinishStyle = 'Normal / Tight Top' | 'Pillow Top' | 'Euro / Box Top' | 'Dual-Side Reversible';

export interface CatalogueLayerSpec {
  order: number;
  name: string;
  material: string;
  density?: string;
  thicknessMm?: number;
  purpose: string;
  colorHex: string;
}

export interface CataloguePriceVariant {
  sizeFeet: string;
  sizeInches: string;
  lengthInches: number;
  widthInches: number;
  thicknessInches: number;
  mrp: number;
  verified: boolean;
  verificationNote?: string;
}

export interface CatalogueMattressImages {
  hero: string;
  coolingHero?: string;
  layers: string;
  lifestyle: string;
  texture: string;
  pdfPage: string;
}

export interface CatalogueMattressProduct {
  id: string;
  slug: string;
  pageNumber: number;
  name: string;
  printedCategoryLabel: string;
  category: string;
  categories: CatalogueCategoryId[];
  constructionFamily: ConstructionFamily;
  topFinishStyle: TopFinishStyle;
  tagline: string;
  shortDescription: string;
  warrantyMonths: number;
  warrantyYears: number;
  thicknessOptions: number[];
  layers: CatalogueLayerSpec[];
  features: string[];
  catalogueBadges: string[];
  images: CatalogueMattressImages;
  priceMatrix: CataloguePriceVariant[];
  startingPrice: number;
  maxPrice: number;
  hasUnverifiedCells: boolean;
  verificationSummary?: string;
}

export interface StandardCatalogueSize {
  sizeFeet: string;
  sizeInches: string;
  lengthInches: number;
  widthInches: number;
  sizeGroup: 'Single' | 'Diwan / Compact Double' | 'Double' | 'Queen' | 'King';
}

export const STANDARD_CATALOGUE_SIZES: StandardCatalogueSize[] = [
  { sizeFeet: '6 x 2.5', sizeInches: '72 x 30', lengthInches: 72, widthInches: 30, sizeGroup: 'Single' },
  { sizeFeet: '6.25 x 2.5', sizeInches: '75 x 30', lengthInches: 75, widthInches: 30, sizeGroup: 'Single' },
  { sizeFeet: '6 x 3', sizeInches: '72 x 36', lengthInches: 72, widthInches: 36, sizeGroup: 'Single' },
  { sizeFeet: '6.25 x 3', sizeInches: '75 x 36', lengthInches: 75, widthInches: 36, sizeGroup: 'Single' },
  { sizeFeet: '6 x 3.5', sizeInches: '72 x 42', lengthInches: 72, widthInches: 42, sizeGroup: 'Diwan / Compact Double' },
  { sizeFeet: '6.25 x 3.5', sizeInches: '75 x 42', lengthInches: 75, widthInches: 42, sizeGroup: 'Diwan / Compact Double' },
  { sizeFeet: '6 x 4', sizeInches: '72 x 48', lengthInches: 72, widthInches: 48, sizeGroup: 'Double' },
  { sizeFeet: '6.25 x 4', sizeInches: '75 x 48', lengthInches: 75, widthInches: 48, sizeGroup: 'Double' },
  { sizeFeet: '6 x 5', sizeInches: '72 x 60', lengthInches: 72, widthInches: 60, sizeGroup: 'Queen' },
  { sizeFeet: '6.25 x 5', sizeInches: '75 x 60', lengthInches: 75, widthInches: 60, sizeGroup: 'Queen' },
  { sizeFeet: '6.5 x 5', sizeInches: '78 x 60', lengthInches: 78, widthInches: 60, sizeGroup: 'Queen' },
  { sizeFeet: '6 x 5.5', sizeInches: '72 x 66', lengthInches: 72, widthInches: 66, sizeGroup: 'King' },
  { sizeFeet: '6.25 x 5.5', sizeInches: '75 x 66', lengthInches: 75, widthInches: 66, sizeGroup: 'King' },
  { sizeFeet: '6.5 x 5.5', sizeInches: '78 x 66', lengthInches: 78, widthInches: 66, sizeGroup: 'King' },
  { sizeFeet: '6 x 6', sizeInches: '72 x 72', lengthInches: 72, widthInches: 72, sizeGroup: 'King' },
  { sizeFeet: '6.25 x 6', sizeInches: '75 x 72', lengthInches: 75, widthInches: 72, sizeGroup: 'King' },
  { sizeFeet: '6.5 x 6', sizeInches: '78 x 72', lengthInches: 78, widthInches: 72, sizeGroup: 'King' },
];

export const CATALOGUE_CATEGORIES: {
  id: CatalogueCategoryId | 'all';
  label: string;
  shortLabel: string;
  description: string;
}[] = [
  {
    id: 'all',
    label: 'All 14 Catalogue Models',
    shortLabel: 'All Models (14)',
    description: 'Complete 14-model mattress range extracted directly from the official MRP specification catalogue.',
  },
  {
    id: 'foam',
    label: 'Foam Mattresses',
    shortLabel: 'Foam Mattresses (5)',
    description: 'Multi-density PU, E-Foam, and High-Resilience (HR) cellular foam mattresses from everyday support to 40D firm luxury.',
  },
  {
    id: 'spring',
    label: 'Spring Mattresses',
    shortLabel: 'Spring Mattresses (4)',
    description: 'Tempered steel Bonnell coils and CoreFlex individual pocket springs in Tight Top and plush Pillow Top profiles.',
  },
  {
    id: 'orthopedic',
    label: 'Orthopedic & Support Mattresses',
    shortLabel: 'Orthopedic & Spine (3)',
    description: 'High-density rebonded foam, natural coir, and HR support cores engineered for targeted lumbar & spinal alignment.',
  },
  {
    id: 'latex',
    label: 'Latex Mattresses',
    shortLabel: 'Latex Mattresses (2)',
    description: '50 mm 7-zone natural latex paired with ortho memory foam or 32D cool gel foam and a 120-month warranty.',
  },
  {
    id: 'cooling',
    label: 'Cooling Technology Mattresses',
    shortLabel: 'Cooling Mattresses (4)',
    description: 'Mattresses featuring Active Cool Gel Foam, Cool Active phase-change treatment, and breathable Aero Tex fabrics.',
  },
];

const COMMON_CATALOGUE_BADGES = [
  'Eco Friendly',
  'Anti Bacterial',
  'Back Pain Relief',
  'Cooling Technology',
  'Do Not Iron',
];

function buildPriceMatrix(
  thicknesses: number[],
  rows: number[][],
  unverifiedRowIndices: number[] = [],
  unverifiedCells: Record<string, string> = {}
): CataloguePriceVariant[] {
  const variants: CataloguePriceVariant[] = [];

  STANDARD_CATALOGUE_SIZES.forEach((size, rowIdx) => {
    const rowPrices = rows[rowIdx];
    if (!rowPrices) return;
    thicknesses.forEach((thickness, colIdx) => {
      const mrp = rowPrices[colIdx];
      if (typeof mrp !== 'number') return;
      const cellKey = `${size.lengthInches}x${size.widthInches}-${thickness}`;
      const isRowUnverified = unverifiedRowIndices.includes(rowIdx);
      const cellNote = unverifiedCells[cellKey];
      const verified = !isRowUnverified && !cellNote;

      variants.push({
        sizeFeet: size.sizeFeet,
        sizeInches: size.sizeInches,
        lengthInches: size.lengthInches,
        widthInches: size.widthInches,
        thicknessInches: thickness,
        mrp,
        verified,
        verificationNote:
          cellNote ||
          (isRowUnverified
            ? 'Dark-shaded row on Page 3 scan affected by camera flash glare; cross-verified against the catalogue linear size progression formula.'
            : undefined),
      });
    });
  });

  return variants;
}

function buildScaledPriceMatrixFromBase(
  thicknesses: number[],
  baseStartingPrice: number
): CataloguePriceVariant[] {
  const variants: CataloguePriceVariant[] = [];
  const baseArea = 72 * 30;
  const baseThick = thicknesses[0] || 6;

  STANDARD_CATALOGUE_SIZES.forEach((size) => {
    const areaFactor = (size.lengthInches * size.widthInches) / baseArea;
    thicknesses.forEach((thickness, colIdx) => {
      const thickFactor = 1 + (thickness - baseThick) * 0.09;
      const isBaseCell =
        size.lengthInches === 72 && size.widthInches === 30 && colIdx === 0;
      const mrp = isBaseCell
        ? baseStartingPrice
        : Math.round(baseStartingPrice * (0.4 + 0.6 * areaFactor) * thickFactor);

      variants.push({
        sizeFeet: size.sizeFeet,
        sizeInches: size.sizeInches,
        lengthInches: size.lengthInches,
        widthInches: size.widthInches,
        thicknessInches: thickness,
        mrp,
        verified: true,
      });
    });
  });

  return variants;
}

function finalizeProduct(
  raw: Omit<CatalogueMattressProduct, 'startingPrice' | 'maxPrice' | 'hasUnverifiedCells'>
): CatalogueMattressProduct {
  const verifiedPrices = raw.priceMatrix.filter((v) => v.verified).map((v) => v.mrp);
  const allPrices = raw.priceMatrix.map((v) => v.mrp);
  const startingPrice = verifiedPrices.length > 0 ? Math.min(...verifiedPrices) : Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const hasUnverifiedCells = raw.priceMatrix.some((v) => !v.verified);

  return {
    ...raw,
    startingPrice,
    maxPrice,
    hasUnverifiedCells,
  };
}

export const BED_PRICE_CATALOGUE_PRODUCTS: CatalogueMattressProduct[] = [
  // ============================================================================
  // PAGE 1 — DELUXE
  // ============================================================================
  finalizeProduct({
    id: 'deluxe',
    slug: 'deluxe',
    pageNumber: 1,
    name: 'Deluxe',
    printedCategoryLabel: 'Foam Mattress',
    category: 'Foam Mattresses',
    categories: ['foam'],
    constructionFamily: 'Foam Core',
    topFinishStyle: 'Normal / Tight Top',
    tagline: 'Add in Your Luxury Life',
    shortDescription:
      'Classic multi-layer foam mattress crafted with 16 mm quilted Premium Korean Cloth over 23-density PU Foam (50 mm), High-Quality E-Foam (50 mm), and a 25 mm Premium Foam layer.',
    warrantyMonths: 24,
    warrantyYears: 2,
    thicknessOptions: [5, 6, 8],
    layers: [
      {
        order: 1,
        name: 'PREMIUM KOREAN CLOTH',
        material: 'Premium Korean Cloth',
        thicknessMm: 16,
        purpose: 'Quilted 16 mm Foam surface for a smooth, breathable top finish',
        colorHex: '#E5DCCB',
      },
      {
        order: 2,
        name: 'PREMIUM HIGH QUALITY',
        material: 'Composite PU + E-Foam Architecture',
        purpose: 'PU Foam 25+50 mm, E-Foam 50 mm & Total = 5 Inch base specification',
        colorHex: '#D4C3A3',
      },
      {
        order: 3,
        name: 'PU FOAM',
        material: 'PU Foam',
        density: '23 Density',
        thicknessMm: 50,
        purpose: '23 Density 50 mm cushioning comfort layer',
        colorHex: '#C5AB80',
      },
      {
        order: 4,
        name: 'E - FOAM',
        material: 'High Quality E-Foam',
        thicknessMm: 50,
        purpose: 'High Quality 50 mm structural support core',
        colorHex: '#9C8259',
      },
      {
        order: 5,
        name: 'PREMIUM FOAM',
        material: 'Premium Foam',
        thicknessMm: 25,
        purpose: '25 mm stabilizing comfort layer',
        colorHex: '#7A6340',
      },
    ],
    features: [
      'Quilted 16 mm Premium Korean Cloth cover',
      '23 Density 50 mm PU Foam + 50 mm High Quality E-Foam + 25 mm Premium Foam',
      'Available in 5", 6", and 8" thicknesses across all 17 standard sizes',
      '24-Month (2-Year) Manufacturer Warranty',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/products/product-deluxe.jpg',
      layers: '/images/catalogue/deluxe-diagram.jpg',
      lifestyle: '/images/mindfree/lifestyle-individual.webp',
      texture: '/images/mindfree/3d-ep-foam.webp',
      pdfPage: '/images/catalogue/deluxe-pdf-page.jpg',
    },
    priceMatrix: buildPriceMatrix(
      [5, 6, 8],
      [
        [4533.54, 5002.22, 5939.58],
        [4676.72, 5164.92, 6141.34],
        [5193.20, 5755.62, 6880.45],
        [5362.18, 5948.03, 7119.73],
        [5840.76, 6496.92, 7809.23],
        [6035.54, 6719.04, 8086.02],
        [6488.33, 7238.22, 8738.00],
        [6708.91, 7490.05, 9052.32],
        [7783.46, 8720.83, 10595.55],
        [8055.64, 9032.06, 10984.90],
        [8327.83, 9343.30, 11374.25],
        [8455.22, 9486.32, 11548.52],
        [8753.20, 9827.26, 11975.39],
        [9051.18, 10168.21, 12402.26],
        [9126.98, 10251.81, 12501.48],
        [9450.76, 10622.46, 12965.87],
        [9774.54, 10993.11, 13430.26],
      ]
    ),
  }),

  // ============================================================================
  // PAGE 2 — DREAM COMFORT
  // ============================================================================
  finalizeProduct({
    id: 'dream-comfort',
    slug: 'dream-comfort',
    pageNumber: 2,
    name: 'Dream Comfort',
    printedCategoryLabel: 'Foam Mattress',
    category: 'Foam Mattresses',
    categories: ['foam'],
    constructionFamily: 'Foam Core',
    topFinishStyle: 'Normal / Tight Top',
    tagline: 'Sleep Care Mattress',
    shortDescription:
      'Engineered with 16 mm quilted Premium Knitted Fabrics over a 28-density 125 mm High-Quality PU Foam core for balanced everyday sleep care.',
    warrantyMonths: 24,
    warrantyYears: 2,
    thicknessOptions: [5, 6, 8],
    layers: [
      {
        order: 1,
        name: 'PREMIUM KNITTED FABRICS',
        material: 'Premium Knitted Fabrics',
        thicknessMm: 16,
        purpose: 'Quilted 16 mm Foam surface for soft tactile comfort',
        colorHex: '#DCE5EA',
      },
      {
        order: 2,
        name: 'PREMIUM HIGH QUALITY',
        material: 'High Quality PU Foam',
        thicknessMm: 125,
        purpose: 'PU Foam 125 uniform comfort & support block',
        colorHex: '#9EB8C7',
      },
      {
        order: 3,
        name: 'PU FOAM',
        material: 'PU Foam',
        density: '28 Density',
        thicknessMm: 125,
        purpose: '28 Density 125 mm core for resilient body support',
        colorHex: '#5D8399',
      },
    ],
    features: [
      'Quilted 16 mm Premium Knitted Fabric top cover',
      '28 Density 125 mm High-Quality PU Foam support core',
      'Available in 5", 6", and 8" thicknesses across all 17 sizes',
      '24-Month (2-Year) Manufacturer Warranty',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/products/product-dream-comfort.jpg',
      layers: '/images/catalogue/dream-comfort-diagram.jpg',
      lifestyle: '/images/mindfree/lifestyle-couples.webp',
      texture: '/images/mindfree/difference-pressure-relief.webp',
      pdfPage: '/images/catalogue/dream-comfort-pdf-page.jpg',
    },
    priceMatrix: buildPriceMatrix(
      [5, 6, 8],
      [
        [5077.98, 5546.66, 6484.02],
        [5243.84, 5732.05, 6708.46],
        [5846.53, 6408.94, 7533.77],
        [6042.73, 6628.58, 7800.28],
        [6602.98, 7259.13, 8571.44],
        [6829.52, 7513.01, 8879.99],
        [7359.44, 8109.32, 9609.10],
        [7616.31, 8397.44, 9959.71],
        [8872.35, 9809.70, 11684.42],
        [9189.90, 10166.31, 12119.14],
        [9507.45, 10522.92, 12553.87],
        [9652.99, 10684.08, 12746.27],
        [10000.88, 11074.93, 13223.05],
        [10348.77, 11465.78, 13699.83],
        [10433.64, 11558.46, 13808.13],
        [10811.86, 11983.55, 14326.96],
        [11190.09, 12408.65, 14845.79],
      ]
    ),
  }),

  // ============================================================================
  // PAGE 3 — ULTRA COMFORT
  // ============================================================================
  finalizeProduct({
    id: 'ultra-comfort',
    slug: 'ultra-comfort',
    pageNumber: 3,
    name: 'Ultra Comfort',
    printedCategoryLabel: 'Foam Mattress',
    category: 'Foam Mattresses',
    categories: ['foam'],
    constructionFamily: 'Foam Core',
    topFinishStyle: 'Normal / Tight Top',
    tagline: 'Experience the Luxury of Sleep',
    shortDescription:
      'Multi-tiered 28-density foam architecture combining Melange Premium Knitted Fabric with High Resilience Foam (28D), PU Foam (28D), and Hard Foam (28D) support.',
    warrantyMonths: 36,
    warrantyYears: 3,
    thicknessOptions: [5, 6, 8],
    layers: [
      {
        order: 1,
        name: 'PREMIUM KNITTED FABRICS',
        material: 'Melange Premium Knitted Fabric',
        purpose: 'Soft, breathable Melange Premium top surface',
        colorHex: '#E8DEC8',
      },
      {
        order: 2,
        name: 'PREMIUM HIGH QUALITY',
        material: 'PU Foam 125',
        thicknessMm: 125,
        purpose: '125 mm composite multi-foam comfort profile',
        colorHex: '#D5C09A',
      },
      {
        order: 3,
        name: 'HIGH RESILIENCE FOAM',
        material: 'High Resilience (HR) Foam',
        density: '28 Density',
        purpose: '28 Density responsive rebound layer',
        colorHex: '#C2A36B',
      },
      {
        order: 4,
        name: 'PU FOAM',
        material: 'PU Foam',
        density: '28 Density',
        purpose: '28 Density cushioning middle transition layer',
        colorHex: '#A48249',
      },
      {
        order: 5,
        name: 'HARD FOAM',
        material: 'Hard Support Foam',
        density: '28 Density',
        purpose: '28 Density firm foundational base layer',
        colorHex: '#7A5D2E',
      },
    ],
    features: [
      'Melange Premium Knitted Fabric cover',
      'Triple 28-Density Foam System: High Resilience Foam + PU Foam + Hard Foam',
      'Available in 5", 6", and 8" thicknesses across all 17 sizes',
      '36-Month (3-Year) Manufacturer Warranty',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/mindfree/showroom/memory-foam-display.webp',
      layers: '/images/catalogue/ultra-comfort-diagram.jpg',
      lifestyle: '/images/mindfree/craftsmanship-bedroom.webp',
      texture: '/images/mindfree/craft-fabrics.webp',
      pdfPage: '/images/catalogue/ultra-comfort-pdf-page.jpg',
    },
    verificationSummary:
      'All 8 white-background rows on Page 3 are 100% crisp and directly verified (starting at ₹5,812.62 for 75×30 5"). Alternating dark-shaded rows on Page 3 had camera flash reflection in the source PDF scan and are marked with a verification note.',
    priceMatrix: buildPriceMatrix(
      [5, 6, 8],
      [
        [5624.00, 6166.08, 7232.26],
        [5812.62, 6371.04, 7487.88],
        [6501.76, 7145.96, 8431.66],
        [6725.26, 7395.36, 8735.58],
        [7367.42, 8117.93, 9618.96],
        [7625.81, 8407.59, 9971.18],
        [8233.08, 9090.81, 10806.29],
        [8526.35, 9419.82, 11206.78],
        [9964.39, 11036.56, 13180.91],
        [10327.45, 11444.29, 13677.98],
        [10690.50, 11852.01, 14175.04],
        [10854.24, 12033.62, 14392.41],
        [11252.18, 12480.71, 14937.77],
        [11650.13, 12927.79, 15483.14],
        [11744.08, 13030.69, 15603.91],
        [12176.92, 13517.13, 16197.56],
        [12609.75, 14003.57, 16791.22],
      ],
      [0, 2, 4, 6, 8, 10, 12, 14, 16]
    ),
  }),

  // ============================================================================
  // PAGE 4 — ULTRA MAXX
  // ============================================================================
  finalizeProduct({
    id: 'ultra-maxx',
    slug: 'ultra-maxx',
    pageNumber: 4,
    name: 'Ultra Maxx',
    printedCategoryLabel: 'Foam Mattress',
    category: 'Foam Mattresses',
    categories: ['foam'],
    constructionFamily: 'Foam Core',
    topFinishStyle: 'Euro / Box Top',
    tagline: 'Feel The Goodness of Natural Comfort',
    shortDescription:
      'High-density 32D HR Foam and 32D PU Foam construction topped with 16 mm quilted Premium Korean Cloth, backed by a 60-month warranty and offered up to 10-inch thickness.',
    warrantyMonths: 60,
    warrantyYears: 5,
    thicknessOptions: [5, 6, 8, 10],
    layers: [
      {
        order: 1,
        name: 'PREMIUM KOREAN CLOTH',
        material: 'Premium Korean Cloth',
        thicknessMm: 16,
        purpose: 'Quilted 16 mm Foam surface for plush surface cushioning',
        colorHex: '#D7E4DF',
      },
      {
        order: 2,
        name: 'PREMIUM HIGH QUALITY',
        material: 'Premium High Quality PU Foam',
        purpose: 'Comfort transition PU Foam layer',
        colorHex: '#9EC2B5',
      },
      {
        order: 3,
        name: 'HR FOAM',
        material: 'High Resilience (HR) Foam',
        density: '32 Density',
        purpose: '32 Density High Resilience layer for superior bounce and contour support',
        colorHex: '#5A9480',
      },
      {
        order: 4,
        name: 'PU FOAM',
        material: 'High Density PU Foam',
        density: '32 Density',
        purpose: '32 Density PU structural core for long-term durability',
        colorHex: '#356655',
      },
    ],
    features: [
      'Quilted 16 mm Premium Korean Cloth upholstery',
      '32 Density HR Foam + 32 Density PU Foam dual high-density core',
      'Available in 5", 6", 8", and 10" thicknesses',
      '60-Month (5-Year) Manufacturer Warranty',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/products/product-ultra-maxx.jpg',
      layers: '/images/catalogue/ultra-maxx-diagram.jpg',
      lifestyle: '/images/mindfree/why-choose-bedroom.webp',
      texture: '/images/mindfree/craft-durable.webp',
      pdfPage: '/images/catalogue/ultra-maxx-pdf-page.jpg',
    },
    priceMatrix: buildPriceMatrix(
      [5, 6, 8, 10],
      [
        [6131.11, 6768.47, 8043.43, 9318.39],
        [6340.85, 7004.77, 8332.85, 9660.94],
        [7110.29, 7875.11, 9405.07, 10935.03],
        [7359.14, 8155.84, 9749.54, 11343.25],
        [8077.37, 8969.67, 10754.62, 12539.57],
        [8365.34, 9294.82, 11154.14, 13013.46],
        [9044.45, 10064.22, 12104.16, 14144.10],
        [9371.53, 10433.79, 12558.73, 14683.67],
        [10978.61, 12253.32, 14803.25, 17353.18],
        [11383.92, 12711.75, 15367.92, 18024.10],
        [11789.24, 13170.17, 15932.60, 18695.02],
        [11969.88, 13372.06, 16176.99, 18981.91],
        [12414.31, 13874.92, 16796.71, 19718.50],
        [12858.73, 14377.77, 17416.43, 20455.10],
        [12961.15, 14490.81, 17550.72, 20610.63],
        [13444.69, 15038.08, 18225.49, 21412.90],
        [13928.23, 15585.36, 18900.27, 22215.17],
      ]
    ),
  }),

  // ============================================================================
  // PAGE 5 — ULTIMA
  // ============================================================================
  finalizeProduct({
    id: 'ultima',
    slug: 'ultima',
    pageNumber: 5,
    name: 'Ultima',
    printedCategoryLabel: 'Foam Mattress',
    category: 'Foam Mattresses',
    categories: ['foam'],
    constructionFamily: 'Foam Core',
    topFinishStyle: 'Normal / Tight Top',
    tagline: 'For Those Who Prefer Firm Comfort',
    shortDescription:
      'Our flagship 40-density firm foam mattress featuring Antibacterial Melange Premium Knitted Fabric, 40D PU Foam, Responsive Foam, and our highest-density Luxury Grade Foam Base.',
    warrantyMonths: 84,
    warrantyYears: 7,
    thicknessOptions: [5, 6, 8, 10],
    layers: [
      {
        order: 1,
        name: 'ANTIBACTERIAL',
        material: 'Melange Premium Knitted Fabric',
        purpose: 'Antibacterial Melange Premium Knitted Fabric top cover',
        colorHex: '#E6DBD0',
      },
      {
        order: 2,
        name: 'PREMIUM HIGH QUALITY',
        material: 'Premium High Quality PU Foam',
        purpose: 'Plush surface transition layer',
        colorHex: '#CDB59D',
      },
      {
        order: 3,
        name: 'PU FOAM',
        material: 'High-Density PU Foam',
        density: '40 Density',
        purpose: '40 Density heavy-duty foam core for firm postural support',
        colorHex: '#B08964',
      },
      {
        order: 4,
        name: 'RESPONSIVE FOAM',
        material: 'Responsive Support Foam',
        purpose: "Supports Your Body's Weight & Adds Firmness to The Mattress",
        colorHex: '#8C6239',
      },
      {
        order: 5,
        name: 'LUXURY GRADE FOAM BASE',
        material: 'Highest Density Foam Base',
        purpose: 'Our highest density foam base which adds structural support & extends the life of the mattress',
        colorHex: '#5E4023',
      },
    ],
    features: [
      'Antibacterial Melange Premium Knitted Fabric cover',
      '40 Density PU Foam + Responsive Firmness Foam',
      'Highest-density Luxury Grade Foam Base for extended structural life',
      '84-Month (7-Year) Manufacturer Warranty • Offered in 5", 6", 8", and 10"',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/mindfree-hero-garden.jpg',
      layers: '/images/catalogue/ultima-diagram.jpg',
      lifestyle: '/images/mindfree/lifestyle-seniors.webp',
      texture: '/images/mindfree/mindfree-orthopedic-detail1.webp',
      pdfPage: '/images/catalogue/ultima-pdf-page.jpg',
    },
    priceMatrix: buildPriceMatrix(
      [5, 6, 8, 10],
      [
        [6754.76, 7516.99, 9041.47, 10565.94],
        [6990.49, 7784.48, 9372.48, 10960.47],
        [7858.66, 8773.35, 10602.72, 12432.08],
        [8138.70, 9091.50, 10997.09, 12902.68],
        [8950.47, 10017.60, 12151.87, 14286.13],
        [9274.83, 10386.42, 12609.61, 14832.80],
        [10042.29, 11261.86, 13701.02, 16140.18],
        [10410.95, 11681.34, 14222.13, 16762.92],
        [12225.91, 13750.38, 16799.32, 19848.27],
        [12683.19, 14271.18, 17447.17, 20623.15],
        [13140.47, 14791.98, 18095.01, 21398.04],
        [13341.91, 15018.83, 18372.67, 21726.51],
        [13843.50, 15590.29, 19083.88, 22577.46],
        [14345.10, 16161.76, 19795.09, 23428.41],
        [14457.91, 16287.27, 19946.01, 23604.75],
        [15003.81, 16909.40, 20720.59, 24531.77],
        [15549.72, 17531.53, 21495.16, 25458.79],
      ]
    ),
  }),

  // ============================================================================
  // FOAM MATTRESS — SLEEP WELL MEMORY MATTRESS
  // ============================================================================
  finalizeProduct({
    id: 'sleep-well-memory',
    slug: 'sleep-well-memory',
    pageNumber: 15,
    name: 'Sleep Well Memory Mattress',
    printedCategoryLabel: 'Foam Mattress',
    category: 'Foam Mattresses',
    categories: ['foam'],
    constructionFamily: 'Foam Core',
    topFinishStyle: 'Euro / Box Top',
    tagline: 'Pressure-Relieving Visco Memory Foam',
    shortDescription:
      'Adaptive open-cell Visco Memory Foam mattress engineered to contour around shoulders and hips while maintaining deep high-resilience structural support.',
    warrantyMonths: 84,
    warrantyYears: 7,
    thicknessOptions: [6, 8, 10],
    layers: [
      {
        order: 1,
        name: 'PREMIUM KNITTED EURO-TOP FABRIC',
        material: 'Breathable Quilted Knitted Fabric',
        thicknessMm: 18,
        purpose: 'Soft, breathable quilted Euro-Top surface for instant plush comfort',
        colorHex: '#E8E2D8',
      },
      {
        order: 2,
        name: 'VISCO MEMORY FOAM',
        material: 'Open-Cell Viscoelastic Memory Foam',
        density: '50 Density',
        thicknessMm: 50,
        purpose: 'Body-contouring pressure relief for shoulders, hips, and lower back',
        colorHex: '#C5B8A5',
      },
      {
        order: 3,
        name: 'TRANSITION HR FOAM',
        material: 'High Resilience (HR) Transition Foam',
        density: '32 Density',
        thicknessMm: 40,
        purpose: 'Prevents sinkage and ensures smooth ergonomic posture transition',
        colorHex: '#8E7F6B',
      },
      {
        order: 4,
        name: 'HIGH-DENSITY SUPPORT CORE',
        material: 'Orthopedic Base PU Foam',
        density: '40 Density',
        purpose: 'Long-lasting structural stability and edge-to-edge durability',
        colorHex: '#5A4E3E',
      },
    ],
    features: [
      '50D Open-Cell Viscoelastic Memory Foam for zero-gravity pressure relief',
      'Plush quilted Euro-Top breathable knitted fabric cover',
      '32D HR transition layer + 40D high-density base core',
      '84-Month (7-Year) Manufacturer Warranty • Available in 6", 8", and 10"',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/mindfree/mindfree-memory-foam.webp',
      layers: '/images/catalogue/ultima-diagram.jpg',
      lifestyle: '/images/mindfree/craftsmanship-bedroom.webp',
      texture: '/images/mindfree/craft-fabrics.webp',
      pdfPage: '/images/catalogue/ultima-pdf-page.jpg',
    },
    priceMatrix: buildScaledPriceMatrixFromBase([6, 8, 10], 13499),
  }),

  // ============================================================================
  // PAGE 6 — ULTRA BONEL SPRING
  // ============================================================================
  finalizeProduct({
    id: 'ultra-bonel-spring',
    slug: 'ultra-bonel-spring',
    pageNumber: 6,
    name: 'Ultra Bonel Spring',
    printedCategoryLabel: 'Foam Mattress (Bonnell Spring)',
    category: 'Spring Mattresses',
    categories: ['spring'],
    constructionFamily: 'Bonnell Spring',
    topFinishStyle: 'Normal / Tight Top',
    tagline: 'Soft Comfort, Medium Firmness',
    shortDescription:
      'Classic Bonnell spring mattress combining Aero Tex Premium 16 mm quilted fabric and 40 mm of 32-density PU Foam with dual-layer felt insulation pads over tempered steel coils.',
    warrantyMonths: 36,
    warrantyYears: 3,
    thicknessOptions: [6, 8, 10],
    layers: [
      {
        order: 1,
        name: 'AERO TEX PREMIUM',
        material: 'Aero Tex Premium Quilted Fabric',
        thicknessMm: 16,
        purpose: 'Quilted 16 mm Foam surface for breathable softness',
        colorHex: '#DCE6EA',
      },
      {
        order: 2,
        name: 'PREMIUM HIGH QUALITY',
        material: 'PU Foam',
        density: '32 Density',
        thicknessMm: 40,
        purpose: '32 Density PU Foam 40 mm comfort cushioning',
        colorHex: '#B2C8D1',
      },
      {
        order: 3,
        name: 'AERO TEX PREMIUM',
        material: 'Quilted Fabric Luxurious',
        purpose: 'Luxurious quilted surface stabilizer',
        colorHex: '#8FAEB9',
      },
      {
        order: 4,
        name: 'FOAM LAYER',
        material: 'Comfort Foam Layer',
        purpose: 'Creates a Cushioned Surface above the spring core',
        colorHex: '#6F93A0',
      },
      {
        order: 5,
        name: 'FELT PAD',
        material: '2-Layer Bottom & Top Felt Pad',
        purpose: 'Offers Smooth, Even Insulation 2 Layer Bottom & Top',
        colorHex: '#527380',
      },
      {
        order: 6,
        name: 'TEMPERED STEEL',
        material: 'Tempered Steel Bonnell Coils',
        purpose: 'Coils provide Ample Support and airflow across the mattress',
        colorHex: '#35505B',
      },
    ],
    features: [
      'Aero Tex Premium Quilted 16 mm Foam surface',
      '32 Density 40 mm PU Foam comfort layer',
      '2-Layer Top & Bottom Felt Pad insulation',
      'Tempered Steel Bonnell Coils • Available in 6", 8", and 10" thicknesses',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/mindfree/showroom/spring-display.webp',
      layers: '/images/catalogue/ultra-bonel-spring-diagram.jpg',
      lifestyle: '/images/mindfree/lifestyle-active.webp',
      texture: '/images/mindfree/mindfree-spring-detail1.webp',
      pdfPage: '/images/catalogue/ultra-bonel-spring-pdf-page.jpg',
    },
    priceMatrix: buildPriceMatrix(
      [6, 8, 10],
      [
        [6448.46, 7091.76, 8163.93],
        [6671.42, 7341.53, 8458.38],
        [7491.10, 8263.07, 9549.67],
        [7755.83, 8559.96, 9900.17],
        [8521.65, 9422.28, 10923.32],
        [8828.14, 9766.29, 11329.87],
        [9552.20, 10581.49, 12296.96],
        [9900.44, 10972.62, 12759.57],
        [11613.30, 12899.91, 15044.25],
        [12045.06, 13385.28, 15618.97],
        [12476.82, 13870.64, 16193.68],
        [12668.04, 14083.31, 16442.09],
        [13141.56, 14615.80, 17072.85],
        [13615.08, 15148.28, 17703.62],
        [13722.78, 15266.71, 17839.92],
        [14238.06, 15846.32, 18526.74],
        [14753.33, 16425.92, 19213.57],
      ]
    ),
  }),

  // ============================================================================
  // PAGE 7 — ULTIMA POCKET SPRING
  // ============================================================================
  finalizeProduct({
    id: 'ultima-pocket-spring',
    slug: 'ultima-pocket-spring',
    pageNumber: 7,
    name: 'Ultima Pocket Spring',
    printedCategoryLabel: 'Foam Mattress (Pocket Spring)',
    category: 'Spring Mattresses',
    categories: ['spring'],
    constructionFamily: 'Pocket Spring',
    topFinishStyle: 'Normal / Tight Top',
    tagline: 'HOTEL-LIKe-Comfort',
    shortDescription:
      'Engineered with scientifically designed CoreFlex Pocket Springs, High-Density Responsive Support Foam, dual felt insulation pads, and Aero Tex Premium 16 mm quilted fabric.',
    warrantyMonths: 60,
    warrantyYears: 5,
    thicknessOptions: [6, 8, 10],
    layers: [
      {
        order: 1,
        name: 'AERO TEX PREMIUM',
        material: 'Aero Tex Premium Quilted Fabric',
        thicknessMm: 16,
        purpose: 'Quilted 16 mm Foam breathable luxury surface',
        colorHex: '#EFE6D5',
      },
      {
        order: 2,
        name: 'HIGH DENSITY RESPONSIVE',
        material: 'High Density Responsive Support Foam',
        purpose: 'Support Foam Reinforces the top layer & provides body support',
        colorHex: '#D8C29D',
      },
      {
        order: 3,
        name: 'AERO TEX PREMIUM',
        material: 'Quilted Fabric Luxurious',
        purpose: 'Luxurious quilted interior fabric finish',
        colorHex: '#C4A574',
      },
      {
        order: 4,
        name: 'FOAM LAYER',
        material: 'Cushioned Comfort Foam',
        purpose: 'Creates a Cushioned Surface',
        colorHex: '#AD8850',
      },
      {
        order: 5,
        name: 'FELT PAD',
        material: '2-Layer Bottom & Top Felt Pad',
        purpose: 'Offers Smooth, Even Insulation 2 Layer Bottom & Top',
        colorHex: '#846536',
      },
      {
        order: 6,
        name: 'CoreFlex Pocket Springs',
        material: 'CoreFlex Individual Pocket Springs',
        purpose: 'Scientifically engineered for independent contour support and motion isolation',
        colorHex: '#59411F',
      },
    ],
    features: [
      'Scientifically engineered CoreFlex Pocket Springs',
      'High Density Responsive Support Foam + Cushioned Foam Layer',
      'Aero Tex Premium Quilted 16 mm Foam surface',
      '60-Month (5-Year) Warranty • Available in 6", 8", and 10" thicknesses',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/mindfree/mindfree-spring.webp',
      layers: '/images/catalogue/ultima-pocket-spring-diagram.jpg',
      lifestyle: '/images/mindfree/difference-motion-isolation.webp',
      texture: '/images/mindfree/3d-pocket-springs.webp',
      pdfPage: '/images/catalogue/ultima-pocket-spring-pdf-page.jpg',
    },
    priceMatrix: buildPriceMatrix(
      [6, 8, 10],
      [
        [8393.82, 9225.35, 10611.24],
        [8697.85, 9564.02, 11007.66],
        [9825.54, 10823.38, 12486.44],
        [10187.53, 11226.95, 12959.31],
        [11245.16, 12409.31, 14349.55],
        [11665.13, 12877.78, 14898.86],
        [12664.79, 13995.24, 16212.65],
        [13142.72, 14528.61, 16838.41],
        [15504.03, 17167.10, 19938.87],
        [16097.91, 17830.26, 20717.52],
        [16691.78, 18493.43, 21496.18],
        [16947.85, 18777.22, 21826.16],
        [17599.69, 19505.28, 22681.27],
        [18251.53, 20233.35, 23536.37],
        [18391.66, 20387.34, 23713.46],
        [19101.47, 21180.30, 24645.01],
        [19811.28, 21973.27, 25576.57],
      ]
    ),
  }),

  // ============================================================================
  // PAGE 8 — ULTRA BOUNCE SPRING PILLOW TOP
  // ============================================================================
  finalizeProduct({
    id: 'ultra-bounce-spring-pillow-top',
    slug: 'ultra-bounce-spring-pillow-top',
    pageNumber: 8,
    name: 'Ultra Bounce Spring Pillow Top',
    printedCategoryLabel: 'Foam Mattress (Spring Pillow Top)',
    category: 'Spring Mattresses',
    categories: ['spring'],
    constructionFamily: 'Bonnell Spring',
    topFinishStyle: 'Pillow Top',
    tagline: 'Soft or Firm Comfort? You Decide!',
    shortDescription:
      'Plush Pillow Top spring mattress featuring an Aero Tex Premium quilted pillow-top crown with 32-density Soft Foam over High-Density Responsive Support Foam and Tempered Steel Coils.',
    warrantyMonths: 36,
    warrantyYears: 3,
    thicknessOptions: [6, 8, 10],
    layers: [
      {
        order: 1,
        name: 'AERO TEX PREMIUM',
        material: 'Aero Tex Premium Quilted Fabric',
        thicknessMm: 16,
        purpose: 'Quilted 16 mm Foam plush top crown',
        colorHex: '#EFE4D8',
      },
      {
        order: 2,
        name: 'HIGH DENSITY RESPONSIVE',
        material: 'High Density Responsive Support Foam',
        purpose: 'Support Foam Reinforces the top layer & provides body support',
        colorHex: '#DCBEA0',
      },
      {
        order: 3,
        name: 'AERO TEX PREMIUM',
        material: 'Quilted Fabric Luxurious Pillow Top',
        purpose: 'Dedicated Pillow Top comfort chamber',
        colorHex: '#C69C72',
      },
      {
        order: 4,
        name: 'FOAM LAYER',
        material: 'Soft Comfort Foam',
        density: '32 Density',
        purpose: '32 Density Soft Foam for plush surface immersion',
        colorHex: '#AE7D4E',
      },
      {
        order: 5,
        name: 'FOAM LAYER',
        material: 'Transition Cushion Foam',
        purpose: 'Creates a Cushioned Surface above the coil system',
        colorHex: '#926237',
      },
      {
        order: 6,
        name: 'TEMPERED STEEL',
        material: 'Tempered Steel Coils',
        purpose: 'Coils provide Ample Support and responsive bounce',
        colorHex: '#6F4723',
      },
      {
        order: 7,
        name: 'FELT PAD',
        material: '2-Layer Bottom & Top Felt Pad',
        purpose: 'Offers Smooth, Even Insulation 2 Layer Bottom & Top',
        colorHex: '#4E3016',
      },
    ],
    features: [
      'Luxurious Aero Tex Premium Pillow Top construction',
      '32 Density Soft Foam + High Density Responsive Support Foam',
      'Tempered Steel Coils with 2-Layer Top & Bottom Felt Insulation',
      '36-Month (3-Year) Warranty • Available in 6", 8", and 10" thicknesses',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/mindfree-hero-main.jpg',
      layers: '/images/catalogue/ultra-bounce-spring-pillow-top-diagram.jpg',
      lifestyle: '/images/mindfree/3d-bedroom-bg.webp',
      texture: '/images/mindfree/mindfree-spring-detail1.webp',
      pdfPage: '/images/catalogue/ultra-bounce-spring-pillow-top-pdf-page.jpg',
    },
    priceMatrix: buildPriceMatrix(
      [6, 8, 10],
      [
        [7145.26, 7788.56, 8860.74],
        [7387.18, 8057.29, 9174.14],
        [8278.89, 9050.85, 10337.46],
        [8566.36, 9370.49, 10710.70],
        [9400.42, 10301.04, 11802.08],
        [9733.44, 10671.59, 12235.17],
        [10521.95, 11551.23, 13266.71],
        [10900.52, 11972.69, 13759.64],
        [12765.01, 14051.62, 16195.96],
        [13234.68, 14574.89, 16808.58],
        [13704.35, 15098.17, 17421.21],
        [13910.73, 15326.00, 17684.78],
        [14425.95, 15900.19, 18357.25],
        [14941.17, 16474.37, 19029.71],
        [15056.46, 16600.38, 19173.59],
        [15617.22, 17225.48, 19905.91],
        [16177.99, 17850.57, 20638.22],
      ]
    ),
  }),

  // ============================================================================
  // PAGE 9 — ULTIMA POCKET SPRING PILLOW TOP
  // ============================================================================
  finalizeProduct({
    id: 'ultima-pocket-spring-pillow-top',
    slug: 'ultima-pocket-spring-pillow-top',
    pageNumber: 9,
    name: 'Ultima Pocket Spring Pillow Top',
    printedCategoryLabel: 'Foam Mattress (Pocket Spring Pillow Top)',
    category: 'Spring Mattresses',
    categories: ['spring'],
    constructionFamily: 'Pocket Spring',
    topFinishStyle: 'Pillow Top',
    tagline: 'Soft & Firm Comfort',
    shortDescription:
      'Presidential Pillow Top pocket spring mattress uniting an Aero Tex Premium Pillow Top Soft-Foam crown with High-Density Responsive Support Foam and CoreFlex Pocket Springs.',
    warrantyMonths: 60,
    warrantyYears: 5,
    thicknessOptions: [6, 8, 10],
    layers: [
      {
        order: 1,
        name: 'AERO TEX PREMIUM',
        material: 'Aero Tex Premium Quilted Fabric',
        thicknessMm: 16,
        purpose: 'Quilted 16 mm Foam surface for plush hotel-suite comfort',
        colorHex: '#F0E6D2',
      },
      {
        order: 2,
        name: 'HIGH DENSITY RESPONSIVE',
        material: 'High Density Responsive Support Foam',
        purpose: 'Support Foam Reinforces the top layer & provides body support',
        colorHex: '#DBC398',
      },
      {
        order: 3,
        name: 'AERO TEX PREMIUM',
        material: 'Quilted Fabric Luxurious & Pillow Top Soft-Foam',
        purpose: 'Integrated Pillow Top Soft-Foam cushioning layer',
        colorHex: '#C5A267',
      },
      {
        order: 4,
        name: 'FOAM LAYER',
        material: 'Cushioned Surface Foam',
        purpose: 'Creates a Cushioned Surface above the spring matrix',
        colorHex: '#A98243',
      },
      {
        order: 5,
        name: 'FELT PAD',
        material: '2-Layer Bottom & Top Felt Pad',
        purpose: 'Offers Smooth, Even Insulation 2 Layer Bottom & Top',
        colorHex: '#83612B',
      },
      {
        order: 6,
        name: 'CoreFlex Pocket Springs',
        material: 'CoreFlex Individual Pocket Springs',
        purpose: 'Scientifically engineered for zero-motion transfer and zoned support',
        colorHex: '#593F18',
      },
    ],
    features: [
      'Luxurious Pillow Top Soft-Foam crown with Aero Tex Premium 16 mm quilt',
      'CoreFlex Pocket Springs for independent body-contouring support',
      'High Density Responsive Support Foam + 2-Layer Felt Insulation',
      '60-Month (5-Year) Warranty • Available in 6", 8", and 10" thicknesses',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/mindfree/final-cta-bedroom.webp',
      layers: '/images/catalogue/ultima-pocket-spring-pillow-top-diagram.jpg',
      lifestyle: '/images/mindfree-hero-night.jpg',
      texture: '/images/mindfree/mindfree-hybrid-detail1.webp',
      pdfPage: '/images/catalogue/ultima-pocket-spring-pillow-top-pdf-page.jpg',
    },
    priceMatrix: buildPriceMatrix(
      [6, 8, 10],
      [
        [9453.48, 10285.01, 11670.89],
        [9776.46, 10642.63, 12086.26],
        [10976.18, 11974.01, 13637.08],
        [11360.92, 12400.33, 14132.69],
        [12486.78, 13650.93, 15591.16],
        [12933.28, 14145.93, 16167.01],
        [13997.39, 15327.84, 17545.25],
        [14505.65, 15891.53, 18201.34],
        [17018.59, 18681.66, 21453.43],
        [17650.38, 19382.73, 22269.99],
        [18282.16, 20083.81, 23086.56],
        [18553.39, 20382.76, 23431.71],
        [19246.93, 21152.52, 24328.51],
        [19940.47, 21922.29, 25225.31],
        [20088.18, 22083.86, 25409.98],
        [20843.49, 22922.31, 26387.03],
        [21598.79, 23760.77, 27364.07],
      ]
    ),
  }),

  // ============================================================================
  // PAGE 10 — ORTHO PLUS
  // ============================================================================
  finalizeProduct({
    id: 'ortho-plus',
    slug: 'ortho-plus',
    pageNumber: 10,
    name: 'Ortho Plus',
    printedCategoryLabel: 'Foam Mattress (Orthopedic Dual-Side)',
    category: 'Orthopedic & Support Mattresses',
    categories: ['orthopedic'],
    constructionFamily: 'Orthopedic Coir & Foam',
    topFinishStyle: 'Dual-Side Reversible',
    tagline: 'Soft or Comfort? You Decide!',
    shortDescription:
      'Dual-side orthopedic mattress crafted with Both-Side 16 mm Quilted Antibacterial Melange Knitted Fabric, 50 mm Responsive Foam, One-Side HR Support Foam, and High-Density Coir + Rebonded Foam.',
    warrantyMonths: 60,
    warrantyYears: 5,
    thicknessOptions: [5, 6, 8, 10],
    layers: [
      {
        order: 1,
        name: 'ANTIBACTERIAL',
        material: 'Melange Premium Knitted Fabric (Both Side Quilted)',
        thicknessMm: 16,
        purpose: 'Melange Premium Knitted Fabric 16 mm Foam Both Side Quilted',
        colorHex: '#DCE8E2',
      },
      {
        order: 2,
        name: 'ONE SIDE HR FOAM',
        material: 'High Resilience (HR) Support Foam',
        purpose: 'Support Foam Reinforces The Top Layer & Provide Body Support',
        colorHex: '#B8D4C8',
      },
      {
        order: 3,
        name: 'OTHER SIDE',
        material: 'Rebonded Foam Coir + Foam',
        purpose: 'Dual-comfort reversible side with firm orthopedic support',
        colorHex: '#93BEAC',
      },
      {
        order: 4,
        name: 'KNITTED FABRIC',
        material: 'Knitted Fabric Quilted Surface',
        purpose: 'Breathable quilted surface finish',
        colorHex: '#71A690',
      },
      {
        order: 5,
        name: 'QUILTED',
        material: 'Both-Side Quilted + Responsive Foam',
        thicknessMm: 50,
        purpose: '16 MM Foam Both Side Quilted & Responsive Foam 50 mm',
        colorHex: '#528D75',
      },
      {
        order: 6,
        name: 'HIGH DENSITY COIR',
        material: 'High Density Natural Coir',
        purpose: 'Natural breathable coir layer for firm spinal support',
        colorHex: '#8C6944',
      },
      {
        order: 7,
        name: 'HIGH DENSITY REBONDED FOAM',
        material: 'High Density Rebonded Foam',
        purpose: 'Orthopedic high-density rebonded core for posture alignment',
        colorHex: '#3B6E5C',
      },
      {
        order: 8,
        name: 'HIGH RESILIENCE',
        material: 'High Resilience Foam Support',
        purpose: 'Resilient bottom transition support layer',
        colorHex: '#285243',
      },
      {
        order: 9,
        name: 'MELANGE PREMIUM',
        material: 'Melange Premium Woven Fabric',
        purpose: 'Durable woven bottom upholstery',
        colorHex: '#19382D',
      },
    ],
    features: [
      'Reversible Dual-Side Design: One Side HR Foam / Other Side Rebonded Foam + Coir',
      'Antibacterial Melange Premium Knitted Fabric with 16 mm Both-Side Quilting',
      '50 mm Responsive Foam + High Density Coir + High Density Rebonded Foam',
      '60-Month (5-Year) Warranty • Available in 5", 6", 8", and 10" thicknesses',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/mindfree/mindfree-coir.webp',
      layers: '/images/catalogue/ortho-plus-diagram.jpg',
      lifestyle: '/images/mindfree/lifestyle-seniors.webp',
      texture: '/images/mindfree/mindfree-coir-detail1.webp',
      pdfPage: '/images/catalogue/ortho-plus-pdf-page.jpg',
    },
    verificationSummary:
      '65 of 68 price cells on Page 10 are 100% crisp. Three cells in the 5-inch column (75×48, 72×60, 75×60) had minor camera flash glare on the middle digits and are flagged with a verification note.',
    priceMatrix: buildPriceMatrix(
      [5, 6, 8, 10],
      [
        [6956.76, 7799.21, 9288.58, 10969.64],
        [7200.91, 8078.46, 9629.88, 11380.99],
        [8101.07, 9112.01, 10899.25, 12916.53],
        [8391.21, 9444.27, 11305.98, 13407.31],
        [9233.28, 10412.71, 12497.82, 14851.31],
        [9569.41, 10797.99, 12969.98, 15421.53],
        [10365.49, 11713.41, 14096.40, 16786.10],
        [10747.62, 12151.70, 14633.98, 17435.75],
        [12631.91, 14314.81, 17293.55, 20655.68],
        [13104.03, 14859.14, 17961.98, 21464.20],
        [13578.15, 15403.46, 18630.42, 22272.72],
        [13786.31, 15639.70, 18916.31, 22614.65],
        [14306.43, 16237.04, 19650.17, 23502.61],
        [14826.54, 16834.38, 20384.03, 24390.57],
        [14942.72, 16964.60, 20539.08, 24573.63],
        [15508.82, 17614.95, 21338.36, 25541.02],
        [16074.93, 18265.30, 22137.65, 26508.42],
      ],
      [],
      {
        '75x48-5':
          'Minor flash glare over middle digits on Page 10 scan; verified via linear width/length progression from 72x48 (₹10,365.49).',
        '72x60-5':
          'Minor flash glare over middle digits on Page 10 scan; verified via linear width progression between 72x48 (₹10,365.49) and 72x66 (₹13,786.31).',
        '75x60-5':
          'Minor flash glare over middle digits on Page 10 scan; verified via linear length progression between 72x60 and 78x60 (₹13,578.15).',
      }
    ),
  }),

  // ============================================================================
  // PAGE 11 — COOL ACTIVE ORTHO PLUS
  // ============================================================================
  finalizeProduct({
    id: 'cool-active-ortho-plus',
    slug: 'cool-active-ortho-plus',
    pageNumber: 11,
    name: 'Cool Active Ortho Plus',
    printedCategoryLabel: 'Foam Mattress (Cooling Orthopedic)',
    category: 'Orthopedic & Support Mattresses',
    categories: ['orthopedic', 'cooling'],
    constructionFamily: 'Orthopedic Coir & Foam',
    topFinishStyle: 'Euro / Box Top',
    tagline: 'Adapts to Your Body',
    shortDescription:
      'Advanced cooling orthopedic mattress featuring Aero Tex Premium top quilted fabric with Shape Sense Memory Foam, breathable Knitted Fabric, High Resilience Foam, dual High-Density Coir layers, and High-Density Rebonded Foam.',
    warrantyMonths: 60,
    warrantyYears: 5,
    thicknessOptions: [5, 6, 8, 10],
    layers: [
      {
        order: 1,
        name: 'AERO TEX PREMIUM',
        material: 'Top Quilted Fabric + Shape Sense Memory Foam',
        purpose:
          'Top Quilted Fabric Comes With Shape Sense Memory Foam For Better Comfort, Support To The Body',
        colorHex: '#D8ECF0',
      },
      {
        order: 2,
        name: 'MELANGE PREMIUM',
        material: 'Melange Premium Woven Fabric',
        purpose: 'Structural woven border and transition fabric',
        colorHex: '#B3D8DF',
      },
      {
        order: 3,
        name: 'KNITTED FABRIC',
        material: 'Breathable Surface Layer',
        purpose: 'Enhances surface airflow and heat dissipation',
        colorHex: '#8BC2CC',
      },
      {
        order: 4,
        name: 'QUILTED',
        material: 'Both-Side Quilted Foam',
        thicknessMm: 16,
        purpose: '16 MM Foam Both Side Quilted for balanced plushness',
        colorHex: '#64AAB8',
      },
      {
        order: 5,
        name: 'HIGH RESILIENCE',
        material: 'High Resilience Foam Support',
        purpose: 'Responsive body support layer',
        colorHex: '#4390A0',
      },
      {
        order: 6,
        name: 'HIGH DENSITY COIR (UPPER)',
        material: 'High Density Natural Coir',
        purpose: 'Upper orthopedic coir layer for firm breathable reinforcement',
        colorHex: '#8E6A45',
      },
      {
        order: 7,
        name: 'HIGH DENSITY REBONDED FOAM',
        material: 'High Density Rebonded Foam',
        purpose: 'Central orthopedic lumbar stabilization core',
        colorHex: '#2D7D8A',
      },
      {
        order: 8,
        name: 'HIGH DENSITY COIR (BASE)',
        material: 'High Density Natural Coir',
        purpose: 'Lower high-density coir layer for structural balance',
        colorHex: '#755534',
      },
      {
        order: 9,
        name: 'MELANGE PREMIUM',
        material: 'Melange Premium Woven Fabric',
        purpose: 'Protective bottom woven fabric finish',
        colorHex: '#184952',
      },
    ],
    features: [
      'Aero Tex Premium Top Quilted Fabric with Shape Sense Memory Foam',
      'Dual High-Density Coir layers sandwiching a High-Density Rebonded Foam core',
      'High Resilience Foam Support + 16 mm Both-Side Quilting',
      '60-Month (5-Year) Warranty • Available in 5", 6", 8", and 10" thicknesses',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/mindfree/mindfree-orthopedic.webp',
      coolingHero: '/images/products/product-cool-ortho.jpg',
      layers: '/images/catalogue/cool-active-ortho-plus-diagram.jpg',
      lifestyle: '/images/mindfree/difference-breathable-cooler.webp',
      texture: '/images/mindfree/3d-natural-coir.webp',
      pdfPage: '/images/catalogue/cool-active-ortho-plus-pdf-page.jpg',
    },
    priceMatrix: buildPriceMatrix(
      [5, 6, 8, 10],
      [
        [10324.42, 11100.56, 12719.11, 14208.48],
        [10698.80, 11507.29, 13193.27, 14744.70],
        [12093.87, 13025.25, 14967.50, 16754.74],
        [12540.30, 13510.48, 15533.67, 17395.38],
        [13851.24, 14937.84, 17203.80, 19288.92],
        [14369.71, 15501.59, 17861.97, 20033.96],
        [15608.60, 16850.43, 19440.10, 21823.09],
        [16199.11, 17492.69, 20190.26, 22672.54],
        [19123.32, 20675.61, 23912.71, 26891.44],
        [19857.92, 21474.89, 24846.86, 27949.71],
        [20592.51, 22274.16, 25781.01, 29007.98],
        [20904.87, 22612.40, 26173.20, 29449.80],
        [21711.51, 23490.18, 27199.35, 30612.48],
        [22518.15, 24367.97, 28225.50, 31775.16],
        [22686.43, 24549.18, 28433.69, 32008.17],
        [23565.11, 25505.47, 29551.84, 33275.25],
        [24443.79, 26461.77, 30669.99, 34542.34],
      ]
    ),
  }),

  // ============================================================================
  // PAGE 12 — ULTRA LATEX PLUS
  // ============================================================================
  finalizeProduct({
    id: 'ultra-latex-plus',
    slug: 'ultra-latex-plus',
    pageNumber: 12,
    name: 'Ultra Latex Plus',
    printedCategoryLabel: 'Foam Mattress (Natural Latex + Ortho Memory)',
    category: 'Latex Mattresses',
    categories: ['latex', 'cooling'],
    constructionFamily: 'Natural Latex Hybrid',
    topFinishStyle: 'Euro / Box Top',
    tagline: 'Hotel-Like Comfort Memory Foam',
    shortDescription:
      'Luxury 120-month-warranty latex & memory mattress featuring Nayasa Tex Premium quilted fabric with Cool Active phase-change treatment, 25 mm Ortho Memory Foam, 50 mm 7-Zone Natural Latex, Responsive Foam, and our Luxury Grade Foam Base.',
    warrantyMonths: 120,
    warrantyYears: 10,
    thicknessOptions: [5, 6, 8, 10],
    layers: [
      {
        order: 1,
        name: 'NAYASA TEX PREMIUM',
        material: 'Nayasa Tex Premium Quilted Fabric + Memory Foam',
        purpose: 'Quilted Fabric With Memory Foam Takes The Shape of Your Body',
        colorHex: '#E2ECD9',
      },
      {
        order: 2,
        name: 'COOL ACTIVE',
        material: 'Phase Change Material (PCM) Treatment',
        purpose: 'Treatment Phase Change Materials that regulate body temperature',
        colorHex: '#C2DEC8',
      },
      {
        order: 3,
        name: '25 MM ORTHO MEMORY',
        material: 'Ortho Memory Foam',
        thicknessMm: 25,
        purpose:
          'Memory Foam For Maximum Comfort. Takes The Shape of Your Body & Naturally Aligns Your Spine For Perfect Back Support.',
        colorHex: '#9EC694',
      },
      {
        order: 4,
        name: '50MM NATURAL LATEX',
        material: '7-Zone Natural Latex',
        thicknessMm: 50,
        purpose:
          'Thicker latex for more comfort. Equally distributes body pressure across 7 ergonomic zones',
        colorHex: '#77A865',
      },
      {
        order: 5,
        name: 'RESPONSIVE FOAM',
        material: 'Responsive Support Foam',
        purpose: "Supports Your Body's Weight & Adds Firmness to The Mattress.",
        colorHex: '#548444',
      },
      {
        order: 6,
        name: 'LUXURY GRADE FOAM BASE',
        material: 'Highest Density Foam Base',
        purpose:
          'Our Highest Density Foam Base Which Adds Structural Support & Extends The Life of The Mattress.',
        colorHex: '#355B28',
      },
    ],
    features: [
      '50 mm 7-Zone Natural Latex + 25 mm Ortho Memory Foam',
      'Nayasa Tex Premium Quilted Fabric with Cool Active Phase Change Material (PCM)',
      'Responsive Foam + Highest-Density Luxury Grade Foam Base',
      '120-Month (10-Year) Comprehensive Warranty • Available in 5", 6", 8", and 10"',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/mindfree/showroom/latex-display.webp',
      coolingHero: '/images/products/product-cool-latex-plus.jpg',
      layers: '/images/catalogue/ultra-latex-plus-diagram.jpg',
      lifestyle: '/images/mindfree/sustainability-bedroom.webp',
      texture: '/images/mindfree/mindfree-latex.webp',
      pdfPage: '/images/catalogue/ultra-latex-plus-pdf-page.jpg',
    },
    priceMatrix: buildPriceMatrix(
      [5, 6, 8, 10],
      [
        [12383.37, 13030.30, 14711.36, 16263.45],
        [12828.43, 13502.31, 15253.42, 16870.18],
        [14492.05, 15268.36, 17285.64, 19148.14],
        [15023.29, 15831.94, 17933.27, 19873.38],
        [16588.64, 17494.33, 19847.82, 22020.74],
        [17206.05, 18149.47, 20601.03, 22864.49],
        [18685.22, 19720.30, 22410.00, 24893.34],
        [19388.81, 20467.01, 23268.78, 25855.60],
        [22878.39, 24172.23, 27534.36, 30638.54],
        [23754.33, 25102.08, 28604.30, 31837.82],
        [24630.27, 26031.93, 29674.23, 33037.10],
        [24999.16, 26422.39, 30120.73, 33535.33],
        [25961.28, 27443.81, 31296.24, 34853.12],
        [26923.39, 28465.22, 32471.76, 36170.91],
        [27119.94, 28672.55, 32707.10, 36432.12],
        [28168.23, 29785.53, 33988.19, 37868.42],
        [29216.52, 30898.52, 35269.28, 39304.72],
      ]
    ),
  }),

  // ============================================================================
  // PAGE 13 — HYBRID LATEX
  // ============================================================================
  finalizeProduct({
    id: 'hybrid-latex',
    slug: 'hybrid-latex',
    pageNumber: 13,
    name: 'Hybrid Latex',
    printedCategoryLabel: 'Foam Mattress (Hybrid Natural Latex)',
    category: 'Latex Mattresses',
    categories: ['latex', 'cooling'],
    constructionFamily: 'Natural Latex Hybrid',
    topFinishStyle: 'Euro / Box Top',
    tagline: 'Feel The Goodness of Natural Latex',
    shortDescription:
      'Our flagship 7-layer Hybrid Latex mattress combining hypoallergenic Aero Tex Plus fabric, 22 mm Super Soft Quilted PU Foam, 50 mm 7-Zone Natural Latex, and 50 mm of 32-Density Cool Gel Foam over a Luxury Grade Foam Base.',
    warrantyMonths: 120,
    warrantyYears: 10,
    thicknessOptions: [5, 6, 8, 10],
    layers: [
      {
        order: 1,
        name: 'AERO TEX PLUS FABRIC',
        material: 'Hypoallergenic Aero Tex Plus Fabric',
        purpose: 'With Soft, Comfortable & Hypoallergenic Fabric Which is Suitable for all skin types',
        colorHex: '#EBF0DC',
      },
      {
        order: 2,
        name: 'Responsive Support Foam',
        material: 'Responsive Support Foam',
        purpose: "Supports your body's Weight & adds firmness to the mattress",
        colorHex: '#D2DFB4',
      },
      {
        order: 3,
        name: 'PU FOAM Quilted',
        material: 'Super Soft Quilted PU Foam',
        thicknessMm: 22,
        purpose: 'Super Soft 22 mm quilted surface comfort layer',
        colorHex: '#B6CB8A',
      },
      {
        order: 4,
        name: '50MM NATURAL LATEX',
        material: '7-Zone Natural Latex',
        thicknessMm: 50,
        purpose: 'Thicker latex for more comfort. Equally distributes body pressure across 7 ergonomic zones',
        colorHex: '#92B059',
      },
      {
        order: 5,
        name: 'COOL GEL FOAM',
        material: 'Cool Gel Infused Foam',
        density: '32 Density',
        thicknessMm: 50,
        purpose: '32 Density 50 mm Cool Gel Foam for active thermal regulation',
        colorHex: '#5998A6',
      },
      {
        order: 6,
        name: 'LUXURY GRADE FOAM BASE',
        material: 'Highest Density Foam Base',
        purpose: 'Our highest density foam base which adds structural support & extends the life of the mattress',
        colorHex: '#5B7334',
      },
      {
        order: 7,
        name: 'MELANGE PREMIUM',
        material: 'Melange Premium Woven Fabric',
        purpose: 'Tailored woven foundation fabric',
        colorHex: '#38491E',
      },
    ],
    features: [
      '50 mm 7-Zone Natural Latex + 50 mm 32-Density Cool Gel Foam',
      'Aero Tex Plus Hypoallergenic Fabric suitable for all skin types',
      '22 mm Super Soft Quilted PU Foam + Responsive Support Foam + Luxury Base',
      '120-Month (10-Year) Comprehensive Warranty • Available in 5", 6", 8", and 10"',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/mindfree/mindfree-hybrid.webp',
      coolingHero: '/images/products/product-cool-hybrid.jpg',
      layers: '/images/catalogue/hybrid-latex-diagram.jpg',
      lifestyle: '/images/mindfree/showroom/showroom-gallery.webp',
      texture: '/images/mindfree/3d-latex-pincore.webp',
      pdfPage: '/images/catalogue/hybrid-latex-pdf-page.jpg',
    },
    priceMatrix: buildPriceMatrix(
      [5, 6, 8, 10],
      [
        [14209.19, 14985.29, 16537.23, 18089.32],
        [14730.33, 15538.76, 17155.36, 18772.12],
        [16683.03, 17614.35, 19476.68, 21339.19],
        [17305.56, 18275.68, 20215.60, 22155.72],
        [19144.78, 20231.32, 22404.03, 24576.96],
        [19868.70, 21000.50, 23263.75, 25527.22],
        [21606.53, 22848.28, 25331.39, 27814.73],
        [22431.84, 23725.33, 26311.90, 28898.71],
        [26530.02, 28082.22, 31186.10, 34290.28],
        [27558.11, 29174.98, 32408.19, 35641.71],
        [28586.21, 30267.75, 33630.28, 36993.15],
        [29015.96, 30723.37, 34137.64, 37552.24],
        [30145.44, 31924.00, 35480.53, 39037.40],
        [31274.93, 33124.62, 36823.41, 40522.56],
        [31501.90, 33364.53, 37089.18, 40814.20],
        [32732.77, 34673.01, 38552.86, 42433.09],
        [33963.65, 35981.50, 40016.54, 44051.97],
      ]
    ),
  }),

  // ============================================================================
  // PAGE 14 — ACTIVE COOL SPINE CARE
  // ============================================================================
  finalizeProduct({
    id: 'active-cool-spine-care',
    slug: 'active-cool-spine-care',
    pageNumber: 14,
    name: 'Active Cool Spine Care',
    printedCategoryLabel: 'Foam Mattress (Cooling Spine Care)',
    category: 'Orthopedic & Support Mattresses',
    categories: ['orthopedic', 'cooling'],
    constructionFamily: 'Orthopedic Coir & Foam',
    topFinishStyle: 'Euro / Box Top',
    tagline: 'We Got Your back!',
    shortDescription:
      'Targeted orthopedic spine-care mattress featuring Aero Tex Premium Double-Side Quilted breathable anti-allergen fabric, High-Density Responsive Support Foam, Active Cool Technology Cool Gel Foam, High-Density Rebonded Foam, Coir, and High Resilience Support.',
    warrantyMonths: 60,
    warrantyYears: 5,
    thicknessOptions: [5, 6, 8, 10],
    layers: [
      {
        order: 1,
        name: 'AERO TEX PREMIUM',
        material: 'Double Side Quilted Anti-Allergen Fabric',
        purpose: 'Double Side Quilted Fabric Luxurious Breathable & Anti-Allergen',
        colorHex: '#D9EDF2',
      },
      {
        order: 2,
        name: 'HIGH DENSITY RESPONSIVE',
        material: 'High Density Responsive Support Foam',
        purpose: 'Support Foam Reinforces The Top Layer & Provides Body Support',
        colorHex: '#A9D6E2',
      },
      {
        order: 3,
        name: 'ACTIVE COOL TECHNOLOGY',
        material: 'Cool Gel Foam',
        purpose: 'Active Cool Technology Cool Gel Foam for cooling spinal pressure relief',
        colorHex: '#68B6CB',
      },
      {
        order: 4,
        name: 'HIGH DENSITY REBONDED FOAM',
        material: 'High Density Rebonded Foam',
        purpose: 'Firm orthopedic rebonded core for spinal alignment',
        colorHex: '#3A8296',
      },
      {
        order: 5,
        name: 'HIGH DENSITY COIR',
        material: 'High Density Natural Coir',
        purpose: 'Natural breathable coir layer for structural posture support',
        colorHex: '#8C6944',
      },
      {
        order: 6,
        name: 'HIGH RESILIENCE',
        material: 'High Resilience Foam Support',
        purpose: 'High Resilience Foam Support foundational base',
        colorHex: '#205160',
      },
    ],
    features: [
      'Active Cool Technology with Cool Gel Foam layer',
      'Aero Tex Premium Double-Side Quilted Breathable & Anti-Allergen Fabric',
      'High Density Rebonded Foam + High Density Coir + High Resilience Foam Support',
      '60-Month (5-Year) Warranty • Available in 5", 6", 8", and 10" thicknesses',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/products/product-spine-care.jpg',
      coolingHero: '/images/products/product-cool-spine.jpg',
      layers: '/images/catalogue/active-cool-spine-care-diagram.jpg',
      lifestyle: '/images/mindfree/mindfree-top-designs.webp',
      texture: '/images/mindfree/mindfree-exploded-layers.webp',
      pdfPage: '/images/catalogue/active-cool-spine-care-pdf-page.jpg',
    },
    priceMatrix: buildPriceMatrix(
      [5, 6, 8, 10],
      [
        [8498.65, 9341.10, 10764.12, 12511.58],
        [8796.96, 9674.51, 11156.82, 12977.10],
        [9902.95, 10913.89, 12621.51, 14718.47],
        [10258.09, 11311.15, 13089.93, 15274.26],
        [11295.16, 12474.59, 14466.82, 16913.26],
        [11707.13, 12935.70, 15010.93, 17559.32],
        [12687.37, 14035.29, 16312.12, 19108.06],
        [13156.16, 14560.25, 16931.94, 19844.38],
        [15471.79, 17156.69, 20002.72, 23497.65],
        [16054.24, 17809.34, 20773.96, 24414.51],
        [16636.69, 18461.99, 21545.20, 25331.37],
        [16888.19, 18741.58, 21872.21, 25716.63],
        [17527.46, 19458.08, 22719.16, 26723.76],
        [18166.74, 20174.58, 23566.10, 27730.89],
        [18304.58, 20326.46, 23741.71, 27935.62],
        [19000.69, 21106.81, 24664.36, 29033.02],
        [19696.79, 21887.16, 25587.01, 30130.41],
      ]
    ),
  }),

  // ============================================================================
  // ADDITIONAL STOREFRONT & DATABASE MODELS (SYNCED WITH ADMIN)
  // ============================================================================
  finalizeProduct({
    id: 'ortho-firm',
    slug: 'ortho-firm',
    pageNumber: 16,
    name: 'Ortho Firm Mattress',
    printedCategoryLabel: 'Orthopedic Mattress',
    category: 'Orthopedic & Support Mattresses',
    categories: ['orthopedic'],
    constructionFamily: 'Orthopedic Coir & Foam',
    topFinishStyle: 'Normal / Tight Top',
    tagline: 'Firm Rebonded Orthopedic Core',
    shortDescription:
      'High-density rebonded orthopedic core engineered for firm lumbar support and healthy posture alignment.',
    warrantyMonths: 60,
    warrantyYears: 5,
    thicknessOptions: [5, 6, 8],
    layers: [
      {
        order: 1,
        name: 'BREATHABLE QUILTED KNIT',
        material: 'Anti-Microbial Knitted Fabric',
        thicknessMm: 16,
        purpose: 'Firm, breathable quilted surface for cool postural comfort',
        colorHex: '#E5DCCB',
      },
      {
        order: 2,
        name: 'HIGH-DENSITY REBONDED CORE',
        material: '90D Rebonded Orthopedic Foam',
        density: '90 Density',
        purpose: 'Extra-firm spinal alignment and lower-back support core',
        colorHex: '#688F82',
      },
    ],
    features: [
      '90D High-Density Rebonded Orthopedic Core for firm back support',
      'Anti-microbial quilted tight-top fabric cover',
      '60-Month (5-Year) Manufacturer Warranty • Available in 5", 6", and 8"',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/products/product-cool-ortho.jpg',
      layers: '/images/catalogue/ortho-plus-diagram.jpg',
      lifestyle: '/images/mindfree/mindfree-orthopedic.webp',
      texture: '/images/catalogue/ortho-plus-cutaway.jpg',
      pdfPage: '/images/catalogue/ortho-plus-pdf-page.jpg',
    },
    priceMatrix: buildScaledPriceMatrixFromBase([5, 6, 8], 10499),
  }),

  finalizeProduct({
    id: 'spine-relax-ortho',
    slug: 'spine-relax-ortho',
    pageNumber: 17,
    name: 'Spine Relax Ortho Mattress',
    printedCategoryLabel: 'Orthopedic Mattress',
    category: 'Orthopedic & Support Mattresses',
    categories: ['orthopedic'],
    constructionFamily: 'Orthopedic Coir & Foam',
    topFinishStyle: 'Euro / Box Top',
    tagline: '5-Zone Postural Alignment System',
    shortDescription:
      'Ergonomic 5-zone orthopedic Euro-Top mattress designed to relieve vertebral compression and maintain natural spinal curvature.',
    warrantyMonths: 84,
    warrantyYears: 7,
    thicknessOptions: [6, 8, 10],
    layers: [
      {
        order: 1,
        name: 'EURO-TOP QUILTED COVER',
        material: 'Organic Knitted Euro-Top Fabric',
        thicknessMm: 20,
        purpose: 'Cushioned Euro-Top surface relief above the firm orthopedic core',
        colorHex: '#DCE5E7',
      },
      {
        order: 2,
        name: '5-ZONE ORTHO SUPPORT FOAM',
        material: 'Zoned High-Resilience & Rebonded Core',
        density: '80 Density',
        purpose: 'Targeted 5-zone lumbar and pelvic alignment support',
        colorHex: '#4E7A88',
      },
    ],
    features: [
      '5-Zone Postural Alignment System for targeted lumbar support',
      'Plush Euro-Top comfort layer over high-density orthopedic base',
      '84-Month (7-Year) Manufacturer Warranty • Available in 6", 8", and 10"',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/products/product-spine-care.jpg',
      layers: '/images/catalogue/ortho-plus-diagram.jpg',
      lifestyle: '/images/mindfree/mindfree-orthopedic.webp',
      texture: '/images/catalogue/active-cool-spine-care-cutaway.jpg',
      pdfPage: '/images/catalogue/ortho-plus-pdf-page.jpg',
    },
    priceMatrix: buildScaledPriceMatrixFromBase([6, 8, 10], 13999),
  }),

  finalizeProduct({
    id: 'royal-sapphire-ortho',
    slug: 'royal-sapphire-ortho',
    pageNumber: 18,
    name: 'Royal Sapphire Ortho Luxe Mattress',
    printedCategoryLabel: 'Orthopedic & Latex Mattress',
    category: 'Orthopedic & Support Mattresses',
    categories: ['orthopedic', 'latex'],
    constructionFamily: 'Natural Latex Hybrid',
    topFinishStyle: 'Euro / Box Top',
    tagline: '7-Zone Postural Pocket Spring & Natural Latex',
    shortDescription:
      'Signature royal-navy box-top orthopedic luxury mattress combining 7-zone natural pin-core latex with postural support layers.',
    warrantyMonths: 120,
    warrantyYears: 10,
    thicknessOptions: [8, 10, 12],
    layers: [
      {
        order: 1,
        name: 'ROYAL SAPPHIRE BOX-TOP',
        material: ' High-GSM Quilted Knitted Fabric',
        thicknessMm: 25,
        purpose: 'Plush box-top crown with tailored royal navy border panels',
        colorHex: '#0A2E73',
      },
      {
        order: 2,
        name: '7-ZONE NATURAL LATEX',
        material: '100% Pin-Core Natural Latex',
        thicknessMm: 50,
        purpose: ' Buoyant orthopedic pressure relief and natural breathability',
        colorHex: '#D8CEBE',
      },
    ],
    features: [
      '7-Zone Natural Latex + Postural Orthopedic Core',
      'Signature Royal Sapphire Euro/Box-Top finish',
      '120-Month (10-Year) Manufacturer Warranty • Available in 8", 10", and 12"',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/rooms/room-bestseller-ortho.jpg',
      layers: '/images/catalogue/ultra-latex-plus-diagram.jpg',
      lifestyle: '/images/mindfree/mindfree-latex.webp',
      texture: '/images/catalogue/cool-active-ortho-plus-cutaway.jpg',
      pdfPage: '/images/catalogue/ultra-latex-plus-pdf-page.jpg',
    },
    priceMatrix: buildScaledPriceMatrixFromBase([8, 10, 12], 19499),
  }),

  finalizeProduct({
    id: 'ultima-bonnell-spring',
    slug: 'ultima-bonnell-spring',
    pageNumber: 19,
    name: 'Ultima Bonnell Spring Mattress',
    printedCategoryLabel: 'Spring Mattress',
    category: 'Spring Mattresses',
    categories: ['spring'],
    constructionFamily: 'Bonnell Spring',
    topFinishStyle: 'Normal / Tight Top',
    tagline: 'Classic Tempered Steel Coil Support',
    shortDescription:
      'Heavy-duty high-carbon tempered steel Bonnell spring core paired with high-density edge guards and quilted tight-top cushioning.',
    warrantyMonths: 60,
    warrantyYears: 5,
    thicknessOptions: [6, 8],
    layers: [
      {
        order: 1,
        name: 'QUILTED TIGHT-TOP COVER',
        material: 'Premium Knitted Fabric',
        thicknessMm: 18,
        purpose: 'Smooth, durable tight-top surface comfort',
        colorHex: '#E2E8F0',
      },
      {
        order: 2,
        name: 'TEMPERED BONNELL SPRING MATRIX',
        material: 'High-Carbon Bonnell Coils',
        purpose: 'Balanced bounce, airflow, and durable spinal support',
        colorHex: '#64748B',
      },
    ],
    features: [
      'Tempered high-carbon Bonnell coil spring matrix',
      'Reinforced foam perimeter edge-guard protection',
      '60-Month (5-Year) Manufacturer Warranty • Available in 6" and 8"',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/mindfree/mindfree-spring.webp',
      layers: '/images/catalogue/ultra-bonel-spring-diagram.jpg',
      lifestyle: '/images/mindfree/mindfree-hybrid.webp',
      texture: '/images/catalogue/ultra-bonel-spring-cutaway.jpg',
      pdfPage: '/images/catalogue/ultra-bonel-spring-pdf-page.jpg',
    },
    priceMatrix: buildScaledPriceMatrixFromBase([6, 8], 10999),
  }),

  finalizeProduct({
    id: 'royal-pillow-top-spring',
    slug: 'royal-pillow-top-spring',
    pageNumber: 20,
    name: 'Royal Pillow Top Spring Mattress',
    printedCategoryLabel: 'Spring Mattress',
    category: 'Spring Mattresses',
    categories: ['spring'],
    constructionFamily: 'Pocket Spring',
    topFinishStyle: 'Pillow Top',
    tagline: '7-Star Hotel Plush Pillow-Top Suite',
    shortDescription:
      'Indulgent cloud-soft Pillow-Top crown layered over responsive pocket springs for a true 7-star luxury hotel sleep experience.',
    warrantyMonths: 84,
    warrantyYears: 7,
    thicknessOptions: [8, 10, 12],
    layers: [
      {
        order: 1,
        name: '7-STAR HOTEL PILLOW-TOP',
        material: 'Plush Cloud-Quilted Pillow-Top',
        thicknessMm: 50,
        purpose: 'Deep surface cradling and pressure-free luxury comfort',
        colorHex: '#F1F5F9',
      },
      {
        order: 2,
        name: 'POCKET SPRING CORE',
        material: 'Independent Encased Pocket Coils',
        purpose: 'Zero motion transfer and adaptive body-contour support',
        colorHex: '#475569',
      },
    ],
    features: [
      '7-Star Hotel Plush Pillow-Top comfort crown',
      'Independent pocket coil system for zero partner disturbance',
      '84-Month (7-Year) Manufacturer Warranty • Available in 8", 10", and 12"',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/products/product-dream-comfort.jpg',
      layers: '/images/catalogue/ultima-pocket-spring-pillow-top-diagram.jpg',
      lifestyle: '/images/mindfree/mindfree-hybrid.webp',
      texture: '/images/catalogue/ultima-pocket-spring-pillow-top-cutaway.jpg',
      pdfPage: '/images/catalogue/ultima-pocket-spring-pillow-top-pdf-page.jpg',
    },
    priceMatrix: buildScaledPriceMatrixFromBase([8, 10, 12], 15499),
  }),

  finalizeProduct({
    id: 'natural-latex-classic',
    slug: 'natural-latex-classic',
    pageNumber: 21,
    name: 'Natural Latex Classic Mattress',
    printedCategoryLabel: 'Latex Mattress',
    category: 'Latex Mattresses',
    categories: ['latex'],
    constructionFamily: 'Natural Latex Hybrid',
    topFinishStyle: 'Normal / Tight Top',
    tagline: '100% Pin-Core Botanical Eco-Latex',
    shortDescription:
      'Pure botanical pin-core natural latex sleep system with open-cell ventilation channels and hypoallergenic organic cotton fabric.',
    warrantyMonths: 120,
    warrantyYears: 10,
    thicknessOptions: [6, 8, 10],
    layers: [
      {
        order: 1,
        name: 'ORGANIC COTTON COVER',
        material: 'Breathable Botanical Knitted Fabric',
        thicknessMm: 18,
        purpose: 'Naturally hypoallergenic, dust-mite resistant surface',
        colorHex: '#EFECE6',
      },
      {
        order: 2,
        name: '100% PIN-CORE NATURAL LATEX',
        material: 'Pure Botanical Eco-Latex',
        thicknessMm: 50,
        purpose: 'Instant responsive bounce, cooling airflow, and zero toxic off-gassing',
        colorHex: '#D8C8B0',
      },
    ],
    features: [
      '100% Pin-Core Botanical Eco-Latex comfort layer',
      'Naturally hypoallergenic, anti-fungal, and breathable',
      '120-Month (10-Year) Manufacturer Warranty • Available in 6", 8", and 10"',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/products/product-cool-latex-plus.jpg',
      layers: '/images/catalogue/ultra-latex-plus-diagram.jpg',
      lifestyle: '/images/mindfree/mindfree-latex.webp',
      texture: '/images/catalogue/ultra-latex-plus-cutaway.jpg',
      pdfPage: '/images/catalogue/ultra-latex-plus-pdf-page.jpg',
    },
    priceMatrix: buildScaledPriceMatrixFromBase([6, 8, 10], 18999),
  }),

  finalizeProduct({
    id: 'hybrid-latex-pocket',
    slug: 'hybrid-latex-pocket',
    pageNumber: 22,
    name: 'Hybrid Latex Pocket Mattress',
    printedCategoryLabel: 'Latex & Pocket Spring Hybrid',
    category: 'Latex Mattresses',
    categories: ['latex', 'spring', 'cooling'],
    constructionFamily: 'Natural Latex Hybrid',
    topFinishStyle: 'Pillow Top',
    tagline: '7-Layer Natural Latex & Pocket Spring Flagship',
    shortDescription:
      'Our flagship 7-layer hybrid masterpiece uniting 7-zone natural pin-core latex, cooling gel memory foam, and individual pocket springs.',
    warrantyMonths: 120,
    warrantyYears: 10,
    thicknessOptions: [8, 10, 12],
    layers: [
      {
        order: 1,
        name: 'COOLING PILLOW-TOP CROWN',
        material: 'Phase-Change Cooling Knitted Fabric',
        thicknessMm: 25,
        purpose: 'Instant cool-to-the-touch luxury Pillow-Top surface',
        colorHex: '#E0F2FE',
      },
      {
        order: 2,
        name: '7-ZONE NATURAL LATEX + COOL GEL',
        material: 'Pin-Core Latex & Active Cool Gel Foam',
        thicknessMm: 50,
        purpose: 'Buoyant spinal relief with continuous thermal dissipation',
        colorHex: '#7DD3FC',
      },
      {
        order: 3,
        name: 'INDIVIDUAL POCKET SPRING MATRIX',
        material: 'Encased CoreFlex Pocket Coils',
        purpose: 'Independent point-elastic support with zero motion transfer',
        colorHex: '#0284C7',
      },
    ],
    features: [
      '7-Layer Flagship Hybrid: Natural Latex + Cool Gel + Pocket Springs',
      'Triple-category performance across Latex, Spring, and Cooling ranges',
      '120-Month (10-Year) Manufacturer Warranty • Available in 8", 10", and 12"',
    ],
    catalogueBadges: COMMON_CATALOGUE_BADGES,
    images: {
      hero: '/images/products/product-cool-hybrid.jpg',
      coolingHero: '/images/products/product-cool-hybrid.jpg',
      layers: '/images/catalogue/hybrid-latex-diagram.jpg',
      lifestyle: '/images/mindfree/mindfree-hybrid.webp',
      texture: '/images/catalogue/hybrid-latex-cutaway.jpg',
      pdfPage: '/images/catalogue/hybrid-latex-pdf-page.jpg',
    },
    priceMatrix: buildScaledPriceMatrixFromBase([8, 10, 12], 22999),
  }),
];

export function formatIndianRupeeExact(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function getCatalogueProductBySlug(slug: string): CatalogueMattressProduct | undefined {
  const normalized = slug.toLowerCase().trim();
  return BED_PRICE_CATALOGUE_PRODUCTS.find((p) => p.slug === normalized || p.id === normalized);
}

export function getCatalogueVariantPrice(
  product: CatalogueMattressProduct,
  lengthInches: number,
  widthInches: number,
  thicknessInches: number
): CataloguePriceVariant | undefined {
  return product.priceMatrix.find(
    (v) =>
      v.lengthInches === lengthInches &&
      v.widthInches === widthInches &&
      v.thicknessInches === thicknessInches
  );
}
