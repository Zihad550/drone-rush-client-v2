"use client";

import { Filter, X } from "lucide-react";
import { useEffect, useState } from "react";
import Products from "@/components/shared/products";
import Spinner from "@/components/spinner";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import ScrollAnimation from "@/components/ui/scroll-animation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDrones } from "@/services/drone/drone.service";
import type IDrone from "@/types/drone.type";

const PRODUCTS_PER_PAGE = 8;

interface DronesProps {
  categories: { _id: string; name: string }[];
  brands: { _id: string; name: string; logo: string; description: string }[];
  userId?: string;
  isLoggedIn?: boolean;
  products?: IDrone[];
}

function Drones({
  categories,
  brands,
  userId,
  isLoggedIn,
  products: initialProducts,
}: DronesProps) {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [products, setProducts] = useState<IDrone[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);

  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      const params = {
        page,
        sort: "-quantity",
        limit: PRODUCTS_PER_PAGE,
        ...(category && { category }),
        ...(brand && { brand }),
        ...(userId && { userId }),
      };
      const data = await getDrones(params);
      setProducts(data.data);
      setLoading(false);
    };
    fetchProducts();
  }, [page, category, brand, userId, initialProducts]);

  return (
    <>
      {/* Filters Section */}
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="sticky top-4 z-10 p-3 md:p-4 rounded-2xl mb-4 bg-white/75 backdrop-blur-md shadow-lg border border-gray-100">
          <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
            <div className="flex items-center gap-2 mr-4">
              <Filter className="text-primary w-7 h-7" />
              <span className="text-xl font-bold text-primary">Filters</span>
            </div>
          </div>
          {/* filters */}
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            {categories && (
              <Select
                value={category || "all"}
                onValueChange={(value) => {
                  setCategory(value === "all" ? "" : value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="min-w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {brands && (
              <Select
                value={brand || "all"}
                onValueChange={(value) => {
                  setBrand(value === "all" ? "" : value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="min-w-48">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {brands.map((b) => (
                    <SelectItem key={b._id} value={b._id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {(category || brand) && (
              <Button
                variant="outline"
                onClick={() => {
                  setCategory("");
                  setBrand("");
                  setPage(1);
                }}
                className="ml-4"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>
      <ScrollAnimation className="delay-100">
        <div>
          <Title>All Available Drones</Title>
          {loading ? (
            <Spinner />
          ) : (
            <Products products={products} isLoggedIn={isLoggedIn} />
          )}
        </div>
      </ScrollAnimation>
      <ScrollAnimation className="delay-200">
        <div className="flex justify-center my-10">
          {/* Pagination component - need to implement */}
          <div>Pagination placeholder</div>
        </div>
      </ScrollAnimation>
    </>
  );
}

export default Drones;
