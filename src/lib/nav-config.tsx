import {
  ArrowLeft,
  BarChart,
  Heart,
  LayoutDashboard,
  LayoutList,
  Mail,
  Package,
  Plane,
  ShoppingCart,
  Tag,
  Truck,
} from "lucide-react";

export type UserRole = "user" | "admin" | "superAdmin";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const super_admin_nav_items: NavItem[] = [
  {
    title: "Invite Admins",
    href: "/dashboard/admin/invite-admins",
    icon: Mail,
  },
];

export const admin_common_nav_items: NavItem[] = [
  {
    title: "Analytics",
    href: "/dashboard/admin",
    icon: BarChart,
  },
  {
    title: "Manage Drones",
    href: "/dashboard/admin/manage-drones",
    icon: Plane,
  },
  {
    title: "Manage Brands",
    href: "/dashboard/admin/manage-brands",
    icon: Tag,
  },
  {
    title: "Manage Categories",
    href: "/dashboard/admin/manage-categories",
    icon: Tag,
  },
  {
    title: "Manage Orders",
    href: "/dashboard/admin/manage-orders",
    icon: LayoutList,
  },
];

export const userNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/user",
    icon: LayoutDashboard,
  },
  {
    title: "My Orders",
    href: "/dashboard/user/orders",
    icon: Package,
  },

  {
    title: "Shipping Info",
    href: "/dashboard/user/shipping",
    icon: Truck,
  },
  {
    title: "Cart",
    href: "/dashboard/user/cart",
    icon: ShoppingCart,
  },
  {
    title: "Wishlist",
    href: "/dashboard/user/wishlist",
    icon: Heart,
  },
];

export const commonNavItems: NavItem[] = [
  {
    title: "Go back",
    href: "/",
    icon: ArrowLeft,
  },
];

export function getNavItems(role: UserRole): NavItem[] {
  switch (role) {
    case "admin":
      return [...admin_common_nav_items, ...commonNavItems];
    case "superAdmin":
      return [
        ...admin_common_nav_items,
        ...super_admin_nav_items,
        ...commonNavItems,
      ];
    case "user":
      return [...userNavItems, ...commonNavItems];
    default:
      return [];
  }
}
