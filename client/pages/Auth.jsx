import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Lock, GraduationCap } from "lucide-react";

export default function Auth() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
  });
  const [activeTab, setActiveTab] = useState("login");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login - replace with actual authentication logic
    if (loginForm.email && loginForm.password) {
      const userData = {
        id: 1,
        name: "Demo User",
        email: loginForm.email,
        university: "Demo University",
      };
      login(userData);
      navigate("/dashboard");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate registration - replace with actual registration logic
    if (
      registerForm.name &&
      registerForm.email &&
      registerForm.password &&
      registerForm.password === registerForm.confirmPassword
    ) {
      const userData = {
        id: 1,
        name: registerForm.name,
        email: registerForm.email,
        university: registerForm.university,
      };
      login(userData);
      navigate("/dashboard");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to CampusMarket
        </h1>
        <p className="text-muted-foreground">
          Join your campus marketplace community
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-purple-dark">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Join your campus marketplace today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerForm.name}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, name: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerForm.email}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, email: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-university">University</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-university"
                      type="text"
                      placeholder="Enter your university"
                      value={registerForm.university}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, university: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Create a password"
                      value={registerForm.password}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, password: e.target.value })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerForm.confirmPassword}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-purple-dark">
                  Create Account
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
