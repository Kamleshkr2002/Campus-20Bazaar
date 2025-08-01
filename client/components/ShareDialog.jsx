import { useState } from "react";
import {
  Share2,
  Copy,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Check,
  QrCode,
  Link as LinkIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

export function ShareDialog({ isOpen, onClose, item }) {
  const [copied, setCopied] = useState(false);
  
  if (!item) return null;

  const shareUrl = `${window.location.origin}/item/${item.id}`;
  const shareTitle = `Check out this ${item.title} for $${item.price}`;
  const shareText = `Found this great deal on CampusMarket: ${item.title} for only $${item.price}! ${item.condition} condition. Check it out:`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The item link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast({
        title: "Copy failed",
        description: "Unable to copy link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(shareTitle);
    const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareViaSMS = () => {
    const text = encodeURIComponent(`${shareText} ${shareUrl}`);
    window.open(`sms:?body=${text}`);
  };

  const shareViaTwitter = () => {
    const text = encodeURIComponent(`${shareText} ${shareUrl} #CampusMarket #StudentDeals`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const shareViaFacebook = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`${shareText} ${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled or failed:", err);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Item
          </DialogTitle>
          <DialogDescription>
            Share this item with friends or on social media
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Preview */}
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-lg">
                {item.category === "Electronics" && "💻"}
                {item.category === "Textbooks" && "📚"}
                {item.category === "Furniture" && "🪑"}
                {item.category === "Clothing" && "👕"}
                {item.category === "Sports" && "⚽"}
                {!["Electronics", "Textbooks", "Furniture", "Clothing", "Sports"].includes(item.category) && "📦"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium truncate">{item.title}</h4>
              <p className="text-sm text-muted-foreground">
                ${item.price} • {item.condition}
              </p>
            </div>
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <Label htmlFor="share-url">Item Link</Label>
            <div className="flex gap-2">
              <Input
                id="share-url"
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Share Options */}
          <div className="space-y-4">
            <h4 className="font-medium">Share via</h4>
            
            <div className="grid grid-cols-2 gap-3">
              {/* Native Share (if supported) */}
              {navigator.share && (
                <Button
                  variant="outline"
                  onClick={shareNative}
                  className="flex items-center gap-2 h-12"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              )}

              {/* Email */}
              <Button
                variant="outline"
                onClick={shareViaEmail}
                className="flex items-center gap-2 h-12"
              >
                <Mail className="w-4 h-4" />
                Email
              </Button>

              {/* SMS */}
              <Button
                variant="outline"
                onClick={shareViaSMS}
                className="flex items-center gap-2 h-12"
              >
                <MessageCircle className="w-4 h-4" />
                Text
              </Button>

              {/* WhatsApp */}
              <Button
                variant="outline"
                onClick={shareViaWhatsApp}
                className="flex items-center gap-2 h-12 text-green-600 hover:text-green-700"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>

              {/* Twitter */}
              <Button
                variant="outline"
                onClick={shareViaTwitter}
                className="flex items-center gap-2 h-12 text-blue-500 hover:text-blue-600"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>

              {/* Facebook */}
              <Button
                variant="outline"
                onClick={shareViaFacebook}
                className="flex items-center gap-2 h-12 text-blue-600 hover:text-blue-700"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </Button>
            </div>
          </div>

          {/* Quick Copy Actions */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Quick Actions</h4>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-1"
              >
                <LinkIcon className="w-3 h-3" />
                Copy Link
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  const text = `${shareTitle} - ${shareUrl}`;
                  navigator.clipboard.writeText(text);
                  toast({
                    title: "Title and link copied!",
                    description: "Perfect for sharing in messages.",
                  });
                }}
                className="flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                Copy Title + Link
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
