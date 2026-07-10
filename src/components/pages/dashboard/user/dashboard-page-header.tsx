interface DashboardPageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function DashboardPageHeader({
  eyebrow,
  title,
  description,
  action,
}: DashboardPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className="inline-flex items-center gap-2 font-dm-mono text-[11px] font-bold uppercase tracking-[0.22em] text-dr-red">
          <span className="h-[2px] w-6 rounded-sm bg-dr-red" />
          {eyebrow}
        </span>
        <h1 className="mt-3 font-chakra text-[28px] font-bold leading-[1.1] tracking-[-0.5px] text-dr-text md:text-[34px]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-dr-text-2">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
