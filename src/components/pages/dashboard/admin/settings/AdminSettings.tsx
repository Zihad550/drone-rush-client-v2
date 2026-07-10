"use client";

import {
  Check,
  KeyRound,
  Loader2,
  Mail,
  Send,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  adminCardClass,
  adminPrimaryBtnClass,
  STATUS_STYLES,
} from "@/components/shared/admin/admin-ui";
import { cn } from "@/lib/utils";
import {
  deleteInvite,
  getInvites,
  getMyProfile,
  sendInvite,
} from "@/services/user/user.service";
import type { TUserRole } from "@/types/user.type";

interface Invite {
  _id: string;
  email: string;
  status: "pending" | "accepted" | "expired";
  createdAt: string;
  expiresAt: string;
}

const ROLE_CARDS: {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  style: typeof STATUS_STYLES.red;
  permissions: string[];
}[] = [
  {
    name: "Superadmin",
    icon: Shield,
    style: STATUS_STYLES.red,
    permissions: [
      "Full store & inventory control",
      "Manage roles & permissions",
      "Invite and remove team members",
      "Access billing & payouts",
    ],
  },
  {
    name: "Admin",
    icon: KeyRound,
    style: STATUS_STYLES.blue,
    permissions: [
      "Manage drones & inventory",
      "Process and update orders",
      "View analytics dashboards",
      "No access to roles or billing",
    ],
  },
  {
    name: "Support",
    icon: Users,
    style: STATUS_STYLES.amber,
    permissions: [
      "View orders & customers",
      "Respond to customer queries",
      "Read-only inventory access",
      "No destructive actions",
    ],
  },
];

// Store-level toggles. NOTE: no persistence endpoint exists yet — documented in
// ../drone-rush-server/REQUIRED_ENDPOINTS.md (GET/PATCH /admin/settings).
const DEFAULT_TOGGLES = {
  maintenanceMode: false,
  guestCheckout: true,
  lowStockAlerts: true,
  newOrderNotifications: true,
};

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2.5">
        <span className="h-[2px] w-7 rounded-full bg-dr-red" />
        <span className="font-dm-mono text-[10.5px] uppercase tracking-[0.2em] text-dr-red">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-chakra text-[20px] font-bold tracking-[-0.01em] text-dr-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1 text-[13px] text-dr-text-3">{subtitle}</p>
      )}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        "relative h-[26px] w-[46px] shrink-0 rounded-full transition-colors",
        checked ? "bg-dr-red" : "bg-dr-bd-2",
      )}
    >
      <span
        className={cn(
          "absolute left-[3px] top-[3px] h-5 w-5 rounded-full bg-white transition-transform",
          checked ? "translate-x-[20px]" : "translate-x-0",
        )}
      />
    </button>
  );
}

export default function AdminSettings() {
  const [role, setRole] = useState<TUserRole | null>(null);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loadingInvites, setLoadingInvites] = useState(true);
  const [toggles, setToggles] = useState(DEFAULT_TOGGLES);

  useEffect(() => {
    let active = true;
    getMyProfile()
      .then((res: { success?: boolean; data?: { role?: TUserRole } }) => {
        if (active && res?.data?.role) setRole(res.data.role);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const fetchInvites = useCallback(async () => {
    try {
      const res = await getInvites();
      if (res.success) setInvites(res.data);
    } catch {
      // Best-effort; team list simply stays empty on failure.
    } finally {
      setLoadingInvites(false);
    }
  }, []);

  useEffect(() => {
    fetchInvites();
  }, [fetchInvites]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    try {
      const res = await sendInvite(email.trim());
      if (res.success) {
        toast.success(res.message || "Invite sent");
        setEmail("");
        fetchInvites();
      } else {
        toast.error(res.message || "Failed to send invite");
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteInvite(id);
      if (res.success) {
        toast.success("Invite revoked");
        fetchInvites();
      } else {
        toast.error(res.message || "Failed to revoke invite");
      }
    } catch {
      toast.error("Failed to revoke invite");
    }
  };

  const inviteStatusStyle = (s: Invite["status"]) =>
    s === "accepted"
      ? STATUS_STYLES.green
      : s === "expired"
        ? STATUS_STYLES.grey
        : STATUS_STYLES.amber;

  const isSuperAdmin = role === "superAdmin";

  return (
    <div className="flex flex-col gap-8">
      {/* Roles & permissions — superadmin only */}
      {isSuperAdmin && (
        <section className="flex flex-col gap-4">
          <SectionHeader
            eyebrow="Access control"
            title="Roles & permissions"
            subtitle="What each role can do inside the admin console."
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {ROLE_CARDS.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.name} className={`${adminCardClass} p-[22px]`}>
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px]"
                      style={{ background: r.style.bg, color: r.style.color }}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <h3 className="font-poppins text-[15.5px] font-semibold text-dr-text">
                      {r.name}
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {r.permissions.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-[13px] text-dr-text-2"
                      >
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0"
                          style={{ color: r.style.color }}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Team members — real invite wiring */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          eyebrow="Team"
          title="Team members"
          subtitle="Invite teammates as admins and manage pending invitations."
        />
        <div className={`${adminCardClass} p-[22px]`}>
          <form
            onSubmit={handleInvite}
            className="flex flex-wrap items-end gap-3"
          >
            <div className="flex min-w-[240px] flex-1 flex-col gap-1.5">
              <label
                htmlFor="invite-email"
                className="font-poppins text-[12.5px] font-semibold text-dr-text-2"
              >
                Invite by email
              </label>
              <div className="relative flex items-center">
                <Mail className="pointer-events-none absolute left-3 h-[15px] w-[15px] text-dr-text-3" />
                <input
                  id="invite-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="teammate@dronerush.com"
                  className="w-full rounded-[10px] border border-dr-bd-2 bg-dr-field py-[11px] pl-9 pr-3 text-[13.5px] text-dr-text placeholder:text-dr-text-3 focus:border-dr-red/50 focus:outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={sending}
              className={cn(adminPrimaryBtnClass, "disabled:opacity-60")}
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Send invite
            </button>
          </form>
        </div>

        <div className={`${adminCardClass} overflow-hidden`}>
          <div className="hidden grid-cols-[2fr_1fr_1fr_40px] gap-3.5 border-b border-dr-bd-1 px-[22px] py-3.5 font-dm-mono text-[10.5px] uppercase tracking-[0.1em] text-dr-text-3 md:grid">
            <span>Email</span>
            <span>Status</span>
            <span>Expires</span>
            <span />
          </div>
          {loadingInvites ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-dr-red" />
            </div>
          ) : invites.length === 0 ? (
            <div className="px-[22px] py-12 text-center text-[13.5px] text-dr-text-3">
              No pending invitations.
            </div>
          ) : (
            invites.map((inv) => {
              const st = inviteStatusStyle(inv.status);
              return (
                <div
                  key={inv._id}
                  className="grid grid-cols-[1fr_40px] items-center gap-3.5 border-b border-dr-bd-1 px-[22px] py-3.5 last:border-0 hover:bg-dr-bd-1/50 md:grid-cols-[2fr_1fr_1fr_40px]"
                >
                  <span className="truncate font-poppins text-sm font-medium text-dr-text">
                    {inv.email}
                  </span>
                  <span
                    className="hidden w-fit items-center gap-1.5 rounded-full border px-2.5 py-[5px] text-xs font-semibold capitalize md:inline-flex"
                    style={{
                      color: st.color,
                      background: st.bg,
                      borderColor: st.bd,
                    }}
                  >
                    <span
                      className="h-[5px] w-[5px] rounded-full"
                      style={{ background: st.color }}
                    />
                    {inv.status}
                  </span>
                  <span className="hidden text-[13px] text-dr-text-3 md:block">
                    {new Date(inv.expiresAt).toLocaleDateString()}
                  </span>
                  {inv.status === "pending" ? (
                    <button
                      type="button"
                      onClick={() => handleDelete(inv._id)}
                      className="flex h-8 w-8 items-center justify-center justify-self-end rounded-lg text-dr-text-3 transition-colors hover:bg-dr-red/10 hover:text-dr-red"
                      aria-label={`Revoke invite for ${inv.email}`}
                    >
                      <Trash2 className="h-[16px] w-[16px]" />
                    </button>
                  ) : (
                    <span />
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Store settings */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          eyebrow="Preferences"
          title="Store settings"
          subtitle="Storefront behavior and notification preferences."
        />
        <div className={`${adminCardClass} divide-y divide-dr-bd-1`}>
          {(
            [
              {
                key: "maintenanceMode",
                title: "Maintenance mode",
                desc: "Temporarily take the storefront offline for shoppers.",
              },
              {
                key: "guestCheckout",
                title: "Guest checkout",
                desc: "Allow customers to check out without an account.",
              },
              {
                key: "lowStockAlerts",
                title: "Low-stock email alerts",
                desc: "Email admins when a drone drops below the reorder threshold.",
              },
              {
                key: "newOrderNotifications",
                title: "New-order notifications",
                desc: "Notify the team whenever a new order is placed.",
              },
            ] as const
          ).map((row) => (
            <div
              key={row.key}
              className="flex items-center justify-between gap-4 px-[22px] py-[18px]"
            >
              <div className="min-w-0">
                <div className="font-poppins text-sm font-semibold text-dr-text">
                  {row.title}
                </div>
                <div className="mt-0.5 text-[12.5px] text-dr-text-3">
                  {row.desc}
                </div>
              </div>
              <Toggle
                checked={toggles[row.key]}
                onChange={() =>
                  setToggles((t) => ({ ...t, [row.key]: !t[row.key] }))
                }
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => toast.success("Store settings saved")}
            className={adminPrimaryBtnClass}
          >
            Save changes
          </button>
        </div>
      </section>
    </div>
  );
}
