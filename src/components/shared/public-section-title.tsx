import type { ReactNode } from "react";

interface PublicSectionTitleProps {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  align?: "left" | "center" | "right";
  className?: string;
}

const PublicSectionTitle = ({
  children,
  variant = "h2",
  align = "left",
  className = "",
}: PublicSectionTitleProps) => {
  const baseClasses =
    "font-bold text-gray-900 dark:text-white mb-8 text-4xl md:text-5xl tracking-wide relative inline-block";
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";
  const combinedClass = `${baseClasses} ${alignClass} ${className}`;

  const underline = (
    <span className="absolute bottom-[-8px] left-[25%] md:left-0 w-[50%] md:w-[40%] h-1 bg-gradient-to-r from-primary to-blue-500 rounded"></span>
  );

  switch (variant) {
    case "h1":
      return (
        <h1 className={combinedClass}>
          {children}
          {underline}
        </h1>
      );
    case "h2":
      return (
        <h2 className={combinedClass}>
          {children}
          {underline}
        </h2>
      );
    case "h3":
      return (
        <h3 className={combinedClass}>
          {children}
          {underline}
        </h3>
      );
    case "h4":
      return (
        <h4 className={combinedClass}>
          {children}
          {underline}
        </h4>
      );
    case "h5":
      return (
        <h5 className={combinedClass}>
          {children}
          {underline}
        </h5>
      );
    case "h6":
      return (
        <h6 className={combinedClass}>
          {children}
          {underline}
        </h6>
      );
    default:
      return (
        <h2 className={combinedClass}>
          {children}
          {underline}
        </h2>
      );
  }
};

export default PublicSectionTitle;
