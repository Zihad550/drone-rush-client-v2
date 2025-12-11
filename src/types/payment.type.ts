export enum PAYMENT_STATUS {
  PENDING = "PENDING",
  PAID = "PAID",
  UNPAID = "UNPAID",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export interface IPayment {
  order: string;
  user: string;
  transactionId: string;
  amount: number;
  paymentGatewayData?: unknown;
  invoiceUrl?: string;
  status: PAYMENT_STATUS;
  heldAt?: Date;
  releasedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISSLCommerz {
  amount: number;
  transactionId: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}
