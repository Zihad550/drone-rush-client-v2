"use client";

import { Heart, Minus, Plus, RefreshCw, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/lib/cart-context";
import { serverFetch } from "@/lib/server-fetch";
import { useWishlist } from "@/lib/wishlist-context";

export default function CartPage() {
  const {
    cart,
    loading,
    updateQuantity,
    moveToWishlist: moveToWishlistContext,
    refreshCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();
  const { refreshWishlist } = useWishlist();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleMoveToWishlist = async (droneId: string) => {
    try {
      await moveToWishlistContext(droneId);
      await refreshWishlist();
    } catch (_error) {
      // Error handling is done in context
    }
  };

  const handleCheckout = async () => {
    try {
      const drones = cart.map((item) => ({
        _id: item.drone._id,
        quantity: item.quantity,
      }));

      const response = await serverFetch.post("/orders", {
        body: JSON.stringify({ drones }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to create checkout session",
        );
      }

      const {
        data: { paymentUrl },
      } = await response.json();

      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to process checkout. Please try again.",
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <ShoppingCart className="h-16 w-16 text-muted-foreground" />
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-muted-foreground">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground">
            Start adding products to your cart!
          </p>
          <Link href="/drones">
            <Button className="mt-4">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Cart</h1>
          <p className="text-muted-foreground">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refreshCart()}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item._id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={item.drone.img}
                      alt={item.drone.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold line-clamp-2">
                      {item.drone.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {item.drone.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-primary">
                        ${item.drone.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.drone._id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.drone._id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveToWishlist(item.drone._id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Items ({totalItems})</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/dashboard/user/shipping">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
