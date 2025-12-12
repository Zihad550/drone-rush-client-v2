"use client";

import { Edit, Loader2, Plus, Trash2 } from "lucide-react";
import { useActionState, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { categoryAction } from "@/app/actions/category.actions";
import InlineSpinner from "@/components/inline-spinner";
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
  deleteCategory,
  getCategories,
} from "@/services/category/category.service";

interface ICategory {
  _id: string;
  name: string;
}

const ManageCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );
  const [formValues, setFormValues] = useState({
    name: "",
  });

  const [state, action, pending] = useActionState(categoryAction, null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      if (res.success) {
        setCategories(res.data);
      } else {
        toast.error(res.message || "Failed to fetch categories");
      }
    } catch (_error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    if (state?.success) {
      fetchCategories();
      setDialogOpen(false);
      setEditingCategory(null);
      setFormValues({
        name: "",
      });
    }
  }, [state?.success, fetchCategories]);

  const handleEdit = (category: ICategory) => {
    setEditingCategory(category);
    setFormValues({ name: category.name });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete "${name}"?`,
    );
    if (!confirmation) return;

    try {
      const res = await deleteCategory(id);
      if (res.success) {
        toast.success("Category deleted successfully");
        fetchCategories();
      } else {
        toast.error(res.message || "Failed to delete category");
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Categories</CardTitle>
          <CardDescription>View and add drone categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) {
                setEditingCategory(null);
                setFormValues({ name: "" });
              }
            }}
          >
            <DialogTrigger asChild>
              <Button className="mb-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? "Edit Category" : "Add Category"}
                </DialogTitle>
                <DialogDescription>
                  {editingCategory
                    ? "Update category name."
                    : "Enter category name."}
                </DialogDescription>
              </DialogHeader>
              <form action={action} className="space-y-4">
                {editingCategory && (
                  <input type="hidden" name="id" value={editingCategory._id} />
                )}
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    required
                    className={
                      state?.errors?.name
                        ? "border-destructive focus:border-destructive"
                        : ""
                    }
                    aria-invalid={!!state?.errors?.name}
                    aria-describedby={
                      state?.errors?.name ? "name-error" : undefined
                    }
                  />
                  {state?.errors?.name && (
                    <p
                      id="name-error"
                      className="text-sm text-destructive mt-1"
                      role="alert"
                    >
                      {state.errors.name}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={pending}>
                  {pending ? (
                    <>
                      <InlineSpinner size="sm" />
                      {editingCategory ? "Updating..." : "Adding..."}
                    </>
                  ) : editingCategory ? (
                    "Update"
                  ) : (
                    "Add"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No categories found.
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="h-12 px-4 text-left">Name</th>
                    <th className="h-12 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category._id} className="border-b">
                      <td className="p-4 font-medium">{category.name}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(category)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleDelete(category._id, category.name)
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageCategories;
