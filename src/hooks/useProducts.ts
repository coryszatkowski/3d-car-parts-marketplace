import { useState, useEffect } from "react";
import { Product, productAPI } from "../lib/supabase";
import { toast } from "sonner";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCreatorProducts = async (creatorId?: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await productAPI.getCreatorProducts(creatorId);

      if (error) {
        setError(error.message);
        toast.error("Failed to load products");
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchPublishedProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await productAPI.getPublishedProducts();

      if (error) {
        setError(error.message);
        toast.error("Failed to load products");
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCarCompatibility = async (carSelection: {
    year?: string | number;
    make?: string;
    model?: string;
    trim?: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } =
        await productAPI.getProductsByCarCompatibility(carSelection);

      if (error) {
        setError(error.message);
        toast.error("Failed to load products");
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const { error } = await productAPI.deleteProduct(productId);

      if (error) {
        toast.error("Failed to delete product");
      } else {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        toast.success("Product deleted successfully");
      }
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  return {
    products,
    loading,
    error,
    fetchCreatorProducts,
    fetchPublishedProducts,
    fetchProductsByCarCompatibility,
    deleteProduct,
  };
}
