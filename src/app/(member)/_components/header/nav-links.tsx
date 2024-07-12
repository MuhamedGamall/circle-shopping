"use client";

import Link from "next/link";
import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import AccountMenu from "../account-menu";

export default function NavLinks() {
  return (
    <nav className="flex gap-2 items-center pr-2 ">
      <div className="md:block hidden">
        <AccountMenu />
      </div>

      <div className="">
        <Link
          href="/account/wishlist"
          className={
            "flex gap-1 text-secondMain items-center whitespace-nowrap text-sm font-semibold transition-all hover:opacity-[.6] px-2 md:border-x border-slate-600"
          }
        >
          <div className="hidden md:block">Wishlist</div>
          <Heart className={"h-6 w-6 md:h-4 md:w-4 md:text-secondMain/50"} />
        </Link>
      </div>
      <div className="">
        <Link
          href="/account/cart"
          className={
            "hidden md:flex gap-1 text-secondMain items-center whitespace-nowrap text-sm font-semibold transition-all hover:opacity-[.6]"
          }
        >
          Cart
          <ShoppingCart className={"h-4 w-4 text-secondMain/50"} />
        </Link>
      </div>
    </nav>
  );
}
