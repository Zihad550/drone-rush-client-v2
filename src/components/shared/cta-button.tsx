"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CtaButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  showArrow?: boolean;
  className?: string;
}

function CtaButton({
  children,
  href,
  onClick,
  showArrow = false,
  className,
}: CtaButtonProps) {
  const buttonClasses =
    "bg-gradient-to-r from-blue-500 to-black/80 dark:from-black dark:to-red-500 shadow-[0_4px_14px_rgba(var(--primary),0.4)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.4)] hover:scale-105 hover:shadow-[0_6px_18px_rgba(var(--primary),0.6)] dark:hover:shadow-[0_6px_18px_rgba(0,0,0,0.6)] transition-all duration-300 px-6 py-3 text-base font-medium";

  const content = (
    <>
      {children}
      {showArrow && <ArrowRight className="ml-2 h-5 w-5" />}
    </>
  );

  if (href) {
    return (
      <Link href={href}>
        <Button className={`${buttonClasses} ${className || ""}`} type="button">
          {content}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      className={`${buttonClasses} ${className || ""}`}
      type="button"
      onClick={onClick}
    >
      {content}
    </Button>
  );
}

export default CtaButton;
