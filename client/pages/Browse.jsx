import { useState } from "react";
import { Search, Filter, Grid, List, Star, MapPin, Clock, Heart } from "lucide-react";
import { useFavorites } from "../contexts/FavoritesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

// Mock data for items
const items = [
  {
    id: 1,
    title: "MacBook Pro 13\" M1",
    price: 899,
    originalPrice: 1299,
    image: "/placeholder.svg",
    seller: "Sarah M.",
    rating: 4.9,
    location: "North Campus",
    timeAgo: "2 hours ago",
    category: "Electronics",
    isVerified: true,
  },
  {
    id: 2,
    title: "Calculus Textbook Bundle",
    price: 65,
    originalPrice: 245,
    image: "/placeholder.svg",
    seller: "Mike R.",
    rating: 4.8,
    location: "Engineering Building",
    timeAgo: "5 hours ago",
    category: "Textbooks",
    isVerified: true,
  },
  {
    id: 3,
    title: "IKEA Desk Chair",
    price: 45,
    originalPrice: 89,
    image: "/placeholder.svg",
    seller: "Emma L.",
    rating: 4.7,
    location: "South Dorms",
    timeAgo: "1 day ago",
    category: "Furniture",
    isVerified: false,
  },
  {
    id: 4,
    title: "Nintendo Switch Console",
    price: 225,
    originalPrice: 299,
    image: "/placeholder.svg",
    seller: "Alex K.",
    rating: 4.9,
    location: "West Campus",
    timeAgo: "3 hours ago",
    category: "Gaming",
    isVerified: true,
  },
  {
    id: 5,
    title: "Chemistry Lab Manual",
    price: 25,
    originalPrice: 85,
    image: "/placeholder.svg",
    seller: "Jessica P.",
    rating: 4.6,
    location: "Science Building",
    timeAgo: "6 hours ago",
    category: "Textbooks",
    isVerified: true,
  },
  {
    id: 6,
    title: "Wooden Study Desk",
    price: 120,
    originalPrice: 200,
    image: "/placeholder.svg",
    seller: "David C.",
    rating: 4.8,
    location: "East Campus",
    timeAgo: "12 hours ago",
    category: "Furniture",
    isVerified: false,
  },
];

export default function Browse() {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Browse Items</h1>
        <p className="text-muted-foreground">Discover great deals from fellow students</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="textbooks">Textbooks</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-50">Under $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="100-200">$100 - $200</SelectItem>
                <SelectItem value="over-200">Over $200</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Showing {items.length} results
          </p>
          <div className="flex gap-1">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className={viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
        : "space-y-4"
      }>
        {items.map((item) => (
          <Link key={item.id} to={`/item/${item.id}`} className="group">
            {viewMode === "grid" ? (
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                      {item.category}
                    </Badge>
                  </div>
                  {item.isVerified && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500 hover:bg-green-500">
                        ✓ Verified
                      </Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-foreground">${item.price}</span>
                      <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">{item.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="font-medium">{item.seller}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className="text-xl font-bold text-foreground">${item.price}</span>
                          <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span>{item.seller}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{item.rating}</span>
                        </div>
                        <Badge variant="secondary">{item.category}</Badge>
                        {item.isVerified && (
                          <Badge className="bg-green-500 hover:bg-green-500 text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </Link>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          Load More Items
        </Button>
      </div>
    </div>
  );
}
