"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import ICategory from "@/types/category.type";

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
      className="group h-full cursor-pointer overflow-hidden rounded-2xl border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 text-center">
        {name}
      </h3>
    </Card>
  );
};

export default CategoryCard;