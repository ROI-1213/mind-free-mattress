-- ============================================================================
-- MINDFREE MATTRESS — COMPLETE POSTGRESQL DATABASE & STORAGE SCHEMA
-- Target Host: localhost:5432 | Database: mindf31 | User: mindf31
-- Zero Supabase dependencies — Pure PostgreSQL relational & binary/base64 storage
-- ============================================================================

-- 1. STORAGE BUCKETS TABLE (Native PostgreSQL Storage Buckets)
CREATE TABLE IF NOT EXISTS storage_buckets (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  file_size_limit BIGINT NOT NULL DEFAULT 15728640, -- 15 MB default
  allowed_mime_types TEXT[] DEFAULT ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. STORAGE OBJECTS TABLE (Native PostgreSQL File/Image Storage)
CREATE TABLE IF NOT EXISTS storage_objects (
  id SERIAL PRIMARY KEY,
  bucket_id VARCHAR(100) NOT NULL REFERENCES storage_buckets(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL DEFAULT 'image/png',
  size_bytes INTEGER NOT NULL DEFAULT 0,
  base64_data TEXT NOT NULL,
  public_url TEXT NOT NULL,
  alt_text TEXT,
  uploaded_by VARCHAR(150) DEFAULT 'Mindfree Admin',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(bucket_id, file_name)
);

-- 3. PRODUCTS TABLE (Mattress Catalogue & Specifications)
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(100) PRIMARY KEY,
  slug VARCHAR(150) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  tagline TEXT NOT NULL,
  categories TEXT[] NOT NULL DEFAULT '{}',
  top_finish_style VARCHAR(120) NOT NULL DEFAULT 'Tight Top',
  warranty_months INTEGER NOT NULL DEFAULT 60,
  starting_price INTEGER NOT NULL,
  mrp_price INTEGER NOT NULL,
  hero_image TEXT NOT NULL,
  cooling_image TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  thickness_options INTEGER[] NOT NULL DEFAULT '{6,8}',
  price_matrix JSONB NOT NULL DEFAULT '[]'::jsonb,
  highlights TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PILLOWS & ACCESSORIES TABLE
CREATE TABLE IF NOT EXISTS pillows_accessories (
  id VARCHAR(100) PRIMARY KEY,
  slug VARCHAR(150) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  tagline TEXT NOT NULL,
  category VARCHAR(80) NOT NULL DEFAULT 'pillow',
  badge VARCHAR(100),
  price INTEGER NOT NULL,
  original_price INTEGER NOT NULL,
  rating NUMERIC(3,2) NOT NULL DEFAULT 4.80,
  reviews_count INTEGER NOT NULL DEFAULT 100,
  image TEXT NOT NULL,
  firmness_or_loft VARCHAR(150),
  material VARCHAR(255),
  key_features TEXT[] DEFAULT '{}',
  sizes JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
  id VARCHAR(100) PRIMARY KEY,
  full_name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  phone VARCHAR(40) NOT NULL,
  client_tier VARCHAR(100) NOT NULL DEFAULT 'Mindfree Atelier Patron',
  member_since_year INTEGER NOT NULL DEFAULT 2026,
  saved_addresses JSONB NOT NULL DEFAULT '[]'::jsonb,
  wishlist TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  order_id VARCHAR(80) PRIMARY KEY,
  customer_email VARCHAR(200) NOT NULL,
  customer_phone VARCHAR(40) NOT NULL,
  customer_info JSONB NOT NULL,
  items JSONB NOT NULL,
  subtotal INTEGER NOT NULL,
  total_savings INTEGER NOT NULL DEFAULT 0,
  shipping INTEGER NOT NULL DEFAULT 0,
  tax INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_status VARCHAR(60) NOT NULL,
  order_status VARCHAR(60) NOT NULL DEFAULT 'Confirmed',
  tracking_number VARCHAR(100) NOT NULL,
  courier_partner VARCHAR(200),
  estimated_delivery VARCHAR(120),
  status_history JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. GOOGLE & CUSTOMER REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(100) PRIMARY KEY,
  customer_name VARCHAR(200) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  review_date VARCHAR(40) NOT NULL,
  product_slug VARCHAR(150),
  is_verified BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. SITE CONTENT / CMS BANNERS & ROOM SHOWCASE TABLE
CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  section_key VARCHAR(120) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  badge_text VARCHAR(120),
  cta_text VARCHAR(120),
  cta_link VARCHAR(255),
  image_url TEXT,
  content_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(200) NOT NULL UNIQUE,
  source VARCHAR(80) DEFAULT 'footer',
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. CONTACT & CONCIERGE INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(40),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'New',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INDEXES FOR FAST QUERIES
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(LOWER(customer_email));
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_storage_objects_bucket ON storage_objects(bucket_id);
