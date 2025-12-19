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
      link: "",
    },
    {
      id: 2,
      name: "Explore",
      link: "",
    },
    {
      id: 3,
      name: "Privacy Policy",
      link: "",
    },
    {
      id: 4,
      name: "Terms & Conditions",
      link: "",
    },
    {
      id: 5,
      name: "Contact Us",
      link: "",
    },
    {
      id: 6,
      name: "Support Center",
      link: "",
    },
    {
      id: 7,
      name: "Careers",
      link: "",
    },
  ];

  // account info related navs
  const accountNavs = [
    {
      id: 1,
      name: "Sign In",
      link: "",
    },
    // {
    //   id: 2,
    //   name: "View Cart",
    //   link: "",
    // },
    // {
    //   id: 3,
    //   name: "My Wishlist",
    //   link: "",
    // },
    {
      id: 4,
      name: "Track My Order",
      link: "",
    },
    {
      id: 5,
      name: "Shipping Details",
      link: "",
    },
    {
      id: 6,
      name: "Compare Products",
      link: "",
    },
  ];

  // corporate related navs
  const corporateNavs = [
    {
      id: 3,
      name: "Accessibility",
      link: "",
    },
    {
      id: 4,
      name: "Promotions",
      link: "",
    },
  ];

  return (
    <footer className="relative w-full bg-slate-900/95 backdrop-blur-md text-gray-100 pt-12 pb-0 mt-16 border-t border-white/8 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.1),_transparent_70%)] before:pointer-events-none pb-8">
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4">
          {/* About & Address */}
          <div className="md:col-span-6 lg:col-span-3">
            <h2 className="font-['Courgette',cursive] text-blue-400 text-2xl mb-2">
              Drone Rush
            </h2>
            <p className="text-sm text-gray-300 mb-4">
              DroneRush.com is the largest drone dealer in the United States and
              the most experienced authorized service center in the US.
            </p>
            <Address />
            <div className="flex gap-2 mt-4">
              <a
                href="/"
                className="p-2 rounded-lg text-blue-500 bg-white/10 backdrop-blur-sm border border-white/5 shadow-md transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(59,130,246,0.3)]"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="/"
                className="p-2 rounded-lg text-cyan-500 bg-white/10 backdrop-blur-sm border border-white/5 shadow-md transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(6,182,212,0.3)]"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="/"
                className="p-2 rounded-lg text-pink-500 bg-white/10 backdrop-blur-sm border border-white/5 shadow-md transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(225,48,108,0.3)]"
              >
                <Instagram className="w-5 h-5" />
              </a>
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
            <h3 className="text-xl font-semibold mb-2 text-blue-400">
              Contact Us
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Have questions or need help? Reach out to our team.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:jehadhossain008@gmail.com"
                className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">jehadhossain008@gmail.com</span>
              </a>
              <a
                href="tel:+8801855629170"
                className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+88 01855629170</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-4 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Drone Rush. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <Link
              href="/privacy"
              className="text-xs text-gray-100 hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-gray-100 hover:text-blue-400 transition-colors"
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
