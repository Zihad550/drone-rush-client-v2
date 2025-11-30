import { getCookie } from "@/services/auth/cookie.service";
import { verifyAccessToken } from "@/services/auth/token.service";
import NavBarClient from "./nav-bar-client";

const NavBar = async () => {
  const accessToken = await getCookie("accessToken");
  let user = null;

  if (accessToken) {
    const verified = await verifyAccessToken(accessToken);
    if (verified.success && verified.payload) {
      user = verified.payload;
    }
  }

  return <NavBarClient user={user} />;
};

export default NavBar;
