"use client";

import { Star, X } from "lucide-react";
import Image from "next/image";
import { cancelOrderAction } from "@/app/(dashboard)/dashboard/user/cancelOrderAction";
import ReviewModal from "@/components/review/ReviewModal";
import { cn } from "@/lib/utils";
import type IOrder from "@/types/order.type";

interface OrdersTableProps {
  orders: IOrder[];
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    COMPLETED: "border-[#1f9d5c]/30 bg-[#1f9d5c]/[0.12] text-[#1f9d5c]",
    FAILED: "border-dr-red/30 bg-dr-red/[0.12] text-dr-red",
    "USER-CANCELLED": "border-dr-bd-3 bg-dr-bd-1 text-dr-text-3",
  };
  const tone =
    map[status] ?? "border-[#f5a623]/30 bg-[#f5a623]/[0.12] text-[#f5a623]";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-dm-mono text-[10px] font-bold uppercase tracking-[0.12em]",
        tone,
      )}
    >
      {status}
    </span>
  );
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
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[10px] border border-dr-bd-1">
                  <Image
                    src={drone.id?.img ?? ""}
                    alt={drone.id?.name ?? "Unknown Product"}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-poppins text-[13px] font-semibold text-dr-text">
                    {drone.id?.name ?? "Unknown Product"}
                  </p>
                  <p className="font-dm-mono text-[11px] uppercase tracking-wide text-dr-text-3">
                    Qty {drone.quantity ?? 1}
                  </p>
                </div>
              </div>
            );
          }
          return null;
        })}
      {Array.isArray(order.drones) && order.drones.length > 3 && (
        <p className="text-xs text-dr-text-3">
          and {order.drones.length - 3} more&hellip;
        </p>
      )}
    </div>
  );
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const handleSubmitSuccess = () => {
    window.location.reload();
  };

  return (
    <div className="overflow-hidden rounded-[16px] border border-dr-bd-1 bg-dr-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] caption-bottom text-sm">
          <thead>
            <tr className="border-b border-dr-bd-1">
              {[
                "Products",
                "Shipping",
                "Payment",
                "Total",
                "Date",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3.5 text-left font-dm-mono text-[10px] font-bold uppercase tracking-[0.18em] text-dr-text-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-dr-bd-1 transition-colors last:border-0 hover:bg-dr-bd-1/40"
              >
                <td className="px-5 py-4">{renderProducts(order)}</td>
                <td className="px-5 py-4 text-[13px] text-dr-text-2">
                  {typeof order.shippingInformation === "object" &&
                  order.shippingInformation?.street &&
                  order.shippingInformation?.city
                    ? `${order.shippingInformation.street}, ${order.shippingInformation.city}, ${order.shippingInformation.state} ${order.shippingInformation.zipCode}`
                    : "N/A"}
                </td>
                <td className="px-5 py-4 text-[13px] text-dr-text-2">
                  {typeof order.payment === "object"
                    ? (order.payment?.status ?? "N/A")
                    : "N/A"}
                </td>
                <td className="px-5 py-4 font-chakra text-[15px] font-bold text-dr-text">
                  ${order.totalPrice?.toFixed(2) ?? "0.00"}
                </td>
                <td className="px-5 py-4 text-[13px] text-dr-text-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-4">
                  <StatusPill status={order.status} />
                </td>
                <td className="px-5 py-4">
                  {order.status === "COMPLETED" ? (
                    <ReviewModal
                      order={order}
                      onSubmitSuccess={handleSubmitSuccess}
                      trigger={
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-[9px] border border-dr-bd-2 px-3 py-2 font-poppins text-[13px] font-semibold text-dr-text transition-colors hover:border-dr-red/40 hover:text-dr-red"
                        >
                          <Star
                            className={cn(
                              "h-4 w-4",
                              order.reviews?.length > 0 &&
                                "fill-[#f5a623] text-[#f5a623]",
                            )}
                          />
                          {order.reviews?.length > 0 ? "Reviewed" : "Review"}
                        </button>
                      }
                    />
                  ) : (
                    order.status !== "USER-CANCELLED" && (
                      <form action={cancelOrderAction}>
                        <input type="hidden" name="orderId" value={order._id} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-1.5 rounded-[9px] border border-dr-red/30 px-3 py-2 font-poppins text-[13px] font-semibold text-dr-red transition-colors hover:bg-dr-red/[0.1]"
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
                          <X className="h-4 w-4" />
                          Cancel
                        </button>
                      </form>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
