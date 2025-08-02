import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Search,
  User,
  Heart,
  MessageCircle,
  ShoppingBag,
  Menu,
  X,
  Plus,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  // Don't render navigation until auth context is loaded
  if (loading) {
    return null;
  }

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-purple to-brand-purple-light rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              CampusMarket
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for books, electronics, furniture..."
                className="pl-10 bg-secondary/30 border-0 focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/browse"
              className="text-foreground hover:text-primary transition-colors"
            >
              Browse
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-foreground hover:text-primary transition-all duration-200 px-3 py-2 rounded-lg hover:bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/20">
                Categories
                <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 p-2 bg-white/95 backdrop-blur-md border-0 shadow-xl rounded-xl">
                <DropdownMenuItem
                  asChild
                  className="rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-200"
                >
                  <Link
                    to="/categories/textbooks"
                    className="flex items-center px-3 py-2.5 text-sm font-medium"
                  >
                    📚 Textbooks
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 transition-all duration-200"
                >
                  <Link
                    to="/categories/electronics"
                    className="flex items-center px-3 py-2.5 text-sm font-medium"
                  >
                    💻 Electronics
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 transition-all duration-200"
                >
                  <Link
                    to="/categories/furniture"
                    className="flex items-center px-3 py-2.5 text-sm font-medium"
                  >
                    🪑 Furniture
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="rounded-lg hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-100 transition-all duration-200"
                >
                  <Link
                    to="/categories/clothing"
                    className="flex items-center px-3 py-2.5 text-sm font-medium"
                  >
                    👕 Clothing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 transition-all duration-200"
                >
                  <Link
                    to="/categories/sports"
                    className="flex items-center px-3 py-2.5 text-sm font-medium"
                  >
                    ⚽ Sports & Recreation
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200"
                >
                  <Link
                    to="/categories/miscellaneous"
                    className="flex items-center px-3 py-2.5 text-sm font-medium"
                  >
                    📦 Miscellaneous
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              asChild
              className="bg-brand-purple hover:bg-brand-purple-dark"
            >
              <Link to="/sell">
                <Plus className="w-4 h-4 mr-1" />
                Sell Item
              </Link>
            </Button>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/favorites">
                  <Heart className="w-5 h-5" />
                </Link>
              </Button>
              {isLoggedIn && (
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/messages">
                    <MessageCircle className="w-5 h-5" />
                  </Link>
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleProfileClick}
                title={isLoggedIn ? "Dashboard" : "Login"}
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search items..."
              className="pl-10 bg-secondary/30 border-0"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/browse"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Items
              </Link>
              <div className="space-y-2">
                <div className="text-foreground font-medium py-2">
                  Categories
                </div>
                <div className="pl-4 space-y-2">
                  <Link
                    to="/categories/textbooks"
                    className="block text-foreground hover:text-primary transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Textbooks
                  </Link>
                  <Link
                    to="/categories/electronics"
                    className="block text-foreground hover:text-primary transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Electronics
                  </Link>
                  <Link
                    to="/categories/furniture"
                    className="block text-foreground hover:text-primary transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Furniture
                  </Link>
                  <Link
                    to="/categories/clothing"
                    className="block text-foreground hover:text-primary transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Clothing
                  </Link>
                  <Link
                    to="/categories/sports"
                    className="block text-foreground hover:text-primary transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sports & Recreation
                  </Link>
                  <Link
                    to="/categories/miscellaneous"
                    className="block text-foreground hover:text-primary transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Miscellaneous
                  </Link>
                </div>
              </div>
              <Link
                to="/favorites"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My Favorites
              </Link>
              <button
                onClick={() => {
                  handleProfileClick();
                  setIsMenuOpen(false);
                }}
                className="text-left text-foreground hover:text-primary transition-colors py-2"
              >
                {isLoggedIn ? "Dashboard" : "Login / Register"}
              </button>
              <Button
                asChild
                className="bg-brand-purple hover:bg-brand-purple-dark mt-4"
              >
                <Link to="/sell" onClick={() => setIsMenuOpen(false)}>
                  <Plus className="w-4 h-4 mr-1" />
                  Sell an Item
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
