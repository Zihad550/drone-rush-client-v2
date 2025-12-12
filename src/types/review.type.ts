import type IDrone from "./drone.type";
import type IOrder from "./order.type";
import type IUser from "./user.type";

export default interface IReview {
  _id: string;
  user: string | IUser;
  order: string | IOrder;
  drone: string | IDrone;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateReview {
  orderId: string;
  droneId: string;
  rating: number;
  comment: string;
}

export interface IUpdateReview {
  rating: number;
  comment: string;
}
