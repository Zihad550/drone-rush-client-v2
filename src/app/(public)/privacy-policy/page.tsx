"use client";

import PublicSectionTitle from "@/components/shared/public-section-title";
import SectionContainer from "@/components/shared/SectionContainer";
import ScrollAnimation from "@/components/ui/scroll-animation";

export default function PrivacyPolicyPage() {
  return (
    <div className="relative animate-fade-in bg-background pb-8 md:pb-16">
      {/* Banner */}
      <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="text-center">
          <PublicSectionTitle variant="h1" className="mb-4">
            Privacy Policy
          </PublicSectionTitle>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground dark:text-gray-200">
            Your privacy is paramount. Learn how we protect your data in our
            futuristic drone ecosystem.
          </p>
        </div>
        {/* Futuristic glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/5 to-transparent animate-pulse" />
      </div>

      {/* Content Sections */}
      <SectionContainer>
        <ScrollAnimation>
          <div className="my-20 md:my-24 lg:my-32">
            <div className="mx-auto max-w-4xl">
              <div className="space-y-8">
                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm">
                  <PublicSectionTitle variant="h3" className="mb-4">
                    Introduction
                  </PublicSectionTitle>
                  <div className="text-muted-foreground dark:text-gray-200">
                    <p>
                      Welcome to Drone Rush. This Privacy Policy explains how we
                      collect, use, disclose, and safeguard your information
                      when you visit our website and use our services. By
                      accessing or using our services, you agree to the
                      collection and use of information in accordance with this
                      policy.
                    </p>
                    <p className="mt-4">
                      We are committed to protecting your privacy in our
                      advanced drone technology platform, ensuring transparency
                      and security in all our operations.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm">
                  <PublicSectionTitle variant="h3" className="mb-4">
                    Information We Collect
                  </PublicSectionTitle>
                  <div className="text-muted-foreground dark:text-gray-200">
                    <h4 className="font-semibold mb-2">
                      Personal Information:
                    </h4>
                    <ul className="list-disc list-inside mb-4">
                      <li>
                        Name, email address, and contact details when you
                        register or contact us
                      </li>
                      <li>Payment information for transactions</li>
                      <li>Account preferences and usage data</li>
                    </ul>
                    <h4 className="font-semibold mb-2">
                      Technical Information:
                    </h4>
                    <ul className="list-disc list-inside">
                      <li>IP address, browser type, and device information</li>
                      <li>Usage analytics and performance metrics</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm">
                  <PublicSectionTitle variant="h3" className="mb-4">
                    How We Use Your Information
                  </PublicSectionTitle>
                  <div className="text-muted-foreground dark:text-gray-200">
                    <p>We use your information to:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>Provide and improve our drone services</li>
                      <li>Process transactions and manage your account</li>
                      <li>Communicate with you about updates and support</li>
                      <li>Analyze usage patterns to enhance user experience</li>
                      <li>Ensure security and prevent fraud</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm">
                  <PublicSectionTitle variant="h3" className="mb-4">
                    Sharing Your Information
                  </PublicSectionTitle>
                  <div className="text-muted-foreground dark:text-gray-200">
                    <p>
                      We do not sell your personal information. We may share it
                      only in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside mt-2">
                      <li>
                        With service providers who assist our operations (under
                        strict confidentiality)
                      </li>
                      <li>
                        To comply with legal requirements or protect our rights
                      </li>
                      <li>In connection with a business transfer or merger</li>
                      <li>With your explicit consent</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm">
                  <PublicSectionTitle variant="h3" className="mb-4">
                    Data Security
                  </PublicSectionTitle>
                  <div className="text-muted-foreground dark:text-gray-200">
                    <p>
                      We implement advanced security measures to protect your
                      data, including encryption, secure servers, and regular
                      security audits. Our futuristic infrastructure uses
                      cutting-edge technology to safeguard your information
                      against unauthorized access, alteration, disclosure, or
                      destruction.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm">
                  <PublicSectionTitle variant="h3" className="mb-4">
                    Your Rights
                  </PublicSectionTitle>
                  <div className="text-muted-foreground dark:text-gray-200">
                    <p>You have the right to:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>Access and review your personal information</li>
                      <li>Correct inaccurate data</li>
                      <li>Request deletion of your data</li>
                      <li>Opt-out of marketing communications</li>
                      <li>Data portability</li>
                    </ul>
                    <p className="mt-4">Contact us to exercise these rights.</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm">
                  <PublicSectionTitle variant="h3" className="mb-4">
                    Contact Us
                  </PublicSectionTitle>
                  <div className="text-muted-foreground dark:text-gray-200">
                    <p>
                      If you have questions about this Privacy Policy or our
                      data practices, please contact us at:
                    </p>
                    <div className="mt-2">
                      <p>Email: privacy@dronerush.com</p>
                      <p>Address: [Your Address Here]</p>
                      <p>Phone: [Your Phone Here]</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    </div>
  );
}
