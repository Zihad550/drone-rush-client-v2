"use client";
import { Eye, EyeOff } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import InlineSpinner from "@/components/inline-spinner";
import { cn } from "@/lib/utils";
import { resetPasswordUser } from "@/services/auth/auth.service";

const initialState = {
  message: "",
  errors: {},
};

interface ResetPasswordFormProps {
  token: string;
}

const inputClass =
  "w-full rounded-[9px] border border-dr-bd-3 bg-dr-field py-3 pl-[13px] pr-11 font-sans text-sm text-dr-text placeholder:text-dr-text-3 transition-colors focus:border-dr-red focus:outline-none";

const labelClass = "text-[12px] font-semibold text-dr-text-3";

// Design "Change password": strength meter driven by the new password.
function strengthOf(pw: string): { pct: string; color: string; label: string } {
  if (!pw) return { pct: "0%", color: "transparent", label: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { pct: "33%", color: "#ef2b45", label: "Weak" };
  if (score === 2) return { pct: "55%", color: "#f5a623", label: "Fair" };
  if (score === 3) return { pct: "80%", color: "#2f6bff", label: "Good" };
  return { pct: "100%", color: "#1f9d5c", label: "Strong" };
}

function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  invalid,
  errorId,
}: {
  id: string;
  name?: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  errorId?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <label htmlFor={id} className="flex flex-col gap-[7px]">
      <span className={labelClass}>{label}</span>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          placeholder="••••••••"
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            inputClass,
            invalid && "border-dr-red focus:border-dr-red",
          )}
          aria-invalid={invalid}
          aria-describedby={errorId}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dr-text-3 transition-colors hover:text-dr-text"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </label>
  );
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [state, formAction, isPending] = useActionState(
    resetPasswordUser,
    initialState,
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [confirmError, setConfirmError] = useState("");

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const fieldErrors = state?.errors || {};
  const hasErrors = state && !state.success;
  const strength = strengthOf(newPassword);

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (newPassword !== confirm) {
          e.preventDefault();
          setConfirmError("Passwords do not match");
        } else {
          setConfirmError("");
        }
      }}
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="token" value={token} />

      <PasswordField
        id="oldPassword"
        name="oldPassword"
        label="Current password"
        value={oldPassword}
        onChange={setOldPassword}
        invalid={!!fieldErrors.oldPassword}
        errorId={fieldErrors.oldPassword ? "oldPassword-error" : undefined}
      />
      {fieldErrors.oldPassword && (
        <p
          id="oldPassword-error"
          className="-mt-1 text-xs text-dr-red"
          role="alert"
        >
          {fieldErrors.oldPassword[0]}
        </p>
      )}

      <PasswordField
        id="newPassword"
        name="newPassword"
        label="New password"
        value={newPassword}
        onChange={setNewPassword}
        invalid={!!fieldErrors.newPassword}
        errorId={fieldErrors.newPassword ? "newPassword-error" : undefined}
      />

      {/* Strength meter */}
      <div className="-mt-1 flex items-center gap-2.5">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-dr-field">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: strength.pct, background: strength.color }}
          />
        </div>
        <span
          className="min-w-[52px] text-right text-xs font-semibold"
          style={{
            color:
              strength.color === "transparent" ? undefined : strength.color,
          }}
        >
          {strength.label}
        </span>
      </div>

      {fieldErrors.newPassword ? (
        <p
          id="newPassword-error"
          className="-mt-1 text-xs text-dr-red"
          role="alert"
        >
          {fieldErrors.newPassword[0]}
        </p>
      ) : (
        <p className="-mt-1 text-xs text-dr-text-3">
          Use at least 8 characters with a mix of letters, numbers and symbols.
        </p>
      )}

      <PasswordField
        id="confirmPassword"
        label="Confirm new password"
        value={confirm}
        onChange={(v) => {
          setConfirm(v);
          if (confirmError) setConfirmError("");
        }}
        invalid={!!confirmError}
        errorId={confirmError ? "confirm-error" : undefined}
      />
      {confirmError && (
        <p
          id="confirm-error"
          className="-mt-1 text-xs text-dr-red"
          role="alert"
        >
          {confirmError}
        </p>
      )}

      {/* Aria-live region for form status announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {hasErrors && state?.message && `Error: ${state.message}`}
        {isPending && "Resetting password..."}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 flex w-full items-center justify-center gap-2 rounded-[9px] bg-dr-red py-[13px] font-poppins text-[15px] font-semibold text-white transition-colors hover:bg-dr-red-strong disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <>
            <InlineSpinner size="sm" />
            Resetting password&hellip;
          </>
        ) : (
          "Reset password"
        )}
      </button>

      {state?.message && (
        <p
          aria-live="polite"
          className={cn(
            "text-center text-sm",
            state.success ? "text-[#1f9d5c]" : "text-dr-red",
          )}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
