import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const CartLink = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Link
      href="/dashboard/user/cart"
      title="Cart"
      className="relative flex h-[38px] w-10 items-center justify-center rounded-[9px] border border-dr-bd-2 bg-dr-surface text-dr-text-2 transition-colors hover:border-dr-bd-3 hover:text-dr-text"
    >
      <ShoppingCart className="h-[18px] w-[18px]" />
      {totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-dr-red px-1 text-[11px] font-bold text-white">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartLink;
