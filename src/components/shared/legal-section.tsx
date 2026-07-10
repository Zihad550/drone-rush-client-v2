import type { ReactNode } from "react";

interface LegalSectionProps {
  index: number;
  title: string;
  children: ReactNode;
}

/**
 * Legal content card — v2 surface with a numbered mono tag and red tick.
 * Body inherits list styling: red markers, comfortable line height.
 */
export default function LegalSection({
  index,
  title,
  children,
}: LegalSectionProps) {
  return (
    <div className="rounded-[14px] border border-dr-bd-1 bg-dr-surface p-[26px] md:p-[30px]">
      <div className="mb-4 flex items-center gap-3">
        <span className="font-dm-mono text-[11px] font-bold tracking-[0.14em] text-dr-red">
          {String(index).padStart(2, "0")}
        </span>
        <span className="h-4 w-[3px] rounded-sm bg-dr-red" />
        <h2 className="font-poppins text-lg font-semibold text-dr-text">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-[14.5px] leading-[1.7] text-dr-text-2 [&_a]:text-dr-red [&_a:hover]:underline [&_h4]:font-poppins [&_h4]:font-semibold [&_h4]:text-dr-text [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:marker:text-dr-red">
        {children}
      </div>
    </div>
  );
}
