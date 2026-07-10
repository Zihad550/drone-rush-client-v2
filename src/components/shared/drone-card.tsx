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
    router.push(`/drones/${_id}`);
  };

  return (
    <Card
      onClick={isOutOfStock ? undefined : handleCardClick}
      className={`group h-full overflow-hidden rounded-[18px] border border-dr-bd-2 bg-dr-surface shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 ${
        isOutOfStock
          ? "opacity-60 cursor-not-allowed"
          : "cursor-pointer hover:-translate-y-1 hover:border-dr-red/45 hover:shadow-[0_16px_44px_rgba(239,43,69,0.18)]"
      }`}
    >
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden bg-[radial-gradient(circle_at_50%_60%,rgba(239,43,69,0.14),transparent_65%)]">
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
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 bg-gradient-to-t from-dr-red/60 via-black/30 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm">
              <Button
                size="sm"
                variant={isInCart(_id) ? "default" : "outline"}
                onClick={handleAddToCart}
                disabled={cartLoading}
                className={`shadow-lg transition-colors ${!isInCart(_id) ? "border-border text-foreground dark:text-primary bg-background hover:bg-accent hover:border-border hover:text-foreground dark:hover:text-primary" : "bg-dr-red hover:bg-dr-red-strong text-white"}`}
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
                className={`shadow-lg transition-colors ${!isInWishlist(_id) ? "border-border text-foreground dark:text-primary bg-background hover:bg-accent hover:border-border hover:text-foreground dark:hover:text-primary" : "bg-dr-red hover:bg-dr-red-strong text-white"}`}
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
        <h3 className="mb-2 line-clamp-2 min-h-[3rem] font-poppins text-lg font-semibold text-dr-text">
          {name}
        </h3>

        {/* Rating Display */}
        {averageRating > 0 && (
          <div className="mb-2 flex items-center gap-1">
            <Star className="h-4 w-4 fill-[#f5a623] text-[#f5a623]" />
            <span className="text-sm font-medium text-dr-text">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-dr-text-2">
              ({reviewCount} reviews)
            </span>
          </div>
        )}

        {/* Category and Brand Chips */}
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="bg-dr-red text-white hover:bg-dr-red-strong"
          >
            {getCategoryName(category)}
          </Badge>
          <Badge variant="outline" className="border-dr-bd-4 text-dr-text-2">
            {getBrandName(brand)}
          </Badge>
        </div>

        <p className="mb-3 line-clamp-3 min-h-[4.5rem] text-sm text-dr-text-2">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2">
          {isOutOfStock ? (
            <span className="text-lg font-semibold text-destructive">
              Out of Stock
            </span>
          ) : (
            <span className="font-chakra text-xl font-bold text-dr-red">
              ${price?.toFixed(2)}
            </span>
          )}

          <div className="flex flex-col items-end gap-1">
            {!isOutOfStock && (
              <span className="text-xs text-dr-text-2">
                In Stock: {quantity}
              </span>
            )}
            <span
              className={`rounded-lg px-2 py-1 text-xs font-semibold uppercase tracking-wide ${
                isInCart(_id)
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : isOutOfStock
                    ? "bg-destructive text-destructive-foreground"
                    : "text-dr-text-2"
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
      <div className="absolute inset-0 -z-10 rounded-[18px] bg-[radial-gradient(circle_at_50%_50%,rgba(239,43,69,0.12),transparent_70%)] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </Card>
  );
};

export default DroneCard;
