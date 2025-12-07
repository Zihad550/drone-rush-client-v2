import { getCookie } from "@/services/auth/cookie.service";
import { verifyAccessToken } from "@/services/auth/token.service";
import type { IUser } from "@/types/global";
import NavBarClient from "./nav-bar-client";

const NavBar = async () => {
  const accessToken = await getCookie("accessToken");
  let user: IUser | null = null;

  if (accessToken) {
    const verified = await verifyAccessToken(accessToken);
    if (verified.success && verified.payload) {
      user = verified.payload as IUser;
    }
  }

  return <NavBarClient user={user} />;
};

export default NavBar;
