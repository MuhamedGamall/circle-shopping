import { Home, Shirt, ShoppingCart } from "lucide-react";
import Link from "next/link";

import AccountMenu from "../account-menu";

export default function MoblieBar() {
  return (
    <nav className="mobilebar  -bottom-1 z-[1000]  md:hidden flex items-center gap-4 justify-center w-full max-w-[400px] rounded-sm bg-white fixed mx-auto left-0 right-0 h-[60px]  px-3 py-2">
      <Link
        href="/"
        className={
          "flex flex-col gap-1 text-secondMain  justify-center items-center text-xs font-semibold transition-all hover:opacity-[.6]  "
        }
      >
        <Home className={"h-5 w-5 "} />
        Home
      </Link>
      <Link
        href="/fashion-men"
        className={
          "flex flex-col gap-1 text-secondMain justify-center whitespace-nowrap items-center text-xs font-semibold transition-all hover:opacity-[.6]  "
        }
      >
        <Shirt className={"h-5 w-5 "} color="green" />
        Fashion
      </Link>
      <Link
        href="/cart"
        className={
          "flex flex-col gap-1 text-secondMain whitespace-nowrap justify-center items-center text-xs font-semibold transition-all hover:opacity-[.6]  "
        }
      >
        <ShoppingCart className={"h-5 w-5 "} />
        Cart
      </Link>
      <AccountMenu />
    </nav>
  );
}
