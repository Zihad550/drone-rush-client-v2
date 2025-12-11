"use client";

import { Loader2, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        body: JSON.stringify({ drones, shippingInformation: selectedShippingId }),
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
          <CardDescription>Manage your shipping addresses.</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mb-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Shipping Info
              </Button>
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

          {shippingInfo.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Select Shipping Address for Checkout</h3>
              <div className="space-y-2">
                {shippingInfo.map((info) => (
                  <div key={info._id} className="flex items-center space-x-2 border rounded p-3">
                    <input
                      type="radio"
                      id={info._id}
                      name="shipping"
                      value={info._id}
                      checked={selectedShippingId === info._id}
                      onChange={(e) => setSelectedShippingId(e.target.value)}
                      className="cursor-pointer"
                    />
                    <Label htmlFor={info._id} className="flex-1 cursor-pointer">
                      {info.street}, {info.city}, {info.state}, {info.zipCode}, {info.country} - {info.paymentMethod}
                    </Label>
                  </div>
                ))}
              </div>
              <Button
                className="w-full mt-4"
                size="lg"
                onClick={handleCheckout}
                disabled={!selectedShippingId || checkoutLoading}
              >
                {checkoutLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Continue to Checkout ($${getTotalPrice().toFixed(2)})`
                )}
              </Button>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : shippingInfo.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No shipping info found.
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="h-12 px-4 text-left">Address</th>
                    <th className="h-12 px-4 text-left">Payment Method</th>
                    <th className="h-12 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shippingInfo.map((info) => (
                    <tr key={info._id} className="border-b">
                      <td className="p-4">
                        {info.street}, {info.city}, {info.state}, {info.zipCode}
                        , {info.country}
                      </td>
                      <td className="p-4">{info.paymentMethod}</td>
                      <td className="p-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(info)}
                          className="mr-2"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(info._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingPage;
