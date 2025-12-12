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
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = droneZodSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      message: "",
    };
  }

  const { name, price, quantity, img, category, brand, description } =
    validatedFields.data;
  const payload = {
    name,
    price,
    quantity,
    img,
    category,
    brand,
    description,
    reviews: [],
  };

  try {
    if (formData.has("droneId")) {
      const droneId = formData.get("droneId") as string;
      const existingDrone = await getDroneById(droneId);
      payload.reviews = existingDrone.reviews;
      await updateDrone(droneId, payload);
      revalidatePath("/dashboard/admin/manage-drones");
      return {
        success: true,
        message: "Drone updated successfully",
        errors: {},
      };
    } else {
      await createDrone(payload);
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
