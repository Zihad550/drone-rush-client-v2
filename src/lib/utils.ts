import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type IDrone from "@/types/drone.type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateAverageRating = (reviews: IDrone["reviews"]): number => {
  if (!reviews || reviews.length === 0) return 0;
  const ratings = reviews
    .map((review) =>
      typeof review === "object" && review && "rating" in review
        ? review.rating
        : 0,
    )
    .filter((rating) => rating >= 0);
  if (ratings.length === 0) return 0;
  return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
};

export const calculateRatingBreakdown = (reviews: IDrone["reviews"]) => {
  if (!reviews || reviews.length === 0) {
    return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: 0 };
  }

  const totalReviews = reviews.length;
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: 0 };

  reviews.forEach((review) => {
    if (typeof review === "object" && review && "rating" in review) {
      const rating = Math.floor(review.rating);
      if (rating >= 0 && rating <= 5) {
        breakdown[rating as keyof typeof breakdown]++;
      }
    }
  });

  // Convert to percentages
  ([5, 4, 3, 2, 1, 0] as const).forEach((rating) => {
    breakdown[rating] =
      totalReviews > 0
        ? Math.round((breakdown[rating] / totalReviews) * 100)
        : 0;
  });

  return breakdown;
};
