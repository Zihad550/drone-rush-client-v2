"use client";
import { Key, Mail } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/services/auth/auth.service";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

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
            className="pl-8"
          />
        </div>
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
            className="pl-8"
          />
        </div>
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

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={isPending}
      >
        Login
      </Button>
    </form>
  );
}
