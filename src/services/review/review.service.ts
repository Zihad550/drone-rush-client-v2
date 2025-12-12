"use server";
import { serverFetch } from "@/lib/server-fetch";
import type { ICreateReview, IUpdateReview } from "@/types/review.type";

export const createReview = async (payload: ICreateReview) => {
  const res = await serverFetch.post("/reviews", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const updateReview = async (reviewId: string, payload: IUpdateReview) => {
  const res = await serverFetch.patch(`/reviews/${reviewId}`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const deleteReview = async (reviewId: string) => {
  const res = await serverFetch.delete(`/reviews/${reviewId}`);
  return res.json();
};