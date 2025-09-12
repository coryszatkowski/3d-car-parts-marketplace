// Temporarily disable Supabase to fix deployment
// import { createClient } from '@supabase/supabase-js'

// Mock Supabase client for demo purposes
const mockSupabaseClient = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: () => Promise.resolve({ error: { message: 'Demo mode - auth disabled' } }),
    signUp: () => Promise.resolve({ error: { message: 'Demo mode - auth disabled' } }),
    signOut: () => Promise.resolve({ error: null }),
    resetPasswordForEmail: () => Promise.resolve({ error: { message: 'Demo mode - auth disabled' } })
  },
  from: () => ({
    select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Demo mode - database disabled' } }) }) }),
    update: () => ({ eq: () => Promise.resolve({ error: { message: 'Demo mode - database disabled' } }) })
  })
}

export const supabase = mockSupabaseClient

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
