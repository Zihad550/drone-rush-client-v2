import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionContainer from "@/components/shared/SectionContainer";
import { Button } from "@/components/ui/button";

export default function AboutUsBanner() {
  return (
    <div className="relative overflow-hidden rounded-b-2xl bg-gradient-to-br from-[rgba(79,196,207,0.08)] to-[rgba(79,196,207,0.15)] min-h-screen flex flex-col items-center justify-center">
      {/* Decorative background elements */}
      <div className="absolute -top-[50px] -right-[50px] z-0 h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,rgba(var(--primary),0.13)_0%,transparent_70%)]" />
      <div className="absolute -bottom-[80px] left-[45%] z-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(var(--primary),0.08)_0%,transparent_60%)]" />

      <SectionContainer className="h-full" paddingX={false}>
        <div className="h-full grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 justify-center">
          <div className="text-center   md:text-left">
            <div className="mb-2 inline-block animate-pulse rounded-full bg-primary px-3 py-1 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_10px_rgba(var(--primary),0.5)]">
              Our Story
            </div>

            <h1 className="relative mb-8 mt-4 inline-block font-['Courgette'] text-[2.8rem] font-semibold text-foreground md:text-[4rem]">
              Drone Rush
              <span className="absolute -bottom-2 left-1/4 h-1 w-1/2 rounded-md bg-primary shadow-[0_0_15px_rgba(var(--primary),0.8)] md:left-0 md:w-2/5" />
            </h1>

            <h2 className="mb-8 text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
              Elevating possibilities with cutting-edge drone technology since
              2010
            </h2>

            <p className="mb-6 text-base font-normal leading-relaxed text-muted-foreground md:text-lg">
              As industry pioneers, we provide professionals with
              state-of-the-art drones to capture breathtaking aerial footage and
              accomplish complex tasks with precision and reliability.
            </p>

            <div className="mt-8 mb-6 rounded-xl border-l-4 border-primary bg-[rgba(79,196,207,0.07)] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <p className="flex items-center gap-2 text-base font-medium text-foreground md:text-lg">
                <span className="font-bold text-primary">★</span>
                Our expert support team is available 10:00–18:00 GMT+2
                (Monday–Friday), ready to assist with all your drone needs.
              </p>
            </div>

            <Link href="/contact-us">
              <Button
                className="mt-4 px-6 py-6 text-base font-medium shadow-[0_4px_14px_rgba(79,196,207,0.4)] cursor-pointer"
                type="button"
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative h-auto w-full overflow-hidden rounded-2xl">
              {/* Image overlays */}
              <div className="absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-br from-[rgba(79,196,207,0.3)] via-transparent to-transparent" />
              <div className="absolute right-0 bottom-0 z-10 h-[40%] w-[70%] bg-gradient-to-bl from-[rgba(79,196,207,0.2)] via-transparent to-transparent" />

              <Image
                src="/assets/about-us-bg.png"
                alt="Drone Rush - Advanced Drone Technology"
                width={600}
                height={420}
                className="h-full w-full object-cover object-center transition-all duration-500 hover:scale-105 hover:contrast-110 hover:brightness-105"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-[5%] right-4 z-20 h-[70px] w-[70px] rounded-full border-2 border-dashed border-primary opacity-60 md:top-[12%] md:right-8 md:h-[100px] md:w-[100px]" />
            <div className="absolute bottom-[5%] left-4 z-20 h-[50px] w-[50px] rounded-full bg-primary opacity-10 md:bottom-[15%] md:left-8 md:h-[70px] md:w-[70px]" />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
