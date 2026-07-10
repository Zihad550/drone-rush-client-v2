"use client";

import CareersBanner from "@/components/pages/careers/careers-banner";
import JobCard from "@/components/pages/careers/job-card";
import ReviewsCarousel from "@/components/shared/reviews-carousel";
import V2SectionHeading from "@/components/shared/v2-section-heading";
import ScrollAnimation from "@/components/ui/scroll-animation";

const openings = [
  {
    title: "Frontend Developer",
    description: "Build modern web interfaces with React and Next.js.",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Backend Engineer",
    description: "Develop scalable APIs with Node.js and databases.",
    location: "On-site",
    type: "Full-time",
  },
  {
    title: "UI/UX Designer",
    description: "Design user-centered interfaces for drone tech.",
    location: "Hybrid",
    type: "Full-time",
  },
];

const perks = [
  {
    icon: "⚡",
    title: "Innovative Projects",
    desc: "Work on cutting-edge drone technology and AI solutions that ship to real pilots.",
  },
  {
    icon: "✦",
    title: "Collaborative Culture",
    desc: "Join a team of passionate professionals in a supportive, low-ego environment.",
  },
  {
    icon: "◈",
    title: "Growth Opportunities",
    desc: "Continuous learning and career advancement in a fast-growing industry.",
  },
];

const steps = [
  {
    title: "Apply",
    desc: "Submit your resume and portfolio through our careers page.",
  },
  {
    title: "Interview",
    desc: "Meet the team for technical and cultural-fit conversations.",
  },
  {
    title: "Join Us",
    desc: "Receive your offer and start your journey with Drone Rush.",
  },
];

export default function CareersPage() {
  return (
    <div className="animate-fade-in bg-background">
      <CareersBanner />

      {/* Open Positions */}
      <ScrollAnimation>
        <section
          id="open-positions"
          className="mx-auto max-w-[1180px] px-10 py-[46px]"
        >
          <V2SectionHeading
            eyebrow="Open roles"
            title="Open Positions"
            subtitle="Find your seat in the cockpit. All roles are full-time with flexible location options."
            barWidth={140}
            className="mb-8"
          />
          <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {openings.map((job) => (
              <JobCard key={job.title} {...job} />
            ))}
          </div>
        </section>
      </ScrollAnimation>

      {/* Why Join */}
      <ScrollAnimation>
        <section className="mx-auto max-w-[1180px] px-10 py-[46px]">
          <V2SectionHeading
            eyebrow="Why us"
            title="Why Join Drone Rush?"
            barWidth={170}
            className="mb-8"
          />
          <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="rounded-[13px] border border-dr-bd-1 bg-dr-surface p-[26px]"
              >
                <div
                  className="mb-4 flex h-14 w-[52px] items-center justify-center border border-dr-red/30 bg-gradient-to-b from-dr-red/[0.16] to-transparent text-[#ef5568]"
                  style={{
                    clipPath:
                      "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
                  }}
                >
                  <span className="text-[22px]">{perk.icon}</span>
                </div>
                <h3 className="mb-2 font-poppins text-base font-semibold text-dr-text">
                  {perk.title}
                </h3>
                <p className="text-[13px] leading-[1.55] text-dr-text-3">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollAnimation>

      {/* Application Process */}
      <ScrollAnimation>
        <section className="mx-auto max-w-[1180px] px-10 py-[46px]">
          <V2SectionHeading
            eyebrow="How it works"
            title="Application Process"
            barWidth={180}
            className="mb-8"
          />
          <div className="grid gap-[22px] sm:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="rounded-[13px] border border-dr-bd-1 bg-dr-surface p-[26px]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-dr-red/30 bg-dr-red/[0.12] font-chakra text-lg font-bold text-dr-red">
                  {i + 1}
                </div>
                <h3 className="mb-2 font-poppins text-base font-semibold text-dr-text">
                  {step.title}
                </h3>
                <p className="text-[13px] leading-[1.55] text-dr-text-3">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollAnimation>

      {/* Reviews */}
      <ScrollAnimation>
        <div className="pb-[76px] pt-[30px]">
          <ReviewsCarousel />
        </div>
      </ScrollAnimation>
    </div>
  );
}
