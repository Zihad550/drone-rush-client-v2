"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/error-boundary";
import { useAuth } from "@/lib/auth-context";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/services/wishlist/wishlist.service";
import type IWishlist from "@/types/wishlist.type";

interface WishlistContextType {
  wishlist: IWishlist[];
  wishlistIds: Set<string>;
  loading: boolean;
  addToWishlist: (droneId: string) => Promise<void>;
  removeFromWishlist: (droneId: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
  isInWishlist: (droneId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<IWishlist[]>([]);
  const [loading, setLoading] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const { isLoggedIn } = useAuth();

  const refreshWishlist = useCallback(async () => {
    if (!isLoggedIn) return;

    try {
      setLoading(true);
      const response = await getWishlist();
      const items = response.data || [];
      setWishlist(items);
      setWishlistIds(new Set(items.map((item) => item.drone._id)));
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const addToWishlistHandler = async (droneId: string) => {
    try {
      await addToWishlist({ droneId });
      await refreshWishlist(); // Refresh to get updated data
      toast.success("Added to wishlist");
    } catch (error) {
      toast.error("Failed to add to wishlist");
      throw error;
    }
  };

  const removeFromWishlistHandler = async (droneId: string) => {
    try {
      await removeFromWishlist(droneId);
      await refreshWishlist(); // Refresh to get updated data
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove from wishlist");
      throw error;
    }
  };

  const isInWishlist = (droneId: string) => wishlistIds.has(droneId);

  useEffect(() => {
    if (isLoggedIn) {
      refreshWishlist();
    } else {
      setWishlist([]); // Clear wishlist when user logs out
      setWishlistIds(new Set());
    }
  }, [isLoggedIn, refreshWishlist]);

  const value: WishlistContextType = {
    wishlist,
    wishlistIds,
    loading,
    addToWishlist: addToWishlistHandler,
    removeFromWishlist: removeFromWishlistHandler,
    refreshWishlist,
    isInWishlist,
  };

  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 text-center">
          <p className="text-muted-foreground mb-2">
            Wishlist functionality is temporarily unavailable.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-primary hover:underline"
          >
            Refresh page
          </button>
        </div>
      }
    >
      <WishlistContext.Provider value={value}>
        {children}
      </WishlistContext.Provider>
    </ErrorBoundary>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
