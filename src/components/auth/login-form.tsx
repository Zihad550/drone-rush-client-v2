"use client";
import { Key, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import DemoLoginButtons from "@/components/auth/demo-login-buttons";
import InlineSpinner from "@/components/inline-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { loginUser } from "@/services/auth/auth.service";

const initialState = {
  message: "",
  errors: {},
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState,
  );
  const router = useRouter();
  const { refreshAuth } = useAuth();

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
    <>
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
              className={`pl-8 ${fieldErrors.email ? "border-destructive focus:border-destructive" : ""}`}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
          </div>
          {fieldErrors.email && (
            <p
              id="email-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {fieldErrors.email[0]}
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
              minLength={8}
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
              {fieldErrors.password[0]}
            </p>
          )}
        </div>

        <div className="text-center">
          <Link href="/register">
            <Button
              variant="link"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              New User? Please Register
            </Button>
          </Link>
        </div>

        {/* Aria-live region for form status announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {hasErrors && state?.message && `Error: ${state.message}`}
          {isPending && "Logging in..."}
        </div>

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <InlineSpinner size="sm" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
        <p aria-live="polite">{state?.message}</p>
      </form>
      <DemoLoginButtons />
    </>
  );
}
