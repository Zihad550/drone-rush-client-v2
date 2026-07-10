import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <Link
        href="/"
        className="group flex items-center gap-2.5"
        aria-label="DroneRush home"
      >
        <svg
          width="34"
          height="34"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-y-0.5"
        >
          <defs>
            <linearGradient
              id="drMark"
              x1="14"
              y1="10"
              x2="50"
              y2="54"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#ff6377" />
              <stop offset=".55" stopColor="#ef2b45" />
              <stop offset="1" stopColor="#ef2b45" />
            </linearGradient>
          </defs>
          <path
            d="M32 8 L54 30 L45.5 30 L32 16.5 L18.5 30 L10 30 Z"
            fill="url(#drMark)"
          />
          <path
            d="M32 26 L54 48 L45.5 48 L32 34.5 L18.5 48 L10 48 Z"
            fill="url(#drMark)"
            opacity=".45"
          />
        </svg>
        <span className="font-poppins font-bold text-[21px] tracking-[-0.4px] text-dr-text">
          Drone
          <span className="bg-gradient-to-r from-dr-red-soft to-[#ef2b45] bg-clip-text text-transparent">
            Rush
          </span>
        </span>
      </Link>
    </div>
  );
};

export default Logo;
