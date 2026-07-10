"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import InlineSpinner from "@/components/inline-spinner";
import { updateMyProfile } from "@/services/user/user.service";
import type IUser from "@/types/user.type";
import DashboardPageHeader from "../dashboard-page-header";

interface UserProfileProps {
  user: IUser;
}

function splitName(name?: string) {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  return { first: parts[0] ?? "", last: parts.slice(1).join(" ") };
}

function initials(first: string, last: string) {
  const a = first?.[0] ?? "";
  const b = last?.[0] ?? first?.[1] ?? "";
  return (a + b).toUpperCase() || "PR";
}

const inputClass =
  "rounded-[9px] border border-dr-bd-2 bg-dr-field px-[13px] py-3 font-sans text-sm text-dr-text placeholder:text-dr-text-3 transition-colors focus:border-dr-red focus:outline-none disabled:opacity-60";
const labelSpan = "text-[12px] font-semibold text-dr-text-3";
const fieldWrap = "flex flex-col gap-[7px]";

export default function UserProfile({ user }: UserProfileProps) {
  const router = useRouter();
  const initial = splitName(user.name);
  const [first, setFirst] = useState(initial.first);
  const [last, setLast] = useState(initial.last);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [address, setAddress] = useState(user.address ?? "");
  const [saving, setSaving] = useState(false);

  const since = user.createdAt ? new Date(user.createdAt).getFullYear() : null;
  const roleLabel =
    user.role === "superAdmin"
      ? "Super Admin"
      : user.role === "admin"
        ? "Admin"
        : "Pilot";

  const dirty =
    first !== initial.first ||
    last !== initial.last ||
    phone !== (user.phone ?? "") ||
    address !== (user.address ?? "");

  const reset = () => {
    setFirst(initial.first);
    setLast(initial.last);
    setPhone(user.phone ?? "");
    setAddress(user.address ?? "");
  };

  const handleSave = async () => {
    const name = `${first} ${last}`.trim();
    if (!name) {
      toast.error("Name is required");
      return;
    }
    setSaving(true);
    try {
      const res = await updateMyProfile({
        name,
        phone: phone.trim(),
        address: address.trim(),
      });
      if (res?.success) {
        toast.success("Changes saved");
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to save changes");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1080px] space-y-[22px]">
      <DashboardPageHeader eyebrow="My account" title="Profile" />

      {/* Profile card */}
      <div className="rounded-[16px] border border-dr-bd-1 bg-dr-surface p-[26px] pb-7">
        {/* Avatar row */}
        <div className="mb-[26px] flex items-center gap-5">
          <span className="flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff6377] to-[#c81733] font-poppins text-[27px] font-bold text-white shadow-[0_8px_22px_rgba(239,43,69,.3)]">
            {initials(first, last)}
          </span>
          <div>
            <div className="font-poppins text-[19px] font-bold text-dr-text">
              {`${first} ${last}`.trim() || "DroneRush Pilot"}
            </div>
            <div className="mb-3 mt-[3px] text-[13px] text-dr-text-3">
              {roleLabel}
              {since ? ` since ${since}` : ""}
            </div>
            <div className="flex gap-2.5">
              <button
                type="button"
                disabled
                title="Avatar upload coming soon"
                className="cursor-not-allowed rounded-[8px] border border-dr-bd-3 bg-transparent px-[13px] py-[7px] font-poppins text-[12.5px] font-semibold text-dr-text opacity-60"
              >
                Change photo
              </button>
              <button
                type="button"
                disabled
                title="Avatar upload coming soon"
                className="cursor-not-allowed rounded-[8px] bg-transparent px-2 py-[7px] font-poppins text-[12.5px] font-semibold text-dr-text-3 opacity-60"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 h-px bg-dr-bd-1" />

        {/* Fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label htmlFor="first" className={fieldWrap}>
            <span className={labelSpan}>First name</span>
            <input
              id="first"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              className={inputClass}
            />
          </label>
          <label htmlFor="last" className={fieldWrap}>
            <span className={labelSpan}>Last name</span>
            <input
              id="last"
              value={last}
              onChange={(e) => setLast(e.target.value)}
              className={inputClass}
            />
          </label>
          <label htmlFor="email" className={`${fieldWrap} sm:col-span-2`}>
            <span className={labelSpan}>Email</span>
            <input
              id="email"
              value={user.email ?? ""}
              disabled
              className={inputClass}
            />
          </label>
          <label htmlFor="phone" className={fieldWrap}>
            <span className={labelSpan}>Phone</span>
            <input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(512) 555-0199"
              className={inputClass}
            />
          </label>
          <label htmlFor="role" className={fieldWrap}>
            <span className={labelSpan}>Account role</span>
            <input
              id="role"
              value={roleLabel}
              disabled
              className={`${inputClass} font-dm-mono`}
            />
          </label>
          <label htmlFor="address" className={`${fieldWrap} sm:col-span-2`}>
            <span className={labelSpan}>Address</span>
            <input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, city, country"
              className={inputClass}
            />
          </label>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={reset}
          disabled={!dirty || saving}
          className="rounded-[10px] border border-dr-bd-3 bg-transparent px-[22px] py-3 font-poppins text-sm font-semibold text-dr-text transition-colors hover:border-dr-red/40 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!dirty || saving}
          className="flex items-center gap-2.5 rounded-[10px] bg-gradient-to-r from-[#ef2b45] to-[#c81733] px-6 py-3 font-poppins text-sm font-bold text-white shadow-[0_8px_20px_rgba(239,43,69,.3)] transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? (
            <>
              <InlineSpinner size="sm" />
              Saving&hellip;
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </div>
  );
}
