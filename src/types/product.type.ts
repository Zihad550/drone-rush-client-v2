export default interface IProduct {
  _id: string;
  img: string;
  name: string;
  description: string;
  price: number;
  category: string;
  reviews: string[];
  brand: string;
  quantity?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type TProductWriteDoc = Omit<
  IProduct,
  "_id" | "createdAt" | "updatedAt"
>;

export interface IPurchasableProduct extends IProduct {
  quantity: number;
}
