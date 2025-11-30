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
