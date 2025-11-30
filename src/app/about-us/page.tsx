import AboutUsBanner from "@/components/pages/about-us/about-us-banner";
import OurTeam from "@/components/pages/about-us/our-team";
import WhyUs from "@/components/pages/about-us/why-us";
import Title from "@/components/title";

export default function AboutUsPage() {
  return (
    <div className="animate-fade-in bg-background py-8 md:py-16">
      <div className="container mx-auto max-w-[1400px]">
        {/* banner */}
        <div className="mb-20 mt-4 md:mt-6">
          <div className="relative mb-20 after:absolute after:-bottom-10 after:left-1/2 after:h-px after:w-3/5 after:-translate-x-1/2 after:rounded-lg after:bg-[rgba(0,0,0,0.06)] after:content-['']">
            <AboutUsBanner />
          </div>
        </div>

        {/* mission statement */}
        <div className="my-12 text-center">
          <Title>About Drone Rush</Title>
          <div className="mx-auto mb-6 h-px w-20 border-t border-primary" />
          <h6 className="mx-auto max-w-4xl text-lg font-normal text-muted-foreground md:text-[22px]">
            At Drone Rush, we are passionate about delivering cutting-edge drone
            technology and exceptional service. Our mission is to empower
            individuals and businesses with innovative aerial solutions,
            ensuring quality, reliability, and a commitment to excellence in
            everything we do.
          </h6>
        </div>

        {/* why us */}
        <div className="my-12">
          <WhyUs />
        </div>

        {/* our team */}
        <div className="my-12">
          <div className="mb-6 text-center">
            <Title variant="h4" className="text-[22px] md:text-[32px]">
              Meet Our Team
            </Title>
            <div className="mx-auto mb-6 h-px w-16 border-t border-primary" />
            <OurTeam />
          </div>
        </div>
      </div>
    </div>
  );
}
