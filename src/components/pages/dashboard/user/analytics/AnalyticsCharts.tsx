"use client";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  type ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useTheme } from "next-themes";
import { Bar, Line, Pie } from "react-chartjs-2";

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

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[18px] border border-dr-bd-1 bg-dr-surface p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-[2px] w-5 rounded-sm bg-dr-red" />
        <h3 className="font-poppins text-sm font-semibold text-dr-text">
          {title}
        </h3>
      </div>
      <div className="h-[240px]">{children}</div>
    </div>
  );
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

  const red = "#ef2b45";
  const tickColor = isDark ? "#b3b0ba" : "#55515e";
  const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(20,16,28,0.07)";

  // Throttle-red centric palette with semantic accents
  const pieColors = ["#ef2b45", "#f5a623", "#1f9d5c", "#2f6bff", "#c31832"];

  const baseOptions: ChartOptions<"bar" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        ticks: { color: tickColor, font: { size: 11 } },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: tickColor, font: { size: 11 }, precision: 0 },
        grid: { color: gridColor },
      },
    },
  };

  const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: tickColor, font: { size: 11 }, boxWidth: 12 },
      },
    },
  };

  const barData = {
    labels: orderStatusLabels,
    datasets: [
      {
        label: "Orders",
        data: orderStatusData,
        backgroundColor: red,
        borderRadius: 6,
        maxBarThickness: 42,
      },
    ],
  };

  const pieData = {
    labels: ratingLabels,
    datasets: [
      {
        data: ratingData,
        backgroundColor: pieColors,
        borderWidth: 0,
      },
    ],
  };

  const lineData = {
    labels: orderStatusLabels,
    datasets: [
      {
        label: "Order Trends",
        data: orderStatusData,
        borderColor: red,
        backgroundColor: "rgba(239,43,69,0.15)",
        fill: true,
        tension: 0.35,
        pointBackgroundColor: red,
      },
    ],
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ChartCard title="Order Status Distribution">
        <Bar data={barData} options={baseOptions as ChartOptions<"bar">} />
      </ChartCard>
      <ChartCard title="Review Ratings">
        <Pie data={pieData} options={pieOptions} />
      </ChartCard>
      <ChartCard title="Order Trends">
        <Line data={lineData} options={baseOptions as ChartOptions<"line">} />
      </ChartCard>
    </div>
  );
}
