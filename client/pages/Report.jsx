import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  AlertTriangle,
  Flag,
  Shield,
  FileText,
  Camera,
  Upload,
  CheckCircle,
  MessageCircle,
  Users,
  CreditCard,
  Zap,
  Phone,
} from "lucide-react";

export default function Report() {
  const [formData, setFormData] = useState({
    reportType: "",
    userReported: "",
    listingId: "",
    description: "",
    evidence: "",
    anonymous: false,
    contactInfo: "",
    severity: "medium",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Report submitted:", formData);
    setIsSubmitted(true);
    // Reset form
    setFormData({
      reportType: "",
      userReported: "",
      listingId: "",
      description: "",
      evidence: "",
      anonymous: false,
      contactInfo: "",
      severity: "medium",
    });
    setUploadedFiles([]);
  };

  const reportTypes = [
    {
      value: "scam",
      label: "Scam or Fraud",
      description:
        "Suspicious payment requests, fake items, or fraudulent behavior",
      icon: Shield,
      severity: "high",
    },
    {
      value: "inappropriate",
      label: "Inappropriate Content",
      description: "Offensive messages, inappropriate photos, or harassment",
      icon: Flag,
      severity: "medium",
    },
    {
      value: "prohibited",
      label: "Prohibited Items",
      description: "Items that violate our marketplace policies",
      icon: AlertTriangle,
      severity: "medium",
    },
    {
      value: "spam",
      label: "Spam or Fake Listings",
      description: "Duplicate posts, spam messages, or fake accounts",
      icon: MessageCircle,
      severity: "low",
    },
    {
      value: "safety",
      label: "Safety Concern",
      description: "Unsafe meeting requests or threatening behavior",
      icon: Shield,
      severity: "high",
    },
    {
      value: "technical",
      label: "Technical Issue",
      description: "App bugs, payment problems, or system errors",
      icon: Zap,
      severity: "medium",
    },
  ];

  const emergencyContacts = [
    {
      situation: "Immediate physical danger",
      contact: "Call 911",
      description: "If you're in immediate danger",
    },
    {
      situation: "Campus security concern",
      contact: "Campus Security: (555) 123-4567",
      description: "For on-campus safety issues",
    },
    {
      situation: "Financial fraud",
      contact: "Report to local police",
      description: "If money was stolen or fraud occurred",
    },
  ];

  const selectedReportType = reportTypes.find(
    (type) => type.value === formData.reportType,
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Flag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Report an Issue
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us keep CampusMarket safe and secure by reporting any issues,
            violations, or concerns you encounter.
          </p>
        </div>

        {/* Emergency Alert */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Emergency?</strong> If you're in immediate danger or
            experiencing a serious threat, call 911 or campus security
            immediately.
          </AlertDescription>
        </Alert>

        {/* Success Message */}
        {isSubmitted && (
          <Alert className="mb-8 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Report submitted successfully!</strong> We take all
              reports seriously and will investigate promptly. You'll receive
              updates via email if you provided contact information.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Submit a Report</span>
                </CardTitle>
                <CardDescription>
                  Please provide as much detail as possible to help us address
                  your concern
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Report Type Selection */}
                  <div className="space-y-4">
                    <Label>What are you reporting?</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {reportTypes.map((type) => {
                        const IconComponent = type.icon;
                        const isSelected = formData.reportType === type.value;
                        return (
                          <div
                            key={type.value}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              isSelected
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() =>
                              handleInputChange("reportType", type.value)
                            }
                          >
                            <div className="flex items-start space-x-3">
                              <IconComponent
                                className={`w-5 h-5 mt-1 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                              />
                              <div>
                                <h4
                                  className={`font-medium text-sm ${isSelected ? "text-primary" : "text-foreground"}`}
                                >
                                  {type.label}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {type.description}
                                </p>
                                <Badge
                                  variant={
                                    type.severity === "high"
                                      ? "destructive"
                                      : type.severity === "medium"
                                        ? "secondary"
                                        : "outline"
                                  }
                                  className="mt-2 text-xs"
                                >
                                  {type.severity} priority
                                </Badge>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {formData.reportType && (
                    <>
                      {/* Additional Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="userReported">
                            User/Seller Involved (optional)
                          </Label>
                          <Input
                            id="userReported"
                            type="text"
                            value={formData.userReported}
                            onChange={(e) =>
                              handleInputChange("userReported", e.target.value)
                            }
                            placeholder="Username or profile name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="listingId">
                            Listing ID (optional)
                          </Label>
                          <Input
                            id="listingId"
                            type="text"
                            value={formData.listingId}
                            onChange={(e) =>
                              handleInputChange("listingId", e.target.value)
                            }
                            placeholder="Item listing number"
                          />
                        </div>
                      </div>

                      {/* Severity */}
                      <div className="space-y-2">
                        <Label htmlFor="severity">
                          How urgent is this issue?
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            handleInputChange("severity", value)
                          }
                          defaultValue="medium"
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">
                              Low - Minor issue or policy violation
                            </SelectItem>
                            <SelectItem value="medium">
                              Medium - Concerning behavior or content
                            </SelectItem>
                            <SelectItem value="high">
                              High - Safety threat or significant violation
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <Label htmlFor="description">
                          Detailed Description
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          placeholder="Please describe what happened, when it occurred, and any other relevant details..."
                          rows={6}
                          required
                        />
                      </div>

                      {/* Evidence */}
                      <div className="space-y-2">
                        <Label htmlFor="evidence">
                          Additional Evidence (optional)
                        </Label>
                        <Textarea
                          id="evidence"
                          value={formData.evidence}
                          onChange={(e) =>
                            handleInputChange("evidence", e.target.value)
                          }
                          placeholder="Copy and paste relevant messages, URLs, or other text evidence here..."
                          rows={3}
                        />
                      </div>

                      {/* File Upload */}
                      <div className="space-y-2">
                        <Label>Upload Screenshots or Evidence</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drop files here or click to upload
                          </p>
                          <Button variant="outline" size="sm">
                            <Camera className="w-4 h-4 mr-2" />
                            Choose Files
                          </Button>
                          <p className="text-xs text-muted-foreground mt-2">
                            PNG, JPG, PDF up to 10MB each
                          </p>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="space-y-2">
                        <Label htmlFor="contactInfo">
                          Your Contact Information (optional)
                        </Label>
                        <Input
                          id="contactInfo"
                          type="email"
                          value={formData.contactInfo}
                          onChange={(e) =>
                            handleInputChange("contactInfo", e.target.value)
                          }
                          placeholder="your.email@university.edu (for follow-up questions)"
                        />
                        <p className="text-xs text-muted-foreground">
                          We may contact you for clarification or updates on
                          your report
                        </p>
                      </div>

                      {/* Anonymous Option */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="anonymous"
                          checked={formData.anonymous}
                          onCheckedChange={(checked) =>
                            handleInputChange("anonymous", checked)
                          }
                        />
                        <Label htmlFor="anonymous" className="text-sm">
                          Submit this report anonymously
                        </Label>
                      </div>

                      <Button type="submit" className="w-full">
                        <Flag className="w-4 h-4 mr-2" />
                        Submit Report
                      </Button>
                    </>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-900 flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Emergency Contacts</span>
                </CardTitle>
                <CardDescription className="text-red-700">
                  For immediate safety concerns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="border-l-2 border-red-300 pl-3">
                      <h4 className="font-medium text-red-900 text-sm">
                        {contact.situation}
                      </h4>
                      <p className="text-red-800 font-semibold text-sm">
                        {contact.contact}
                      </p>
                      <p className="text-red-700 text-xs">
                        {contact.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What Happens Next */}
            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Report Review</h4>
                      <p className="text-xs text-muted-foreground">
                        Our team reviews your report within 24 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Investigation</h4>
                      <p className="text-xs text-muted-foreground">
                        We investigate and gather additional information if
                        needed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Action Taken</h4>
                      <p className="text-xs text-muted-foreground">
                        Appropriate action is taken based on our findings
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Follow-up</h4>
                      <p className="text-xs text-muted-foreground">
                        You'll receive an update if you provided contact info
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Anonymously */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Anonymous Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  You can submit reports anonymously. However, providing contact
                  information helps us:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Ask follow-up questions</li>
                  <li>• Provide updates on your report</li>
                  <li>• Better understand the situation</li>
                  <li>• Contact you if we need clarification</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
