import MetricCard from "./MetricCard";
import AnalyticsCharts from "./AnalyticsCharts";

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

export default function AnalyticsDashboard({ analytics }: AnalyticsDashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Your analytics overview
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Orders"
          value={analytics.totalOrders}
          description="All time orders"
        />
        <MetricCard
          title="Completed Orders"
          value={analytics.completedOrders}
          description="Successfully completed"
        />
        <MetricCard
          title="Total Spent"
          value={`$${analytics.totalSpent.toFixed(2)}`}
          description="On completed orders"
        />
        <MetricCard
          title="Total Reviews"
          value={analytics.totalReviews}
          description="Reviews submitted"
        />
        <MetricCard
          title="Average Rating"
          value={analytics.averageRating.toFixed(1)}
          description="Out of 5 stars"
        />
        <MetricCard
          title="Wishlist Items"
          value={analytics.wishlistCount}
          description="Items in wishlist"
        />
        <MetricCard
          title="Cart Items"
          value={analytics.cartCount}
          description="Items in cart"
        />
      </div>

      <AnalyticsCharts
        orderStatusCounts={analytics.orderStatusCounts}
        ratingCounts={analytics.ratingCounts}
      />
    </div>
  );
}