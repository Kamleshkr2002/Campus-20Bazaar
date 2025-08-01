import { useState } from "react";
import { Search, Filter, Grid, List, Package, DollarSign, User, MapPin, Tag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockMiscellaneous = [
  {
    id: 1,
    title: "Mini Fridge - Perfect for Dorm",
    category: "Appliances",
    price: 75,
    originalPrice: 150,
    condition: "Good",
    seller: "Taylor H.",
    location: "Residence Hall A",
    description: "Compact refrigerator, 2.7 cu ft",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Art Supplies Bundle",
    category: "Creative",
    price: 40,
    originalPrice: 85,
    condition: "Like New",
    seller: "Amy R.",
    location: "Art Building",
    description: "Paints, brushes, canvases included",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Plant Collection - 5 Plants",
    category: "Home & Garden",
    price: 30,
    originalPrice: 60,
    condition: "Excellent",
    seller: "Green Thumb Tim",
    location: "Campus Gardens",
    description: "Low-maintenance indoor plants",
    image: "/placeholder.svg"
  }
];

export default function Miscellaneous() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("price-low");

  const filteredItems = mockMiscellaneous.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Package className="w-8 h-8 text-gray-600" />
          Miscellaneous
        </h1>
        <p className="text-muted-foreground">Find unique items and everything else you might need</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by item, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="condition">Condition</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 rounded-md mb-3 flex items-center justify-center">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
              <CardDescription>{item.category}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600">${item.price}</span>
                    <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                  </div>
                  <Badge variant="secondary">{item.condition}</Badge>
                </div>
                
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>{item.description}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{item.seller}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                </div>

                <Button className="w-full mt-4">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No items found</h3>
          <p className="text-muted-foreground">Try adjusting your search or check back later for new listings.</p>
        </div>
      )}
    </div>
  );
}
