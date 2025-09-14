import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ChevronLeft, Filter, SortAsc, Package, Search } from "lucide-react";
import { Product } from "../lib/supabase";

type SortOption = "newest" | "oldest" | "price-low" | "price-high" | "popular";
type FilterOption = "all" | "interior" | "exterior" | "engine" | "performance";

export function SearchResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    products,
    loading,
    fetchPublishedProducts,
    fetchProductsByCarCompatibility,
  } = useProducts();

  // Extract car selection from URL params
  const year = searchParams.get("year");
  const make = searchParams.get("make");
  const model = searchParams.get("model");
  const trim = searchParams.get("trim");

  // State for filtering and sorting
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products based on car selection from URL params
    const carSelection = {
      year,
      make,
      model,
      trim,
    };

    // If we have any car selection criteria, use car-specific search
    if (year || make || model || trim) {
      fetchProductsByCarCompatibility(carSelection);
    } else {
      // Otherwise fetch all published products
      fetchPublishedProducts();
    }
  }, [year, make, model, trim]);

  useEffect(() => {
    if (!products.length) return;

    let filtered = [...products];

    // Apply category filter
    if (filterBy !== "all") {
      filtered = filtered.filter((product) => {
        // For now, we'll simulate categories based on product titles/descriptions
        const title = product.title.toLowerCase();
        const description = product.description?.toLowerCase() || "";

        switch (filterBy) {
          case "interior":
            return (
              title.includes("interior") ||
              title.includes("dash") ||
              title.includes("trim")
            );
          case "exterior":
            return (
              title.includes("exterior") ||
              title.includes("body") ||
              title.includes("bumper")
            );
          case "engine":
            return (
              title.includes("engine") ||
              title.includes("turbo") ||
              title.includes("intake")
            );
          case "performance":
            return (
              title.includes("performance") ||
              title.includes("sport") ||
              title.includes("racing")
            );
          default:
            return true;
        }
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        break;
      case "price-low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "popular":
        // For now, sort by created date as a proxy for popularity
        filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
    }

    setFilteredProducts(filtered);
  }, [products, sortBy, filterBy, year, make, model, trim]);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const getCarDisplayName = () => {
    if (!year && !make && !model) return "All Cars";

    const parts = [];
    if (year) parts.push(year);
    if (make) parts.push(make);
    if (model) parts.push(model);
    if (trim) parts.push(trim);

    return parts.join(" ");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">
            Parts for {getCarDisplayName()}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "part" : "parts"} found
          </p>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filter:</span>
          <Select
            value={filterBy}
            onValueChange={(value: FilterOption) => setFilterBy(value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="interior">Interior</SelectItem>
              <SelectItem value="exterior">Exterior</SelectItem>
              <SelectItem value="engine">Engine</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <SortAsc className="h-4 w-4" />
          <span className="text-sm font-medium">Sort:</span>
          <Select
            value={sortBy}
            onValueChange={(value: SortOption) => setSortBy(value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Parts Found</h2>
          <p className="text-muted-foreground mb-4">
            No parts are currently available for {getCarDisplayName()}.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Check back later or try browsing all available parts.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => navigate("/")}>
              Browse All Parts
            </Button>
            <Button onClick={() => navigate("/create-product")}>
              Create a Part
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-card border-border hover:border-primary/50 transition-colors group cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="aspect-square bg-muted relative overflow-hidden rounded-t-lg">
                  {product.image_url ? (
                    <ImageWithFallback
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}

                  {/* Price badge */}
                  {product.price && (
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant="secondary"
                        className="bg-background/90 backdrop-blur"
                      >
                        ${product.price}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {product.title}
                  </h3>

                  {product.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {/* Creator info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {product.creator?.username?.[0]?.toUpperCase() || "U"}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {product.creator?.username || "Unknown"}
                      </span>
                    </div>

                    <Badge variant="outline" className="text-xs">
                      {product.category || "Part"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
