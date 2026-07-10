"use client";

import LegalHero from "@/components/shared/legal-hero";
import LegalSection from "@/components/shared/legal-section";
import ScrollAnimation from "@/components/ui/scroll-animation";

export default function PrivacyPolicyPage() {
  return (
    <div className="animate-fade-in bg-background">
      <LegalHero
        title="Privacy Policy"
        description="Your privacy is mission-critical. Here's exactly how we collect, use, and protect your data across the DroneRush ecosystem."
        lastUpdated="July 2026"
      />

      <ScrollAnimation>
        <section className="mx-auto max-w-[840px] px-10 pb-[76px] pt-[10px]">
          <div className="space-y-5">
            <LegalSection index={1} title="Introduction">
              <p>
                Welcome to Drone Rush. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website and use our services. By accessing or using
                our services, you agree to the collection and use of information
                in accordance with this policy.
              </p>
              <p>
                We are committed to protecting your privacy across our drone
                technology platform, ensuring transparency and security in all
                our operations.
              </p>
            </LegalSection>

            <LegalSection index={2} title="Information We Collect">
              <h4>Personal information</h4>
              <ul>
                <li>
                  Name, email address, and contact details when you register or
                  contact us
                </li>
                <li>Payment information for transactions</li>
                <li>Account preferences and usage data</li>
              </ul>
              <h4>Technical information</h4>
              <ul>
                <li>IP address, browser type, and device information</li>
                <li>Usage analytics and performance metrics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </LegalSection>

            <LegalSection index={3} title="How We Use Your Information">
              <p>We use your information to:</p>
              <ul>
                <li>Provide and improve our drone services</li>
                <li>Process transactions and manage your account</li>
                <li>Communicate with you about updates and support</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </LegalSection>

            <LegalSection index={4} title="Sharing Your Information">
              <p>
                We do not sell your personal information. We may share it only
                in the following circumstances:
              </p>
              <ul>
                <li>
                  With service providers who assist our operations (under strict
                  confidentiality)
                </li>
                <li>To comply with legal requirements or protect our rights</li>
                <li>In connection with a business transfer or merger</li>
                <li>With your explicit consent</li>
              </ul>
            </LegalSection>

            <LegalSection index={5} title="Data Security">
              <p>
                We implement advanced security measures to protect your data,
                including encryption, secure servers, and regular security
                audits. Our infrastructure uses modern technology to safeguard
                your information against unauthorized access, alteration,
                disclosure, or destruction.
              </p>
            </LegalSection>

            <LegalSection index={6} title="Your Rights">
              <p>You have the right to:</p>
              <ul>
                <li>Access and review your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Data portability</li>
              </ul>
              <p>Contact us to exercise these rights.</p>
            </LegalSection>

            <LegalSection index={7} title="Contact Us">
              <p>
                If you have questions about this Privacy Policy or our data
                practices, reach out at:
              </p>
              <ul>
                <li>
                  Email:{" "}
                  <a href="mailto:privacy@dronerush.com">
                    privacy@dronerush.com
                  </a>
                </li>
                <li>Phone: +88 01855629170</li>
              </ul>
            </LegalSection>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}
