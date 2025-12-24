-- Supabase SQL Schema for Artvast
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- DESIGNERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS designers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  avatar_url TEXT,
  avatar_initials VARCHAR(10) NOT NULL,
  avatar_gradient VARCHAR(100) DEFAULT 'from-[#BD9587] to-[#A2655F]',
  bio TEXT,
  specialties TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 0,
  projects_count INTEGER DEFAULT 0,
  followers_count INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE
);

-- =============================================
-- CATEGORIES TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50)
);

-- =============================================
-- PRODUCTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  designer_id UUID NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  image_url TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  features TEXT[] DEFAULT '{}',
  delivery_time VARCHAR(50) DEFAULT '5-7 days',
  license_type VARCHAR(50) DEFAULT 'Commercial Use',
  tags TEXT[] DEFAULT '{}',
  bestseller BOOLEAN DEFAULT FALSE,
  trending BOOLEAN DEFAULT FALSE
);

-- =============================================
-- PORTFOLIO ITEMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  designer_id UUID NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  image_url TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE
);

-- =============================================
-- REVIEWS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name VARCHAR(255) NOT NULL,
  author_avatar VARCHAR(10),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL
);

-- =============================================
-- FEATURED WORKS TABLE (for designer profiles)
-- =============================================
CREATE TABLE IF NOT EXISTS featured_works (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  designer_id UUID NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  image VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  "order" INTEGER DEFAULT 0
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX IF NOT EXISTS idx_products_designer_id ON products(designer_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_designer_id ON portfolio_items(designer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_designers_verified ON designers(verified);
CREATE INDEX IF NOT EXISTS idx_designers_username ON designers(username);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS
ALTER TABLE designers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Designers: Anyone can read, only owner can update
CREATE POLICY "Designers are viewable by everyone" ON designers
  FOR SELECT USING (true);

CREATE POLICY "Users can update own designer profile" ON designers
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create designer profile" ON designers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Products: Anyone can read, only designer owner can modify
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

CREATE POLICY "Designers can create products" ON products
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM designers WHERE id = designer_id AND user_id = auth.uid())
  );

CREATE POLICY "Designers can update own products" ON products
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM designers WHERE id = designer_id AND user_id = auth.uid())
  );

CREATE POLICY "Designers can delete own products" ON products
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM designers WHERE id = designer_id AND user_id = auth.uid())
  );

-- Portfolio Items: Anyone can read, only owner can modify
CREATE POLICY "Portfolio items are viewable by everyone" ON portfolio_items
  FOR SELECT USING (true);

CREATE POLICY "Designers can manage own portfolio" ON portfolio_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM designers WHERE id = designer_id AND user_id = auth.uid())
  );

-- Reviews: Anyone can read, authenticated users can create
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);

-- Featured Works: Anyone can read
CREATE POLICY "Featured works are viewable by everyone" ON featured_works
  FOR SELECT USING (true);

CREATE POLICY "Designers can manage own featured works" ON featured_works
  FOR ALL USING (
    EXISTS (SELECT 1 FROM designers WHERE id = designer_id AND user_id = auth.uid())
  );

-- Categories: Anyone can read
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_designers_updated_at
  BEFORE UPDATE ON designers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_items_updated_at
  BEFORE UPDATE ON portfolio_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SEED DATA (Optional - for testing)
-- =============================================

-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
  ('Branding', 'branding', 'Logo design, brand identity, and visual systems'),
  ('UI/UX Design', 'ui-ux-design', 'User interface and experience design'),
  ('Motion Graphics', 'motion-graphics', 'Animations and motion design'),
  ('Illustration', 'illustration', 'Digital and traditional illustrations'),
  ('Graphic Design', 'graphic-design', 'Posters, flyers, and print design'),
  ('Photography', 'photography', 'Professional photography services')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample designers
INSERT INTO designers (id, name, username, avatar_initials, avatar_gradient, specialties, rating, projects_count, followers_count, verified) VALUES
  ('d1111111-1111-1111-1111-111111111111', 'Sarah Anderson', '@sarahdesigns', 'SA', 'from-[#BD9587] to-[#A2655F]', ARRAY['Branding', 'UI'], 4.9, 48, 2847, true),
  ('d2222222-2222-2222-2222-222222222222', 'Michael Chen', '@mikechen', 'MC', 'from-[#8B5A8C] to-[#5D6BC6]', ARRAY['Illustration', 'Modern'], 4.8, 62, 3120, true),
  ('d3333333-3333-3333-3333-333333333333', 'Emma Rodriguez', '@emmarodriguez', 'ER', 'from-[#5D6BC6] to-[#1647A3]', ARRAY['UI', 'Modern'], 5.0, 35, 1890, true),
  ('d4444444-4444-4444-4444-444444444444', 'James Wilson', '@jameswilson', 'JW', 'from-[#A2655F] to-[#8B5A8C]', ARRAY['Branding', 'Illustration'], 4.7, 41, 2345, false),
  ('d5555555-5555-5555-5555-555555555555', 'Sophia Lee', '@sophialee', 'SL', 'from-[#BD9587] to-[#5D6BC6]', ARRAY['UI', 'Branding'], 4.9, 56, 4120, true)
ON CONFLICT DO NOTHING;

-- Insert sample featured works
INSERT INTO featured_works (designer_id, image, title, "order") VALUES
  ('d1111111-1111-1111-1111-111111111111', '🎨', 'Brand Identity', 1),
  ('d1111111-1111-1111-1111-111111111111', '💼', 'Logo Design', 2),
  ('d1111111-1111-1111-1111-111111111111', '✨', 'UI Kit', 3),
  ('d2222222-2222-2222-2222-222222222222', '🎭', 'Character Design', 1),
  ('d2222222-2222-2222-2222-222222222222', '🌈', 'Illustrations', 2),
  ('d3333333-3333-3333-3333-333333333333', '📱', 'Mobile App', 1),
  ('d3333333-3333-3333-3333-333333333333', '💻', 'Web Design', 2)
ON CONFLICT DO NOTHING;

-- Insert sample products
INSERT INTO products (id, designer_id, name, description, category, price, original_price, rating, review_count, image_url, featured, features, delivery_time, bestseller) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'Premium Logo Design Package', 'Professional logo design service with unlimited revisions. Perfect for startups and businesses looking to establish their brand identity.', 'Branding', 299, 399, 4.9, 127, '🎨', true, ARRAY['3 Initial Concepts', 'Unlimited Revisions', 'Vector Files', 'Brand Guidelines'], '5-7 days', true),
  ('a2222222-2222-2222-2222-222222222222', 'd3333333-3333-3333-3333-333333333333', 'Modern Website UI/UX Design', 'Complete website design with modern aesthetics and excellent user experience.', 'UI/UX Design', 599, 799, 4.8, 89, '💻', true, ARRAY['Full UI Design', 'Responsive Design', 'Figma Files', 'Design System'], '10-14 days', false),
  ('a3333333-3333-3333-3333-333333333333', 'd2222222-2222-2222-2222-222222222222', 'Custom Illustration Pack', 'Unique hand-crafted illustrations for your projects.', 'Illustration', 199, NULL, 5.0, 45, '🎭', false, ARRAY['5 Custom Illustrations', 'Commercial License', 'High Resolution', 'Revisions Included'], '7-10 days', false)
ON CONFLICT DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (product_id, author_name, author_avatar, rating, comment) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'John Doe', 'JD', 5, 'Excellent work! The designer understood my vision perfectly and delivered beyond expectations.'),
  ('a1111111-1111-1111-1111-111111111111', 'Jane Smith', 'JS', 5, 'Very professional and responsive. Would definitely work with again!'),
  ('a1111111-1111-1111-1111-111111111111', 'Mike Johnson', 'MJ', 4, 'Great quality work. Communication was clear throughout the project.')
ON CONFLICT DO NOTHING;
