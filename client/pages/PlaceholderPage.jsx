import { Link } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PlaceholderPage({ title, description }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <Construction className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-4">{title}</h1>
        <p className="text-muted-foreground mb-8">{description}</p>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
        <p className="text-sm text-muted-foreground mt-6">
          This page is coming soon! Keep prompting to help build out this section.
        </p>
      </div>
    </div>
  );
}
