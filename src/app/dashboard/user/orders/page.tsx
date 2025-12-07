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
import type { IOrder } from "@/types/order.type";
import { cancelOrderAction, getUserOrders } from "../actions";

export default async function OrdersPage() {
  let orders: IOrder[] = [];
  let error: string | null = null;

  try {
    const response = await getUserOrders();
    orders = response.data || [];
  } catch (_err) {
    error = "Failed to load orders";
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg text-muted-foreground">{error}</p>
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
                    {Array.isArray(order.products) &&
                      order.products.map((product, idx) => {
                        if (
                          typeof product.id === "object" &&
                          product.id !== null
                        ) {
                          return (
                            <div
                              key={product.id._id ?? idx}
                              className="flex items-center gap-3"
                            >
                              <Image
                                src={product.id.img ?? ""}
                                alt={product.id.name ?? ""}
                                width={40}
                                height={40}
                                className="rounded-md object-cover"
                              />
                              <div>
                                <p className="font-medium">
                                  {product.id.name ?? ""}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {product.quantity ?? 1}
                                </p>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <p
                            key={`fallback-${String(product.id)}`}
                            className="text-sm"
                          >
                            {String(product.id)}
                          </p>
                        );
                      })}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  ${order.totalPrice}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "completed" ? "default" : "secondary"
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
