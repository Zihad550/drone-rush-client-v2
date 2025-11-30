import type { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  align?: "left" | "center" | "right";
  className?: string;
}

const Title = ({
  children,
  variant = "h3",
  align = "center",
  className = "",
}: TitleProps) => {
  const baseClasses =
    "font-bold text-primary mb-2 text-2xl md:text-4xl tracking-wide";
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";
  const variantClass =
    variant === "h1"
      ? "text-5xl"
      : variant === "h2"
        ? "text-4xl"
        : variant === "h3"
          ? "text-3xl"
          : "text-xl";

  return (
    <h1 className={`${baseClasses} ${alignClass} ${variantClass} ${className}`}>
      {children}
    </h1>
  );
};

export default Title;
