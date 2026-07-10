"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import Products from "@/components/shared/products";
import Spinner from "@/components/spinner";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
const DEFAULT_SORT = "-quantity";
const SORT_OPTIONS = [
  { value: "-quantity", label: "Featured" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-createdAt", label: "Newest" },
  { value: "name", label: "Name: A–Z" },
];

interface DronesProps {
  categories: { _id: string; name: string }[];
  brands: { _id: string; name: string; logo: string; description: string }[];
  userId?: string;
  isLoggedIn?: boolean;
  products?: IDrone[];
  initialMeta?: {
    total: number;
    page: number;
    limit: number;
    total_page: number;
  };
  initialSearchTerm?: string;
}

function Drones({
  categories,
  brands,
  userId,
  isLoggedIn,
  products: initialProducts,
  initialMeta,
  initialSearchTerm,
}: DronesProps) {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm ?? "");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    initialSearchTerm ?? "",
  );
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState<IDrone[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [meta, setMeta] = useState<{
    total: number;
    page: number;
    limit: number;
    total_page: number;
  } | null>(initialMeta || null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Sync when the nav search navigates to /drones?searchTerm=… while already mounted
  useEffect(() => {
    setSearchTerm(initialSearchTerm ?? "");
  }, [initialSearchTerm]);

  useEffect(() => {
    if (
      initialProducts &&
      initialMeta &&
      category.length === 0 &&
      brand.length === 0 &&
      !debouncedSearchTerm &&
      !minPrice &&
      !maxPrice &&
      sort === DEFAULT_SORT &&
      page === 1
    ) {
      setProducts(initialProducts);
      setMeta(initialMeta);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      const params = {
        page,
        sort,
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
      setMeta(data.meta || null);
      setLoading(false);
      // Reset to page 1 if current page exceeds total pages
      if (data.meta && page > data.meta.total_page) {
        setPage(1);
      }
    };
    fetchProducts();
  }, [
    page,
    category,
    brand,
    debouncedSearchTerm,
    minPrice,
    maxPrice,
    sort,
    userId,
    initialProducts,
    initialMeta,
  ]);

  const hasFilters =
    category.length > 0 ||
    brand.length > 0 ||
    !!searchTerm ||
    !!minPrice ||
    !!maxPrice;

  const clearAll = () => {
    setCategory([]);
    setBrand([]);
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
  };

  const activeChips: { key: string; label: string; onRemove: () => void }[] = [
    ...category.map((id) => ({
      key: `cat-${id}`,
      label: categories.find((c) => c._id === id)?.name ?? "Category",
      onRemove: () => {
        setCategory(category.filter((c) => c !== id));
        setPage(1);
      },
    })),
    ...brand.map((id) => ({
      key: `brand-${id}`,
      label: brands.find((b) => b._id === id)?.name ?? "Brand",
      onRemove: () => {
        setBrand(brand.filter((b) => b !== id));
        setPage(1);
      },
    })),
    ...(searchTerm
      ? [
          {
            key: "search",
            label: `“${searchTerm}”`,
            onRemove: () => {
              setSearchTerm("");
              setPage(1);
            },
          },
        ]
      : []),
    ...(minPrice
      ? [
          {
            key: "min",
            label: `Min $${minPrice}`,
            onRemove: () => {
              setMinPrice("");
              setPage(1);
            },
          },
        ]
      : []),
    ...(maxPrice
      ? [
          {
            key: "max",
            label: `Max $${maxPrice}`,
            onRemove: () => {
              setMaxPrice("");
              setPage(1);
            },
          },
        ]
      : []),
  ];

  return (
    <>
      {/* Filters Section */}
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Top row: label + Sort by (mirrors the storefront catalog header) */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="font-chakra text-lg font-bold tracking-wide text-dr-text">
            Filters
          </span>
          <div className="flex items-center gap-2.5 rounded-xl border border-dr-bd-2 bg-dr-surface py-1.5 pl-4 pr-1.5">
            <span className="whitespace-nowrap font-dm-mono text-[11px] uppercase tracking-[0.18em] text-dr-text-2">
              Sort by
            </span>
            <Select
              value={sort}
              onValueChange={(v) => {
                setSort(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="h-9 w-[168px] border-dr-bd-3 bg-dr-field text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category chip rail */}
        {categories && categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => {
                setCategory([]);
                setPage(1);
              }}
              className={`rounded-full px-4 py-2 font-poppins text-[13px] font-medium leading-none whitespace-nowrap transition-all duration-200 ${
                category.length === 0
                  ? "dr-red-grad border border-transparent text-white shadow-[0_6px_18px_rgba(239,43,69,0.28)]"
                  : "border border-dr-bd-3 bg-dr-surface text-dr-text-2 hover:border-dr-red/45"
              }`}
            >
              All categories
            </button>
            {categories.map((cat) => {
              const active = category.includes(cat._id);
              return (
                <button
                  key={cat._id}
                  type="button"
                  onClick={() => {
                    setCategory(
                      active
                        ? category.filter((id) => id !== cat._id)
                        : [...category, cat._id],
                    );
                    setPage(1);
                  }}
                  className={`rounded-full px-4 py-2 font-poppins text-[13px] font-medium leading-none whitespace-nowrap transition-all duration-200 ${
                    active
                      ? "dr-red-grad border border-transparent text-white shadow-[0_6px_18px_rgba(239,43,69,0.28)]"
                      : "border border-dr-bd-3 bg-dr-surface text-dr-text-2 hover:border-dr-red/45"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Search · price · brand grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.9fr_0.8fr_0.8fr_1.1fr]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dr-text-3" />
            <Input
              type="text"
              placeholder="Search drones, brands, categories..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10"
            />
          </div>

          <Input
            type="number"
            placeholder="Min $"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setPage(1);
            }}
            className="w-full"
          />

          <Input
            type="number"
            placeholder="Max $"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setPage(1);
            }}
            className="w-full"
          />

          {brands && (
            <Select
              value={brand[0] ?? "all"}
              onValueChange={(v) => {
                setBrand(v === "all" ? [] : [v]);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All brands</SelectItem>
                {brands.map((b) => (
                  <SelectItem key={b._id} value={b._id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      <ScrollAnimation className="delay-100">
        <div>
          {/* Results count bar — mirrors the storefront catalog */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-dr-bd-1 pb-4">
            <span className="text-[13px] text-dr-text-2">
              <span className="font-semibold text-dr-text">
                {meta?.total ?? products.length}
              </span>{" "}
              {(meta?.total ?? products.length) === 1 ? "drone" : "drones"}
            </span>
            {hasFilters && (
              <div className="flex flex-wrap items-center gap-2">
                {activeChips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={chip.onRemove}
                    className="inline-flex items-center gap-1.5 rounded-full border border-dr-red/30 bg-dr-red/10 py-1.5 pl-3 pr-2 text-[12.5px] text-dr-text transition-colors hover:border-dr-red/50"
                  >
                    {chip.label}
                    <X className="h-3 w-3 text-dr-red" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearAll}
                  className="cursor-pointer px-1 py-1.5 text-[12.5px] text-dr-text-3 underline underline-offset-[3px] hover:text-dr-text"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
          {loading ? (
            <Spinner />
          ) : products.length > 0 ? (
            <Products products={products} isLoggedIn={isLoggedIn} />
          ) : (
            <div className="rounded-[18px] border border-dr-bd-2 bg-dr-surface/60 py-16 text-center">
              <p className="text-lg text-dr-text-2">
                No drones found for the applied filters.
              </p>
            </div>
          )}
        </div>
      </ScrollAnimation>
      <ScrollAnimation className="delay-200">
        <div className="flex justify-center my-10">
          {meta && meta.total_page > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={
                      page === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {(() => {
                  const items = [];
                  const totalPages = meta.total_page;
                  const current = page;

                  if (totalPages <= 7) {
                    // Show all pages
                    for (let i = 1; i <= totalPages; i++) {
                      items.push(
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => setPage(i)}
                            isActive={i === current}
                            className="cursor-pointer"
                          >
                            {i}
                          </PaginationLink>
                        </PaginationItem>,
                      );
                    }
                  } else {
                    // Show first, ellipsis, middle, ellipsis, last
                    items.push(
                      <PaginationItem key={1}>
                        <PaginationLink
                          onClick={() => setPage(1)}
                          isActive={1 === current}
                          className="cursor-pointer"
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>,
                    );

                    if (current > 4) {
                      items.push(
                        <PaginationItem key="start-ellipsis">
                          <PaginationEllipsis />
                        </PaginationItem>,
                      );
                    }

                    const start = Math.max(2, current - 1);
                    const end = Math.min(totalPages - 1, current + 1);

                    for (let i = start; i <= end; i++) {
                      items.push(
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => setPage(i)}
                            isActive={i === current}
                            className="cursor-pointer"
                          >
                            {i}
                          </PaginationLink>
                        </PaginationItem>,
                      );
                    }

                    if (current < totalPages - 3) {
                      items.push(
                        <PaginationItem key="end-ellipsis">
                          <PaginationEllipsis />
                        </PaginationItem>,
                      );
                    }

                    items.push(
                      <PaginationItem key={totalPages}>
                        <PaginationLink
                          onClick={() => setPage(totalPages)}
                          isActive={totalPages === current}
                          className="cursor-pointer"
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>,
                    );
                  }

                  return items;
                })()}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setPage((p) => Math.min(meta.total_page, p + 1))
                    }
                    className={
                      page === meta.total_page
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </ScrollAnimation>
    </>
  );
}

export default Drones;
