"use client";

import { Filter, Search, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Products from "@/components/shared/products";
import Spinner from "@/components/spinner";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ScrollAnimation from "@/components/ui/scroll-animation";
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
  const [category, setCategory] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState<IDrone[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (initialProducts && category.length === 0 && brand.length === 0 && !debouncedSearchTerm && !minPrice && !maxPrice) {
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
        ...(category.length > 0 && { category }),
        ...(brand.length > 0 && { brand }),
        ...(debouncedSearchTerm && { searchTerm: debouncedSearchTerm }),
        ...(minPrice && { minPrice: Number(minPrice) }),
        ...(maxPrice && { maxPrice: Number(maxPrice) }),
        ...(userId && { userId }),
      };
      const data = await getDrones(params);
      setProducts(data.data);
      setLoading(false);
    };
    fetchProducts();
  }, [page, category, brand, debouncedSearchTerm, minPrice, maxPrice, userId, initialProducts]);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 items-end">
            <div className="relative xl:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search drones, brands, categories..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="pl-10 w-full"
              />
            </div>

            <Input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setPage(1);
              }}
              className="w-full"
            />

            <Input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setPage(1);
              }}
              className="w-full"
            />

            {categories && (
              <div className="space-y-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {category.length > 0 ? `${category.length} selected` : "Select Categories"}
                    </Button>
                  </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <Input
                      placeholder="Search categories..."
                      value={categorySearch}
                      onChange={(e) => setCategorySearch(e.target.value)}
                    />
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {categories
                        .filter((cat) =>
                          cat.name.toLowerCase().includes(categorySearch.toLowerCase())
                        )
                        .map((cat) => (
                          <div key={cat._id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`cat-${cat._id}`}
                              checked={category.includes(cat._id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setCategory([...category, cat._id]);
                                } else {
                                  setCategory(category.filter((id) => id !== cat._id));
                                }
                                setPage(1);
                              }}
                            />
                            <label htmlFor={`cat-${cat._id}`} className="text-sm">
                              {cat.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

              </div>
            )}

            {brands && (
              <div className="space-y-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {brand.length > 0 ? `${brand.length} selected` : "Select Brands"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <Input
                        placeholder="Search brands..."
                        value={brandSearch}
                        onChange={(e) => setBrandSearch(e.target.value)}
                      />
                      <div className="max-h-40 overflow-y-auto space-y-2">
                        {brands
                          .filter((b) =>
                            b.name.toLowerCase().includes(brandSearch.toLowerCase())
                          )
                          .map((b) => (
                          <div key={b._id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`brand-${b._id}`}
                              checked={brand.includes(b._id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setBrand([...brand, b._id]);
                                } else {
                                  setBrand(brand.filter((id) => id !== b._id));
                                }
                                setPage(1);
                              }}
                            />
                            <label htmlFor={`brand-${b._id}`} className="text-sm">
                              {b.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

              </div>
            )}

             {(category.length > 0 || brand.length > 0 || searchTerm || minPrice || maxPrice) && (
               <Button
                 variant="outline"
                  onClick={() => {
                    setCategory([]);
                    setBrand([]);
                    setCategorySearch("");
                    setBrandSearch("");
                    setSearchTerm("");
                    setMinPrice("");
                    setMaxPrice("");
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
          ) : products.length > 0 ? (
            <Products products={products} isLoggedIn={isLoggedIn} />
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No drones found for the applied filters.
              </p>
            </div>
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
