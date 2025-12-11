import type IUser from "./user.type";

export default interface IShippingInfo {
  _id: string;
  user: string | IUser;
  street: string;
  apt?: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
  paymentMethod: TPaymentMethod;
}

export type TPaymentMethod = "COD" | "CARD";
