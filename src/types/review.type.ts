import type IUser from "./user.type";

export default interface IReview {
  _id: string;
  user: string | IUser;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
