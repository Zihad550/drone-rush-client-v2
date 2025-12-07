"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import UserMenu from "@/components/shared/nav-bar/user-menu";
import { Button } from "@/components/ui/button";
import { adminNavItems, commonNavItems, userNavItems } from "@/lib/nav-config";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const pathname = usePathname();

  const allNavItems = [...adminNavItems, ...userNavItems, ...commonNavItems];
  const currentItem = allNavItems.find((item) => item.href === pathname);
  const pageTitle = currentItem ? currentItem.title : "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <h1 className="text-lg font-semibold md:text-xl">{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-4">
        <UserMenu />
      </div>
    </header>
  );
}
