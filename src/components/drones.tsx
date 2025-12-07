"use client";

import { Filter, X } from "lucide-react";
import { useEffect, useState } from "react";
import Products from "@/components/products";
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
import { getProducts } from "@/services/product/product.service";
import type IProduct from "@/types/product.type";

const PRODUCTS_PER_PAGE = 8;

interface DronesProps {
  categories: { _id: string; name: string }[];
  brands: { _id: string; name: string; logo: string; description: string }[];
}

function Drones({ categories, brands }: DronesProps) {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const params = {
        page,
        sort: "-quantity",
        limit: PRODUCTS_PER_PAGE,
        ...(category && { category }),
        ...(brand && { brand }),
      };
      const data = await getProducts(params);
      setProducts(data.data);
      setLoading(false);
    };
    fetchProducts();
  }, [page, category, brand]);

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
          {loading ? <Spinner /> : <Products products={products} />}
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
