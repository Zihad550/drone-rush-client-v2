import type { Metadata } from "next";
import AdminUsers from "@/components/pages/dashboard/admin/users/AdminUsers";

export const metadata: Metadata = {
  title: "Users | Drone Rush",
  description: "Manage users and team members",
};

export default function AdminUsersPage() {
  return <AdminUsers />;
}
