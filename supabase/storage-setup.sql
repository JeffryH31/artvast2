-- Supabase Storage Buckets Setup
-- Run this in Supabase Dashboard -> Storage

-- 1. Create product-images bucket
-- Go to Storage -> Create new bucket
-- Name: product-images
-- Public: true (for product images)
-- File size limit: 5MB
-- Allowed MIME types: image/jpeg, image/png, image/webp, image/gif

-- 2. Create RLS policies for product-images bucket

-- Allow public read access
CREATE POLICY "Public Access for Product Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Allow authenticated designers to upload
CREATE POLICY "Designers can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
  AND EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'designer'
  )
);

-- Allow designers to update their own images
CREATE POLICY "Designers can update their product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
  AND EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'designer'
  )
);

-- Allow designers to delete their own images
CREATE POLICY "Designers can delete their product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images'
  AND auth.role() = 'authenticated'
  AND EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'designer'
  )
);

-- 3. Create designer-avatars bucket (optional)
-- Name: designer-avatars
-- Public: true
-- File size limit: 2MB
-- Allowed MIME types: image/jpeg, image/png, image/webp

-- Policies for designer-avatars
CREATE POLICY "Public Access for Designer Avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'designer-avatars');

CREATE POLICY "Designers can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'designer-avatars'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'designer-avatars'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can delete their avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'designer-avatars'
  AND auth.role() = 'authenticated'
);
