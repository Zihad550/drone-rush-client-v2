"use client";

import PromotionCard from "./promotion-card";

const promotions = [
  {
    title: "Elite Drone Starter Kit",
    description:
      "Perfect for beginners. Includes drone, controller, and accessories.",
    discount: "40% OFF",
    image: "/assets/drone-card.jpg",
    cta: "Shop Now",
  },
  {
    title: "Pro Racing Bundle",
    description: "High-speed racing drone with FPV goggles and spare parts.",
    discount: "30% OFF",
    image: "/assets/drone-card.jpg",
    cta: "Get Bundle",
  },
  {
    title: "Photography Drone Package",
    description:
      "4K camera drone with gimbal stabilization and editing software.",
    discount: "50% OFF",
    image: "/assets/drone-card.jpg",
    cta: "Explore",
  },
  {
    title: "Holiday Mega Deal",
    description: "Complete drone ecosystem with accessories and training.",
    discount: "Buy 2 Get 1 Free",
    image: "/assets/drone-card.jpg",
    cta: "Claim Deal",
  },
  {
    title: "Enterprise Solutions",
    description: "Commercial drones for mapping, surveying, and inspections.",
    discount: "25% OFF",
    image: "/assets/drone-card.jpg",
    cta: "Contact Sales",
  },
  {
    title: "Limited Time Flash Sale",
    description: "Flash sale on select models. Limited stock available.",
    discount: "Up to 60% OFF",
    image: "/assets/drone-card.jpg",
    cta: "View Sale",
  },
];

export default function PromotionsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {promotions.map((promo, index) => (
        <div
          key={promo.title}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <PromotionCard {...promo} />
        </div>
      ))}
    </div>
  );
}
