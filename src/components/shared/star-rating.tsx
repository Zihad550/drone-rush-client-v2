"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

const StarRating = ({ rating, size = "md" }: StarRatingProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={`rating-star-${i}`}
          className={`${sizeClasses[size]} ${
            i < Math.floor(rating)
              ? "fill-[#f5a623] text-[#f5a623]"
              : i < rating
                ? "fill-[#f5a623]/50 text-[#f5a623]"
                : "text-dr-bd-4"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
