import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Upload,
  DollarSign,
  Package,
  MapPin,
  Calendar,
  Tag,
  FileText,
  X,
  Plus,
  AlertCircle,
  CheckCircle,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const categories = [
  { value: "textbooks", label: "📚 Textbooks" },
  { value: "electronics", label: "💻 Electronics" },
  { value: "furniture", label: "🪑 Furniture" },
  { value: "clothing", label: "👕 Clothing" },
  { value: "sports", label: "⚽ Sports & Recreation" },
  { value: "miscellaneous", label: "📦 Miscellaneous" },
];

const conditions = [
  { value: "like-new", label: "Like New", description: "Barely used, no visible wear" },
  { value: "excellent", label: "Excellent", description: "Minor signs of use" },
  { value: "good", label: "Good", description: "Some wear but fully functional" },
  { value: "fair", label: "Fair", description: "Significant wear but usable" },
  { value: "poor", label: "Poor", description: "Heavy wear, may need repairs" },
];

const locations = [
  "North Campus",
  "South Campus",
  "East Campus",
  "West Campus",
  "Engineering Building",
  "Library",
  "Student Center",
  "Residence Hall A",
  "Residence Hall B",
  "Residence Hall C",
  "Off-Campus",
];

const paymentMethods = [
  { id: "cash", label: "Cash" },
  { id: "venmo", label: "Venmo" },
  { id: "paypal", label: "PayPal" },
  { id: "zelle", label: "Zelle" },
  { id: "cashapp", label: "Cash App" },
];

const pickupOptions = [
  { id: "campus-pickup", label: "Campus pickup" },
  { id: "library-meetup", label: "Meet at library" },
  { id: "dorm-pickup", label: "Dorm pickup" },
  { id: "public-place", label: "Public place meetup" },
  { id: "help-transport", label: "Can help with transport" },
];

export default function Sell() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    condition: "",
    price: "",
    originalPrice: "",
    description: "",
    specifications: {},
    location: "",
    images: [],
    tags: [],
    paymentMethods: [],
    pickupOptions: [],
  });
  const [currentTag, setCurrentTag] = useState("");
  const [specifications, setSpecifications] = useState([{ key: "", value: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you'd upload these to a server
    // For now, we'll just store the file names
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 6), // Max 6 images
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSpecificationChange = (index, field, value) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = value;
    setSpecifications(newSpecs);
    
    // Update form data
    const specsObj = {};
    newSpecs.forEach((spec) => {
      if (spec.key && spec.value) {
        specsObj[spec.key] = spec.value;
      }
    });
    setFormData((prev) => ({ ...prev, specifications: specsObj }));
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const removeSpecification = (index) => {
    const newSpecs = specifications.filter((_, i) => i !== index);
    setSpecifications(newSpecs);
    
    const specsObj = {};
    newSpecs.forEach((spec) => {
      if (spec.key && spec.value) {
        specsObj[spec.key] = spec.value;
      }
    });
    setFormData((prev) => ({ ...prev, specifications: specsObj }));
  };

  const handlePaymentMethodChange = (methodId, checked) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        paymentMethods: [...prev.paymentMethods, methodId],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        paymentMethods: prev.paymentMethods.filter((id) => id !== methodId),
      }));
    }
  };

  const handlePickupOptionChange = (optionId, checked) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        pickupOptions: [...prev.pickupOptions, optionId],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        pickupOptions: prev.pickupOptions.filter((id) => id !== optionId),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // In a real app, you'd navigate to the item's detail page
    setTimeout(() => {
      navigate("/browse");
    }, 3000);
  };

  const isFormValid = () => {
    return (
      formData.title &&
      formData.category &&
      formData.condition &&
      formData.price &&
      formData.description &&
      formData.location &&
      formData.paymentMethods.length > 0 &&
      formData.pickupOptions.length > 0
    );
  };

  if (showSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <Card>
            <CardContent className="pt-6">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Item Listed Successfully!</h2>
              <p className="text-muted-foreground mb-4">
                Your item has been added to the marketplace and is now visible to other students.
              </p>
              <Button onClick={() => navigate("/browse")} className="w-full">
                View in Marketplace
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Sell Your Item</h1>
        <p className="text-muted-foreground">
          List your item for sale and reach thousands of students on campus
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Tell us about your item and what makes it special
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Item Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., MacBook Air M2 - Excellent Condition"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange("category", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => handleInputChange("condition", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((cond) => (
                          <SelectItem key={cond.value} value={cond.value}>
                            <div>
                              <div className="font-medium">{cond.label}</div>
                              <div className="text-xs text-muted-foreground">
                                {cond.description}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item's condition, features, and why someone should buy it..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Pricing
                </CardTitle>
                <CardDescription>
                  Set a competitive price that reflects your item's value
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Asking Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="originalPrice">Original Price ($)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      placeholder="0"
                      min="0"
                      step="0.01"
                      value={formData.originalPrice}
                      onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Helps buyers see the value they're getting
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Photos
                </CardTitle>
                <CardDescription>
                  Add up to 6 photos to showcase your item (first photo will be the main image)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.images.length < 6 && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium">Click to upload photos</p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, or JPEG up to 10MB each
                        </p>
                      </Label>
                    </div>
                  )}

                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          {index === 0 && (
                            <Badge className="absolute top-2 left-2">Main</Badge>
                          )}
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                            type="button"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Specifications
                </CardTitle>
                <CardDescription>
                  Add technical details or important features (optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Feature name"
                        value={spec.key}
                        onChange={(e) =>
                          handleSpecificationChange(index, "key", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Feature value"
                        value={spec.value}
                        onChange={(e) =>
                          handleSpecificationChange(index, "value", e.target.value)
                        }
                      />
                      {specifications.length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeSpecification(index)}
                          type="button"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addSpecification}
                    type="button"
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Specification
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Tags
                </CardTitle>
                <CardDescription>
                  Add keywords to help buyers find your item
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button onClick={addTag} type="button">
                      Add
                    </Button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 ml-1"
                            onClick={() => removeTag(tag)}
                            type="button"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location & Pickup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location & Pickup
                </CardTitle>
                <CardDescription>
                  Let buyers know where and how they can get the item
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => handleInputChange("location", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Pickup Options * (select at least one)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pickupOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={formData.pickupOptions.includes(option.id)}
                          onCheckedChange={(checked) =>
                            handlePickupOptionChange(option.id, checked)
                          }
                        />
                        <Label htmlFor={option.id} className="text-sm">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Payment Methods * (select at least one)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={method.id}
                          checked={formData.paymentMethods.includes(method.id)}
                          onCheckedChange={(checked) =>
                            handlePaymentMethodChange(method.id, checked)
                          }
                        />
                        <Label htmlFor={method.id} className="text-sm">
                          {method.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                size="lg"
                className="flex-1"
                disabled={!isFormValid() || isSubmitting}
              >
                {isSubmitting ? "Listing Item..." : "List Item for Sale"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => navigate("/browse")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>

        {/* Tips Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Selling Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">📸 Great Photos</h4>
                  <p className="text-muted-foreground">
                    Take clear, well-lit photos from multiple angles
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">💰 Fair Pricing</h4>
                  <p className="text-muted-foreground">
                    Research similar items to price competitively
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">📝 Honest Descriptions</h4>
                  <p className="text-muted-foreground">
                    Be upfront about any flaws or wear
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">⚡ Quick Responses</h4>
                  <p className="text-muted-foreground">
                    Reply to messages promptly to build trust
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Safety First!</strong> Always meet in public places on campus and trust your instincts. Never share personal information until you're ready to meet.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
