import type IBrand from "./brand.type";
import type ICategory from "./category.type";
import type IReview from "./review.type";

export default interface IDrone {
  _id: string;
  img: string;
  name: string;
  description: string;
  price: number;
  category: string | ICategory;
  reviews: string[] | IReview[];
  brand: string | IBrand;
  quantity: number;
  isInWishlist?: boolean;
  isInCart?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TDroneWriteDoc = Omit<IDrone, "_id" | "createdAt" | "updatedAt">;

export interface IPurchasableDrone extends IDrone {
  quantity: number;
}
