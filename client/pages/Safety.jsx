import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Shield,
  MapPin,
  CreditCard,
  Eye,
  AlertTriangle,
  CheckCircle,
  Users,
  MessageCircle,
  Clock,
  Phone,
} from "lucide-react";

export default function Safety() {
  const safetyTips = [
    {
      category: "Meeting Safely",
      icon: MapPin,
      color: "bg-blue-500/10 text-blue-600",
      tips: [
        "Always meet in public, well-lit areas on campus",
        "Bring a friend or let someone know where you're going",
        "Meet during daylight hours when possible",
        "Choose busy locations like the student center or library",
        "Never meet at your dorm room or private residence",
        "Trust your instincts - if something feels off, leave",
      ],
    },
    {
      category: "Payment Security",
      icon: CreditCard,
      color: "bg-green-500/10 text-green-600",
      tips: [
        "Use cash for in-person transactions when possible",
        "For digital payments, use secure apps like Venmo or Zelle",
        "Never send money before seeing the item in person",
        "Avoid wire transfers or unusual payment methods",
        "Get a receipt or confirmation for expensive items",
        "Count cash carefully during the transaction",
      ],
    },
    {
      category: "Verifying Items",
      icon: Eye,
      color: "bg-purple-500/10 text-purple-600",
      tips: [
        "Inspect items thoroughly before purchasing",
        "Ask for proof of purchase for expensive electronics",
        "Test electronic devices before buying",
        "Check textbook editions and condition carefully",
        "Ask about warranty or return policies",
        "Take photos of items for your records",
      ],
    },
    {
      category: "Communication",
      icon: MessageCircle,
      color: "bg-orange-500/10 text-orange-600",
      tips: [
        "Keep all communication on the CampusBazaar platform",
        "Be professional and respectful in all messages",
        "Save important conversations and agreements",
        "Don't share personal information unnecessarily",
        "Report suspicious or inappropriate messages",
        "Be clear about terms and expectations",
      ],
    },
  ];

  const redFlags = [
    "Seller refuses to meet in person",
    "Price seems too good to be true",
    "Requests payment before meeting",
    "Poor grammar or suspicious messages",
    "Pressure to complete transaction quickly",
    "Asks for personal financial information",
    "Won't provide additional photos or details",
    "Account created very recently",
    "No student verification badge",
  ];

  const emergencyContacts = [
    {
      service: "Campus Security",
      number: "(555) 123-4567",
      description: "24/7 campus safety and security",
    },
    {
      service: "Local Police",
      number: "911",
      description: "Emergency situations only",
    },
    {
      service: "CampusBazaar Support",
      number: "(555) 987-6543",
      description: "Report marketplace issues",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Safety Tips
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your safety is our top priority. Follow these guidelines to have
            secure and positive experiences on CampusBazaar.
          </p>
        </div>

        {/* Important Safety Alert */}
        <Alert className="mb-8 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Important:</strong> Never share your password, student ID
            number, or other sensitive personal information with other users.
            CampusBazaar staff will never ask for this information.
          </AlertDescription>
        </Alert>

        {/* Safety Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {safetyTips.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-xl">
                      {category.category}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Red Flags Section */}
        <div className="mb-12">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <div>
                  <CardTitle className="text-red-900">
                    Red Flags to Watch For
                  </CardTitle>
                  <CardDescription className="text-red-700">
                    Be cautious if you encounter any of these warning signs
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {redFlags.map((flag, index) => (
                  <Badge
                    key={index}
                    variant="destructive"
                    className="p-3 text-center justify-center"
                  >
                    {flag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Best Practices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-primary" />
                <CardTitle>Before You Meet</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Plan Ahead</h4>
                  <p className="text-sm text-muted-foreground">
                    Confirm the meeting time, location, and item details in
                    advance
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-4 h-4 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Communicate Clearly</h4>
                  <p className="text-sm text-muted-foreground">
                    Ask questions about the item condition and have clear
                    expectations
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-4 h-4 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Verify the Seller</h4>
                  <p className="text-sm text-muted-foreground">
                    Check their profile, reviews, and student verification
                    status
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <CardTitle>During the Transaction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Eye className="w-4 h-4 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Inspect Thoroughly</h4>
                  <p className="text-sm text-muted-foreground">
                    Check the item matches the description and is in good
                    condition
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CreditCard className="w-4 h-4 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Handle Payment Safely</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete payment only after you're satisfied with the item
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Stay Connected</h4>
                  <p className="text-sm text-muted-foreground">
                    Keep your phone charged and let someone know your location
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Phone className="w-6 h-6 text-primary" />
              <span>Emergency Contacts</span>
            </CardTitle>
            <CardDescription>
              Keep these numbers handy for any safety concerns or emergencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">
                    {contact.service}
                  </h4>
                  <p className="text-2xl font-bold text-primary mb-1">
                    {contact.number}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {contact.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Final Safety Reminder */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">
              When in Doubt, Don't Proceed
            </h3>
            <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
              Trust your instincts. If a transaction or situation doesn't feel
              right, it's better to walk away. There will always be other
              opportunities to buy or sell items safely.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge variant="outline" className="px-4 py-2">
                🚨 Report suspicious activity immediately
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                💭 Trust your gut feelings
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                👥 Safety in numbers
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
