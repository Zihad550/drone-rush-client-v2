"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type IReview from "@/types/review.type";

interface ReviewCardProps {
  review: IReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { user, drone, comment, rating, createdAt } = review;
  const userName = user
    ? typeof user === "string"
      ? user
      : user.name
    : "Anonymous";
  const droneName = drone
    ? typeof drone === "string"
      ? drone
      : drone.name
    : "Unknown Drone";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="h-full border-0 shadow-lg">
      <CardContent className="flex flex-col p-6">
        {/* Rating Stars */}
        <div className="mb-3 flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {rating}/5
          </span>
        </div>

        {/* Comment */}
        <p className="mb-4 flex-1 text-sm text-gray-700 dark:text-gray-300">
          "{comment}"
        </p>

        {/* User and Drone Info */}
        <div className="mt-auto">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {userName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            on {droneName}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {formatDate(createdAt)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
