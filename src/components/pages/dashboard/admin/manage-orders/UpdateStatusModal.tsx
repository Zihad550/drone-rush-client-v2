"use client";

import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateOrderStatus } from "@/services/order/order.service";
import type IOrder from "@/types/order.type";
import type { TOrderStatus } from "@/types/order.type";

interface UpdateStatusModalProps {
  order: IOrder;
  onSuccess: () => void;
}

const orderStatusOptions: { value: TOrderStatus; label: string }[] = [
  { value: "PENDING", label: "Pending" },
  { value: "PROCESSING", label: "Processing" },
  { value: "PACKAGED", label: "Packaged" },
  { value: "DELIVERING", label: "Delivering" },
  { value: "COMPLETED", label: "Completed" },
  { value: "USER-CANCELLED", label: "User Cancelled" },
  { value: "FAILED", label: "Failed" },
  { value: "ADMIN-CANCELLED", label: "Admin Cancelled" },
];

const UpdateStatusModal = ({ order, onSuccess }: UpdateStatusModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<TOrderStatus>(order.status);
  const [cancelReason, setCancelReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const payload: { status: TOrderStatus; cancelReason?: string } = {
        status,
      };
      if (status === "USER-CANCELLED" || status === "ADMIN-CANCELLED") {
        payload.cancelReason = cancelReason;
      }

      const res = await updateOrderStatus(order._id, payload);
      if (res.success) {
        toast.success("Order status updated successfully");
        setIsOpen(false);
        onSuccess();
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (_error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        Update Status
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Update Order Status</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as TOrderStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {orderStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(status === "USER-CANCELLED" || status === "ADMIN-CANCELLED") && (
            <div className="space-y-2">
              <Label>Cancel Reason</Label>
              <Textarea
                placeholder="Enter reason for cancellation"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={3}
              />
            </div>
          )}

          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusModal;
