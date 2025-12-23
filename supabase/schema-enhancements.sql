-- Add dark mode preference to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS dark_mode BOOLEAN DEFAULT false;

-- Add notification preferences
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS email_notifications BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS marketing_emails BOOLEAN DEFAULT false;

-- Create table for product views tracking
CREATE TABLE IF NOT EXISTS product_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  UNIQUE(product_id, user_id, created_at::date) -- One view per user per day
);

CREATE INDEX IF NOT EXISTS idx_product_views_product_id ON product_views(product_id);
CREATE INDEX IF NOT EXISTS idx_product_views_created_at ON product_views(created_at);

-- RLS for product_views
ALTER TABLE product_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert views"
ON product_views FOR INSERT
WITH CHECK (true);

CREATE POLICY "Designers can see their product views"
ON product_views FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM products
    JOIN designers ON products.designer_id = designers.id
    WHERE products.id = product_views.product_id
    AND designers.user_id = auth.uid()
  )
);

-- Create function to get product view count
CREATE OR REPLACE FUNCTION get_product_view_count(p_product_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM product_views
    WHERE product_id = p_product_id
  );
END;
$$ LANGUAGE plpgsql;

-- Add social links to designers
ALTER TABLE designers
ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}';

-- Example social_links structure:
-- {
--   "instagram": "username",
--   "behance": "username",
--   "dribbble": "username",
--   "twitter": "username"
-- }
