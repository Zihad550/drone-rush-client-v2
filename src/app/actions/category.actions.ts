"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/lib/server-fetch";
import { categoryZodSchema } from "@/utils/zod-schema";

export async function categoryAction(_prevState: unknown, formData: FormData) {
  const id = formData.get("id") as string | null;

  const validatedFields = categoryZodSchema.safeParse({
    name: formData.get("name"),
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
      res = await serverFetch.patch(`/categories/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedFields.data),
      });
      successMessage = "Category updated successfully";
    } else {
      // Create
      res = await serverFetch.post("/categories", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedFields.data),
      });
      successMessage = "Category created successfully";
    }

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message:
          data?.message || `Failed to ${id ? "update" : "create"} category`,
      };
    }

    revalidatePath("/dashboard/admin/manage-categories");

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
