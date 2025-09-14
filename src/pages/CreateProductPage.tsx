import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  productAPI,
  ProductInput,
  ProductFitment,
  PrintSettings,
  ProductSpecifications,
} from "../lib/supabase";
import { CarSelector } from "../components/car/CarSelector";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
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
  ArrowLeft,
} from "lucide-react";

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

export function CreateProductPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
  const [currentSelection, setCurrentSelection] = useState<any>(null);
  const [isCurrentSelectionValid, setIsCurrentSelectionValid] = useState(false);

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

  const handleCarSelectionChange = (selection: any) => {
    setCurrentSelection(selection);
    // Check if we have the minimum required fields for a valid selection
    const isValid =
      selection && selection.make && selection.model && selection.year;
    setIsCurrentSelectionValid(!!isValid);
  };

  const addFitment = () => {
    if (
      isCurrentSelectionValid &&
      currentSelection?.make &&
      currentSelection?.model &&
      currentSelection?.year
    ) {
      const fitment: ProductFitment = {
        make: currentSelection.make,
        model: currentSelection.model,
        year: currentSelection.year,
        trim: currentSelection.trim || undefined,
        engine: currentSelection.engine || undefined,
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
        setCurrentSelection(null);
        setIsCurrentSelectionValid(false);
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
    setCurrentSelection(null);
    setIsCurrentSelectionValid(false);
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
          console.error("Image upload error:", imageError);
          toast.error(
            "Failed to upload image. Storage may not be configured yet."
          );
          // Continue without image for now
        } else {
          imageUrl = imageData?.url || "";
        }
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
          console.error("STL upload error:", stlError);
          toast.error(
            "Failed to upload STL file. Storage may not be configured yet."
          );
          // Continue without STL for now
        } else {
          stlUrl = stlData?.url || "";
        }
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
        console.error("Create product error:", error);
        toast.error(
          `Failed to create product: ${error.message || "Unknown error"}`
        );
      } else {
        toast.success("Product created successfully!");
        resetForm();
        navigate("/my-account");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Product creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (!loading) {
      navigate("/my-account");
    }
  };

  // Check if user is a creator
  if (!profile?.is_creator) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8 text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">Creator Account Required</p>
          <p className="text-sm mb-4">
            You need creator approval to sell products
          </p>
          <Button variant="outline" disabled>
            Contact Admin for Approval
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/my-account">My Account</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCancel}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Package className="h-8 w-8" />
            Create New Product
          </h1>
          <p className="text-muted-foreground mt-1">
            Add a new 3D printable car part to your store
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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

            <div className="space-y-3">
              <Label>Tags (Optional)</Label>
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
          </CardContent>
        </Card>

        {/* File Uploads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              File Uploads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Product Image</Label>
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
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 text-center hover:border-primary/50 transition-colors">
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
              </div>

              <div className="space-y-2">
                <Label>STL File</Label>
                {stlFile ? (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <span className="text-sm font-medium">
                          {stlFile.name}
                        </span>
                        <p className="text-xs text-muted-foreground">
                          {(stlFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
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
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 text-center hover:border-primary/50 transition-colors">
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Compatibility */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CarIcon className="h-5 w-5" />
              Vehicle Compatibility *
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Vehicle:</Label>
              <CarSelector onSelectionChange={handleCarSelectionChange} />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                onClick={addFitment}
                disabled={!isCurrentSelectionValid}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Vehicle
              </Button>
              {isCurrentSelectionValid && currentSelection && (
                <div className="flex items-center text-sm text-muted-foreground px-3 py-2 bg-muted rounded-md">
                  <strong>Selected:</strong>&nbsp;
                  {currentSelection.year} {currentSelection.make}{" "}
                  {currentSelection.model}
                  {currentSelection.trim && ` ${currentSelection.trim}`}
                </div>
              )}
            </div>

            {fitmentList.length > 0 && (
              <div className="space-y-2">
                <Label>Compatible Vehicles ({fitmentList.length}):</Label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
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

        {/* Optional Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Optional Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Installation</h4>
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
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  Print Settings
                </h4>
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
                          layer_height: parseFloat(e.target.value) || undefined,
                        }))
                      }
                      placeholder="0.2"
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
                      placeholder="20"
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading} size="lg">
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
