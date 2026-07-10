"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          title="Toggle theme"
          className="relative flex h-[38px] w-10 items-center justify-center rounded-[9px] border border-dr-bd-2 bg-dr-surface text-dr-text-2 transition-colors hover:border-dr-bd-3 hover:text-dr-text"
        >
          <Sun className="h-[17px] w-[17px] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[17px] w-[17px] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="rounded-[14px] border-dr-bd-2 bg-dr-surface text-dr-text"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="rounded-[9px] font-poppins text-[13.5px] font-medium"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="rounded-[9px] font-poppins text-[13.5px] font-medium"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="rounded-[9px] font-poppins text-[13.5px] font-medium"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
