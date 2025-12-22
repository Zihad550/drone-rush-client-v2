import PublicSectionTitle from "@/components/shared/public-section-title";

const AccessibilityStandards = () => {
  return (
    <div className="text-left">
      <PublicSectionTitle className="mb-3">
        Accessibility Standards & Compliance
      </PublicSectionTitle>
      <p className="text-muted-foreground mb-12">
        We follow WCAG 2.1 AA guidelines to ensure our platform meets the
        highest accessibility standards.
      </p>
      <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="group rounded-2xl border border-primary/20 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary),0.2)]">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path
                  d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12L12 16L16 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <title>Perceivable icon</title>
              </svg>
            </div>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-foreground dark:text-white text-center">
            Perceivable
          </h3>
          <p className="text-muted-foreground dark:text-gray-200 text-center">
            Information and user interface components must be presentable to
            users in ways they can perceive.
          </p>
        </div>

        <div className="group rounded-2xl border border-primary/20 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary),0.2)]">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <title>Operable icon</title>
              </svg>
            </div>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-foreground dark:text-white text-center">
            Operable
          </h3>
          <p className="text-muted-foreground dark:text-gray-200 text-center">
            User interface components and navigation must be operable by all
            users.
          </p>
        </div>

        <div className="group rounded-2xl border border-primary/20 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary),0.2)]">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 6V12L16 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <title>Understandable icon</title>
              </svg>
            </div>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-foreground dark:text-white text-center">
            Understandable
          </h3>
          <p className="text-muted-foreground dark:text-gray-200 text-center">
            Information and operation of the user interface must be
            understandable.
          </p>
        </div>

        <div className="group rounded-2xl border border-primary/20 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary),0.2)]">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path
                  d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="14,2 14,8 20,8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="16"
                  y1="13"
                  x2="8"
                  y2="13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="16"
                  y1="17"
                  x2="8"
                  y2="17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="10,9 9,9 8,9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <title>Robust icon</title>
              </svg>
            </div>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-foreground dark:text-white text-center">
            Robust
          </h3>
          <p className="text-muted-foreground dark:text-gray-200 text-center">
            Content must be robust enough to be interpreted reliably by a wide
            variety of user agents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityStandards;
