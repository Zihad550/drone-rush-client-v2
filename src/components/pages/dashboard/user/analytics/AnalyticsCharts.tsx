"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
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
  const orderStatusLabels = Object.keys(orderStatusCounts);
  const orderStatusData = Object.values(orderStatusCounts);

  const ratingLabels = Object.keys(ratingCounts).map((r) => `${r} Star${r !== "1" ? "s" : ""}`);
  const ratingData = Object.values(ratingCounts);

  const barData = {
    labels: orderStatusLabels,
    datasets: [
      {
        label: "Orders",
        data: orderStatusData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const pieData = {
    labels: ratingLabels,
    datasets: [
      {
        data: ratingData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  const lineData = {
    labels: orderStatusLabels, // Placeholder, can be dates later
    datasets: [
      {
        label: "Order Trends",
        data: orderStatusData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
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