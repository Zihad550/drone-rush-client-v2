import ContactForm from "@/components/pages/contact-us/ContactForm";
import ContactUsBanner from "@/components/pages/contact-us/ContactUsBanner";
import Title from "@/components/Title";

export default function ContactUsPage() {
  return (
    <div className="animate-fade-in bg-background py-8 md:py-16">
      <div className="container mx-auto max-w-[1400px]">
        {/* Banner */}
        <div className="mb-20 mt-4 md:mt-6">
          <div className="relative mb-20 after:absolute after:-bottom-10 after:left-1/2 after:h-px after:w-3/5 after:-translate-x-1/2 after:rounded-lg after:bg-[rgba(0,0,0,0.06)] after:content-['']">
            <ContactUsBanner />
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="my-12">
          <div className="mx-auto max-w-4xl">
            <ContactForm />
          </div>
        </div>

        {/* Additional Information */}
        <div className="my-16 text-center">
          <Title variant="h4" className="text-[22px] md:text-[32px]">
            Why Choose Drone Rush?
          </Title>
          <div className="mx-auto mb-6 h-px w-16 border-t border-primary" />
          <p className="mx-auto max-w-3xl text-lg font-normal text-muted-foreground md:text-[20px]">
            With years of experience in the drone industry, we provide
            exceptional customer service, expert technical support, and
            high-quality products. Our team is dedicated to helping you find the
            perfect drone solution for your needs.
          </p>
        </div>
      </div>
    </div>
  );
}
