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
        <div className="hidden md:flex gap-2 items-center">
          <Link
            href="/sign-in"
            className={
              "flex gap-1 text-secondMain items-center whitespace-nowrap text-sm font-semibold transition-all hover:opacity-[.6] border-r px-2 border-black"
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
            Sign up <LogIn className={"h-4 w-4 "}/>
          </Link>
        </div>
      )}
      <div className="">
        <Link
          href="/wishlist"
          className={
            "flex gap-1 text-secondMain items-center whitespace-nowrap text-sm font-semibold transition-all hover:opacity-[.6] border-x px-2 border-black"
          }
        >
          Wishlist
          <Heart className={"h-4 w-4 text-secondMain/50"} />
        </Link>
      </div>
      <div className="">
        <Link
          href="/cart"
          className={
            "flex gap-1 text-secondMain items-center whitespace-nowrap text-sm font-semibold transition-all hover:opacity-[.6]"
          }
        >
          Cart
          <ShoppingCart className={"h-4 w-4 text-secondMain/50"} />
        </Link>
      </div>
    </nav>
  );
}
