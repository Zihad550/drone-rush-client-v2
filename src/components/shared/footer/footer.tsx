import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";
import Link from "next/link";
import SectionContainer from "../SectionContainer";
import Address from "./address";
import FooterNav from "./footer-nav";

const Footer = () => {
  // quick navs
  const quickNavs = [
    {
      id: 1,
      name: "About Us",
      link: "/about-us",
    },
    {
      id: 2,
      name: "Explore",
      link: "/drones",
    },
    {
      id: 3,
      name: "Privacy Policy",
      link: "/privacy-policy",
    },
    {
      id: 4,
      name: "Terms & Conditions",
      link: "/terms",
    },
    {
      id: 5,
      name: "Contact Us",
      link: "/contact-us",
    },
    {
      id: 7,
      name: "Careers",
      link: "/careers",
    },
  ];

  // account info related navs
  const accountNavs = [
    {
      id: 1,
      name: "Sign In",
      link: "/signin",
    },
    {
      id: 2,
      name: "View Cart",
      link: "/dashboard/user/cart",
    },
    {
      id: 3,
      name: "My Wishlist",
      link: "/dashboard/user/wishlist",
    },
    // {
    //   id: 4,
    //   name: "Track My Order",
    //   link: "/track-order",
    // },
    {
      id: 5,
      name: "Shipping Details",
      link: "/dashboard/user/shipping",
    },
    // {
    //   id: 6,
    //   name: "Compare Products",
    //   link: "/compare",
    // },
  ];

  // corporate related navs
  const corporateNavs = [
    {
      id: 3,
      name: "Accessibility",
      link: "/accessibility",
    },
    {
      id: 4,
      name: "Promotions",
      link: "/promotions",
    },
  ];

  return (
    <footer className="relative w-full bg-background/95 backdrop-blur-md text-foreground pt-12 pb-0  border-t border-dr-bd-2 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[radial-gradient(circle_at_top_right,_rgba(239,43,69,0.1),_transparent_70%)] before:pointer-events-none pb-8">
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4">
          {/* About & Address */}
          <div className="md:col-span-6 lg:col-span-3">
            <h2 className="font-poppins font-bold text-2xl mb-2 tracking-[-0.4px] text-dr-text">
              Drone<span className="text-dr-red">Rush</span>
            </h2>
            <p className="text-sm text-dr-text-2 mb-4">
              DroneRush.com is the largest drone dealer in the United States and
              the most experienced authorized service center in the US.
            </p>
            <Address />
            <div className="flex gap-2 mt-4">
              {[Facebook, Twitter, Instagram].map((Icon) => (
                <a
                  key={Icon.displayName ?? Icon.name}
                  href="/"
                  className="p-2 rounded-lg text-dr-text-2 bg-dr-surface backdrop-blur-sm border border-dr-bd-2 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-dr-red hover:text-dr-red hover:shadow-[0_8px_16px_rgba(239,43,69,0.28)]"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 lg:col-span-2">
            <FooterNav navs={quickNavs} subtitle="Company" />
          </div>

          {/* Account Links */}
          <div className="md:col-span-6 lg:col-span-2">
            <FooterNav navs={accountNavs} title="Account" />
          </div>

          {/* Corporate Links */}
          <div className="md:col-span-6 lg:col-span-2">
            <FooterNav navs={corporateNavs} title="Corporate" />
          </div>

          {/* Contact Us */}
          <div className="md:col-span-6 lg:col-span-3">
            <h3 className="font-poppins text-xl font-semibold mb-2 text-dr-text">
              Contact Us
            </h3>
            <p className="text-sm text-dr-text-2 mb-4">
              Have questions or need help? Reach out to our team.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:jehadhossain008@gmail.com"
                className="flex items-center gap-2 text-dr-text-2 hover:text-dr-red transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">jehadhossain008@gmail.com</span>
              </a>
              <a
                href="tel:+8801855629170"
                className="flex items-center gap-2 text-dr-text-2 hover:text-dr-red transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+88 01855629170</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-dr-bd-2 mt-10 pt-4 text-center">
          <p className="text-sm text-dr-text-2">
            &copy; {new Date().getFullYear()} Drone Rush. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <Link
              href="/privacy-policy"
              className="text-xs text-dr-text-2 hover:text-dr-red transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-dr-text-2 hover:text-dr-red transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;
