import type { Metadata } from "next";
import MakeAdmin from "@/components/pages/dashboard/admin/make-admin/MakeAdmin";

export const metadata: Metadata = {
  title: "Make Admin | Drone Rush",
  description: "Promote users to admin",
};

export default function MakeAdminPage() {
  return <MakeAdmin />;
}
