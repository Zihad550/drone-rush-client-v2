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
      .map((review) => (typeof review === "string" ? 0 : review.rating))
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
  const { isLoggedIn: clientIsLoggedIn, isLoading: authLoading } = useAuth();
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
      className={`group h-full overflow-hidden rounded-2xl border-0 shadow-lg transition-all duration-300 ${
        isOutOfStock
          ? "opacity-60 cursor-not-allowed"
          : "cursor-pointer hover:-translate-y-2 hover:shadow-2xl"
      }`}
    >
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden  from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
        <Image
          src={img}
          alt={name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay Actions - Only show if user is logged in and in stock */}
        {isLoggedIn && !authLoading && !isOutOfStock && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 bg-gradient-to-t from-black/75 via-black/50 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              size="sm"
              variant={isInCart(_id) ? "default" : "secondary"}
              onClick={handleAddToCart}
              disabled={cartLoading}
              className="shadow-lg"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={isInWishlist(_id) ? "default" : "secondary"}
              onClick={handleAddToWishlist}
              disabled={wishlistLoading}
              className="shadow-lg"
            >
              <Heart
                className={`h-4 w-4 ${isInWishlist(_id) ? "fill-current" : ""}`}
              />
            </Button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <CardContent className="flex flex-col p-4">
        <h3 className="mb-2 line-clamp-2 min-h-[3rem] text-lg font-semibold text-gray-900 dark:text-gray-100">
          {name}
        </h3>

        {/* Rating Display */}
        {averageRating > 0 && (
          <div className="mb-2 flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({reviewCount} reviews)
            </span>
          </div>
        )}

        {/* Category and Brand Chips */}
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
          >
            {getCategoryName(category)}
          </Badge>
          <Badge
            variant="outline"
            className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400"
          >
            {getBrandName(brand)}
          </Badge>
        </div>

        <p className="mb-3 line-clamp-3 min-h-[4.5rem] text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2">
          {isOutOfStock ? (
            <span className="text-lg font-semibold text-red-600 dark:text-red-400">
              Out of Stock
            </span>
          ) : (
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-xl font-bold text-transparent">
              ${price?.toFixed(2)}
            </span>
          )}

          <div className="flex flex-col items-end gap-1">
            {!isOutOfStock && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                In Stock: {quantity}
              </span>
            )}
            <span
              className={`rounded-lg px-2 py-1 text-xs font-semibold uppercase tracking-wide ${
                isInCart(_id)
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : isOutOfStock
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    : "text-gray-500 dark:text-gray-400"
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
    </Card>
  );
};

export default DroneCard;
