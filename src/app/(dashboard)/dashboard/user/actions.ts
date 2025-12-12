import {
  getCompletedUserOrders,
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
