"use client";

import AboutUsBanner from "@/components/pages/about-us/about-us-banner";
import OurTeam from "@/components/pages/about-us/our-team";
import WhyUs from "@/components/pages/about-us/why-us";
import PublicSectionTitle from "@/components/shared/public-section-title";
import ReviewsCarousel from "@/components/shared/reviews-carousel";
import SectionContainer from "@/components/shared/SectionContainer";
import ScrollAnimation from "@/components/ui/scroll-animation";

export default function AboutUsPage() {
  return (
    <div className="relative animate-fade-in bg-background pb-8 md:pb-16">
      {/* Banner */}
      <div className="relative min-h-screen ">
        <div className="relative after:absolute after:-bottom-10 after:left-1/2 after:h-px after:w-3/5 after:-translate-x-1/2 after:rounded-lg after:bg-gradient-to-r after:from-transparent after:via-primary/20 after:to-transparent after:content-[''] after:shadow-[0_0_20px_rgba(var(--primary),0.3)]">
          <AboutUsBanner />
        </div>
      </div>

      {/* Mission Statement */}
      <SectionContainer>
        <ScrollAnimation>
          <div className="my-20 md:my-24 lg:my-32">
            <div className="text-center">
              <div className="mx-auto max-w-5xl rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-8 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm md:p-12">
                <PublicSectionTitle variant="h2">
                  About Drone Rush
                </PublicSectionTitle>
                <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                <h6 className="mx-auto max-w-4xl text-lg font-normal text-muted-foreground md:text-[22px]">
                  At Drone Rush, we are passionate about delivering cutting-edge
                  drone technology and exceptional service. Our mission is to
                  empower individuals and businesses with innovative aerial
                  solutions, ensuring quality, reliability, and a commitment to
                  excellence in everything we do.
                </h6>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </SectionContainer>

      {/* Futuristic Divider */}
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

      {/* Why Us */}
      <ScrollAnimation>
        <div className="my-20 md:my-24 lg:my-32">
          <WhyUs />
        </div>
      </ScrollAnimation>

      {/* Futuristic Divider */}
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

      {/* Our Team */}
      <ScrollAnimation>
        <div className="my-20 md:my-24 lg:my-32">
          <OurTeam />
        </div>
      </ScrollAnimation>

      {/* Futuristic Divider */}
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

      {/* Testimonials */}
      <ScrollAnimation>
        <div className="my-20 md:my-24 lg:my-32">
          <ReviewsCarousel />
        </div>
      </ScrollAnimation>
    </div>
  );
}
