import { Archive, Headset, PiggyBank, ShoppingBag, Truck } from "lucide-react";

export default function WhyUs() {
  const services = [
    {
      id: 1,
      service: "Complete buyer supply store",
      icon: ShoppingBag,
    },
    {
      id: 2,
      service: "Same day dispatch on all orders",
      icon: Archive,
    },
    {
      id: 3,
      service: "Free delivery on all orders",
      icon: Truck,
    },
    {
      id: 4,
      service: "Professional advice and support",
      icon: Headset,
    },
    {
      id: 5,
      service: "Fall savings are in the air",
      icon: PiggyBank,
    },
  ];

  return (
    <div className="mb-8 px-0 py-0 text-center">
      <h4 className="mb-1.5 text-[22px] font-bold tracking-tighter text-primary sm:text-[28px]">
        Why Choose Us?
      </h4>
      <div className="mx-auto mb-8 h-1 w-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500" />
      <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fit,minmax(210px,1fr))] sm:gap-8">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="group flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 shadow-[0_2px_16px_rgba(59,130,246,0.07)] transition-all duration-200 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_8px_32px_rgba(59,130,246,0.13)] sm:p-8"
            >
              <div className="mb-4">
                <Icon
                  className="h-10 w-10 text-cyan-500 sm:h-14 sm:w-14"
                  style={{
                    stroke: "url(#blue-cyan-gradient)",
                  }}
                />
                {/* SVG Gradient Definition for Lucide Icons */}
                <svg width="0" height="0">
                  <title>Gradient definition</title>
                  <linearGradient
                    id="blue-cyan-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </svg>
              </div>
              <p className="mt-1 text-center text-[17px] font-medium text-gray-700">
                {service.service}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
