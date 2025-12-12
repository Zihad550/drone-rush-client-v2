"use server";
import { redirect } from "next/navigation";
import { deleteCookie } from "@/services/auth/cookie.service";

export const logoutUser = async () => {
  await Promise.all([
    deleteCookie("refreshToken"),
    deleteCookie("accessToken"),
  ]);
  redirect("/login");
};
