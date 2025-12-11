import type IDrone from "./drone.type";

export default interface ICartItem {
  _id: string;
  drone: IDrone;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICartResponse {
  success: boolean;
  message: string;
  data: ICartItem[];
}

export interface ICartAddPayload {
  droneId: string;
  quantity?: number;
}

export interface ICartAddResponse {
  success: boolean;
  message: string;
  data: ICartItem;
}

export interface ICartUpdatePayload {
  quantity: number;
}

export interface ICartUpdateResponse {
  success: boolean;
  message: string;
  data: ICartItem;
}

export interface ICartRemoveResponse {
  success: boolean;
  message: string;
  data: ICartItem;
}

export interface ICartMoveToWishlistPayload {
  droneId: string;
}

export interface ICartMoveToWishlistResponse {
  success: boolean;
  message: string;
  data: ICartItem;
}
