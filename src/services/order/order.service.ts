import { serverFetch } from "@/lib/server-fetch";
import type { TOrderStatus } from "@/types/order.type";

export const getOrders = async (
  query: Record<string, string | number | boolean>,
) => {
  const params = new URLSearchParams();
  Object.keys(query).forEach((key) => {
    if (query[key]) {
      params.append(key, String(query[key]));
    }
  });

  const res = await serverFetch.get(`/orders?${params.toString()}`, {
    cache: "no-store",
  });
  return res.json();
};

export const updateOrderStatus = async (
  id: string,
  payload: { status: TOrderStatus; cancelReason?: string },
) => {
  const res = await serverFetch.patch(`/orders/${id}`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
