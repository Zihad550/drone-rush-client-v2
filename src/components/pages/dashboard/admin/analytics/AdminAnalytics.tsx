"use client";

import { ArrowDownRight, ArrowUpRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { adminCardClass, DroneThumb } from "@/components/shared/admin/admin-ui";
import { getAdminAnalytics } from "@/services/analytics/analytics.service";
import type { IAdminAnalyticsData } from "@/types/analytics.type";

function money(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${Math.round(n).toLocaleString()}`;
}

/** Build an area + line path (viewBox 0 0 600 210) from a value series. */
function buildSpark(values: number[]) {
  if (values.length === 0)
    return {
      line: "",
      area: "",
      last: null as null | { x: number; y: number },
    };
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const n = values.length;
  const pts = values.map((v, i) => {
    const x = n === 1 ? 300 : (i / (n - 1)) * 560 + 20;
    const y = 175 - ((v - min) / range) * 150;
    return { x: Math.round(x), y: Math.round(y) };
  });
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${line} ${pts[pts.length - 1].x},200 ${pts[0].x},200`;
  return { line, area, last: pts[pts.length - 1] };
}

const ANALYTICS_KPIS = [
  { label: "Conversion rate", value: "3.84%", delta: "0.6%", up: true },
  { label: "Avg. order value", value: "$1,142", delta: "3.2%", up: true },
  { label: "Refund rate", value: "1.9%", delta: "0.4%", up: false },
  { label: "Repeat buyers", value: "42.6%", delta: "5.1%", up: true },
];

const CATEGORY_BARS = [
  { label: "Cinematic", pct: "38%", color: "#ef2b45" },
  { label: "Prosumer", pct: "27%", color: "#4a9eff" },
  { label: "FPV / Racing", pct: "19%", color: "#f5a623" },
  { label: "Compact", pct: "11%", color: "#1f9d5c" },
  { label: "Accessories", pct: "5%", color: "#a678ff" },
];

const TRAFFIC = [
  { label: "Organic search", pct: "42%", color: "#ef2b45" },
  { label: "Direct", pct: "24%", color: "#4a9eff" },
  { label: "Paid social", pct: "19%", color: "#f5a623" },
  { label: "Referral", pct: "15%", color: "#1f9d5c" },
];

const REGIONS = [
  { label: "United States", value: "$118K", pct: "100%" },
  { label: "Canada", value: "$46K", pct: "40%" },
  { label: "United Kingdom", value: "$39K", pct: "34%" },
  { label: "Germany", value: "$31K", pct: "27%" },
  { label: "Australia", value: "$24K", pct: "21%" },
];

export default function AdminAnalytics() {
  const [data, setData] = useState<IAdminAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getAdminAnalytics()
      .then((res) => {
        if (active && res?.data) setData(res.data);
      })
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-dr-red" />
      </div>
    );
  }

  const revenueSeries = (data?.revenueOverTime ?? []).map((r) => r.amount);
  const spark = buildSpark(revenueSeries);
  const monthly = (data?.revenueOverTime ?? []).slice(-12);
  const maxMonthly = Math.max(...monthly.map((m) => m.amount), 1);
  const topDrones = (data?.topDrones ?? []).slice(0, 4);
  const maxSales = Math.max(...topDrones.map((d) => d.salesCount), 1);

  return (
    <div className="flex flex-col gap-5">
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ANALYTICS_KPIS.map((k) => (
          <div key={k.label} className={`${adminCardClass} p-[18px]`}>
            <div className="text-[12.5px] text-dr-text-3">{k.label}</div>
            <div className="mt-1.5 font-chakra text-[25px] font-bold text-dr-text">
              {k.value}
            </div>
            <div
              className="mt-2 inline-flex items-center gap-1.5 font-poppins text-xs font-semibold"
              style={{ color: k.up ? "#1f9d5c" : "#f5a623" }}
            >
              {k.up ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}
              {k.delta}
              <span className="font-normal text-dr-text-3">vs last mo</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue + Top sellers */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.9fr_1fr]">
        <div className={`${adminCardClass} px-[22px] pb-4 pt-[22px]`}>
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="font-poppins text-[15.5px] font-semibold text-dr-text">
                Revenue
              </h3>
              <div className="mt-1.5 flex items-baseline gap-2.5">
                <span className="font-chakra text-2xl font-bold text-dr-text">
                  {money(data?.totalRevenue ?? 0)}
                </span>
                <span className="text-[12.5px] font-semibold text-[#1f9d5c]">
                  +18.2% vs last yr
                </span>
              </div>
            </div>
            <div className="hidden gap-1.5 rounded-[9px] border border-dr-bd-2 bg-dr-field p-[3px] sm:flex">
              {["12M", "30D", "7D"].map((t, i) => (
                <span
                  key={t}
                  className={
                    i === 0
                      ? "rounded-md bg-dr-red/[0.12] px-2.5 py-[5px] text-xs font-semibold text-dr-red"
                      : "px-2.5 py-[5px] text-xs font-semibold text-dr-text-3"
                  }
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          {spark.line ? (
            <svg
              viewBox="0 0 600 210"
              width="100%"
              height="192"
              preserveAspectRatio="none"
              className="block overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="revfill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ef2b45" stopOpacity=".28" />
                  <stop offset="1" stopColor="#ef2b45" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line
                x1="0"
                y1="52"
                x2="600"
                y2="52"
                stroke="var(--dr-bd-1)"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="105"
                x2="600"
                y2="105"
                stroke="var(--dr-bd-1)"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1="158"
                x2="600"
                y2="158"
                stroke="var(--dr-bd-1)"
                strokeWidth="1"
              />
              <polygon points={spark.area} fill="url(#revfill)" />
              <polyline
                points={spark.line}
                fill="none"
                stroke="#ef2b45"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {spark.last && (
                <circle
                  cx={spark.last.x}
                  cy={spark.last.y}
                  r="4.5"
                  fill="#ef2b45"
                  stroke="var(--dr-surface)"
                  strokeWidth="2.5"
                />
              )}
            </svg>
          ) : (
            <div className="py-16 text-center text-[13px] text-dr-text-3">
              No revenue data.
            </div>
          )}
        </div>

        <div className={`${adminCardClass} px-[22px] py-5`}>
          <h3 className="mb-4 font-poppins text-[15.5px] font-semibold text-dr-text">
            Top sellers
          </h3>
          <div className="flex flex-col gap-[15px]">
            {topDrones.length === 0 ? (
              <p className="text-[13px] text-dr-text-3">No data.</p>
            ) : (
              topDrones.map((d, i) => (
                <div key={d.droneId} className="flex items-center gap-3">
                  <span className="w-4 font-chakra text-sm font-bold text-dr-text-3">
                    {i + 1}
                  </span>
                  <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[10px] border border-dr-bd-1 bg-dr-field">
                    <DroneThumb size={30} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-poppins text-[13px] font-semibold text-dr-text">
                      {d.name}
                    </div>
                    <div className="mt-px text-[11.5px] text-dr-text-3">
                      {d.salesCount} sold
                    </div>
                  </div>
                  <span className="font-poppins text-[13px] font-bold text-dr-red">
                    {Math.round((d.salesCount / maxSales) * 100)}%
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Units by month + Category */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className={`${adminCardClass} p-[22px]`}>
          <h3 className="font-poppins text-[15.5px] font-semibold text-dr-text">
            Revenue by month
          </h3>
          <p className="mb-[22px] mt-0.5 text-[12.5px] text-dr-text-3">
            Last {monthly.length} periods
          </p>
          <div className="flex h-[180px] items-end justify-between gap-2">
            {monthly.length === 0 ? (
              <p className="text-[13px] text-dr-text-3">No data.</p>
            ) : (
              monthly.map((m, i) => (
                <div
                  key={m.date}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <div
                    title={money(m.amount)}
                    className="w-full max-w-[26px] rounded-t-md"
                    style={{
                      height: `${Math.max(Math.round((m.amount / maxMonthly) * 100), 4)}%`,
                      background:
                        i === monthly.length - 1
                          ? "linear-gradient(180deg,#ff6377,#ef2b45)"
                          : "rgba(239,43,69,.32)",
                    }}
                  />
                  <span className="font-dm-mono text-[9.5px] text-dr-text-3">
                    {m.date.slice(5)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={`${adminCardClass} p-[22px]`}>
          <h3 className="mb-[18px] font-poppins text-[15.5px] font-semibold text-dr-text">
            Sales by category
          </h3>
          <div className="flex flex-col gap-4">
            {CATEGORY_BARS.map((c) => (
              <div key={c.label}>
                <div className="mb-[7px] flex items-center justify-between">
                  <span className="text-[13px] font-medium text-dr-text">
                    {c.label}
                  </span>
                  <span className="font-poppins text-[12.5px] font-semibold text-dr-text-2">
                    {c.pct}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-dr-bd-1">
                  <div
                    className="h-full rounded-full"
                    style={{ width: c.pct, background: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic + Regions */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={`${adminCardClass} p-[22px]`}>
          <h3 className="mb-[18px] font-poppins text-[15.5px] font-semibold text-dr-text">
            Traffic sources
          </h3>
          <div className="flex flex-col gap-3.5">
            {TRAFFIC.map((t) => (
              <div key={t.label} className="flex items-center gap-3.5">
                <span className="w-[120px] shrink-0 text-[13px] text-dr-text-2">
                  {t.label}
                </span>
                <div className="h-6 flex-1 overflow-hidden rounded-md bg-dr-bd-1">
                  <div
                    className="h-full rounded-md"
                    style={{ width: t.pct, background: t.color }}
                  />
                </div>
                <span className="w-11 text-right font-poppins text-[12.5px] font-semibold text-dr-text">
                  {t.pct}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${adminCardClass} p-[22px]`}>
          <h3 className="mb-[18px] font-poppins text-[15.5px] font-semibold text-dr-text">
            Top regions
          </h3>
          <div className="flex flex-col gap-[15px]">
            {REGIONS.map((r) => (
              <div key={r.label} className="flex items-center gap-3.5">
                <span className="flex-1 text-[13.5px] font-medium text-dr-text">
                  {r.label}
                </span>
                <div className="h-[7px] w-[110px] overflow-hidden rounded-full bg-dr-bd-1">
                  <div
                    className="h-full rounded-full bg-dr-red"
                    style={{ width: r.pct }}
                  />
                </div>
                <span className="w-14 text-right font-poppins text-[12.5px] font-semibold text-dr-red">
                  {r.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
