import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Grid, List, Trophy, DollarSign, User, MapPin, Activity, Target, Heart } from "lucide-react";
import { useFavorites } from "../../contexts/FavoritesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockSports = [
  {
    id: 1,
    title: "Wilson Tennis Racket",
    brand: "Wilson",
    price: 45,
    originalPrice: 120,
    condition: "Good",
    seller: "Ryan K.",
    location: "Sports Complex",
    sport: "Tennis",
    specifications: "Pro Staff 97, 315g",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Spalding Basketball",
    brand: "Spalding",
    price: 15,
    originalPrice: 35,
    condition: "Like New",
    seller: "Marcus L.",
    location: "Recreation Center",
    sport: "Basketball",
    specifications: "Official Size, Indoor/Outdoor",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Yoga Mat & Block Set",
    brand: "Manduka",
    price: 35,
    originalPrice: 89,
    condition: "Excellent",
    seller: "Sophie W.",
    location: "Fitness Center",
    sport: "Yoga",
    specifications: "6mm thickness, Non-slip",
    image: "/placeholder.svg"
  }
];

export default function Sports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("price-low");
  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredSports = mockSports.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sport.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Trophy className="w-8 h-8 text-orange-600" />
          Sports & Recreation
        </h1>
        <p className="text-muted-foreground">Find sports equipment and recreational gear for an active lifestyle</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by equipment, sport, or brand..."
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
        {filteredSports.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <Link to={`/item/${item.id}`}>
              <CardHeader className="pb-3">
                <div className="aspect-[4/3] bg-gradient-to-br from-orange-50 to-orange-100 rounded-md mb-3 flex items-center justify-center">
                  <Trophy className="w-12 h-12 text-orange-400" />
                </div>
                <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                <CardDescription>{item.brand} • {item.sport}</CardDescription>
              </CardHeader>
            </Link>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600">${item.price}</span>
                    <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{item.condition}</Badge>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite(item.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>
                </div>

                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    <span>{item.specifications}</span>
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

                <Button className="w-full mt-4" asChild>
                  <Link to={`/item/${item.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSports.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No sports equipment found</h3>
          <p className="text-muted-foreground">Try adjusting your search or check back later for new listings.</p>
        </div>
      )}
    </div>
  );
}
