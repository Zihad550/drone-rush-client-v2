"use client";

import {
  KeyRound,
  MoreVertical,
  Plus,
  Search,
  Shield,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  AVATAR_GRADIENTS,
  adminCardClass,
  adminPrimaryBtnClass,
  initialsOf,
  STATUS_STYLES,
} from "@/components/shared/admin/admin-ui";
import { cn } from "@/lib/utils";

type UserRoleLabel = "Superadmin" | "Admin" | "Support" | "Customer";

interface AdminUserRow {
  name: string;
  email: string;
  role: UserRoleLabel;
  status: "Active" | "Suspended" | "Invited";
  orders: string;
  spent: string;
}

// NOTE: mock roster — the admin user directory endpoint (GET /admin/users) is
// not implemented yet. Documented in ../drone-rush-server/REQUIRED_ENDPOINTS.md.
const USERS: AdminUserRow[] = [
  {
    name: "Alex Chen",
    email: "alex@dronerush.com",
    role: "Superadmin",
    status: "Active",
    orders: "—",
    spent: "—",
  },
  {
    name: "Mara Devlin",
    email: "mara@dronerush.com",
    role: "Admin",
    status: "Active",
    orders: "—",
    spent: "—",
  },
  {
    name: "Wesley Cole",
    email: "wes@dronerush.com",
    role: "Support",
    status: "Active",
    orders: "—",
    spent: "—",
  },
  {
    name: "Jordan Reyes",
    email: "jordan.reyes@skymail.com",
    role: "Customer",
    status: "Active",
    orders: "12",
    spent: "$4,208",
  },
  {
    name: "Priya Nair",
    email: "priya.n@fastmail.com",
    role: "Customer",
    status: "Suspended",
    orders: "3",
    spent: "$1,058",
  },
  {
    name: "Tomás Ibarra",
    email: "tomas.i@outmail.com",
    role: "Customer",
    status: "Active",
    orders: "5",
    spent: "$2,940",
  },
  {
    name: "Grace Liu",
    email: "grace.liu@skymail.com",
    role: "Customer",
    status: "Active",
    orders: "8",
    spent: "$3,612",
  },
  {
    name: "Devon Hart",
    email: "devon.h@mailbox.io",
    role: "Customer",
    status: "Invited",
    orders: "0",
    spent: "$0",
  },
  {
    name: "Lena Okafor",
    email: "lena.o@skymail.com",
    role: "Customer",
    status: "Active",
    orders: "2",
    spent: "$759",
  },
];

const ROLE_STYLE: Record<
  UserRoleLabel,
  {
    style: typeof STATUS_STYLES.red;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  Superadmin: { style: STATUS_STYLES.red, icon: Shield },
  Admin: { style: STATUS_STYLES.blue, icon: KeyRound },
  Support: { style: STATUS_STYLES.amber, icon: Users },
  Customer: { style: STATUS_STYLES.grey, icon: Users },
};

const ROLE_TABS: ("All" | UserRoleLabel)[] = [
  "All",
  "Customer",
  "Admin",
  "Superadmin",
  "Support",
];

function statusColor(s: AdminUserRow["status"]): string {
  return s === "Active" ? "#1f9d5c" : s === "Suspended" ? "#ef2b45" : "#f5a623";
}

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<"All" | UserRoleLabel>("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return USERS.filter((u) => role === "All" || u.role === role).filter(
      (u) =>
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q),
    );
  }, [search, role]);

  return (
    <div className="flex flex-col gap-[18px]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 h-[15px] w-[15px] text-dr-text-3" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users…"
              className="w-[240px] rounded-[10px] border border-dr-bd-2 bg-dr-field py-[10px] pl-9 pr-3 text-[13.5px] text-dr-text placeholder:text-dr-text-3 focus:border-dr-red/50 focus:outline-none"
            />
          </div>
          <div className="flex gap-1 rounded-[10px] border border-dr-bd-2 bg-dr-field p-[3px]">
            {ROLE_TABS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={cn(
                  "rounded-[7px] px-3.5 py-1.5 font-poppins text-[12.5px] font-semibold transition-colors",
                  role === r
                    ? "bg-dr-red/[0.12] text-dr-red"
                    : "text-dr-text-3 hover:text-dr-text",
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            toast.success("Invite flow — manage via Settings › Team")
          }
          className={adminPrimaryBtnClass}
        >
          <Plus className="h-4 w-4" />
          Invite user
        </button>
      </div>

      <div className={`${adminCardClass} overflow-hidden`}>
        <div className="hidden grid-cols-[2fr_1fr_.9fr_.7fr_1fr_40px] gap-3.5 border-b border-dr-bd-1 px-[22px] py-3.5 font-dm-mono text-[10.5px] uppercase tracking-[0.1em] text-dr-text-3 md:grid">
          <span>User</span>
          <span>Role</span>
          <span>Status</span>
          <span>Orders</span>
          <span>Spent</span>
          <span />
        </div>
        {filtered.length === 0 ? (
          <div className="px-[22px] py-12 text-center text-[13.5px] text-dr-text-3">
            No users match your search.
          </div>
        ) : (
          filtered.map((u, i) => {
            const rs = ROLE_STYLE[u.role];
            const RoleIcon = rs.icon;
            return (
              <div
                key={u.email}
                className="grid grid-cols-[1fr_40px] items-center gap-3.5 border-b border-dr-bd-1 px-[22px] py-3.5 last:border-0 hover:bg-dr-bd-1/50 md:grid-cols-[2fr_1fr_.9fr_.7fr_1fr_40px]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full font-poppins text-[13px] font-bold text-white"
                    style={{
                      background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length],
                    }}
                  >
                    {initialsOf(u.name)}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-poppins text-sm font-semibold text-dr-text">
                      {u.name}
                    </div>
                    <div className="truncate text-xs text-dr-text-3">
                      {u.email}
                    </div>
                  </div>
                </div>
                <span
                  className="hidden w-fit items-center gap-1.5 rounded-full border px-2.5 py-[5px] text-xs font-semibold md:inline-flex"
                  style={{
                    color: rs.style.color,
                    background: rs.style.bg,
                    borderColor: rs.style.bd,
                  }}
                >
                  <RoleIcon className="h-3 w-3" />
                  {u.role}
                </span>
                <span
                  className="hidden items-center gap-1.5 text-[12.5px] font-semibold md:flex"
                  style={{ color: statusColor(u.status) }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: statusColor(u.status) }}
                  />
                  {u.status}
                </span>
                <span className="hidden text-[13.5px] text-dr-text-2 md:block">
                  {u.orders}
                </span>
                <span className="hidden font-poppins text-[13.5px] font-semibold text-dr-text md:block">
                  {u.spent}
                </span>
                <button
                  type="button"
                  onClick={() => toast("User actions coming soon")}
                  className="flex h-8 w-8 items-center justify-center justify-self-end rounded-lg text-dr-text-3 transition-colors hover:bg-dr-bd-1 hover:text-dr-text"
                  aria-label="User actions"
                >
                  <MoreVertical className="h-[18px] w-[18px]" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
