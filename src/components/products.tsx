import type IDrone from "@/types/drone.type";
import Drone from "./drone";

const Products = ({ products }: { products: IDrone[] }) => (
  <div className="mt-10">
    <div className="grid grid-cols-12 gap-4 lg:gap-6">
      {products && products.length > 0 ? (
        products.map((product) => <Drone key={product?._id} drone={product} />)
      ) : (
        <div className="col-span-12 py-16 flex justify-center items-center">
          <p className="text-gray-500 text-lg opacity-70">No products found.</p>
        </div>
      )}
    </div>
  </div>
);

export default Products;
