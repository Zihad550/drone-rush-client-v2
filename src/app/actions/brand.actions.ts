"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/lib/server-fetch";
import { brandZodSchema } from "@/utils/zod-schema";

export async function brandAction(_prevState: unknown, formData: FormData) {
  // Parse the JSON data from the "data" field
  const dataString = formData.get("data") as string;
  let parsedData: Record<string, unknown>;

  try {
    parsedData = JSON.parse(dataString);
  } catch (_error) {
    return {
      errors: { general: "Invalid form data" },
      success: false,
      message: "",
    };
  }

  // Validate the parsed data
  const validatedFields = brandZodSchema.safeParse(parsedData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      message: "",
    };
  }

  try {
    let res: Response;
    let successMessage: string;

    if (parsedData.id) {
      // Update
      res = await serverFetch.put(`/brands/${parsedData.id}`, {
        body: formData,
      });
      successMessage = "Brand updated successfully";
    } else {
      // Create
      res = await serverFetch.post("/brands", {
        body: formData,
      });
      successMessage = "Brand created successfully";
    }

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message:
          data?.message ||
          `Failed to ${parsedData.id ? "update" : "create"} brand`,
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
