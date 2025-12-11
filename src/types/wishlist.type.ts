import type IDrone from "./drone.type";
import type IUser from "./user.type";

export default interface IWishlist {
  _id: string;
  user: string | IUser;
  drone: IDrone; // Populated drone object
  createdAt: Date;
  updatedAt: Date;
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
  droneId: string;
}
