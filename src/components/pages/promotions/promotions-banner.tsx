"use client";

import Image from "next/image";

export default function PromotionsBanner() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/50 to-secondary overflow-hidden after:absolute after:-bottom-10 after:left-1/2 after:h-px after:w-3/5 after:-translate-x-1/2 after:rounded-lg after:bg-gradient-to-r after:from-transparent after:via-primary/20 after:to-transparent after:content-[''] after:shadow-[0_0_20px_rgba(var(--primary),0.3)]">
      <div className="absolute inset-0 bg-background/20"></div>
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in-up">
          Unleash the Future of Flight
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in-up animation-delay-200">
          Discover unbeatable deals on cutting-edge drones. Elevate your aerial
          adventures with our exclusive promotions.
        </p>
        <div className="animate-fade-in-up animation-delay-400">
          <Image
            src="/assets/drone-d3.png"
            alt="Futuristic Drone"
            width={400}
            height={300}
            className="mx-auto drop-shadow-2xl"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-16 md:h-24 text-background"
          aria-hidden="true"
        >
          <title>Wave divider</title>
          <path
            fill="currentColor"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
