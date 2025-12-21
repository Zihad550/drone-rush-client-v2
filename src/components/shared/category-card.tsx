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
      className="group relative h-full cursor-pointer overflow-hidden rounded-3xl border border-white/20 dark:border-red-500/30 shadow-xl shadow-blue-500/10 dark:shadow-red-500/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-cyan-500/20 dark:hover:shadow-red-500/20 hover:border-cyan-400/50 dark:hover:border-red-400/50 hover:scale-105 bg-white/90 dark:bg-black/30 backdrop-blur-md py-4"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 dark:from-red-500/20 dark:via-black/10 dark:to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

      <h3 className="relative text-xl font-bold text-foreground dark:text-white text-center drop-shadow-sm">
        {name}
      </h3>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-purple-500/0 dark:from-red-500/0 dark:via-black/0 dark:to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
    </Card>
  );
};

export default CategoryCard;
