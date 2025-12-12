"use client";

import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
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

  const [state, action, pending] = useActionState(brandAction, null);

  const fieldErrors = state?.errors || {};

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
              <form action={action} className="space-y-4">
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
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    required
                    className={
                      fieldErrors.logo
                        ? "border-destructive focus:border-destructive"
                        : ""
                    }
                    aria-invalid={!!fieldErrors.logo}
                    aria-describedby={
                      fieldErrors.logo ? "logo-error" : undefined
                    }
                  />
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
