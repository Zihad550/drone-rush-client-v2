"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What types of drones do you offer?",
    answer:
      "We offer a wide range of drones including consumer, professional, and industrial models from leading manufacturers. Our selection includes quadcopters, fixed-wing drones, and specialized drones for photography, surveying, and delivery.",
  },
  {
    question: "Do you provide drone training and certification?",
    answer:
      "Yes, we offer comprehensive drone training programs and certification courses. Our expert instructors will guide you through FAA regulations, flight safety, and advanced piloting techniques to ensure you're fully prepared.",
  },
  {
    question: "What is your warranty policy?",
    answer:
      "We provide manufacturer warranties on all our drones, typically ranging from 1-2 years. Additionally, we offer our own service warranty for repairs and maintenance, ensuring your investment is protected.",
  },
  {
    question: "Can you customize drones for specific applications?",
    answer:
      "Absolutely! We specialize in customizing drones for various industries including agriculture, construction, search and rescue, and filmmaking. Our team will work with you to design the perfect solution.",
  },
  {
    question: "How do I maintain my drone?",
    answer:
      "Regular maintenance is crucial for drone longevity. We recommend cleaning after each flight, checking propeller balance, updating firmware, and professional servicing every 50-100 flight hours. Our technicians are available for maintenance services.",
  },
  {
    question: "What are your shipping and return policies?",
    answer:
      "We ship worldwide with fast, tracked delivery. Most orders arrive within 3-7 business days. We offer a 30-day return policy on unused items, and our customer service team will assist you throughout the process.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Find answers to common questions about our drones and services
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="relative overflow-hidden rounded-2xl border border-primary/20 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40"
          >
            {/* Hexagonal background pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg
                width="100%"
                height="100%"
                className="h-full w-full"
                viewBox="0 0 400 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="hex-pattern"
                    x="0"
                    y="0"
                    width="50"
                    height="43.3"
                    patternUnits="userSpaceOnUse"
                  >
                    <polygon
                      points="25,0 50,14.43 50,43.3 25,57.73 0,43.3 0,14.43"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-primary"
                    />
                  </pattern>
                </defs>
                <title>Hexagonal pattern background</title>
                <rect width="100%" height="100%" fill="url(#hex-pattern)" />
              </svg>
            </div>

            <div className="relative z-10">
              <button
                type="button"
                onClick={() => toggleFAQ(faqs.indexOf(faq))}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-primary/5"
                aria-expanded={openIndex === faqs.indexOf(faq)}
                aria-controls={`faq-answer-${faqs.indexOf(faq)}`}
              >
                <span className="text-lg font-semibold text-foreground">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-primary transition-transform duration-200 ${
                    openIndex === faqs.indexOf(faq) ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === faqs.indexOf(faq) && (
                <div
                  id={`faq-answer-${faqs.indexOf(faq)}`}
                  className="border-t border-primary/10 px-6 pb-6 pt-4"
                >
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
