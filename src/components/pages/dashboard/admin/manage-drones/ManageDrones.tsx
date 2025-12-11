"use client";

import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteDrone, getDrones } from "@/services/drone/drone.service";
import type IDrone from "@/types/drone.type";

const ManageDrones = () => {
  const [drones, setDrones] = useState<IDrone[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDrones = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getDrones();
      if (res.success) {
        setDrones(res.data);
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
    fetchDrones();
  }, [fetchDrones]);

  const handleDelete = async (id: string, name: string) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete "${name}"?`,
    );
    if (!confirmation) return;

    try {
      const res = await deleteDrone(id);
      if (res.success) {
        toast.success("Drone deleted successfully");
        fetchDrones();
      } else {
        toast.error(res.message || "Failed to delete drone");
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Drones</CardTitle>
          <CardDescription>
            View and manage all drones in the inventory.
          </CardDescription>
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
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(drone._id, drone.name)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageDrones;
