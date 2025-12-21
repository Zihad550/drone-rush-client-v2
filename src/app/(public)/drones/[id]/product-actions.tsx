"use client";

import { Heart, Share2, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/error-boundary";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

interface ProductActionsProps {
  droneId: string;
}

export function ProductActions({ droneId }: ProductActionsProps) {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const {
    isInWishlist,
    addToWishlist: addToWishlistContext,
    removeFromWishlist: removeFromWishlistContext,
  } = useWishlist();
  const { isInCart, addToCart: addToCartContext, removeFromCart } = useCart();

  const handleAddToWishlist = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (wishlistLoading) return;

    setWishlistLoading(true);
    try {
      if (isInWishlist(droneId)) {
        await removeFromWishlistContext(droneId);
      } else {
        await addToWishlistContext(droneId);
      }
    } catch (_error) {
      // Error handling is done in context
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleCartAction = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (cartLoading) return;

    setCartLoading(true);
    try {
      if (isInCart(droneId)) {
        await removeFromCart(droneId);
      } else {
        await addToCartContext(droneId);
      }
    } catch (_error) {
      // Error handling is done in context
    } finally {
      setCartLoading(false);
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
    <ErrorBoundary
      fallback={
        <div className="p-4 text-center border rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground mb-2">
            Product actions are temporarily unavailable.
          </p>
        </div>
      }
    >
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        {user?.role !== "admin" && user?.role !== "superAdmin" && (
          <>
            <Button
              size="lg"
              className={`flex-1 bg-gradient-to-r from-blue-500 to-black/80 dark:from-black dark:to-red-500 shadow-[0_4px_14px_rgba(var(--primary),0.4)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.4)] hover:scale-105 hover:shadow-[0_6px_18px_rgba(var(--primary),0.6)] dark:hover:shadow-[0_6px_18px_rgba(0,0,0,0.6)] transition-all duration-300 text-white ${isInCart(droneId) ? "opacity-90" : "opacity-100"}`}
              onClick={handleCartAction}
              disabled={cartLoading}
              variant="default"
            >
              <ShoppingCart className="w-5 h-5 mr-2 text-blue-500 dark:text-red-500" />
              {isInCart(droneId) ? "Remove from Cart" : "Add to Cart"}
            </Button>

            <Button
              size="lg"
              className={`bg-gradient-to-r from-blue-500 to-black/80 dark:from-black dark:to-red-500 shadow-[0_4px_14px_rgba(var(--primary),0.4)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.4)] hover:scale-105 hover:shadow-[0_6px_18px_rgba(var(--primary),0.6)] dark:hover:shadow-[0_6px_18px_rgba(0,0,0,0.6)] transition-all duration-300 text-white ${isInWishlist(droneId) ? "opacity-90" : "opacity-100"}`}
              onClick={handleAddToWishlist}
              disabled={wishlistLoading}
              variant="default"
            >
              <Heart
                className={`w-5 h-5 mr-2 text-blue-500 dark:text-red-500 ${isInWishlist(droneId) ? "fill-current" : ""}`}
              />
              {isInWishlist(droneId) ? "In Wishlist" : "Add to Wishlist"}
            </Button>
          </>
        )}

        <Button variant="outline" size="lg" onClick={handleShare}>
          <Share2 className="w-5 h-5 mr-2" />
          Share
        </Button>
      </div>
    </ErrorBoundary>
  );
}
