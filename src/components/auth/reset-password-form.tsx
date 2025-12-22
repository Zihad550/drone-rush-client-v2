"use client";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import InlineSpinner from "@/components/inline-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPasswordUser } from "@/services/auth/auth.service";

const initialState = {
  message: "",
  errors: {},
};

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [state, formAction, isPending] = useActionState(
    resetPasswordUser,
    initialState,
  );
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  // Extract field-specific errors if available
  const fieldErrors = state?.errors || {};
  const hasErrors = state && !state.success;

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <div className="space-y-2">
        <Label htmlFor="oldPassword">Old Password</Label>
        <div className="relative">
          <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="oldPassword"
            name="oldPassword"
            type={showOldPassword ? "text" : "password"}
            placeholder="Enter your old password"
            required
            className={`pl-8 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 hover:shadow-sm ${
              fieldErrors.oldPassword
                ? "border-destructive focus:border-destructive"
                : ""
            }`}
            aria-invalid={!!fieldErrors.oldPassword}
            aria-describedby={
              fieldErrors.oldPassword ? "oldPassword-error" : undefined
            }
          />
          <button
            type="button"
            onClick={() => setShowOldPassword(!showOldPassword)}
            className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
            aria-label={showOldPassword ? "Hide password" : "Show password"}
          >
            {showOldPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {fieldErrors.oldPassword && (
          <p
            id="oldPassword-error"
            className="text-sm text-destructive"
            role="alert"
          >
            {fieldErrors.oldPassword[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>
        <div className="relative">
          <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="newPassword"
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter your new password"
            required
            className={`pl-8 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20 hover:shadow-sm ${
              fieldErrors.newPassword
                ? "border-destructive focus:border-destructive"
                : ""
            }`}
            aria-invalid={!!fieldErrors.newPassword}
            aria-describedby={
              fieldErrors.newPassword ? "newPassword-error" : undefined
            }
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
            aria-label={showNewPassword ? "Hide password" : "Show password"}
          >
            {showNewPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {fieldErrors.newPassword && (
          <p
            id="newPassword-error"
            className="text-sm text-destructive"
            role="alert"
          >
            {fieldErrors.newPassword[0]}
          </p>
        )}
        {!fieldErrors.newPassword && (
          <p className="text-xs text-muted-foreground">
            Password must be at least 8 characters.
          </p>
        )}
      </div>

      {/* Aria-live region for form status announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {hasErrors && state?.message && `Error: ${state.message}`}
        {isPending && "Resetting password..."}
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md bg-gradient-to-r from-primary to-primary/90"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <InlineSpinner size="sm" />
            Resetting Password...
          </>
        ) : (
          <>
            <Lock className="mr-2 h-4 w-4" />
            Reset Password
          </>
        )}
      </Button>
      {state?.message && (
        <p
          aria-live="polite"
          className={`text-sm mt-4 text-center ${
            state.success
              ? "text-green-600 dark:text-green-400"
              : "text-destructive"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
