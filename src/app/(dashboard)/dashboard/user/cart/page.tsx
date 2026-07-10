"use client";

import { Heart, Minus, Plus, RefreshCw, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DashboardPageHeader from "@/components/pages/dashboard/user/dashboard-page-header";
import { useCart } from "@/lib/cart-context";
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

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-dr-red"></div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="mx-auto max-w-[1180px] space-y-7">
        <DashboardPageHeader
          eyebrow="Checkout"
          title="My cart"
          description="Your selected drones, ready for launch."
        />
        <div className="flex flex-col items-center justify-center gap-4 rounded-[18px] border border-dr-bd-1 bg-dr-surface py-20 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-dr-red/25 bg-dr-red/[0.1] text-dr-red">
            <ShoppingCart className="h-7 w-7" strokeWidth={1.75} />
          </span>
          <div>
            <h2 className="font-chakra text-xl font-bold text-dr-text">
              Your cart is empty
            </h2>
            <p className="mt-1 text-sm text-dr-text-3">
              Add some drones to get started.
            </p>
          </div>
          <Link
            href="/drones"
            className="dr-red-grad mt-1 inline-flex items-center rounded-[10px] px-5 py-2.5 font-poppins text-sm font-semibold text-white shadow-[0_10px_26px_rgba(239,43,69,0.32)]"
          >
            Browse drones
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1180px] space-y-7">
      <DashboardPageHeader
        eyebrow="Checkout"
        title="My cart"
        description={`${totalItems} item${totalItems !== 1 ? "s" : ""} ready for launch.`}
        action={
          <button
            type="button"
            onClick={() => refreshCart()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-dr-bd-2 px-4 py-2 font-poppins text-[13px] font-semibold text-dr-text transition-colors hover:border-dr-red/40 hover:text-dr-red disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cart.map((item) => (
            <div
              key={item._id}
              className="rounded-[18px] border border-dr-bd-1 bg-dr-surface p-4 transition-colors hover:border-dr-red/25"
            >
              <div className="flex gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[12px] border border-dr-bd-1 bg-dr-field">
                  <Image
                    src={item.drone.img}
                    alt={item.drone.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-1 font-poppins text-[15px] font-semibold text-dr-text">
                    {item.drone.name}
                  </h3>
                  <p className="line-clamp-1 text-[13px] text-dr-text-3">
                    {item.drone.description}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <span className="font-chakra text-lg font-bold text-dr-text">
                      ${item.drone.price.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center rounded-full border border-dr-bd-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.drone._id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-dr-text transition-colors hover:text-dr-red disabled:opacity-40"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center font-poppins text-sm font-semibold text-dr-text">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.drone._id, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="flex h-8 w-8 items-center justify-center rounded-full text-dr-text transition-colors hover:text-dr-red"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleMoveToWishlist(item.drone._id)}
                        aria-label="Move to wishlist"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-dr-red/30 text-dr-red transition-colors hover:bg-dr-red/[0.1]"
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-[18px] border border-dr-bd-1 bg-dr-surface p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-[2px] w-5 rounded-sm bg-dr-red" />
              <h3 className="font-poppins text-sm font-semibold text-dr-text">
                Order summary
              </h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-dr-text-2">
                <span>Items ({totalItems})</span>
                <span className="text-dr-text">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-dr-text-2">
                <span>Shipping</span>
                <span className="text-[#1f9d5c]">Free</span>
              </div>
              <div className="border-t border-dr-bd-1 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-poppins font-semibold text-dr-text">
                    Total
                  </span>
                  <span className="font-chakra text-xl font-bold text-dr-text">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/dashboard/user/shipping"
              className="dr-red-grad mt-5 flex w-full items-center justify-center rounded-[10px] px-5 py-3 font-poppins text-sm font-semibold text-white shadow-[0_10px_26px_rgba(239,43,69,0.32)]"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
