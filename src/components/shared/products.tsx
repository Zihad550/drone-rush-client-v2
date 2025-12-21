import type IDrone from "@/types/drone.type";
import DroneCard from "./drone-card";
import PublicSectionTitle from "./public-section-title";

interface ProductsProps {
  products: IDrone[];
  isLoggedIn?: boolean;
}

const Products = ({ products, isLoggedIn }: ProductsProps) => {
  return (
    <div className="mt-10">
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <DroneCard
              key={product?._id}
              product={product}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[200px] items-center justify-center py-8">
          <p className="text-lg text-muted-foreground dark:text-gray-300">
            No products found.
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
