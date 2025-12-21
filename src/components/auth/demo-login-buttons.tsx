"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import InlineSpinner from "@/components/inline-spinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { loginUser } from "@/services/auth/auth.service";

export default function DemoLoginButtons() {
  const [adminPending, setAdminPending] = useState(false);
  const [userPending, setUserPending] = useState(false);
  const router = useRouter();
  const { refreshAuth } = useAuth();

  const handleDemoLogin = async (demoType: "admin" | "user") => {
    const setPending = demoType === "admin" ? setAdminPending : setUserPending;
    setPending(true);
    try {
      const formData = new FormData();
      formData.append("demo", demoType);

      const result = await loginUser(null, formData);

      if (result.success) {
        await refreshAuth();
        router.push("/");
      } else {
        toast.error(result.message || "Demo login failed");
      }
    } catch {
      toast.error("Demo login failed");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1 hover:scale-105 hover:shadow-md cursor-pointer"
          onClick={() => handleDemoLogin("admin")}
          disabled={adminPending}
        >
          {adminPending ? (
            <>
              <InlineSpinner size="sm" />
              Logging in...
            </>
          ) : (
            "Demo Admin"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1 hover:scale-105 hover:shadow-md cursor-pointer"
          onClick={() => handleDemoLogin("user")}
          disabled={userPending}
        >
          {userPending ? (
            <>
              <InlineSpinner size="sm" />
              Logging in...
            </>
          ) : (
            "Demo User"
          )}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Try the app with demo credentials
      </p>
    </div>
  );
}
