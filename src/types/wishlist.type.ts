import type IProduct from "./product.type";

export default interface IWishlist {
  _id: string;
  user: string; // ObjectId as string
  product: IProduct; // Populated product
  addedAt: string; // ISO date string
}

export interface IWishlistResponse {
  success: boolean;
  message: string;
  data: IWishlist[];
}

export interface IWishlistAddResponse {
  success: boolean;
  message: string;
  data: IWishlist;
}

export interface IWishlistRemoveResponse {
  success: boolean;
  message: string;
  data: IWishlist;
}

export interface IWishlistAddPayload {
  productId: string;
}
