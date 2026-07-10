"use client";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import DashboardPageHeader from "@/components/pages/dashboard/user/dashboard-page-header";
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
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-dr-red"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1180px] space-y-7">
      <DashboardPageHeader
        eyebrow="Saved fleet"
        title="My wishlist"
        description="Drones you've saved to launch later."
      />

      {!wishlist || wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-[18px] border border-dr-bd-1 bg-dr-surface py-20 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-dr-red/25 bg-dr-red/[0.1] text-dr-red">
            <Heart className="h-7 w-7" strokeWidth={1.75} />
          </span>
          <div>
            <h2 className="font-chakra text-xl font-bold text-dr-text">
              Your wishlist is empty
            </h2>
            <p className="mt-1 text-sm text-dr-text-3">
              Start adding drones you love.
            </p>
          </div>
          <Link
            href="/drones"
            className="dr-red-grad mt-1 inline-flex items-center rounded-[10px] px-5 py-2.5 font-poppins text-sm font-semibold text-white shadow-[0_10px_26px_rgba(239,43,69,0.32)]"
          >
            Browse drones
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="group overflow-hidden rounded-[18px] border border-dr-bd-1 bg-dr-surface transition-colors hover:border-dr-red/30"
            >
              <div className="relative h-48 overflow-hidden bg-dr-field">
                <Image
                  src={item.drone.img}
                  alt={item.drone.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-4">
                <h3 className="line-clamp-1 font-poppins text-[15px] font-semibold text-dr-text">
                  {item.drone.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-dr-text-3">
                  {item.drone.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-chakra text-xl font-bold text-dr-text">
                    ${item.drone.price.toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(item.drone._id)}
                      aria-label="Add to cart"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-dr-bd-2 text-dr-text transition-colors hover:border-dr-red/40 hover:text-dr-red"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveFromWishlist(item.drone._id)}
                      aria-label="Remove from wishlist"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-dr-red/30 text-dr-red transition-colors hover:bg-dr-red/[0.1]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
