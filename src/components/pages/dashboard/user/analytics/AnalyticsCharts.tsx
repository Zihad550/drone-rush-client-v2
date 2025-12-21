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
import { Bar, Line, Pie } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface AnalyticsChartsProps {
  orderStatusCounts: { [key: string]: number };
  ratingCounts: { [key: number]: number };
}

export default function AnalyticsCharts({
  orderStatusCounts,
  ratingCounts,
}: AnalyticsChartsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const orderStatusLabels = Object.keys(orderStatusCounts);
  const orderStatusData = Object.values(orderStatusCounts);

  const ratingLabels = Object.keys(ratingCounts).map(
    (r) => `${r} Star${r !== "1" ? "s" : ""}`,
  );
  const ratingData = Object.values(ratingCounts);

  // Theme-aware colors
  const barColor = isDark
    ? "rgba(96, 165, 250, 0.6)"
    : "rgba(59, 130, 246, 0.6)"; // blue
  const lineBorderColor = isDark
    ? "rgba(96, 165, 250, 1)"
    : "rgba(59, 130, 246, 1)";
  const lineBgColor = isDark
    ? "rgba(96, 165, 250, 0.2)"
    : "rgba(59, 130, 246, 0.2)";

  const pieColors = isDark
    ? [
        "rgba(96, 165, 250, 0.6)", // blue
        "rgba(34, 197, 94, 0.6)", // green
        "rgba(252, 165, 165, 0.6)", // red
        "rgba(253, 224, 71, 0.6)", // yellow
        "rgba(196, 181, 253, 0.6)", // purple
      ]
    : [
        "rgba(59, 130, 246, 0.6)", // blue
        "rgba(16, 185, 129, 0.6)", // green
        "rgba(245, 101, 101, 0.6)", // red
        "rgba(251, 191, 36, 0.6)", // yellow
        "rgba(139, 92, 246, 0.6)", // purple
      ];

  const barData = {
    labels: orderStatusLabels,
    datasets: [
      {
        label: "Orders",
        data: orderStatusData,
        backgroundColor: barColor,
      },
    ],
  };

  const pieData = {
    labels: ratingLabels,
    datasets: [
      {
        data: ratingData,
        backgroundColor: pieColors,
      },
    ],
  };

  const lineData = {
    labels: orderStatusLabels, // Placeholder, can be dates later
    datasets: [
      {
        label: "Order Trends",
        data: orderStatusData,
        borderColor: lineBorderColor,
        backgroundColor: lineBgColor,
      },
    ],
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Order Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={barData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Review Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <Pie data={pieData} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Order Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={lineData} />
        </CardContent>
      </Card>
    </div>
  );
}
