import React from "react";
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
import Help from "./pages/Help";
import HowItWorks from "./pages/HowItWorks";
import Messages from "./pages/Messages";
import Safety from "./pages/Safety";
import Contact from "./pages/Contact";
import Report from "./pages/Report";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

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
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/help" element={<Help />} />
                <Route path="/safety" element={<Safety />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/report" element={<Report />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
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

const container = document.getElementById("root");
if (!container._reactRoot) {
  container._reactRoot = createRoot(container);
}
container._reactRoot.render(<App />);
