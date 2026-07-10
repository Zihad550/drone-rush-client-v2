import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * DroneRush signature section opener: a 24×2px throttle-red bar followed by a
 * tracked, uppercase DM Mono label. Sits above a Chakra Petch title.
 */
const Eyebrow = ({ children, align = "left", className }: EyebrowProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        align === "center" && "justify-center",
        className,
      )}
    >
      <span className="h-0.5 w-6 flex-none bg-dr-red" />
      <span className="font-dm-mono text-[11.5px] uppercase tracking-[0.22em] text-dr-text-3">
        {children}
      </span>
    </div>
  );
};

export default Eyebrow;
