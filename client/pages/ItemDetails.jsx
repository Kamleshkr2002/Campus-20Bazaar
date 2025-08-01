import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { 
  ArrowLeft, Heart, Share2, MapPin, Calendar, User, MessageCircle, 
  Shield, Star, ChevronLeft, ChevronRight, Package, Truck, CreditCard,
  AlertTriangle, Eye, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock item data - in a real app, this would come from an API
const mockItems = {
  1: {
    id: 1,
    title: "MacBook Air M2 - Excellent Condition",
    price: 850,
    originalPrice: 1199,
    condition: "Excellent",
    category: "Electronics",
    description: "Barely used MacBook Air M2 with original box and charger. Perfect for students! Only 3 months old, selling due to upgrade. Includes original packaging, charger, and documentation.",
    specifications: {
      "Processor": "Apple M2 Chip",
      "Memory": "8GB Unified Memory",
      "Storage": "256GB SSD",
      "Display": "13.6-inch Liquid Retina",
      "Battery": "Up to 18 hours",
      "Color": "Midnight"
    },
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    seller: {
      name: "Alex Parker",
      avatar: "/placeholder.svg",
      rating: 4.8,
      reviews: 23,
      responseTime: "Usually responds within 1 hour",
      memberSince: "September 2023",
      verified: true
    },
    location: "East Campus, Building C",
    postedDate: "2024-01-15",
    views: 156,
    interested: 8,
    pickupOptions: ["Campus pickup", "Meet in person"],
    paymentMethods: ["Cash", "Venmo", "PayPal"],
    tags: ["laptop", "apple", "macbook", "student", "electronics"]
  },
  2: {
    id: 2,
    title: "Calculus Textbook - Early Transcendentals 8th Edition",
    price: 45,
    originalPrice: 120,
    condition: "Good",
    category: "Textbooks",
    description: "Used for MATH 141. Some highlighting and notes in margins, but all pages intact. Great condition overall. Perfect for studying calculus!",
    specifications: {
      "Author": "James Stewart",
      "Edition": "8th Edition",
      "ISBN": "978-1285741550",
      "Publisher": "Cengage Learning",
      "Pages": "1368",
      "Course": "MATH 141"
    },
    images: ["/placeholder.svg", "/placeholder.svg"],
    seller: {
      name: "Sarah Mitchell",
      avatar: "/placeholder.svg",
      rating: 4.9,
      reviews: 15,
      responseTime: "Usually responds within 2 hours",
      memberSince: "August 2023",
      verified: true
    },
    location: "North Campus Library",
    postedDate: "2024-01-12",
    views: 89,
    interested: 5,
    pickupOptions: ["Campus pickup", "Library meetup"],
    paymentMethods: ["Cash", "Venmo"],
    tags: ["textbook", "calculus", "math", "stewart", "education"]
  },
  3: {
    id: 3,
    title: "IKEA MALM Bed Frame - Queen Size",
    price: 80,
    originalPrice: 179,
    condition: "Good",
    category: "Furniture",
    description: "Solid wood bed frame in good condition. Easy to disassemble for transport. Some minor scratches but very stable and comfortable.",
    specifications: {
      "Size": "Queen (160x200 cm)",
      "Material": "Oak veneer",
      "Height": "97 cm",
      "Assembly": "Required",
      "Mattress": "Not included",
      "Color": "Oak effect"
    },
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    seller: {
      name: "Rachel Kim",
      avatar: "/placeholder.svg",
      rating: 4.7,
      reviews: 12,
      responseTime: "Usually responds within 3 hours",
      memberSince: "October 2023",
      verified: true
    },
    location: "North Campus, Residence Hall A",
    postedDate: "2024-01-10",
    views: 234,
    interested: 12,
    pickupOptions: ["Pickup required", "Help with disassembly"],
    paymentMethods: ["Cash", "Venmo", "PayPal"],
    tags: ["furniture", "bed", "ikea", "queen", "bedroom"]
  }
};

const relatedItems = [
  { id: 4, title: "iPad Pro 11-inch", price: 450, image: "/placeholder.svg" },
  { id: 5, title: "USB-C Hub", price: 25, image: "/placeholder.svg" },
  { id: 6, title: "Laptop Stand", price: 35, image: "/placeholder.svg" }
];

export default function ItemDetails() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  
  const item = mockItems[id] || mockItems[1]; // Fallback to item 1 if not found

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/browse">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image Gallery */}
        <div className="lg:col-span-2">
          <div className="relative">
            <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img 
                src={item.images[currentImageIndex]} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {item.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {item.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`${item.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details Tabs */}
          <div className="mt-8">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specs</TabsTrigger>
                <TabsTrigger value="safety">Safety</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(item.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="font-medium">{key}:</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="safety" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      Safety Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Meet in Public</h4>
                          <p className="text-sm text-muted-foreground">Always meet in well-lit, public areas on campus</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Secure Payment</h4>
                          <p className="text-sm text-muted-foreground">Use secure payment methods and avoid cash when possible</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Trust Your Instincts</h4>
                          <p className="text-sm text-muted-foreground">If something feels off, don't proceed with the transaction</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price and Actions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-3xl font-bold text-green-600">${item.price}</span>
                    <span className="text-lg text-muted-foreground line-through">${item.originalPrice}</span>
                  </div>
                  <Badge variant="secondary">{item.condition}</Badge>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorited(!isFavorited)}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
              <CardTitle className="text-xl">{item.title}</CardTitle>
              <CardDescription className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {item.views} views
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {item.interested} interested
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button size="lg" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Seller
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share Item
              </Button>
            </CardContent>
          </Card>

          {/* Seller Information */}
          <Card>
            <CardHeader>
              <CardTitle>Seller Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src={item.seller.avatar} />
                  <AvatarFallback>{item.seller.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{item.seller.name}</h3>
                    {item.seller.verified && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{item.seller.rating}</span>
                    <span className="text-sm text-muted-foreground">({item.seller.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{item.seller.responseTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Member since {item.seller.memberSince}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Item Details */}
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-medium">{item.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Condition</span>
                <span className="font-medium">{item.condition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">{item.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Posted</span>
                <span className="font-medium">{formatDate(item.postedDate)}</span>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h4 className="font-medium mb-2">Pickup Options</h4>
                <div className="space-y-1">
                  {item.pickupOptions.map((option) => (
                    <div key={option} className="flex items-center gap-2 text-sm">
                      <Truck className="w-3 h-3 text-muted-foreground" />
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Payment Methods</h4>
                <div className="space-y-1">
                  {item.paymentMethods.map((method) => (
                    <div key={method} className="flex items-center gap-2 text-sm">
                      <CreditCard className="w-3 h-3 text-muted-foreground" />
                      <span>{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Items */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedItems.map((relatedItem) => (
            <Card key={relatedItem.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="aspect-[4/3] bg-gray-100 rounded-md mb-3">
                  <img src={relatedItem.image} alt={relatedItem.title} className="w-full h-full object-cover rounded-md" />
                </div>
                <CardTitle className="text-lg line-clamp-2">{relatedItem.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-green-600">${relatedItem.price}</span>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/item/${relatedItem.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
