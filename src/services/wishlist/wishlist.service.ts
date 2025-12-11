import { serverFetch } from "@/lib/server-fetch";
import type {
  IWishlistAddPayload,
  IWishlistAddResponse,
  IWishlistRemoveResponse,
  IWishlistResponse,
} from "@/types/wishlist.type";

export const addToWishlist = async (
  payload: IWishlistAddPayload,
): Promise<IWishlistAddResponse> => {
  const response = await serverFetch.post("/wishlist/add", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add to wishlist");
  }

  return response.json();
};

export const removeFromWishlist = async (
  droneId: string,
): Promise<IWishlistRemoveResponse> => {
  const response = await serverFetch.delete(`/wishlist/remove/${droneId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to remove from wishlist");
  }

  return response.json();
};

export const getWishlist = async (): Promise<IWishlistResponse> => {
  const response = await serverFetch.get("/wishlist");

  if (!response.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  return response.json();
};
