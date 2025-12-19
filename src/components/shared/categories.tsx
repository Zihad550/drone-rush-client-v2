import type ICategory from "@/types/category.type";
import CategoryCard from "./category-card";
import PublicSectionTitle from "./public-section-title";

interface CategoriesProps {
  categories: ICategory[];
}

const Categories = ({ categories }: CategoriesProps) => {
  return (
    <div className="mt-16">
      <PublicSectionTitle>Categories</PublicSectionTitle>
      {categories && categories.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[200px] items-center justify-center py-8">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No categories found.
          </p>
        </div>
      )}
    </div>
  );
};

export default Categories;
