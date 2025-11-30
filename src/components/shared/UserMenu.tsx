import { User } from "lucide-react";
import Link from "next/link";

const UserMenu = () => {
  return (
    <Link
      href="/dashboard"
      className="p-2 text-white hover:text-blue-400 transition-colors"
    >
      <User className="w-6 h-6" />
    </Link>
  );
};

export default UserMenu;
