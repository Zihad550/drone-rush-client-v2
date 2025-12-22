"use client";

import CareersBanner from "@/components/pages/careers/careers-banner";
import JobCard from "@/components/pages/careers/job-card";
import PublicSectionTitle from "@/components/shared/public-section-title";
import ReviewsCarousel from "@/components/shared/reviews-carousel";
import SectionContainer from "@/components/shared/SectionContainer";
import ScrollAnimation from "@/components/ui/scroll-animation";

export default function CareersPage() {
  return (
    <div className="relative animate-fade-in bg-background pb-8 md:pb-16">
      {/* Banner */}
      <div className="relative min-h-screen ">
        <div className="relative after:absolute after:-bottom-10 after:left-1/2 after:h-px after:w-3/5 after:-translate-x-1/2 after:rounded-lg after:bg-gradient-to-r after:from-transparent after:via-primary/20 after:to-transparent after:content-[''] after:shadow-[0_0_20px_rgba(var(--primary),0.3)]">
          <CareersBanner />
        </div>
      </div>

      {/* Open Positions */}
      <SectionContainer>
        <ScrollAnimation>
          <div id="open-positions" className="my-20 md:my-24 lg:my-32">
            <PublicSectionTitle variant="h2">Open Positions</PublicSectionTitle>
            <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <JobCard
                title="Frontend Developer"
                description="Build modern web interfaces with React and Next.js."
                location="Remote"
                type="Full-time"
              />
              <JobCard
                title="Backend Engineer"
                description="Develop scalable APIs with Node.js and databases."
                location="On-site"
                type="Full-time"
              />
              <JobCard
                title="UI/UX Designer"
                description="Design user-centered interfaces for drone tech."
                location="Hybrid"
                type="Full-time"
              />
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
          role="img"
          aria-labelledby="wave-divider-title"
        >
          <title id="wave-divider-title">Decorative wave divider</title>
          <path
            d="M0,10 Q50,0 100,10 T200,10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Why Join Us */}
      <ScrollAnimation>
        <div className="my-20 md:my-24 lg:my-32">
          <SectionContainer>
            <PublicSectionTitle variant="h2">
              Why Join Drone Rush?
            </PublicSectionTitle>
            <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    role="img"
                    aria-labelledby="innovative-title"
                  >
                    <title id="innovative-title">
                      Lightning bolt icon for innovative projects
                    </title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Innovative Projects
                </h3>
                <p className="text-muted-foreground">
                  Work on cutting-edge drone technology and AI solutions.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    role="img"
                    aria-labelledby="collaborative-title"
                  >
                    <title id="collaborative-title">
                      People icon for collaborative culture
                    </title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Collaborative Culture
                </h3>
                <p className="text-muted-foreground">
                  Join a team of passionate professionals in a supportive
                  environment.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    role="img"
                    aria-labelledby="growth-title"
                  >
                    <title id="growth-title">
                      Checkmark icon for growth opportunities
                    </title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  Growth Opportunities
                </h3>
                <p className="text-muted-foreground">
                  Continuous learning and career advancement in a fast-growing
                  industry.
                </p>
              </div>
            </div>
          </SectionContainer>
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
          role="img"
          aria-labelledby="wave-divider-title"
        >
          <title id="wave-divider-title">Decorative wave divider</title>
          <path
            d="M0,10 Q50,0 100,10 T200,10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Application Process */}
      <ScrollAnimation>
        <div className="my-20 md:my-24 lg:my-32">
          <SectionContainer>
            <PublicSectionTitle variant="h2">
              Application Process
            </PublicSectionTitle>
            <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold">Apply</h3>
                <p className="text-muted-foreground">
                  Submit your resume and portfolio through our careers page.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold">Interview</h3>
                <p className="text-muted-foreground">
                  Participate in technical and cultural fit interviews.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold">Join Us</h3>
                <p className="text-muted-foreground">
                  Receive your offer and start your journey with Drone Rush.
                </p>
              </div>
            </div>
          </SectionContainer>
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
          role="img"
          aria-labelledby="wave-divider-title"
        >
          <title id="wave-divider-title">Decorative wave divider</title>
          <path
            d="M0,10 Q50,0 100,10 T200,10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Reviews */}
      <ScrollAnimation>
        <div className="my-20 md:my-24 lg:my-32">
          <ReviewsCarousel />
        </div>
      </ScrollAnimation>
    </div>
  );
}
