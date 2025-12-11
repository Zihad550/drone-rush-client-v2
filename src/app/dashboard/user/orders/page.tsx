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
import { cancelOrderAction, getUserOrders } from "../actions";

export default async function OrdersPage() {
  const response = await getUserOrders();

  if (!response.success) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center space-y-4">
          <p className="text-lg text-muted-foreground">{response.message}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-primary hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const orders: IOrder[] = response.data || [];

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
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <div className="space-y-2">
                    {Array.isArray(order.drones) &&
                      order.drones.map((drone, idx) => {
                        if (typeof drone.id === "object" && drone.id !== null) {
                          return (
                            <div
                              key={drone.id._id ?? idx}
                              className="flex items-center gap-3"
                            >
                              <Image
                                src={drone.id.img ?? ""}
                                alt={drone.id.name ?? ""}
                                width={40}
                                height={40}
                                className="rounded-md object-cover"
                              />
                              <div>
                                <p className="font-medium">
                                  {drone.id.name ?? ""}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {drone.quantity ?? 1}
                                </p>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <p key={`fallback-${String(drone.id)}`}>
                            {String(drone.id)}
                          </p>
                        );
                      })}
                  </div>
                </TableCell>
                <TableCell>
                  {typeof order.shippingInformation === "object" &&
                  order.shippingInformation
                    ? `${order.shippingInformation.street}, ${order.shippingInformation.city}`
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {typeof order.payment === "object" && order.payment
                    ? order.payment.status
                    : "N/A"}
                </TableCell>
                <TableCell className="font-medium">
                  ${order.totalPrice}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "COMPLETED" ? "default" : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
