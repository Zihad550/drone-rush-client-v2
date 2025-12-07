import type { Metadata } from "next";
import ManageOrders from "@/components/pages/dashboard/admin/manage-orders/ManageOrders";

export const metadata: Metadata = {
  title: "Manage Orders | Drone Rush",
  description: "Manage customer orders",
};

export default function ManageOrdersPage() {
  return <ManageOrders />;
}
