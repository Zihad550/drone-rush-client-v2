"use server";

import { getCookie } from "@/services/auth/cookie.service";
import { verifyAccessToken } from "@/services/auth/token.service";
import type { IUser } from "@/types/global";

export async function checkAuthStatus() {
  try {
    const accessToken = await getCookie("accessToken");
    let user: IUser | null = null;
    let isLoggedIn = false;

    if (accessToken) {
      const verified = await verifyAccessToken(accessToken);
      if (verified.success && verified.payload) {
        user = verified.payload as IUser;
        isLoggedIn = true;
      }
    }

    return {
      isLoggedIn,
      user,
    };
  } catch (_error) {
    return {
      isLoggedIn: false,
      user: null,
    };
  }
}
