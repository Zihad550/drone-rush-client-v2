import { serverFetch } from "@/lib/server-fetch";

export const getShippingInfo = async () => {
  const res = await serverFetch.get("/shipping-information/user");
  return res.json();
};

export const createShippingInfo = async (payload: Record<string, unknown>) => {
  const res = await serverFetch.post("/shipping-information", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const updateShippingInfo = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  const res = await serverFetch.patch(`/shipping-information/${id}`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const deleteShippingInfo = async (id: string) => {
  const res = await serverFetch.delete(`/shipping-information/${id}`);
  return res.json();
};
