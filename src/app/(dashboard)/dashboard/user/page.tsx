import AnalyticsDashboard from "@/components/pages/dashboard/user/analytics/AnalyticsDashboard";
import { getUserAnalytics } from "@/services/user/user-analytics.service";

export const dynamic = "force-dynamic";

interface IAnalyticsData {
  totalOrders: number;
  completedOrders: number;
  totalSpent: number;
  totalReviews: number;
  averageRating: number;
  wishlistCount: number;
  cartCount: number;
  orderStatusCounts: { [key: string]: number };
  ratingCounts: { [key: number]: number };
}

export default async function AnalyticsPage() {
  let analytics: IAnalyticsData | null = null;
  let error: string | null = null;

  try {
    const response = await getUserAnalytics();
    if (!response.success) {
      error = response.message || "Failed to fetch analytics";
    } else {
      analytics = response.data || null;
    }
  } catch (_err) {
    error = "Failed to load analytics";
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-card rounded-lg p-6">
        <div className="text-center space-y-4">
          <p className="text-lg text-card-foreground">{error}</p>
          <p className="text-sm text-muted-foreground">
            Please refresh the page manually.
          </p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-96 bg-card rounded-lg p-6">
        <p className="text-lg text-card-foreground">
          No analytics data available.
        </p>
      </div>
    );
  }

  return <AnalyticsDashboard analytics={analytics} />;
}
