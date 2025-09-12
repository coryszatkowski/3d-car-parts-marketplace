import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Only warn in development if variables are missing - don't break production
if ((!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) && import.meta.env.DEV) {
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