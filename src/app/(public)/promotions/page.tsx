"use client";

import {
  PromotionsBanner,
  PromotionsGrid,
} from "@/components/pages/promotions";
import ReviewsCarousel from "@/components/shared/reviews-carousel";
import V2SectionHeading from "@/components/shared/v2-section-heading";
import ScrollAnimation from "@/components/ui/scroll-animation";

export default function PromotionsPage() {
  return (
    <div className="animate-fade-in bg-background">
      <PromotionsBanner />

      <ScrollAnimation>
        <section
          id="promotions-grid"
          className="mx-auto max-w-[1180px] px-10 py-[46px]"
        >
          <V2SectionHeading
            eyebrow="Deals"
            title="Exclusive Drone Promotions"
            subtitle="Hand-picked bundles and seasonal price drops across our full fleet. Grab them before they fly."
            barWidth={200}
            className="mb-8"
          />
          <PromotionsGrid />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <div className="pb-[76px] pt-[30px]">
          <ReviewsCarousel />
        </div>
      </ScrollAnimation>
    </div>
  );
}
