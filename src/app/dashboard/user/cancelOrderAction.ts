"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateOrderStatus } from "@/services/order/order.service";

export async function cancelOrderAction(formData: FormData) {
  const orderId = formData.get("orderId") as string;

  if (!orderId) {
    throw new Error("Order ID is required");
  }

  try {
    await updateOrderStatus(orderId, {
      status: "USER-CANCELLED",
      cancelReason: "",
    });
    revalidatePath("/dashboard/user/orders");
  } catch (error) {
    console.error("Failed to cancel order:", error);
    throw new Error("Failed to cancel order. Please try again.");
  }

  redirect("/dashboard/user/orders");
}