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
