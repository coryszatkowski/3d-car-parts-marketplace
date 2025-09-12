import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Heart, 
  Share2, 
  Download, 
  ShoppingCart, 
  Star, 
  User, 
  Calendar, 
  Settings, 
  FileText,
  Printer,
  Gauge,
  Thermometer,
  Timer,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageCircle,
  ThumbsUp
} from "lucide-react";

export function ProductPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);

  const productImages = [
    "https://images.unsplash.com/photo-1625465329054-dde00a74a072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBtb2RpZmljYXRpb24lMjAzZCUyMHByaW50ZWQlMjBwYXJ0c3xlbnwxfHx8fDE3NTc2MjcyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1558176293-ba5d3771385f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbW90aXZlJTIwc3BvaWxlciUyMHdpbmd8ZW58MXx8fHwxNzU3NjI3MjUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1739169169463-450148af26ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHByaW50ZXIlMjBmaWxhbWVudCUyMGF1dG9tb3RpdmV8ZW58MXx8fHwxNzU3NjI3MjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with breadcrumb */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <span>Home</span>
            <span>/</span>
            <span>Honda Civic</span>
            <span>/</span>
            <span>Exterior</span>
            <span>/</span>
            <span className="text-foreground">Aggressive Front Splitter V2</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-card rounded-lg overflow-hidden group">
              <ImageWithFallback
                src={productImages[currentImageIndex]}
                alt="Product Image"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Navigation buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
                onClick={previousImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-primary' : 'bg-white/40'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail images */}
            <div className="grid grid-cols-3 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square bg-card rounded-md overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl mb-2">Aggressive Front Splitter V2</h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                      ))}
                      <span className="text-muted-foreground ml-2">(47 reviews)</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>1,234 views</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setLiked(!liked)}
                    className={liked ? 'text-secondary border-secondary' : ''}
                  >
                    <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Fitment badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  2016-2021 Honda Civic
                </Badge>
                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                  Sport/Si/Type R
                </Badge>
                <Badge variant="outline">Track Tested</Badge>
                <Badge variant="outline">Wind Tunnel Validated</Badge>
              </div>

              <div className="text-4xl mb-6">
                <span className="text-primary">$24.99</span>
                <span className="text-sm text-muted-foreground ml-2">STL Download</span>
              </div>

              <p className="text-muted-foreground mb-6">
                Engineered for maximum downforce and aggressive aesthetics. This front splitter increases front-end grip 
                while maintaining ground clearance for daily driving. CFD-optimized design with integrated undertray compatibility.
              </p>

              {/* Action buttons */}
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Instant Download
                </Button>
              </div>
            </div>

            {/* Creator info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback>AM</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4>AeroMods_Pro</h4>
                      <p className="text-sm text-muted-foreground">Professional Designer • 156 parts</p>
                    </div>
                  </div>
                  <Button
                    variant={following ? "outline" : "default"}
                    size="sm"
                    onClick={() => setFollowing(!following)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {following ? 'Following' : 'Follow'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="specifications" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="printing">Print Settings</TabsTrigger>
            <TabsTrigger value="fitment">Fitment</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Technical Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2">Dimensions</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>Length: 1,420mm (55.9")</li>
                      <li>Width: 180mm (7.1")</li>
                      <li>Height: 85mm (3.3")</li>
                      <li>Weight: ~2.1kg (4.6 lbs) printed</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2">Performance</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>+15% front downforce at 60mph</li>
                      <li>+8% brake cooling efficiency</li>
                      <li>Minimal drag coefficient increase</li>
                      <li>Ground clearance: 4.2" minimum</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2">Materials</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>Recommended: PETG, ABS, ASA</li>
                      <li>UV-resistant materials preferred</li>
                      <li>Minimum tensile strength: 40 MPa</li>
                      <li>Operating temp: -20°C to 80°C</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2">Installation</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>Hardware included in package</li>
                      <li>No drilling required</li>
                      <li>Install time: ~45 minutes</li>
                      <li>Basic tools needed</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="printing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Printer className="h-5 w-5 mr-2" />
                  Print Settings & Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4 text-primary" />
                      <h4>Print Settings</h4>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>Layer Height: 0.2-0.3mm</li>
                      <li>Infill: 15-25%</li>
                      <li>Wall Thickness: 3-4 perimeters</li>
                      <li>Print Speed: 50-80mm/s</li>
                      <li>Supports: Tree supports</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4 text-secondary" />
                      <h4>Temperature</h4>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>PETG: 230-250°C</li>
                      <li>ABS: 240-260°C</li>
                      <li>ASA: 240-260°C</li>
                      <li>Bed: 70-80°C</li>
                      <li>Chamber: 40-60°C (optional)</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Timer className="h-4 w-4 text-primary" />
                      <h4>Print Time</h4>
                    </div>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>Main Body: ~8-12 hours</li>
                      <li>Side Plates: ~2-3 hours each</li>
                      <li>Hardware Brackets: ~1 hour</li>
                      <li>Total: ~15-20 hours</li>
                      <li>Material: ~800g PETG</li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-4">Printer Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <h5 className="mb-2">Minimum Build Volume</h5>
                      <p className="text-muted-foreground">300 x 300 x 200mm</p>
                      <p className="text-sm text-muted-foreground mt-1">Most popular printers supported</p>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <h5 className="mb-2">Post-Processing</h5>
                      <p className="text-muted-foreground">Light sanding recommended</p>
                      <p className="text-sm text-muted-foreground mt-1">Primer & paint ready</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fitment" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gauge className="h-5 w-5 mr-2" />
                  Vehicle Fitment Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-4">Compatible Vehicles</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-primary/10 rounded-md border border-primary/20">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="secondary" className="bg-primary/20 text-primary">Perfect Fit</Badge>
                        </div>
                        <p>2016-2021 Honda Civic (10th Gen)</p>
                        <p className="text-sm text-muted-foreground">Sport, Si, Type R trims</p>
                      </div>
                      <div className="p-3 bg-muted/10 rounded-md border border-muted/20">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline">Minor Modification</Badge>
                        </div>
                        <p>2016-2021 Honda Civic (10th Gen)</p>
                        <p className="text-sm text-muted-foreground">LX, EX trims (requires bumper modification)</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-4">Installation Notes</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Factory undertray removal required</li>
                      <li>• OEM mounting points utilized</li>
                      <li>• No permanent modifications</li>
                      <li>• Reversible installation</li>
                      <li>• Hardware kit included</li>
                      <li>• Professional installation recommended</li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-4">Clearance Verification</h4>
                  <p className="text-muted-foreground mb-4">
                    Before printing, verify these measurements on your vehicle to ensure proper fitment:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/10 rounded-lg">
                      <h5>Ground Clearance</h5>
                      <p className="text-2xl text-primary">4.2"</p>
                      <p className="text-sm text-muted-foreground">Minimum required</p>
                    </div>
                    <div className="p-4 bg-muted/10 rounded-lg">
                      <h5>Approach Angle</h5>
                      <p className="text-2xl text-primary">12°</p>
                      <p className="text-sm text-muted-foreground">Reduced from stock</p>
                    </div>
                    <div className="p-4 bg-muted/10 rounded-lg">
                      <h5>Wheel Wells</h5>
                      <p className="text-2xl text-primary">1.5"</p>
                      <p className="text-sm text-muted-foreground">Clearance maintained</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Review Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">4.2</div>
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                        ))}
                      </div>
                      <p className="text-muted-foreground">47 reviews</p>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center space-x-2">
                          <span className="text-sm w-3">{stars}</span>
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          <Progress value={stars === 5 ? 60 : stars === 4 ? 25 : stars === 3 ? 10 : 3} className="flex-1" />
                          <span className="text-sm text-muted-foreground w-8">
                            {stars === 5 ? '28' : stars === 4 ? '12' : stars === 3 ? '5' : '2'}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h5>Print Quality</h5>
                        <Progress value={85} className="mt-1" />
                      </div>
                      <div>
                        <h5>Fitment</h5>
                        <Progress value={92} className="mt-1" />
                      </div>
                      <div>
                        <h5>Performance</h5>
                        <Progress value={88} className="mt-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {[
                  {
                    name: "SpeedDemon_2021",
                    rating: 5,
                    date: "2 weeks ago",
                    verified: true,
                    review: "Incredible quality and fitment! Printed in ASA and the surface finish is amazing. Definitely noticed improved front-end grip on track days. Installation was straightforward with the included hardware.",
                    helpful: 24,
                    vehicle: "2020 Civic Si"
                  },
                  {
                    name: "TrackRat_Honda",
                    rating: 4,
                    date: "1 month ago",
                    verified: true,
                    review: "Great design and performance improvement is noticeable. Only complaint is that it does reduce ground clearance more than expected. Had to be careful with steep driveways.",
                    helpful: 18,
                    vehicle: "2019 Civic Type R"
                  },
                  {
                    name: "PrinterPro_Mods",
                    rating: 5,
                    date: "6 weeks ago",
                    verified: true,
                    review: "As someone who prints a lot of automotive parts, this is top-tier quality. The STL files are clean, properly scaled, and print without issues. Highly recommend PETG for durability.",
                    helpful: 31,
                    vehicle: "2018 Civic Sport"
                  }
                ].map((review, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{review.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h5>{review.name}</h5>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>{review.vehicle}</span>
                              <span>•</span>
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{review.review}</p>
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Reply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <Card>
          <CardHeader>
            <CardTitle>Related Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Side Skirt Extensions", price: "$19.99", rating: 4.3, image: productImages[1] },
                { name: "Rear Diffuser Kit", price: "$34.99", rating: 4.7, image: productImages[2] },
                { name: "Canard Set (4pc)", price: "$15.99", rating: 4.1, image: productImages[0] }
              ].map((product, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-square bg-muted">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="mb-2">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-primary">{product.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}