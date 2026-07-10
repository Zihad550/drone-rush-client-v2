import {
  CheckCircle2,
  Heart,
  Package,
  ShoppingCart,
  Star,
  Wallet,
} from "lucide-react";
import DashboardPageHeader from "../dashboard-page-header";
import AnalyticsCharts from "./AnalyticsCharts";
import MetricCard from "./MetricCard";

interface AnalyticsDashboardProps {
  analytics: {
    totalOrders: number;
    completedOrders: number;
    totalSpent: number;
    totalReviews: number;
    averageRating: number;
    wishlistCount: number;
    cartCount: number;
    orderStatusCounts: { [key: string]: number };
    ratingCounts: { [key: number]: number };
  };
}

export default function AnalyticsDashboard({
  analytics,
}: AnalyticsDashboardProps) {
  return (
    <div className="mx-auto max-w-[1180px] space-y-7">
      <DashboardPageHeader
        eyebrow="Flight log"
        title="Pilot dashboard"
        description="Your orders, spend and fleet activity at a glance."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Orders"
          value={analytics.totalOrders}
          description="All time orders"
          icon={Package}
        />
        <MetricCard
          title="Completed"
          value={analytics.completedOrders}
          description="Successfully delivered"
          icon={CheckCircle2}
        />
        <MetricCard
          title="Total Spent"
          value={`$${analytics.totalSpent.toFixed(2)}`}
          description="On completed orders"
          icon={Wallet}
        />
        <MetricCard
          title="Reviews"
          value={analytics.totalReviews}
          description="Reviews submitted"
          icon={Star}
        />
        <MetricCard
          title="Avg. Rating"
          value={analytics.averageRating.toFixed(1)}
          description="Out of 5 stars"
          icon={Star}
        />
        <MetricCard
          title="Wishlist"
          value={analytics.wishlistCount}
          description="Saved for later"
          icon={Heart}
        />
        <MetricCard
          title="In Cart"
          value={analytics.cartCount}
          description="Ready to check out"
          icon={ShoppingCart}
        />
      </div>

      <AnalyticsCharts
        orderStatusCounts={analytics.orderStatusCounts}
        ratingCounts={analytics.ratingCounts}
      />
    </div>
  );
}
