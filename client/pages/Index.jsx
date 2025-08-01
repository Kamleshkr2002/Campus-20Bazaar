import { Link } from "react-router-dom";
import {
  Search,
  BookOpen,
  Laptop,
  Armchair,
  Car,
  Gamepad2,
  Package,
  Star,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for featured items
const featuredItems = [
  {
    id: 1,
    title: 'MacBook Pro 13" M1',
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
];

// Categories data
const categories = [
  {
    name: "Textbooks",
    icon: BookOpen,
    count: 1247,
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Electronics",
    icon: Laptop,
    count: 892,
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Furniture",
    icon: Armchair,
    count: 634,
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Transportation",
    icon: Car,
    count: 156,
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    count: 423,
    color: "bg-red-100 text-red-700",
  },
  {
    name: "Miscellaneous",
    icon: Package,
    count: 287,
    color: "bg-yellow-100 text-yellow-700",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-lavender via-white to-brand-lavender-dark py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Buy & Sell with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-purple-light">
                Fellow Students
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The trusted marketplace for college students. Find amazing deals
              on textbooks, electronics, furniture, and more from students on
              your campus.
            </p>

            {/* Hero Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for textbooks, laptops, furniture..."
                  className="pl-12 pr-24 py-4 text-lg bg-white/80 backdrop-blur-sm border-0 shadow-lg focus-visible:ring-2 focus-visible:ring-primary"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand-purple hover:bg-brand-purple-dark">
                  Search
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                asChild
                className="bg-brand-purple hover:bg-brand-purple-dark px-8"
              >
                <Link to="/browse">
                  Browse Items
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/sell">Start Selling</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground">
              Find exactly what you need from fellow students
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/categories/${category.name.toLowerCase()}`}
                className="group"
              >
                <Card className="hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <CardContent className="p-4 lg:p-6 text-center">
                    <div
                      className={`w-12 h-12 lg:w-16 lg:h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <category.icon className="w-6 h-6 lg:w-8 lg:h-8" />
                    </div>
                    <h3 className="text-sm lg:text-base font-semibold text-foreground mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      {category.count} items
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Featured Items
              </h2>
              <p className="text-muted-foreground">
                Handpicked deals from trusted sellers
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/browse">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Link key={item.id} to={`/item/${item.id}`} className="group">
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant="secondary"
                        className="bg-white/90 backdrop-blur-sm"
                      >
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
                        <span className="text-2xl font-bold text-foreground">
                          ${item.price}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.originalPrice}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">
                          {item.rating}
                        </span>
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
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-purple to-brand-purple-light">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students already earning extra cash by selling
            items they no longer need. It's free, safe, and super easy!
          </p>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="bg-white text-brand-purple hover:bg-white/90"
          >
            <Link to="/sell">
              Sell Your First Item
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
