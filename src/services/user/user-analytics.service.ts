"use server";
import { serverFetch } from "@/lib/server-fetch";

export const getUserAnalytics = async () => {
  const res = await serverFetch.get("/analytics", { cache: "no-store" });
  return res.json();
};