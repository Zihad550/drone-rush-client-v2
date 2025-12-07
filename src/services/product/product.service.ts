import { serverFetch } from "@/lib/server-fetch";
import type IProduct from "@/types/product.type";

interface IQueryParams {
  sort?: string;
  limit?: number;
  page?: number;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface IProductResponse {
  success: boolean;
  message: string;
  data: IProduct[];
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

export const getProducts = async (
  params?: IQueryParams,
): Promise<IProductResponse> => {
  const queryString = params
    ? "?" +
      Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")
    : "";

  const response = await serverFetch.get(`/products${queryString}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const getProductById = async (id: string): Promise<IProduct> => {
  const response = await serverFetch.get(`/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();
  return data.data;
};

export const createProduct = async (
  payload: Record<string, unknown>,
): Promise<IProductResponse> => {
  const response = await serverFetch.post("/products", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create product");
  }

  return response.json();
};

export const updateProduct = async (
  id: string,
  payload: Record<string, unknown>,
): Promise<IProductResponse> => {
  const response = await serverFetch.patch(`/products/${id}`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update product");
  }

  return response.json();
};

export const deleteProduct = async (id: string): Promise<IProductResponse> => {
  const response = await serverFetch.delete(`/products/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete product");
  }

  return response.json();
};
