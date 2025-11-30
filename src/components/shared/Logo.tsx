import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <Link href="/" className="flex items-center text-decoration-none group">
        <div className="drone-icon w-9 h-9 mr-2 relative transition-transform duration-300 group-hover:-translate-y-1 rounded-full">
          <div className="absolute w-full h-full bg-blue-500 rounded-full opacity-20 animate-pulse rounded-full" />
          <div className="absolute w-[60%] h-[60%] top-[20%] left-[20%] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] rounded-full" />
        </div>
        <span className="font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent tracking-wide text-2xl hidden md:inline-block">
          DroneRush
        </span>
        <span className="font-extrabold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent tracking-wide text-2xl inline-block md:hidden">
          DR
        </span>
      </Link>
    </div>
  );
};

export default Logo;
