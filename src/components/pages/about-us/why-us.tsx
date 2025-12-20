import { Archive, Headset, PiggyBank, ShoppingBag, Truck } from "lucide-react";
import PublicSectionTitle from "../../shared/public-section-title";
import SectionContainer from "../../shared/SectionContainer";

export default function WhyUs() {
  const services = [
    {
      id: 1,
      service: "Complete Buyer Supply Store",
      description:
        "We offer a comprehensive range of drone supplies and accessories for all your aerial needs.",
      icon: ShoppingBag,
    },
    {
      id: 2,
      service: "Same Day Dispatch on All Orders",
      description:
        "Get your orders dispatched the same day, ensuring quick turnaround and minimal wait times.",
      icon: Archive,
    },
    {
      id: 3,
      service: "Free Delivery on All Orders",
      description:
        "Enjoy complimentary shipping on every purchase, no matter the order size or value.",
      icon: Truck,
    },
    {
      id: 4,
      service: "Professional Advice and Support",
      description:
        "Our expert team provides personalized guidance and 24/7 support for all drone-related queries.",
      icon: Headset,
    },
    {
      id: 5,
      service: "Fall Savings Are in the Air",
      description:
        "Take advantage of seasonal promotions and discounts to save on top-quality drone products.",
      icon: PiggyBank,
    },
  ];

  return (
    <SectionContainer>
      <div className="text-center">
        <PublicSectionTitle variant="h4" className="text-[22px] md:text-[32px]">
          Why Choose Drone Rush?
        </PublicSectionTitle>
        <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
        <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group rounded-2xl border border-primary/20 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary),0.2)]"
              >
                {/* Hexagonal overlay */}
                <div className="absolute inset-0 opacity-5">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon
                      points="50,0 100,25 100,75 50,100 0,75 0,25"
                      fill="currentColor"
                      className="text-primary"
                    />
                    <title>Hexagonal overlay</title>
                  </svg>
                </div>
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {service.service}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
}
