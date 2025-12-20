import Image from "next/image";
import SectionContainer from "@/components/shared/SectionContainer";
import ContactCtaButton from "./ContactCtaButton";
import ContactInfoCards from "./ContactInfoCards";

export default function ContactUsBanner() {
  return (
    <div className="relative overflow-hidden w-screen h-[calc(100vh-4rem)] bg-gradient-to-br from-[rgba(79,196,207,0.08)] to-[rgba(79,196,207,0.15)]">
      {/* Hexagonal decorative elements */}
      <div className="absolute -top-[30px] -right-[30px] z-0 opacity-20">
        <svg
          width="150"
          height="130"
          viewBox="0 0 150 130"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="75,0 150,43.3 150,86.6 75,130 0,86.6 0,43.3"
            fill="url(#banner-particle-gradient)"
          />
          <title>Decorative hexagon</title>
        </svg>
      </div>
      <div className="absolute -bottom-[50px] left-[40%] z-0 opacity-15">
        <svg
          width="200"
          height="173"
          viewBox="0 0 200 173"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="100,0 200,57.74 200,115.47 100,173 0,115.47 0,57.74"
            fill="url(#banner-particle-gradient)"
          />
          <title>Decorative hexagon</title>
        </svg>
      </div>

      <SectionContainer className="relative z-10 h-full">
        <div className="flex flex-col md:flex-row  items-center justify-center   gap-8  md:gap-12 h-full">
          <div className="text-center md:text-left md:col-span-2">
            <div className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_10px_rgba(var(--primary),0.5)]">
              Get In Touch
            </div>

            <h1 className="relative mb-8 mt-4 inline-block text-[2.8rem] font-semibold text-foreground md:text-[4rem]">
              Contact Us
              <span className="absolute -bottom-2 left-1/4 h-1 w-1/2 rounded-md bg-primary shadow-[0_0_15px_rgba(var(--primary),0.8)] md:left-0 md:w-2/5" />
            </h1>

            <h2 className="mb-8 text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
              We're here to help with all your drone needs
            </h2>

            <p className="mb-6 text-base font-normal leading-relaxed text-muted-foreground md:text-lg">
              Have questions or need assistance? Our expert team is ready to
              provide you with the support and information you need. Reach out
              to us through any of the channels below.
            </p>

            <ContactInfoCards />

            <ContactCtaButton />
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative h-auto w-[90%] overflow-hidden rounded-2xl border border-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.2)] md:w-full">
              <Image
                src="/assets/feature-img.jpg"
                alt="Contact Drone Rush"
                width={600}
                height={500}
                priority
                className="hidden md:block h-full w-full object-cover object-center"
              />
            </div>

            {/* Futuristic decorative elements */}

            <div className="absolute bottom-[5%] left-[10%] z-20 opacity-20 md:bottom-[15%] md:left-[15%]">
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
                className="md:w-[70px] md:h-[70px]"
              >
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  fill="var(--primary)"
                  opacity="0.3"
                />
                <circle
                  cx="25"
                  cy="25"
                  r="10"
                  fill="var(--primary)"
                  opacity="0.6"
                />
                <title>Futuristic circle decoration</title>
              </svg>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
