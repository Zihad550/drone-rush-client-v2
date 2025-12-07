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
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "@/services/cart/cart.service";
import type ICart from "@/types/cart.type";

interface CartContextType {
  cart: ICart[];
  loading: boolean;
  totalItems: number;
  totalPrice: number;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ICart[]>([]);
  const [loading, setLoading] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const refreshCart = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCart();
      const items = response.data || [];
      setCart(items);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCartHandler = async (productId: string, quantity: number = 1) => {
    try {
      await addToCart({ productId, quantity });
      await refreshCart(); // Refresh to get updated data
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
      throw error;
    }
  };

  const updateQuantityHandler = async (productId: string, quantity: number) => {
    try {
      await updateCartQuantity(productId, { quantity });
      await refreshCart(); // Refresh to get updated data
      toast.success("Quantity updated");
    } catch (error) {
      toast.error("Failed to update quantity");
      throw error;
    }
  };

  const removeFromCartHandler = async (productId: string) => {
    try {
      await removeFromCart(productId);
      await refreshCart(); // Refresh to get updated data
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Failed to remove from cart");
      throw error;
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (productId: string) => {
    return cart.some((item) => item.product._id === productId);
  };

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const value: CartContextType = {
    cart,
    loading,
    totalItems,
    totalPrice,
    addToCart: addToCartHandler,
    updateQuantity: updateQuantityHandler,
    removeFromCart: removeFromCartHandler,
    refreshCart,
    clearCart,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
