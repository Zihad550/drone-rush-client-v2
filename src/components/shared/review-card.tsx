"use client";

import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type IReview from "@/types/review.type";
import type IUser from "@/types/user.type";

interface ReviewCardProps {
  review: IReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { user, comment, rating, createdAt } = review;
  const u = user as IUser;
  const userName = "name" in u ? u.name : "Anonymous";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="group relative h-full overflow-hidden rounded-[18px] border border-dr-bd-2 bg-dr-surface shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-dr-red/45 hover:shadow-[0_16px_44px_rgba(239,43,69,0.18)]">
      {/* Subtle red glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,43,69,0.1),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <CardContent className="relative flex flex-col p-6">
        {/* Quote Icon */}
        <div className="mb-4 flex items-center justify-between">
          <Quote className="h-6 w-6 text-dr-red/60 transition-colors duration-300 group-hover:text-dr-red" />
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i <= Math.floor(rating)
                    ? "text-[#f5a623] fill-current drop-shadow-sm"
                    : "text-dr-bd-4"
                }`}
              />
            ))}
            <span className="ml-2 text-sm font-medium text-dr-text-3">
              {rating}/5
            </span>
          </div>
        </div>

        {/* Comment */}
        <p className="mb-6 flex-1 text-sm italic leading-relaxed text-dr-text-2 transition-colors duration-500 group-hover:text-dr-text">
          "{comment}"
        </p>

        {/* User Info */}
        <div className="mt-auto flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dr-red/30 bg-dr-red/10 text-dr-red transition-all duration-300 group-hover:bg-dr-red/20">
            <span className="text-sm font-semibold">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-poppins text-sm font-semibold text-dr-text transition-colors duration-500 group-hover:text-dr-red">
              {userName}
            </p>
            <p className="text-xs text-dr-text-3">{formatDate(createdAt)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
