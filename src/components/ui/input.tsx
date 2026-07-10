import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-[14px] border border-dr-bd-3 bg-dr-field px-[15px] py-[13px] font-sans text-[15px] text-dr-text transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-dr-text placeholder:text-dr-text-3 focus-visible:border-dr-red focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
