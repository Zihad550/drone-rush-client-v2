"use client";

import { Heart, Share2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useWishlist } from "@/lib/wishlist-context";

interface ProductActionsProps {
  productId: string;
}

export function ProductActions({ productId }: ProductActionsProps) {
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const {
    isInWishlist,
    addToWishlist: addToWishlistContext,
    removeFromWishlist: removeFromWishlistContext,
  } = useWishlist();

  const handleAddToWishlist = async () => {
    if (wishlistLoading) return;

    setWishlistLoading(true);
    try {
      if (isInWishlist(productId)) {
        await removeFromWishlistContext(productId);
      } else {
        await addToWishlistContext(productId);
      }
    } catch (_error) {
      // Error handling is done in context
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this drone",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <Button
        size="lg"
        className="flex-1"
        disabled // TODO: Implement cart functionality
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Add to Cart
      </Button>

      <Button
        variant={isInWishlist(productId) ? "default" : "outline"}
        size="lg"
        onClick={handleAddToWishlist}
        disabled={wishlistLoading}
      >
        <Heart
          className={`w-5 h-5 mr-2 ${isInWishlist(productId) ? "fill-current" : ""}`}
        />
        {isInWishlist(productId) ? "In Wishlist" : "Add to Wishlist"}
      </Button>

      <Button variant="outline" size="lg" onClick={handleShare}>
        <Share2 className="w-5 h-5 mr-2" />
        Share
      </Button>
    </div>
  );
}
