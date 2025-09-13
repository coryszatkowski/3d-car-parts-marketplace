import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Package } from "lucide-react";

export function ProductFeed() {
  const navigate = useNavigate();
  const { products, loading, fetchPublishedProducts } = useProducts();

  useEffect(() => {
    fetchPublishedProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading products...</div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-card border border-border rounded-lg p-1">
            <Button variant="default" className="bg-primary text-white">
              New for My Car
            </Button>
            <Button variant="ghost" className="text-muted-foreground">
              From Creators I Follow
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-card border-border hover:border-primary/50 transition-colors group cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={product.image_url || "/placeholder-product.jpg"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-secondary text-white">
                      ${product.price.toFixed(2)}
                    </Badge>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {product.title}
                  </h3>

                  {/* Seller Info */}
                  <div className="flex items-center space-x-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage
                        src={product.creator?.avatar_url}
                        alt={product.creator?.username}
                      />
                      <AvatarFallback>
                        {product.creator?.username?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {product.creator?.username}
                    </span>
                  </div>

                  {/* Fitment Badges */}
                  <div className="flex flex-wrap gap-1">
                    {product.fitment &&
                      Array.isArray(product.fitment) &&
                      product.fitment
                        .slice(0, 2)
                        .map((fit: any, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs bg-accent text-accent-foreground"
                          >
                            {fit.year} {fit.make} {fit.model}
                          </Badge>
                        ))}
                    {product.fitment &&
                      Array.isArray(product.fitment) &&
                      product.fitment.length > 2 && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-accent text-accent-foreground"
                        >
                          +{product.fitment.length - 2} more
                        </Badge>
                      )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">No products available</h3>
            <p className="text-muted-foreground">
              Check back soon for new 3D printable car parts!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
