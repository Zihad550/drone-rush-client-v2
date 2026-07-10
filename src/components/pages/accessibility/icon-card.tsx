import type { ReactNode } from "react";

interface IconCardProps {
  /** Inline SVG children (paths, circles) drawn on a 24×24 stroke canvas. */
  icon: ReactNode;
  title: string;
  description: string;
  footer?: ReactNode;
}

/**
 * v2 icon feature card: hexagon red-tinted icon tile, Poppins title, muted body.
 */
export default function IconCard({
  icon,
  title,
  description,
  footer,
}: IconCardProps) {
  return (
    <div className="flex h-full flex-col rounded-[13px] border border-dr-bd-1 bg-dr-surface p-[26px] transition-all duration-300 hover:-translate-y-1 hover:border-dr-red/40">
      <div
        className="mb-4 flex h-14 w-[52px] items-center justify-center border border-dr-red/30 bg-gradient-to-b from-dr-red/[0.16] to-transparent text-[#ef5568]"
        style={{
          clipPath: "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {icon}
        </svg>
      </div>
      <h3 className="mb-2 font-poppins text-base font-semibold text-dr-text">
        {title}
      </h3>
      <p className="text-[13px] leading-[1.55] text-dr-text-3">{description}</p>
      {footer && <div className="mt-auto pt-5">{footer}</div>}
    </div>
  );
}
