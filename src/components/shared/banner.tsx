"use client";

import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionContainer from "./SectionContainer";

const trustChips = [
  "Free same-day shipping",
  "Authorized dealer",
  "Full manufacturer warranty",
];

interface BannerProps {
  /** Featured product image (background removed) shown in the hero panel. */
  imageSrc?: string;
  imageAlt?: string;
}

const Banner = ({
  imageSrc = "/assets/hero-drone.jpg",
  imageAlt = "Professional camera drone in flight",
}: BannerProps) => {
  return (
    <section className="dr-ambient-glow relative overflow-hidden">
      {/* Offer / deal bar */}
      <div className="dr-red-grad flex items-center justify-center gap-2.5 px-5 py-2.5 text-white">
        <span className="rounded-[5px] bg-white/20 px-2 py-[3px] font-dm-mono text-[11px] font-bold uppercase tracking-[0.12em]">
          Deal
        </span>
        <span className="text-[13.5px] font-semibold">
          Fall Fleet Sale — up to 30% off pro-grade drones. Ends Sunday.
        </span>
      </div>

      <SectionContainer className="py-14 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
          {/* Left content */}
          <div className="text-center md:text-left">
            {/* Sale pill */}
            <span className="inline-flex items-center gap-2 rounded-full border border-dr-red/40 bg-dr-red/10 px-3.5 py-[7px] font-dm-mono text-[11px] font-bold uppercase tracking-[0.15em] text-dr-red">
              Fall Sale · Ends Sunday
            </span>

            {/* Headline */}
            <h1 className="mt-5 mb-2.5 font-poppins text-4xl font-bold leading-[1.05] tracking-[-0.5px] text-dr-text md:text-5xl lg:text-[52px]">
              Up to <span className="text-dr-red">30% off</span> pro-grade
              drones
            </h1>

            {/* Description */}
            <p className="mx-auto mb-7 max-w-[450px] text-[15px] leading-relaxed text-dr-text-2 md:mx-0">
              Authorized dealer pricing on DJI, Freefly, Autel and more — with
              free same-day shipping and full manufacturer warranty on every
              order.
            </p>

            {/* CTAs */}
            <div className="mb-7 flex flex-wrap justify-center gap-3.5 md:justify-start">
              <Link
                href="/drones"
                className="dr-red-grad inline-flex items-center gap-2.5 rounded-[10px] px-6 py-3.5 font-poppins text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(239,43,69,0.4)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
              >
                Shop the Sale
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/drones"
                className="inline-flex items-center rounded-[10px] border border-dr-bd-4 px-6 py-3.5 font-poppins text-[15px] font-semibold text-dr-text transition-colors duration-200 hover:border-dr-red hover:text-dr-red"
              >
                View Deals
              </Link>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
              {trustChips.map((chip) => (
                <div
                  key={chip}
                  className="flex items-center gap-2 text-[12.5px] text-dr-text-2"
                >
                  <Check className="h-4 w-4 text-[#17b978]" strokeWidth={2.5} />
                  {chip}
                </div>
              ))}
            </div>
          </div>

          {/* Right - product panel */}
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-dr-bd-1 bg-dr-surface">
            {/* Red glow behind the product */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(239,43,69,0.2),transparent_62%)]" />

            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="animate-float object-contain p-8"
              style={{ filter: "drop-shadow(0 14px 24px rgba(0,0,0,0.35))" }}
            />

            {/* -30% tag */}
            <span className="dr-red-grad absolute right-4 top-4 z-20 rounded-[10px] px-3.5 py-2 font-poppins text-sm font-bold text-white shadow-[0_8px_20px_rgba(239,43,69,0.4)]">
              -30%
            </span>

            {/* Mono caption */}
            <span className="absolute bottom-4 left-4 z-20 font-dm-mono text-xs text-dr-text-3">
              featured drone
            </span>

            {/* Decorative dashed ring */}
            <div className="animate-dr-glow pointer-events-none absolute right-8 top-8 z-20 h-[70px] w-[70px] rounded-full border border-dashed border-dr-red/50" />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default Banner;
