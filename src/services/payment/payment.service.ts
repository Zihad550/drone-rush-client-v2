import { serverFetch } from "@/lib/server-fetch";

export const getInvoice = async (paymentId: string) => {
  const res = await serverFetch.get(`/payment/invoice/${paymentId}`);
  return res.json();
};
