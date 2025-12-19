import OrdersTable from "@/components/pages/dashboard/user/orders/OrdersTable";
import { getUserOrders } from "@/services/order/order.service";
import type IOrder from "@/types/order.type";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  let orders: IOrder[] = [];
  let error: string | null = null;

  try {
    const response = await getUserOrders();
    console.log(response);
    if (!response.success) {
      error = response.message || "Failed to fetch orders";
    } else {
      orders = response.data || [];
    }
  } catch (_err) {
    error = "Failed to load orders";
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">{error}</p>
          <p className="text-sm text-muted-foreground">
            Please refresh the page manually.
          </p>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg text-muted-foreground">
          You don't have any orders.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground">
          View and manage your order history
        </p>
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
}
