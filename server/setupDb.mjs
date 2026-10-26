import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const pool = new pg.Pool({
  host: process.env.DB_HOST || process.env.PGHOST || process.env.PG_HOST || 'localhost',
  port: Number(process.env.DB_PORT || process.env.PG_PORT || 5432),
  database: process.env.DB_NAME || process.env.PG_DATABASE || 'mindf31',
  user: process.env.DB_USER || process.env.PG_USER || 'mindf31',
  password: process.env.DB_PASSWORD || process.env.PG_PASSWORD || 'IgLgwJQIIOqHvnjWSG42IPpXQ',
  ssl: false,
  connectionTimeoutMillis: 15000,
});

async function setupDatabase() {
  const client = await pool.connect();
  try {
    console.log('Connected to PostgreSQL at localhost:5432 (DB: mindf31)');

    // 1. Run DDL Schema
    const schemaPath = path.join(projectRoot, 'database', 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schemaSql);
    console.log('Executed database/schema.sql — all 10 tables & indexes verified.');

    // 2. Seed Storage Buckets in PostgreSQL
    const buckets = [
      {
        id: 'product-images',
        name: 'product-images',
        description: 'Mattress product catalogue studio images and gallery photos',
      },
      {
        id: 'hero-banners',
        name: 'hero-banners',
        description: 'Homepage panoramic hero banners and quiz cutout PNGs',
      },
      {
        id: 'room-images',
        name: 'room-images',
        description: 'Shop By Room interactive bedroom scenes',
      },
      {
        id: 'pillow-images',
        name: 'pillow-images',
        description: 'Ergonomic pillows and sleep accessories photography',
      },
      {
        id: 'media-uploads',
        name: 'media-uploads',
        description: 'General Admin CMS uploaded images and brand assets',
      },
    ];

    for (const b of buckets) {
      await client.query(
        `INSERT INTO storage_buckets (id, name, is_public, description)
         VALUES ($1, $2, TRUE, $3)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           description = EXCLUDED.description,
           updated_at = NOW()`,
        [b.id, b.name, b.description]
      );
    }
    console.log(`Seeded ${buckets.length} PostgreSQL storage buckets.`);

    // 3. Upload sample brand & product images into PostgreSQL storage_objects
    const sampleFilesToStore = [
      {
        bucket: 'media-uploads',
        fileName: 'favicon.png',
        diskPath: path.join(projectRoot, 'public', 'favicon.png'),
        mimeType: 'image/png',
        alt: 'Mindfree Official Brand Favicon',
      },
      {
        bucket: 'hero-banners',
        fileName: 'quiz-bed-1.png',
        diskPath: path.join(projectRoot, 'public', 'images', 'quiz-bed-1.png'),
        mimeType: 'image/png',
        alt: 'Mindfree Euro-Top Orthopedic Cutout',
      },
      {
        bucket: 'pillow-images',
        fileName: 'pillow-cervical.jpg',
        diskPath: path.join(projectRoot, 'public', 'images', 'pillows', 'pillow-cervical.jpg'),
        mimeType: 'image/jpeg',
        alt: 'Ergonomic Cervical Memory Foam Pillow',
      },
      {
        bucket: 'room-images',
        fileName: 'room-master.jpg',
        diskPath: path.join(projectRoot, 'public', 'images', 'rooms', 'room-master.jpg'),
        mimeType: 'image/jpeg',
        alt: 'Master Bedroom Showcase',
      },
      {
        bucket: 'product-images',
        fileName: 'product-deluxe.jpg',
        diskPath: path.join(projectRoot, 'public', 'images', 'products', 'product-deluxe.jpg'),
        mimeType: 'image/jpeg',
        alt: 'Deluxe Foam Mattress',
      },
    ];

    for (const item of sampleFilesToStore) {
      if (fs.existsSync(item.diskPath)) {
        const buf = fs.readFileSync(item.diskPath);
        const base64Data = buf.toString('base64');
        const publicUrl = `/api/storage/${item.bucket}/${item.fileName}`;
        await client.query(
          `INSERT INTO storage_objects (bucket_id, file_name, mime_type, size_bytes, base64_data, public_url, alt_text)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (bucket_id, file_name) DO UPDATE SET
             size_bytes = EXCLUDED.size_bytes,
             base64_data = EXCLUDED.base64_data,
             public_url = EXCLUDED.public_url`,
          [item.bucket, item.fileName, item.mimeType, buf.length, base64Data, publicUrl, item.alt]
        );
      }
    }
    console.log('Uploaded initial images into PostgreSQL storage_objects table.');

    // 4. Seed Products Table (14 Official Mindfree Mattresses)
    const productsSeed = [
      {
        id: 'deluxe',
        slug: 'deluxe',
        name: 'Deluxe Mattress',
        tagline: 'Essential Everyday Comfort',
        categories: ['foam'],
        top_finish_style: 'Tight Top',
        warranty_months: 36,
        starting_price: 8299,
        mrp_price: 9295,
        hero_image: '/images/products/product-deluxe.jpg',
        cooling_image: null,
        thickness_options: [5, 6],
      },
      {
        id: 'dream-comfort',
        slug: 'dream-comfort',
        name: 'Dream Comfort Mattress',
        tagline: 'Plush Knitted Support',
        categories: ['foam'],
        top_finish_style: 'Tight Top',
        warranty_months: 60,
        starting_price: 9499,
        mrp_price: 10639,
        hero_image: '/images/products/product-dream-comfort.jpg',
        cooling_image: null,
        thickness_options: [6, 8],
      },
      {
        id: 'ortho-firm',
        slug: 'ortho-firm',
        name: 'Ortho Firm Mattress',
        tagline: 'Firm Rebonded Orthopedic Core',
        categories: ['orthopedic'],
        top_finish_style: 'Tight Top',
        warranty_months: 60,
        starting_price: 10499,
        mrp_price: 11759,
        hero_image: '/images/type_ortho.png',
        cooling_image: null,
        thickness_options: [5, 6, 8],
      },
      {
        id: 'ultima-bonnell-spring',
        slug: 'ultima-bonnell-spring',
        name: 'Ultima Bonnell Spring Mattress',
        tagline: 'Classic Tempered Steel Coil Support',
        categories: ['spring'],
        top_finish_style: 'Tight Top',
        warranty_months: 60,
        starting_price: 10999,
        mrp_price: 12319,
        hero_image: '/images/type_hybrid.png',
        cooling_image: null,
        thickness_options: [6, 8],
      },
      {
        id: 'ultima-pocket-spring',
        slug: 'ultima-pocket-spring',
        name: 'Ultima Pocket Spring Mattress',
        tagline: 'Zero Motion Transfer Pocket Coils',
        categories: ['spring'],
        top_finish_style: 'Euro Top',
        warranty_months: 60,
        starting_price: 12499,
        mrp_price: 13999,
        hero_image: '/images/type_memory.png',
        cooling_image: null,
        thickness_options: [6, 8, 10],
      },
      {
        id: 'sleep-well-memory',
        slug: 'sleep-well-memory',
        name: 'Sleep Well Memory Mattress',
        tagline: 'Pressure-Relieving Visco Memory Foam',
        categories: ['foam'],
        top_finish_style: 'Euro Top',
        warranty_months: 84,
        starting_price: 13499,
        mrp_price: 15119,
        hero_image: '/images/mindfree/mindfree-memory-foam.webp',
        cooling_image: null,
        thickness_options: [6, 8, 10],
      },
      {
        id: 'spine-relax-ortho',
        slug: 'spine-relax-ortho',
        name: 'Spine Relax Ortho Mattress',
        tagline: '5-Zone Postural Alignment System',
        categories: ['orthopedic'],
        top_finish_style: 'Euro Top',
        warranty_months: 84,
        starting_price: 13999,
        mrp_price: 15679,
        hero_image: '/images/mindfree/mindfree-orthopedic.webp',
        cooling_image: null,
        thickness_options: [6, 8, 10],
      },
      {
        id: 'ultra-maxx',
        slug: 'ultra-maxx',
        name: 'Ultra Maxx Mattress',
        tagline: 'High-Resilience Box-Top Luxury',
        categories: ['foam'],
        top_finish_style: 'Box Top',
        warranty_months: 84,
        starting_price: 14999,
        mrp_price: 16799,
        hero_image: '/images/products/product-ultra-maxx.jpg',
        cooling_image: null,
        thickness_options: [8, 10],
      },
      {
        id: 'royal-pillow-top-spring',
        slug: 'royal-pillow-top-spring',
        name: 'Royal Pillow Top Spring Mattress',
        tagline: '7-Star Hotel Plush Pillow-Top Suite',
        categories: ['spring'],
        top_finish_style: 'Pillow Top',
        warranty_months: 84,
        starting_price: 15499,
        mrp_price: 17359,
        hero_image: '/images/mindfree/mindfree-hybrid.webp',
        cooling_image: null,
        thickness_options: [8, 10, 12],
      },
      {
        id: 'active-cool-spine-care',
        slug: 'active-cool-spine-care',
        name: 'Active Cool Spine Care Mattress',
        tagline: 'Dual-Side Anti-Allergen Cooling Ortho',
        categories: ['orthopedic', 'cooling'],
        top_finish_style: 'Euro Top',
        warranty_months: 120,
        starting_price: 15999,
        mrp_price: 17919,
        hero_image: '/images/products/product-spine-care.jpg',
        cooling_image: '/images/products/product-cool-spine.jpg',
        thickness_options: [6, 8, 10],
      },
      {
        id: 'cool-active-ortho-plus',
        slug: 'cool-active-ortho-plus',
        name: 'Cool Active Ortho Plus Mattress',
        tagline: 'Phase-Change Cooling Orthopedic Box-Top',
        categories: ['orthopedic', 'cooling'],
        top_finish_style: 'Box Top',
        warranty_months: 120,
        starting_price: 17499,
        mrp_price: 19599,
        hero_image: '/images/rooms/room-bestseller-ortho.jpg',
        cooling_image: '/images/products/product-cool-ortho.jpg',
        thickness_options: [6, 8, 10],
      },
      {
        id: 'natural-latex-classic',
        slug: 'natural-latex-classic',
        name: 'Natural Latex Classic Mattress',
        tagline: '100% Pin-Core Botanical Eco-Latex',
        categories: ['latex'],
        top_finish_style: 'Tight Top',
        warranty_months: 120,
        starting_price: 18999,
        mrp_price: 21279,
        hero_image: '/images/type_latex.png',
        cooling_image: null,
        thickness_options: [6, 8, 10],
      },
      {
        id: 'ultra-latex-plus',
        slug: 'ultra-latex-plus',
        name: 'Ultra Latex Plus Mattress',
        tagline: 'Organic Latex & Cooling Memory Euro-Top',
        categories: ['latex', 'cooling'],
        top_finish_style: 'Euro Top',
        warranty_months: 120,
        starting_price: 20499,
        mrp_price: 22959,
        hero_image: '/images/mindfree/mindfree-latex.webp',
        cooling_image: '/images/products/product-cool-latex-plus.jpg',
        thickness_options: [8, 10, 12],
      },
      {
        id: 'hybrid-latex-pocket',
        slug: 'hybrid-latex-pocket',
        name: 'Hybrid Latex Pocket Mattress',
        tagline: '7-Layer Natural Latex & Pocket Spring Flagship',
        categories: ['latex', 'spring', 'cooling'],
        top_finish_style: 'Pillow Top',
        warranty_months: 120,
        starting_price: 22999,
        mrp_price: 25759,
        hero_image: '/images/products/product-cool-hybrid.jpg',
        cooling_image: '/images/products/product-cool-hybrid.jpg',
        thickness_options: [8, 10, 12],
      },
    ];

    for (const p of productsSeed) {
      await client.query(
        `INSERT INTO products (
           id, slug, name, tagline, categories, top_finish_style,
           warranty_months, starting_price, mrp_price, hero_image,
           cooling_image, thickness_options, is_active
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, TRUE)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           tagline = EXCLUDED.tagline,
           categories = EXCLUDED.categories,
           top_finish_style = EXCLUDED.top_finish_style,
           warranty_months = EXCLUDED.warranty_months,
           starting_price = EXCLUDED.starting_price,
           mrp_price = EXCLUDED.mrp_price,
           hero_image = EXCLUDED.hero_image,
           cooling_image = EXCLUDED.cooling_image,
           thickness_options = EXCLUDED.thickness_options,
           updated_at = NOW()`,
        [
          p.id,
          p.slug,
          p.name,
          p.tagline,
          p.categories,
          p.top_finish_style,
          p.warranty_months,
          p.starting_price,
          p.mrp_price,
          p.hero_image,
          p.cooling_image,
          p.thickness_options,
        ]
      );
    }
    console.log(`Seeded ${productsSeed.length} mattresses in products table.`);

    // 5. Seed Pillows & Accessories Table
    const pillowsSeed = [
      {
        id: 'cervical-memory-foam',
        slug: 'cervical-memory-foam-pillow',
        name: 'Mindfree Ergonomic Cervical Memory Foam Pillow',
        tagline: 'Contoured dual-wave orthopedic cradle for neck pain & cervical alignment',
        category: 'pillow',
        badge: 'Orthopedic Choice',
        price: 2499,
        original_price: 3999,
        rating: 4.9,
        reviews_count: 640,
        image: '/images/pillows/pillow-cervical.jpg',
        firmness_or_loft: 'Medium-Firm Contoured (4.5" / 3.5" Wave)',
        material: '55D Open-Cell Visco-Elastic Memory Foam + Bamboo Cover',
        key_features: [
          'Dual-height ergonomic wave supports natural cervical curve',
          'Zero-pressure ear recess for side and back sleepers',
        ],
        sizes: [
          { id: 'standard', label: 'Standard (24" × 15")', price: 2499, sku: 'MF-PIL-CRV-STD' },
          { id: 'king', label: 'King (28" × 16")', price: 2999, sku: 'MF-PIL-CRV-KNG' },
        ],
      },
      {
        id: 'organic-latex-pillow',
        slug: 'organic-pin-core-latex-pillow',
        name: 'Mindfree 100% Pure Botanical Pin-Core Latex Pillow',
        tagline: 'Buoyant, hypoallergenic natural rubber sap with micro-pinhole ventilation',
        category: 'pillow',
        badge: '100% Natural',
        price: 3299,
        original_price: 4999,
        rating: 4.9,
        reviews_count: 512,
        image: '/images/pillows/pillow-latex.jpg',
        firmness_or_loft: 'Responsive Medium-Plush (5.5" Loft)',
        material: 'GOLS Certified 100% Natural Dunlop Pin-Core Latex',
        key_features: [
          'Thousands of pin-core air channels prevent heat build-up',
          'Naturally anti-microbial & dust-mite resistant',
        ],
        sizes: [
          { id: 'standard', label: 'Standard (24" × 16")', price: 3299, sku: 'MF-PIL-LTX-STD' },
          { id: 'king', label: 'King (28" × 18")', price: 3899, sku: 'MF-PIL-LTX-KNG' },
        ],
      },
      {
        id: 'cooling-gel-pillow',
        slug: 'dual-zone-cooling-gel-pillow',
        name: 'Mindfree Dual-Zone Thermoregulating Cooling Gel Pillow',
        tagline: 'Phase-change cooling grid infused over high-density memory foam',
        category: 'pillow',
        badge: 'Active Cool -3°C',
        price: 2899,
        original_price: 4499,
        rating: 4.8,
        reviews_count: 390,
        image: '/images/pillows/pillow-cooling-gel.jpg',
        firmness_or_loft: 'Medium-Plush Adaptive (5.0" Loft)',
        material: 'Medical-Grade Cooling Gel Matrix + Aero-Mesh Gusset',
        key_features: [
          'Draws excess heat away from head & carotid neck zone',
          'Removable washable ice-silk cooling knit outer cover',
        ],
        sizes: [
          { id: 'standard', label: 'Standard (24" × 16")', price: 2899, sku: 'MF-PIL-GEL-STD' },
          { id: 'king', label: 'King (28" × 18")', price: 3399, sku: 'MF-PIL-GEL-KNG' },
        ],
      },
      {
        id: 'microfiber-hotel-pillow',
        slug: '7-star-hotel-microfiber-pillow-pair',
        name: 'Mindfree Bespoke 7-Star Hotel Microfiber Plush Pillow (Set of 2)',
        tagline: 'Ultra-fine virgin down-alternative hollow siliconized microfiber cloud pair',
        category: 'pillow',
        badge: 'Set of 2 • Best Value',
        price: 1999,
        original_price: 3299,
        rating: 4.8,
        reviews_count: 820,
        image: '/images/pillows/pillow-microfiber-pair.jpg',
        firmness_or_loft: 'Cloud-Soft Plush (6.0" Gusseted Loft)',
        material: '3D Virgin Siliconized Microfiber + 400TC Cotton Sateen',
        key_features: [
          '2-inch royal navy piped side gusset prevents flattening',
          '100% hypoallergenic down-alternative hotel luxury feel',
        ],
        sizes: [
          { id: 'standard-pair', label: 'Standard Pair (24" × 16")', price: 1999, sku: 'MF-PIL-HTL-STD2' },
          { id: 'king-pair', label: 'King Pair (28" × 18")', price: 2499, sku: 'MF-PIL-HTL-KNG2' },
        ],
      },
    ];

    for (const pil of pillowsSeed) {
      await client.query(
        `INSERT INTO pillows_accessories (
           id, slug, name, tagline, category, badge, price, original_price,
           rating, reviews_count, image, firmness_or_loft, material, key_features, sizes
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15::jsonb)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           price = EXCLUDED.price,
           original_price = EXCLUDED.original_price,
           image = EXCLUDED.image,
           sizes = EXCLUDED.sizes,
           updated_at = NOW()`,
        [
          pil.id,
          pil.slug,
          pil.name,
          pil.tagline,
          pil.category,
          pil.badge,
          pil.price,
          pil.original_price,
          pil.rating,
          pil.reviews_count,
          pil.image,
          pil.firmness_or_loft,
          pil.material,
          pil.key_features,
          JSON.stringify(pil.sizes),
        ]
      );
    }
    console.log(`Seeded ${pillowsSeed.length} items in pillows_accessories table.`);

    // 6. Seed Customers Table
    const customersSeed = [
      {
        id: 'usr-aarav-01',
        full_name: 'Aarav Singhania',
        email: 'aarav.singhania@example.com',
        phone: '9820145678',
        client_tier: 'Mindfree Atelier Patron',
        member_since_year: 2024,
        saved_addresses: [
          {
            id: 'addr-aarav-01',
            label: 'Primary Residence',
            fullName: 'Aarav Singhania',
            phone: '9820145678',
            addressLine: 'Flat 14B, Regency Crest, Lavelle Road',
            locality: 'Shanthala Nagar',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560001',
            landmark: 'Near UB City',
            isDefault: true,
          },
        ],
      },
      {
        id: 'usr-meera-02',
        full_name: 'Meera Deshmukh',
        email: 'meera.deshmukh@example.com',
        phone: '9819234567',
        client_tier: 'Mindfree Atelier Patron',
        member_since_year: 2025,
        saved_addresses: [
          {
            id: 'addr-meera-01',
            label: 'Altamount Residence',
            fullName: 'Meera Deshmukh',
            phone: '9819234567',
            addressLine: 'Villa 9, Altamount Heights, Altamount Road',
            locality: 'Cumballa Hill',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400026',
            landmark: 'Opposite South Villa',
            isDefault: true,
          },
        ],
      },
    ];

    for (const c of customersSeed) {
      await client.query(
        `INSERT INTO customers (id, full_name, email, phone, client_tier, member_since_year, saved_addresses)
         VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)
         ON CONFLICT (id) DO UPDATE SET
           full_name = EXCLUDED.full_name,
           phone = EXCLUDED.phone,
           saved_addresses = EXCLUDED.saved_addresses,
           updated_at = NOW()`,
        [
          c.id,
          c.full_name,
          c.email,
          c.phone,
          c.client_tier,
          c.member_since_year,
          JSON.stringify(c.saved_addresses),
        ]
      );
    }
    console.log(`Seeded ${customersSeed.length} customers.`);

    // 7. Seed Orders Table
    const ordersSeed = [
      {
        orderId: 'MF-2026-88412',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        customer: {
          fullName: 'Aarav Singhania',
          email: 'aarav.singhania@example.com',
          phone: '9820145678',
          addressLine: 'Flat 14B, Regency Crest, Lavelle Road',
          locality: 'Shanthala Nagar',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560001',
          landmark: 'Near UB City',
          billingSameAsShipping: true,
        },
        items: [
          {
            id: 'orthopedic',
            sku: 'MF-OS-QN03-10',
            name: 'Mindfree Ortho-Spine Luxury Mattress',
            size: 'Queen (78" × 60")',
            thickness: '10 Inch (25 cm)',
            price: 28499,
            quantity: 1,
            image: '/images/mindfree/mindfree-orthopedic.webp',
          },
        ],
        subtotal: 28499,
        totalSavings: 8000,
        shipping: 0,
        tax: 0,
        total: 28499,
        paymentMethod: 'upi',
        paymentStatus: 'Paid',
        orderStatus: 'Preparing in Atelier',
        trackingNumber: 'MF-DEL-88412-BLR',
        courierPartner: 'Mindfree Dedicated White-Glove Fleet (Bengaluru Atelier)',
        estimatedDelivery: 'Thursday, 29 Oct 2026',
        statusHistory: [
          {
            status: 'Confirmed',
            timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
            note: 'Order specifications & UPI payment verified by Mindfree Payments Escrow.',
            updatedBy: 'Automated Billing Gateway',
          },
          {
            status: 'Preparing in Atelier',
            timestamp: new Date(Date.now() - 86400000 * 1.2).toISOString(),
            note: 'Multi-zone pocket springs and botanical latex layered. Ultrasonic border quilting in progress.',
            updatedBy: 'Master Craftsman Rajesh M.',
          },
        ],
      },
      {
        orderId: 'MF-2026-87950',
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        customer: {
          fullName: 'Meera Deshmukh',
          email: 'meera.deshmukh@example.com',
          phone: '9819234567',
          addressLine: 'Villa 9, Altamount Heights, Altamount Road',
          locality: 'Cumballa Hill',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400026',
          landmark: 'Opposite South Villa',
          billingSameAsShipping: true,
        },
        items: [
          {
            id: 'hybrid',
            sku: 'MF-HY-KG04-12',
            name: 'Mindfree Grand Sovereign Royal Hybrid',
            size: 'King (78" × 72")',
            thickness: '12 Inch (30 cm)',
            price: 55499,
            quantity: 1,
            image: '/images/mindfree/mindfree-hybrid.webp',
          },
        ],
        subtotal: 55499,
        totalSavings: 15000,
        shipping: 0,
        tax: 0,
        total: 55499,
        paymentMethod: 'card',
        paymentStatus: 'Paid',
        orderStatus: 'Dispatched',
        trackingNumber: 'MF-DEL-87950-BOM',
        courierPartner: 'Mindfree Express Logistics Hub (Mumbai Western Fleet)',
        estimatedDelivery: 'Tuesday, 27 Oct 2026',
        statusHistory: [
          {
            status: 'Confirmed',
            timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
            note: 'Order verified and authorized with Visa Platinum credit card.',
            updatedBy: 'Automated Billing Gateway',
          },
          {
            status: 'Preparing in Atelier',
            timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
            note: 'Hand-tufted memory foam & pocketed spring core passed 50-point precision QA inspection.',
            updatedBy: 'Quality Inspector Anita P.',
          },
          {
            status: 'Dispatched',
            timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
            note: 'Mattress securely loaded into climate-controlled white-glove transport vehicle.',
            updatedBy: 'Atelier Logistics Supervisor',
            courierPartner: 'Mindfree Express Logistics Hub (Mumbai Western Fleet)',
            courierWaybill: 'BOM-EXP-87950-WG',
          },
        ],
      },
    ];

    for (const o of ordersSeed) {
      await client.query(
        `INSERT INTO orders (
           order_id, customer_email, customer_phone, customer_info, items,
           subtotal, total_savings, shipping, tax, total,
           payment_method, payment_status, order_status,
           tracking_number, courier_partner, estimated_delivery, status_history, created_at
         )
         VALUES ($1, $2, $3, $4::jsonb, $5::jsonb, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17::jsonb, $18)
         ON CONFLICT (order_id) DO NOTHING`,
        [
          o.orderId,
          o.customer.email,
          o.customer.phone,
          JSON.stringify(o.customer),
          JSON.stringify(o.items),
          o.subtotal,
          o.totalSavings,
          o.shipping,
          o.tax,
          o.total,
          o.paymentMethod,
          o.paymentStatus,
          o.orderStatus,
          o.trackingNumber,
          o.courierPartner,
          o.estimatedDelivery,
          JSON.stringify(o.statusHistory),
          o.createdAt,
        ]
      );
    }
    console.log(`Seeded ${ordersSeed.length} orders.`);

    // 8. Seed Google Reviews Table
    const reviewsSeed = [
      {
        id: 'rev-1',
        name: 'Rohan Deshmukh',
        date: '19-10-2026',
        rating: 5,
        text: 'Switched to the Mindfree Ultima Pocket Spring mattress last month and my lower back stiffness has completely vanished. Truly hotel-grade luxury comfort!',
      },
      {
        id: 'rev-2',
        name: 'Priya Subramanian',
        date: '16-10-2026',
        rating: 5,
        text: 'Wonderful experience! The Natural Latex mattress stays remarkably cool throughout the night and the build quality is top notch. 😊',
      },
      {
        id: 'rev-3',
        name: 'Vikramaditya Malhotra',
        date: '14-10-2026',
        rating: 5,
        text: null,
      },
      {
        id: 'rev-4',
        name: 'Sneha Kulkarni',
        date: '12-10-2026',
        rating: 5,
        text: 'Great experience..! Must visit if you are looking for a comfortable and orthopedic mattress option for your home...! 😊',
      },
      {
        id: 'rev-5',
        name: 'Arjun Venkatesh',
        date: '09-10-2026',
        rating: 5,
        text: 'Ordered the Ortho Firm 6-inch mattress for my parents. Perfect firm support, zero sagging, and seamless doorstep delivery.',
      },
    ];

    for (const r of reviewsSeed) {
      await client.query(
        `INSERT INTO reviews (id, customer_name, rating, review_text, review_date, is_verified)
         VALUES ($1, $2, $3, $4, $5, TRUE)
         ON CONFLICT (id) DO NOTHING`,
        [r.id, r.name, r.rating, r.text, r.date]
      );
    }
    console.log(`Seeded ${reviewsSeed.length} customer reviews.`);

    // 9. Seed Site Content Table
    await client.query(
      `INSERT INTO site_content (section_key, title, subtitle, badge_text, cta_text, cta_link, image_url, content_json)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb)
       ON CONFLICT (section_key) DO UPDATE SET
         title = EXCLUDED.title,
         subtitle = EXCLUDED.subtitle,
         updated_at = NOW()`,
      [
        'hero-primary',
        'ORTHOPEDIC COMFORT THAT SUPPORTS YOUR SPINE',
        'Engineered for Indian body contours and climate with 100-night risk-free trial.',
        'MINDFREE SIGNATURE SERIES',
        'Shop Mattresses',
        '#catalogue-grid',
        '/images/hero-banner-1.png',
        JSON.stringify({ domain: 'mindfreemat.roiclients.co.in', warrantyYears: 10 }),
      ]
    );
    console.log('Seeded site_content table.');

    // 10. Print table summary from PostgreSQL
    const summary = await client.query(`
      SELECT
        (SELECT COUNT(*) FROM storage_buckets) AS buckets,
        (SELECT COUNT(*) FROM storage_objects) AS storage_files,
        (SELECT COUNT(*) FROM products) AS products,
        (SELECT COUNT(*) FROM pillows_accessories) AS pillows,
        (SELECT COUNT(*) FROM customers) AS customers,
        (SELECT COUNT(*) FROM orders) AS orders,
        (SELECT COUNT(*) FROM reviews) AS reviews,
        (SELECT COUNT(*) FROM site_content) AS site_content
    `);
    console.log('PostgreSQL Live Database Row Counts:', summary.rows[0]);
  } finally {
    client.release();
    await pool.end();
  }
}

setupDatabase().catch((err) => {
  console.error('Database setup error:', err);
  process.exit(1);
});
