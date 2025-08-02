import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Browse from "./pages/Browse";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import ItemDetails from "./pages/ItemDetails";
import Favorites from "./pages/Favorites";
import Sell from "./pages/Sell";
import Textbooks from "./pages/categories/Textbooks";
import Electronics from "./pages/categories/Electronics";
import Furniture from "./pages/categories/Furniture";
import Clothing from "./pages/categories/Clothing";
import Sports from "./pages/categories/Sports";
import Miscellaneous from "./pages/categories/Miscellaneous";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <FavoritesProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/browse" element={<Browse />} />
                <Route
                  path="/categories"
                  element={
                    <PlaceholderPage
                      title="Categories"
                      description="Browse items by category to find exactly what you're looking for."
                    />
                  }
                />
                <Route path="/categories/textbooks" element={<Textbooks />} />
                <Route
                  path="/categories/electronics"
                  element={<Electronics />}
                />
                <Route path="/categories/furniture" element={<Furniture />} />
                <Route path="/categories/clothing" element={<Clothing />} />
                <Route path="/categories/sports" element={<Sports />} />
                <Route
                  path="/categories/miscellaneous"
                  element={<Miscellaneous />}
                />
                <Route
                  path="/categories/:category"
                  element={
                    <PlaceholderPage
                      title="Category Items"
                      description="Browse items in this specific category."
                    />
                  }
                />
                <Route path="/item/:id" element={<ItemDetails />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/profile"
                  element={
                    <PlaceholderPage
                      title="My Profile"
                      description="Manage your account, listings, and selling history."
                    />
                  }
                />
                <Route path="/favorites" element={<Favorites />} />
                <Route
                  path="/how-it-works"
                  element={
                    <PlaceholderPage
                      title="How It Works"
                      description="Learn how to safely buy and sell items on CampusMarket."
                    />
                  }
                />
                <Route
                  path="/help"
                  element={
                    <PlaceholderPage
                      title="Help Center"
                      description="Find answers to frequently asked questions and get support."
                    />
                  }
                />
                <Route
                  path="/safety"
                  element={
                    <PlaceholderPage
                      title="Safety Tips"
                      description="Important safety guidelines for buying and selling on campus."
                    />
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PlaceholderPage
                      title="Contact Us"
                      description="Get in touch with our support team for assistance."
                    />
                  }
                />
                <Route
                  path="/report"
                  element={
                    <PlaceholderPage
                      title="Report Issue"
                      description="Report suspicious activity or problematic listings."
                    />
                  }
                />
                <Route
                  path="/privacy"
                  element={
                    <PlaceholderPage
                      title="Privacy Policy"
                      description="Learn how we protect and handle your personal information."
                    />
                  }
                />
                <Route
                  path="/terms"
                  element={
                    <PlaceholderPage
                      title="Terms of Service"
                      description="Read our terms and conditions for using CampusMarket."
                    />
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </FavoritesProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")).render(<App />);
