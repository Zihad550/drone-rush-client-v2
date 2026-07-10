import type { Metadata } from "next";
import AdminSettings from "@/components/pages/dashboard/admin/settings/AdminSettings";

export const metadata: Metadata = {
  title: "Settings | Drone Rush",
  description: "Roles, team members, and store settings",
};

export default function AdminSettingsPage() {
  return <AdminSettings />;
}
