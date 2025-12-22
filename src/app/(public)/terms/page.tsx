"use client";

import PublicSectionTitle from "@/components/shared/public-section-title";
import SectionContainer from "@/components/shared/SectionContainer";
import ScrollAnimation from "@/components/ui/scroll-animation";

export default function TermsPage() {
  return (
    <div className="relative animate-fade-in bg-background pb-8 md:pb-16">
      {/* Banner */}
      <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="text-center">
          <PublicSectionTitle variant="h1" className="mb-4">
            Terms & Conditions
          </PublicSectionTitle>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground dark:text-gray-200">
            Please read these terms carefully before using our services. By
            accessing our platform, you agree to be bound by these terms.
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
                      Welcome to Drone Rush. These Terms & Conditions ("Terms")
                      govern your use of our website, services, and products. By
                      accessing or using our platform, you agree to be bound by
                      these Terms and our Privacy Policy.
                    </p>
                    <p className="mt-4">
                      Please read these Terms carefully. If you do not agree to
                      these Terms, please do not use our services. We reserve
                      the right to modify these Terms at any time, with changes
                      effective upon posting.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm">
                  <PublicSectionTitle variant="h3" className="mb-4">
                    User Responsibilities
                  </PublicSectionTitle>
                  <div className="text-muted-foreground dark:text-gray-200">
                    <p>As a user of our platform, you agree to:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>
                        Provide accurate and complete information when creating
                        an account
                      </li>
                      <li>Use our services only for lawful purposes</li>
                      <li>
                        Respect intellectual property rights of Drone Rush and
                        third parties
                      </li>
                      <li>
                        Maintain the confidentiality of your account credentials
                      </li>
                      <li>
                        Report any unauthorized use of your account immediately
                      </li>
                      <li>Comply with all applicable laws and regulations</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm">
                  <PublicSectionTitle variant="h3" className="mb-4">
                    Prohibited Uses
                  </PublicSectionTitle>
                  <div className="text-muted-foreground dark:text-gray-200">
                    <p>You agree not to:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>
                        Use our services for any illegal or unauthorized purpose
                      </li>
                      <li>
                        Transmit harmful, offensive, or inappropriate content
                      </li>
                      <li>
                        Attempt to gain unauthorized access to our systems
                      </li>
                      <li>Interfere with or disrupt our services or servers</li>
                      <li>
                        Use automated tools to access our platform without
                        permission
                      </li>
                      <li>Violate any applicable laws or regulations</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm">
                  <PublicSectionTitle variant="h3" className="mb-4">
                    Intellectual Property
                  </PublicSectionTitle>
                  <div className="text-muted-foreground dark:text-gray-200">
                    <p>
                      All content, trademarks, logos, and materials on our
                      platform are owned by Drone Rush or licensed to us. You
                      may not reproduce, distribute, or create derivative works
                      without our express written permission.
                    </p>
                    <p className="mt-4">
                      Drone Rush grants you a limited, non-exclusive,
                      non-transferable license to access and use our services
                      for personal or business purposes, subject to these Terms.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm">
                  <PublicSectionTitle variant="h3" className="mb-4">
                    Liability Limitations
                  </PublicSectionTitle>
                  <div className="text-muted-foreground dark:text-gray-200">
                    <p>
                      Drone Rush provides services "as is" without warranties of
                      any kind. We shall not be liable for any direct, indirect,
                      incidental, or consequential damages arising from your use
                      of our services.
                    </p>
                    <p className="mt-4">
                      Our total liability shall not exceed the amount paid by
                      you for the specific service giving rise to the claim.
                      Some jurisdictions do not allow limitation of liability,
                      so these limitations may not apply to you.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm">
                  <PublicSectionTitle variant="h3" className="mb-4">
                    Termination
                  </PublicSectionTitle>
                  <div className="text-muted-foreground dark:text-gray-200">
                    <p>
                      We reserve the right to terminate or suspend your account
                      and access to our services at our sole discretion, without
                      notice, for any reason including breach of these Terms.
                    </p>
                    <p className="mt-4">
                      Upon termination, your right to use our services ceases
                      immediately. All provisions that by their nature should
                      survive termination shall continue in effect.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm">
                  <PublicSectionTitle variant="h3" className="mb-4">
                    Governing Law
                  </PublicSectionTitle>
                  <div className="text-muted-foreground dark:text-gray-200">
                    <p>
                      These Terms shall be governed by and construed in
                      accordance with the laws of [Your Jurisdiction], without
                      regard to conflict of law principles.
                    </p>
                    <p className="mt-4">
                      Any disputes arising from these Terms shall be resolved
                      through binding arbitration in [Your Jurisdiction], unless
                      otherwise required by applicable law.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm">
                  <PublicSectionTitle variant="h3" className="mb-4">
                    Contact Us
                  </PublicSectionTitle>
                  <div className="text-muted-foreground dark:text-gray-200">
                    <p>
                      If you have questions about these Terms & Conditions,
                      please contact us at:
                    </p>
                    <div className="mt-2">
                      <p>Email: legal@dronerush.com</p>
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
