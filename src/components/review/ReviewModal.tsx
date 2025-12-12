"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { createReview, updateReview } from "@/services/review/review.service";
import type IOrder from "@/types/order.type";

interface ReviewModalProps {
  order: IOrder;
  trigger: React.ReactNode;
  onSubmitSuccess?: (orderId: string) => void;
}

export default function ReviewModal({
  order,
  trigger,
  onSubmitSuccess,
}: ReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const initializeFromExistingReviews = useCallback(() => {
    // Initialize ratings from order.reviews
    const initialRatings: Record<string, number> = {};
    const initialComments: Record<string, string> = {};
    (order.reviews || []).forEach((r) => {
      const droneId = r.drone._id;
      initialRatings[droneId] = r.review.rating;
      initialComments[droneId] = r.review.comment;
    });
    setRatings(initialRatings);
    setComments(initialComments);
  }, [order]);

  useEffect(() => {
    if (open) {
      initializeFromExistingReviews();
    }
  }, [open, initializeFromExistingReviews]);

  const isValidSubmission = () => {
    return !order.drones.some((drone) => {
      const droneId = typeof drone.id === "string" ? drone.id : drone.id._id;
      const rating = ratings[droneId];
      const comment = comments[droneId];
      return rating && rating > 0 && (!comment || comment.trim() === "");
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      // Validation: Check if any rated drone has empty comment
      const hasInvalidReview = order.drones.some((drone) => {
        const droneId = typeof drone.id === "string" ? drone.id : drone.id._id;
        const rating = ratings[droneId];
        const comment = comments[droneId];
        return rating && rating > 0 && (!comment || comment.trim() === "");
      });
      if (hasInvalidReview) {
        setError("Please provide a comment for all rated drones.");
        return;
      }

      // For each drone, create or update review
      for (const drone of order.drones) {
        const droneId = typeof drone.id === "string" ? drone.id : drone.id._id;
        const existingOrderReview = (order.reviews || []).find(
          (r) => r.drone._id === droneId,
        );
        const rating = ratings[droneId];
        const comment = comments[droneId];

        if (rating && comment) {
          if (existingOrderReview) {
            await updateReview(existingOrderReview.review._id, {
              rating,
              comment,
            });
          } else {
            await createReview({
              orderId: order._id,
              droneId,
              rating,
              comment,
            });
          }
        }
      }
      setOpen(false);
      if (onSubmitSuccess) {
        onSubmitSuccess(order._id);
      }
      // TODO: Show success toast
    } catch (err) {
      console.error("Failed to submit reviews", err);
      setError("Failed to submit reviews. Please try again.");
      // TODO: Show error toast
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (droneId: string) => {
    const currentRating = ratings[droneId] || 0;
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => {
              setRatings((prev) => ({ ...prev, [droneId]: star }));
            }}
            className="text-yellow-400"
          >
            <Star
              className={`h-5 w-5 ${star <= currentRating ? "fill-current" : ""}`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Order #{order._id.slice(-6)}</DialogTitle>
          <DialogDescription>
            Share your experience with the products in this order.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {order.drones.map((drone) => {
            const droneId =
              typeof drone.id === "string" ? drone.id : drone.id._id;
            const _existingOrderReview = (order.reviews || []).find(
              (r) => r.drone._id === droneId,
            );
            return (
              <div key={droneId} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={typeof drone.id === "string" ? "" : drone.id.img || ""}
                    alt={
                      typeof drone.id === "string"
                        ? "Drone"
                        : drone.id.name || "Drone"
                    }
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">
                      {typeof drone.id === "string"
                        ? "Drone"
                        : drone.id.name || "Drone"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {drone.quantity}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Rating</p>
                    {renderStars(droneId)}
                  </div>
                  <div>
                    <label
                      htmlFor={`comment-${droneId}`}
                      className="text-sm font-medium"
                    >
                      Comment{ratings[droneId] > 0 ? " *" : ""}
                    </label>
                    <Textarea
                      id={`comment-${droneId}`}
                      placeholder="Share your thoughts..."
                      value={comments[droneId] || ""}
                      onChange={(e) =>
                        setComments((prev) => ({
                          ...prev,
                          [droneId]: e.target.value,
                        }))
                      }
                      rows={3}
                      className={
                        ratings[droneId] > 0 &&
                        (!comments[droneId] || comments[droneId].trim() === "")
                          ? "border-red-500"
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              loading ||
              (order.reviews && order.reviews.length > 0) ||
              !isValidSubmission()
            }
          >
            {loading
              ? "Submitting..."
              : order.reviews && order.reviews.length > 0
                ? "Already Reviewed"
                : "Submit Reviews"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
