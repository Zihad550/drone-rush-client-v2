import Image from "next/image";
import CtaButton from "@/components/shared/cta-button";
import PublicSectionTitle from "@/components/shared/public-section-title";
import SectionContainer from "@/components/shared/SectionContainer";

export default function CareersBanner() {
  return (
    <div className="relative overflow-hidden rounded-b-2xl bg-gradient-to-br from-primary/10 to-primary/20 dark:from-red-500/10 dark:to-black/10 backdrop-blur-sm min-h-screen flex flex-col items-center justify-center">
      {/* Decorative background elements */}
      <div className="absolute -top-[50px] -right-[50px] z-0 h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,rgba(var(--primary),0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(239,68,68,0.08)_0%,transparent_70%)]" />
      <div className="absolute -bottom-[80px] left-[45%] z-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(var(--primary),0.05)_0%,transparent_60%)] dark:bg-[radial-gradient(circle,rgba(239,68,68,0.03)_0%,transparent_60%)]" />

      <SectionContainer className="h-full" paddingX={false}>
        <div className="h-full grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 justify-center px-4">
          <div className="text-center md:text-left">
            <div className="mb-2 inline-block animate-pulse rounded-full bg-primary px-3 py-1 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_0_10px_rgba(var(--primary),0.5)]">
              Careers
            </div>

            <PublicSectionTitle
              variant="h1"
              align="left"
              className="font-['Courgette'] text-[2.8rem] md:text-[4rem] mb-8 mt-4 font-semibold text-foreground dark:text-white"
            >
              Join Drone Rush
            </PublicSectionTitle>

            <h2 className="mb-8 text-lg font-light leading-relaxed text-muted-foreground dark:text-gray-200 md:text-xl">
              Shape the future of aerial technology
            </h2>

            <p className="mb-6 text-base font-normal leading-relaxed text-muted-foreground dark:text-gray-200 md:text-lg">
              Be part of a dynamic team innovating in drone technology. We're
              looking for passionate individuals ready to push boundaries and
              make an impact.
            </p>

            <div className="mt-8 mb-6 rounded-xl border-l-4 border-primary dark:border-red-500 bg-white/5 dark:bg-black/10 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <p className="flex items-center gap-2 text-base font-medium text-foreground dark:text-gray-100 md:text-lg">
                <span className="font-bold text-primary">★</span>
                Grow your career in a fast-evolving industry with endless
                possibilities.
              </p>
            </div>

            <CtaButton href="#open-positions" showArrow>
              View Open Positions
            </CtaButton>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative h-auto w-full overflow-hidden rounded-2xl">
              {/* Image overlays */}
              <div className="absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-br from-primary/20 dark:from-red-500/20 via-transparent to-transparent" />
              <div className="absolute right-0 bottom-0 z-10 h-[40%] w-[70%] bg-gradient-to-bl from-primary/15 dark:from-red-500/15 via-transparent to-transparent" />

              <Image
                src="/assets/about-us-bg.png" // Reuse or change to careers image
                alt="Join Drone Rush Team - Innovative Drone Careers"
                width={600}
                height={420}
                className="h-full w-full object-cover object-center transition-all duration-500 hover:scale-105 hover:contrast-110 hover:brightness-105"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-[5%] right-4 z-20 h-[70px] w-[70px] rounded-full border-2 border-dashed border-primary dark:border-red-500 opacity-60 md:top-[12%] md:right-8 md:h-[100px] md:w-[100px]" />
            <div className="absolute bottom-[5%] left-4 z-20 h-[50px] w-[50px] rounded-full bg-primary dark:bg-red-500 opacity-10 md:bottom-[15%] md:left-8 md:h-[70px] md:w-[70px]" />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
