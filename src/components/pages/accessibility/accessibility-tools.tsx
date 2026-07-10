import { ArrowRight } from "lucide-react";
import Link from "next/link";
import V2SectionHeading from "@/components/shared/v2-section-heading";
import IconCard from "./icon-card";

const tools = [
  {
    id: 1,
    title: "Accessibility Statement",
    description:
      "Read our full accessibility statement and compliance details.",
    link: "/privacy-policy",
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
  },
  {
    id: 2,
    title: "Screen Reader Guide",
    description: "Learn how to use screen readers with our platform.",
    link: "/contact-us",
    icon: (
      <>
        <path d="M11 5 6 9H2v6h4l5 4V5Z" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
      </>
    ),
  },
  {
    id: 3,
    title: "Feedback Form",
    description: "Share your accessibility feedback and suggestions.",
    link: "/contact-us",
    icon: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
  },
];

const AccessibilityTools = () => {
  return (
    <div>
      <V2SectionHeading
        eyebrow="Resources"
        title="Resources &amp; Tools"
        subtitle="Explore additional resources and tools to enhance your accessibility experience."
        barWidth={180}
        className="mb-8"
      />
      <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
        {tools.map((tool) => (
          <IconCard
            key={tool.id}
            icon={tool.icon}
            title={tool.title}
            description={tool.description}
            footer={
              <Link
                href={tool.link}
                className="inline-flex items-center gap-2 font-poppins text-sm font-semibold text-dr-red transition-all duration-300 hover:gap-3"
              >
                Learn more
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AccessibilityTools;
