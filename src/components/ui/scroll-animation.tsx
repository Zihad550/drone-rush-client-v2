import { cn } from "@/lib/utils";

interface ScrollAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}

export default function ScrollAnimation({
  children,
  className,
  delay,
  ...props
}: ScrollAnimationProps) {
  return (
    <div
      className={cn(
        "animate-fade-in-up",
        delay && `animation-delay-${delay}`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
