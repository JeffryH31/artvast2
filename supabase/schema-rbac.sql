-- RBAC Schema for Role-Based Access Control
-- Run this in your Supabase SQL Editor

-- =============================================
-- ADD ROLE TO PROFILES TABLE
-- =============================================
-- Add role column to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user' 
CHECK (role IN ('user', 'designer', 'admin'));

-- Add is_verified column for designers
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;

-- Create index for faster role queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- =============================================
-- UPDATE TRIGGER TO SET DEFAULT ROLE
-- =============================================
-- Update the handle_new_user function to include role
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- DESIGNER APPLICATION TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS designer_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  designer_name VARCHAR(255) NOT NULL,
  portfolio_url TEXT,
  description TEXT NOT NULL,
  specialties TEXT[] DEFAULT '{}',
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  rejection_reason TEXT,
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_designer_applications_status ON designer_applications(status);
CREATE INDEX IF NOT EXISTS idx_designer_applications_user_id ON designer_applications(user_id);

-- =============================================
-- RLS POLICIES FOR DESIGNER_APPLICATIONS
-- =============================================
ALTER TABLE designer_applications ENABLE ROW LEVEL SECURITY;

-- Users can view their own applications
CREATE POLICY "Users can view own designer application" ON designer_applications
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own application
CREATE POLICY "Users can create designer application" ON designer_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view all applications
CREATE POLICY "Admins can view all designer applications" ON designer_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update applications (approve/reject)
CREATE POLICY "Admins can update designer applications" ON designer_applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =============================================
-- UPDATE PRODUCTS RLS FOR DESIGNERS
-- =============================================
-- Drop old policies and create new ones with role check

-- Designers can create products only if they have designer role
DROP POLICY IF EXISTS "Designers can create products" ON products;
CREATE POLICY "Designers can create products" ON products
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM designers 
      WHERE id = designer_id 
      AND user_id = auth.uid()
    )
    AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('designer', 'admin')
    )
  );

-- Designers can only update their own products
DROP POLICY IF EXISTS "Designers can update own products" ON products;
CREATE POLICY "Designers can update own products" ON products
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM designers 
      WHERE id = designer_id 
      AND user_id = auth.uid()
    )
    AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('designer', 'admin')
    )
  );

-- Designers can only delete their own products
DROP POLICY IF EXISTS "Designers can delete own products" ON products;
CREATE POLICY "Designers can delete own products" ON products
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM designers 
      WHERE id = designer_id 
      AND user_id = auth.uid()
    )
    AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('designer', 'admin')
    )
  );

-- =============================================
-- UPDATE PORTFOLIO_ITEMS RLS FOR DESIGNERS
-- =============================================
-- Only designers can manage portfolio items
DROP POLICY IF EXISTS "Designers can manage own portfolio" ON portfolio_items;
CREATE POLICY "Designers can manage own portfolio" ON portfolio_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM designers 
      WHERE id = designer_id 
      AND user_id = auth.uid()
    )
    AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('designer', 'admin')
    )
  );

-- =============================================
-- HELPER FUNCTIONS FOR ROLE CHECKING
-- =============================================

-- Function to check if user is designer
CREATE OR REPLACE FUNCTION is_designer(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = user_id AND role IN ('designer', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to promote user to designer
CREATE OR REPLACE FUNCTION promote_to_designer(user_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Check if caller is admin
  IF NOT is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Only admins can promote users to designer';
  END IF;
  
  -- Update user role
  UPDATE profiles 
  SET role = 'designer', is_verified = TRUE
  WHERE id = user_id;
  
  -- Approve their application if exists
  UPDATE designer_applications
  SET status = 'approved', 
      reviewed_at = NOW(), 
      reviewed_by = auth.uid()
  WHERE user_id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- ANALYTICS TABLE FOR DESIGNERS
-- =============================================
CREATE TABLE IF NOT EXISTS designer_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  designer_id UUID NOT NULL REFERENCES designers(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  views INTEGER DEFAULT 0,
  sales INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  UNIQUE(designer_id, date)
);

CREATE INDEX IF NOT EXISTS idx_designer_analytics_designer_date ON designer_analytics(designer_id, date);

-- RLS for analytics
ALTER TABLE designer_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Designers can view own analytics" ON designer_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM designers 
      WHERE id = designer_id 
      AND user_id = auth.uid()
    )
  );
