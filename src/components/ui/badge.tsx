import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-[11px] py-[5px] font-poppins text-[12.5px] font-semibold leading-none w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-[7px] [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        // DroneRush v2 design tones (design-files/components/badge)
        sale: "border-transparent bg-[rgba(239,43,69,0.14)] text-[#ef5568]",
        new: "border-transparent bg-[rgba(47,107,255,0.14)] text-[#6f97ff]",
        success: "border-transparent bg-[rgba(23,185,120,0.14)] text-[#3fd39a]",
        warning: "border-transparent bg-[rgba(245,166,35,0.14)] text-[#f5a623]",
        neutral:
          "border-transparent bg-[rgba(139,131,145,0.16)] text-[#8b8391]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
