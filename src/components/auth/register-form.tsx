"use client";
import { Key, Mail, User } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/services/auth/auth.service";
export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Your Name</Label>
        <div className="relative">
          <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            required
            className="pl-8"
          />
        </div>
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
      <div className="space-y-2">
        <Label htmlFor="retype_password">Retype Your Password</Label>
        <div className="relative">
          <Key className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="retype_password"
            name="retype_password"
            type="password"
            required
            className="pl-8"
          />
        </div>
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

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={isPending}
      >
        Register
      </Button>
    </form>
  );
}
