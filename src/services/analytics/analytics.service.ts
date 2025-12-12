"use server";
import { serverFetch } from "@/lib/server-fetch";

export const getAdminAnalytics = async () => {
  const res = await serverFetch.get("/analytics/admin", { cache: "no-store" });
  return res.json();
};
