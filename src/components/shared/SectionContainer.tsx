import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: ReactNode;
  maxWidth?: "none" | "2xl" | "7xl" | "[1400px]";
  paddingX?: boolean;
  className?: string;
}

const SectionContainer = ({
  children,
  maxWidth = "7xl",
  paddingX = true,
  className,
}: SectionContainerProps) => {
  const maxWidthClass = maxWidth === "none" ? "" : `max-w-${maxWidth}`;

  return (
    <div
      className={cn(
        "container mx-auto",
        paddingX && "px-4",
        maxWidthClass,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default SectionContainer;
