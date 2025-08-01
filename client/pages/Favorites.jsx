import { Link } from "react-router-dom";
import { Heart, Search, User, MapPin, Package, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "../contexts/FavoritesContext";
import { ShareDialog } from "@/components/ShareDialog";
import { useState } from "react";

// Mock data that matches the category pages and ItemDetails
const allItems = {
  1: {
    id: 1,
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    price: 45,
    originalPrice: 120,
    condition: "Good",
    seller: "Sarah M.",
    location: "North Campus",
    category: "Textbooks",
    image: "/placeholder.svg",
  },
  2: {
    id: 2,
    title: "Organic Chemistry",
    author: "Paula Bruice",
    price: 80,
    originalPrice: 200,
    condition: "Like New",
    seller: "Mike K.",
    location: "South Campus",
    category: "Textbooks",
    image: "/placeholder.svg",
  },
  3: {
    id: 3,
    title: "Introduction to Psychology",
    author: "David G. Myers",
    price: 30,
    originalPrice: 85,
    condition: "Fair",
    seller: "Emma L.",
    location: "West Campus",
    category: "Textbooks",
    image: "/placeholder.svg",
  },
  4: {
    id: 4,
    title: "MacBook Air M2",
    brand: "Apple",
    price: 850,
    originalPrice: 1199,
    condition: "Excellent",
    seller: "Alex P.",
    location: "East Campus",
    category: "Electronics",
    image: "/placeholder.svg",
  },
  5: {
    id: 5,
    title: "iPad Pro 11-inch",
    brand: "Apple",
    price: 450,
    originalPrice: 799,
    condition: "Good",
    seller: "Lisa W.",
    location: "North Campus",
    category: "Electronics",
    image: "/placeholder.svg",
  },
};

export default function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const favoriteItems = favorites.map((id) => allItems[id]).filter(Boolean); // Remove any undefined items

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Electronics":
        return "💻";
      case "Textbooks":
        return "📚";
      case "Furniture":
        return "🪑";
      case "Clothing":
        return "👕";
      case "Sports":
        return "⚽";
      default:
        return "📦";
    }
  };

  if (favoriteItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Heart className="w-8 h-8 text-red-500" />
            My Favorites
          </h1>
          <p className="text-muted-foreground">
            Keep track of items you're interested in purchasing
          </p>
        </div>

        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
          <p className="text-muted-foreground mb-6">
            Start browsing and add items to your favorites by clicking the heart
            icon
          </p>
          <Button asChild>
            <Link to="/browse">
              <Search className="w-4 h-4 mr-2" />
              Browse Items
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Heart className="w-8 h-8 text-red-500" />
          My Favorites
        </h1>
        <p className="text-muted-foreground">
          You have {favoriteItems.length} item
          {favoriteItems.length !== 1 ? "s" : ""} in your favorites
        </p>
      </div>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <Link to={`/item/${item.id}`}>
              <CardHeader className="pb-3">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 rounded-md mb-3 flex items-center justify-center">
                  <span className="text-4xl">
                    {getCategoryIcon(item.category)}
                  </span>
                </div>
                <CardTitle className="text-lg line-clamp-2">
                  {item.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Badge variant="outline">{item.category}</Badge>
                  {item.author && <span>by {item.author}</span>}
                  {item.brand && <span>{item.brand}</span>}
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

      {/* Quick Actions */}
      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Looking for more items?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild>
            <Link to="/browse">
              <Search className="w-4 h-4 mr-2" />
              Browse All Items
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/categories/textbooks">📚 Textbooks</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/categories/electronics">💻 Electronics</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
