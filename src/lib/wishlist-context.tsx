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
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  refreshWishlist: () => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<IWishlist[]>([]);
  const [loading, setLoading] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  const refreshWishlist = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getWishlist();
      const items = response.data || [];
      setWishlist(items);
      setWishlistIds(new Set(items.map((item) => item.product._id)));
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  }, []);

  const addToWishlistHandler = async (productId: string) => {
    try {
      await addToWishlist({ productId });
      await refreshWishlist(); // Refresh to get updated data
      toast.success("Added to wishlist");
    } catch (error) {
      toast.error("Failed to add to wishlist");
      throw error;
    }
  };

  const removeFromWishlistHandler = async (productId: string) => {
    try {
      await removeFromWishlist(productId);
      await refreshWishlist(); // Refresh to get updated data
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove from wishlist");
      throw error;
    }
  };

  const isInWishlist = (productId: string) => wishlistIds.has(productId);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

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
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
