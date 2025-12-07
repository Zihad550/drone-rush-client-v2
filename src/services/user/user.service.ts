import { serverFetch } from "@/lib/server-fetch";

export const makeAdmin = async (email: string) => {
  const res = await serverFetch.patch("/users/make-admin", {
    body: JSON.stringify({ email }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
