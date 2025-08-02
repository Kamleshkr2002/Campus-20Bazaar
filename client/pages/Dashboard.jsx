import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { EditProfile } from "@/components/EditProfile";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  GraduationCap,
  Package,
  MessageCircle,
  TrendingUp,
  LogOut,
  Settings,
  Plus,
  Eye,
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
    activeChats: 5,
  };

  // Mock data for recent listings - set to empty to test no listings state
  const recentListings = [];

  // Example with listings:
  // const recentListings = [
  //   {
  //     id: 1,
  //     title: "Calculus Textbook",
  //     price: 45,
  //     status: "Active",
  //     views: 23,
  //   },
  //   {
  //     id: 2,
  //     title: "MacBook Pro 2020",
  //     price: 800,
  //     status: "Active",
  //     views: 67,
  //   },
  //   {
  //     id: 3,
  //     title: "Study Desk",
  //     price: 120,
  //     status: "Sold",
  //     views: 34,
  //   },
  // ];

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
          {/* Profile and Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
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
                      {user?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
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

                <EditProfile>
                  <Button variant="outline" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </EditProfile>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  <Button
                    variant="outline"
                    className="h-16 flex items-center justify-start gap-3 px-4"
                    onClick={() => navigate("/sell")}
                  >
                    <Plus className="w-5 h-5" />
                    Sell New Item
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex items-center justify-start gap-3 px-4"
                    onClick={() => navigate("/browse")}
                  >
                    <Package className="w-5 h-5" />
                    Browse Items
                  </Button>
                  <Button
                    variant="outline"
                    className="h-16 flex items-center justify-start gap-3 px-4"
                    onClick={() => navigate("/favorites")}
                  >
                    <Heart className="w-5 h-5" />
                    My Favorites
                  </Button>
                </div>
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
                  <div className="text-2xl font-bold">
                    {userStats.activeListings}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Active Listings
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">
                    {userStats.totalSales}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Sales
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <div className="w-8 h-8 mx-auto mb-2 text-yellow-500 text-lg">
                    💰
                  </div>
                  <div className="text-2xl font-bold">
                    ${userStats.totalEarnings}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total Earnings
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <div className="text-2xl font-bold">
                    {userStats.favoriteItems}
                  </div>
                  <div className="text-xs text-muted-foreground">Favorites</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Listings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Listings</CardTitle>
                <CardDescription>
                  Manage your current and past listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentListings.length > 0 ? (
                  <div className="space-y-4">
                    {recentListings.map((listing) => (
                      <div
                        key={listing.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{listing.title}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-lg font-semibold text-brand-purple">
                              ${listing.price}
                            </span>
                            <Badge
                              variant={
                                listing.status === "Active"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                listing.status === "Active"
                                  ? "bg-green-100 text-green-700"
                                  : ""
                              }
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
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Package className="w-16 h-16 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No listings yet
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-sm">
                      Start selling items to your campus community and see them
                      appear here.
                    </p>
                    <Button
                      className="bg-brand-purple hover:bg-brand-purple-dark"
                      onClick={() => navigate("/sell")}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Item
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
