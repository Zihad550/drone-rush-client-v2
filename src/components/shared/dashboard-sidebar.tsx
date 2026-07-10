"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/shared/logo";
import {
  adminAccountNavItems,
  getNavItems,
  type UserRole,
} from "@/lib/nav-config";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
  role: UserRole;
}

export default function DashboardSidebar({
  open,
  onClose,
  role,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const isAdminRole = role === "admin" || role === "superAdmin";

  // An admin only ever sees this (user) shell on their own profile page, where
  // the design shows a trimmed account nav + a link back to the admin console.
  const navItems = isAdminRole ? adminAccountNavItems : getNavItems(role);

  const sectionLabel = isAdminRole ? "Account" : "Pilot account";

  return (
    <>
      {/* Mobile Overlay */}
      <button
        className={cn(
          "fixed inset-0 z-40 bg-dr-field/80 backdrop-blur-sm transition-all duration-100 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClose();
            e.preventDefault();
          }
        }}
        type="button"
        aria-label="Close menu"
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 border-r border-dr-bd-1 bg-dr-surface transition-transform duration-300 ease-in-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-dr-bd-1 px-6">
          <Logo />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-dr-text-3 transition-colors hover:bg-dr-bd-1 hover:text-dr-text lg:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4 py-5">
          <p className="px-5 font-dm-mono text-[10px] font-bold uppercase tracking-[0.22em] text-dr-text-3">
            {sectionLabel}
          </p>
          <nav className="grid gap-1 px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-[11px] px-3 py-2.5 font-poppins text-sm font-medium transition-colors",
                    isActive
                      ? "bg-dr-red/[0.12] text-dr-text"
                      : "text-dr-text-3 hover:bg-dr-bd-1 hover:text-dr-text",
                  )}
                  onClick={() => onClose()}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-sm bg-dr-red" />
                  )}
                  <Icon
                    className={cn(
                      "h-[18px] w-[18px] transition-colors",
                      isActive
                        ? "text-dr-red"
                        : "text-dr-text-3 group-hover:text-dr-text",
                    )}
                  />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
