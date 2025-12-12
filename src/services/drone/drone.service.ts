import { serverFetch } from "@/lib/server-fetch";
import type IDrone from "@/types/drone.type";

interface IQueryParams {
  sort?: string;
  limit?: number;
  page?: number;
  category?: string[];
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
  userId?: string;
}

interface IDroneResponse {
  success: boolean;
  message: string;
  data: IDrone[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
}

export const getDrones = async (
  params?: IQueryParams,
): Promise<IDroneResponse> => {
  const queryString = params
    ? "?" +
      Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}=${value.join(",")}`;
          }
          return `${key}=${value}`;
        })
        .join("&")
    : "";

  const response = await serverFetch.get(`/drones${queryString}`);

  if (!response.ok) {
    throw new Error("Failed to fetch drones");
  }

  return await response.json();
};

export const getDroneById = async (
  id: string,
  userId?: string,
): Promise<IDrone> => {
  const queryString = userId ? `?userId=${userId}` : "";
  const response = await serverFetch.get(`/drones/${id}${queryString}`);

  if (!response.ok) {
    throw new Error("Failed to fetch drone");
  }

  const data = await response.json();
  return data.data;
};

export const createDrone = async (
  payload: Record<string, unknown>,
  formData?: FormData,
): Promise<IDroneResponse> => {
  let body: string | FormData;
  let headers: Record<string, string> = {};

  if (formData) {
    // Add the payload data as JSON string in "data" field
    formData.set("data", JSON.stringify(payload));
    // If FormData is provided, use it for file upload
    body = formData;
  } else {
    // Fallback to JSON for backward compatibility
    body = JSON.stringify(payload);
    headers = { "Content-Type": "application/json" };
  }

  const response = await serverFetch.post("/drones", {
    body,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create drone");
  }

  return response.json();
};

export const updateDrone = async (
  id: string,
  payload: Record<string, unknown>,
  formData?: FormData,
): Promise<IDroneResponse> => {
  let body: string | FormData;
  let headers: Record<string, string> = {};

  if (formData) {
    // If FormData is provided, use it for file upload
    body = formData;
    // Add the payload data as JSON string in "data" field
    formData.set("data", JSON.stringify(payload));
  } else {
    // Fallback to JSON for backward compatibility
    body = JSON.stringify(payload);
    headers = { "Content-Type": "application/json" };
  }

  const response = await serverFetch.patch(`/drones/${id}`, {
    body,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update drone");
  }

  return response.json();
};

export const deleteDrone = async (id: string): Promise<IDroneResponse> => {
  const response = await serverFetch.delete(`/drones/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete drone");
  }

  return response.json();
};
