import { serverFetch } from "@/lib/server-fetch";
import type IDrone from "@/types/drone.type";

interface IQueryParams {
	sort?: string;
	limit?: number;
	page?: number;
	category?: string;
	brand?: string;
	minPrice?: number;
	maxPrice?: number;
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
  };
}

export const getDrones = async (
  params?: IQueryParams,
): Promise<IDroneResponse> => {
  const queryString = params
    ? "?" +
      Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")
    : "";

  const response = await serverFetch.get(`/drones${queryString}`);

  if (!response.ok) {
    throw new Error("Failed to fetch drones");
  }

  return await response.json();
};

export const getDroneById = async (id: string, userId?: string): Promise<IDrone> => {
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
): Promise<IDroneResponse> => {
  const response = await serverFetch.post("/drones", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
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
): Promise<IDroneResponse> => {
  const response = await serverFetch.patch(`/drones/${id}`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
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
