"use client";

import { Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist-context";
import type { IUser } from "@/types/global";
import CartLink from "../cart-link";
import Logo from "../logo";
import { ModeToggle } from "../mode-toggle";
import SectionContainer from "../SectionContainer";
import UserMenu from "./user-menu";

interface NavBarClientProps {
  user: IUser | null;
}

const NavBarClient = ({ user }: NavBarClientProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { wishlist } = useWishlist();

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
      <header className="sticky top-0 left-0 z-50 w-full bg-background/75 backdrop-blur-md border-b border-border shadow-lg">
        <SectionContainer>
          <div className="flex items-center justify-between h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center flex-grow">
              <div className="hidden sm:flex mr-4">
                <Logo />
              </div>
              <button
                type="button"
                className="sm:hidden p-2 text-foreground hover:bg-accent rounded-md mr-2"
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
            <nav className="hidden sm:flex flex-grow justify-center items-center gap-2 md:gap-4 ml-0 md:ml-4">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "text-foreground dark:text-white font-medium text-sm md:text-base transition-all duration-200 relative pb-1",
                      "hover:text-primary dark:hover:text-primary",
                      "before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5",
                      "before:bg-gradient-to-r before:from-blue-500 before:to-cyan-500 dark:before:from-red-500 dark:before:to-red-600",
                      "before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-200",
                      isActive &&
                        "before:scale-x-100 text-primary dark:text-primary",
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-2">
              <ModeToggle />
              {user ? (
                <>
                  {user.role !== "admin" && user.role !== "superAdmin" && (
                    <CartLink />
                  )}
                  {user.role !== "admin" && user.role !== "superAdmin" && (
                    <Link
                      href="/dashboard/user/wishlist"
                      className={cn(
                        "relative text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent dark:hover:bg-white/10",
                        pathname === "/dashboard/user/wishlist" &&
                          "text-primary dark:text-primary bg-accent dark:bg-white/10",
                      )}
                      title="Wishlist"
                    >
                      <Heart className="w-5 h-5" />
                      {wishlist.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {wishlist.length}
                        </span>
                      )}
                    </Link>
                  )}

                  <UserMenu user={user} />
                </>
              ) : (
                <Link
                  href="/login"
                  className={cn(
                    "text-blue-700 dark:text-red-400 font-semibold text-base block mx-3 px-6 py-2 transition-all duration-200 relative",
                    "hover:text-blue-800 dark:hover:text-red-300",
                    "before:absolute before:bottom-2 before:left-6 before:right-6 before:h-0.5",
                    "before:bg-gradient-to-r before:from-blue-500 before:to-cyan-500 dark:before:from-red-500 dark:before:to-red-600",
                    "before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-200",
                  )}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </SectionContainer>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex sm:hidden">
          <button
            type="button"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleMobileMenuToggle}
          />
          <div className="relative w-64 h-full bg-card/90 dark:bg-black/80 backdrop-blur-md border-r border-border shadow-2xl p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <Logo />
              <button
                type="button"
                onClick={handleMobileMenuToggle}
                className="text-foreground dark:text-white hover:bg-accent dark:hover:bg-white/10 p-1 rounded"
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
                      "text-foreground dark:text-white font-semibold text-base px-4 py-3 transition-all duration-200 relative",
                      "hover:text-primary dark:hover:text-primary",
                      "before:absolute before:bottom-2 before:left-4 before:right-4 before:h-0.5",
                      "before:bg-gradient-to-r before:from-blue-500 before:to-cyan-500 dark:before:from-red-500 dark:before:to-red-600",
                      "before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-200",
                      isActive &&
                        "before:scale-x-100 text-primary dark:text-primary",
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto border-t border-border pt-4 flex justify-center gap-4">
              {/* Social icons placeholder */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBarClient;
