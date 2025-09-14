-- Simple Product Table Setup
-- Run this in your Supabase SQL Editor

-- Create products table if it doesn't exist
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  stl_file_url TEXT,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  category TEXT,
  fitment JSONB,
  specifications JSONB,
  print_settings JSONB,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create updated_at function if it doesn't exist
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at trigger to products if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'handle_updated_at_products'
  ) THEN
    CREATE TRIGGER handle_updated_at_products
      BEFORE UPDATE ON products
      FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
  END IF;
END $$;

-- Products policies (these will error if they already exist, which is fine)
DO $$ 
BEGIN
  BEGIN
    CREATE POLICY "Published products are viewable by everyone" ON products
      FOR SELECT USING (is_published = true);
  EXCEPTION WHEN duplicate_object THEN
    NULL; -- Policy already exists
  END;

  BEGIN
    CREATE POLICY "Creators can view their own products" ON products
      FOR SELECT USING (auth.uid() = creator_id);
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;

  BEGIN
    CREATE POLICY "Creators can insert their own products" ON products
      FOR INSERT WITH CHECK (auth.uid() = creator_id);
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;

  BEGIN
    CREATE POLICY "Creators can update their own products" ON products
      FOR UPDATE USING (auth.uid() = creator_id);
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
END $$;
