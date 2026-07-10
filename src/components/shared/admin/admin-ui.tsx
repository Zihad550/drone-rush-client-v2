import type { TOrderStatus } from "@/types/order.type";

/** Avatar gradient palette (matches design). Index by position for variety. */
export const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#ff6377,#c81733)",
  "linear-gradient(135deg,#4a9eff,#1f5fc9)",
  "linear-gradient(135deg,#37c98a,#128a55)",
  "linear-gradient(135deg,#f5a623,#d47f00)",
  "linear-gradient(135deg,#a678ff,#6b3fd6)",
];

export function initialsOf(name?: string): string {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? "";
  return (a + b).toUpperCase() || "DR";
}

export interface StatusStyle {
  color: string;
  bg: string;
  bd: string;
}

/** Semantic status colors from the DroneRush v2 admin design. */
export const STATUS_STYLES = {
  green: {
    color: "#1f9d5c",
    bg: "rgba(31,157,92,.12)",
    bd: "rgba(31,157,92,.38)",
  },
  blue: {
    color: "#4a9eff",
    bg: "rgba(74,158,255,.12)",
    bd: "rgba(74,158,255,.38)",
  },
  amber: {
    color: "#f5a623",
    bg: "rgba(245,166,35,.13)",
    bd: "rgba(245,166,35,.4)",
  },
  grey: {
    color: "#8b8391",
    bg: "rgba(139,131,145,.13)",
    bd: "rgba(139,131,145,.4)",
  },
  red: {
    color: "#ef2b45",
    bg: "rgba(239,43,69,.12)",
    bd: "rgba(239,43,69,.38)",
  },
} satisfies Record<string, StatusStyle>;

/** Map a real backend order status to a design status label + color. */
export function orderStatusMeta(status: TOrderStatus): {
  label: string;
  style: StatusStyle;
} {
  switch (status) {
    case "COMPLETED":
      return { label: "Delivered", style: STATUS_STYLES.green };
    case "PENDING":
      return { label: "Pending", style: STATUS_STYLES.amber };
    case "PROCESSING":
    case "PACKAGED":
    case "DELIVERING":
      return {
        label: status.charAt(0) + status.slice(1).toLowerCase(),
        style: STATUS_STYLES.blue,
      };
    case "USER-CANCELLED":
    case "ADMIN-CANCELLED":
      return { label: "Cancelled", style: STATUS_STYLES.grey };
    case "FAILED":
      return { label: "Failed", style: STATUS_STYLES.red };
    default:
      return { label: status, style: STATUS_STYLES.grey };
  }
}

/** A pill showing a colored dot + label using a StatusStyle. */
export function StatusPill({
  label,
  style,
  className,
}: {
  label: string;
  style: StatusStyle;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-semibold ${className ?? ""}`}
      style={{
        color: style.color,
        background: style.bg,
        borderColor: style.bd,
      }}
    >
      <span
        className="h-[5px] w-[5px] rounded-full"
        style={{ background: style.color }}
      />
      {label}
    </span>
  );
}

/** The DroneRush drone glyph used as an inventory thumbnail. */
export function DroneThumb({ size = 30 }: { size?: number }) {
  const w = size;
  const h = Math.round((size * 23) / 30);
  return (
    <svg
      viewBox="0 0 160 120"
      width={w}
      height={h}
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="80"
        y1="62"
        x2="34"
        y2="36"
        stroke="#6c6675"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <line
        x1="80"
        y1="62"
        x2="126"
        y2="36"
        stroke="#6c6675"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <line
        x1="80"
        y1="62"
        x2="34"
        y2="88"
        stroke="#6c6675"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <line
        x1="80"
        y1="62"
        x2="126"
        y2="88"
        stroke="#6c6675"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="34" cy="36" r="11" stroke="#ef2b45" strokeWidth="6" />
      <circle cx="126" cy="36" r="11" stroke="#ef2b45" strokeWidth="6" />
      <circle cx="34" cy="88" r="11" stroke="#ef2b45" strokeWidth="6" />
      <circle cx="126" cy="88" r="11" stroke="#ef2b45" strokeWidth="6" />
      <rect x="66" y="52" width="28" height="20" rx="5" fill="#514d58" />
    </svg>
  );
}

/** Card shell matching the design: rounded-16, dr-surface, dr-bd-1 border. */
export const adminCardClass =
  "rounded-[18px] border border-dr-bd-1 bg-dr-surface";

/** Primary red-gradient CTA button used across the admin console. */
export const adminPrimaryBtnClass =
  "inline-flex items-center gap-2 rounded-[10px] bg-gradient-to-r from-[#ef2b45] to-[#c81733] px-[18px] py-[11px] font-poppins text-[13.5px] font-bold text-white shadow-[0_8px_20px_rgba(239,43,69,.28)] transition-opacity hover:opacity-90";
