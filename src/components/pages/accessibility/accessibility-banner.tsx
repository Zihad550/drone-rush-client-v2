"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

const tiles = [
  {
    label: "Keyboard Navigation",
    icon: (
      <>
        <path d="M2 12C2 10.8954 2.89543 10 4 10H20C21.1046 10 22 10.8954 22 12V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V12Z" />
        <circle cx="7" cy="15" r="1" fill="currentColor" stroke="none" />
        <circle cx="11" cy="15" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="15" r="1" fill="currentColor" stroke="none" />
        <circle cx="19" cy="15" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Screen Reader Support",
    icon: (
      <>
        <path d="M11 5 6 9H2v6h4l5 4V5Z" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
      </>
    ),
  },
  {
    label: "High Contrast",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Alt Text for Images",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="m6 15 3-3 3 3 3-4 3 4" />
        <circle cx="8.5" cy="9" r="1.2" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

const AccessibilityBanner = () => {
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
            WCAG 2.1 AA
          </span>

          <h1 className="mt-5 mb-4 font-chakra text-[40px] font-bold leading-[1.08] tracking-[-0.5px] text-dr-text md:text-[46px]">
            An inclusive
            <br />
            digital experience
            <span className="mt-3.5 block h-[3px] w-[120px] rounded-sm bg-gradient-to-r from-dr-red to-transparent" />
          </h1>

          <p className="mb-[30px] max-w-[460px] text-[15px] leading-[1.7] text-dr-text-2">
            At Drone Rush, we&rsquo;re committed to making our platform usable
            by everyone. Explore the features and standards that keep the flight
            deck open to all pilots.
          </p>

          <Link
            href="#features"
            className="dr-red-grad inline-flex items-center gap-2.5 rounded-[9px] px-[26px] py-3.5 font-poppins text-sm font-semibold text-white shadow-[0_10px_26px_rgba(239,43,69,0.35)]"
          >
            Learn more
            <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.5} />
          </Link>
        </div>

        {/* Right - feature tiles */}
        <div className="grid grid-cols-2 gap-[18px]">
          {tiles.map((tile) => (
            <div
              key={tile.label}
              className="flex flex-col items-center rounded-[13px] border border-dr-bd-1 bg-dr-surface p-6 text-center"
            >
              <div
                className="mb-3 flex h-14 w-[52px] items-center justify-center border border-dr-red/30 bg-gradient-to-b from-dr-red/[0.16] to-transparent text-[#ef5568]"
                style={{
                  clipPath:
                    "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {tile.icon}
                </svg>
              </div>
              <h3 className="font-poppins text-[13px] font-semibold text-dr-text">
                {tile.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccessibilityBanner;
