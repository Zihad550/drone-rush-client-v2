import BrandCard from "./brand-card";

interface IBrandCard {
  _id: string;
  name: string;
  logo: string;
  description: string;
}

interface BrandsProps {
  brands: IBrandCard[];
}

const Brands = ({ brands }: BrandsProps) => {
  return (
    <div className="mt-16">
      {brands && brands.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {brands.map((brand) => (
            <BrandCard
              key={brand._id}
              brand={brand}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[200px] items-center justify-center py-8">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No brands found.
          </p>
        </div>
      )}
    </div>
  );
};

export default Brands;