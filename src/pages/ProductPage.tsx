import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productAPI, Product } from "../lib/supabase";
import { ProductPage as ProductPageComponent } from "../components/ProductPage";
import { Button } from "../components/ui/button";
import { ChevronLeft, Package } from "lucide-react";
import { toast } from "sonner";

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID not found");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await productAPI.getProductById(id);
        if (error) {
          console.error("Error fetching product:", error);
          setError("Failed to load product");
          toast.error("Failed to load product");
        } else if (!data) {
          setError("Product not found");
        } else {
          setProduct(data);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBackClick = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8 text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-4 opacity-50 animate-pulse" />
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={handleBackClick} className="mb-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        <div className="text-center py-8 text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">Product Not Found</p>
          <p className="text-sm mb-4">
            {error || "The product you are looking for does not exist."}
          </p>
          <Button onClick={handleBackClick}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" onClick={handleBackClick} className="mb-4">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>
      <ProductPageComponent product={product} onBackClick={handleBackClick} />
    </div>
  );
}
