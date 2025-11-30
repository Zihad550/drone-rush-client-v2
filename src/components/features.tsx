const Features = () => {
  const features = [
    {
      id: 1,
      title: "Mobile Device Supported",
      about:
        "When an unknown printer took a galley of type and scrambled it to make.",
      src: "/assets/feature3-1.png",
    },
    {
      id: 2,
      title: "Mobile Device Supported",
      about:
        "When an unknown printer took a galley of type and scrambled it to make.",
      src: "/assets/feature3-2.png",
    },
    {
      id: 3,
      title: "Mobile Device Supported",
      about:
        "When an unknown printer took a galley of type and scrambled it to make.",
      src: "/assets/feature3-3.png",
    },
  ];

  return (
    <div className="my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img className="w-full h-auto" src="/assets/feature-img.jpg" alt="" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-8">Features</h1>
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center mb-6">
              <div className="mr-4">
                <img src={feature.src} alt="" />
              </div>
              <div>
                <h5 className="text-xl font-semibold mb-2">{feature.title}</h5>
                <p className="text-gray-600">{feature.about}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
