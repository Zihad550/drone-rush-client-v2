import type { Metadata } from "next";
import AddDrone from "@/components/pages/dashboard/admin/add-drone/AddDrone";

export const metadata: Metadata = {
  title: "Add Drone | Drone Rush",
  description: "Add a new drone to the inventory",
};

export default function AddDronePage() {
  return <AddDrone />;
}
