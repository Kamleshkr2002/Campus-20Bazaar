import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  GraduationCap, 
  Package, 
  Heart, 
  TrendingUp,
  LogOut,
  Settings,
  Plus,
  Eye
} from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Mock data for user stats
  const userStats = {
    activeListings: 3,
    totalSales: 12,
    totalEarnings: 450,
    favoriteItems: 8,
  };

  // Mock data for recent listings
  const recentListings = [
    {
      id: 1,
      title: "Calculus Textbook",
      price: 45,
      status: "Active",
      views: 23,
    },
    {
      id: 2,
      title: "MacBook Pro 2020",
      price: 800,
      status: "Active",
      views: 67,
    },
    {
      id: 3,
      title: "Study Desk",
      price: 120,
      status: "Sold",
      views: 34,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-brand-purple text-white text-lg">
                      {user?.name?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{user?.name}</h3>
                    <Badge variant="secondary">Verified Student</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <span>{user?.university}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Package className="w-8 h-8 mx-auto mb-2 text-brand-purple" />
                  <div className="text-2xl font-bold">{userStats.activeListings}</div>
                  <div className="text-xs text-muted-foreground">Active Listings</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">{userStats.totalSales}</div>
                  <div className="text-xs text-muted-foreground">Total Sales</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 text-yellow-500 text-lg">💰</div>
                  <div className="text-2xl font-bold">${userStats.totalEarnings}</div>
                  <div className="text-xs text-muted-foreground">Total Earnings</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <div className="text-2xl font-bold">{userStats.favoriteItems}</div>
                  <div className="text-xs text-muted-foreground">Favorites</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Listings */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Listings</CardTitle>
                  <Button 
                    className="bg-brand-purple hover:bg-brand-purple-dark"
                    onClick={() => navigate("/sell")}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Item
                  </Button>
                </div>
                <CardDescription>
                  Manage your current and past listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentListings.map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{listing.title}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-lg font-semibold text-brand-purple">
                            ${listing.price}
                          </span>
                          <Badge 
                            variant={listing.status === "Active" ? "default" : "secondary"}
                            className={listing.status === "Active" ? "bg-green-100 text-green-700" : ""}
                          >
                            {listing.status}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Eye className="w-4 h-4" />
                            {listing.views} views
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate("/sell")}
                  >
                    <Plus className="w-6 h-6" />
                    Sell New Item
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate("/browse")}
                  >
                    <Package className="w-6 h-6" />
                    Browse Items
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => navigate("/favorites")}
                  >
                    <Heart className="w-6 h-6" />
                    My Favorites
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
