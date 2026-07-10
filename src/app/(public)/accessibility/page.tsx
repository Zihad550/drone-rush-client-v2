"use client";

import AccessibilityBanner from "@/components/pages/accessibility/accessibility-banner";
import AccessibilityCommitment from "@/components/pages/accessibility/accessibility-commitment";
import AccessibilityFeatures from "@/components/pages/accessibility/accessibility-features";
import AccessibilityStandards from "@/components/pages/accessibility/accessibility-standards";
import AccessibilityTools from "@/components/pages/accessibility/accessibility-tools";
import FAQ from "@/components/shared/faq";
import ScrollAnimation from "@/components/ui/scroll-animation";

const faqs = [
  {
    id: 1,
    question: "What accessibility standards does Drone Rush follow?",
    answer:
      "We adhere to WCAG 2.1 AA guidelines, ensuring our platform is accessible to users with disabilities including visual, motor, and cognitive impairments.",
  },
  {
    id: 2,
    question: "How can I enable high contrast mode on your website?",
    answer:
      "High contrast mode can be enabled through your browser settings or accessibility extensions. Our site automatically adapts to your system's contrast preferences.",
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
];

export default function AccessibilityPage() {
  return (
    <div className="animate-fade-in bg-background">
      <AccessibilityBanner />

      <ScrollAnimation>
        <section className="px-10 py-[46px]">
          <AccessibilityCommitment />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="mx-auto max-w-[1180px] px-10 py-[46px]">
          <AccessibilityStandards />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="mx-auto max-w-[1180px] px-10 py-[46px]">
          <AccessibilityFeatures />
        </section>
      </ScrollAnimation>

      <ScrollAnimation>
        <section className="mx-auto max-w-[1180px] px-10 py-[46px]">
          <AccessibilityTools />
        </section>
      </ScrollAnimation>

      <section className="mx-auto max-w-[1180px] px-10 pb-[76px] pt-[46px]">
        <FAQ
          faqs={faqs}
          title="Accessibility FAQ"
          showVideo={false}
          layout="full"
          variant="patterned"
        />
      </section>
    </div>
  );
}
