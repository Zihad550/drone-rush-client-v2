"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs = [
    {
      id: 1,
      question: "What is a drone?",
      answer:
        "Drones are commonly referred to as Unmanned Aerial Vehicles ( UAV ) are automated aircraft operating systems operated from a remote location or without direct human control.",
    },
    {
      id: 2,
      question: "What is the best drone?",
      answer:
        " DJI is one of the top consumer drone manufacturers, known mainly for their Mavic series . The Mavi series has become the quintessential drone for new to intermediate pilots and videographers and the simultaneous launch in late 2018 of the Mavic 2 Pro and Mavic 2 Zoom was huge news in the industry.",
    },
    {
      id: 3,
      question: "Is it difficult to fly a drone?",
      answer:
        "There is no doubt that autonomy, especially the ability for a GPS-enabled drone to hover perfectly in place, makes flying extremely easy. In truth, almost anyone can fly the DJI Mavic Pro – tap the button to take off, it hovers with extreme accuracy, then press the button to land almost exactly where you took off.",
    },
    {
      id: 4,
      question: "How long can drones fly for?",
      answer:
        "Small Drones can have anywhere from 700 to 1,300 feet of range. Medium drones can have up to 3.1 miles or 5 kilometres. High-end drones can be programmed with GPS capabilities allowing them to more accurately stay within the set boundaries set by the controller.",
    },
    {
      id: 5,
      question: "Can I put a camera on my drone?",
      answer:
        "Buying a drone that comes with support to add your own camera is a great option for photographers and videographers that have a greater concern for the quality of the images and video they intend to capture. Of course, this option does come with its own bag of goodies and bummers.",
    },
  ];

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="mb-20">
      <h2 className="mx-auto mb-8 text-center text-4xl font-bold text-gray-900 dark:text-white">
        Common Questions
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Left - Video */}
        <div className="overflow-hidden rounded-2xl">
          <video
            width="100%"
            height="auto"
            controls
            className="rounded-2xl"
          >
            <source src="/assets/faq.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Right - FAQ Accordions */}
        <div className="flex flex-col justify-center space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-200 ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq.id ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
