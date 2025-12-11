import { serverFetch } from "@/lib/server-fetch";

interface ICategoryResponse {
  success: boolean;
  message: string;
  data: { _id: string; name: string }[];
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

export const getCategories = async (): Promise<ICategoryResponse> => {
  const response = await serverFetch.get("/categories");

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

export const createCategory = async (
  payload: Record<string, unknown>,
): Promise<ICategoryResponse> => {
  const response = await serverFetch.post("/categories", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create category");
  }

  return response.json();
};
