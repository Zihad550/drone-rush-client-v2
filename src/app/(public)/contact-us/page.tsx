import ContactForm from "@/components/pages/contact-us/contact-form";
import ContactMap from "@/components/pages/contact-us/contact-map";
import ContactUsBanner from "@/components/pages/contact-us/contact-us-banner";
import FAQ from "@/components/shared/faq";
import ScrollAnimation from "@/components/ui/scroll-animation";

const reasons = [
  {
    icon: "✦",
    title: "Expertise",
    desc: "Years of experience in drone technology and industry-leading support.",
  },
  {
    icon: "◈",
    title: "Quality",
    desc: "Premium drones and accessories from trusted manufacturers.",
  },
  {
    icon: "☺",
    title: "Support",
    desc: "24/7 customer service and technical assistance.",
  },
];

const faqs = [
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
];

export default function ContactUsPage() {
  return (
    <div className="animate-fade-in bg-background">
      {/* Hero */}
      <ContactUsBanner />

      {/* Contact form */}
      <ScrollAnimation>
        <section
          id="contact-form"
          className="mx-auto max-w-[820px] px-10 py-[40px]"
        >
          <div className="mb-6">
            <h2 className="inline-block font-chakra text-[30px] font-bold text-dr-text">
              Send Us a Message
              <span className="mt-2 block h-[3px] w-[150px] rounded-sm bg-gradient-to-r from-dr-red to-transparent" />
            </h2>
            <p className="mt-3 max-w-[560px] text-[15px] leading-[1.7] text-dr-text-2">
              Fill out the form below and we&rsquo;ll respond as soon as
              possible
            </p>
          </div>
          <ContactForm />
        </section>
      </ScrollAnimation>

      {/* Why choose */}
      <ScrollAnimation>
        <section className="mx-auto max-w-[1180px] px-10 py-[40px]">
          <div className="mb-8">
            <h2 className="inline-block font-chakra text-[32px] font-bold text-dr-text">
              Why Choose Drone Rush?
              <span className="mt-2 block h-[3px] w-[170px] rounded-sm bg-gradient-to-r from-dr-red to-transparent" />
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-[13px] border border-dr-bd-1 bg-dr-surface p-[26px]"
              >
                <div
                  className="mb-4 flex h-14 w-[52px] items-center justify-center border border-dr-red/30 bg-gradient-to-b from-dr-red/[0.16] to-transparent text-[#ef5568]"
                  style={{
                    clipPath:
                      "polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%)",
                  }}
                >
                  <span className="text-[22px]">{reason.icon}</span>
                </div>
                <h3 className="mb-2 font-poppins text-base font-semibold text-dr-text">
                  {reason.title}
                </h3>
                <p className="text-[13px] leading-[1.55] text-dr-text-3">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollAnimation>

      {/* FAQ */}
      <section className="mx-auto max-w-[1180px] px-10 py-[40px]">
        <FAQ
          faqs={faqs}
          title="Frequently Asked Questions"
          showVideo={false}
          layout="full"
          variant="patterned"
          hijackScroll={false}
        />
      </section>

      {/* Map */}
      <ScrollAnimation>
        <div className="pb-[76px] pt-[40px]">
          <ContactMap />
        </div>
      </ScrollAnimation>
    </div>
  );
}
