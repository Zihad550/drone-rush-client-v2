"use client";

import CtaButton from "@/components/shared/cta-button";
import SectionContainer from "@/components/shared/SectionContainer";

const AccessibilityBanner = () => {
  return (
    <section className="relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-screen flex items-center before:content-[''] before:absolute before:top-[-50px] before:right-[-50px] before:w-[200px] before:h-[200px] before:rounded-full before:bg-[radial-gradient(circle,_rgba(59,130,246,0.13)_0%,_transparent_70%)] before:z-0 after:content-[''] after:absolute after:bottom-[-80px] after:left-[45%] after:w-[300px] after:h-[300px] after:rounded-full after:bg-[radial-gradient(circle,_rgba(59,130,246,0.08)_0%,_transparent_60%)] after:z-0 bg-[url(/assets/banner-bg.jpg)] dark:bg-[url(/assets/banner-bg.jpg)]">
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
          {/* Left Content */}
          <div className="my-auto text-white text-center md:text-left pr-0 md:pr-16 py-8 md:py-10">
            {/* Accessibility Badge */}
            <div className="inline-block mb-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold tracking-wider uppercase">
              WCAG 2.1 AA Compliant
            </div>

            {/* Main Heading */}
            <h1
              className="mt-4 mb-6 font-semibold text-4xl md:text-6xl relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-[25%] md:after:left-0 after:w-[50%] md:after:w-[40%] after:h-1 after:bg-primary after:rounded"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
            >
              Inclusive <br />
              Digital <br />
              Experience
            </h1>

            {/* Description */}
            <p
              className="mb-8 text-base md:text-lg text-white max-w-[90%] mx-auto md:mx-0"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
            >
              At Drone Rush, we are committed to making our platform accessible
              to everyone. Explore our accessibility features and standards that
              ensure an inclusive experience.
            </p>

            {/* CTA Button */}
            <CtaButton href="#features" showArrow>
              Learn More
            </CtaButton>
          </div>

          {/* Right Content - Accessibility Icons Grid */}
          <div className="flex justify-center items-center relative">
            <div className="grid grid-cols-2 gap-6 w-full max-w-md">
              <div className="rounded-2xl border border-primary/20 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] flex flex-col items-center text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                    >
                      <path
                        d="M12 2C13.1046 2 14 2.89543 14 4V5H16V7H14V5C14 4.44772 13.5523 4 13 4C12.4477 4 12 4.44772 12 5V7C12 7.55228 12.4477 8 13 8H15C16.1046 8 17 7.10457 17 6V4C17 2.89543 16.1046 2 15 2H12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12C2 10.8954 2.89543 10 4 10H20C21.1046 10 22 10.8954 22 12V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="7" cy="15" r="1" fill="currentColor" />
                      <circle cx="11" cy="15" r="1" fill="currentColor" />
                      <circle cx="15" cy="15" r="1" fill="currentColor" />
                      <circle cx="19" cy="15" r="1" fill="currentColor" />
                      <title>Keyboard icon</title>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-sm font-semibold text-foreground dark:text-white">
                  Keyboard Navigation
                </h3>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] flex flex-col items-center text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                    >
                      <path
                        d="M12 2C13.1046 2 14 2.89543 14 4V20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20V4C10 2.89543 10.8954 2 12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12C2 10.8954 2.89543 10 4 10H20C21.1046 10 22 10.8954 22 12V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <title>Screen Reader icon</title>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-sm font-semibold text-foreground dark:text-white">
                  Screen Reader Support
                </h3>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] flex flex-col items-center text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 6V12L16 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <title>High Contrast icon</title>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-sm font-semibold text-foreground dark:text-white">
                  High Contrast
                </h3>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary),0.2)] flex flex-col items-center text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                    >
                      <path
                        d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points="14,2 14,8 20,8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="16"
                        y1="13"
                        x2="8"
                        y2="13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="16"
                        y1="17"
                        x2="8"
                        y2="17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points="10,9 9,9 8,9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <title>Alt Text icon</title>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-sm font-semibold text-foreground dark:text-white">
                  Alt Text for Images
                </h3>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-[10%] md:top-[15%] right-[5%] md:right-[12%] w-[70px] md:w-[100px] h-[70px] md:h-[100px] rounded-full border-2 border-dashed border-blue-500 opacity-60 z-20" />
            <div className="absolute bottom-[5%] md:bottom-[15%] left-[10%] md:left-[15%] w-[50px] md:w-[70px] h-[50px] md:h-[70px] rounded-full bg-primary opacity-10 z-20" />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default AccessibilityBanner;
