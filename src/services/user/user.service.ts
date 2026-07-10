"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getMyProfile = async () => {
  const res = await serverFetch.get("/users/me", { cache: "no-store" });
  return res.json();
};

export const updateMyProfile = async (payload: {
  name?: string;
  phone?: string;
  address?: string;
}) => {
  const res = await serverFetch.patch("/users/me", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const sendInvite = async (email: string) => {
  const res = await serverFetch.post("/users/invites/send", {
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

export const getInvites = async () => {
  const res = await serverFetch.get("/users/invites");
  return res.json();
};

export const deleteInvite = async (inviteId: string) => {
  const res = await serverFetch.delete(`/users/invites/${inviteId}`);
  return res.json();
};
