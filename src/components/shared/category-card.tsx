"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import type ICategory from "@/types/category.type";

interface CategoryCardProps {
  category: ICategory;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { name, _id } = category;
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/category/${_id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/25 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <h3 className="relative text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-center">
        {name}
      </h3>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
    </Card>
  );
};

export default CategoryCard;
