export interface ProductSizeOption {
  id: 'single' | 'double' | 'queen' | 'king';
  label: string;
  dimensionsInches: string;
  dimensionsCm: string;
  price: number;
  originalPrice: number;
  sku: string;
  isPopular?: boolean;
}

export interface ProductThicknessOption {
  id: '8-inch' | '10-inch' | '12-inch';
  label: string;
  priceDelta: number;
  description: string;
}

export interface ProductGalleryItem {
  id: string;
  url: string;
  alt: string;
  label: string;
  type: 'perspective' | 'macro' | 'edge' | 'lifestyle' | 'cutaway';
}

export interface ProductLayerSpec {
  number: string;
  name: string;
  thickness: string;
  density: string;
  description: string;
  image: string;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verifiedBuyer: boolean;
  helpfulCount: number;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface MattressProductDetail {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  badge: string;
  doctorRecommended?: boolean;
  category: string;
  rating: number;
  reviewsCount: number;
  summary: string;
  keyBenefits: string[];
  firmnessScore: number; // 1 to 10
  firmnessLabel: string;
  firmnessDescription: string;
  idealSleepers: string[];
  sizes: ProductSizeOption[];
  thicknessOptions: ProductThicknessOption[];
  gallery: ProductGalleryItem[];
  layers: ProductLayerSpec[];
  specifications: {
    coreSupport: string;
    comfortLayer: string;
    coverFabric: string;
    breathability: string;
    motionIsolation: string;
    warranty: string;
    trial: string;
    shipping: string;
  };
  careInstructions: string[];
  faqs: ProductFAQ[];
  reviews: ProductReview[];
}

export const MATTRESS_PRODUCTS: Record<string, MattressProductDetail> = {
  orthopedic: {
    id: 'orthopedic',
    slug: 'orthopedic',
    name: 'Mindfree Ortho-Spine Luxury Mattress',
    tagline: 'Precision 7-Zone Spinal Alignment & Postural Care',
    badge: 'Doctor Recommended',
    doctorRecommended: true,
    category: 'Orthopedic Collection',
    rating: 4.9,
    reviewsCount: 1420,
    summary:
      'Engineered in collaboration with orthopedic sleep posture specialists, this multi-density system pairs high-resilience EP transition foam with targeted lumbar reinforcement to gently decompress the lower back and relieve pressure points.',
    keyBenefits: [
      '7-Zone ergonomic spinal contouring',
      'High-resilience EP posture core',
      'Breathable Belgian Damask quilted knit',
      'Zero partner motion disturbance',
      'Reinforced perimeter edge support',
    ],
    firmnessScore: 7.5,
    firmnessLabel: 'Medium-Firm (7.5 / 10)',
    firmnessDescription:
      'Provides firm, structured lumbar pushback while offering a soft, pressure-relieving surface cushion for comfortable side and back sleep.',
    idealSleepers: [
      'Back Sleepers',
      'Stomach Sleepers',
      'Individuals with chronic lumbar stiffness',
      'Active adults needing posture recovery',
    ],
    sizes: [
      {
        id: 'single',
        label: 'Single',
        dimensionsInches: '72" × 36"',
        dimensionsCm: '183 × 91 cm',
        price: 14999,
        originalPrice: 19999,
        sku: 'MF-OS-SN01',
      },
      {
        id: 'double',
        label: 'Double',
        dimensionsInches: '72" × 48"',
        dimensionsCm: '183 × 122 cm',
        price: 19499,
        originalPrice: 24999,
        sku: 'MF-OS-DB02',
      },
      {
        id: 'queen',
        label: 'Queen',
        dimensionsInches: '78" × 60"',
        dimensionsCm: '198 × 152 cm',
        price: 24999,
        originalPrice: 32999,
        sku: 'MF-OS-QN03',
        isPopular: true,
      },
      {
        id: 'king',
        label: 'King',
        dimensionsInches: '78" × 72"',
        dimensionsCm: '198 × 183 cm',
        price: 29999,
        originalPrice: 39999,
        sku: 'MF-OS-KG04',
      },
    ],
    thicknessOptions: [
      {
        id: '8-inch',
        label: '8 Inch (20 cm)',
        priceDelta: 0,
        description: 'Standard ergonomic height with balanced orthopedic support.',
      },
      {
        id: '10-inch',
        label: '10 Inch (25 cm)',
        priceDelta: 3500,
        description: 'Deep pillowtop comfort layer with enhanced plush contouring.',
      },
      {
        id: '12-inch',
        label: '12 Inch (30 cm)',
        priceDelta: 6500,
        description: 'Presidential ultra-plush euro top with dual-zone micro-cushioning.',
      },
    ],
    gallery: [
      {
        id: 'ortho-main',
        url: '/images/mindfree/mindfree-orthopedic.webp',
        alt: 'Mindfree Orthopedic Mattress studio perspective',
        label: 'Full Perspective',
        type: 'perspective',
      },
      {
        id: 'ortho-macro',
        url: '/images/mindfree/mindfree-orthopedic-detail1.webp',
        alt: 'Belgian damask tufted quilt fabric macro detail',
        label: 'Quilted Jacquard Weave',
        type: 'macro',
      },
      {
        id: 'ortho-edge',
        url: '/images/mindfree/mindfree-orthopedic-detail2.webp',
        alt: 'Double-piped edge border and side handle detail',
        label: 'Reinforced Border Profile',
        type: 'edge',
      },
      {
        id: 'ortho-lifestyle',
        url: '/images/mindfree/final-cta-bedroom.webp',
        alt: 'Mindfree mattress in luxury boutique bedroom setting',
        label: 'Master Suite Setting',
        type: 'lifestyle',
      },
      {
        id: 'ortho-cutaway',
        url: '/images/mindfree/mindfree-exploded-layers.webp',
        alt: 'Internal 7-layer orthopedic mattress construction',
        label: 'Architectural Layer Cutaway',
        type: 'cutaway',
      },
    ],
    layers: [
      {
        number: '01',
        name: 'Belgian Damask Silk-Blend Knit',
        thickness: '3.5 cm',
        density: '480 GSM',
        description:
          'Breathable jacquard cover infused with moisture-dispersing silk microfibers, creating a silky soft, hypoallergenic sleep surface.',
        image: '/images/mindfree/craft-fabrics.webp',
      },
      {
        number: '02',
        name: 'High-Resilience Aerated EP Foam',
        thickness: '4.5 cm',
        density: '55 kg/m³',
        description:
          'Targeted pressure-distribution foam that gently absorbs shoulder and hip impact, keeping the spine naturally level.',
        image: '/images/mindfree/3d-ep-foam.webp',
      },
      {
        number: '03',
        name: 'Ortho-Bonded Transition Core',
        thickness: '6.0 cm',
        density: '85 kg/m³',
        description:
          'High-density structural core that prevents sagging and maintains optimal lumbar support throughout the night.',
        image: '/images/mindfree/craft-durable.webp',
      },
      {
        number: '04',
        name: 'Organic Coir Insulator Shield',
        thickness: '3.0 cm',
        density: '1100 GSM',
        description:
          'Natural coconut husk fiber mat providing continuous ventilation, thermal cooling, and foundation stability.',
        image: '/images/mindfree/3d-natural-coir.webp',
      },
      {
        number: '05',
        name: 'Anti-Skid Base Fabric',
        thickness: '1.0 cm',
        density: '260 GSM',
        description:
          'Durable woven grip foundation that locks the mattress firmly onto slatted bases or box platforms without shifting.',
        image: '/images/mindfree/mindfree-orthopedic-detail2.webp',
      },
    ],
    specifications: {
      coreSupport: 'High-Density EP Orthopedic Core + Bonded Reinforcement',
      comfortLayer: 'Hypoallergenic Adaptive Cushioning with 480 GSM Jacquard',
      coverFabric: 'Belgian Damask with Silk & Silver Thread Weave',
      breathability: 'High-Ventilation Open Pore Construction',
      motionIsolation: '98% Absorptive Zero Motion Transfer',
      warranty: '10 Years Comprehensive Replacement Warranty',
      trial: '100 Nights In-Home Risk-Free Trial',
      shipping: 'Complimentary White-Glove Room Delivery & Setup',
    },
    careInstructions: [
      'Rotate the mattress head-to-toe 180° every 3 to 6 months for even wear.',
      'Use a waterproof, breathable mattress protector to preserve warranty validity.',
      'Clean fabric surfaces with a soft damp cloth using mild organic upholstery soap; do not saturate.',
      'Allow adequate airflow by placing on a rigid slatted base with gap spacing under 3 inches.',
    ],
    faqs: [
      {
        question: 'How does the Ortho-Spine mattress relieve lower back pain?',
        answer:
          'The mattress utilizes calibrated 7-zone density zones. The heavier hip area receives firm pushback from the high-resilience EP core, while shoulders and legs sink just enough to maintain the natural S-curve of the human spine.',
      },
      {
        question: 'What is included in the 100-Night In-Home Trial?',
        answer:
          'You have 100 full nights to experience the mattress in your home. If you are not completely satisfied after an initial 30-night adjustment period, we will arrange a complimentary pickup and 100% refund with zero restocking charges.',
      },
      {
        question: 'Does this mattress work on my existing bed frame?',
        answer:
          'Yes. The Mindfree Ortho-Spine is engineered to perform seamlessly on platform frames, slatted bed bases, box springs, and flat wooden cots.',
      },
      {
        question: 'How does White-Glove delivery work?',
        answer:
          'Our delivery specialists will bring the mattress directly to your bedroom of choice, unpack it, place it onto your frame, and take away all protective packaging for recycling.',
      },
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Dr. Siddharth Menon',
        location: 'Bengaluru, Karnataka',
        rating: 5,
        date: '14 Oct 2025',
        title: 'Outstanding spinal alignment and morning relief',
        content:
          'As a practicing orthopedic specialist, I frequently see patients with lower back discomfort from unsupported mattresses. I purchased the Ortho-Spine Queen for my own master bedroom. The balanced firm pushback through the sacral region is genuinely remarkable.',
        verifiedBuyer: true,
        helpfulCount: 42,
      },
      {
        id: 'rev-2',
        author: 'Pooja Raghavan',
        location: 'Mumbai, Maharashtra',
        rating: 5,
        date: '28 Nov 2025',
        title: 'Best investment in sleep we have ever made',
        content:
          'Switched from a memory foam mattress that gave me hip aches. The Mindfree Ortho is wonderfully supportive without feeling like a hard rock. The Belgian damask cover is unbelievably plush to the touch.',
        verifiedBuyer: true,
        helpfulCount: 29,
      },
      {
        id: 'rev-3',
        author: 'Amitabh Sen',
        location: 'Gurugram, NCR',
        rating: 5,
        date: '12 Jan 2026',
        title: 'Zero motion transfer and stays cool all night',
        content:
          'My wife is a restless sleeper who tosses frequently. On our previous mattress, the whole bed would shake. On this Mindfree, I literally feel nothing when she moves. Exceptional build quality.',
        verifiedBuyer: true,
        helpfulCount: 18,
      },
    ],
  },

  'memory-foam': {
    id: 'memory-foam',
    slug: 'memory-foam',
    name: 'Mindfree Zero-Gravity Cloud Memory Foam',
    tagline: 'Adaptive Pressure Relief with Open-Cell Thermoregulation',
    badge: 'Pressure Relief',
    category: 'Memory Foam Collection',
    rating: 4.9,
    reviewsCount: 980,
    summary:
      'Immerse yourself into buoyant, weightless comfort. High-density visco-elastic memory foam contours precisely to your curves, eliminating pressure points on hips and shoulders while gel beads actively disperse body warmth.',
    keyBenefits: [
      'Visco-elastic zero-gravity weightless feel',
      'Air-cool open-cell gel infusion',
      'Adaptive contouring for side & combination sleepers',
      'Complete motion isolation across sleep zones',
      'Oeko-Tex Standard 100 certified non-toxic foams',
    ],
    firmnessScore: 6.0,
    firmnessLabel: 'Plush-Medium (6.0 / 10)',
    firmnessDescription:
      'A deeply cushioned cloud feel that cradles pressure points without the sensation of being stuck or sinking too deep.',
    idealSleepers: [
      'Side Sleepers',
      'Light Sleepers',
      'Individuals with joint tenderness',
      'Couples with different sleep schedules',
    ],
    sizes: [
      {
        id: 'single',
        label: 'Single',
        dimensionsInches: '72" × 36"',
        dimensionsCm: '183 × 91 cm',
        price: 12499,
        originalPrice: 17499,
        sku: 'MF-MF-SN01',
      },
      {
        id: 'double',
        label: 'Double',
        dimensionsInches: '72" × 48"',
        dimensionsCm: '183 × 122 cm',
        price: 16999,
        originalPrice: 22499,
        sku: 'MF-MF-DB02',
      },
      {
        id: 'queen',
        label: 'Queen',
        dimensionsInches: '78" × 60"',
        dimensionsCm: '198 × 152 cm',
        price: 21999,
        originalPrice: 28999,
        sku: 'MF-MF-QN03',
        isPopular: true,
      },
      {
        id: 'king',
        label: 'King',
        dimensionsInches: '78" × 72"',
        dimensionsCm: '198 × 183 cm',
        price: 26999,
        originalPrice: 35999,
        sku: 'MF-MF-KG04',
      },
    ],
    thicknessOptions: [
      {
        id: '8-inch',
        label: '8 Inch (20 cm)',
        priceDelta: 0,
        description: 'Standard profile with balanced memory contouring.',
      },
      {
        id: '10-inch',
        label: '10 Inch (25 cm)',
        priceDelta: 3200,
        description: 'Extra plush cooling gel memory top layer.',
      },
      {
        id: '12-inch',
        label: '12 Inch (30 cm)',
        priceDelta: 5800,
        description: 'Maximal luxury cloud depth with dual-zone transition foam.',
      },
    ],
    gallery: [
      {
        id: 'mf-main',
        url: '/images/mindfree/mindfree-memory-foam.webp',
        alt: 'Mindfree Memory Foam Mattress studio perspective',
        label: 'Full Perspective',
        type: 'perspective',
      },
      {
        id: 'mf-macro',
        url: '/images/mindfree/mindfree-memory-foam-detail1.webp',
        alt: 'Memory foam plush quilted cover texture',
        label: 'Cooling Knit Surface',
        type: 'macro',
      },
      {
        id: 'mf-edge',
        url: '/images/mindfree/mindfree-memory-foam-detail2.webp',
        alt: 'Hand-tailored edge piping detail',
        label: 'Piped Side Profile',
        type: 'edge',
      },
      {
        id: 'mf-lifestyle',
        url: '/images/mindfree/craftsmanship-bedroom.webp',
        alt: 'Memory foam mattress in architectural bedroom suite',
        label: 'Atmospheric Bedroom Suite',
        type: 'lifestyle',
      },
      {
        id: 'mf-cutaway',
        url: '/images/mindfree/mindfree-exploded-layers.webp',
        alt: 'Internal cooling memory foam construction',
        label: 'Memory Layer Cutaway',
        type: 'cutaway',
      },
    ],
    layers: [
      {
        number: '01',
        name: 'Cool-Breeze Belgian Damask Cover',
        thickness: '3.0 cm',
        density: '450 GSM',
        description: 'Cooling-fiber knit that draws away excess surface heat for uninterrupted rest.',
        image: '/images/mindfree/craft-fabrics.webp',
      },
      {
        number: '02',
        name: 'Thermoregulating Gel Memory Foam',
        thickness: '5.0 cm',
        density: '60 kg/m³',
        description: 'Ultra-adaptive memory foam infused with microscopic gel capsules that contour to pressure points.',
        image: '/images/mindfree/3d-ep-foam.webp',
      },
      {
        number: '03',
        name: 'High-Resilience Transition Foam',
        thickness: '5.0 cm',
        density: '45 kg/m³',
        description: 'Prevents excessive sinking and delivers gentle upward buoyant pushback.',
        image: '/images/mindfree/craft-durable.webp',
      },
      {
        number: '04',
        name: 'High-Density Ortho Base Core',
        thickness: '10.0 cm',
        density: '75 kg/m³',
        description: 'Robust foundation ensuring permanent shape retention and long-term durability.',
        image: '/images/mindfree/mindfree-memory-foam-detail2.webp',
      },
    ],
    specifications: {
      coreSupport: 'Ultra-Dense Resilient Base Foam',
      comfortLayer: 'Gel-Infused Open-Cell Visco Memory Foam',
      coverFabric: 'Cool-Touch Belgian Jacquard with Silver Filaments',
      breathability: 'Thermoregulated Micro-Channel Airflow',
      motionIsolation: '100% Complete Kinetic Decoupling',
      warranty: '10 Years Comprehensive Replacement Warranty',
      trial: '100 Nights In-Home Risk-Free Trial',
      shipping: 'Complimentary White-Glove Room Delivery & Setup',
    },
    careInstructions: [
      'Rotate 180° every 3 to 6 months for uniform longevity.',
      'Spot clean with mild upholstery cleaner; do not machine wash the core foam.',
      'Keep away from direct heat sources or high-temperature irons.',
      'Use a breathable protector to maintain hygiene.',
    ],
    faqs: [
      {
        question: 'Does this memory foam mattress sleep hot in Indian summers?',
        answer:
          'No. Unlike conventional memory foams, Mindfree incorporates open-cell molecular structure and conductive gel beads that continuously dissipate night warmth through the breathable Belgian Damask surface.',
      },
      {
        question: 'Will I feel like I am sinking into quicksand?',
        answer:
          'Not at all. We place a high-resilience transition layer beneath the memory foam to prevent that trapped sensation. It cushions your curves while keeping movement effortless.',
      },
      {
        question: 'Is there any chemical off-gassing smell?',
        answer:
          'Our foams are Oeko-Tex Standard 100 certified, made without harmful VOCs, formaldehyde, or heavy metals. Any initial faint new-product scent disperses within 12–24 hours of unboxing.',
      },
    ],
    reviews: [
      {
        id: 'rev-mf-1',
        author: 'Neha Verma',
        location: 'Hyderabad, Telangana',
        rating: 5,
        date: '02 Feb 2026',
        title: 'Like sleeping on a five-star hotel cloud',
        content:
          'The pressure relief on my shoulders is heavenly. I wake up without numb arms or tight hips for the first time in years. Highly recommend the 10-inch queen.',
        verifiedBuyer: true,
        helpfulCount: 31,
      },
      {
        id: 'rev-mf-2',
        author: 'Karan Mehra',
        location: 'New Delhi, NCR',
        rating: 5,
        date: '19 Jan 2026',
        title: 'True motion isolation and cool fabric',
        content:
          'My golden retriever jumps on the bed and I can barely feel the ripple. The fabric feels silky cool and luxurious.',
        verifiedBuyer: true,
        helpfulCount: 22,
      },
    ],
  },

  latex: {
    id: 'latex',
    slug: 'latex',
    name: 'Mindfree Sovereign 100% Organic Pin-Core Latex',
    tagline: 'Eco-Certified Botanical Latex with Continuous Natural Aeration',
    badge: '100% Organic Eco-Certified',
    category: 'Botanical Latex Collection',
    rating: 5.0,
    reviewsCount: 840,
    summary:
      'Harvested sustainably from organic rubber tree plantations, this 100% natural pin-core aerated latex mattress offers instant buoyant bounce, hypoallergenic purity, and unrivaled air circulation for organic sleep wellness.',
    keyBenefits: [
      '100% Certified organic natural latex',
      'Pin-core aeration matrix for 360° airflow',
      'Instant responsive bounce without pressure',
      'Naturally antibacterial and anti-dust mite',
      '12-Year extended craftsmanship warranty',
    ],
    firmnessScore: 6.5,
    firmnessLabel: 'Medium-Responsive (6.5 / 10)',
    firmnessDescription:
      'Buoyant, springy, and naturally supportive. It floats your body on top of the mattress rather than letting you sink.',
    idealSleepers: [
      'Hot Sleepers',
      'Eco-Conscious Individuals',
      'Allergy Sufferers',
      'Restless & Combination Sleepers',
    ],
    sizes: [
      {
        id: 'single',
        label: 'Single',
        dimensionsInches: '72" × 36"',
        dimensionsCm: '183 × 91 cm',
        price: 22999,
        originalPrice: 29999,
        sku: 'MF-LX-SN01',
      },
      {
        id: 'double',
        label: 'Double',
        dimensionsInches: '72" × 48"',
        dimensionsCm: '183 × 122 cm',
        price: 28999,
        originalPrice: 36999,
        sku: 'MF-LX-DB02',
      },
      {
        id: 'queen',
        label: 'Queen',
        dimensionsInches: '78" × 60"',
        dimensionsCm: '198 × 152 cm',
        price: 36999,
        originalPrice: 47999,
        sku: 'MF-LX-QN03',
        isPopular: true,
      },
      {
        id: 'king',
        label: 'King',
        dimensionsInches: '78" × 72"',
        dimensionsCm: '198 × 183 cm',
        price: 43999,
        originalPrice: 56999,
        sku: 'MF-LX-KG04',
      },
    ],
    thicknessOptions: [
      {
        id: '8-inch',
        label: '8 Inch (20 cm)',
        priceDelta: 0,
        description: 'Standard 100% botanical latex block.',
      },
      {
        id: '10-inch',
        label: '10 Inch (25 cm)',
        priceDelta: 4500,
        description: 'Dual-density natural latex with plush surface comfort.',
      },
    ],
    gallery: [
      {
        id: 'lx-main',
        url: '/images/mindfree/mindfree-latex.webp',
        alt: 'Mindfree Natural Latex Mattress studio perspective',
        label: 'Full Perspective',
        type: 'perspective',
      },
      {
        id: 'lx-macro',
        url: '/images/mindfree/mindfree-latex-detail1.webp',
        alt: 'Pin-core latex aeration matrix close-up',
        label: 'Pin-Core Botanical Matrix',
        type: 'macro',
      },
      {
        id: 'lx-edge',
        url: '/images/mindfree/mindfree-latex-detail2.webp',
        alt: 'Linen piped tailored border',
        label: 'Organic Linen Border',
        type: 'edge',
      },
      {
        id: 'lx-lifestyle',
        url: '/images/mindfree/sustainability-bedroom.webp',
        alt: 'Latex mattress in eco-villa bedroom',
        label: 'Botanical Sanctuary Setting',
        type: 'lifestyle',
      },
      {
        id: 'lx-cutaway',
        url: '/images/mindfree/mindfree-exploded-layers.webp',
        alt: 'Latex mattress internal construction',
        label: 'Organic Layer Cutaway',
        type: 'cutaway',
      },
    ],
    layers: [
      {
        number: '01',
        name: 'Organic Bamboo-Cotton Damask Weave',
        thickness: '3.0 cm',
        density: '500 GSM',
        description: 'Silky, hypoallergenic organic cotton and bamboo knit certified free from chemical finishes.',
        image: '/images/mindfree/craft-fabrics.webp',
      },
      {
        number: '02',
        name: '100% Natural Pin-Core Latex Layer',
        thickness: '7.5 cm',
        density: '75 kg/m³',
        description: 'Micro-perforated botanical latex providing immediate buoyancy and continuous thermal venting.',
        image: '/images/mindfree/3d-latex-pincore.webp',
      },
      {
        number: '03',
        name: 'High-Density Botanical Latex Base',
        thickness: '9.5 cm',
        density: '85 kg/m³',
        description: 'Firm, resilient natural rubber base engineered for lifetime shape stability.',
        image: '/images/mindfree/3d-latex-pincore.webp',
      },
    ],
    specifications: {
      coreSupport: '100% Natural Dunlop/Talalay Organic Botanical Latex',
      comfortLayer: 'Aerated Pin-Core Botanical Latex Comfort Zone',
      coverFabric: 'Organic Bamboo & Belgian Cotton Knit',
      breathability: 'Maximum Natural Ventilation Pin-Core Matrix',
      motionIsolation: 'Exceptional Localized Elasticity',
      warranty: '12 Years Comprehensive Replacement Warranty',
      trial: '100 Nights In-Home Risk-Free Trial',
      shipping: 'Complimentary White-Glove Room Delivery & Setup',
    },
    careInstructions: [
      'Do not expose natural latex core to direct harsh UV sunlight.',
      'Rotate 180° twice a year to promote uniform firmness.',
      'Spot clean with mild natural soap and dry thoroughly in a shaded breeze.',
      'Place on a supportive flat or slatted foundation.',
    ],
    faqs: [
      {
        question: 'Is this real natural latex or synthetic foam?',
        answer:
          'This mattress is 100% natural botanical latex sourced from certified rubber plantations in South India and Sri Lanka. It contains zero petroleum-based synthetic SBR rubber fillers.',
      },
      {
        question: 'Is natural latex safe for allergy sufferers?',
        answer:
          'Yes. Natural latex is inherently antimicrobial, hypoallergenic, and impervious to dust mites, mildew, and mold.',
      },
    ],
    reviews: [
      {
        id: 'rev-lx-1',
        author: 'Sunil Kulkarni',
        location: 'Pune, Maharashtra',
        rating: 5,
        date: '08 Mar 2026',
        title: 'The cleanest, most breathable mattress on the market',
        content:
          'I wanted a purely natural mattress without toxic chemicals. The buoyant bounce and cool sleeping surface on this Mindfree latex mattress are simply in a league of their own.',
        verifiedBuyer: true,
        helpfulCount: 45,
      },
    ],
  },

  spring: {
    id: 'spring',
    slug: 'spring',
    name: 'Mindfree Sovereign Pocket Spring Hybrid',
    tagline: '850+ Individually Encased Tempered Pocket Coils',
    badge: 'Zero Motion Transfer',
    category: 'Pocket Spring Collection',
    rating: 4.8,
    reviewsCount: 1120,
    summary:
      'Engineered with over 850 individually encased pocket springs, this mattress contours independently to every shift in sleeping posture, ensuring zero motion ripple across the bed and responsive spinal pushback.',
    keyBenefits: [
      '850+ Calibrated individual pocket coils',
      'Dual-tempered high-tensile steel springs',
      'Total zero motion transfer between partners',
      'Reinforced perimeter edge foam encasement',
      'Targeted spinal pushback without stiffness',
    ],
    firmnessScore: 6.5,
    firmnessLabel: 'Medium-Bouncy (6.5 / 10)',
    firmnessDescription:
      'Gentle bounce with active localized support. The independent springs move only under direct weight.',
    idealSleepers: [
      'Couples',
      'Combination Sleepers who change positions',
      'Those who enjoy responsive support',
    ],
    sizes: [
      {
        id: 'single',
        label: 'Single',
        dimensionsInches: '72" × 36"',
        dimensionsCm: '183 × 91 cm',
        price: 16499,
        originalPrice: 21999,
        sku: 'MF-SP-SN01',
      },
      {
        id: 'double',
        label: 'Double',
        dimensionsInches: '72" × 48"',
        dimensionsCm: '183 × 122 cm',
        price: 21499,
        originalPrice: 27999,
        sku: 'MF-SP-DB02',
      },
      {
        id: 'queen',
        label: 'Queen',
        dimensionsInches: '78" × 60"',
        dimensionsCm: '198 × 152 cm',
        price: 27499,
        originalPrice: 35999,
        sku: 'MF-SP-QN03',
        isPopular: true,
      },
      {
        id: 'king',
        label: 'King',
        dimensionsInches: '78" × 72"',
        dimensionsCm: '198 × 183 cm',
        price: 32999,
        originalPrice: 42999,
        sku: 'MF-SP-KG04',
      },
    ],
    thicknessOptions: [
      {
        id: '8-inch',
        label: '8 Inch (20 cm)',
        priceDelta: 0,
        description: 'Standard pocket coil profile.',
      },
      {
        id: '10-inch',
        label: '10 Inch (25 cm)',
        priceDelta: 3500,
        description: 'Plush pillowtop with quilted foam buffer.',
      },
      {
        id: '12-inch',
        label: '12 Inch (30 cm)',
        priceDelta: 6500,
        description: 'Grand Euro Top with enhanced micro-pocket layers.',
      },
    ],
    gallery: [
      {
        id: 'sp-main',
        url: '/images/mindfree/mindfree-spring.webp',
        alt: 'Mindfree Pocket Spring Mattress studio perspective',
        label: 'Full Perspective',
        type: 'perspective',
      },
      {
        id: 'sp-macro',
        url: '/images/mindfree/mindfree-spring-detail1.webp',
        alt: 'Quilted cover with gold piping detail',
        label: 'Hand-Tufted Pillowtop',
        type: 'macro',
      },
      {
        id: 'sp-edge',
        url: '/images/mindfree/mindfree-spring-detail2.webp',
        alt: 'Reinforced spring edge profile',
        label: 'Perimeter Wall Profile',
        type: 'edge',
      },
      {
        id: 'sp-lifestyle',
        url: '/images/mindfree/why-choose-bedroom.webp',
        alt: 'Pocket spring mattress in boutique bedroom',
        label: 'Architectural Master Bedroom',
        type: 'lifestyle',
      },
      {
        id: 'sp-cutaway',
        url: '/images/mindfree/mindfree-exploded-layers.webp',
        alt: 'Internal pocket spring coil system',
        label: 'Pocket Coil Layer Cutaway',
        type: 'cutaway',
      },
    ],
    layers: [
      {
        number: '01',
        name: 'Belgian Damask Pillow-Top Quilt',
        thickness: '4.0 cm',
        density: '480 GSM',
        description: 'Plush cloud tufting with silky damask weave.',
        image: '/images/mindfree/craft-fabrics.webp',
      },
      {
        number: '02',
        name: 'High-Resilience Comfort Transition Foam',
        thickness: '3.5 cm',
        density: '50 kg/m³',
        description: 'Prevents direct coil sensation while ensuring ergonomic pushback.',
        image: '/images/mindfree/3d-ep-foam.webp',
      },
      {
        number: '03',
        name: '850+ Encased Tempered Pocket Coils',
        thickness: '16.0 cm',
        density: '2.0 mm Steel Wire',
        description: 'Individual spunbond-encased springs that compress independently.',
        image: '/images/mindfree/3d-pocket-springs.webp',
      },
      {
        number: '04',
        name: 'Perimeter Foam Encasement Border',
        thickness: '8.0 cm wall',
        density: '60 kg/m³',
        description: 'High-density border walls that prevent edge roll-off.',
        image: '/images/mindfree/craft-durable.webp',
      },
    ],
    specifications: {
      coreSupport: '850+ Tempered Steel Individually Encased Pocket Springs',
      comfortLayer: 'High-Resilience Pressure Transition Foam',
      coverFabric: 'Belgian Damask Knit with Gold Border Piping',
      breathability: 'High Passive Airflow Through Open Coil Cavities',
      motionIsolation: 'Zero Motion Transfer Independent Coils',
      warranty: '10 Years Comprehensive Replacement Warranty',
      trial: '100 Nights In-Home Risk-Free Trial',
      shipping: 'Complimentary White-Glove Room Delivery & Setup',
    },
    careInstructions: [
      'Do not bend or fold pocket spring mattresses during relocation.',
      'Rotate 180° every 3 months for optimal spring performance.',
      'Place on a sturdy, level frame with central support beams.',
    ],
    faqs: [
      {
        question: 'Will the springs poke through over time?',
        answer:
          'No. Each spring is double-tempered from high-tensile steel and individually sealed inside puncture-resistant spunbond fabric, buffered by dense transition foams.',
      },
    ],
    reviews: [
      {
        id: 'rev-sp-1',
        author: 'Deepak & Tanvi Joshi',
        location: 'Chandigarh',
        rating: 5,
        date: '11 Feb 2026',
        title: 'Perfect bounce without any disturbance',
        content:
          'I work late nights and my wife sleeps early. The pocket springs ensure I can slip into bed without waking her up. Phenomenal quality.',
        verifiedBuyer: true,
        helpfulCount: 26,
      },
    ],
  },

  hybrid: {
    id: 'hybrid',
    slug: 'hybrid',
    name: 'Mindfree Grand Sovereign Royal Hybrid',
    tagline: 'Pocket Springs Infused with Organic Pin-Core Latex & Gel Memory',
    badge: 'Ultimate Luxury',
    category: 'Signature Hybrid Collection',
    rating: 4.95,
    reviewsCount: 1680,
    summary:
      'Our crowning achievement in luxury sleep architecture. The Grand Sovereign merges responsive 7-zone pocket springs with 100% natural organic latex and temperature-neutral gel memory foam, culminating in a hand-tufted European pillowtop fit for royalty.',
    keyBenefits: [
      'Multi-layer hybrid: Springs + Botanical Latex + Gel Memory',
      'Over 1,000 independent 7-zone pocket coils',
      'Hand-tufted European pillowtop with Belgian damask silk',
      '15-Year extended master craftsmanship warranty',
      'Optimal contouring with buoyant anti-sag resilience',
    ],
    firmnessScore: 7.0,
    firmnessLabel: 'Adaptive Luxury (7.0 / 10)',
    firmnessDescription:
      'The gold standard of luxury hotel comfort. Plush initial surface softness followed by firm, unwavering deep support.',
    idealSleepers: [
      'Luxury Seekers',
      'All Sleeping Styles (Side, Back, Stomach)',
      'Couples seeking both contouring and bounce',
    ],
    sizes: [
      {
        id: 'single',
        label: 'Single',
        dimensionsInches: '72" × 36"',
        dimensionsCm: '183 × 91 cm',
        price: 26999,
        originalPrice: 34999,
        sku: 'MF-HY-SN01',
      },
      {
        id: 'double',
        label: 'Double',
        dimensionsInches: '72" × 48"',
        dimensionsCm: '183 × 122 cm',
        price: 33999,
        originalPrice: 43999,
        sku: 'MF-HY-DB02',
      },
      {
        id: 'queen',
        label: 'Queen',
        dimensionsInches: '78" × 60"',
        dimensionsCm: '198 × 152 cm',
        price: 42999,
        originalPrice: 55999,
        sku: 'MF-HY-QN03',
        isPopular: true,
      },
      {
        id: 'king',
        label: 'King',
        dimensionsInches: '78" × 72"',
        dimensionsCm: '198 × 183 cm',
        price: 49999,
        originalPrice: 64999,
        sku: 'MF-HY-KG04',
      },
    ],
    thicknessOptions: [
      {
        id: '10-inch',
        label: '10 Inch (25 cm)',
        priceDelta: 0,
        description: 'Standard Royal Euro Top profile.',
      },
      {
        id: '12-inch',
        label: '12 Inch (30 cm)',
        priceDelta: 5500,
        description: 'Presidential dual-pillowtop with maximum latex cushioning.',
      },
    ],
    gallery: [
      {
        id: 'hy-main',
        url: '/images/mindfree/mindfree-hybrid.webp',
        alt: 'Mindfree Grand Sovereign Hybrid Mattress perspective',
        label: 'Full Perspective',
        type: 'perspective',
      },
      {
        id: 'hy-macro',
        url: '/images/mindfree/mindfree-hybrid-detail1.webp',
        alt: 'Pillowtop Belgian damask tufted embroidery',
        label: 'Embroidered Euro Top',
        type: 'macro',
      },
      {
        id: 'hy-edge',
        url: '/images/mindfree/mindfree-hybrid-detail2.webp',
        alt: 'Double piping with gold trim details',
        label: 'Champagne-Gold Piping',
        type: 'edge',
      },
      {
        id: 'hy-lifestyle',
        url: '/images/mindfree/final-cta-bedroom.webp',
        alt: 'Grand Sovereign in master suite interior',
        label: 'Master Suite Interior',
        type: 'lifestyle',
      },
      {
        id: 'hy-cutaway',
        url: '/images/mindfree/mindfree-exploded-layers.webp',
        alt: 'Internal multi-tier hybrid construction',
        label: 'Multi-Tier Cutaway',
        type: 'cutaway',
      },
    ],
    layers: [
      {
        number: '01',
        name: 'Hand-Tufted Belgian Damask Silk Top',
        thickness: '4.0 cm',
        density: '520 GSM',
        description: 'Ultra-luxurious silk jacquard weave with champagne gold decorative piping.',
        image: '/images/mindfree/craft-fabrics.webp',
      },
      {
        number: '02',
        name: '100% Botanical Pin-Core Latex',
        thickness: '4.0 cm',
        density: '75 kg/m³',
        description: 'Natural responsive bounce with continuous vertical aeration.',
        image: '/images/mindfree/3d-latex-pincore.webp',
      },
      {
        number: '03',
        name: 'Air-Cool Visco Memory Cushion',
        thickness: '3.5 cm',
        density: '60 kg/m³',
        description: 'Conforms to pressure points and absorbs body shock.',
        image: '/images/mindfree/3d-ep-foam.webp',
      },
      {
        number: '04',
        name: '1,000+ Encased 7-Zone Pocket Springs',
        thickness: '16.0 cm',
        density: 'Tempered Steel Coils',
        description: 'Calibrated zoned coil matrix for dynamic postural alignment.',
        image: '/images/mindfree/3d-pocket-springs.webp',
      },
      {
        number: '05',
        name: 'Organic Coir & Gripper Foundation',
        thickness: '3.0 cm',
        density: '1100 GSM',
        description: 'Breathable coconut fiber base locking the structure in place.',
        image: '/images/mindfree/3d-natural-coir.webp',
      },
    ],
    specifications: {
      coreSupport: '1,000+ Calibrated 7-Zone Independent Pocket Springs',
      comfortLayer: 'Natural Botanical Latex + Cooling Visco Memory Foam',
      coverFabric: '520 GSM Belgian Damask Silk Jacquard',
      breathability: 'Active Multi-Tier Dual Aeration Channels',
      motionIsolation: 'Absolute Zero Kinetic Transfer',
      warranty: '15 Years Comprehensive Replacement Warranty',
      trial: '100 Nights In-Home Risk-Free Trial',
      shipping: 'Complimentary White-Glove Room Delivery & Setup',
    },
    careInstructions: [
      'Rotate 180° every 3 to 6 months.',
      'Always use a breathable protector.',
      'Place on high-grade solid platform or reinforced slat system.',
    ],
    faqs: [
      {
        question: 'Why choose a hybrid over an all-foam or all-spring mattress?',
        answer:
          'A hybrid delivers the best of both worlds: the buoyant pressure relief and cooling airflow of natural latex and memory foam on top, combined with the deep, active contouring and zero motion transfer of 1,000+ independent pocket springs below.',
      },
    ],
    reviews: [
      {
        id: 'rev-hy-1',
        author: 'Vikramaditya Singhania',
        location: 'Mumbai, Maharashtra',
        rating: 5,
        date: '25 Jan 2026',
        title: 'Unmatched luxury and deep, restorative sleep',
        content:
          'Worth every single rupee. The Grand Sovereign feels better than the bespoke beds at the Taj and Four Seasons. You literally wake up without an ounce of tiredness.',
        verifiedBuyer: true,
        helpfulCount: 58,
      },
    ],
  },

  coir: {
    id: 'coir',
    slug: 'coir',
    name: 'Mindfree Natural Coir Ortho Core',
    tagline: 'High-Density Breathable Coconut Coir Foundation',
    badge: 'Traditional Firm & Cool',
    category: 'Natural Coir Collection',
    rating: 4.7,
    reviewsCount: 650,
    summary:
      'Constructed with densely packed natural organic coconut coir fibers bonded with natural rubber, this mattress delivers firm, unwavering postural support that remains naturally cool in tropical climates.',
    keyBenefits: [
      '100% Natural coconut husk fiber core',
      'Maximum firm spinal support (8.5/10)',
      'Natural passive cooling & air circulation',
      'Naturally resilient and anti-sag construction',
      '7-Year warranty coverage',
    ],
    firmnessScore: 8.5,
    firmnessLabel: 'Firm (8.5 / 10)',
    firmnessDescription:
      'Traditional firm mattress with minimal give, ideal for stomach sleepers and those who prefer a rigid sleeping surface.',
    idealSleepers: [
      'Stomach Sleepers',
      'Back Sleepers who require rigid support',
      'Warm Climates',
    ],
    sizes: [
      {
        id: 'single',
        label: 'Single',
        dimensionsInches: '72" × 36"',
        dimensionsCm: '183 × 91 cm',
        price: 9999,
        originalPrice: 13999,
        sku: 'MF-CR-SN01',
      },
      {
        id: 'double',
        label: 'Double',
        dimensionsInches: '72" × 48"',
        dimensionsCm: '183 × 122 cm',
        price: 13499,
        originalPrice: 17999,
        sku: 'MF-CR-DB02',
      },
      {
        id: 'queen',
        label: 'Queen',
        dimensionsInches: '78" × 60"',
        dimensionsCm: '198 × 152 cm',
        price: 17999,
        originalPrice: 23999,
        sku: 'MF-CR-QN03',
        isPopular: true,
      },
      {
        id: 'king',
        label: 'King',
        dimensionsInches: '78" × 72"',
        dimensionsCm: '198 × 183 cm',
        price: 21999,
        originalPrice: 28999,
        sku: 'MF-CR-KG04',
      },
    ],
    thicknessOptions: [
      {
        id: '8-inch',
        label: '5 Inch (13 cm)',
        priceDelta: 0,
        description: 'Traditional compact firm coir height.',
      },
      {
        id: '10-inch',
        label: '6 Inch (15 cm)',
        priceDelta: 2000,
        description: 'Enhanced coir core with extra cushioning quilt.',
      },
    ],
    gallery: [
      {
        id: 'cr-main',
        url: '/images/mindfree/mindfree-coir.webp',
        alt: 'Mindfree Natural Coir Mattress studio perspective',
        label: 'Full Perspective',
        type: 'perspective',
      },
      {
        id: 'cr-macro',
        url: '/images/mindfree/mindfree-coir-detail1.webp',
        alt: 'Coir mattress breathable knit fabric',
        label: 'Cotton Quilt Surface',
        type: 'macro',
      },
      {
        id: 'cr-edge',
        url: '/images/mindfree/mindfree-coir-detail2.webp',
        alt: 'Double-stitched firm border tape',
        label: 'Durable Edge Binding',
        type: 'edge',
      },
      {
        id: 'cr-lifestyle',
        url: '/images/mindfree/why-choose-bedroom.webp',
        alt: 'Coir mattress in natural light bedroom',
        label: 'Tranquil Bedroom Setting',
        type: 'lifestyle',
      },
      {
        id: 'cr-cutaway',
        url: '/images/mindfree/mindfree-exploded-layers.webp',
        alt: 'Coir core internal construction',
        label: 'Natural Coir Cutaway',
        type: 'cutaway',
      },
    ],
    layers: [
      {
        number: '01',
        name: 'Breathable Cotton Jacquard Cover',
        thickness: '2.5 cm',
        density: '400 GSM',
        description: 'Naturally cool woven cotton fabric with geometric quilting.',
        image: '/images/mindfree/craft-fabrics.webp',
      },
      {
        number: '02',
        name: 'High-Density Natural Coconut Coir Core',
        thickness: '10.0 cm',
        density: '1200 GSM',
        description: 'Rubberized natural coir fiber mat providing firm, well-ventilated posture support.',
        image: '/images/mindfree/3d-natural-coir.webp',
      },
      {
        number: '03',
        name: 'Rebound Transition Foam',
        thickness: '2.5 cm',
        density: '70 kg/m³',
        description: 'Protective foam cushion providing surface comfort over the firm coir base.',
        image: '/images/mindfree/craft-durable.webp',
      },
    ],
    specifications: {
      coreSupport: 'Dense Rubberized Coconut Coir Matrix',
      comfortLayer: 'High-Resilience Rebound Cushioning',
      coverFabric: 'Breathable Cotton Jacquard',
      breathability: 'Natural Fiber Ventilation',
      motionIsolation: 'Firm Stable Surface',
      warranty: '7 Years Comprehensive Replacement Warranty',
      trial: '100 Nights In-Home Risk-Free Trial',
      shipping: 'Complimentary White-Glove Room Delivery & Setup',
    },
    careInstructions: [
      'Do not soak with water or expose to wet spills.',
      'Rotate every 6 months.',
      'Place on firm wooden base.',
    ],
    faqs: [
      {
        question: 'Is coir good for hot and humid climates?',
        answer:
          'Yes, coconut coir is one of the most naturally breathable materials in bedding. It allows continuous natural ventilation and does not trap heat.',
      },
    ],
    reviews: [
      {
        id: 'rev-cr-1',
        author: 'Ramesh Balakrishnan',
        location: 'Chennai, Tamil Nadu',
        rating: 5,
        date: '16 Dec 2025',
        title: 'Perfect firm mattress for hot Chennai climate',
        content:
          'I cannot stand soft beds. This Mindfree coir mattress is solid, firm, and stays wonderfully cool throughout the night.',
        verifiedBuyer: true,
        helpfulCount: 19,
      },
    ],
  },
};

export const DEFAULT_PRODUCT_SLUG = 'orthopedic';

export const getProductBySlug = (slug: string): MattressProductDetail => {
  return MATTRESS_PRODUCTS[slug] || MATTRESS_PRODUCTS[DEFAULT_PRODUCT_SLUG];
};
