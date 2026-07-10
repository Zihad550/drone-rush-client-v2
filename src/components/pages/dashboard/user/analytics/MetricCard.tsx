import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
}

export default function MetricCard({
  title,
  value,
  description,
  icon: Icon,
}: MetricCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[16px] border border-dr-bd-1 bg-dr-surface p-5 transition-colors hover:border-dr-red/30">
      <div className="flex items-start justify-between">
        <p className="font-dm-mono text-[10px] font-bold uppercase tracking-[0.18em] text-dr-text-3">
          {title}
        </p>
        {Icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-dr-red/25 bg-dr-red/[0.12] text-dr-red">
            <Icon className="h-[15px] w-[15px]" strokeWidth={2} />
          </span>
        )}
      </div>
      <div className="mt-3 font-chakra text-[30px] font-bold leading-none tracking-[-0.5px] text-dr-text">
        {value}
      </div>
      {description && (
        <p className="mt-1.5 text-xs text-dr-text-3">{description}</p>
      )}
    </div>
  );
}
