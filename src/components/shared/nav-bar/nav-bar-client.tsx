"use client";

import { Heart, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

const iconButtonClass =
  "relative flex h-[38px] w-10 items-center justify-center rounded-[9px] border border-dr-bd-2 bg-dr-surface text-dr-text-2 transition-colors hover:border-dr-bd-3 hover:text-dr-text";

const NavBarClient = ({ user }: NavBarClientProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { wishlist } = useWishlist();

  const isCustomer =
    !user || (user.role !== "admin" && user.role !== "superAdmin");

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    setSearchOpen(false);
    setSearchQuery("");
    router.push(`/drones?searchTerm=${encodeURIComponent(query)}`);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Drones", path: "/drones" },
    { name: "Find My Drone", path: "/find-my-drone" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 left-0 z-50 w-full border-b border-dr-bd-1 bg-dr-nav backdrop-blur-[12px]">
        <SectionContainer>
          <div className="flex h-[70px] items-center justify-between gap-4">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="mr-1 rounded-[9px] p-2 text-dr-text-2 hover:bg-dr-bd-1 hover:text-dr-text lg:hidden"
                onClick={handleMobileMenuToggle}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              <Logo />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-7 lg:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "relative pb-[3px] font-poppins text-[15px] font-medium transition-colors",
                      "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-dr-red after:transition-transform after:duration-200",
                      isActive
                        ? "text-dr-red after:scale-x-100"
                        : "text-dr-text-2 hover:text-dr-text",
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <button
                type="button"
                title="Search"
                className={cn(
                  iconButtonClass,
                  searchOpen && "border-dr-red/50 text-dr-red",
                )}
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="h-[17px] w-[17px]" />
              </button>
              <ModeToggle />
              {user && isCustomer && (
                <>
                  <CartLink />
                  <Link
                    href="/dashboard/user/wishlist"
                    title="Wishlist"
                    className={cn(
                      iconButtonClass,
                      "hidden sm:flex",
                      pathname === "/dashboard/user/wishlist" &&
                        "border-dr-red/50 text-dr-red",
                    )}
                  >
                    <Heart className="h-[17px] w-[17px]" />
                    {wishlist.length > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-dr-red px-1 text-[11px] font-bold text-white">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>
                </>
              )}
              {user ? (
                <UserMenu user={user} />
              ) : (
                <Link
                  href="/login"
                  className="px-1 font-poppins text-[15px] font-semibold text-dr-red transition-colors hover:text-dr-red-strong"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </SectionContainer>

        {/* Expandable search bar */}
        {searchOpen && (
          <div className="border-t border-dr-bd-1 bg-dr-nav px-4 py-4 backdrop-blur-[12px]">
            <form
              onSubmit={handleSearchSubmit}
              className="mx-auto flex max-w-[760px] items-center gap-3"
            >
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-4 h-[18px] w-[18px] -translate-y-1/2 text-dr-text-3" />
                <input
                  // biome-ignore lint/a11y/noAutofocus: search bar is opened intentionally by the user
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search drones, brands, categories…"
                  className="w-full rounded-xl border border-dr-bd-3 bg-dr-field py-3 pr-4 pl-11 font-poppins text-[15px] text-dr-text placeholder:text-dr-text-3 focus:border-dr-red/60 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-[#ef2b45] to-[#c81733] px-6 py-3 font-poppins text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="flex h-[46px] w-11 flex-none items-center justify-center rounded-xl border border-dr-bd-2 bg-dr-surface text-dr-text-2 hover:text-dr-text"
              >
                <X className="h-[18px] w-[18px]" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            type="button"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleMobileMenuToggle}
            aria-label="Close menu"
          />
          <div className="relative flex h-full w-72 flex-col border-r border-dr-bd-2 bg-dr-surface p-4 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={handleMobileMenuToggle}
                aria-label="Close menu"
                className="rounded-[9px] p-1.5 text-dr-text-2 hover:bg-dr-bd-1 hover:text-dr-text"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={handleMobileMenuToggle}
                    className={cn(
                      "rounded-[9px] px-4 py-3 font-poppins text-[15px] font-medium transition-colors",
                      isActive
                        ? "bg-dr-red/10 text-dr-red"
                        : "text-dr-text-2 hover:bg-dr-bd-1 hover:text-dr-text",
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
              {user && isCustomer && (
                <Link
                  href="/dashboard/user/wishlist"
                  onClick={handleMobileMenuToggle}
                  className={cn(
                    "flex items-center justify-between rounded-[9px] px-4 py-3 font-poppins text-[15px] font-medium transition-colors",
                    pathname === "/dashboard/user/wishlist"
                      ? "bg-dr-red/10 text-dr-red"
                      : "text-dr-text-2 hover:bg-dr-bd-1 hover:text-dr-text",
                  )}
                >
                  Wishlist
                  {wishlist.length > 0 && (
                    <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-dr-red px-1 text-[11px] font-bold text-white">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBarClient;
