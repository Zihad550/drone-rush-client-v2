"use client";

import { ExternalLink, LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { logoutUser } from "@/app/actions/auth.actions";
import { adminNavItems } from "@/lib/admin-nav-config";
import type { UserRole } from "@/lib/nav-config";
import { cn } from "@/lib/utils";
import { getOrders } from "@/services/order/order.service";
import { getMyProfile } from "@/services/user/user.service";
import { initialsOf } from "./admin-ui";

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
  role: UserRole;
}

export default function AdminSidebar({
  open,
  onClose,
  role,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const isSuperAdmin = role === "superAdmin";
  const [profile, setProfile] = useState<{ name?: string; email?: string }>({});
  const [orderCount, setOrderCount] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let active = true;
    getMyProfile()
      .then((res) => {
        if (active && res?.success && res.data) {
          setProfile({ name: res.data.name, email: res.data.email });
        }
      })
      .catch(() => {});
    getOrders({ page: 1, limit: 1 })
      .then((res) => {
        if (active && res?.success && res.meta) setOrderCount(res.meta.total);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const handleLogout = () =>
    startTransition(async () => void (await logoutUser()));

  const name = profile.name?.trim() || (isSuperAdmin ? "Superadmin" : "Admin");
  const roleLabel = isSuperAdmin ? "Superadmin" : "Admin";

  return (
    <>
      {/* Mobile overlay */}
      <button
        type="button"
        aria-label="Close menu"
        className={cn(
          "fixed inset-0 z-40 bg-dr-field/80 backdrop-blur-sm transition-opacity duration-150 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-dr-bd-1 bg-dr-surface px-4 py-[22px] backdrop-blur-[14px] transition-transform duration-300 ease-in-out lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-2 pb-[22px] pt-1">
          <Link
            href="/dashboard/admin"
            className="flex items-center gap-[11px]"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="admk"
                  x1="14"
                  y1="10"
                  x2="50"
                  y2="54"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#ff6377" />
                  <stop offset=".55" stopColor="#ef2b45" />
                  <stop offset="1" stopColor="#ef2b45" />
                </linearGradient>
              </defs>
              <path
                d="M32 8 L54 30 L45.5 30 L32 16.5 L18.5 30 L10 30 Z"
                fill="url(#admk)"
              />
              <path
                d="M32 26 L54 48 L45.5 48 L32 34.5 L18.5 48 L10 48 Z"
                fill="url(#admk)"
                opacity=".45"
              />
            </svg>
            <span className="leading-none">
              <span className="block font-poppins text-[17px] font-bold tracking-[-0.4px] text-dr-text">
                Drone<span className="text-dr-red">Rush</span>
              </span>
              <span className="mt-[3px] block font-dm-mono text-[9.5px] uppercase tracking-[0.22em] text-dr-text-3">
                Admin Console
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full text-dr-text-3 hover:bg-dr-bd-1 hover:text-dr-text lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="px-[10px] py-2 font-dm-mono text-[10px] uppercase tracking-[0.18em] text-dr-text-3">
          Manage
        </p>

        <nav className="flex flex-col gap-[3px]">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard/admin"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            const badge = item.key === "orders" ? orderCount : null;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-[11px] border px-3 py-[11px] font-poppins text-sm transition-colors",
                  isActive
                    ? "border-dr-red/40 bg-dr-red/[0.12] font-semibold text-dr-red"
                    : "border-transparent font-medium text-dr-text-3 hover:bg-dr-bd-1 hover:text-dr-text",
                )}
              >
                <Icon className="h-[17px] w-[17px]" />
                <span className="flex-1">{item.title}</span>
                {badge != null && badge > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-dr-red px-1.5 font-poppins text-[10.5px] font-bold text-white">
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom user card */}
        <div className="mt-auto pt-4">
          <div className="rounded-[14px] border border-dr-bd-1 bg-dr-field p-[13px]">
            <div className="flex items-center gap-[11px]">
              <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff6377] to-[#c81733] font-poppins text-sm font-bold text-white">
                {initialsOf(profile.name)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate font-poppins text-[13.5px] font-semibold text-dr-text">
                  {name}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="h-[5px] w-[5px] rounded-full bg-dr-red" />
                  <span className="text-[11px] font-semibold text-dr-red">
                    {roleLabel}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-[7px]">
              <Link
                href="/"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-dr-bd-2 py-[7px] font-poppins text-xs font-semibold text-dr-text transition-colors hover:border-dr-red/40 hover:text-dr-red"
              >
                <ExternalLink className="h-[13px] w-[13px]" />
                Store
              </Link>
              <button
                type="button"
                title="Sign out"
                onClick={handleLogout}
                disabled={isPending}
                className="flex w-[33px] items-center justify-center rounded-lg border border-dr-bd-2 text-dr-text-3 transition-colors hover:border-dr-red/40 hover:text-dr-red disabled:opacity-60"
              >
                <LogOut className="h-[14px] w-[14px]" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
