import { Package } from "lucide-react";
import Link from "next/link";
import DashboardPageHeader from "@/components/pages/dashboard/user/dashboard-page-header";
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
      <div className="mx-auto flex h-96 max-w-[1180px] items-center justify-center rounded-[18px] border border-dr-bd-1 bg-dr-surface p-6">
        <div className="space-y-2 text-center">
          <p className="font-poppins text-lg font-semibold text-dr-text">
            {error}
          </p>
          <p className="text-sm text-dr-text-3">
            Please refresh the page manually.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1180px] space-y-7">
      <DashboardPageHeader
        eyebrow="Flight log"
        title="My orders"
        description="Track, review and manage every mission you've ordered."
      />

      {!orders || orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-[18px] border border-dr-bd-1 bg-dr-surface py-20 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-dr-red/25 bg-dr-red/[0.1] text-dr-red">
            <Package className="h-7 w-7" strokeWidth={1.75} />
          </span>
          <div>
            <h2 className="font-chakra text-xl font-bold text-dr-text">
              No orders yet
            </h2>
            <p className="mt-1 text-sm text-dr-text-3">
              Your ordered drones will show up here.
            </p>
          </div>
          <Link
            href="/drones"
            className="dr-red-grad mt-1 inline-flex items-center rounded-[10px] px-5 py-2.5 font-poppins text-sm font-semibold text-white shadow-[0_10px_26px_rgba(239,43,69,0.32)]"
          >
            Browse drones
          </Link>
        </div>
      ) : (
        <OrdersTable orders={orders} />
      )}
    </div>
  );
}
