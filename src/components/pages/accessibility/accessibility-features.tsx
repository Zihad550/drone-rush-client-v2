import V2SectionHeading from "@/components/shared/v2-section-heading";
import IconCard from "./icon-card";

const features = [
  {
    id: 1,
    title: "Keyboard Navigation",
    description:
      "Navigate the entire site using keyboard shortcuts and a logical tab order.",
    icon: (
      <>
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
      </>
    ),
  },
  {
    id: 2,
    title: "Screen Reader Support",
    description:
      "Full compatibility with screen readers and assistive technologies.",
    icon: (
      <>
        <path d="M11 5 6 9H2v6h4l5 4V5Z" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      </>
    ),
  },
  {
    id: 3,
    title: "Focus Management",
    description:
      "Clear focus indicators and predictable focus order throughout the site.",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
      </>
    ),
  },
  {
    id: 4,
    title: "Font Scaling",
    description:
      "Responsive text that scales cleanly with your browser and OS preferences.",
    icon: (
      <>
        <path d="M4 20 9 6l5 14M6 15h6" />
        <path d="M15 20l3-8 3 8M16.2 17h3.6" />
      </>
    ),
  },
  {
    id: 5,
    title: "Color Contrast",
    description:
      "High-contrast palettes tuned to stay legible in both light and dark themes.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18" fill="currentColor" />
      </>
    ),
  },
  {
    id: 6,
    title: "Descriptive Labels",
    description:
      "Every control and image carries clear labels and alternative text.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 9h10M7 13h6" />
      </>
    ),
  },
];

const AccessibilityFeatures = () => {
  return (
    <div id="features">
      <V2SectionHeading
        eyebrow="Features"
        title="Accessibility Features"
        subtitle="Our platform ships with comprehensive accessibility features designed to support all users."
        barWidth={190}
        className="mb-8"
      />
      <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <IconCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default AccessibilityFeatures;
