import { serverFetch } from "@/lib/server-fetch";
import type {
  ICartAddPayload,
  ICartAddResponse,
  ICartRemoveResponse,
  ICartResponse,
  ICartUpdatePayload,
  ICartUpdateResponse,
} from "@/types/cart.type";

export const addToCart = async (
  payload: ICartAddPayload,
): Promise<ICartAddResponse> => {
  const response = await serverFetch.post("/cart/add", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add to cart");
  }

  return response.json();
};

export const updateCartQuantity = async (
  productId: string,
  payload: ICartUpdatePayload,
): Promise<ICartUpdateResponse> => {
  const response = await serverFetch.put(`/cart/update/${productId}`, {
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

export const removeFromCart = async (
  productId: string,
): Promise<ICartRemoveResponse> => {
  const response = await serverFetch.delete(`/cart/remove/${productId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to remove from cart");
  }

  return response.json();
};

export const getCart = async (): Promise<ICartResponse> => {
  const response = await serverFetch.get("/cart");

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json();
};
