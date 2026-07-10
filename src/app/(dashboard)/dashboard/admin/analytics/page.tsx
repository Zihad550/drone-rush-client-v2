import type { Metadata } from "next";
import AdminAnalytics from "@/components/pages/dashboard/admin/analytics/AdminAnalytics";

export const metadata: Metadata = {
  title: "Analytics | Drone Rush",
  description: "Store performance analytics",
};

export default function AdminAnalyticsPage() {
  return <AdminAnalytics />;
}
