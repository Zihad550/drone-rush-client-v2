import PublicSectionTitle from "@/components/shared/public-section-title";

const AccessibilityCommitment = () => {
  return (
    <div className="text-left">
      <div className="mx-auto max-w-5xl rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-8 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm md:p-12">
        <PublicSectionTitle variant="h2">
          Our Commitment to Digital Accessibility
        </PublicSectionTitle>
        <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
        <h6 className="max-w-4xl text-lg font-normal text-muted-foreground dark:text-gray-200 md:text-[22px] text-left">
          At Drone Rush, we believe that technology should be accessible to
          everyone, regardless of ability. Our commitment to digital
          accessibility ensures that all users can navigate, understand, and
          interact with our platform effectively. We continuously audit and
          improve our accessibility features to create an inclusive experience
          for all customers.
        </h6>
      </div>
    </div>
  );
};

export default AccessibilityCommitment;
