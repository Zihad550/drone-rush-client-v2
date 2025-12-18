"use client";

import { Loader2, Lock } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isOrderStatusImmutable } from "@/lib/utils";
import { getOrders } from "@/services/order/order.service";
import type IDrone from "@/types/drone.type";
import type IOrder from "@/types/order.type";
import UpdateStatusModal from "./UpdateStatusModal";

const ManageOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getOrders({ page, limit });
      if (res.success) {
        setOrders(res.data);
        setTotalPages(res.meta.total_page);
      } else {
        toast.error(res.message || "Failed to fetch orders");
      }
    } catch (_error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusUpdate = () => {
    fetchOrders();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Orders</CardTitle>
          <CardDescription>View and manage customer orders.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No orders found.
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm text-left">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                        Products
                      </th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                        Customer
                      </th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                        Total Price
                      </th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">
                          <div className="flex flex-col gap-2">
                            {order.drones.map((item, idx) => (
                              <div
                                key={
                                  typeof item.id === "string" ? item.id : idx
                                }
                                className="flex items-center gap-2"
                              >
                                <Image
                                  src={(item.id as IDrone).img}
                                  alt={(item.id as IDrone).name}
                                  width={40}
                                  height={40}
                                  className="h-10 w-10 rounded object-cover"
                                />
                                <div>
                                  <p className="font-medium">
                                    {(item.id as IDrone).name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          {typeof order.user === "object" ? (
                            <div className="flex flex-col">
                              <span>{order.user.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {order.user.email}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {order.user.phone}
                              </span>
                            </div>
                          ) : (
                            <span>{order.user}</span>
                          )}
                        </td>
                        <td className="p-4 align-middle">
                          ${order.totalPrice}
                        </td>
                        <td className="p-4 align-middle">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                              order.status === "COMPLETED"
                                ? "bg-green-100 text-green-800"
                                : order.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status}
                            {isOrderStatusImmutable(order.status) && (
                              <Lock className="h-3 w-3" />
                            )}
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <UpdateStatusModal
                            order={order}
                            onSuccess={handleStatusUpdate}
                            disabled={isOrderStatusImmutable(order.status)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <div className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageOrders;
