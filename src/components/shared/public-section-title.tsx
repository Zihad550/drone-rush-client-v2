import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Eyebrow from "./eyebrow";

interface PublicSectionTitleProps {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  align?: "left" | "center" | "right";
  eyebrow?: string;
  className?: string;
}

const PublicSectionTitle = ({
  children,
  variant = "h2",
  align = "left",
  eyebrow,
  className = "",
}: PublicSectionTitleProps) => {
  const Tag = variant;
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";

  return (
    <div className={cn("mb-10", alignClass)}>
      {eyebrow && (
        <Eyebrow
          align={align === "center" ? "center" : "left"}
          className="mb-3"
        >
          {eyebrow}
        </Eyebrow>
      )}
      <Tag
        className={cn(
          "font-chakra font-bold tracking-[0.02em] text-3xl md:text-4xl text-dr-text",
          className,
        )}
      >
        {children}
      </Tag>
      {/* Signature red-gradient underline bar */}
      <span
        className={cn(
          "mt-2.5 block h-[3px] w-24 rounded-sm bg-gradient-to-r from-dr-red to-transparent",
          align === "center" && "mx-auto",
          align === "right" && "ml-auto",
        )}
      />
    </div>
  );
};

export default PublicSectionTitle;
