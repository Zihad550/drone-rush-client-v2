"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getAdminUsers = async (
  query: Record<string, string | number | boolean> = {},
) => {
  const params = new URLSearchParams();
  Object.keys(query).forEach((key) => {
    if (query[key] !== "" && query[key] !== undefined && query[key] !== null) {
      params.append(key, String(query[key]));
    }
  });

  const qs = params.toString();
  const res = await serverFetch.get(`/admin/users${qs ? `?${qs}` : ""}`, {
    cache: "no-store",
  });
  return res.json();
};

export const getAdminSettings = async () => {
  const res = await serverFetch.get("/admin/settings", { cache: "no-store" });
  return res.json();
};

export const updateAdminSettings = async (payload: {
  maintenanceMode?: boolean;
  guestCheckout?: boolean;
  lowStockAlerts?: boolean;
  newOrderNotifications?: boolean;
}) => {
  const res = await serverFetch.patch("/admin/settings", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
