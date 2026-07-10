"use client";

import LegalHero from "@/components/shared/legal-hero";
import LegalSection from "@/components/shared/legal-section";
import ScrollAnimation from "@/components/ui/scroll-animation";

export default function TermsPage() {
  return (
    <div className="animate-fade-in bg-background">
      <LegalHero
        title="Terms & Conditions"
        description="Read these terms carefully before flying with us. By accessing the DroneRush platform, you agree to be bound by everything below."
        lastUpdated="July 2026"
      />

      <ScrollAnimation>
        <section className="mx-auto max-w-[840px] px-10 pb-[76px] pt-[10px]">
          <div className="space-y-5">
            <LegalSection index={1} title="Introduction">
              <p>
                Welcome to Drone Rush. These Terms &amp; Conditions
                (&ldquo;Terms&rdquo;) govern your use of our website, services,
                and products. By accessing or using our platform, you agree to
                be bound by these Terms and our Privacy Policy.
              </p>
              <p>
                Please read these Terms carefully. If you do not agree to these
                Terms, please do not use our services. We reserve the right to
                modify these Terms at any time, with changes effective upon
                posting.
              </p>
            </LegalSection>

            <LegalSection index={2} title="User Responsibilities">
              <p>As a user of our platform, you agree to:</p>
              <ul>
                <li>
                  Provide accurate and complete information when creating an
                  account
                </li>
                <li>Use our services only for lawful purposes</li>
                <li>
                  Respect intellectual property rights of Drone Rush and third
                  parties
                </li>
                <li>
                  Maintain the confidentiality of your account credentials
                </li>
                <li>Report any unauthorized use of your account immediately</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </LegalSection>

            <LegalSection index={3} title="Prohibited Uses">
              <p>You agree not to:</p>
              <ul>
                <li>
                  Use our services for any illegal or unauthorized purpose
                </li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services or servers</li>
                <li>
                  Use automated tools to access our platform without permission
                </li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </LegalSection>

            <LegalSection index={4} title="Intellectual Property">
              <p>
                All content, trademarks, logos, and materials on our platform
                are owned by Drone Rush or licensed to us. You may not
                reproduce, distribute, or create derivative works without our
                express written permission.
              </p>
              <p>
                Drone Rush grants you a limited, non-exclusive, non-transferable
                license to access and use our services for personal or business
                purposes, subject to these Terms.
              </p>
            </LegalSection>

            <LegalSection index={5} title="Liability Limitations">
              <p>
                Drone Rush provides services &ldquo;as is&rdquo; without
                warranties of any kind. We shall not be liable for any direct,
                indirect, incidental, or consequential damages arising from your
                use of our services.
              </p>
              <p>
                Our total liability shall not exceed the amount paid by you for
                the specific service giving rise to the claim. Some
                jurisdictions do not allow limitation of liability, so these
                limitations may not apply to you.
              </p>
            </LegalSection>

            <LegalSection index={6} title="Termination">
              <p>
                We reserve the right to terminate or suspend your account and
                access to our services at our sole discretion, without notice,
                for any reason including breach of these Terms.
              </p>
              <p>
                Upon termination, your right to use our services ceases
                immediately. All provisions that by their nature should survive
                termination shall continue in effect.
              </p>
            </LegalSection>

            <LegalSection index={7} title="Governing Law">
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of your jurisdiction, without regard to conflict
                of law principles.
              </p>
              <p>
                Any disputes arising from these Terms shall be resolved through
                binding arbitration, unless otherwise required by applicable
                law.
              </p>
            </LegalSection>

            <LegalSection index={8} title="Contact Us">
              <p>
                If you have questions about these Terms &amp; Conditions,
                contact us at:
              </p>
              <ul>
                <li>
                  Email:{" "}
                  <a href="mailto:legal@dronerush.com">legal@dronerush.com</a>
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
