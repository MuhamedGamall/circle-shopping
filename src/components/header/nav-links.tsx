import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { Heart, LogIn, LogOut, ShoppingCart, User } from "lucide-react";
export default function NavLinks() {
  const user = null;
  return (
    <nav className="flex gap-2 items-center mx-4">
      {!user && (
        <div className="hidden sm:flex gap-2 items-center">
          <Link
            href="/sign-in"
            className={
              "flex gap-1 text-secondMain items-center whitespace-nowrap text-sm font-semibold transition-all hover:opacity-[.6] px-2 sm:border-r border-slate-600"
            }
          >
            Log in <User className={"h-4 w-4 text-secondMain/50"} />
          </Link>
          <Link
            href="/sign-up"
            className={
              "flex gap-1  bg-secondMain py-2 px-3 hover:bg-slate-900 rounded-md items-center whitespace-nowrap text-sm text-white font-semibold transition-all "
            }
          >
            Sign up <LogIn className={"h-4 w-4 "} />
          </Link>
        </div>
      )}
      <div className="">
        <Link
          href="/wishlist"
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
          href="/cart"
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
