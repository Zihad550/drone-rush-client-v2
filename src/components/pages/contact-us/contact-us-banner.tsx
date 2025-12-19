import { Clock, Mail, Phone } from "lucide-react";
import Image from "next/image";
import SectionContainer from "@/components/shared/SectionContainer";

export default function ContactUsBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgba(79,196,207,0.08)] to-[rgba(79,196,207,0.15)] py-12 md:py-16">
      {/* Decorative background elements */}
      <div className="absolute -top-[50px] -right-[50px] z-0 h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,rgba(var(--primary),0.13)_0%,transparent_70%)]" />
      <div className="absolute -bottom-[80px] left-[45%] z-0 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(var(--primary),0.08)_0%,transparent_60%)]" />

      <SectionContainer className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="text-center md:pl-12 md:pr-8 md:text-left">
            <div className="mb-2 inline-block rounded-full bg-primary px-3 py-1 text-sm font-semibold uppercase tracking-wider text-primary-foreground">
              Get In Touch
            </div>

            <h1 className="relative mb-8 mt-4 inline-block text-[2.8rem] font-semibold text-foreground md:text-[4rem]">
              Contact Us
              <span className="absolute -bottom-2 left-1/4 h-1 w-1/2 rounded-md bg-primary md:left-0 md:w-2/5" />
            </h1>

            <h2 className="mb-8 text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
              We're here to help with all your drone needs
            </h2>

            <p className="mb-6 text-base font-normal leading-relaxed text-muted-foreground md:text-lg">
              Have questions or need assistance? Our expert team is ready to
              provide you with the support and information you need. Reach out
              to us through any of the channels below.
            </p>

            {/* Contact Information Cards */}
            <div className="mt-8 space-y-4">
              <div className="rounded-xl border-l-4 border-primary bg-[rgba(79,196,207,0.07)] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-muted-foreground">
                      Email
                    </p>
                    <a
                      href="mailto:jehadhossain008@gmail.com"
                      className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      jehadhossain008@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-l-4 border-primary bg-[rgba(79,196,207,0.07)] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-muted-foreground">
                      Phone
                    </p>
                    <a
                      href="tel:+8801855629170"
                      className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      +88 01855629170
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-l-4 border-primary bg-[rgba(79,196,207,0.07)] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-muted-foreground">
                      Business Hours
                    </p>
                    <p className="text-base font-semibold text-foreground">
                      10:00–18:00 GMT+6 (Mon–Fri)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative h-auto w-[90%] overflow-hidden rounded-2xl md:h-[500px] md:w-full">
              {/* Image overlays */}
              <div className="absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-br from-[rgba(79,196,207,0.3)] via-transparent to-transparent" />
              <div className="absolute right-0 bottom-0 z-10 h-[40%] w-[70%] bg-gradient-to-bl from-[rgba(79,196,207,0.2)] via-transparent to-transparent" />

              <Image
                src="/assets/feature-img.jpg"
                alt="Contact Drone Rush"
                width={600}
                height={500}
                className="h-full w-full object-cover object-center transition-all duration-500 hover:scale-105 hover:contrast-110 hover:brightness-105"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-[5%] right-[5%] z-20 h-[70px] w-[70px] rounded-full border-2 border-dashed border-primary opacity-60 md:top-[12%] md:right-[12%] md:h-[100px] md:w-[100px]" />
            <div className="absolute bottom-[5%] left-[10%] z-20 h-[50px] w-[50px] rounded-full bg-primary opacity-10 md:bottom-[15%] md:left-[15%] md:h-[70px] md:w-[70px]" />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
