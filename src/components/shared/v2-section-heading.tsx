import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Eyebrow from "./eyebrow";

interface V2SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  /** Width of the throttle-red underline bar in px. */
  barWidth?: number;
  className?: string;
}

/**
 * DroneRush v2 section opener: mono eyebrow + Chakra Petch title with a
 * throttle-red gradient underline bar, plus an optional lead paragraph.
 */
export default function V2SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  barWidth = 150,
  className,
}: V2SectionHeadingProps) {
  const barStyle: CSSProperties = { width: barWidth };

  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <Eyebrow align={align} className="mb-3.5">
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className="inline-block font-chakra text-[30px] font-bold leading-[1.12] tracking-[-0.4px] text-dr-text md:text-[32px]">
        {title}
        <span
          className={cn(
            "mt-2 block h-[3px] rounded-sm bg-gradient-to-r from-dr-red to-transparent",
            align === "center" && "mx-auto",
          )}
          style={barStyle}
        />
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3.5 max-w-[620px] text-[15px] leading-[1.7] text-dr-text-2",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
