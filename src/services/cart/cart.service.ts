import { serverFetch } from "@/lib/server-fetch";
import type {
  ICartAddPayload,
  ICartAddResponse,
  ICartMoveToWishlistPayload,
  ICartMoveToWishlistResponse,
  ICartRemoveResponse,
  ICartResponse,
  ICartUpdatePayload,
  ICartUpdateResponse,
} from "@/types/cart.type";

/**
 * Add an item to the cart
 */
export const addToCart = async (
  payload: ICartAddPayload,
): Promise<ICartAddResponse> => {
  const response = await serverFetch.post("/cart/add", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Failed to add to cart");

  return data;
};

/**
 * Update the quantity of a cart item
 */
export const updateCartQuantity = async (
  droneId: string,
  payload: ICartUpdatePayload,
): Promise<ICartUpdateResponse> => {
  const response = await serverFetch.put(`/cart/update/${droneId}`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update cart quantity");
  }

  return response.json();
};

/**
 * Remove an item from the cart
 */
export const removeFromCart = async (
  droneId: string,
): Promise<ICartRemoveResponse> => {
  const response = await serverFetch.delete(`/cart/remove/${droneId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to remove from cart");
  }

  return response.json();
};

/**
 * Get the user's cart
 */
export const getCart = async (): Promise<ICartResponse> => {
  const response = await serverFetch.get("/cart");

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json();
};

/**
 * Add item to cart and remove from wishlist
 */
export const addToCartAndRemoveFromWishlist = async (
  payload: ICartAddPayload,
): Promise<ICartAddResponse> => {
  const response = await serverFetch.post(
    "/cart/add-and-remove-from-wishlist",
    {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Failed to add to cart and remove from wishlist",
    );
  }

  return response.json();
};

/**
 * Move item from cart to wishlist
 */
export const moveToWishlist = async (
  payload: ICartMoveToWishlistPayload,
): Promise<ICartMoveToWishlistResponse> => {
  const response = await serverFetch.post("/cart/move-to-wishlist", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to move to wishlist");
  }

  return response.json();
};
