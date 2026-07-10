"use client";

import {
  KeyRound,
  Loader2,
  MoreVertical,
  Plus,
  Search,
  Shield,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AVATAR_GRADIENTS,
  adminCardClass,
  adminPrimaryBtnClass,
  initialsOf,
  STATUS_STYLES,
} from "@/components/shared/admin/admin-ui";
import { cn } from "@/lib/utils";
import { getAdminUsers } from "@/services/admin/admin.service";
import type { TUserRole, TUserStatus } from "@/types/user.type";

type UserRoleLabel = "Superadmin" | "Admin" | "Customer";

interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: UserRoleLabel;
  status: "Active" | "Suspended";
  orders: string;
  spent: string;
}

// Raw user record returned by GET /admin/users (matches server `IUser` +
// order aggregates). Documented in ../drone-rush-server/REQUIRED_ENDPOINTS.md.
interface AdminUserDto {
  _id: string;
  name: string;
  email: string;
  role: TUserRole;
  status: TUserStatus;
  ordersCount?: number;
  totalSpent?: number;
}

interface PageMeta {
  page: number;
  limit: number;
  total: number;
  total_page: number;
}

const PAGE_LIMIT = 10;

const ROLE_LABEL: Record<TUserRole, UserRoleLabel> = {
  superAdmin: "Superadmin",
  admin: "Admin",
  user: "Customer",
};

// Reverse map for the server `role` query param.
const ROLE_QUERY: Record<UserRoleLabel, TUserRole> = {
  Superadmin: "superAdmin",
  Admin: "admin",
  Customer: "user",
};

const currencyFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function toRow(u: AdminUserDto): AdminUserRow {
  return {
    id: u._id,
    name: u.name,
    email: u.email,
    role: ROLE_LABEL[u.role] ?? "Customer",
    status: u.status === "blocked" ? "Suspended" : "Active",
    orders: String(u.ordersCount ?? 0),
    spent: currencyFmt.format(u.totalSpent ?? 0),
  };
}

const ROLE_STYLE: Record<
  UserRoleLabel,
  {
    style: typeof STATUS_STYLES.red;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  Superadmin: { style: STATUS_STYLES.red, icon: Shield },
  Admin: { style: STATUS_STYLES.blue, icon: KeyRound },
  Customer: { style: STATUS_STYLES.grey, icon: Users },
};

const ROLE_TABS: ("All" | UserRoleLabel)[] = [
  "All",
  "Customer",
  "Admin",
  "Superadmin",
];

function statusColor(s: AdminUserRow["status"]): string {
  return s === "Active" ? "#1f9d5c" : "#ef2b45";
}

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<"All" | UserRoleLabel>("All");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<AdminUserRow[]>([]);
  const [meta, setMeta] = useState<PageMeta | null>(null);
  const [loading, setLoading] = useState(true);

  // Debounce the search box so we don't refetch on every keystroke.
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  // Reset to the first page whenever the filters change.
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset page on filter change only
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, role]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminUsers({
        page,
        limit: PAGE_LIMIT,
        search: debouncedSearch,
        role: role === "All" ? "" : ROLE_QUERY[role],
      });
      if (res?.success) {
        setRows((res.data as AdminUserDto[]).map(toRow));
        setMeta(res.meta as PageMeta);
      } else {
        setRows([]);
        setMeta(null);
        toast.error(res?.message || "Failed to load users");
      }
    } catch {
      setRows([]);
      setMeta(null);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, role]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const totalPages = meta?.total_page ?? 1;

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
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-dr-red" />
          </div>
        ) : rows.length === 0 ? (
          <div className="px-[22px] py-12 text-center text-[13.5px] text-dr-text-3">
            No users match your search.
          </div>
        ) : (
          rows.map((u, i) => {
            const rs = ROLE_STYLE[u.role];
            const RoleIcon = rs.icon;
            return (
              <div
                key={u.id}
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

      {meta && totalPages > 1 && (
        <div className="flex items-center justify-between gap-3">
          <span className="text-[12.5px] text-dr-text-3">
            Page {meta.page} of {totalPages} · {meta.total} users
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={loading || page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-[9px] border border-dr-bd-2 bg-dr-field px-3.5 py-2 font-poppins text-[12.5px] font-semibold text-dr-text-2 transition-colors hover:border-dr-red/40 hover:text-dr-text disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={loading || page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-[9px] border border-dr-bd-2 bg-dr-field px-3.5 py-2 font-poppins text-[12.5px] font-semibold text-dr-text-2 transition-colors hover:border-dr-red/40 hover:text-dr-text disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
