"use client";

import {
  PromotionsBanner,
  PromotionsGrid,
} from "@/components/pages/promotions";
import PublicSectionTitle from "@/components/shared/public-section-title";
import ReviewsCarousel from "@/components/shared/reviews-carousel";
import SectionContainer from "@/components/shared/SectionContainer";
import ScrollAnimation from "@/components/ui/scroll-animation";

export default function PromotionsPage() {
  return (
    <div className="relative animate-fade-in bg-background pb-8 md:pb-16">
      <PromotionsBanner />
      <div className="my-20 md:my-24 lg:my-32">
        <ScrollAnimation delay="100">
          <SectionContainer className="bg-background/50 backdrop-blur-sm">
            <PublicSectionTitle variant="h1" className="text-center mb-12">
              Exclusive Drone Promotions
            </PublicSectionTitle>
            <PromotionsGrid />
          </SectionContainer>
        </ScrollAnimation>
      </div>
      <div className="my-20 md:my-24 lg:my-32 flex justify-center">
        <svg
          width="200"
          height="20"
          viewBox="0 0 200 20"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary/30"
        >
          <path
            d="M0,10 Q50,0 100,10 T200,10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <title>Decorative wave divider</title>
        </svg>
      </div>
      <div className="my-20 md:my-24 lg:my-32">
        <ScrollAnimation delay="200">
          <SectionContainer>
            <ReviewsCarousel />
          </SectionContainer>
        </ScrollAnimation>
      </div>
    </div>
  );
}
