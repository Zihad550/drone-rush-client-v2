import AboutUsBanner from "@/components/pages/about-us/about-us-banner";
import OurTeam from "@/components/pages/about-us/our-team";
import WhyUs from "@/components/pages/about-us/why-us";
import PublicSectionTitle from "@/components/shared/public-section-title";
import SectionContainer from "@/components/shared/SectionContainer";

export default function AboutUsPage() {
  return (
    <div className="animate-fade-in bg-background pb-8 md:pb-16">
      {/* banner */}
      <div className="mb-12  md:mb-20 relative">
        <AboutUsBanner />
      </div>

      <SectionContainer maxWidth="[1400px]" className="flex flex-col gap-y-48">
        {/* mission statement */}
        <div className="text-center mt-20">
          <PublicSectionTitle variant="h2">About Drone Rush</PublicSectionTitle>
          <h6 className="mx-auto max-w-4xl text-lg font-normal text-muted-foreground md:text-[22px]">
            At Drone Rush, we are passionate about delivering cutting-edge drone
            technology and exceptional service. Our mission is to empower
            individuals and businesses with innovative aerial solutions,
            ensuring quality, reliability, and a commitment to excellence in
            everything we do.
          </h6>
        </div>

        {/* why us */}
        <WhyUs />

        {/* our team */}
        <OurTeam />
      </SectionContainer>
    </div>
  );
}
