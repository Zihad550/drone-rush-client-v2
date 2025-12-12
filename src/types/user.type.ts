export default interface IUser {
  _id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  password: string;
  passwordChangedAt?: Date;
  role: TUserRole;
  status: TUserStatus;
  stripeCustomerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TUserStatus = "active" | "blocked";
export type TUserRole = "user" | "admin" | "superAdmin";
