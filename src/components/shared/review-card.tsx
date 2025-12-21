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
    <Card className="group relative h-full overflow-hidden border-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm shadow-xl shadow-black/5 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 dark:from-gray-900/80 dark:to-gray-900/40 dark:shadow-black/20 dark:hover:shadow-black/30">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <CardContent className="relative flex flex-col p-6">
        {/* Quote Icon */}
        <div className="mb-4 flex items-center justify-between">
          <Quote className="h-6 w-6 text-primary/60 transition-colors duration-300 group-hover:text-primary" />
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i <= Math.floor(rating)
                    ? "text-yellow-400 fill-current drop-shadow-sm"
                    : "text-gray-300 dark:text-gray-500"
                }`}
              />
            ))}
            <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              {rating}/5
            </span>
          </div>
        </div>

        {/* Comment */}
        <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground dark:text-gray-200 transition-colors duration-500 group-hover:text-foreground dark:group-hover:text-white italic">
          "{comment}"
        </p>

        {/* User Info */}
        <div className="mt-auto flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 text-primary transition-all duration-300 group-hover:from-primary/30 group-hover:to-accent/30">
            <span className="text-sm font-semibold">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground dark:text-white transition-colors duration-500 group-hover:text-cyan-400 drop-shadow-sm">
              {userName}
            </p>
            <p className="text-xs text-muted-foreground dark:text-gray-300">
              {formatDate(createdAt)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
