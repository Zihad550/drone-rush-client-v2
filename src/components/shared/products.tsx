import type IProduct from "@/types/product.type";
import ProductCard from "./product-card";

interface ProductsProps {
  products: IProduct[];
}

const Products = ({ products }: ProductsProps) => {
  return (
    <div className="mt-10">
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[200px] items-center justify-center py-8">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No products found.
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
