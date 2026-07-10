import V2SectionHeading from "@/components/shared/v2-section-heading";
import IconCard from "./icon-card";

const standards = [
  {
    title: "Perceivable",
    description:
      "Information and UI components must be presentable to users in ways they can perceive.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
  },
  {
    title: "Operable",
    description:
      "User interface components and navigation must be operable by all users.",
    icon: (
      <>
        <path d="M12 2 2 7l10 5 10-5-10-5Z" />
        <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
      </>
    ),
  },
  {
    title: "Understandable",
    description:
      "Information and the operation of the user interface must be understandable.",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
  },
  {
    title: "Robust",
    description:
      "Content must be robust enough to be interpreted reliably by a wide variety of user agents.",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6v6H9z" />
      </>
    ),
  },
];

const AccessibilityStandards = () => {
  return (
    <div>
      <V2SectionHeading
        eyebrow="Compliance"
        title="Standards &amp; Compliance"
        subtitle="We follow WCAG 2.1 AA guidelines so our platform meets the highest accessibility standards."
        barWidth={200}
        className="mb-8"
      />
      <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
        {standards.map((item) => (
          <IconCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default AccessibilityStandards;
