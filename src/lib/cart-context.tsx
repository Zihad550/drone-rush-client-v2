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
import {
  addToCart,
  addToCartAndRemoveFromWishlist,
  getCart,
  moveToWishlist,
  removeFromCart,
  updateCartQuantity,
} from "@/services/cart/cart.service";
import type ICartItem from "@/types/cart.type";

interface CartContextType {
  cart: ICartItem[];
  loading: boolean;
  addToCart: (droneId: string, quantity?: number) => Promise<void>;
  updateQuantity: (droneId: string, quantity: number) => Promise<void>;
  removeFromCart: (droneId: string) => Promise<void>;
  addToCartAndRemoveFromWishlist: (droneId: string, quantity?: number) => Promise<void>;
  moveToWishlist: (droneId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  isInCart: (droneId: string) => boolean;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCart();
      setCart(response.data || []);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCartHandler = async (droneId: string, quantity: number = 1) => {
    try {
      await addToCart({ droneId, quantity });
      await refreshCart();
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
      throw error;
    }
  };

  const updateQuantityHandler = async (droneId: string, quantity: number) => {
    try {
      await updateCartQuantity(droneId, { quantity });
      await refreshCart();
      toast.success("Quantity updated");
    } catch (error) {
      toast.error("Failed to update quantity");
      throw error;
    }
  };

  const removeFromCartHandler = async (droneId: string) => {
    try {
      await removeFromCart(droneId);
      await refreshCart();
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Failed to remove from cart");
      throw error;
    }
  };

  const addToCartAndRemoveFromWishlistHandler = async (
    droneId: string,
    quantity: number = 1,
  ) => {
    try {
      await addToCartAndRemoveFromWishlist({ droneId, quantity });
      await refreshCart();
      toast.success("Added to cart and removed from wishlist");
    } catch (error) {
      toast.error("Failed to add to cart and remove from wishlist");
      throw error;
    }
  };

  const moveToWishlistHandler = async (droneId: string) => {
    try {
      await moveToWishlist({ droneId });
      await refreshCart();
      toast.success("Moved to wishlist");
    } catch (error) {
      toast.error("Failed to move to wishlist");
      throw error;
    }
  };

  const isInCart = (droneId: string) => {
    return cart.some((item) => item.drone._id === droneId);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (sum, item) => sum + item.drone.price * item.quantity,
      0,
    );
  };

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const value: CartContextType = {
    cart,
    loading,
    addToCart: addToCartHandler,
    updateQuantity: updateQuantityHandler,
    removeFromCart: removeFromCartHandler,
    addToCartAndRemoveFromWishlist: addToCartAndRemoveFromWishlistHandler,
    moveToWishlist: moveToWishlistHandler,
    refreshCart,
    isInCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 text-center">
          <p className="text-muted-foreground mb-2">
            Cart functionality is temporarily unavailable.
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
      <CartContext.Provider value={value}>{children}</CartContext.Provider>
    </ErrorBoundary>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}