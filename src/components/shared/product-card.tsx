"use client";

import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import type IProduct from "@/types/product.type";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, description, price, img, _id } = product;
  const router = useRouter();
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const {
    isInWishlist,
    addToWishlist: addToWishlistContext,
    removeFromWishlist: removeFromWishlistContext,
  } = useWishlist();
  const { isInCart, addToCart: addToCartContext } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
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
      onClick={handleCardClick}
      className="group h-full cursor-pointer overflow-hidden rounded-2xl border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Product Image */}
      <div className="relative h-56 overflow-hidden  from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
        <Image
          src={img}
          alt={name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay Actions */}
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
      </div>

      {/* Product Info */}
      <CardContent className="flex flex-col p-4">
        <h3 className="mb-2 line-clamp-2 min-h-[3rem] text-lg font-semibold text-gray-900 dark:text-gray-100">
          {name}
        </h3>

        <p className="mb-3 line-clamp-3 min-h-[4.5rem] text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-xl font-bold text-transparent">
            ${price.toFixed(2)}
          </span>

          <span
            className={`rounded-lg px-2 py-1 text-xs font-semibold uppercase tracking-wide ${
              isInCart(_id)
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {isInCart(_id) ? "In Cart" : "Free Shipping"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
