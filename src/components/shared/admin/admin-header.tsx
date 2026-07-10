"use client";

import {
  Bell,
  ChevronRight,
  DollarSign,
  Menu,
  Search,
  ShoppingCart,
  Star,
  TriangleAlert,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { adminPageTitle } from "@/lib/admin-nav-config";
import { cn } from "@/lib/utils";
import { getMyProfile } from "@/services/user/user.service";
import { ModeToggle } from "../mode-toggle";
import { initialsOf } from "./admin-ui";

type NotifType = "order" | "stock" | "refund" | "user" | "review";

interface AdminNotif {
  id: number;
  type: NotifType;
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

const NOTIF_META: Record<
  NotifType,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bg: string;
  }
> = {
  order: { icon: ShoppingCart, color: "#4a9eff", bg: "rgba(74,158,255,.14)" },
  stock: { icon: TriangleAlert, color: "#f5a623", bg: "rgba(245,166,35,.14)" },
  refund: { icon: DollarSign, color: "#ef2b45", bg: "rgba(239,43,69,.14)" },
  user: { icon: Users, color: "#37c98a", bg: "rgba(55,201,138,.14)" },
  review: { icon: Star, color: "#a678ff", bg: "rgba(166,120,255,.14)" },
};

const INITIAL_NOTIFS: AdminNotif[] = [
  {
    id: 1,
    type: "order",
    title: "New order DR-48210",
    desc: "Jordan Reyes ordered a Mavic 4 Pro + Fly More Kit.",
    time: "12m ago",
    read: false,
  },
  {
    id: 2,
    type: "stock",
    title: "Low stock alert",
    desc: "Air 3S Fly More Combo is down to 8 units.",
    time: "1h ago",
    read: false,
  },
  {
    id: 3,
    type: "refund",
    title: "Refund requested",
    desc: "Priya Nair requested a refund on DR-48195.",
    time: "2h ago",
    read: false,
  },
  {
    id: 4,
    type: "review",
    title: "New 5-star review",
    desc: "Mini 4 Pro received a new verified review.",
    time: "3h ago",
    read: true,
  },
  {
    id: 5,
    type: "user",
    title: "Team invite accepted",
    desc: "Priyanka Rao joined as an Admin.",
    time: "5h ago",
    read: true,
  },
];

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const title = adminPageTitle(pathname);
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState<{ name?: string }>({});
  const [notifOpen, setNotifOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifs, setNotifs] = useState<AdminNotif[]>(INITIAL_NOTIFS);

  useEffect(() => {
    let active = true;
    getMyProfile()
      .then((res) => {
        if (active && res?.success && res.data)
          setProfile({ name: res.data.name });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const unread = notifs.filter((n) => !n.read).length;
  const list = useMemo(
    () => (filter === "unread" ? notifs.filter((n) => !n.read) : notifs),
    [notifs, filter],
  );

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-5 border-b border-dr-bd-1 bg-dr-nav px-5 py-[18px] backdrop-blur-[14px] sm:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-[9px] text-dr-text-2 hover:bg-dr-bd-1 hover:text-dr-text lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <div className="mb-0.5 flex items-center gap-1.5 text-xs text-dr-text-3">
            <span>Admin</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-dr-text-2">{title}</span>
          </div>
          <h1 className="font-chakra text-[23px] font-bold tracking-[-0.01em] text-dr-text">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden items-center md:flex">
          <Search className="pointer-events-none absolute left-[13px] h-4 w-4 text-dr-text-3" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search anything…"
            className="w-[230px] rounded-[10px] border border-dr-bd-2 bg-dr-field py-[10px] pl-[38px] pr-3 text-[13.5px] text-dr-text placeholder:text-dr-text-3 focus:border-dr-red/50 focus:outline-none"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            title="Notifications"
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center rounded-[10px] border border-dr-bd-2 text-dr-text transition-colors hover:bg-dr-bd-1"
          >
            <Bell className="h-[18px] w-[18px]" />
            {unread > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-dr-red px-1 font-poppins text-[10px] font-bold text-white ring-2 ring-dr-nav">
                {unread}
              </span>
            )}
          </button>
          {notifOpen && (
            <>
              <button
                type="button"
                aria-label="Close notifications"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setNotifOpen(false)}
              />
              <div className="absolute right-0 top-[52px] z-50 w-[388px] max-w-[92vw] overflow-hidden rounded-[16px] border border-dr-bd-2 bg-dr-surface shadow-[0_24px_60px_rgba(0,0,0,.4)]">
                <div className="flex items-center justify-between px-[18px] pb-3 pt-4">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-poppins text-[15px] font-bold text-dr-text">
                      Notifications
                    </h3>
                    {unread > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-dr-red px-1.5 font-poppins text-[10.5px] font-bold text-white">
                        {unread}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setNotifs((prev) =>
                        prev.map((n) => ({ ...n, read: true })),
                      )
                    }
                    className="rounded-md px-2 py-1 font-poppins text-xs font-semibold text-dr-text-3 transition-colors hover:bg-dr-bd-1 hover:text-dr-red"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="flex gap-1.5 px-[18px] pb-3">
                  {(["all", "unread"] as const).map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setFilter(k)}
                      className={cn(
                        "rounded-lg px-3.5 py-1.5 font-poppins text-xs font-semibold capitalize transition-colors",
                        filter === k
                          ? "bg-dr-red/[0.12] text-dr-red"
                          : "text-dr-text-3 hover:bg-dr-bd-1",
                      )}
                    >
                      {k === "unread" ? `Unread · ${unread}` : "All"}
                    </button>
                  ))}
                </div>
                <div className="max-h-[360px] overflow-y-auto border-t border-dr-bd-1">
                  {list.length === 0 ? (
                    <div className="px-5 py-11 text-center text-[13px] text-dr-text-3">
                      You&apos;re all caught up.
                    </div>
                  ) : (
                    list.map((n) => {
                      const meta = NOTIF_META[n.type];
                      const Icon = meta.icon;
                      return (
                        <button
                          type="button"
                          key={n.id}
                          onClick={() =>
                            setNotifs((prev) =>
                              prev.map((x) =>
                                x.id === n.id ? { ...x, read: true } : x,
                              ),
                            )
                          }
                          className={cn(
                            "flex w-full gap-3 border-b border-dr-bd-1 px-[18px] py-[13px] text-left transition-colors hover:bg-dr-bd-1",
                            !n.read && "bg-dr-red/[0.06]",
                          )}
                        >
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px]"
                            style={{ background: meta.bg, color: meta.color }}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-poppins text-[13px] font-semibold leading-snug text-dr-text">
                              {n.title}
                            </span>
                            <span className="mt-0.5 block text-xs leading-snug text-dr-text-3">
                              {n.desc}
                            </span>
                            <span className="mt-1 block font-dm-mono text-[10px] text-dr-text-3">
                              {n.time}
                            </span>
                          </span>
                          {!n.read && (
                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-dr-red" />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <ModeToggle />

        <div className="hidden h-[26px] w-px bg-dr-bd-1 sm:block" />

        <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#ff6377] to-[#c81733] font-poppins text-[13px] font-bold text-white sm:flex">
          {initialsOf(profile.name)}
        </span>
      </div>
    </header>
  );
}
