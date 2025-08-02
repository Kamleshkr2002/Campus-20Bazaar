import { Link } from "react-router-dom";
import {
  Search,
  MessageCircle,
  CreditCard,
  Shield,
  Star,
  Users,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Camera,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    step: 1,
    title: "Browse & Search",
    description: "Find what you need from fellow students on your campus",
    icon: Search,
    details: [
      "Search by category or keywords",
      "Filter by location, price, and condition",
      "View detailed photos and descriptions",
      "Check seller ratings and reviews",
    ],
    color: "bg-blue-100 text-blue-700",
  },
  {
    step: 2,
    title: "Connect & Chat",
    description: "Message sellers to ask questions and arrange meetups",
    icon: MessageCircle,
    details: [
      "Built-in messaging system",
      "Ask about condition, availability",
      "Negotiate prices respectfully",
      "Arrange safe meeting locations",
    ],
    color: "bg-green-100 text-green-700",
  },
  {
    step: 3,
    title: "Meet & Pay",
    description: "Complete the transaction safely on campus",
    icon: CreditCard,
    details: [
      "Meet in public campus locations",
      "Inspect items before buying",
      "Pay cash or use secure payment apps",
      "Complete the exchange safely",
    ],
    color: "bg-purple-100 text-purple-700",
  },
];

const sellingSteps = [
  {
    icon: Camera,
    title: "Take Great Photos",
    description: "Clear, well-lit photos from multiple angles",
  },
  {
    icon: DollarSign,
    title: "Set Fair Prices",
    description: "Research similar items and price competitively",
  },
  {
    icon: MessageCircle,
    title: "Respond Quickly",
    description: "Fast responses lead to faster sales",
  },
  {
    icon: MapPin,
    title: "Meet Safely",
    description: "Choose public campus locations for exchanges",
  },
];

const safetyTips = [
  {
    icon: Users,
    title: "Meet in Public",
    description: "Always meet in well-lit, busy campus areas",
    type: "success",
  },
  {
    icon: Shield,
    title: "Trust Your Instincts",
    description: "If something feels off, don't proceed with the transaction",
    type: "warning",
  },
  {
    icon: AlertTriangle,
    title: "Verify Identity",
    description: "Make sure the seller is actually a student at your school",
    type: "warning",
  },
  {
    icon: CheckCircle,
    title: "Inspect Before Buying",
    description: "Always examine items thoroughly before completing payment",
    type: "success",
  },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-lavender via-white to-brand-lavender-dark py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              How{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-purple-light">
                CampusMarket
              </span>{" "}
              Works
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your trusted marketplace for buying and selling with fellow
              students. Safe, simple, and designed for campus life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-brand-purple hover:bg-brand-purple-dark"
              >
                <Link to="/browse">
                  Start Shopping
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

      {/* How to Buy */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How to Buy
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting what you need from fellow students is easy and safe
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <step.icon className="w-8 h-8" />
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className="text-sm font-semibold"
                      >
                        Step {step.step}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Sell */}
      <section className="py-16 lg:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How to Sell
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Turn your unused items into cash with these simple tips
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sellingSteps.map((step, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-brand-purple" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              asChild
              className="bg-brand-purple hover:bg-brand-purple-dark"
            >
              <Link to="/sell">
                List Your First Item
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Safety First
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your safety is our top priority. Follow these guidelines for
              secure transactions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {safetyTips.map((tip, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        tip.type === "success"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      <tip.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {tip.title}
                      </h3>
                      <p className="text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/safety">
                Read Full Safety Guide
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose CampusMarket?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Student Community</h3>
              <p className="text-muted-foreground">
                Connect with verified students from your campus for trustworthy
                transactions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Safe & Secure</h3>
              <p className="text-muted-foreground">
                Built-in safety features and guidelines to protect both buyers
                and sellers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Great Deals</h3>
              <p className="text-muted-foreground">
                Find textbooks, electronics, and more at student-friendly prices
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
