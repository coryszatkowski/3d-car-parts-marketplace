import { createClient } from '@supabase/supabase-js'

// Use completely dummy but valid-format values to prevent client validation errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dummy.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.dummy'

// Only warn in development if variables are missing - don't break production
if ((!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) && import.meta.env.DEV) {
  console.warn('Supabase environment variables not configured - auth features will be disabled')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth types
export type User = {
  id: string
  email: string
  user_metadata: {
    full_name?: string
    avatar_url?: string
    username?: string
  }
}

export type Profile = {
  id: string
  username: string
  full_name: string
  avatar_url?: string
  bio?: string
  website?: string
  is_creator: boolean
  created_at: string
  updated_at: string
}
