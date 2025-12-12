"use server";
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
  const res = await serverFetch.patch(`/orders/status/${id}`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const getUserOrders = async () => {
  const res = await serverFetch.get("/orders/user", { cache: "no-store" });
  return res.json();
};

export const getCompletedUserOrders = async () => {
  const res = await serverFetch.get("/orders/user?status=completed", {
    cache: "no-store",
  });
  return res.json();
};
