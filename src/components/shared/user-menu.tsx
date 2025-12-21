import { User } from "lucide-react";
import Link from "next/link";

const UserMenu = () => {
  return (
    <Link
      href="/dashboard"
      className="p-2 text-foreground hover:text-primary transition-colors dark:bg-slate-800 rounded-md"
    >
      <User className="w-6 h-6" />
    </Link>
  );
};

export default UserMenu;
