"use client";

import Link from "next/link";
import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import AccountMenu from "../account-menu";

export default function NavLinks() {
  return (
    <nav className="flex gap-2 items-center mx-4">
      <div className="sm:block hidden">
        <AccountMenu />
      </div>

      <div className="">
        <Link
          href="/account/wishlist"
          className={
            "flex gap-1 text-secondMain items-center whitespace-nowrap text-sm font-semibold transition-all hover:opacity-[.6] px-2 sm:border-x border-slate-600"
          }
        >
          <div className="hidden sm:block">Wishlist</div>
          <Heart className={"h-6 w-6 sm:h-4 sm:w-4 sm:text-secondMain/50"} />
        </Link>
      </div>
      <div className="">
        <Link
          href="/account/cart"
          className={
            "hidden sm:flex gap-1 text-secondMain items-center whitespace-nowrap text-sm font-semibold transition-all hover:opacity-[.6]"
          }
        >
          Cart
          <ShoppingCart className={"h-4 w-4 text-secondMain/50"} />
        </Link>
      </div>
    </nav>
  );
}
