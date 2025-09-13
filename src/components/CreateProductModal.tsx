import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  productAPI,
  ProductInput,
  ProductFitment,
  PrintSettings,
  ProductSpecifications,
} from "../lib/supabase";
import { CarSelector } from "./car/CarSelector";
import { useCarCatalog } from "../hooks/useCarCatalog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import {
  Upload,
  X,
  Plus,
  Package,
  Settings,
  Printer,
  Car as CarIcon,
  Tag,
  DollarSign,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated?: () => void;
}

const PRODUCT_CATEGORIES = [
  "Exterior",
  "Interior",
  "Engine",
  "Suspension",
  "Wheels & Tires",
  "Lighting",
  "Electronics",
  "Tools & Accessories",
  "Performance",
  "Aesthetic",
];

const INSTALLATION_DIFFICULTIES = [
  "Easy",
  "Medium",
  "Hard",
  "Professional",
] as const;

export function CreateProductModal({
  isOpen,
  onClose,
  onProductCreated,
}: CreateProductModalProps) {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Basic product info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  // Files
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [stlFile, setStlFile] = useState<File | null>(null);

  // Fitment
  const [fitmentList, setFitmentList] = useState<ProductFitment[]>([]);
  const {
    selection,
    updateSelection,
    isValidSelection,
    displayName,
    resetSelection,
  } = useCarCatalog();

  // Specifications
  const [specifications, setSpecifications] = useState<ProductSpecifications>({
    installation_difficulty: "Medium",
    materials: [],
    tools_required: [],
    performance_gains: [],
  });

  // Print settings
  const [printSettings, setPrintSettings] = useState<PrintSettings>({
    layer_height: 0.2,
    infill_percentage: 20,
    supports: false,
    material_recommendation: ["PLA"],
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSTLUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.toLowerCase().endsWith(".stl")) {
      setStlFile(file);
    } else {
      toast.error("Please select a valid STL file");
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addFitment = () => {
    if (
      isValidSelection &&
      selection.make &&
      selection.model &&
      selection.year
    ) {
      const fitment: ProductFitment = {
        make: selection.make,
        model: selection.model,
        year: selection.year,
        trim: selection.trim || undefined,
        engine: selection.engine || undefined,
      };

      const fitmentExists = fitmentList.some(
        (f) =>
          f.make === fitment.make &&
          f.model === fitment.model &&
          f.year === fitment.year &&
          f.trim === fitment.trim
      );

      if (!fitmentExists) {
        setFitmentList([...fitmentList, fitment]);
        resetSelection();
      }
    }
  };

  const removeFitment = (index: number) => {
    setFitmentList(fitmentList.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory("");
    setTags([]);
    setNewTag("");
    setImageFile(null);
    setImagePreview(null);
    setStlFile(null);
    setFitmentList([]);
    resetSelection();
    setSpecifications({
      installation_difficulty: "Medium",
      materials: [],
      tools_required: [],
      performance_gains: [],
    });
    setPrintSettings({
      layer_height: 0.2,
      infill_percentage: 20,
      supports: false,
      material_recommendation: ["PLA"],
    });
    setActiveTab("basic");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !profile?.is_creator) {
      toast.error("You must be a registered creator to create products");
      return;
    }

    if (!title.trim() || !price || !category) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (fitmentList.length === 0) {
      toast.error("Please add at least one vehicle fitment");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";
      let stlUrl = "";

      // Upload image if provided
      if (imageFile) {
        const imagePath = `products/${user.id}/${Date.now()}_${imageFile.name}`;
        const { data: imageData, error: imageError } =
          await productAPI.uploadFile(imageFile, "product-images", imagePath);

        if (imageError) {
          toast.error("Failed to upload image");
          setLoading(false);
          return;
        }

        imageUrl = imageData?.url || "";
      }

      // Upload STL if provided
      if (stlFile) {
        const stlPath = `stl-files/${user.id}/${Date.now()}_${stlFile.name}`;
        const { data: stlData, error: stlError } = await productAPI.uploadFile(
          stlFile,
          "stl-files",
          stlPath
        );

        if (stlError) {
          toast.error("Failed to upload STL file");
          setLoading(false);
          return;
        }

        stlUrl = stlData?.url || "";
      }

      // Create product
      const productData: ProductInput = {
        title: title.trim(),
        description: description.trim() || undefined,
        price: parseFloat(price),
        category,
        image_url: imageUrl || undefined,
        stl_file_url: stlUrl || undefined,
        fitment: fitmentList,
        specifications,
        print_settings: printSettings,
        is_published: true, // Auto-publish for now
        tags,
      };

      const { data, error } = await productAPI.createProduct(productData);

      if (error) {
        toast.error("Failed to create product");
        console.error("Create product error:", error);
      } else {
        toast.success("Product created successfully!");
        resetForm();
        onClose();
        onProductCreated?.();
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Product creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      resetForm();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Create New Product
          </DialogTitle>
          <DialogDescription>
            Add a new 3D printable car part to your store. Fill out all sections
            to create a complete listing.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="fitment">Fitment</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="print">Print Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Product Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., BMW E90 Front Splitter V2"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="24.99"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product, its features, and benefits..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag..."
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="files" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Product Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload product image
                        </p>
                      </div>
                    )}
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cursor-pointer"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      STL File
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {stlFile ? (
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">{stlFile.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setStlFile(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload STL file
                        </p>
                      </div>
                    )}
                    <Input
                      type="file"
                      accept=".stl"
                      onChange={handleSTLUpload}
                      className="cursor-pointer"
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="fitment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CarIcon className="h-4 w-4" />
                    Vehicle Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CarSelector onSelectionChange={() => {}} />

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={addFitment}
                      disabled={!isValidSelection}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Vehicle
                    </Button>
                    {isValidSelection && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        Selected: {displayName}
                      </div>
                    )}
                  </div>

                  {fitmentList.length > 0 && (
                    <div className="space-y-2">
                      <Label>Compatible Vehicles:</Label>
                      <div className="space-y-2">
                        {fitmentList.map((fitment, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-muted rounded-md"
                          >
                            <span className="text-sm">
                              {fitment.year} {fitment.make} {fitment.model}
                              {fitment.trim && ` ${fitment.trim}`}
                              {fitment.engine && ` (${fitment.engine})`}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFitment(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Installation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Difficulty Level</Label>
                      <Select
                        value={specifications.installation_difficulty}
                        onValueChange={(value) =>
                          setSpecifications((prev) => ({
                            ...prev,
                            installation_difficulty: value as any,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {INSTALLATION_DIFFICULTIES.map((diff) => (
                            <SelectItem key={diff} value={diff}>
                              {diff}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Installation Time</Label>
                      <Input
                        value={specifications.installation_time || ""}
                        onChange={(e) =>
                          setSpecifications((prev) => ({
                            ...prev,
                            installation_time: e.target.value,
                          }))
                        }
                        placeholder="e.g., 30-45 minutes"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dimensions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>Length (mm)</Label>
                        <Input
                          type="number"
                          value={specifications.dimensions?.length || ""}
                          onChange={(e) =>
                            setSpecifications((prev) => ({
                              ...prev,
                              dimensions: {
                                ...prev.dimensions,
                                length: parseFloat(e.target.value) || undefined,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Width (mm)</Label>
                        <Input
                          type="number"
                          value={specifications.dimensions?.width || ""}
                          onChange={(e) =>
                            setSpecifications((prev) => ({
                              ...prev,
                              dimensions: {
                                ...prev.dimensions,
                                width: parseFloat(e.target.value) || undefined,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Height (mm)</Label>
                        <Input
                          type="number"
                          value={specifications.dimensions?.height || ""}
                          onChange={(e) =>
                            setSpecifications((prev) => ({
                              ...prev,
                              dimensions: {
                                ...prev.dimensions,
                                height: parseFloat(e.target.value) || undefined,
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Weight (g)</Label>
                        <Input
                          type="number"
                          value={specifications.dimensions?.weight || ""}
                          onChange={(e) =>
                            setSpecifications((prev) => ({
                              ...prev,
                              dimensions: {
                                ...prev.dimensions,
                                weight: parseFloat(e.target.value) || undefined,
                              },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="print" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Print Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>Layer Height (mm)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={printSettings.layer_height || ""}
                          onChange={(e) =>
                            setPrintSettings((prev) => ({
                              ...prev,
                              layer_height:
                                parseFloat(e.target.value) || undefined,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Infill (%)</Label>
                        <Input
                          type="number"
                          value={printSettings.infill_percentage || ""}
                          onChange={(e) =>
                            setPrintSettings((prev) => ({
                              ...prev,
                              infill_percentage:
                                parseInt(e.target.value) || undefined,
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="supports"
                        checked={printSettings.supports || false}
                        onCheckedChange={(checked) =>
                          setPrintSettings((prev) => ({
                            ...prev,
                            supports: !!checked,
                          }))
                        }
                      />
                      <Label htmlFor="supports">Supports Required</Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Printer className="h-4 w-4" />
                      Estimates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Print Time</Label>
                      <Input
                        value={printSettings.estimated_print_time || ""}
                        onChange={(e) =>
                          setPrintSettings((prev) => ({
                            ...prev,
                            estimated_print_time: e.target.value,
                          }))
                        }
                        placeholder="e.g., 8-12 hours"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Material Usage</Label>
                      <Input
                        value={printSettings.estimated_material_usage || ""}
                        onChange={(e) =>
                          setPrintSettings((prev) => ({
                            ...prev,
                            estimated_material_usage: e.target.value,
                          }))
                        }
                        placeholder="e.g., 200g PLA"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
