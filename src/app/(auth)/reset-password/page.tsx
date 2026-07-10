import Link from "next/link";
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/auth/reset-password-form";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    redirect("/login");
  }

  return (
    <div
      className="min-h-screen bg-dr-field px-6 py-[26px] sm:px-10"
      style={{
        background:
          "radial-gradient(circle at 78% 12%,rgba(239,43,69,.10),transparent 55%),var(--dr-field)",
      }}
    >
      <Link
        href="/login"
        className="text-[15px] text-dr-text-2 transition-colors hover:text-dr-red"
      >
        Back to Login
      </Link>

      <div className="mt-20 flex items-center justify-center">
        <div className="w-full max-w-[420px] rounded-[14px] border border-dr-bd-1 bg-dr-surface p-[34px]">
          {/* Lock chip */}
          <div className="mx-auto mb-[18px] flex h-[52px] w-[52px] items-center justify-center rounded-[13px] bg-dr-red/[0.12] text-dr-red">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              role="img"
              aria-label="Lock"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
            </svg>
          </div>

          <h1 className="text-center font-poppins text-2xl font-bold text-dr-text">
            Reset your password
          </h1>
          <p className="mx-auto mb-6 mt-2 max-w-[320px] text-center text-[13.5px] leading-[1.55] text-dr-text-3">
            Enter your current password and choose a new one to secure your
            account.
          </p>

          <ResetPasswordForm token={token} />
        </div>
      </div>
    </div>
  );
}
