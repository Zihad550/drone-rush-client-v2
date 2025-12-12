"use server";

import { revalidatePath } from "next/cache";
import {
  createDrone,
  getDroneById,
  updateDrone,
} from "@/services/drone/drone.service";
import { droneZodSchema } from "@/utils/zod-schema";

export async function handleDroneAction(
  _prevState: unknown,
  formData: FormData,
) {
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
  const validatedFields = droneZodSchema.safeParse(parsedData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      message: "",
    };
  }

  const { name, price, quantity, category, brand, description } =
    validatedFields.data;

  // Create payload without img since it will be uploaded via file
  const payload: any = {
    name,
    price,
    quantity,
    category,
    brand,
    description,
    reviews: [],
  };

  try {
    if (parsedData.droneId) {
      const droneId = parsedData.droneId as string;
      const existingDrone = await getDroneById(droneId);
      payload.reviews = existingDrone.reviews;
      await updateDrone(droneId, payload, formData);
      revalidatePath("/dashboard/admin/manage-drones");
      return {
        success: true,
        message: "Drone updated successfully",
        errors: {},
      };
    } else {
      await createDrone(payload, formData);
      revalidatePath("/dashboard/admin/manage-drones");
      return {
        success: true,
        message: "Drone created successfully",
        errors: {},
      };
    }
  } catch (error) {
    return {
      errors: { general: (error as Error).message },
      success: false,
      message: "",
    };
  }
}
