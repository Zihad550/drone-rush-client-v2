"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface IBrandCard {
  _id: string;
  name: string;
  logo: string;
  description: string;
}

interface BrandCardProps {
  brand: IBrandCard;
}

const BrandCard = ({ brand }: BrandCardProps) => {
  const { name, logo, description, _id } = brand;
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/brand/${_id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      className="group relative h-full cursor-pointer overflow-hidden rounded-3xl border border-white/20 dark:border-red-500/30 shadow-xl shadow-blue-500/10 dark:shadow-red-500/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-red-500/20 hover:border-blue-400/50 dark:hover:border-red-400/50 hover:rotate-1 bg-white/90 dark:bg-black/30 backdrop-blur-md"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-purple-500/20 dark:from-red-500/20 dark:via-black/10 dark:to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
      {/* Brand Logo */}
      <div className="relative h-20 overflow-hidden bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-red-950/40 dark:to-black/40 flex items-center justify-center">
        <Image
          src={logo}
          alt={name}
          width={140}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Brand Info */}
      <CardContent className="relative flex flex-col p-3">
        <h3 className="mb-2 text-lg font-bold text-foreground dark:text-white drop-shadow-sm">
          {name}
        </h3>

        <p className="text-sm text-muted-foreground dark:text-gray-200 line-clamp-2 leading-relaxed mb-2">
          {description}
        </p>

        {/* Call to action */}
        <div className="mt-auto flex justify-end">
          <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-red-500 dark:to-black p-2 transition-all duration-500 hover:scale-110">
            <svg
              className="h-4 w-4 text-white drop-shadow-md"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-label="Explore Collection"
            >
              <title>Explore Collection</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </CardContent>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 dark:from-red-500/10 dark:via-black/5 dark:to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10" />
    </Card>
  );
};

export default BrandCard;
