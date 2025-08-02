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
  FileText,
  Users,
  Shield,
  AlertTriangle,
  Scale,
  CheckCircle,
  XCircle,
  Calendar,
  Mail,
} from "lucide-react";

export default function Terms() {
  const lastUpdated = "December 15, 2024";

  const prohibitedItems = [
    "Weapons, ammunition, or dangerous items",
    "Illegal drugs or controlled substances",
    "Alcohol or tobacco products",
    "Stolen or counterfeit goods",
    "Academic materials for cheating (test answers, etc.)",
    "Personal identification documents",
    "Adult content or materials",
    "Live animals or animal products",
    "Prescription medications",
    "Items requiring special licenses or permits",
  ];

  const userObligations = [
    {
      title: "Honest Representation",
      description:
        "Provide accurate descriptions and photos of items you're selling",
      icon: CheckCircle,
      type: "do",
    },
    {
      title: "Student Verification",
      description:
        "Maintain valid student status and keep your verification current",
      icon: CheckCircle,
      type: "do",
    },
    {
      title: "Safe Meeting Practices",
      description:
        "Meet in public campus locations and follow safety guidelines",
      icon: CheckCircle,
      type: "do",
    },
    {
      title: "Respectful Communication",
      description: "Treat all users with respect and professionalism",
      icon: CheckCircle,
      type: "do",
    },
    {
      title: "No Spam or Harassment",
      description: "Don't send unsolicited messages or harass other users",
      icon: XCircle,
      type: "dont",
    },
    {
      title: "No Fake Listings",
      description: "Don't create fake listings or misrepresent items",
      icon: XCircle,
      type: "dont",
    },
    {
      title: "No Price Manipulation",
      description:
        "Don't artificially inflate prices or engage in price fixing",
      icon: XCircle,
      type: "dont",
    },
    {
      title: "No Account Sharing",
      description: "Don't share your account credentials with others",
      icon: XCircle,
      type: "dont",
    },
  ];

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: FileText,
      content:
        "By creating an account and using CampusMarket, you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and CampusMarket. If you do not agree to these terms, you may not use our service.",
    },
    {
      id: "eligibility",
      title: "Eligibility",
      icon: Users,
      content:
        "CampusMarket is exclusively for verified college and university students. You must be currently enrolled as a student at a participating institution and provide valid student credentials for verification. Graduated students, faculty, and staff are not eligible to use the marketplace.",
    },
    {
      id: "platform-role",
      title: "Platform Role",
      icon: Shield,
      content:
        "CampusMarket serves as a platform connecting student buyers and sellers. We do not take possession of items, process payments, or guarantee transactions. All transactions occur directly between users. We are not responsible for the quality, safety, legality, or accuracy of listings.",
    },
    {
      id: "account-responsibilities",
      title: "Account Responsibilities",
      icon: Users,
      content:
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must immediately notify us of any unauthorized use. You may only create one account and must provide accurate, current information.",
    },
    {
      id: "content-policies",
      title: "Content and Conduct",
      icon: FileText,
      content:
        "All content you post must be accurate, lawful, and not infringe on others' rights. You retain ownership of your content but grant us a license to display it on our platform. We reserve the right to remove content that violates these terms or our community guidelines.",
    },
    {
      id: "termination",
      title: "Account Termination",
      icon: XCircle,
      content:
        "We may suspend or terminate your account for violations of these terms, fraudulent activity, or other harmful behavior. You may delete your account at any time. Upon termination, your access to the platform ends, but these terms continue to apply to past activities.",
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      icon: Scale,
      content:
        "CampusMarket is provided 'as is' without warranties. We are not liable for any damages arising from your use of the platform, transactions between users, or any content posted by users. Our liability is limited to the maximum extent permitted by law.",
    },
    {
      id: "governing-law",
      title: "Governing Law",
      icon: Scale,
      content:
        "These terms are governed by the laws of the state where your university is located. Any disputes will be resolved through binding arbitration. If any provision is found invalid, the remaining terms continue in effect.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            These terms govern your use of CampusMarket and establish the rules
            for our student marketplace community.
          </p>
          <Badge variant="outline" className="px-3 py-1">
            <Calendar className="w-4 h-4 mr-2" />
            Last updated: {lastUpdated}
          </Badge>
        </div>

        {/* Important Notice */}
        <Alert className="mb-8 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Important:</strong> These terms include binding arbitration
            and limitation of liability clauses. Please read them carefully as
            they affect your legal rights.
          </AlertDescription>
        </Alert>

        {/* Quick Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Students Only</CardTitle>
              <CardDescription>
                Platform exclusively for verified college students
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Safe Trading</CardTitle>
              <CardDescription>
                Follow safety guidelines and community standards
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Platform Role</CardTitle>
              <CardDescription>
                We facilitate connections, you handle transactions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Scale className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Fair Use</CardTitle>
              <CardDescription>
                Honest listings and respectful interactions
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Main Terms Sections */}
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Card key={section.id} id={section.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* User Guidelines */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Do's and Don'ts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span>User Guidelines</span>
              </CardTitle>
              <CardDescription>
                Essential do's and don'ts for CampusMarket users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Do's */}
                <div>
                  <h4 className="font-semibold text-green-700 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    What You Should Do
                  </h4>
                  <div className="space-y-3">
                    {userObligations
                      .filter((item) => item.type === "do")
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-green-900">
                              {item.title}
                            </h5>
                            <p className="text-sm text-green-700">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Don'ts */}
                <div>
                  <h4 className="font-semibold text-red-700 mb-4 flex items-center">
                    <XCircle className="w-5 h-5 mr-2" />
                    What You Shouldn't Do
                  </h4>
                  <div className="space-y-3">
                    {userObligations
                      .filter((item) => item.type === "dont")
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200"
                        >
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-red-900">
                              {item.title}
                            </h5>
                            <p className="text-sm text-red-700">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Items */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6" />
                <span>Prohibited Items</span>
              </CardTitle>
              <CardDescription className="text-red-700">
                These items may not be listed on CampusMarket under any
                circumstances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {prohibitedItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-2 bg-white rounded border border-red-200"
                  >
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span className="text-red-900 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Alert className="mt-4 border-red-300 bg-red-100">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  Listing prohibited items will result in immediate account
                  suspension and may be reported to university authorities.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Enforcement and Violations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-primary" />
                <span>Enforcement and Violations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    How We Handle Violations
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-700 text-xs font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h5 className="font-medium">Warning</h5>
                        <p className="text-sm text-muted-foreground">
                          First-time minor violations receive a warning and
                          education
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 text-xs font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h5 className="font-medium">Temporary Suspension</h5>
                        <p className="text-sm text-muted-foreground">
                          Repeated violations or moderate offenses result in
                          temporary suspension
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-red-700 text-xs font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h5 className="font-medium">Permanent Ban</h5>
                        <p className="text-sm text-muted-foreground">
                          Serious violations or repeated offenses result in
                          permanent account termination
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">
                    Appeals Process
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    If you believe your account was suspended or terminated in
                    error, you may appeal by:
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Emailing support@campusmarket.edu within 30 days</li>
                    <li>
                      • Providing detailed explanation of the circumstances
                    </li>
                    <li>• Including any relevant evidence or documentation</li>
                    <li>
                      • Waiting for our review team's decision (typically 5-7
                      business days)
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact and Changes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Questions About These Terms?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact our legal team for clarification
                  </p>
                  <div className="space-y-2">
                    <p className="text-primary font-medium">
                      legal@campusmarket.edu
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Response time: 3-5 business days for legal inquiries
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Changes to Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p className="text-muted-foreground">
                    We may update these terms periodically. When we do:
                  </p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• You'll receive 30 days advance notice</li>
                    <li>• Significant changes require your consent</li>
                    <li>• Continued use constitutes acceptance</li>
                    <li>• You can opt out by deleting your account</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
