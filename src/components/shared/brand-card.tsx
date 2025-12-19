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
      className="group relative h-full cursor-pointer overflow-hidden rounded-3xl border border-white/20 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/25 bg-white/90 dark:bg-gray-900/90"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Brand Logo */}
      <div className="relative h-20 overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
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
        <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
          {name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed mb-2">
          {description}
        </p>

        {/* Call to action */}
        <div className="mt-auto flex justify-end">
          <div className="rounded-full bg-blue-500 p-2 transition-all duration-300">
            <svg
              className="h-4 w-4 text-white"
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
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
    </Card>
  );
};

export default BrandCard;
