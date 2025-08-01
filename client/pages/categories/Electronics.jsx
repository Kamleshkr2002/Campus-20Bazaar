import { useState } from "react";
import { Search, Filter, Grid, List, Laptop, DollarSign, User, MapPin, Battery, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockElectronics = [
  {
    id: 1,
    title: "MacBook Air M2",
    brand: "Apple",
    price: 850,
    originalPrice: 1199,
    condition: "Excellent",
    seller: "Alex P.",
    location: "East Campus",
    specs: "8GB RAM, 256GB SSD",
    year: "2023",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "iPad Pro 11-inch",
    brand: "Apple",
    price: 450,
    originalPrice: 799,
    condition: "Good",
    seller: "Lisa W.",
    location: "North Campus",
    specs: "128GB, WiFi + Cellular",
    year: "2022",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Gaming Laptop - ROG Strix",
    brand: "ASUS",
    price: 1200,
    originalPrice: 1800,
    condition: "Like New",
    seller: "Tom R.",
    location: "South Campus",
    specs: "RTX 3070, 16GB RAM, 1TB SSD",
    year: "2023",
    image: "/placeholder.svg"
  }
];

export default function Electronics() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("price-low");

  const filteredElectronics = mockElectronics.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.specs.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Laptop className="w-8 h-8 text-purple-600" />
          Electronics
        </h1>
        <p className="text-muted-foreground">Find laptops, tablets, phones, and tech accessories</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by device, brand, or specifications..."
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
        {filteredElectronics.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-50 to-purple-100 rounded-md mb-3 flex items-center justify-center">
                <Laptop className="w-12 h-12 text-purple-400" />
              </div>
              <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
              <CardDescription>{item.brand} • {item.year}</CardDescription>
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
                    <Wifi className="w-3 h-3" />
                    <span>{item.specs}</span>
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

      {filteredElectronics.length === 0 && (
        <div className="text-center py-12">
          <Laptop className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No electronics found</h3>
          <p className="text-muted-foreground">Try adjusting your search or check back later for new listings.</p>
        </div>
      )}
    </div>
  );
}
