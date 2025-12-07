import type IProduct from "./product.type";

export default interface ICart {
  _id: string;
  user: string; // ObjectId as string
  product: IProduct; // Populated product
  quantity: number;
  addedAt: string; // ISO date string
}

export interface ICartResponse {
  success: boolean;
  message: string;
  data: ICart[];
}

export interface ICartAddResponse {
  success: boolean;
  message: string;
  data: ICart;
}

export interface ICartUpdateResponse {
  success: boolean;
  message: string;
  data: ICart;
}

export interface ICartRemoveResponse {
  success: boolean;
  message: string;
  data: ICart;
}

export interface ICartAddPayload {
  productId: string;
  quantity?: number;
}

export interface ICartUpdatePayload {
  quantity: number;
}
