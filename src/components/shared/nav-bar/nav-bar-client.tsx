"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CartLink from "../cart-link";
import Logo from "../logo";
import UserMenu from "../user-menu";

interface NavBarClientProps {
  user: any; // Type this properly if possible, e.g., IUser from types
}

const NavBarClient = ({ user }: NavBarClientProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Drones", path: "/drones" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  if (user && user.role === "user") {
    // Add user specific paths if needed, or handle dynamically
  }

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 left-0 z-50 w-full bg-slate-900/75 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center flex-grow">
              <div className="hidden sm:flex mr-4">
                <Logo />
              </div>
              <button
                type="button"
                className="sm:hidden p-2 text-white hover:bg-white/10 rounded-md mr-2"
                onClick={handleMobileMenuToggle}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex sm:hidden mr-4">
                <Logo />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden sm:flex flex-grow justify-center items-center gap-1 md:gap-4 ml-0 md:ml-4">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "text-white font-semibold text-xs md:text-base px-3 py-1 md:px-5 md:py-2 rounded-lg transition-all duration-300 relative overflow-hidden",
                      "hover:shadow-[0_8px_25px_-5px_rgba(59,130,246,0.4)] hover:-translate-y-0.5",
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-[0_8px_25px_-5px_rgba(59,130,246,0.5)]"
                        : "hover:bg-white/10",
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  {user.role !== "admin" && <CartLink />}
                  <UserMenu />
                </>
              ) : (
                <Link
                  href="/login"
                  className={cn(
                    "text-white font-semibold text-base block mx-3 px-6 py-2 rounded-lg",
                    "bg-white/15 backdrop-blur-md border border-white/10 shadow-sm",
                    "transition-all duration-300 hover:bg-white/25 hover:-translate-y-0.5 hover:shadow-md",
                  )}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex sm:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleMobileMenuToggle}
          />
          <div className="relative w-64 h-full bg-slate-900/90 backdrop-blur-md border-r border-white/10 shadow-2xl p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <Logo />
              <button
                onClick={handleMobileMenuToggle}
                className="text-white hover:bg-white/10 p-1 rounded"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={handleMobileMenuToggle}
                    className={cn(
                      "text-white font-semibold text-base px-4 py-3 rounded-lg transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                        : "hover:bg-white/10",
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto border-t border-white/10 pt-4 flex justify-center gap-4">
              {/* Social icons placeholder */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBarClient;
