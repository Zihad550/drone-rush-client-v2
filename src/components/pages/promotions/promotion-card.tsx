"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PromotionCardProps {
  title: string;
  description: string;
  discount: string;
  image: string;
  cta: string;
}

export default function PromotionCard({
  title,
  description,
  discount,
  image,
  cta,
}: PromotionCardProps) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[13px] border border-dr-bd-1 bg-dr-surface transition-all duration-300 hover:-translate-y-1 hover:border-dr-red/40">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-dr-red px-3 py-1 font-dm-mono text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_6px_16px_rgba(239,43,69,0.4)]">
          {discount}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-[22px]">
        <h3 className="mb-2 font-poppins text-base font-semibold text-dr-text">
          {title}
        </h3>
        <p className="mb-5 text-[13px] leading-[1.55] text-dr-text-3">
          {description}
        </p>
        <Link
          href="/drones"
          className="mt-auto inline-flex items-center gap-2 font-poppins text-sm font-semibold text-dr-red transition-all duration-300 group-hover:gap-3"
        >
          {cta}
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  );
}
