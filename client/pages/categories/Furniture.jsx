import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Grid,
  List,
  Armchair,
  DollarSign,
  User,
  MapPin,
  Home,
  Package,
  Heart,
} from "lucide-react";
import { useFavorites } from "../../contexts/FavoritesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockFurniture = [
  {
    id: 1,
    title: "IKEA MALM Bed Frame",
    category: "Bedroom",
    price: 80,
    originalPrice: 179,
    condition: "Good",
    seller: "Rachel K.",
    location: "North Campus",
    size: "Queen Size",
    material: "Wood",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Study Desk with Drawers",
    category: "Study",
    price: 120,
    originalPrice: 299,
    condition: "Like New",
    seller: "David L.",
    location: "West Campus",
    size: '48" x 24"',
    material: "Wood & Metal",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Comfy Reading Chair",
    category: "Living Room",
    price: 65,
    originalPrice: 150,
    condition: "Fair",
    seller: "Maria S.",
    location: "South Campus",
    size: "Standard",
    material: "Fabric",
    image: "/placeholder.svg",
  },
];

export default function Furniture() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("price-low");
  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredFurniture = mockFurniture.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Armchair className="w-8 h-8 text-green-600" />
          Furniture
        </h1>
        <p className="text-muted-foreground">
          Find affordable furniture for your dorm or apartment
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by item, category, or material..."
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
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {filteredFurniture.map((item) => (
          <div key={item.id}>
            {viewMode === "grid" ? (
              <Card className="hover:shadow-lg transition-shadow">
                <Link to={`/item/${item.id}`}>
                  <CardHeader className="pb-3">
                    <div className="aspect-[4/3] bg-gradient-to-br from-green-50 to-green-100 rounded-md mb-3 flex items-center justify-center">
                      <Armchair className="w-12 h-12 text-green-400" />
                    </div>
                    <CardTitle className="text-lg line-clamp-2">
                      {item.title}
                    </CardTitle>
                    <CardDescription>
                      {item.category} • {item.size}
                    </CardDescription>
                  </CardHeader>
                </Link>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">
                          ${item.price}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.originalPrice}
                        </span>
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
                          <Heart
                            className={`w-4 h-4 ${isFavorite(item.id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Package className="w-3 h-3" />
                        <span>{item.material}</span>
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
            ) : (
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Link to={`/item/${item.id}`} className="flex-shrink-0">
                      <div className="w-20 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-md flex items-center justify-center">
                        <Armchair className="w-8 h-8 text-green-400" />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <Link to={`/item/${item.id}`}>
                          <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.category} • {item.size}
                          </p>
                        </Link>
                        <div className="flex items-center space-x-2 ml-4">
                          <div className="text-right">
                            <span className="text-lg font-bold text-green-600">
                              ${item.price}
                            </span>
                            <span className="text-sm text-muted-foreground line-through ml-1">
                              ${item.originalPrice}
                            </span>
                          </div>
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
                            <Heart
                              className={`w-4 h-4 ${isFavorite(item.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <Badge variant="secondary">{item.condition}</Badge>
                        <span>{item.material}</span>
                        <span>{item.seller}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{item.location}</span>
                        </div>
                        <Button size="sm" asChild>
                          <Link to={`/item/${item.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      {filteredFurniture.length === 0 && (
        <div className="text-center py-12">
          <Armchair className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No furniture found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or check back later for new listings.
          </p>
        </div>
      )}
    </div>
  );
}
