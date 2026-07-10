"use client";

import { Loader2, MapPin, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import DashboardPageHeader from "@/components/pages/dashboard/user/dashboard-page-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/lib/cart-context";
import { serverFetch } from "@/lib/server-fetch";
import { cn } from "@/lib/utils";
import {
  createShippingInfo,
  deleteShippingInfo,
  getShippingInfo,
  updateShippingInfo,
} from "@/services/shipping/shipping.service";
import type IShippingInfo from "@/types/shipping.type";

const ShippingPage = () => {
  const { cart, getTotalPrice } = useCart();
  const [shippingInfo, setShippingInfo] = useState<IShippingInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<IShippingInfo | null>(null);
  const [selectedShippingId, setSelectedShippingId] = useState<string>("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [formData, setFormData] = useState({
    street: "",
    apt: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    paymentMethod: "COD" as "COD" | "CARD",
  });

  const fetchShippingInfo = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getShippingInfo();
      if (res.success) {
        setShippingInfo(res.data);
      } else {
        toast.error(res.message || "Failed to fetch shipping info");
      }
    } catch (_error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShippingInfo();
  }, [fetchShippingInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: value as "COD" | "CARD",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = formData;
      let res: { success: boolean; message: string; data?: unknown };
      if (editing) {
        res = await updateShippingInfo(editing._id, payload);
      } else {
        res = await createShippingInfo(payload);
      }
      if (res.success) {
        toast.success(
          editing ? "Shipping info updated" : "Shipping info added",
        );
        setDialogOpen(false);
        setEditing(null);
        setFormData({
          street: "",
          apt: "",
          country: "",
          state: "",
          city: "",
          zipCode: "",
          paymentMethod: "COD",
        });
        fetchShippingInfo();
      } else {
        toast.error(res.message || "Failed");
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "Something went wrong");
    }
  };

  const handleEdit = (info: IShippingInfo) => {
    setEditing(info);
    setFormData({
      street: info.street,
      apt: info.apt || "",
      country: info.country,
      state: info.state,
      city: info.city,
      zipCode: info.zipCode,
      paymentMethod: info.paymentMethod,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this shipping info?",
    );
    if (!confirmation) return;
    try {
      const res = await deleteShippingInfo(id);
      if (res.success) {
        toast.success("Shipping info deleted");
        fetchShippingInfo();
      } else {
        toast.error(res.message || "Failed to delete");
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "Something went wrong");
    }
  };

  const handleCheckout = async () => {
    if (!selectedShippingId) {
      toast.error("Please select a shipping address.");
      return;
    }
    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    setCheckoutLoading(true);
    try {
      const drones = cart.map((item) => ({
        _id: item.drone._id,
        quantity: item.quantity,
      }));

      const response = await serverFetch.post("/orders", {
        body: JSON.stringify({
          drones,
          shippingInformation: selectedShippingId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Failed to create checkout session",
        );
      }

      const {
        data: { paymentUrl },
      } = await response.json();

      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to process checkout. Please try again.",
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1180px] space-y-7">
      <DashboardPageHeader
        eyebrow="Delivery"
        title="Shipping information"
        description="Manage your delivery addresses and check out."
        action={
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="dr-red-grad inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 font-poppins text-sm font-semibold text-white shadow-[0_10px_26px_rgba(239,43,69,0.32)]"
              >
                <Plus className="h-4 w-4" />
                Add address
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editing ? "Edit" : "Add"} Shipping Info
                </DialogTitle>
                <DialogDescription>
                  Enter your shipping details.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="street">Street</Label>
                  <Input
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="apt">Apt (optional)</Label>
                  <Input
                    id="apt"
                    name="apt"
                    value={formData.apt}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="COD">Cash on Delivery</SelectItem>
                      <SelectItem value="CARD">Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit">{editing ? "Update" : "Add"}</Button>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      {shippingInfo.length > 0 && (
        <div className="rounded-[18px] border border-dr-bd-1 bg-dr-surface p-5">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-[2px] w-5 rounded-sm bg-dr-red" />
            <h3 className="font-poppins text-sm font-semibold text-dr-text">
              Select address for checkout
            </h3>
          </div>
          <div className="space-y-2">
            {shippingInfo.map((info) => {
              const active = selectedShippingId === info._id;
              return (
                <label
                  key={info._id}
                  htmlFor={`sel-${info._id}`}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-[12px] border p-3.5 transition-colors",
                    active
                      ? "border-dr-red/40 bg-dr-red/[0.07]"
                      : "border-dr-bd-1 hover:border-dr-bd-3",
                  )}
                >
                  <input
                    type="radio"
                    id={`sel-${info._id}`}
                    name="shipping"
                    value={info._id}
                    checked={active}
                    onChange={(e) => setSelectedShippingId(e.target.value)}
                    className="h-4 w-4 cursor-pointer accent-dr-red"
                  />
                  <span className="flex-1 text-[13px] text-dr-text-2">
                    {info.street}, {info.city}, {info.state}, {info.zipCode},{" "}
                    {info.country}
                    <span className="ml-2 font-dm-mono text-[10px] uppercase tracking-wide text-dr-text-3">
                      {info.paymentMethod}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            disabled={!selectedShippingId || checkoutLoading}
            className="dr-red-grad mt-4 flex w-full items-center justify-center gap-2 rounded-[10px] px-5 py-3 font-poppins text-sm font-semibold text-white shadow-[0_10px_26px_rgba(239,43,69,0.32)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {checkoutLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing&hellip;
              </>
            ) : (
              `Continue to checkout ($${getTotalPrice().toFixed(2)})`
            )}
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-[18px] border border-dr-bd-1 bg-dr-surface">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-dr-red" />
          </div>
        ) : shippingInfo.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-dr-red/25 bg-dr-red/[0.1] text-dr-red">
              <MapPin className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <p className="text-sm text-dr-text-3">
              No saved addresses yet. Add one to check out.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] caption-bottom text-sm">
              <thead>
                <tr className="border-b border-dr-bd-1">
                  {["Address", "Payment", "Actions"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left font-dm-mono text-[10px] font-bold uppercase tracking-[0.18em] text-dr-text-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shippingInfo.map((info) => (
                  <tr
                    key={info._id}
                    className="border-b border-dr-bd-1 transition-colors last:border-0 hover:bg-dr-bd-1/40"
                  >
                    <td className="px-5 py-4 text-[13px] text-dr-text-2">
                      {info.street}, {info.city}, {info.state}, {info.zipCode},{" "}
                      {info.country}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center rounded-full border border-dr-bd-2 px-2.5 py-1 font-dm-mono text-[10px] font-bold uppercase tracking-[0.12em] text-dr-text-2">
                        {info.paymentMethod}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(info)}
                          className="inline-flex items-center rounded-[9px] border border-dr-bd-2 px-3 py-1.5 font-poppins text-[13px] font-semibold text-dr-text transition-colors hover:border-dr-red/40 hover:text-dr-red"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(info._id)}
                          aria-label="Delete address"
                          className="inline-flex items-center rounded-[9px] border border-dr-red/30 p-2 text-dr-red transition-colors hover:bg-dr-red/[0.1]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingPage;
