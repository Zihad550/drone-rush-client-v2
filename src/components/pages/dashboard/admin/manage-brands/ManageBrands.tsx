"use client";

import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useActionState, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { brandAction } from "@/app/actions/brand.actions";
import InlineSpinner from "@/components/inline-spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Textarea } from "@/components/ui/textarea";
import {
  deleteBrand,
  getBrandById,
  getBrands,
} from "@/services/brand/brand.service";

interface IBrand {
  _id: string;
  name: string;
  logo: string;
  description: string;
}

const ManageBrands = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [state, action, pending] = useActionState(brandAction, null);

  const fieldErrors =
    state?.errors &&
    typeof state.errors === "object" &&
    !("general" in state.errors)
      ? state.errors
      : {};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchBrands = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getBrands();
      if (res.success) {
        setBrands(res.data);
      } else {
        toast.error(res.message || "Failed to fetch brands");
      }
    } catch (_error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    if (state?.success) {
      fetchBrands();
      setDialogOpen(false);
      setIsEdit(false);
      setSelectedBrand(null);
      setFormData({
        name: "",
        logo: "",
        description: "",
      });
      setSelectedFile(null);
      setImagePreview(null);
    }
  }, [state?.success, fetchBrands]);

  const handleEdit = async (brand: IBrand) => {
    try {
      const res = await getBrandById(brand._id);
      if (res.success) {
        setFormData({
          name: res.data.name,
          logo: res.data.logo,
          description: res.data.description,
        });
        setImagePreview(res.data.logo); // Set preview for existing image
        setSelectedBrand(brand);
        setIsEdit(true);
        setDialogOpen(true);
      } else {
        toast.error(res.message || "Failed to fetch brand");
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "Something went wrong");
    }
  };

  const handleDelete = async (brand: IBrand) => {
    setDeleteLoading(true);
    try {
      const res = await deleteBrand(brand._id);
      if (res.success) {
        toast.success("Brand deleted successfully");
        fetchBrands();
      } else {
        toast.error(res.message || "Failed to delete brand");
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "Something went wrong");
    } finally {
      setDeleteLoading(false);
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
    const fileInput = document.getElementById("logo") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Brands</CardTitle>
          <CardDescription>View and add drone brands.</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) {
                setIsEdit(false);
                setSelectedBrand(null);
                setFormData({
                  name: "",
                  logo: "",
                  description: "",
                });
                setSelectedFile(null);
                setImagePreview(null);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button className="mb-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Brand
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{isEdit ? "Edit Brand" : "Add Brand"}</DialogTitle>
                <DialogDescription>
                  {isEdit ? "Update brand details." : "Enter brand details."}
                </DialogDescription>
              </DialogHeader>
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
                    description: string;
                    id?: string;
                  } = {
                    name: formData.get("name") as string,
                    description: formData.get("description") as string,
                  };

                  // Add id if editing
                  if (isEdit && selectedBrand) {
                    payload.id = selectedBrand._id;
                  }

                  // Add payload as JSON string
                  cleanFormData.set("data", JSON.stringify(payload));

                  // Call the server action with clean FormData
                  const result = await action(cleanFormData);
                  return result;
                }}
                className="space-y-4"
              >
                {isEdit && selectedBrand && (
                  <input type="hidden" name="id" value={selectedBrand._id} />
                )}
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={
                      fieldErrors.name
                        ? "border-destructive focus:border-destructive"
                        : ""
                    }
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={
                      fieldErrors.name ? "name-error" : undefined
                    }
                  />
                  {fieldErrors.name && (
                    <p
                      id="name-error"
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {fieldErrors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Brand Logo</Label>
                  <div className="space-y-4">
                    <Input
                      id="logo"
                      name="logo"
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
                  {fieldErrors.logo && (
                    <p
                      id="logo-error"
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {fieldErrors.logo}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className={
                      fieldErrors.description
                        ? "border-destructive focus:border-destructive"
                        : ""
                    }
                    aria-invalid={!!fieldErrors.description}
                    aria-describedby={
                      fieldErrors.description ? "description-error" : undefined
                    }
                  />
                  {fieldErrors.description && (
                    <p
                      id="description-error"
                      className="text-sm text-destructive"
                      role="alert"
                    >
                      {fieldErrors.description}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={pending}>
                  {pending ? (
                    <>
                      <InlineSpinner size="sm" />
                      {isEdit ? "Updating..." : "Adding..."}
                    </>
                  ) : isEdit ? (
                    "Update"
                  ) : (
                    "Add"
                  )}
                </Button>

                {/* Aria-live region for form status announcements */}
                <div aria-live="polite" aria-atomic="true" className="sr-only">
                  {state &&
                    !state.success &&
                    state.message &&
                    `Error: ${state.message}`}
                  {pending && `${isEdit ? "Updating" : "Adding"} brand...`}
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : brands.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No brands found.
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="h-12 px-4 text-left">Logo</th>
                    <th className="h-12 px-4 text-left">Name</th>
                    <th className="h-12 px-4 text-left">Description</th>
                    <th className="h-12 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {brands.map((brand) => (
                    <tr key={brand._id} className="border-b">
                      <td className="p-4">
                        {/* biome-ignore lint/performance/noImgElement: Small logo in table, Next.js Image not suitable */}
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="h-8 w-8 object-cover rounded"
                        />
                      </td>
                      <td className="p-4 font-medium">{brand.name}</td>
                      <td className="p-4">{brand.description}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(brand)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete Brand
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{brand.name}
                                  "? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(brand)}
                                  disabled={deleteLoading}
                                >
                                  {deleteLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    "Delete"
                                  )}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageBrands;
