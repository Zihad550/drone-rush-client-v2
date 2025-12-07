"use client";

import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getWishlist,
  removeFromWishlist,
} from "@/services/wishlist/wishlist.service";
import type IWishlist from "@/types/wishlist.type";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<IWishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getWishlist();
      setWishlist(response.data || []);
    } catch (_err) {
      setError("Failed to load wishlist");
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
      setWishlist((prev) =>
        prev.filter((item) => item.product._id !== productId),
      );
      toast.success("Removed from wishlist");
    } catch (_err) {
      toast.error("Failed to remove from wishlist");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg text-muted-foreground">{error}</p>
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
                  src={item.product.img}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="line-clamp-2 mb-2">
                {item.product.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {item.product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  ${item.product.price.toFixed(2)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFromWishlist(item.product._id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
