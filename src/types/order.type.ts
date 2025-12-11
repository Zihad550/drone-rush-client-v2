import type IDrone from "./drone.type";
import type { IPayment } from "./payment.type";
import type IShippingInfo from "./shipping.type";
import type IUser from "./user.type";

export default interface IOrder {
  _id: string;
  user: string | IUser;
  payment: string | IPayment;
  shippingInformation: string | IShippingInfo;
  drones: { id: string | IDrone; quantity: number }[];
  status: TOrderStatus;
  cancelReason?: string;
  totalPrice: number;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  stripeChargeId?: string;
}

export interface IOrderDrone {
  id: string | IDrone;
  quantity: number;
}

export interface ICreateOrder extends Omit<IOrder, "_id" | "drones"> {
  drones: { _id: string; quantity: number }[];
}

export type TOrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "PACKAGED"
  | "DELIVERING"
  | "USER-CANCELLED"
  | "FAILED"
  | "COMPLETED";
