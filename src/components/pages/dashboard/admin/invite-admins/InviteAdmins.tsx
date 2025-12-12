"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteInvite,
  getInvites,
  sendInvite,
} from "@/services/user/user.service";

interface Invite {
  _id: string;
  email: string;
  status: "pending" | "accepted" | "expired";
  createdAt: string;
  expiresAt: string;
}

const InviteAdmins = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loadingInvites, setLoadingInvites] = useState(true);

  const fetchInvites = async () => {
    try {
      const res = await getInvites();
      if (res.success) {
        setInvites(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch invites");
    } finally {
      setLoadingInvites(false);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await sendInvite(email);
      if (res.success) {
        toast.success(res.message || "Invite sent successfully");
        setEmail("");
        fetchInvites(); // Refresh the list
      } else {
        toast.error(res.message || "Failed to send invite");
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (inviteId: string) => {
    try {
      const res = await deleteInvite(inviteId);
      if (res.success) {
        toast.success("Invite deleted successfully");
        fetchInvites();
      } else {
        toast.error(res.message || "Failed to delete invite");
      }
    } catch (error) {
      toast.error("Failed to delete invite");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Send Admin Invitation</CardTitle>
          <CardDescription>
            Invite a user to become an admin by entering their email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Invite"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending Invites</CardTitle>
          <CardDescription>Manage sent admin invitations.</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingInvites ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : invites.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No invites sent yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent At</TableHead>
                  <TableHead>Expires At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invites.map((invite) => (
                  <TableRow key={invite._id}>
                    <TableCell>{invite.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          invite.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : invite.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {invite.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(invite.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(invite.expiresAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {invite.status === "pending" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(invite._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteAdmins;
