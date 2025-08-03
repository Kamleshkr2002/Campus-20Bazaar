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
  Eye,
  Lock,
  Users,
  Database,
  FileText,
  Globe,
  Mail,
  Calendar,
} from "lucide-react";

export default function Privacy() {
  const lastUpdated = "December 15, 2024";

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Student email address and university affiliation",
            "Full name and profile information",
            "Photos you upload for listings or profile",
            "Location data when you use location-based features",
            "Communication history within the platform",
          ],
        },
        {
          subtitle: "Usage Information",
          items: [
            "Device information and browser type",
            "IP address and general location",
            "Pages visited and features used",
            "Time and duration of app usage",
            "Search queries and preferences",
          ],
        },
        {
          subtitle: "Transaction Information",
          items: [
            "Listings you create, view, or interact with",
            "Messages sent through our platform",
            "Reports and feedback you submit",
            "Account settings and preferences",
          ],
        },
      ],
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "Platform Operation",
          items: [
            "Facilitate buying and selling between students",
            "Verify student status and prevent fraud",
            "Provide customer support and resolve disputes",
            "Send important notifications about your account",
            "Improve our services and user experience",
          ],
        },
        {
          subtitle: "Safety and Security",
          items: [
            "Monitor for suspicious activity and violations",
            "Investigate reports and enforce community guidelines",
            "Prevent spam, fraud, and unauthorized access",
            "Maintain platform security and integrity",
          ],
        },
        {
          subtitle: "Communication",
          items: [
            "Send updates about your listings and interactions",
            "Notify you of important policy changes",
            "Provide tips for safe trading practices",
            "Share relevant marketplace opportunities",
          ],
        },
      ],
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: Users,
      content: [
        {
          subtitle: "What We Share",
          items: [
            "Your public profile information with other users",
            "Listing details you choose to make public",
            "Basic verification status (student verified)",
            "General location (university/campus area only)",
          ],
        },
        {
          subtitle: "What We Don't Share",
          items: [
            "Your personal email address or phone number",
            "Private messages between users",
            "Personal identification documents",
            "Specific home address or location data",
            "Financial information or payment details",
          ],
        },
        {
          subtitle: "Third Party Sharing",
          items: [
            "We do not sell your personal information to third parties",
            "Limited sharing with service providers for platform operation",
            "Legal compliance when required by law",
            "Aggregated, anonymized data for research purposes only",
          ],
        },
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Protection Measures",
          items: [
            "Encryption of data in transit and at rest",
            "Secure servers with regular security updates",
            "Access controls limiting who can view your data",
            "Regular security audits and monitoring",
            "Secure deletion of data when no longer needed",
          ],
        },
        {
          subtitle: "Your Role in Security",
          items: [
            "Use strong, unique passwords for your account",
            "Don't share your login credentials with others",
            "Report suspicious activity immediately",
            "Keep your app updated to the latest version",
            "Be cautious about information you share publicly",
          ],
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your Privacy Rights",
      icon: Shield,
      content: [
        {
          subtitle: "Access and Control",
          items: [
            "View and update your profile information anytime",
            "Download a copy of your personal data",
            "Delete your account and associated data",
            "Control who can see your listings and profile",
            "Opt out of non-essential communications",
          ],
        },
        {
          subtitle: "Data Retention",
          items: [
            "Active account data retained while your account exists",
            "Deleted listings removed within 30 days",
            "Account data deleted within 90 days of account closure",
            "Legal compliance data retained as required by law",
            "Anonymized usage data may be retained for research",
          ],
        },
      ],
    },
  ];

  const contactInfo = {
    email: "privacy@campusbazaar.edu",
    address: "Student Technology Center, Building A, Room 201",
    phone: "(555) 987-6543",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            We're committed to protecting your privacy and being transparent
            about how we handle your information.
          </p>
          <Badge variant="outline" className="px-3 py-1">
            <Calendar className="w-4 h-4 mr-2" />
            Last updated: {lastUpdated}
          </Badge>
        </div>

        {/* Quick Summary */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>TL;DR:</strong> We only collect information necessary to run
            the marketplace safely. We don't sell your data to third parties.
            You control your information and can delete your account anytime.
          </AlertDescription>
        </Alert>

        {/* Privacy Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Data Minimization</CardTitle>
              <CardDescription>
                We only collect information that's necessary for the marketplace
                to function safely and effectively.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">User Control</CardTitle>
              <CardDescription>
                You decide what information to share and can update, download,
                or delete your data at any time.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Transparency</CardTitle>
              <CardDescription>
                We're clear about what data we collect, how we use it, and who
                we share it with (spoiler: very few people).
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
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
                  <div className="space-y-6">
                    {section.content.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h4 className="font-semibold text-foreground mb-3">
                          {subsection.subtitle}
                        </h4>
                        <ul className="space-y-2">
                          {subsection.items.map((item, itemIndex) => (
                            <li
                              key={itemIndex}
                              className="flex items-start space-x-2"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></div>
                              <span className="text-muted-foreground">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Student-Specific Information */}
          <Card className="bg-accent/20 border-accent">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-primary" />
                <span>Student Privacy Protections</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  As a student-focused platform, we take extra steps to protect
                  your academic privacy:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-muted-foreground">
                      We never share your academic information with
                      non-university entities
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-muted-foreground">
                      Your student status is verified securely without exposing
                      personal details
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-muted-foreground">
                      University partnerships are limited to verification
                      purposes only
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-muted-foreground">
                      Data is automatically deleted when you graduate or leave
                      the university
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Updates and Changes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Policy Updates</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We may update this privacy policy from time to time. When we
                  do:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-muted-foreground">
                      We'll notify you via email and in-app notification
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-muted-foreground">
                      The updated date will be clearly displayed at the top
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-muted-foreground">
                      Significant changes will require your explicit consent
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-muted-foreground">
                      You can always opt out by deleting your account
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Questions About Your Privacy?
                </h3>
                <p className="text-muted-foreground">
                  We're here to help you understand how your data is handled
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Email</h4>
                  <p className="text-primary font-medium">
                    {contactInfo.email}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Office</h4>
                  <p className="text-sm text-muted-foreground">
                    {contactInfo.address}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Phone</h4>
                  <p className="text-primary font-medium">
                    {contactInfo.phone}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-muted-foreground">
                  Response time: We typically respond to privacy inquiries
                  within 48 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
