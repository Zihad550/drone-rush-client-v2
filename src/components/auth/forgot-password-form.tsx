"use client";
import { Mail, Send } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InlineSpinner from "@/components/inline-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordUser } from "@/services/auth/auth.service";

const initialState = {
  message: "",
  errors: {},
};

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(
    forgotPasswordUser,
    initialState,
  );

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
      <div className="space-y-2">
        <Label htmlFor="email">Your Email</Label>
        <div className="relative">
          <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            className={`pl-8 transition-all duration-200 focus:ring-2 focus:ring-primary/20 hover:shadow-sm ${
              fieldErrors.email
                ? "border-destructive focus:border-destructive"
                : ""
            }`}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
        </div>
        {fieldErrors.email && (
          <p id="email-error" className="text-sm text-destructive" role="alert">
            {fieldErrors.email[0]}
          </p>
        )}
        {!fieldErrors.email && (
          <p className="text-xs text-muted-foreground">
            We'll send a password reset link to this email address.
          </p>
        )}
      </div>

      {/* Aria-live region for form status announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {hasErrors && state?.message && `Error: ${state.message}`}
        {isPending && "Sending reset email..."}
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md bg-gradient-to-r from-primary to-primary/90"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <InlineSpinner size="sm" />
            Sending Reset Email...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Reset Email
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
