import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { 
  BookOpen, 
  Search, 
  MessageCircle, 
  MapPin, 
  CreditCard,
  Shield,
  UserCheck,
  Camera,
  DollarSign,
  CheckCircle,
  Star,
  Clock,
  Users,
  Lightbulb,
  Zap,
  Heart,
  ArrowRight,
  Plus,
  Eye
} from "lucide-react";

export default function HowItWorks() {
  const steps = {
    buying: [
      {
        step: 1,
        title: "Browse & Search",
        description: "Find items you need using our search or category filters",
        icon: Search,
        details: [
          "Search by keywords, category, or price range",
          "Filter by condition, location, and seller rating",
          "Save items to your favorites for later",
          "Set up alerts for specific items you're looking for"
        ]
      },
      {
        step: 2,
        title: "Contact Seller",
        description: "Message the seller to ask questions and arrange details",
        icon: MessageCircle,
        details: [
          "Use our secure messaging system",
          "Ask about condition, availability, and price",
          "Negotiate price if the seller allows offers",
          "Agree on meeting time and location"
        ]
      },
      {
        step: 3,
        title: "Meet Safely",
        description: "Meet in a public campus location to inspect and purchase",
        icon: MapPin,
        details: [
          "Meet in well-lit, public campus areas",
          "Bring a friend or let someone know where you're going",
          "Inspect the item thoroughly before paying",
          "Complete payment using cash or secure digital methods"
        ]
      },
      {
        step: 4,
        title: "Leave Feedback",
        description: "Rate your experience to help build trust in our community",
        icon: Star,
        details: [
          "Rate the seller and transaction",
          "Leave honest feedback about the item condition",
          "Help other students make informed decisions",
          "Build your own reputation as a reliable buyer"
        ]
      }
    ],
    selling: [
      {
        step: 1,
        title: "Create Listing",
        description: "Upload photos and write a detailed description of your item",
        icon: Camera,
        details: [
          "Take clear, well-lit photos from multiple angles",
          "Write honest, detailed descriptions",
          "Set a fair price based on condition",
          "Choose the right category for maximum visibility"
        ]
      },
      {
        step: 2,
        title: "Manage Inquiries",
        description: "Respond to messages and manage potential buyers",
        icon: MessageCircle,
        details: [
          "Respond promptly to buyer questions",
          "Be honest about item condition and history",
          "Arrange viewings or meetings as needed",
          "Consider reasonable offers if you're open to negotiation"
        ]
      },
      {
        step: 3,
        title: "Complete Sale",
        description: "Meet the buyer and finalize the transaction safely",
        icon: DollarSign,
        details: [
          "Meet in safe, public campus locations",
          "Let the buyer inspect the item thoroughly",
          "Complete payment and transfer ownership",
          "Mark the item as sold on the platform"
        ]
      },
      {
        step: 4,
        title: "Build Reputation",
        description: "Earn positive reviews to become a trusted seller",
        icon: CheckCircle,
        details: [
          "Provide excellent customer service",
          "Be honest and transparent in all dealings",
          "Ship or deliver items as promised",
          "Encourage buyers to leave feedback"
        ]
      }
    ]
  };

  const features = [
    {
      icon: UserCheck,
      title: "Student Verification",
      description: "All users must verify their student status with a valid .edu email or student ID.",
      benefit: "Ensures you're dealing with fellow students only"
    },
    {
      icon: Shield,
      title: "Safe Messaging",
      description: "All communication happens through our secure platform messaging system.",
      benefit: "Protects your personal contact information"
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Advanced search filters help you find exactly what you're looking for quickly.",
      benefit: "Save time with targeted search results"
    },
    {
      icon: Heart,
      title: "Favorites & Alerts",
      description: "Save items you like and get notified when similar items are posted.",
      benefit: "Never miss out on great deals"
    },
    {
      icon: Star,
      title: "Rating System",
      description: "User ratings and reviews help you make informed decisions about who to trade with.",
      benefit: "Build trust within the student community"
    },
    {
      icon: Zap,
      title: "Quick Listing",
      description: "Create listings in under 2 minutes with our streamlined posting process.",
      benefit: "Get your items listed and sold faster"
    }
  ];

  const tips = [
    {
      category: "Pricing",
      icon: DollarSign,
      tips: [
        "Research similar items to set competitive prices",
        "Consider the item's age, condition, and original price",
        "Be open to reasonable offers from serious buyers",
        "Factor in demand - textbooks sell quickly at semester start"
      ]
    },
    {
      category: "Photography",
      icon: Camera,
      tips: [
        "Use natural lighting whenever possible",
        "Take photos from multiple angles",
        "Show any flaws or wear honestly",
        "Include size references for clothing and furniture"
      ]
    },
    {
      category: "Communication",
      icon: MessageCircle,
      tips: [
        "Respond to messages within 24 hours",
        "Be friendly and professional in all interactions",
        "Ask clarifying questions to avoid misunderstandings",
        "Confirm meeting details in writing"
      ]
    },
    {
      category: "Safety",
      icon: Shield,
      tips: [
        "Always meet in public, well-lit campus areas",
        "Bring a friend or tell someone where you're going",
        "Trust your instincts - if something feels wrong, walk away",
        "Use cash or secure payment apps for transactions"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">How CampusMarket Works</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your complete guide to buying and selling safely within the student community. 
            Join thousands of students who trust CampusMarket for their campus trading needs.
          </p>
        </div>

        {/* Quick Overview */}
        <Alert className="mb-12 border-blue-200 bg-blue-50">
          <Lightbulb className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>New to CampusMarket?</strong> Start by verifying your student status, then browse items or create your first listing. 
            All transactions happen directly between students - we just provide the platform to connect you safely.
          </AlertDescription>
        </Alert>

        {/* Getting Started */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Getting Started</h2>
            <p className="text-muted-foreground">
              Three simple steps to join the CampusMarket community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">1. Verify Your Status</CardTitle>
                <CardDescription>
                  Create an account using your student email (.edu) to get verified
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">2. Explore & Connect</CardTitle>
                <CardDescription>
                  Browse items or create listings to start trading with fellow students
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">3. Trade Safely</CardTitle>
                <CardDescription>
                  Meet in public campus areas and build your reputation in the community
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* How to Buy and Sell */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Buying Process */}
          <div>
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">How to Buy</h3>
              <p className="text-muted-foreground">Find great deals on items you need</p>
            </div>
            
            <div className="space-y-6">
              {steps.buying.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            <Badge variant="outline" className="mr-2">Step {step.step}</Badge>
                            {step.title}
                          </CardTitle>
                          <CardDescription>{step.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Selling Process */}
          <div>
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">How to Sell</h3>
              <p className="text-muted-foreground">Turn your unused items into cash</p>
            </div>
            
            <div className="space-y-6">
              {steps.selling.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            <Badge variant="outline" className="mr-2">Step {step.step}</Badge>
                            {step.title}
                          </CardTitle>
                          <CardDescription>{step.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Platform Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose CampusMarket?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We've built features specifically for the student community to make trading safe, easy, and trustworthy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="pt-2 border-t">
                      <p className="text-sm font-medium text-primary">{feature.benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tips for Success */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Tips for Success</h2>
            <p className="text-muted-foreground">
              Pro tips from experienced CampusMarket users to help you succeed
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tips.map((tipCategory, index) => {
              const IconComponent = tipCategory.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-primary" />
                      </div>
                      <span>{tipCategory.category} Tips</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tipCategory.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <Card className="bg-accent/20 border-accent">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
                <span>Typical Timeline</span>
              </CardTitle>
              <CardDescription className="text-center">
                Here's what to expect for a typical transaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">Browse & Find</h4>
                  <p className="text-sm text-muted-foreground">5-15 minutes</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">Message & Arrange</h4>
                  <p className="text-sm text-muted-foreground">1-24 hours</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">Meet & Inspect</h4>
                  <p className="text-sm text-muted-foreground">15-30 minutes</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">Complete & Review</h4>
                  <p className="text-sm text-muted-foreground">5 minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of students who are already saving money and finding great deals on CampusMarket. 
              Whether you're looking to buy textbooks or sell furniture, we make it safe and easy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <a href="/browse">
                  <Search className="w-4 h-4 mr-2" />
                  Start Browsing
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/sell">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Listing
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <Badge variant="secondary" className="px-3 py-1">
                ✅ Student Verified
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                🛡️ Safe & Secure
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                💬 Direct Messaging
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                ⭐ User Reviews
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
