import Image from "next/image";
import Link from "next/link";
import type IDrone from "@/types/drone.type";

const Product = ({ drone }: { drone: IDrone }) => {
  const { name, description, price, img, _id } = drone;

  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 flex">
      <Link href={`/drones/${_id}`} className="w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-transform hover:scale-105 cursor-pointer">
          <div className="relative w-full h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-4">
            <Image
              src={img}
              alt={name}
              width={200}
              height={200}
              className="max-w-full max-h-full object-contain transition-transform hover:scale-105"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.6rem] leading-tight">
              {name}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 min-h-[4rem] leading-relaxed">
              {description}
            </p>
            <div className="mt-auto flex justify-between items-center">
              <span className="text-xl font-bold text-primary">
                ${price.toFixed(2)}
              </span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Free Shipping
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
