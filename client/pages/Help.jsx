import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Search,
  MessageCircle,
  ShoppingBag,
  CreditCard,
  Shield,
  Users,
  BookOpen,
  Phone,
} from "lucide-react";

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: BookOpen,
      description: "Learn the basics of using CampusMarket",
      articles: [
        "How to create your first listing",
        "Setting up your student profile",
        "Navigating the marketplace",
        "Understanding our verification process",
      ],
    },
    {
      id: "buying",
      title: "Buying Items",
      icon: ShoppingBag,
      description: "Everything you need to know about purchasing",
      articles: [
        "How to search for items",
        "Making an offer on listings",
        "Communicating with sellers",
        "Arranging pickup and payment",
      ],
    },
    {
      id: "selling",
      title: "Selling Items",
      icon: CreditCard,
      description: "Tips for successful selling",
      articles: [
        "Creating compelling listings",
        "Pricing your items competitively",
        "Managing inquiries from buyers",
        "Best practices for item photos",
      ],
    },
    {
      id: "safety",
      title: "Safety & Security",
      icon: Shield,
      description: "Stay safe while trading",
      articles: [
        "Meeting safely on campus",
        "Identifying scams and fraud",
        "Payment security tips",
        "What to do if something goes wrong",
      ],
    },
    {
      id: "community",
      title: "Community Guidelines",
      icon: Users,
      description: "Rules and etiquette for our marketplace",
      articles: [
        "Prohibited items and services",
        "Respectful communication standards",
        "Consequences for violations",
        "How to report inappropriate behavior",
      ],
    },
    {
      id: "support",
      title: "Get Support",
      icon: MessageCircle,
      description: "Contact us for additional help",
      articles: [
        "Submitting a support ticket",
        "Reporting technical issues",
        "Account recovery assistance",
        "Live chat availability",
      ],
    },
  ];

  const faqItems = [
    {
      question: "How do I verify my student status?",
      answer:
        "You can verify your student status by uploading a valid student ID or providing your .edu email address. Verification typically takes 24-48 hours.",
    },
    {
      question: "Is CampusMarket free to use?",
      answer:
        "Yes! CampusMarket is completely free for all students. We don't charge listing fees or transaction fees.",
    },
    {
      question: "How do I arrange payment with other students?",
      answer:
        "Payment arrangements are made directly between buyers and sellers. We recommend cash transactions for in-person meetups, or secure payment apps like Venmo or Zelle.",
    },
    {
      question: "What if an item I bought doesn't match the description?",
      answer:
        "Contact the seller first to resolve the issue. If you can't reach an agreement, you can report the issue through our platform and our team will help mediate.",
    },
    {
      question: "Can I sell items to students from other universities?",
      answer:
        "CampusMarket is designed for campus-specific communities. You can only buy and sell within your own university's marketplace.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "You can delete your account by going to Settings > Account > Delete Account. Note that this action is permanent and cannot be undone.",
    },
  ];

  const filteredCategories = categories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.articles.some((article) =>
        article.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Help Center
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers to common questions and learn how to make the most of
            CampusMarket
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Contact Support</CardTitle>
              <CardDescription>
                Get direct help from our support team
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Live Chat</CardTitle>
              <CardDescription>
                Chat with us in real-time during business hours
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Video Tutorials</CardTitle>
              <CardDescription>
                Watch step-by-step guides and tutorials
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Help Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {category.title}
                        </CardTitle>
                        <CardDescription>
                          {category.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.articles.slice(0, 3).map((article, index) => (
                        <div
                          key={index}
                          className="text-sm text-muted-foreground hover:text-primary cursor-pointer"
                        >
                          • {article}
                        </div>
                      ))}
                      {category.articles.length > 3 && (
                        <div className="text-sm text-primary cursor-pointer font-medium">
                          + {category.articles.length - 3} more articles
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Quick answers to the most common questions we receive
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Contact Banner */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Still need help?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to help you with any questions or issues
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Badge variant="outline" className="px-4 py-2">
                📧 support@campusmarket.edu
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                💬 Live chat: Mon-Fri 9AM-5PM
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
