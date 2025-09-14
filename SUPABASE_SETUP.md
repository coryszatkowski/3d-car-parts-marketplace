# 🚀 Supabase Setup Guide

This guide will help you set up Supabase for the 3D Car Parts Marketplace.

## 📋 Prerequisites

- A Supabase account (free at [supabase.com](https://supabase.com))
- Node.js 18+ installed
- Your project cloned locally

## 🔧 Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `3d-car-parts-marketplace` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be ready (2-3 minutes)

## 🔑 Step 2: Get API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## ⚙️ Step 3: Configure Environment Variables

1. Open `.env.local` in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 🗄️ Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the entire contents of `supabase-setup.sql`
4. Click "Run" to execute the SQL

This will create:

- ✅ `profiles` table for user data
- ✅ `products` table for 3D parts
- ✅ `favorites` table for user favorites
- ✅ `reviews` table for product reviews
- ✅ Row Level Security (RLS) policies
- ✅ Triggers for automatic profile creation

## 🔐 Step 5: Configure Authentication

1. Go to **Authentication** → **Settings**
2. Under **Site URL**, add your development URL:
   - `http://localhost:5173` (for development)
   - Your production URL (when deployed)
3. Under **Redirect URLs**, add:
   - `http://localhost:5173/**` (for development)
   - Your production URL with `/**` (when deployed)

## 🧪 Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:5173`
3. Try to sign up for a new account
4. Check your Supabase dashboard → **Authentication** → **Users** to see if the user was created
5. Check **Table Editor** → **profiles** to see if the profile was created

## 🚨 Troubleshooting

### "Invalid API key" error

- Double-check your `.env.local` file
- Make sure you copied the correct anon key (not the service role key)
- Restart your development server after changing environment variables

### "Profile not found" error

- Check that the SQL schema was run successfully
- Look at the browser console for detailed error messages
- Verify the `profiles` table exists in your Supabase dashboard

### Authentication not working

- Check that your Site URL and Redirect URLs are configured correctly
- Make sure you're using the correct project URL and anon key
- Check the Supabase logs in your dashboard

## 📊 Database Schema Overview

### Profiles Table

- `id` - UUID (matches auth.users.id)
- `username` - Unique username
- `full_name` - User's display name
- `avatar_url` - Profile picture URL
- `bio` - User biography
- `website` - User's website
- `is_creator` - Whether user can create products
- `created_at` - Account creation timestamp
- `updated_at` - Last profile update timestamp

### Products Table

- `id` - Unique product ID
- `title` - Product name
- `description` - Product description
- `price` - Price in decimal
- `image_url` - Product image
- `stl_file_url` - 3D file download link
- `creator_id` - Reference to profiles.id
- `category` - Product category
- `fitment` - Vehicle compatibility (JSON)
- `specifications` - Technical specs (JSON)
- `print_settings` - Recommended settings (JSON)
- `is_published` - Whether product is public

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Policies** ensure users can only access their own data
- **Automatic profile creation** when users sign up
- **Secure authentication** with Supabase Auth

## 📁 Storage Setup (Required for File Uploads)

After running the SQL commands, you need to enable Storage in your Supabase project:

1. Go to **Storage** in your Supabase dashboard
2. The SQL script should have created `product-images` and `stl-files` buckets
3. If not created automatically, create them manually:
   - Bucket name: `product-images` (Public: Yes)
   - Bucket name: `stl-files` (Public: Yes)

## 🚀 Next Steps

Once your Supabase setup is complete:

1. **Test user registration and login**
2. **Enable Storage buckets** (see Storage Setup above)
3. **Test product creation** with file uploads
4. **Create some sample products** in the products table
5. **Deploy your app** and update the Site URL in Supabase

## 📞 Need Help?

- Check the [Supabase Documentation](https://supabase.com/docs)
- Look at the browser console for error messages
- Check the Supabase logs in your dashboard
- Verify all environment variables are set correctly

---

Your 3D Car Parts Marketplace is now ready with full user authentication and database support! 🎉
