"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import type { UserRole } from "@/lib/nav-config";
import AdminHeader from "./admin/admin-header";
import AdminSidebar from "./admin/admin-sidebar";
import DashboardHeader from "./dashboard-header";
import DashboardSidebar from "./dashboard-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoggedIn, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const role: UserRole = (user?.role as UserRole) || "user";

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  useEffect(() => {
    if (!isLoading && isLoggedIn && user) {
      const isAdminPath = pathname.startsWith("/dashboard/admin");
      const isUserPath = pathname.startsWith("/dashboard/user");
      const isAdminRole = role === "admin" || role === "superAdmin";
      // Per the v2 design, admins may view the Profile page but not the
      // customer-only sections (orders, wishlist, cart, shipping).
      const isProfilePath = pathname === "/dashboard/user";

      if (isAdminPath && !isAdminRole) {
        router.push("/dashboard/user");
      } else if (isUserPath && isAdminRole && !isProfilePath) {
        router.push("/dashboard/admin");
      }
    }
  }, [isLoading, isLoggedIn, user, role, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-dr-field">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-dr-red"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  const isAdminRole = role === "admin" || role === "superAdmin";
  // Admins get the admin console shell everywhere except their own Profile
  // page, which renders inside the account (user) shell per the design.
  const isProfilePath = pathname === "/dashboard/user";

  if (isAdminRole && !isProfilePath) {
    return (
      <div className="dr-ambient-glow relative flex min-h-screen bg-dr-field">
        <AdminSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          role={role}
        />
        <div className="flex flex-1 flex-col transition-all duration-300 lg:pl-64">
          <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 px-5 py-7 sm:px-8 lg:px-[34px]">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="dr-ambient-glow relative flex min-h-screen bg-dr-field">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        role={role}
      />
      <div className="flex flex-1 flex-col transition-all duration-300 lg:pl-64">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-5 py-7 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
