import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const CartLink = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Link
      href="/dashboard/user/cart"
      className="relative p-2 rounded-lg text-foreground dark:text-white hover:text-primary dark:hover:text-primary transition-colors hover:bg-accent dark:hover:bg-white/10"
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 bg-destructive text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartLink;
