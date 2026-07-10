"use client";

import {
  Boxes,
  Edit,
  Loader2,
  PackageX,
  Plane,
  Plus,
  Search,
  Trash2,
  TriangleAlert,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { handleDroneAction } from "@/app/actions/drone.actions";
import {
  adminCardClass,
  adminPrimaryBtnClass,
  DroneThumb,
  STATUS_STYLES,
  StatusPill,
} from "@/components/shared/admin/admin-ui";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getBrands } from "@/services/brand/brand.service";
import { getCategories } from "@/services/category/category.service";
import {
  deleteDrone,
  getDroneById,
  getDrones,
} from "@/services/drone/drone.service";
import type IBrand from "@/types/brand.type";
import type ICategory from "@/types/category.type";
import type IDrone from "@/types/drone.type";

const DRONES_PER_PAGE = 10;
const LOW_STOCK_THRESHOLD = 20;

function stockMeta(quantity: number) {
  if (quantity === 0)
    return { label: "Out of stock", style: STATUS_STYLES.red };
  if (quantity <= LOW_STOCK_THRESHOLD)
    return { label: "Low stock", style: STATUS_STYLES.amber };
  return { label: "In stock", style: STATUS_STYLES.green };
}

const ManageDrones = () => {
  const [drones, setDrones] = useState<IDrone[]>([]);
  const [statDrones, setStatDrones] = useState<IDrone[]>([]);
  const [statTotal, setStatTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<{
    total: number;
    page: number;
    limit: number;
    total_page: number;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState<IDrone | null>(null);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    [],
  );
  const [brands, setBrands] = useState<
    { _id: string; name: string; logo: string; description: string }[]
  >([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    brand: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(
    handleDroneAction.bind(null),
    {
      errors: {},
      success: false,
      message: "",
    },
  );

  const fetchDrones = useCallback(async (currentPage: number = 1) => {
    setLoading(true);
    try {
      const res = await getDrones({
        page: currentPage,
        limit: DRONES_PER_PAGE,
      });
      if (res.success) {
        setDrones(res.data);
        setMeta(res.meta || null);
      } else {
        toast.error(res.message || "Failed to fetch drones");
      }
    } catch (_error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  // Lightweight, wider fetch used only to compute the inventory stat cards.
  const fetchStats = useCallback(async () => {
    try {
      const res = await getDrones({ page: 1, limit: 200 });
      if (res.success) {
        setStatDrones(res.data);
        setStatTotal(res.meta?.total ?? res.data.length);
      }
    } catch {
      // Stat cards are best-effort; ignore failures.
    }
  }, []);

  useEffect(() => {
    fetchDrones(page);
  }, [fetchDrones, page]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          getCategories(),
          getBrands(),
        ]);
        if (categoriesRes.success) setCategories(categoriesRes.data);
        if (brandsRes.success) setBrands(brandsRes.data);
      } catch (_error) {
        toast.error("Failed to load categories or brands");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setFormData({
        name: "",
        price: "",
        quantity: "",
        category: "",
        brand: "",
        description: "",
      });
      setSelectedFile(null);
      setImagePreview(null);
      setDialogOpen(false);
      setIsEdit(false);
      setSelectedDrone(null);
      setPage(1);
      fetchDrones(1);
      fetchStats();
    }
  }, [state, fetchDrones, fetchStats]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = async (drone: IDrone) => {
    try {
      const fetchedDrone = await getDroneById(drone._id);
      setFormData({
        name: fetchedDrone.name,
        price: fetchedDrone.price.toString(),
        quantity: fetchedDrone.quantity.toString(),
        category: (fetchedDrone.category as ICategory)._id,
        brand: (fetchedDrone.brand as IBrand)._id,
        description: fetchedDrone.description,
      });
      setImagePreview(fetchedDrone.img); // Set preview for existing image
      setSelectedDrone(fetchedDrone);
      setIsEdit(true);
      setDialogOpen(true);
    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to fetch drone");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete "${name}"?`,
    );
    if (!confirmation) return;

    try {
      const res = await deleteDrone(id);
      if (res.success) {
        toast.success("Drone deleted successfully");
        setPage(1);
        fetchDrones(1);
        fetchStats();
      } else {
        toast.error(res.message || "Failed to delete drone");
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "Something went wrong");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      setImagePreview(null);
      return;
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPEG, PNG, or WebP)");
      e.target.value = "";
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("File size must be less than 5MB");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById("img") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const stats = useMemo(() => {
    const inStock = statDrones.filter(
      (d) => d.quantity > LOW_STOCK_THRESHOLD,
    ).length;
    const low = statDrones.filter(
      (d) => d.quantity > 0 && d.quantity <= LOW_STOCK_THRESHOLD,
    ).length;
    const out = statDrones.filter((d) => d.quantity === 0).length;
    return [
      {
        label: "Total SKUs",
        value: statTotal.toLocaleString(),
        icon: Boxes,
        bg: "rgba(74,158,255,.14)",
        color: "#4a9eff",
      },
      {
        label: "In stock",
        value: inStock.toLocaleString(),
        icon: Plane,
        bg: "rgba(31,157,92,.14)",
        color: "#1f9d5c",
      },
      {
        label: "Low stock",
        value: low.toLocaleString(),
        icon: TriangleAlert,
        bg: "rgba(245,166,35,.14)",
        color: "#f5a623",
      },
      {
        label: "Out of stock",
        value: out.toLocaleString(),
        icon: PackageX,
        bg: "rgba(239,43,69,.14)",
        color: "#ef2b45",
      },
    ];
  }, [statDrones, statTotal]);

  const visibleDrones = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return drones;
    return drones.filter(
      (d) =>
        d.name.toLowerCase().includes(q) || d._id.toLowerCase().includes(q),
    );
  }, [drones, search]);

  return (
    <div className="flex flex-col gap-[18px]">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`${adminCardClass} p-[18px]`}>
              <div className="mb-3 flex items-center justify-between">
                <span
                  className="flex h-[36px] w-[36px] items-center justify-center rounded-[10px]"
                  style={{ background: s.bg, color: s.color }}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </span>
              </div>
              <div className="font-chakra text-[24px] font-bold tracking-[-0.01em] text-dr-text">
                {s.value}
              </div>
              <div className="mt-1 text-[12.5px] text-dr-text-3">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-3 h-[15px] w-[15px] text-dr-text-3" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search drones…"
            className="w-[240px] rounded-[10px] border border-dr-bd-2 bg-dr-field py-[10px] pl-9 pr-3 text-[13.5px] text-dr-text placeholder:text-dr-text-3 focus:border-dr-red/50 focus:outline-none"
          />
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setIsEdit(false);
              setSelectedDrone(null);
              setFormData({
                name: "",
                price: "",
                quantity: "",
                category: "",
                brand: "",
                description: "",
              });
              setSelectedFile(null);
              setImagePreview(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <button type="button" className={adminPrimaryBtnClass}>
              <Plus className="h-4 w-4" />
              Add drone
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {isEdit ? "Edit Drone" : "Add New Drone"}
              </DialogTitle>
              <DialogDescription>
                {isEdit ? "Update drone details." : "Enter drone details."}
              </DialogDescription>
            </DialogHeader>
            {state.errors && "general" in state.errors && (
              <p className="text-red-500 text-sm">{state.errors.general}</p>
            )}
            <form
              action={async (formData: FormData) => {
                // Create clean FormData with only required fields for server
                const cleanFormData = new FormData();

                // Add file if selected
                if (selectedFile) {
                  cleanFormData.set("file", selectedFile);
                }

                // Extract form data and create payload
                const payload: {
                  name: string;
                  price: string;
                  quantity: string;
                  category: string;
                  brand: string;
                  description: string;
                  droneId?: string;
                } = {
                  name: formData.get("name") as string,
                  price: formData.get("price") as string,
                  quantity: formData.get("quantity") as string,
                  category: formData.get("category") as string,
                  brand: formData.get("brand") as string,
                  description: formData.get("description") as string,
                };

                // Add droneId if editing
                if (isEdit && selectedDrone) {
                  payload.droneId = selectedDrone._id;
                }

                // Add payload as JSON string
                cleanFormData.set("data", JSON.stringify(payload));

                // Call the server action with clean FormData
                const result = await formAction(cleanFormData);
                return result;
              }}
              className="space-y-6"
            >
              {isEdit && selectedDrone && (
                <input type="hidden" name="droneId" value={selectedDrone._id} />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Drone Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter drone name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {state.errors && "name" in state.errors && (
                    <p className="text-red-500 text-sm">{state.errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {state.errors && "price" in state.errors && (
                    <p className="text-red-500 text-sm">{state.errors.price}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                  {state.errors && "quantity" in state.errors && (
                    <p className="text-red-500 text-sm">
                      {state.errors.quantity}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="img">Drone Image</Label>
                  <div className="space-y-4">
                    <Input
                      id="img"
                      name="img"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    {imagePreview && (
                      <div className="relative inline-block">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="rounded-lg object-cover border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Accepted formats: JPEG, PNG, WebP. Max size: 5MB
                    </p>
                  </div>
                  {state.errors && "img" in state.errors && (
                    <p className="text-red-500 text-sm">{state.errors.img}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onValueChange={(value) =>
                      handleSelectChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {state.errors && "category" in state.errors && (
                    <p className="text-red-500 text-sm">
                      {state.errors.category}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Select
                    name="brand"
                    value={formData.brand}
                    onValueChange={(value) =>
                      handleSelectChange("brand", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand._id} value={brand._id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {state.errors && "brand" in state.errors && (
                    <p className="text-red-500 text-sm">{state.errors.brand}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
                {state.errors && "description" in state.errors && (
                  <p className="text-red-500 text-sm">
                    {state.errors.description}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={pending}>
                  {pending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isEdit ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      {isEdit ? (
                        <Edit className="mr-2 h-4 w-4" />
                      ) : (
                        <Plus className="mr-2 h-4 w-4" />
                      )}
                      {isEdit ? "Update Drone" : "Add Drone"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Inventory table */}
      <div className={`${adminCardClass} overflow-hidden`}>
        <div className="hidden grid-cols-[2.4fr_1fr_.9fr_1fr_1.1fr] gap-3.5 border-b border-dr-bd-1 px-[22px] py-3.5 font-dm-mono text-[10.5px] uppercase tracking-[0.1em] text-dr-text-3 md:grid">
          <span>Drone</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-dr-red" />
          </div>
        ) : visibleDrones.length === 0 ? (
          <div className="px-[22px] py-12 text-center text-[13.5px] text-dr-text-3">
            {search ? "No drones match your search." : "No drones found."}
          </div>
        ) : (
          visibleDrones.map((drone) => {
            const sm = stockMeta(drone.quantity);
            return (
              <div
                key={drone._id}
                className="grid grid-cols-[1fr_auto] items-center gap-3.5 border-b border-dr-bd-1 px-[22px] py-3.5 last:border-0 hover:bg-dr-bd-1/50 md:grid-cols-[2.4fr_1fr_.9fr_1fr_1.1fr]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-dr-bd-1 bg-dr-field">
                    {drone.img ? (
                      <Image
                        src={drone.img}
                        alt={drone.name}
                        width={46}
                        height={46}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <DroneThumb size={30} />
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-poppins text-sm font-semibold text-dr-text">
                      {drone.name}
                    </div>
                    <div className="mt-0.5 font-dm-mono text-[11px] text-dr-text-3">
                      {drone._id.slice(-6).toUpperCase()}
                    </div>
                  </div>
                </div>
                <span className="hidden font-poppins text-[13.5px] font-bold text-dr-red md:block">
                  ${drone.price.toLocaleString()}
                </span>
                <span className="hidden text-[13.5px] text-dr-text-2 md:block">
                  {drone.quantity}
                </span>
                <span className="hidden md:block">
                  <StatusPill label={sm.label} style={sm.style} />
                </span>
                <div className="flex items-center gap-2 justify-self-end md:justify-end">
                  <button
                    type="button"
                    onClick={() => handleEdit(drone)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-dr-bd-2 text-dr-text-3 transition-colors hover:border-dr-red/40 hover:text-dr-red"
                    aria-label={`Edit ${drone.name}`}
                  >
                    <Edit className="h-[15px] w-[15px]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(drone._id, drone.name)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-dr-bd-2 text-dr-text-3 transition-colors hover:border-dr-red/40 hover:text-dr-red"
                    aria-label={`Delete ${drone.name}`}
                  >
                    <Trash2 className="h-[15px] w-[15px]" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {meta && meta.total_page > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
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
                          onClick={() => handlePageChange(i)}
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
                        onClick={() => handlePageChange(1)}
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
                          onClick={() => handlePageChange(i)}
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
                        onClick={() => handlePageChange(totalPages)}
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
                    handlePageChange(Math.min(meta.total_page, page + 1))
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
        </div>
      )}
    </div>
  );
};

export default ManageDrones;
