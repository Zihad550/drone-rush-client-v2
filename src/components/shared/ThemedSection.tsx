import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ThemedSectionProps {
  children: ReactNode;
  className?: string;
  bg?: "gradient" | "transparent" | "card";
}

const ThemedSection = ({
  children,
  className,
  bg = "card",
}: ThemedSectionProps) => {
  const bgClass = {
    gradient: "bg-background",
    transparent: "bg-transparent",
    card: "bg-card",
  }[bg];

  return <section className={cn(bgClass, className)}>{children}</section>;
};

export default ThemedSection;
