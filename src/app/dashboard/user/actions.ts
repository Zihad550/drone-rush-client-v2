import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getOrders, updateOrderStatus } from "@/services/order/order.service";

export async function getUserOrders() {
  try {
    const response = await getOrders({});
    return response;
  } catch (_error) {
    throw new Error("Failed to fetch orders");
  }
}

export async function getCompletedOrders() {
  try {
    const response = await getOrders({ status: "completed" });
    return response;
  } catch (_error) {
    throw new Error("Failed to fetch completed orders");
  }
}

export async function cancelOrderAction(formData: FormData) {
  const orderId = formData.get("orderId") as string;

  if (!orderId) {
    throw new Error("Order ID is required");
  }

  try {
    await updateOrderStatus(orderId, {
      status: "user-cancelled",
      cancelReason: "",
    });
    revalidatePath("/dashboard/user/orders");
  } catch (_error) {
    throw new Error("Failed to cancel order");
  }

  redirect("/dashboard/user/orders");
}
