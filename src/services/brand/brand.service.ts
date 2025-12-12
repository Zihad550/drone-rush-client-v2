import { serverFetch } from "@/lib/server-fetch";

interface IBrandResponse {
  success: boolean;
  message: string;
  data: { _id: string; name: string; logo: string; description: string }[];
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

interface ISingleBrandResponse {
  success: boolean;
  message: string;
  data: { _id: string; name: string; logo: string; description: string };
}

export const getBrands = async (): Promise<IBrandResponse> => {
  const response = await serverFetch.get("/brands");

  if (!response.ok) {
    throw new Error("Failed to fetch brands");
  }

  return response.json();
};

export const createBrand = async (
  payload: Record<string, unknown>,
): Promise<IBrandResponse> => {
  const response = await serverFetch.post("/brands", {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create brand");
  }

  return response.json();
};

export const getBrandById = async (
  id: string,
): Promise<ISingleBrandResponse> => {
  const response = await serverFetch.get(`/brands/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch brand");
  }

  return response.json();
};

export const updateBrand = async (
  id: string,
  payload: Record<string, unknown>,
): Promise<ISingleBrandResponse> => {
  const response = await serverFetch.put(`/brands/${id}`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update brand");
  }

  return response.json();
};

export const deleteBrand = async (
  id: string,
): Promise<ISingleBrandResponse> => {
  const response = await serverFetch.delete(`/brands/${id}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete brand");
  }

  return response.json();
};
