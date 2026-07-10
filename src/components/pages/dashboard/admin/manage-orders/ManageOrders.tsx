"use client";

import { Download, Loader2, Lock, Search } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  adminCardClass,
  DroneThumb,
  orderStatusMeta,
  StatusPill,
} from "@/components/shared/admin/admin-ui";
import { cn, isOrderStatusImmutable } from "@/lib/utils";
import { getOrders } from "@/services/order/order.service";
import type IDrone from "@/types/drone.type";
import type IOrder from "@/types/order.type";
import type { TOrderStatus } from "@/types/order.type";
import UpdateStatusModal from "./UpdateStatusModal";

type OrderFilter =
  | "All"
  | "Pending"
  | "Active"
  | "Completed"
  | "Cancelled"
  | "Failed";

const FILTER_GROUPS: Record<Exclude<OrderFilter, "All">, TOrderStatus[]> = {
  Pending: ["PENDING"],
  Active: ["PROCESSING", "PACKAGED", "DELIVERING"],
  Completed: ["COMPLETED"],
  Cancelled: ["USER-CANCELLED", "ADMIN-CANCELLED"],
  Failed: ["FAILED"],
};

const FILTER_TABS: OrderFilter[] = [
  "All",
  "Pending",
  "Active",
  "Completed",
  "Cancelled",
  "Failed",
];

function customerName(order: IOrder): string {
  return typeof order.user === "object" ? order.user.name : String(order.user);
}

function customerEmail(order: IOrder): string {
  return typeof order.user === "object" ? order.user.email : "";
}

const ManageOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<OrderFilter>("All");

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

  const visibleOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders
      .filter((o) => {
        if (filter === "All") return true;
        return FILTER_GROUPS[filter].includes(o.status);
      })
      .filter((o) => {
        if (!q) return true;
        return (
          o._id.toLowerCase().includes(q) ||
          customerName(o).toLowerCase().includes(q) ||
          customerEmail(o).toLowerCase().includes(q)
        );
      });
  }, [orders, filter, search]);

  const handleExport = () => {
    if (visibleOrders.length === 0) {
      toast.error("No orders to export");
      return;
    }
    const rows = [
      ["Order ID", "Customer", "Email", "Total", "Status", "Created"],
      ...visibleOrders.map((o) => [
        o._id,
        customerName(o),
        customerEmail(o),
        String(o.totalPrice),
        o.status,
        new Date(o.createdAt).toISOString(),
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-page-${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Orders exported");
  };

  return (
    <div className="flex flex-col gap-[18px]">
      {/* Toolbar: status tabs + search + export */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1 overflow-x-auto rounded-[10px] border border-dr-bd-2 bg-dr-field p-[3px]">
          {FILTER_TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={cn(
                "whitespace-nowrap rounded-[7px] px-3.5 py-1.5 font-poppins text-[12.5px] font-semibold transition-colors",
                filter === t
                  ? "bg-dr-red/[0.12] text-dr-red"
                  : "text-dr-text-3 hover:text-dr-text",
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 h-[15px] w-[15px] text-dr-text-3" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders…"
              className="w-[220px] rounded-[10px] border border-dr-bd-2 bg-dr-field py-[10px] pl-9 pr-3 text-[13.5px] text-dr-text placeholder:text-dr-text-3 focus:border-dr-red/50 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-[10px] border border-dr-bd-2 px-[15px] py-[10px] font-poppins text-[13px] font-semibold text-dr-text transition-colors hover:border-dr-red/40 hover:text-dr-red"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Orders table */}
      <div className={`${adminCardClass} overflow-hidden`}>
        <div className="hidden grid-cols-[2.2fr_1.6fr_1fr_1fr_1.1fr] gap-3.5 border-b border-dr-bd-1 px-[22px] py-3.5 font-dm-mono text-[10.5px] uppercase tracking-[0.1em] text-dr-text-3 md:grid">
          <span>Order</span>
          <span>Customer</span>
          <span>Total</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-dr-red" />
          </div>
        ) : visibleOrders.length === 0 ? (
          <div className="px-[22px] py-12 text-center text-[13.5px] text-dr-text-3">
            {search || filter !== "All"
              ? "No orders match your filters."
              : "No orders found."}
          </div>
        ) : (
          visibleOrders.map((order) => {
            const meta = orderStatusMeta(order.status);
            const immutable = isOrderStatusImmutable(order.status);
            const firstDrone = order.drones[0]?.id as IDrone | undefined;
            const extra = order.drones.length - 1;
            return (
              <div
                key={order._id}
                className="grid grid-cols-[1fr_auto] items-center gap-3.5 border-b border-dr-bd-1 px-[22px] py-3.5 last:border-0 hover:bg-dr-bd-1/50 md:grid-cols-[2.2fr_1.6fr_1fr_1fr_1.1fr]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-dr-bd-1 bg-dr-field">
                    {firstDrone?.img ? (
                      <Image
                        src={firstDrone.img}
                        alt={firstDrone.name}
                        width={46}
                        height={46}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <DroneThumb size={30} />
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-poppins text-sm font-semibold text-dr-text">
                      {firstDrone?.name ?? "Order"}
                      {extra > 0 && (
                        <span className="text-dr-text-3"> +{extra} more</span>
                      )}
                    </div>
                    <div className="mt-0.5 font-dm-mono text-[11px] text-dr-text-3">
                      #{order._id.slice(-6).toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="hidden min-w-0 md:block">
                  <div className="truncate text-[13.5px] font-medium text-dr-text">
                    {customerName(order)}
                  </div>
                  <div className="truncate text-xs text-dr-text-3">
                    {customerEmail(order)}
                  </div>
                </div>
                <span className="hidden font-poppins text-[13.5px] font-bold text-dr-red md:block">
                  ${order.totalPrice.toLocaleString()}
                </span>
                <span className="hidden items-center gap-1.5 md:flex">
                  <StatusPill label={meta.label} style={meta.style} />
                  {immutable && (
                    <Lock
                      className="h-3 w-3 text-dr-text-3"
                      aria-hidden="true"
                    />
                  )}
                </span>
                <div className="justify-self-end">
                  <UpdateStatusModal
                    order={order}
                    onSuccess={handleStatusUpdate}
                    disabled={immutable}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-[10px] border border-dr-bd-2 px-4 py-2 font-poppins text-[13px] font-semibold text-dr-text transition-colors hover:border-dr-red/40 disabled:pointer-events-none disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-[13px] text-dr-text-3">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-[10px] border border-dr-bd-2 px-4 py-2 font-poppins text-[13px] font-semibold text-dr-text transition-colors hover:border-dr-red/40 disabled:pointer-events-none disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
