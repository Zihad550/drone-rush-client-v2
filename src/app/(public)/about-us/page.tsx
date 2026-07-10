"use client";

import AboutUsBanner from "@/components/pages/about-us/about-us-banner";
import OurTeam from "@/components/pages/about-us/our-team";
import WhyUs from "@/components/pages/about-us/why-us";
import ReviewsCarousel from "@/components/shared/reviews-carousel";
import ScrollAnimation from "@/components/ui/scroll-animation";

export default function AboutUsPage() {
  return (
    <div className="animate-fade-in bg-background">
      {/* Hero */}
      <AboutUsBanner />

      {/* Mission Statement */}
      <ScrollAnimation>
        <section className="mx-auto max-w-[820px] px-10 pb-[60px] pt-5">
          <div className="rounded-2xl border border-dr-bd-2 bg-dr-surface p-[38px] text-center">
            <h2 className="inline-block font-chakra text-[30px] font-bold text-dr-text">
              About Drone Rush
              <span className="mx-auto mt-2 block h-[3px] w-[140px] rounded-sm bg-gradient-to-r from-white to-dr-red" />
            </h2>
            <div className="mx-auto my-[22px] h-px w-20 bg-gradient-to-r from-transparent via-dr-red to-transparent" />
            <p className="mx-auto max-w-[600px] text-[15px] leading-[1.75] text-dr-text-2">
              At Drone Rush, we are passionate about delivering cutting-edge
              drone technology and exceptional service. Our mission is to
              empower individuals and businesses with innovative aerial
              solutions, ensuring quality, reliability, and a commitment to
              excellence in everything we do.
            </p>
          </div>
        </section>
      </ScrollAnimation>

      {/* Why Us */}
      <ScrollAnimation>
        <div className="py-[30px]">
          <WhyUs />
        </div>
      </ScrollAnimation>

      {/* Our Team */}
      <ScrollAnimation>
        <div className="py-[30px]">
          <OurTeam />
        </div>
      </ScrollAnimation>

      {/* Customer Reviews */}
      <ScrollAnimation>
        <div className="pb-[76px] pt-[30px]">
          <ReviewsCarousel />
        </div>
      </ScrollAnimation>
    </div>
  );
}
