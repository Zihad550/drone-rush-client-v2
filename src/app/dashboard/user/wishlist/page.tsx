"use client";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

export default function WishlistPage() {
  const { addToCartAndRemoveFromWishlist } = useCart();
  const { wishlist, loading, removeFromWishlist, refreshWishlist } =
    useWishlist();

  const handleAddToCart = async (droneId: string) => {
    try {
      await addToCartAndRemoveFromWishlist(droneId);
      await refreshWishlist();
    } catch (_error) {
      // Error handling is done in context
    }
  };

  const handleRemoveFromWishlist = async (droneId: string) => {
    try {
      await removeFromWishlist(droneId);
    } catch (_err) {
      // Error handling is done in context
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Heart className="h-16 w-16 text-muted-foreground" />
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-muted-foreground">
            Your wishlist is empty
          </h2>
          <p className="text-muted-foreground">
            Start adding products you love!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
        <p className="text-muted-foreground">Products you've saved for later</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wishlist.map((item) => (
          <Card key={item._id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-48">
                <Image
                  src={item.drone.img}
                  alt={item.drone.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="line-clamp-2 mb-2">
                {item.drone.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {item.drone.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  ${item.drone.price.toFixed(2)}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddToCart(item.drone._id)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveFromWishlist(item.drone._id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
