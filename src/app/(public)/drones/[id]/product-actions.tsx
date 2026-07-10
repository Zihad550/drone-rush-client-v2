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
      router.push(
        `/login?redirect=${encodeURIComponent(window.location.pathname)}`,
      );
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
      router.push(
        `/login?redirect=${encodeURIComponent(window.location.pathname)}`,
      );
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
        <div className="mt-8 rounded-[14px] border border-dr-bd-2 bg-dr-surface p-4 text-center">
          <p className="mb-2 text-sm text-dr-text-2">
            Product actions are temporarily unavailable.
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-3 pt-8 sm:flex-row">
        {user?.role !== "admin" && user?.role !== "superAdmin" && (
          <>
            <Button
              size="lg"
              className={`flex-1 bg-dr-red text-white shadow-[0_4px_18px_rgba(239,43,69,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-dr-red-strong hover:shadow-[0_6px_22px_rgba(239,43,69,0.5)] ${isInCart(droneId) ? "opacity-90" : "opacity-100"}`}
              onClick={handleCartAction}
              disabled={cartLoading}
              variant="default"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {isInCart(droneId) ? "Remove from cart" : "Add to cart"}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className={`border-dr-bd-4 text-dr-text transition-all duration-300 hover:border-dr-red/50 hover:text-dr-red ${isInWishlist(droneId) ? "border-dr-red/50 text-dr-red" : ""}`}
              onClick={handleAddToWishlist}
              disabled={wishlistLoading}
            >
              <Heart
                className={`mr-2 h-5 w-5 ${isInWishlist(droneId) ? "fill-current" : ""}`}
              />
              {isInWishlist(droneId) ? "In wishlist" : "Add to wishlist"}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="lg"
          className="border-dr-bd-4 text-dr-text transition-colors hover:border-dr-red/50 hover:text-dr-red"
          onClick={handleShare}
        >
          <Share2 className="mr-2 h-5 w-5" />
          Share
        </Button>
      </div>
    </ErrorBoundary>
  );
}
