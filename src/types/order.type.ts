export type TOrderStatus =
  | "pending"
  | "processing"
  | "packaged"
  | "delivering"
  | "completed"
  | "user-cancelled"
  | "admin-cancelled";

export interface IOrder {
  _id: string;
  user:
    | {
        name: string;
        email: string;
        phone: string;
      }
    | string;
  products: {
    id: {
      _id: string;
      name: string;
      img: string;
      price: number;
    };
    quantity: number;
  }[];
  totalPrice: number;
  status: TOrderStatus;
  createdAt: string;
  updatedAt: string;
}
