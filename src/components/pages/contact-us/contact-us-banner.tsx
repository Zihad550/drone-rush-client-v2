"use client";

import Image from "next/image";
import CtaButton from "@/components/shared/cta-button";
import PublicSectionTitle from "@/components/shared/public-section-title";
import SectionContainer from "@/components/shared/SectionContainer";
import ContactInfoCards from "./ContactInfoCards";

function scrollToContactForm() {
  const element = document.getElementById("contact-form");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export default function ContactUsBanner() {
  return (
    <div className="relative overflow-hidden w-screen h-[calc(100vh-4rem)] bg-gradient-to-br from-primary/10 to-primary/20 dark:from-red-500/10 dark:to-black/10 backdrop-blur-sm">
      {/* Hexagonal decorative elements */}
      <div className="absolute -top-[30px] -right-[30px] z-0 opacity-20">
        <svg
          width="150"
          height="130"
          viewBox="0 0 150 130"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="banner-particle-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stop-color="var(--primary)"
                stop-opacity="0.3"
              />
              <stop
                offset="100%"
                stop-color="var(--primary)"
                stop-opacity="0.1"
              />
            </linearGradient>
          </defs>
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
          <defs>
            <linearGradient
              id="banner-particle-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stop-color="var(--primary)"
                stop-opacity="0.3"
              />
              <stop
                offset="100%"
                stop-color="var(--primary)"
                stop-opacity="0.1"
              />
            </linearGradient>
          </defs>
          <polygon
            points="100,0 200,57.74 200,115.47 100,173 0,115.47 0,57.74"
            fill="url(#banner-particle-gradient)"
          />
          <title>Decorative hexagon</title>
        </svg>
      </div>

      <SectionContainer className="relative z-10 h-full">
        <div className="flex flex-col md:flex-row  items-center justify-center   gap-8  md:gap-12 h-full">
          <div className="text-left md:col-span-2">
            <div className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_10px_rgba(var(--primary),0.5)]">
              Get In Touch
            </div>

            <PublicSectionTitle variant="h1" className="mb-8 mt-4">
              Contact Us
            </PublicSectionTitle>

            <h2 className="mb-8 text-lg font-light leading-relaxed text-muted-foreground dark:text-gray-200 md:text-xl">
              Get in Touch with Drone Rush
            </h2>

            <p className="mb-6 text-base font-normal leading-relaxed text-muted-foreground dark:text-gray-200 md:text-lg">
              Have questions or need assistance? Our expert team is ready to
              provide you with the support and information you need. Reach out
              to us through any of the channels below.
            </p>

            <ContactInfoCards />

            <CtaButton onClick={scrollToContactForm}>
              Initiate Contact
            </CtaButton>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative h-auto w-[90%] overflow-hidden rounded-2xl border border-primary/20 dark:border-red-500/20 shadow-[0_0_30px_rgba(var(--primary),0.2)] md:w-full">
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
