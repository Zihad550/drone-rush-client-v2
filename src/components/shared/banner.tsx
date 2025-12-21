"use client";

import CtaButton from "@/components/shared/cta-button";
import DroneD3 from "./drone-d3";
import SectionContainer from "./SectionContainer";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-screen flex items-center before:content-[''] before:absolute before:top-[-50px] before:right-[-50px] before:w-[200px] before:h-[200px] before:rounded-full before:bg-[radial-gradient(circle,_rgba(59,130,246,0.13)_0%,_transparent_70%)] before:z-0 after:content-[''] after:absolute after:bottom-[-80px] after:left-[45%] after:w-[300px] after:h-[300px] after:rounded-full after:bg-[radial-gradient(circle,_rgba(59,130,246,0.08)_0%,_transparent_60%)] after:z-0 bg-[url(/assets/home-banner-light-bg.png)] dark:bg-[url(/assets/banner-bg.jpg)]">
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
          {/* Left Content */}
          <div className="my-auto text-white text-center md:text-left pr-0 md:pr-16   py-8 md:py-10">
            {/* Premium Quality Badge */}
            <div className="inline-block mb-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold tracking-wider uppercase">
              Premium Quality
            </div>

            {/* Main Heading */}
            <h1
              className="mt-4 mb-6 font-semibold text-4xl md:text-6xl relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-[25%] md:after:left-0 after:w-[50%] md:after:w-[40%] after:h-1 after:bg-primary after:rounded"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
            >
              Professional <br />
              Drone For Every <br />
              Business
            </h1>

            {/* Description */}
            <p
              className="mb-8 text-base md:text-lg text-white max-w-[90%] mx-auto md:mx-0"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
            >
              Welcome to the best drone website in the world. We have the most
              up-to-date information on drones for sale and new products
              everyday.
            </p>

            {/* CTA Button */}
            <CtaButton href="/drones" showArrow>
              Shop Now
            </CtaButton>
          </div>

          {/* Right Content - Drone Image */}
          <div className="flex justify-center items-center relative">
            <div className="relative w-[90%] md:w-full h-auto rounded-2xl overflow-hidden flex justify-center items-center before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[linear-gradient(135deg,_rgba(79,196,207,0.3)_0%,_rgba(79,196,207,0)_50%)] before:z-10">
              <DroneD3
                width={500}
                height={420}
                className="max-w-full max-h-full object-contain transition-all duration-500 ease-in-out scale-[1.01] hover:scale-[1.04]"
                style={{
                  filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.3))",
                }}
              />
            </div>

            {/* Decorative Circle 1 */}
            <div className="absolute top-[10%] md:top-[15%] right-[5%] md:right-[12%] w-[70px] md:w-[100px] h-[70px] md:h-[100px] rounded-full border-2 border-dashed border-blue-500 opacity-60 z-20" />

            {/* Decorative Circle 2 */}
            <div className="absolute bottom-[5%] md:bottom-[15%] left-[10%] md:left-[15%] w-[50px] md:w-[70px] h-[50px] md:h-[70px] rounded-full bg-primary opacity-10 z-20" />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default Banner;
