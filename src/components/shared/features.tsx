import Image from "next/image";
import PublicSectionTitle from "./public-section-title";

const Features = () => {
  const features = [
    {
      id: 1,
      title: "Mobile Device Supported",
      about:
        "When an unknown printer took a galley of type and scrambled it to make.",
      icon: "/assets/feature3-1.png",
    },
    {
      id: 2,
      title: "Highly Secure & Safe",
      about:
        "When an unknown printer took a galley of type and scrambled it to make.",
      icon: "/assets/feature3-2.png",
    },
    {
      id: 3,
      title: "Fast & Reliable",
      about:
        "When an unknown printer took a galley of type and scrambled it to make.",
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
          <PublicSectionTitle className="text-center md:text-left">
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
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
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
