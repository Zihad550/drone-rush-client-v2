import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getCompletedUserOrders,
  updateOrderStatus,
  getUserOrders as getUserOrdersService,
} from "@/services/order/order.service";

export async function getUserOrders() {
  try {
    const response = await getUserOrdersService();
    return response;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return {
      success: false,
      message: "Failed to fetch orders. Please try again.",
      data: [],
    };
  }
}

export async function getCompletedOrders() {
  try {
    const response = await getCompletedUserOrders();
    return response;
  } catch (error) {
    console.error("Failed to fetch completed orders:", error);
    return {
      success: false,
      message: "Failed to fetch completed orders. Please try again.",
      data: [],
    };
  }
}

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
