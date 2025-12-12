"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/lib/server-fetch";
import { brandZodSchema } from "@/utils/zod-schema";

export async function brandAction(_prevState: unknown, formData: FormData) {
  const id = formData.get("id") as string | null;

  const validatedFields = brandZodSchema.safeParse({
    name: formData.get("name"),
    logo: formData.get("logo"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  try {
    let res: Response;
    let successMessage: string;

    if (id) {
      // Update
      res = await serverFetch.put(`/brands/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedFields.data),
      });
      successMessage = "Brand updated successfully";
    } else {
      // Create
      res = await serverFetch.post("/brands", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedFields.data),
      });
      successMessage = "Brand created successfully";
    }

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || `Failed to ${id ? "update" : "create"} brand`,
      };
    }

    revalidatePath("/dashboard/admin/manage-brands");

    return {
      success: true,
      message: successMessage,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
