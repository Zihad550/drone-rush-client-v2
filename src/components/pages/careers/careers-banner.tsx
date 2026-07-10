"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "30+", label: "Team pilots" },
  { value: "12", label: "Open roles" },
  { value: "100%", label: "Remote-friendly" },
];

export default function CareersBanner() {
  return (
    <section
      className="relative overflow-hidden py-[70px]"
      style={{
        background:
          "radial-gradient(circle at 75% 30%,rgba(239,43,69,.14),transparent 55%),var(--dr-bg,transparent)",
      }}
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 px-10 md:grid-cols-[1.05fr_1fr]">
        {/* Left content */}
        <div>
          <span className="inline-flex items-center gap-[7px] rounded-full border border-dr-red/25 bg-dr-red/[0.14] px-[13px] py-1.5 font-dm-mono text-[11px] font-bold uppercase tracking-[1.5px] text-dr-red">
            <span className="h-1.5 w-1.5 rounded-full bg-dr-red shadow-[0_0_8px_#ef2b45]" />
            We&rsquo;re hiring
          </span>

          <h1 className="mt-5 mb-4 font-chakra text-[40px] font-bold leading-[1.08] tracking-[-0.5px] text-dr-text md:text-[46px]">
            Join Drone Rush,
            <br />
            shape the flight path
            <span className="mt-3.5 block h-[3px] w-[120px] rounded-sm bg-gradient-to-r from-dr-red to-transparent" />
          </h1>

          <p className="mb-[30px] max-w-[460px] text-[15px] leading-[1.7] text-dr-text-2">
            Be part of a dynamic team innovating in drone technology.
            We&rsquo;re looking for passionate people ready to push boundaries
            and make an impact, mission after mission.
          </p>

          {/* Inline stats */}
          <div className="mb-8 flex">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={
                  i === 0
                    ? "pr-[26px]"
                    : "border-l border-dr-bd-2 px-[26px] last:pr-0"
                }
              >
                <div className="font-chakra text-[26px] font-bold text-dr-text">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-xs text-dr-text-3">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="#open-positions"
              className="dr-red-grad inline-flex items-center gap-2.5 rounded-[9px] px-[26px] py-3.5 font-poppins text-sm font-semibold text-white shadow-[0_10px_26px_rgba(239,43,69,0.35)]"
            >
              View open positions
              <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.5} />
            </Link>
            <span className="max-w-[200px] text-[12.5px] leading-[1.5] text-dr-text-3">
              Grow your career in a fast-evolving industry
            </span>
          </div>
        </div>

        {/* Right - image panel */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] border border-dr-red/20">
          <Image
            src="/assets/about-us-bg.png"
            alt="Drone Rush team at work"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
          />

          <div className="animate-dr-glow pointer-events-none absolute right-[34px] top-6 h-[70px] w-[70px] rounded-full border border-dashed border-dr-red/50" />

          <div className="pointer-events-none absolute bottom-[18px] left-[18px] flex items-center gap-2 rounded-full border border-dr-bd-2 bg-dr-nav px-3.5 py-[7px] backdrop-blur-[6px]">
            <span className="h-[7px] w-[7px] rounded-full bg-dr-red" />
            <span className="font-poppins text-xs font-semibold text-dr-text">
              Building the future of flight
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
