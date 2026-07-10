"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Loader2,
  Plus,
  ShoppingCart,
  TriangleAlert,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  adminCardClass,
  DroneThumb,
  orderStatusMeta,
  StatusPill,
} from "@/components/shared/admin/admin-ui";
import { getAdminAnalytics } from "@/services/analytics/analytics.service";
import { getDrones } from "@/services/drone/drone.service";
import { getOrders } from "@/services/order/order.service";
import type { IAdminAnalyticsData } from "@/types/analytics.type";
import type IDrone from "@/types/drone.type";
import type IOrder from "@/types/order.type";
import type IUser from "@/types/user.type";

const LOW_STOCK_THRESHOLD = 20;

const STATUS_BAR_COLORS: Record<string, string> = {
  COMPLETED: "#1f9d5c",
  DELIVERING: "#4a9eff",
  PROCESSING: "#4a9eff",
  PACKAGED: "#4a9eff",
  PENDING: "#f5a623",
  "USER-CANCELLED": "#8b8391",
  "ADMIN-CANCELLED": "#8b8391",
  FAILED: "#ef2b45",
};

function money(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n.toLocaleString()}`;
}

function customerName(order: IOrder): string {
  return typeof order.user === "object"
    ? (order.user as IUser).name
    : "Customer";
}

export default function AdminOverview() {
  const [analytics, setAnalytics] = useState<IAdminAnalyticsData | null>(null);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [drones, setDrones] = useState<IDrone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [a, o, d] = await Promise.all([
          getAdminAnalytics().catch(() => null),
          getOrders({ page: 1, limit: 5 }).catch(() => null),
          getDrones({ page: 1, limit: 50 }).catch(() => null),
        ]);
        if (!active) return;
        if (a?.data) setAnalytics(a.data);
        if (o?.success) setOrders(o.data);
        if (d?.success) setDrones(d.data);
      } catch {
        toast.error("Failed to load overview");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-dr-red" />
      </div>
    );
  }

  const lowStock = drones
    .filter((d) => d.quantity <= LOW_STOCK_THRESHOLD)
    .sort((a, b) => a.quantity - b.quantity)
    .slice(0, 4);

  const kpis = [
    {
      label: "Revenue (all time)",
      value: money(analytics?.totalRevenue ?? 0),
      delta: "18.2%",
      up: true,
      icon: DollarSign,
      iconBg: "rgba(31,157,92,.14)",
      iconColor: "#1f9d5c",
    },
    {
      label: "Orders",
      value: (analytics?.totalOrders ?? 0).toLocaleString(),
      delta: "9.4%",
      up: true,
      icon: ShoppingCart,
      iconBg: "rgba(74,158,255,.14)",
      iconColor: "#4a9eff",
    },
    {
      label: "Active users",
      value: (analytics?.totalUsers ?? 0).toLocaleString(),
      delta: "4.1%",
      up: true,
      icon: Users,
      iconBg: "rgba(239,43,69,.14)",
      iconColor: "#ef2b45",
    },
    {
      label: "Low-stock alerts",
      value: String(
        drones.filter((d) => d.quantity <= LOW_STOCK_THRESHOLD).length,
      ),
      delta: "2",
      up: false,
      icon: TriangleAlert,
      iconBg: "rgba(245,166,35,.14)",
      iconColor: "#f5a623",
    },
  ];

  const dist = analytics?.orderStatusDistribution ?? {};
  const distTotal = Object.values(dist).reduce((s, n) => s + n, 0) || 1;
  const statusBars = Object.entries(dist)
    .sort((a, b) => b[1] - a[1])
    .map(([status, count]) => ({
      label: orderStatusMeta(status as IOrder["status"]).label,
      count,
      pct: `${Math.round((count / distTotal) * 100)}%`,
      color: STATUS_BAR_COLORS[status] ?? "#8b8391",
    }));

  return (
    <div className="flex flex-col gap-5">
      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className={`${adminCardClass} p-[18px]`}>
              <div className="mb-3.5 flex items-center justify-between">
                <span
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px]"
                  style={{ background: k.iconBg, color: k.iconColor }}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span
                  className="inline-flex items-center gap-1 font-poppins text-xs font-semibold"
                  style={{ color: k.up ? "#1f9d5c" : "#f5a623" }}
                >
                  {k.up ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {k.delta}
                </span>
              </div>
              <div className="font-chakra text-[26px] font-bold tracking-[-0.01em] text-dr-text">
                {k.value}
              </div>
              <div className="mt-1 text-[12.5px] text-dr-text-3">{k.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent orders + Order status */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.9fr_1fr]">
        <div className={`${adminCardClass} overflow-hidden`}>
          <div className="flex items-center justify-between border-b border-dr-bd-1 px-[22px] py-[18px]">
            <h3 className="font-poppins text-[15.5px] font-semibold text-dr-text">
              Recent orders
            </h3>
            <Link
              href="/dashboard/admin/manage-orders"
              className="font-poppins text-[12.5px] font-semibold text-dr-red"
            >
              View all
            </Link>
          </div>
          <div className="flex flex-col">
            {orders.length === 0 ? (
              <div className="px-[22px] py-12 text-center text-[13.5px] text-dr-text-3">
                No orders yet.
              </div>
            ) : (
              orders.map((o) => {
                const meta = orderStatusMeta(o.status);
                return (
                  <div
                    key={o._id}
                    className="grid grid-cols-[1.1fr_1.4fr_.9fr_1fr] items-center gap-3 border-b border-dr-bd-1 px-[22px] py-3.5 text-[13.5px] last:border-0 hover:bg-dr-bd-1/50"
                  >
                    <span className="truncate font-dm-mono text-[12.5px] text-dr-text-2">
                      {o._id.slice(-6).toUpperCase()}
                    </span>
                    <span className="truncate font-medium text-dr-text">
                      {customerName(o)}
                    </span>
                    <span className="font-poppins font-bold text-dr-red">
                      ${o.totalPrice.toLocaleString()}
                    </span>
                    <span className="justify-self-end">
                      <StatusPill label={meta.label} style={meta.style} />
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className={`${adminCardClass} p-[22px]`}>
          <h3 className="font-poppins text-[15.5px] font-semibold text-dr-text">
            Order status
          </h3>
          <p className="mb-[18px] mt-1 text-[12.5px] text-dr-text-3">
            {distTotal} orders total
          </p>
          <div className="flex flex-col gap-[15px]">
            {statusBars.length === 0 ? (
              <p className="text-[13px] text-dr-text-3">No data.</p>
            ) : (
              statusBars.map((s) => (
                <div key={s.label}>
                  <div className="mb-[7px] flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[13px] font-medium text-dr-text">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: s.color }}
                      />
                      {s.label}
                    </span>
                    <span className="font-poppins text-[13px] font-semibold text-dr-text">
                      {s.count}
                    </span>
                  </div>
                  <div className="h-[7px] overflow-hidden rounded-full bg-dr-bd-1">
                    <div
                      className="h-full rounded-full"
                      style={{ width: s.pct, background: s.color }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Needs attention / low stock */}
      <div className={`${adminCardClass} overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-dr-bd-1 px-[22px] py-[18px]">
          <div className="flex items-center gap-2.5">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#f5a623]/[0.14] text-[#f5a623]">
              <TriangleAlert className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-poppins text-[15.5px] font-semibold text-dr-text">
                Needs attention
              </h3>
              <div className="mt-px text-xs text-dr-text-3">
                {lowStock.length} SKUs below reorder threshold
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/admin/manage-drones"
            className="font-poppins text-[12.5px] font-semibold text-dr-red"
          >
            Manage inventory
          </Link>
        </div>
        {lowStock.length === 0 ? (
          <div className="px-[22px] py-12 text-center text-[13.5px] text-dr-text-3">
            All inventory is healthy.
          </div>
        ) : (
          lowStock.map((d) => {
            const out = d.quantity === 0;
            const pct = Math.round(
              Math.min(d.quantity / LOW_STOCK_THRESHOLD, 1) * 100,
            );
            const color = out ? "#ef2b45" : "#f5a623";
            return (
              <div
                key={d._id}
                className="grid grid-cols-[2.4fr_1fr_1.2fr] items-center gap-3.5 border-b border-dr-bd-1 px-[22px] py-3 last:border-0 sm:grid-cols-[2.4fr_1fr_1.2fr_auto]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[10px] border border-dr-bd-1 bg-dr-field">
                    <DroneThumb size={30} />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-poppins text-sm font-semibold text-dr-text">
                      {d.name}
                    </div>
                    <div className="mt-0.5 font-dm-mono text-[11px] text-dr-text-3">
                      {d._id.slice(-6).toUpperCase()}
                    </div>
                  </div>
                </div>
                <span
                  className="font-poppins text-[13.5px] font-bold"
                  style={{ color }}
                >
                  {out ? "Out of stock" : `${d.quantity} left`}
                </span>
                <div className="flex items-center gap-2.5">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-dr-bd-1">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                  <span className="whitespace-nowrap text-[11px] text-dr-text-3">
                    / {LOW_STOCK_THRESHOLD}
                  </span>
                </div>
                <Link
                  href="/dashboard/admin/manage-drones"
                  className="hidden items-center gap-1.5 justify-self-end rounded-lg border border-dr-bd-2 px-3.5 py-[7px] font-poppins text-xs font-semibold text-dr-text transition-colors hover:border-dr-red/40 hover:text-dr-red sm:flex"
                >
                  <Plus className="h-[13px] w-[13px]" />
                  Restock
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
