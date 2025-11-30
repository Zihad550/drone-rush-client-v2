import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const CartLink = () => {
  return (
    <Link
      href="/cart"
      className="relative p-2 text-white hover:text-blue-400 transition-colors"
    >
      <ShoppingCart className="w-6 h-6" />
      {/* Badge placeholder */}
      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
        0
      </span>
    </Link>
  );
};

export default CartLink;
