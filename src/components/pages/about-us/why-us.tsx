const services = [
  {
    icon: "🛍",
    title: "Complete Buyer Supply Store",
    desc: "We offer a comprehensive range of drone supplies and accessories for all your aerial needs.",
  },
  {
    icon: "📦",
    title: "Same Day Dispatch on All Orders",
    desc: "Get your orders dispatched the same day, ensuring quick turnaround and minimal wait times.",
  },
  {
    icon: "🚚",
    title: "Free Delivery on All Orders",
    desc: "Enjoy complimentary shipping on every purchase, no matter the order size or value.",
  },
  {
    icon: "🎧",
    title: "Professional Advice and Support",
    desc: "Our expert team provides personalized guidance and 24/7 support for all drone-related queries.",
  },
  {
    icon: "🐷",
    title: "Fall Savings Are in the Air",
    desc: "Take advantage of seasonal promotions and discounts to save on top-quality drone products.",
  },
];

export default function WhyUs() {
  return (
    <section className="mx-auto max-w-[1180px] px-10">
      <div className="mb-8">
        <h2 className="inline-block font-chakra text-[32px] font-bold text-dr-text">
          Why Choose Drone Rush?
          <span className="mt-2 block h-[3px] w-[170px] rounded-sm bg-gradient-to-r from-dr-red to-transparent" />
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="relative overflow-hidden rounded-[13px] border border-dr-bd-1 bg-dr-surface p-[26px]"
          >
            {/* Hexagon icon */}
            <div
              className="mb-4 flex h-14 w-[52px] items-center justify-center border border-dr-red/30 bg-gradient-to-b from-dr-red/[0.16] to-transparent text-[#ef5568]"
              style={{
                clipPath:
                  "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
              }}
            >
              <span className="text-[22px]">{service.icon}</span>
            </div>
            <h3 className="mb-2 font-poppins text-base font-semibold text-dr-text">
              {service.title}
            </h3>
            <p className="text-[13px] leading-[1.55] text-dr-text-3">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
