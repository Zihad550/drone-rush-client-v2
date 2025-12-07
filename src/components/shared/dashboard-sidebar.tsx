"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { getNavItems, type UserRole } from "@/lib/nav-config";
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
  const navItems = getNavItems(role);

  return (
    <>
      {/* Mobile Overlay */}
      <button
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all duration-100 lg:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
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
          "fixed top-0 left-0 z-50 h-screen w-64 border-r bg-background transition-transform duration-300 ease-in-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <Logo />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col gap-4 py-4">
          <nav className="grid gap-1 px-2">
            {navItems.map((item, _index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground",
                  )}
                  onClick={() => onClose()} // Close on mobile when clicked
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/*<div className="px-2 mt-4">
             <div className="h-[1px] bg-border mb-4" />
             <nav className="grid gap-1">
                {commonNavItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                        key={index}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                            isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                        )}
                        >
                        <Icon className="h-4 w-4" />
                        {item.title}
                        </Link>
                    )
                })}
             </nav>
          </div>*/}
        </div>
      </aside>
    </>
  );
}
