"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PublicSectionTitle from "./public-section-title";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQProps {
  faqs?: FAQItem[];
  title?: string;
  showVideo?: boolean;
  layout?: "split" | "full";
  variant?: "default" | "patterned";
}

const defaultFaqs: FAQItem[] = [
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

function FAQ({
  faqs = defaultFaqs,
  title = "Common Questions",
  showVideo = true,
  layout = "split",
  variant = "default",
}: FAQProps) {
  const [openId, setOpenId] = useState<number | null>(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const newProgress =
      faqs.length > 1 ? (currentIndex / (faqs.length - 1)) * 100 : 0;
    setProgress(newProgress);
  }, [currentIndex, faqs.length]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (isInView) {
        const delta = e.deltaY > 0 ? 1 : -1;
        const newIndex = currentIndex + delta;
        const atBoundary =
          (delta > 0 && currentIndex === faqs.length - 1) ||
          (delta < 0 && currentIndex === 0);

        if (atBoundary) {
          // Allow normal scroll, don't prevent
          return;
        }

        e.preventDefault();
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (newIndex >= 0 && newIndex < faqs.length) {
            setCurrentIndex(newIndex);
            setOpenId(faqs[newIndex].id);
          }
        }, 100);
      }
    };

    if (isInView) {
      window.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeoutId);
    };
  }, [isInView, currentIndex, faqs]);

  const toggleAccordion = (id: number, index: number) => {
    setOpenId(openId === id ? null : id);
    setCurrentIndex(index);
  };

  return (
    <section ref={containerRef} className="mb-20">
      <PublicSectionTitle>{title}</PublicSectionTitle>

      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div
        className={
          layout === "split"
            ? "grid grid-cols-1 gap-8 md:grid-cols-2"
            : "space-y-4"
        }
      >
        {/* Left - Video */}
        {showVideo && (
          <div className="overflow-hidden rounded-2xl">
            <video width="100%" height="auto" controls className="rounded-2xl">
              <source src="/assets/faq.mp4" type="video/mp4" />
              <track
                kind="captions"
                src="/assets/faq-captions.vtt"
                srcLang="en"
                label="English"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* FAQ Accordions */}
        <div
          className={
            layout === "split" ? "flex flex-col justify-center space-y-3" : ""
          }
        >
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={
                variant === "patterned"
                  ? `relative overflow-hidden rounded-2xl border border-primary/20 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 ${index === currentIndex ? "ring-2 ring-primary" : ""}`
                  : `overflow-hidden rounded-2xl border border-white/20 dark:border-red-500/30 bg-white/10 dark:bg-black/20 backdrop-blur-md shadow-xl shadow-blue-500/10 dark:shadow-red-500/10 transition-all duration-500 ${index === currentIndex ? "ring-2 ring-primary" : ""}`
              }
            >
              {variant === "patterned" && (
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
              )}

              <div className={variant === "patterned" ? "relative z-10" : ""}>
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id, index)}
                  className={
                    variant === "patterned"
                      ? "flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-primary/5"
                      : "flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-white/20 dark:hover:bg-black/30"
                  }
                  aria-expanded={openId === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span
                    className={
                      variant === "patterned"
                        ? "text-lg font-semibold text-foreground"
                        : "font-medium text-foreground dark:text-white"
                    }
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
                      openId === faq.id ? "rotate-180" : ""
                    } ${
                      variant === "patterned"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openId === faq.id ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div
                    className={
                      variant === "patterned"
                        ? "border-t border-primary/10 px-6 pb-6 pt-4"
                        : "border-t border-white/20 dark:border-red-500/30 p-4"
                    }
                  >
                    <p
                      className={
                        variant === "patterned"
                          ? "text-muted-foreground leading-relaxed"
                          : "text-sm text-muted-foreground dark:text-gray-300"
                      }
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
