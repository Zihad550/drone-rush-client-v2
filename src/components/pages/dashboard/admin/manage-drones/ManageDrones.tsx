"use client";

import { Edit, Loader2, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useActionState, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { handleDroneAction } from "@/app/actions/drone.actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const ManageDrones = () => {
  const [drones, setDrones] = useState<IDrone[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPage: number;
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

  useEffect(() => {
    fetchDrones(page);
  }, [fetchDrones, page]);

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
    }
  }, [state, fetchDrones]);

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manage Drones</CardTitle>
              <CardDescription>
                View and manage all drones in the inventory.
              </CardDescription>
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
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Drone
                </Button>
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
                    <input
                      type="hidden"
                      name="droneId"
                      value={selectedDrone._id}
                    />
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
                        <p className="text-red-500 text-sm">
                          {state.errors.name}
                        </p>
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
                        <p className="text-red-500 text-sm">
                          {state.errors.price}
                        </p>
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
                        <p className="text-red-500 text-sm">
                          {state.errors.img}
                        </p>
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
                        <p className="text-red-500 text-sm">
                          {state.errors.brand}
                        </p>
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
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : drones.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No drones found.
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm text-left">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                        Image
                      </th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                        Drone Name
                      </th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                        Description
                      </th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                        Price
                      </th>
                      <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {drones.map((drone) => (
                      <tr
                        key={drone._id}
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        <td className="p-4 align-middle">
                          <Image
                            src={drone.img}
                            alt={drone.name}
                            width={64}
                            height={64}
                            className="h-16 w-16 rounded object-cover"
                          />
                        </td>
                        <td className="p-4 align-middle font-medium">
                          {drone.name}
                        </td>
                        <td className="p-4 align-middle max-w-md">
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            {drone.description}
                          </p>
                        </td>
                        <td className="p-4 align-middle">${drone.price}</td>
                        <td className="p-4 align-middle">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(drone)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                handleDelete(drone._id, drone.name)
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {meta && meta.totalPage > 1 && (
            <div className="flex justify-center mt-6">
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
                    const totalPages = meta.totalPage;
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
                        handlePageChange(Math.min(meta.totalPage, page + 1))
                      }
                      className={
                        page === meta.totalPage
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageDrones;
