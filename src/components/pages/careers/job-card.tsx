import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  title: string;
  description: string;
  location: string;
  type: string;
}

export default function JobCard({
  title,
  description,
  location,
  type,
}: JobCardProps) {
  return (
    <div className="group flex h-full flex-col rounded-[13px] border border-dr-bd-1 bg-dr-surface p-[26px] transition-all duration-300 hover:-translate-y-1 hover:border-dr-red/40">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="font-poppins text-lg font-semibold text-dr-text">
          {title}
        </h3>
        <span className="flex-none rounded-full border border-dr-red/25 bg-dr-red/[0.12] px-2.5 py-1 font-dm-mono text-[10px] font-bold uppercase tracking-[0.12em] text-dr-red">
          {type}
        </span>
      </div>

      <p className="mb-4 text-[13px] leading-[1.55] text-dr-text-3">
        {description}
      </p>

      <div className="mb-5 flex items-center gap-1.5 text-[13px] text-dr-text-2">
        <MapPin className="h-4 w-4 text-dr-red" strokeWidth={2} />
        {location}
      </div>

      <Link
        href="/contact-us"
        className="mt-auto inline-flex items-center gap-2 font-poppins text-sm font-semibold text-dr-red transition-all duration-300 group-hover:gap-3"
      >
        Apply now
        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
      </Link>
    </div>
  );
}
