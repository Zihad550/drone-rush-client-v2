import {
  Heart,
  LayoutList,
  Package,
  Plane,
  PlusCircle,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

export type UserRole = "ADMIN" | "USER";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const adminNavItems: NavItem[] = [
  {
    title: "Add Drone",
    href: "/dashboard/admin/add-drone",
    icon: PlusCircle,
  },
  {
    title: "Make Admin",
    href: "/dashboard/admin/make-admin",
    icon: ShieldCheck,
  },
  {
    title: "Manage Drones",
    href: "/dashboard/admin/manage-drones",
    icon: Plane,
  },
  {
    title: "Manage Orders",
    href: "/dashboard/admin/manage-orders",
    icon: LayoutList,
  },
];

export const userNavItems: NavItem[] = [
  {
    title: "My Orders",
    href: "/dashboard/user/orders",
    icon: Package,
  },
  {
    title: "Purchased",
    href: "/dashboard/user/purchased",
    icon: ShoppingBag,
  },
];

export const commonNavItems: NavItem[] = [
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

export function getNavItems(role: UserRole): NavItem[] {
  switch (role) {
    case "ADMIN":
      return adminNavItems;
    case "USER":
      return [...userNavItems, ...commonNavItems];
    default:
      return [];
  }
}
