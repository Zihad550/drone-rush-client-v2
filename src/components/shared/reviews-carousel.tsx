"use client";

import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import InlineSpinner from "@/components/inline-spinner";
import SectionContainer from "@/components/shared/SectionContainer";
import { getReviews } from "@/services/review/review.service";
import type IReview from "@/types/review.type";
import PublicSectionTitle from "./public-section-title";
import ReviewCard from "./review-card";

const ReviewsCarousel = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviews({
          sort: "-createdAt",
          limit: "10",
        });
        if (response.success) {
          setReviews(response.data);
        } else {
          setError("Failed to load reviews");
        }
      } catch (_err) {
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <InlineSpinner />
      </div>
    );
  }

  if (error || reviews.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground dark:text-gray-300">
          {error || "No reviews available"}
        </p>
      </div>
    );
  }

  return (
    <SectionContainer>
      <div className="relative w-full">
        <PublicSectionTitle>Customer Reviews</PublicSectionTitle>
        {/* Subtle background pattern */}
        <div className="absolute inset-0" />

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 3,
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            480: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3.2,
              spaceBetween: 28,
            },
            1280: {
              slidesPerView: 3.5,
              spaceBetween: 32,
            },
          }}
          className="pb-16 pt-4"
          style={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
          }}
          a11y={{
            prevSlideMessage: "Previous review",
            nextSlideMessage: "Next review",
            firstSlideMessage: "This is the first review",
            lastSlideMessage: "This is the last review",
            paginationBulletMessage: "Go to review {{index}}",
          }}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide
              key={review._id}
              className="transition-transform duration-300"
            >
              <div className="h-full transform transition-transform duration-300 hover:scale-[1.02]">
                <ReviewCard review={review} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          type="button"
          className="swiper-button-prev absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl dark:bg-gray-900/80 dark:hover:bg-gray-900"
          aria-label="Previous review"
        >
          <svg
            className="h-5 w-5 text-foreground dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          type="button"
          className="swiper-button-next absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl dark:bg-gray-900/80 dark:hover:bg-gray-900"
          aria-label="Next review"
        >
          <svg
            className="h-5 w-5 text-foreground dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </SectionContainer>
  );
};

export default ReviewsCarousel;
