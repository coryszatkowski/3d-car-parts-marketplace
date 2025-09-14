import { createContext, useContext, useState, useEffect } from "react";
import { supabase, User, Profile, Car, CarInput } from "../lib/supabase";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  cars: Car[];
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    metadata?: any
  ) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
  addCar: (carData: CarInput) => Promise<{ error: any }>;
  updateCar: (
    carId: string,
    updates: Partial<CarInput>
  ) => Promise<{ error: any }>;
  deleteCar: (carId: string) => Promise<{ error: any }>;
  setPrimaryCar: (carId: string) => Promise<{ error: any }>;
  becomeCreator: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchCars(session.user.id);
      }
      setLoading(false);
    });

    // Listen for changes on auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        fetchCars(session.user.id);
      } else {
        setProfile(null);
        setCars([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);

        // Check if it's a table not found error
        if (
          error.message.includes("Could not find the table") ||
          error.message.includes('relation "profiles" does not exist')
        ) {
          console.error(
            "💡 Database setup needed. Run the SQL commands from supabase-setup.sql in your Supabase dashboard."
          );
          return;
        }

        // If profile doesn't exist, create one
        await createProfile(userId);
        return;
      }
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const createProfile = async (userId: string) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { error } = await supabase.from("profiles").insert([
        {
          id: userId,
          username:
            user.user.user_metadata?.username ||
            user.user.email?.split("@")[0] ||
            "user",
          full_name:
            user.user.user_metadata?.full_name ||
            user.user.email?.split("@")[0] ||
            "User",
          avatar_url: user.user.user_metadata?.avatar_url,
          is_creator: false,
        },
      ]);

      if (error) {
        console.error("Error creating profile:", error);

        // Check if it's a table not found error
        if (
          error.message.includes("Could not find the table") ||
          error.message.includes('relation "profiles" does not exist')
        ) {
          toast.error(
            "Database not set up. Please run the setup script in Supabase dashboard."
          );
          console.error(
            "💡 Database setup needed. Run the SQL commands from supabase-setup.sql in your Supabase dashboard."
          );
        } else {
          toast.error("Failed to create user profile");
        }
      } else {
        // Fetch the newly created profile
        await fetchProfile(userId);
      }
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Failed to create user profile");
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return { error };
      }

      toast.success("Successfully signed in!");
      return { error: null };
    } catch (error) {
      toast.error("An unexpected error occurred");
      return { error };
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) {
        toast.error(error.message);
        return { error };
      }

      // Create profile after signup
      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            username:
              metadata?.username || data.user.email?.split("@")[0] || "user",
            full_name:
              metadata?.full_name || data.user.email?.split("@")[0] || "User",
            avatar_url: metadata?.avatar_url,
            is_creator: false,
          },
        ]);

        if (profileError) {
          console.error("Error creating profile:", profileError);
          toast.error(
            "Account created but profile setup failed. Please try logging in."
          );
        }
      }

      toast.success(
        "Account created successfully! Please check your email to verify your account."
      );
      return { error: null };
    } catch (error) {
      toast.error("An unexpected error occurred");
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
      }

      return { error };
    } catch (error) {
      toast.error("Authentication service unavailable");
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setProfile(null);
      toast.success("Successfully signed out");
    } catch (error) {
      toast.error("Error signing out");
      console.error("Error:", error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message);
        return { error };
      }

      toast.success("Password reset email sent! Check your inbox.");
      return { error: null };
    } catch (error) {
      toast.error("An unexpected error occurred");
      return { error };
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) throw new Error("No user logged in");

      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

      if (error) {
        toast.error(error.message);
        return { error };
      }

      setProfile((prev) => (prev ? { ...prev, ...updates } : null));
      toast.success("Profile updated successfully");
      return { error: null };
    } catch (error) {
      toast.error("Error updating profile");
      return { error };
    }
  };

  const fetchCars = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_garage")
        .select("*")
        .eq("user_id", userId)
        .order("is_primary", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching cars:", error);
        return;
      }
      setCars(data || []);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const addCar = async (carData: CarInput) => {
    try {
      if (!user) throw new Error("No user logged in");

      // If this is being set as primary, unset other primary cars first
      if (carData.is_primary) {
        await supabase
          .from("user_garage")
          .update({ is_primary: false })
          .eq("user_id", user.id);
      }

      const { data, error } = await supabase
        .from("user_garage")
        .insert([{ ...carData, user_id: user.id }])
        .select()
        .single();

      if (error) {
        toast.error(error.message);
        return { error };
      }

      setCars((prev) => [data, ...prev]);
      toast.success("Car added to garage successfully");
      return { error: null };
    } catch (error) {
      toast.error("Error adding car to garage");
      return { error };
    }
  };

  const updateCar = async (carId: string, updates: Partial<CarInput>) => {
    try {
      if (!user) throw new Error("No user logged in");

      // If this is being set as primary, unset other primary cars first
      if (updates.is_primary) {
        await supabase
          .from("user_garage")
          .update({ is_primary: false })
          .eq("user_id", user.id);
      }

      const { data, error } = await supabase
        .from("user_garage")
        .update(updates)
        .eq("id", carId)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) {
        toast.error(error.message);
        return { error };
      }

      setCars((prev) => prev.map((car) => (car.id === carId ? data : car)));
      toast.success("Car updated successfully");
      return { error: null };
    } catch (error) {
      toast.error("Error updating car");
      return { error };
    }
  };

  const deleteCar = async (carId: string) => {
    try {
      if (!user) throw new Error("No user logged in");

      const { error } = await supabase
        .from("user_garage")
        .delete()
        .eq("id", carId)
        .eq("user_id", user.id);

      if (error) {
        toast.error(error.message);
        return { error };
      }

      setCars((prev) => prev.filter((car) => car.id !== carId));
      toast.success("Car removed from garage");
      return { error: null };
    } catch (error) {
      toast.error("Error removing car from garage");
      return { error };
    }
  };

  const setPrimaryCar = async (carId: string) => {
    try {
      if (!user) throw new Error("No user logged in");

      // First, unset all primary cars
      await supabase
        .from("user_garage")
        .update({ is_primary: false })
        .eq("user_id", user.id);

      // Then set the selected car as primary
      const { error } = await supabase
        .from("user_garage")
        .update({ is_primary: true })
        .eq("id", carId)
        .eq("user_id", user.id);

      if (error) {
        toast.error(error.message);
        return { error };
      }

      setCars((prev) =>
        prev.map((car) => ({ ...car, is_primary: car.id === carId }))
      );
      toast.success("Primary car updated");
      return { error: null };
    } catch (error) {
      toast.error("Error setting primary car");
      return { error };
    }
  };

  const becomeCreator = async () => {
    try {
      if (!user) throw new Error("No user logged in");

      const { error } = await supabase
        .from("profiles")
        .update({ is_creator: true })
        .eq("id", user.id);

      if (error) {
        toast.error(error.message);
        return { error };
      }

      // Update local profile state
      setProfile((prev) => (prev ? { ...prev, is_creator: true } : prev));
      toast.success(
        "Welcome to WHIPLAB Creators! You can now sell your designs."
      );
      return { error: null };
    } catch (error) {
      toast.error("Error becoming a creator");
      return { error };
    }
  };

  const value = {
    user,
    profile,
    cars,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
    addCar,
    updateCar,
    deleteCar,
    setPrimaryCar,
    becomeCreator,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
