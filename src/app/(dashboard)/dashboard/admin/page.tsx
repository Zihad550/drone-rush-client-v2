"use client";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { getAdminAnalytics } from "@/services/analytics/analytics.service";
import type { IAdminAnalyticsData } from "@/types/analytics.type";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
);

export default function AdminAnalyticsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [data, setData] = useState<IAdminAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAdminAnalytics();
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  // Theme-aware colors
  const barColor = isDark
    ? "rgba(96, 165, 250, 0.6)"
    : "rgba(59, 130, 246, 0.6)"; // blue
  const orderStatusColors = isDark
    ? [
        "rgba(96, 165, 250, 0.6)",
        "rgba(34, 197, 94, 0.6)",
        "rgba(253, 224, 71, 0.6)",
        "rgba(196, 181, 253, 0.6)",
      ] // blue, green, yellow, purple
    : [
        "rgba(59, 130, 246, 0.6)",
        "rgba(16, 185, 129, 0.6)",
        "rgba(251, 191, 36, 0.6)",
        "rgba(139, 92, 246, 0.6)",
      ];

  const userGrowthBorder = isDark
    ? "rgba(96, 165, 250, 1)"
    : "rgba(59, 130, 246, 1)";
  const userGrowthBg = isDark
    ? "rgba(96, 165, 250, 0.2)"
    : "rgba(59, 130, 246, 0.2)";

  const revenueBorder = isDark
    ? "rgba(34, 197, 94, 1)"
    : "rgba(16, 185, 129, 1)"; // green
  const revenueBg = isDark
    ? "rgba(34, 197, 94, 0.2)"
    : "rgba(16, 185, 129, 0.2)";

  const topDronesChart = {
    labels: data.topDrones.map((d) => d.name),
    datasets: [
      {
        label: "Sales Count",
        data: data.topDrones.map((d) => d.salesCount),
        backgroundColor: barColor,
      },
    ],
  };

  const orderStatusChart = {
    labels: Object.keys(data.orderStatusDistribution),
    datasets: [
      {
        data: Object.values(data.orderStatusDistribution),
        backgroundColor: orderStatusColors,
      },
    ],
  };

  const userGrowthChart = {
    labels: data.userGrowth.map((g) => g.date),
    datasets: [
      {
        label: "User Growth",
        data: data.userGrowth.map((g) => g.count),
        borderColor: userGrowthBorder,
        backgroundColor: userGrowthBg,
      },
    ],
  };

  const revenueChart = {
    labels: data.revenueOverTime.map((r) => r.date),
    datasets: [
      {
        label: "Revenue",
        data: data.revenueOverTime.map((r) => r.amount),
        borderColor: revenueBorder,
        backgroundColor: revenueBg,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold tracking-tight">Admin Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl">{data.totalUsers}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl">{data.totalOrders}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl">${data.totalRevenue}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Top Drones</h3>
          <Bar data={topDronesChart} />
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">
            Order Status Distribution
          </h3>
          <Pie data={orderStatusChart} />
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <Line data={userGrowthChart} />
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Revenue Over Time</h3>
          <Line data={revenueChart} />
        </div>
      </div>
    </div>
  );
}
