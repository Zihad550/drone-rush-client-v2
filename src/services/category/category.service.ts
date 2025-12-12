import { serverFetch } from "@/lib/server-fetch";
import type ICategory from "@/types/category.type";

interface ICategoryResponse {
  success: boolean;
  message: string;
  data: ICategory[];
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

export const updateCategory = async (
  id: string,
  payload: Record<string, unknown>,
): Promise<ICategoryResponse> => {
  const response = await serverFetch.patch(`/categories/${id}`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update category");
  }

  return response.json();
};

export const deleteCategory = async (
  id: string,
): Promise<ICategoryResponse> => {
  const response = await serverFetch.delete(`/categories/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete category");
  }

  return response.json();
};
