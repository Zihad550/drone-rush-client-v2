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
  const combinedClass = `${baseClasses} ${alignClass} ${variantClass} ${className}`;

  switch (variant) {
    case "h1":
      return <h1 className={combinedClass}>{children}</h1>;
    case "h2":
      return <h2 className={combinedClass}>{children}</h2>;
    case "h3":
      return <h3 className={combinedClass}>{children}</h3>;
    case "h4":
      return <h4 className={combinedClass}>{children}</h4>;
    case "h5":
      return <h5 className={combinedClass}>{children}</h5>;
    case "h6":
      return <h6 className={combinedClass}>{children}</h6>;
    default:
      return <h3 className={combinedClass}>{children}</h3>;
  }
};

export default Title;
