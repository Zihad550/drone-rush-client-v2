import type { Metadata } from "next";
import ManageDrones from "@/components/pages/dashboard/admin/manage-drones/ManageDrones";

export const metadata: Metadata = {
  title: "Manage Drones | Drone Rush",
  description: "Manage drone inventory",
};

export default function ManageDronesPage() {
  return <ManageDrones />;
}
