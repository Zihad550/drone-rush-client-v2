import Image from "next/image";
import { ReviewModal } from "@/components/shared/review-modal";
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
import { getCompletedOrders } from "../actions";

export default async function PurchasedPage() {
  let orders: IOrder[] = [];
  let error: string | null = null;

  try {
    const response = await getCompletedOrders();
    orders = response.data || [];
  } catch (_err) {
    error = "Failed to load purchased items";
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
          You don't have any purchased products.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Purchases</h1>
        <p className="text-muted-foreground">
          View your completed orders and purchased items
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Drone Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) =>
              Array.isArray(order.drones)
                ? order.drones.map((drone, idx) => {
                    if (typeof drone.id === "object" && drone.id !== null) {
                      return (
                        <TableRow key={drone.id._id ?? idx}>
                          <TableCell>
                            <Image
                              src={drone.id.img ?? ""}
                              alt={drone.id.name ?? ""}
                              width={60}
                              height={60}
                              className="rounded-md object-cover"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {drone.id.name ?? ""}
                          </TableCell>
                          <TableCell>${drone.id.price ?? 0}</TableCell>
                          <TableCell>{drone.quantity ?? 1}</TableCell>
                          <TableCell>
                            <Badge variant="default">{order.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <ReviewModal
                              product={{
                                productName: drone.id.name ?? "",
                                img: drone.id.img ?? "",
                              }}
                            >
                              <Button variant="outline" size="sm">
                                Write Review
                              </Button>
                            </ReviewModal>
                          </TableCell>
                        </TableRow>
                      );
                    }
                    return null;
                  })
                : null,
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
