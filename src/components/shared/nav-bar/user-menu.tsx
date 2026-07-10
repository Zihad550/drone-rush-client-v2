"use client";

import { ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { logoutUser } from "@/app/actions/auth.actions";
import Spinner from "@/components/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  user?: {
    role: string;
    // Add other user properties as needed
  };
}

const UserMenu = ({ user }: UserMenuProps) => {
  const [isPending, startTransition] = useTransition();

  const isAdmin = user?.role === "admin" || user?.role === "superAdmin";

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUser();
    });
  };

  return (
    <>
      {isPending && <Spinner />}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="group flex items-center gap-2 rounded-full border border-dr-bd-2 bg-dr-surface py-1 pr-2.5 pl-1 text-dr-text transition-colors hover:border-dr-bd-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-dr-red/50"
          >
            <span className="sr-only">Open user menu</span>
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gradient-to-br from-[#ff6377] to-[#c81733] text-white">
              <User className="h-4 w-4" />
            </span>
            <ChevronDown className="h-[15px] w-[15px] text-dr-text-2 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={12}
          className="w-56 rounded-[14px] border-dr-bd-2 bg-dr-surface p-2 text-dr-text shadow-[0_20px_44px_rgba(0,0,0,.4)]"
        >
          <DropdownMenuItem asChild>
            <Link
              href={isAdmin ? "/dashboard/admin" : "/dashboard/user"}
              className={
                isAdmin
                  ? "flex w-full cursor-pointer items-center gap-3 rounded-[9px] px-3 py-2.5 font-poppins text-[13.5px] font-semibold text-dr-red"
                  : "flex w-full cursor-pointer items-center gap-3 rounded-[9px] px-3 py-2.5 font-poppins text-[13.5px] font-medium"
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>{isAdmin ? "Admin Dashboard" : "Dashboard"}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-dr-bd-1" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-3 rounded-[9px] px-3 py-2.5 font-poppins text-[13.5px] font-medium text-dr-text-3"
            disabled={isPending}
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
