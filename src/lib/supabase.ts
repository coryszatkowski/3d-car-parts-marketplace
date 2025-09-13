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

// Product types
export type Product = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  stl_file_url: string | null;
  creator_id: string;
  category: string | null;
  fitment: ProductFitment[] | null; // JSONB for vehicle compatibility
  specifications: ProductSpecifications | null; // JSONB for technical specs
  print_settings: PrintSettings | null; // JSONB for print settings
  is_published: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  creator?: Profile;
  tags?: string[];
};

export type ProductInput = {
  title: string;
  description?: string;
  price: number;
  image_url?: string;
  stl_file_url?: string;
  category?: string;
  fitment?: ProductFitment[];
  specifications?: ProductSpecifications;
  print_settings?: PrintSettings;
  is_published?: boolean;
  tags?: string[];
};

// Product fitment type for easier handling
export type ProductFitment = {
  make: string;
  model: string;
  year: number;
  trim?: string;
  engine?: string;
};

// Print settings type
export type PrintSettings = {
  layer_height?: number;
  infill_percentage?: number;
  supports?: boolean;
  print_speed?: number;
  nozzle_temperature?: number;
  bed_temperature?: number;
  material_recommendation?: string[];
  estimated_print_time?: string;
  estimated_material_usage?: string;
};

// Product specifications type
export type ProductSpecifications = {
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    weight?: number;
  };
  materials?: string[];
  installation_difficulty?: "Easy" | "Medium" | "Hard" | "Professional";
  tools_required?: string[];
  installation_time?: string;
  performance_gains?: string[];
};

// Product API functions
export const productAPI = {
  // Create a new product
  async createProduct(
    productData: ProductInput
  ): Promise<{ data: Product | null; error: any }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return { data: null, error: { message: "User not authenticated" } };
      }

      const { data, error } = await supabase
        .from("products")
        .insert([
          {
            ...productData,
            creator_id: user.id,
          },
        ])
        .select(
          `
          *,
          creator:profiles(*)
        `
        )
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get products by creator
  async getCreatorProducts(
    creatorId?: string
  ): Promise<{ data: Product[] | null; error: any }> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const targetCreatorId = creatorId || user?.id;

      if (!targetCreatorId) {
        return { data: null, error: { message: "No creator ID provided" } };
      }

      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          creator:profiles(*)
        `
        )
        .eq("creator_id", targetCreatorId)
        .order("created_at", { ascending: false });

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get published products (for the main feed)
  async getPublishedProducts(): Promise<{
    data: Product[] | null;
    error: any;
  }> {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          creator:profiles(*)
        `
        )
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get a single product by ID
  async getProduct(id: string): Promise<{ data: Product | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          creator:profiles(*)
        `
        )
        .eq("id", id)
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update a product
  async updateProduct(
    id: string,
    updates: Partial<ProductInput>
  ): Promise<{ data: Product | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", id)
        .select(
          `
          *,
          creator:profiles(*)
        `
        )
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Delete a product
  async deleteProduct(id: string): Promise<{ error: any }> {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      return { error };
    } catch (error) {
      return { error };
    }
  },

  // Upload file to Supabase Storage
  async uploadFile(
    file: File,
    bucket: string,
    path: string
  ): Promise<{ data: { path: string; url: string } | null; error: any }> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file);

      if (error) {
        return { data: null, error };
      }

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return {
        data: {
          path: data.path,
          url: urlData.publicUrl,
        },
        error: null,
      };
    } catch (error) {
      return { data: null, error };
    }
  },
};
