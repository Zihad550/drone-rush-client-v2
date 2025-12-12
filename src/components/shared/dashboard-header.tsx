"use client";

import { LogOut, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { logoutUser } from "@/app/actions/auth.actions";
import { Button } from "@/components/ui/button";
import {
  admin_common_nav_items,
  commonNavItems,
  userNavItems,
} from "@/lib/nav-config";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const pathname = usePathname();

  const allNavItems = [
    ...admin_common_nav_items,
    ...userNavItems,
    ...commonNavItems,
  ];
  const currentItem = allNavItems.find((item) => item.href === pathname);
  const pageTitle = currentItem ? currentItem.title : "Dashboard";
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUser();
    });
  };

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
        <button
          type="button"
          onClick={handleLogout}
          className="cursor-pointer text-red-600 focus:text-red-600 flex items-center"
          disabled={isPending}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
