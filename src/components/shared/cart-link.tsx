import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const CartLink = () => {
  const { totalItems } = useCart();

  return (
    <Link
      href="/dashboard/user/cart"
      className="relative p-2 text-white hover:text-blue-400 transition-colors"
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartLink;
