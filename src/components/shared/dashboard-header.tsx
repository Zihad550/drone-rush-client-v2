"use client";

import { LogOut, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { logoutUser } from "@/app/actions/auth.actions";
import { ModeToggle } from "@/components/shared/mode-toggle";
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
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-dr-bd-1 bg-dr-nav px-5 backdrop-blur-md sm:px-8">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <h1 className="font-chakra text-lg font-bold tracking-[-0.3px] text-dr-text md:text-xl">
          {pageTitle}
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <ModeToggle />
        <button
          type="button"
          onClick={handleLogout}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-dr-bd-2 px-3.5 py-2 font-poppins text-[13px] font-semibold text-dr-text transition-colors hover:border-dr-red/40 hover:text-dr-red disabled:opacity-60"
          disabled={isPending}
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
