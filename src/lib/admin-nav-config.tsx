import {
  BarChart3,
  LayoutGrid,
  Package,
  Plane,
  Settings,
  Users,
} from "lucide-react";

export interface AdminNavItem {
  key: string;
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Only shown to superAdmin (e.g. Settings → roles & permissions). */
  superAdminOnly?: boolean;
}

/** Admin console navigation — mirrors the v2 design's "Manage" section. */
export const adminNavItems: AdminNavItem[] = [
  {
    key: "overview",
    title: "Overview",
    href: "/dashboard/admin",
    icon: LayoutGrid,
  },
  { key: "users", title: "Users", href: "/dashboard/admin/users", icon: Users },
  {
    key: "drones",
    title: "Drones",
    href: "/dashboard/admin/manage-drones",
    icon: Plane,
  },
  {
    key: "orders",
    title: "Orders",
    href: "/dashboard/admin/manage-orders",
    icon: Package,
  },
  {
    key: "analytics",
    title: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: BarChart3,
  },
  {
    key: "settings",
    title: "Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
];

/** Resolve the current page title from a pathname for the header breadcrumb. */
export function adminPageTitle(pathname: string): string {
  // Longest-prefix match so nested routes still resolve.
  const match = [...adminNavItems]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) =>
      item.href === "/dashboard/admin"
        ? pathname === item.href
        : pathname.startsWith(item.href),
    );
  return match?.title ?? "Overview";
}
