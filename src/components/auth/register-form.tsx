"use client";
import { Key, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InlineSpinner from "@/components/inline-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { registerUser } from "@/services/auth/auth.service";
export default function RegisterForm() {
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("token");
  const router = useRouter();
  const { refreshAuth } = useAuth();

  const [state, formAction, isPending] = useActionState(registerUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    if (state?.success) {
      refreshAuth().then(() => {
        router.push("/");
      });
    }
  }, [state?.success, refreshAuth, router]);

  // Extract field-specific errors if available
  const fieldErrors = state?.errors || {};
  const hasErrors = state && !state.success;
  return (
    <form action={formAction} className="space-y-4">
      {inviteToken && (
        <input type="hidden" name="inviteToken" value={inviteToken} />
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <div className="relative">
          <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            required
            className={`pl-8 ${fieldErrors.name ? "border-destructive focus:border-destructive" : ""}`}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
          />
        </div>
        {fieldErrors.name && (
          <p id="name-error" className="text-sm text-destructive" role="alert">
            {fieldErrors.name}
          </p>
        )}
      </div>
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
            className={`pl-8 ${fieldErrors.email ? "border-destructive focus:border-destructive" : ""}`}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
        </div>
        {fieldErrors.email && (
          <p id="email-error" className="text-sm text-destructive" role="alert">
            {fieldErrors.email}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Your Password</Label>
        <div className="relative">
          <Key className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type="password"
            required
            className={`pl-8 ${fieldErrors.password ? "border-destructive focus:border-destructive" : ""}`}
            aria-invalid={!!fieldErrors.password}
            aria-describedby={
              fieldErrors.password ? "password-error" : undefined
            }
          />
        </div>
        {fieldErrors.password && (
          <p
            id="password-error"
            className="text-sm text-destructive"
            role="alert"
          >
            {fieldErrors.password}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="retype_password">Retype Your Password</Label>
        <div className="relative">
          <Key className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="retype_password"
            name="retype_password"
            type="password"
            required
            className={`pl-8 ${fieldErrors.retype_password ? "border-destructive focus:border-destructive" : ""}`}
            aria-invalid={!!fieldErrors.retype_password}
            aria-describedby={
              fieldErrors.retype_password ? "retype-password-error" : undefined
            }
          />
        </div>
        {fieldErrors.retype_password && (
          <p
            id="retype-password-error"
            className="text-sm text-destructive"
            role="alert"
          >
            {fieldErrors.retype_password}
          </p>
        )}
      </div>

      <div className="text-center">
        <Link href="/login">
          <Button
            variant="link"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Already Registered? Please Login
          </Button>
        </Link>
      </div>

      {/* Aria-live region for form status announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {hasErrors && state?.message && `Error: ${state.message}`}
        {isPending && "Registering..."}
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <InlineSpinner size="sm" />
            Registering...
          </>
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
}
