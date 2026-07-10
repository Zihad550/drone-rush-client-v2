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
    "dr-red-grad text-white font-poppins shadow-[0_8px_26px_rgba(239,43,69,0.32)] hover:scale-105 hover:shadow-[0_12px_30px_rgba(239,43,69,0.45)] transition-all duration-300 px-6 py-3 text-base font-semibold";

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
