"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import type { UserRole } from "@/lib/nav-config";
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

      if (isAdminPath && !isAdminRole) {
        router.push("/dashboard/user");
      } else if (isUserPath && isAdminRole) {
        router.push("/dashboard/admin");
      }
    }
  }, [isLoading, isLoggedIn, user, role, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-muted/10">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        role={role}
      />
      <div className="flex flex-1 flex-col lg:pl-64 transition-all duration-300">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
