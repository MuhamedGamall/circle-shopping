"use client";

import Link from "next/link";
import React from "react";
import { Heart, LogIn, ShoppingCart, User } from "lucide-react";
import AccountMenu from "../account-menu";
import useProfile from "@/hooks/user-profile";

export default function NavLinks() {
  const { data, loading } = useProfile();
  return (
    <nav className="flex gap-2 items-center mx-4">
      {!loading ? (
        !data ? (
          <div className="hidden sm:flex gap-2 items-center">
            <Link
              href="/account/log-in"
              className={
                "flex gap-1 text-secondMain items-center whitespace-nowrap text-sm font-semibold transition-all hover:opacity-[.6] px-2 sm:border-r border-slate-600"
              }
            >
              Log in <User className={"h-4 w-4 text-secondMain/50"} />
            </Link>
            <Link
              href="/account/create-account"
              className={
                "flex gap-1  bg-secondMain py-2 px-3 hover:bg-slate-900 rounded-md items-center whitespace-nowrap text-sm text-white font-semibold transition-all "
              }
            >
              Sign up <LogIn className={"h-4 w-4 "} />
            </Link>
          </div>
        ) : (
          <div className="sm:block hidden">
            <AccountMenu {...data} />
          </div>
        )
      ) : (
        "Loading..."
      )}

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
