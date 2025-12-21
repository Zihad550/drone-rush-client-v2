"use client";

import ContactForm from "@/components/pages/contact-us/contact-form";
import ContactMap from "@/components/pages/contact-us/contact-map";
import ContactUsBanner from "@/components/pages/contact-us/contact-us-banner";
import FAQ from "@/components/shared/faq";
import PublicSectionTitle from "@/components/shared/public-section-title";
import SectionContainer from "@/components/shared/SectionContainer";

export default function ContactUsPage() {
  return (
    <div className="relative bg-background pb-8 md:pb-16 flex flex-col gap-y-36">
      {/* Banner */}
      <div className="relative opacity-100 min-h-screen">
        <div className="relative after:absolute after:-bottom-10 after:left-1/2 after:h-px after:w-3/5 after:-translate-x-1/2 after:rounded-lg after:bg-gradient-to-r after:from-transparent after:via-primary/20 after:to-transparent after:content-[''] after:shadow-[0_0_20px_rgba(var(--primary),0.3)]">
          <ContactUsBanner />
        </div>
      </div>

      <SectionContainer className="flex flex-col gap-y-48">
        {/* Contact Form Section */}
        <div id="contact-form" className="opacity-100">
          <div className="mb-8 text-left">
            <PublicSectionTitle className="mb-3">
              Send Us a Message
            </PublicSectionTitle>
            <p className="text-muted-foreground">
              Fill out the form below and we'll respond as soon as possible
            </p>
          </div>
          <ContactForm />
          <div className="flex justify-center mt-10">
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

        {/* Why Choose Section - Futuristic */}
        <div className="opacity-100">
          <div className="text-left">
            <PublicSectionTitle variant="h4">
              Why Choose Drone Rush?
            </PublicSectionTitle>
            <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
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
                        d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <title>Expertise icon</title>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground dark:text-white">
                  Expertise
                </h3>
                <p className="text-muted-foreground dark:text-gray-200">
                  Years of experience in drone technology and industry-leading
                  support.
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
                      <title>Quality icon</title>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground dark:text-white">
                  Quality
                </h3>
                <p className="text-muted-foreground dark:text-gray-200">
                  Premium drones and accessories from trusted manufacturers.
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
                        d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.27"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 3.26999C16.8602 3.3523 17.623 3.85421 18.1679 4.55771C18.7128 5.26122 19.0057 6.11742 19 7.00299C19 7.71846 18.8162 8.42076 18.4678 9.04399"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <title>Support icon</title>
                    </svg>
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground dark:text-white">
                  Support
                </h3>
                <p className="text-muted-foreground dark:text-gray-200">
                  24/7 customer service and technical assistance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="opacity-100">
          <FAQ
            faqs={[
              {
                id: 1,
                question: "What types of drones do you offer?",
                answer:
                  "We offer a wide range of drones including consumer, professional, and industrial models from leading manufacturers. Our selection includes quadcopters, fixed-wing drones, and specialized drones for photography, surveying, and delivery.",
              },
              {
                id: 2,
                question: "Do you provide drone training and certification?",
                answer:
                  "Yes, we offer comprehensive drone training programs and certification courses. Our expert instructors will guide you through FAA regulations, flight safety, and advanced piloting techniques to ensure you're fully prepared.",
              },
              {
                id: 3,
                question: "What is your warranty policy?",
                answer:
                  "We provide manufacturer warranties on all our drones, typically ranging from 1-2 years. Additionally, we offer our own service warranty for repairs and maintenance, ensuring your investment is protected.",
              },
              {
                id: 4,
                question: "Can you customize drones for specific applications?",
                answer:
                  "Absolutely! We specialize in customizing drones for various industries including agriculture, construction, search and rescue, and filmmaking. Our team will work with you to design the perfect solution.",
              },
              {
                id: 5,
                question: "How do I maintain my drone?",
                answer:
                  "Regular maintenance is crucial for drone longevity. We recommend cleaning after each flight, checking propeller balance, updating firmware, and professional servicing every 50-100 flight hours. Our technicians are available for maintenance services.",
              },
              {
                id: 6,
                question: "What are your shipping and return policies?",
                answer:
                  "We ship worldwide with fast, tracked delivery. Most orders arrive within 3-7 business days. We offer a 30-day return policy on unused items, and our customer service team will assist you throughout the process.",
              },
            ]}
            title="Frequently Asked Questions"
            showVideo={false}
            layout="full"
            variant="patterned"
          />
        </div>

        {/* Map Section */}
        <div className="opacity-100">
          <ContactMap />
        </div>
      </SectionContainer>
    </div>
  );
}
