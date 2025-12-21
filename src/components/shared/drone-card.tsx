"use client";

import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import type IDrone from "@/types/drone.type";

interface DroneCardProps {
  product: IDrone;
  isLoggedIn?: boolean; // For server-side rendering
}

const DroneCard = ({
  product,
  isLoggedIn: serverIsLoggedIn,
}: DroneCardProps) => {
  const {
    name,
    description,
    price,
    img,
    _id,
    category,
    brand,
    quantity,
    reviews,
  } = product;

  // Helper functions
  const calculateAverageRating = (reviews: IDrone["reviews"]): number => {
    if (!reviews || reviews.length === 0) return 0;
    const ratings = reviews
      .map((review) =>
        typeof review === "object" && review && "rating" in review
          ? review.rating
          : 0,
      )
      .filter((rating) => rating > 0);
    if (ratings.length === 0) return 0;
    return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
  };

  const getCategoryName = (category: IDrone["category"]): string => {
    return typeof category === "string"
      ? category
      : category?.name || "Unknown";
  };

  const getBrandName = (brand: IDrone["brand"]): string => {
    return typeof brand === "string" ? brand : brand?.name || "Unknown";
  };

  // Computed values
  const averageRating = calculateAverageRating(reviews);
  const isOutOfStock = quantity === 0 || quantity === undefined;
  const reviewCount = reviews?.length || 0;

  const router = useRouter();
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const {
    isLoggedIn: clientIsLoggedIn,
    isLoading: authLoading,
    user,
  } = useAuth();
  const {
    isInWishlist,
    addToWishlist: addToWishlistContext,
    removeFromWishlist: removeFromWishlistContext,
  } = useWishlist();
  const { isInCart, addToCart: addToCartContext } = useCart();

  // Use server-side prop if available, otherwise use client-side context
  const isLoggedIn =
    serverIsLoggedIn !== undefined ? serverIsLoggedIn : clientIsLoggedIn;

  const handleAddToCart = async (e: React.MouseEvent) => {
    console.log("_id -", _id);
    e.stopPropagation();
    if (cartLoading) return;

    setCartLoading(true);
    try {
      await addToCartContext(_id);
    } catch (_error) {
      // Error handling is done in context
    } finally {
      setCartLoading(false);
    }
  };

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishlistLoading) return;

    setWishlistLoading(true);
    try {
      if (isInWishlist(_id)) {
        await removeFromWishlistContext(_id);
      } else {
        await addToWishlistContext(_id);
      }
    } catch (_error) {
      // Error handling is done in context
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleCardClick = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push(`/drones/${_id}`);
    }
  };

  return (
    <Card
      onClick={isOutOfStock ? undefined : handleCardClick}
      className={`group h-full overflow-hidden rounded-2xl border border-white/20 dark:border-red-500/30 bg-white/10 dark:bg-black/20 backdrop-blur-md shadow-xl shadow-blue-500/10 dark:shadow-red-500/10 transition-all duration-500 ${
        isOutOfStock
          ? "opacity-60 cursor-not-allowed"
          : "cursor-pointer hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/30 dark:hover:shadow-red-500/30 hover:border-cyan-400/50 dark:hover:border-red-400/50"
      }`}
    >
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:from-red-950/30 dark:to-black/30">
        <Image
          src={img}
          alt={name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay Actions - Only show if user is logged in, in stock, and not admin/superAdmin */}
        {isLoggedIn &&
          !authLoading &&
          !isOutOfStock &&
          user?.role !== "admin" &&
          user?.role !== "superAdmin" && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 bg-gradient-to-t from-cyan-500/60 dark:from-red-500/60 via-blue-500/30 dark:via-black/30 to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 backdrop-blur-sm">
              <Button
                size="sm"
                variant={isInCart(_id) ? "default" : "outline"}
                onClick={handleAddToCart}
                disabled={cartLoading}
                className={`shadow-lg transition-colors ${!isInCart(_id) ? "border-border text-foreground dark:text-primary bg-background hover:bg-accent hover:border-border hover:text-foreground dark:hover:text-primary" : "bg-blue-500 hover:bg-blue-600 dark:bg-red-500 dark:hover:bg-red-600 text-white"}`}
              >
                <ShoppingCart
                  className={`h-4 w-4 ${isInCart(_id) ? "text-white fill-current" : "text-foreground dark:text-primary"}`}
                />
              </Button>
              <Button
                size="sm"
                variant={isInWishlist(_id) ? "default" : "outline"}
                onClick={handleAddToWishlist}
                disabled={wishlistLoading}
                className={`shadow-lg transition-colors ${!isInWishlist(_id) ? "border-border text-foreground dark:text-primary bg-background hover:bg-accent hover:border-border hover:text-foreground dark:hover:text-primary" : "bg-blue-500 hover:bg-blue-600 dark:bg-red-500 dark:hover:bg-red-600 text-white"}`}
              >
                <Heart
                  className={`h-4 w-4 ${isInWishlist(_id) ? "text-white fill-current" : "text-foreground dark:text-primary"}`}
                />
              </Button>
            </div>
          )}
      </div>

      {/* Product Info */}
      <CardContent className="flex flex-col p-4">
        <h3 className="mb-2 line-clamp-2 min-h-[3rem] text-lg font-semibold text-foreground">
          {name}
        </h3>

        {/* Rating Display */}
        {averageRating > 0 && (
          <div className="mb-2 flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({reviewCount} reviews)
            </span>
          </div>
        )}

        {/* Category and Brand Chips */}
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-red-500 dark:text-white"
          >
            {getCategoryName(category)}
          </Badge>
          <Badge
            variant="outline"
            className="border-blue-500 text-blue-700 dark:border-red-500 dark:text-white"
          >
            {getBrandName(brand)}
          </Badge>
        </div>

        <p className="mb-3 line-clamp-3 min-h-[4.5rem] text-sm text-muted-foreground">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2">
          {isOutOfStock ? (
            <span className="text-lg font-semibold text-destructive">
              Out of Stock
            </span>
          ) : (
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-xl font-bold text-transparent dark:text-red-600">
              ${price?.toFixed(2)}
            </span>
          )}

          <div className="flex flex-col items-end gap-1">
            {!isOutOfStock && (
              <span className="text-xs text-muted-foreground">
                In Stock: {quantity}
              </span>
            )}
            <span
              className={`rounded-lg px-2 py-1 text-xs font-semibold uppercase tracking-wide ${
                isInCart(_id)
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : isOutOfStock
                    ? "bg-destructive text-destructive-foreground"
                    : "text-muted-foreground"
              }`}
            >
              {isInCart(_id)
                ? "In Cart"
                : isOutOfStock
                  ? "Out of Stock"
                  : "Free Shipping"}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 dark:from-red-500/10 dark:via-black/5 dark:to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10" />
    </Card>
  );
};

export default DroneCard;
