"use client";

import { LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { logoutUser } from "@/app/actions/auth.actions";
import Spinner from "@/components/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground dark:bg-white/10 dark:text-white hover:bg-accent dark:hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          >
            <span className="sr-only">Open user menu</span>
            <User className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-popover text-popover-foreground space-y-3"
        >
          {user?.role === "admin" ? (
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/admin"
                className="text-foreground dark:text-white font-medium text-sm md:text-base transition-all duration-200 relative pb-1 cursor-pointer w-full hover:text-primary dark:hover:text-primary before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-gradient-to-r before:from-blue-500 before:to-cyan-500 dark:before:from-red-500 dark:before:to-red-600 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-200"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem asChild>
              <Link
                href="/dashboard/user"
                className="text-foreground dark:text-white font-medium text-sm md:text-base transition-all duration-200 relative pb-1 cursor-pointer w-full hover:text-primary dark:hover:text-primary before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-gradient-to-r before:from-blue-500 before:to-cyan-500 dark:before:from-red-500 dark:before:to-red-600 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-200"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-foreground dark:text-white font-medium text-sm md:text-base transition-all duration-200 relative pb-1 hover:text-primary dark:hover:text-primary before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-gradient-to-r before:from-blue-500 before:to-cyan-500 dark:before:from-red-500 dark:before:to-red-600 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-200"
            disabled={isPending}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
