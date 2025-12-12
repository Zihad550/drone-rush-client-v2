import type { Metadata } from "next";
import InviteAdmins from "@/components/pages/dashboard/admin/invite-admins/InviteAdmins";

export const metadata: Metadata = {
  title: "Invite Admins | Drone Rush",
  description: "Send admin invitations to users",
};

export default function InviteAdminsPage() {
  return <InviteAdmins />;
}
