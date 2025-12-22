"use client";

import AccessibilityBanner from "@/components/pages/accessibility/accessibility-banner";
import AccessibilityCommitment from "@/components/pages/accessibility/accessibility-commitment";
import AccessibilityFeatures from "@/components/pages/accessibility/accessibility-features";
import AccessibilityStandards from "@/components/pages/accessibility/accessibility-standards";
import AccessibilityTools from "@/components/pages/accessibility/accessibility-tools";
import FAQ from "@/components/shared/faq";
import SectionContainer from "@/components/shared/SectionContainer";
import ScrollAnimation from "@/components/ui/scroll-animation";

export default function AccessibilityPage() {
  return (
    <div className="relative animate-fade-in bg-background pb-8 md:pb-16">
      {/* Banner */}
      <div className="relative min-h-screen ">
        <div className="relative after:absolute after:-bottom-10 after:left-1/2 after:h-px after:w-3/5 after:-translate-x-1/2 after:rounded-lg after:bg-gradient-to-r after:from-transparent after:via-primary/20 after:to-transparent after:content-[''] after:shadow-[0_0_20px_rgba(var(--primary),0.3)] after:backdrop-blur-sm">
          <AccessibilityBanner />
        </div>
      </div>

      {/* Commitment Statement */}
      <SectionContainer>
        <ScrollAnimation>
          <div className="my-20 md:my-24 lg:my-32">
            <AccessibilityCommitment />
          </div>
        </ScrollAnimation>
      </SectionContainer>

      {/* Futuristic Divider */}
      <div className="my-20 md:my-24 lg:my-32 flex justify-center">
        <svg
          width="200"
          height="20"
          viewBox="0 0 200 20"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary/30"
        >
          <path
            d="M0,10 Q50,0 100,10 T200,10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <title>Decorative wave divider</title>
        </svg>
      </div>

      {/* Accessibility Standards */}
      <SectionContainer>
        <ScrollAnimation>
          <div className="my-20 md:my-24 lg:my-32">
            <AccessibilityStandards />
          </div>
        </ScrollAnimation>
      </SectionContainer>

      {/* Futuristic Divider */}
      <div className="my-20 md:my-24 lg:my-32 flex justify-center">
        <svg
          width="200"
          height="20"
          viewBox="0 0 200 20"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary/30"
        >
          <path
            d="M0,10 Q50,0 100,10 T200,10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <title>Decorative wave divider</title>
        </svg>
      </div>

      {/* Accessibility Features */}
      <SectionContainer>
        <ScrollAnimation>
          <div className="my-20 md:my-24 lg:my-32">
            <AccessibilityFeatures />
          </div>
        </ScrollAnimation>
      </SectionContainer>

      {/* Futuristic Divider */}
      <div className="my-20 md:my-24 lg:my-32 flex justify-center">
        <svg
          width="200"
          height="20"
          viewBox="0 0 200 20"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary/30"
        >
          <path
            d="M0,10 Q50,0 100,10 T200,10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <title>Decorative wave divider</title>
        </svg>
      </div>

      {/* Accessibility Tools */}
      <SectionContainer>
        <ScrollAnimation>
          <div className="my-20 md:my-24 lg:my-32">
            <AccessibilityTools />
          </div>
        </ScrollAnimation>
      </SectionContainer>

      {/* Futuristic Divider */}
      <div className="my-20 md:my-24 lg:my-32 flex justify-center">
        <svg
          width="200"
          height="20"
          viewBox="0 0 200 20"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary/30"
        >
          <path
            d="M0,10 Q50,0 100,10 T200,10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <title>Decorative wave divider</title>
        </svg>
      </div>

      {/* FAQ Section */}
      <SectionContainer>
        <ScrollAnimation>
          <div className="my-20 md:my-24 lg:my-32">
            <FAQ
              faqs={[
                {
                  id: 1,
                  question:
                    "What accessibility standards does Drone Rush follow?",
                  answer:
                    "We adhere to WCAG 2.1 AA guidelines, ensuring our platform is accessible to users with disabilities including visual, motor, and cognitive impairments.",
                },
                {
                  id: 2,
                  question:
                    "How can I enable high contrast mode on your website?",
                  answer:
                    "High contrast mode can be enabled through your browser settings or by using accessibility extensions. Our site automatically adapts to your system's contrast preferences.",
                },
                {
                  id: 3,
                  question: "Does your site support screen readers?",
                  answer:
                    "Yes, our website is fully compatible with popular screen readers like JAWS, NVDA, and VoiceOver. All content includes proper semantic markup and alternative text.",
                },
                {
                  id: 4,
                  question: "What keyboard shortcuts are available?",
                  answer:
                    "You can navigate our site using standard keyboard shortcuts: Tab to move forward, Shift+Tab to move backward, Enter to activate links, and Space to scroll through content.",
                },
                {
                  id: 5,
                  question: "How do I report an accessibility issue?",
                  answer:
                    "We welcome feedback on accessibility. Please contact us through our contact form or email accessibility@dronerush.com with details about the issue and how to reproduce it.",
                },
                {
                  id: 6,
                  question: "Are your mobile apps accessible?",
                  answer:
                    "Our mobile applications follow the same accessibility standards as our web platform, including support for assistive technologies and adaptive interfaces.",
                },
              ]}
              title="Accessibility FAQ"
              showVideo={false}
              layout="full"
              variant="patterned"
            />
          </div>
        </ScrollAnimation>
      </SectionContainer>
    </div>
  );
}
