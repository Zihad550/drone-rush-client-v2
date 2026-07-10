import Image from "next/image";
import PublicSectionTitle from "./public-section-title";

const Features = () => {
  const features = [
    {
      id: 1,
      title: "Mobile Device Supported",
      about:
        "Control and monitor your drone from any modern smartphone or tablet with our companion app.",
      icon: "/assets/feature3-1.png",
    },
    {
      id: 2,
      title: "Highly Secure & Safe",
      about:
        "Encrypted flight data and geofencing keep your equipment and footage protected at all times.",
      icon: "/assets/feature3-2.png",
    },
    {
      id: 3,
      title: "Fast & Reliable",
      about:
        "Same-day dispatch and rigorously tested hardware you can depend on, mission after mission.",
      icon: "/assets/feature3-3.png",
    },
  ];

  return (
    <section className="my-20">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Left - Feature Image */}
        <div className="relative h-[400px] w-full overflow-hidden rounded-2xl md:h-auto">
          <Image
            src="/assets/feature-img.jpg"
            alt="Drone Features"
            fill
            className="object-cover"
          />
        </div>

        {/* Right - Features List */}
        <div className="flex flex-col justify-center space-y-8">
          <PublicSectionTitle eyebrow="Why DroneRush">
            Features
          </PublicSectionTitle>

          {features.map((feature) => (
            <div key={feature.id} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-foreground dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  {feature.about}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
