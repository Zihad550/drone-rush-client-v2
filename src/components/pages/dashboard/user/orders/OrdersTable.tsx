"use client";

import { Star, X } from "lucide-react";
import Image from "next/image";
import { cancelOrderAction } from "@/app/(dashboard)/dashboard/user/cancelOrderAction";
import ReviewModal from "@/components/review/ReviewModal";
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

interface OrdersTableProps {
  orders: IOrder[];
}

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

export default function OrdersTable({ orders }: OrdersTableProps) {
  const handleSubmitSuccess = () => {
    // Since orders are server-rendered, we might need to revalidate or update state
    // For simplicity, assume page refresh or handle via modal callback
    window.location.reload(); // Temporary solution
  };
  return (
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
                {typeof order.shippingInformation === "object" &&
                order.shippingInformation?.street &&
                order.shippingInformation?.city
                  ? `${order.shippingInformation.street}, ${order.shippingInformation.city}, ${order.shippingInformation.state} ${order.shippingInformation.zipCode}`
                  : "N/A"}
              </TableCell>
              <TableCell>
                {typeof order.payment === "object"
                  ? (order.payment?.status ?? "N/A")
                  : "N/A"}
              </TableCell>
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
                {order.status === "COMPLETED" ? (
                  <ReviewModal
                    order={order}
                    onSubmitSuccess={handleSubmitSuccess}
                    trigger={
                      <Button variant="outline" size="sm">
                        <Star
                          className={`h-4 w-4 mr-1 ${order.reviews?.length > 0 ? "fill-yellow-500 text-yellow-500" : ""}`}
                        />
                        {order.reviews?.length > 0 ? "Reviewed" : "Review"}
                      </Button>
                    }
                  />
                ) : (
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
                  )
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
