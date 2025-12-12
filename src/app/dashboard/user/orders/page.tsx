import { X } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type IOrder from "@/types/order.type";
import { cancelOrderAction } from "../actions";
import { getUserOrders } from "@/services/order/order.service";

/**
 * Renders the products cell for an order, showing up to 3 drones with images and details.
 */
function renderProducts(order: IOrder) {
  return (
    <div className="space-y-2">
      {Array.isArray(order.drones) &&
        order.drones.slice(0, 3).map((drone, idx) => {
          if (typeof drone.id === "object" && drone.id !== null) {
            return (
              <div
                key={drone.id._id ?? idx}
                className="flex items-center gap-3"
              >
                <Image
                  src={drone.id?.img ?? ""}
                  alt={drone.id?.name ?? "Unknown Product"}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                />
                <div>
                  <p className="font-medium">
                    {drone.id?.name ?? "Unknown Product"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {drone.quantity ?? 1}
                  </p>
                </div>
              </div>
            );
          }
          return null;
        })}
      {Array.isArray(order.drones) && order.drones.length > 3 && (
        <p className="text-sm text-muted-foreground">
          and {order.drones.length - 3} more...
        </p>
      )}
    </div>
  );
}

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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Products</TableHead>
              <TableHead>Shipping</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{renderProducts(order)}</TableCell>
                <TableCell>
                  {order.shippingInformation?.street &&
                  order.shippingInformation?.city
                    ? `${order.shippingInformation.street}, ${order.shippingInformation.city}, ${order.shippingInformation.state} ${order.shippingInformation.zipCode}`
                    : "N/A"}
                </TableCell>
                <TableCell>{order.payment?.status ?? "N/A"}</TableCell>
                <TableCell className="font-medium">
                  ${order.totalPrice?.toFixed(2) ?? "0.00"}
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "COMPLETED"
                        ? "default"
                        : order.status === "FAILED"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {order.status !== "COMPLETED" &&
                    order.status !== "USER-CANCELLED" && (
                      <form action={cancelOrderAction}>
                        <input type="hidden" name="orderId" value={order._id} />
                        <Button
                          type="submit"
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={(e) => {
                            if (
                              !confirm(
                                "Are you sure you want to cancel this order?",
                              )
                            ) {
                              e.preventDefault();
                            }
                          }}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </form>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
