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
      className="group h-full cursor-pointer overflow-hidden rounded-2xl border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Brand Logo */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 flex items-center justify-center">
        <Image
          src={logo}
          alt={name}
          width={120}
          height={120}
          className="object-contain transition-transform duration-500 group-hover:scale-110 filter drop-shadow-lg"
        />
        {/* Subtle overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Brand Info */}
      <CardContent className="flex flex-col p-6">
        <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Call to action hint */}
        <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Explore Drones</span>
          <svg
            className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandCard;
