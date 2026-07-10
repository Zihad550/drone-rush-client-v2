import UserProfile from "@/components/pages/dashboard/user/profile/UserProfile";
import { checkAuthStatus } from "@/services/auth/auth-check.service";
import { getMyProfile } from "@/services/user/user.service";
import type IUser from "@/types/user.type";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  let user: IUser | null = null;

  try {
    const response = await getMyProfile();
    if (response?.success && response.data) {
      user = response.data as IUser;
    }
  } catch {
    // fall through to token-based fallback below
  }

  // Fallback: derive whatever the auth token carries (id, role, and any
  // extra claims such as email/name) so the page still renders.
  if (!user) {
    try {
      const auth = await checkAuthStatus();
      if (auth.user) {
        const payload = auth.user as Partial<IUser> & { id?: string };
        user = {
          ...(payload as IUser),
          _id: payload._id ?? payload.id ?? "",
        };
      }
    } catch {
      // ignore
    }
  }

  if (!user) {
    return (
      <div className="mx-auto flex h-96 max-w-[1180px] items-center justify-center rounded-[18px] border border-dr-bd-1 bg-dr-surface p-6">
        <div className="space-y-2 text-center">
          <p className="font-poppins text-lg font-semibold text-dr-text">
            Unable to load your profile
          </p>
          <p className="text-sm text-dr-text-3">
            Please refresh the page or sign in again.
          </p>
        </div>
      </div>
    );
  }

  return <UserProfile user={user} />;
}
