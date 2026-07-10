"use client";

import {
  ChevronDown,
  Heart,
  LayoutDashboard,
  LogOut,
  Package,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { logoutUser } from "@/app/actions/auth.actions";
import Spinner from "@/components/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getMyProfile } from "@/services/user/user.service";

interface UserMenuProps {
  user?: {
    role: string;
  };
}

function initialsOf(name?: string) {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? "";
  return (a + b).toUpperCase() || "PR";
}

const itemClass =
  "flex w-full cursor-pointer items-center gap-3 rounded-[9px] px-3 py-2.5 font-poppins text-[13.5px] font-medium text-dr-text focus:bg-dr-bd-1";

const UserMenu = ({ user }: UserMenuProps) => {
  const [isPending, startTransition] = useTransition();
  const [profile, setProfile] = useState<{ name?: string; email?: string }>({});

  const isAdmin = user?.role === "admin" || user?.role === "superAdmin";

  useEffect(() => {
    let active = true;
    getMyProfile()
      .then((res) => {
        if (active && res?.success && res.data) {
          setProfile({ name: res.data.name, email: res.data.email });
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUser();
    });
  };

  const displayName = profile.name?.trim() || (isAdmin ? "Admin" : "Pilot");
  const initials = initialsOf(profile.name);

  return (
    <>
      {isPending && <Spinner />}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            title="Account"
            className="group flex items-center gap-2 rounded-full border border-dr-bd-2 bg-dr-surface py-1 pr-2.5 pl-1 text-dr-text transition-colors hover:border-dr-bd-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-dr-red/50"
          >
            <span className="sr-only">Open user menu</span>
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gradient-to-br from-[#ff6377] to-[#c81733] font-poppins text-[12.5px] font-bold text-white">
              {initials}
            </span>
            <ChevronDown className="h-[15px] w-[15px] text-dr-text-2 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={12}
          className="w-[250px] overflow-hidden rounded-[14px] border-dr-bd-2 bg-dr-surface p-0 text-dr-text shadow-[0_20px_44px_rgba(0,0,0,.4)]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-dr-bd-1 p-4">
            <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff6377] to-[#c81733] font-poppins text-[16px] font-bold text-white">
              {initials}
            </span>
            <div className="min-w-0">
              <div className="truncate font-poppins text-sm font-semibold text-dr-text">
                {displayName}
              </div>
              {profile.email && (
                <div className="truncate text-xs text-dr-text-3">
                  {profile.email}
                </div>
              )}
            </div>
          </div>

          {/* Items */}
          <div className="p-2">
            <DropdownMenuItem asChild>
              <Link
                href={isAdmin ? "/dashboard/admin" : "/dashboard/user"}
                className={itemClass}
              >
                {isAdmin ? (
                  <LayoutDashboard className="h-4 w-4" />
                ) : (
                  <UserRound className="h-4 w-4" />
                )}
                <span>{isAdmin ? "Admin Dashboard" : "My Account"}</span>
              </Link>
            </DropdownMenuItem>

            {!isAdmin && (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/user/orders" className={itemClass}>
                    <Package className="h-4 w-4" />
                    <span>Orders</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/user/wishlist" className={itemClass}>
                    <Heart className="h-4 w-4" />
                    <span>Wishlist</span>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-dr-bd-1 p-2">
            <DropdownMenuItem
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-3 rounded-[9px] px-3 py-2.5 font-poppins text-[13.5px] font-medium text-dr-text-3 focus:bg-dr-bd-1"
              disabled={isPending}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
