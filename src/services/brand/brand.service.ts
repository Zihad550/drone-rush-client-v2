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

export const getBrands = async (): Promise<IBrandResponse> => {
  const response = await serverFetch.get("/brands");

  if (!response.ok) {
    throw new Error("Failed to fetch brands");
  }

  return response.json();
};
