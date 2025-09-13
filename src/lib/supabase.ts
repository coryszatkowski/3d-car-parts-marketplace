import { createClient, User as SupabaseUser } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMessage = "❌ Supabase environment variables are missing!";
  console.error(errorMessage);
  console.error("Please create a .env.local file with:");
  console.error("VITE_SUPABASE_URL=your_supabase_project_url");
  console.error("VITE_SUPABASE_ANON_KEY=your_supabase_anon_key");
  throw new Error(errorMessage);
}

// Create Supabase client with real credentials
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Re-export Supabase User type for consistency
export type User = SupabaseUser;

// Profile type matching the database schema
export type Profile = {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  is_creator: boolean;
  created_at: string;
  updated_at: string;
};

// Car type for user garage
export type Car = {
  id: string;
  user_id: string;
  make: string;
  model: string;
  year: number;
  trim?: string;
  color?: string;
  vin?: string;
  notes?: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
};

// Car input type for creating/updating cars
export type CarInput = {
  make: string;
  model: string;
  year: number;
  trim?: string;
  color?: string;
  vin?: string;
  notes?: string;
  is_primary?: boolean;
};
