import { Home, LogIn, Shirt, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import AccountMenu from "./account-menu";

export default function MoblieBar() {
  const user = null;

  return (
    <nav className="mobilebar  sm:hidden flex items-center gap-7 justify-center w-full max-w-[400px] rounded-sm bg-white fixed mx-auto left-0 right-0 h-[60px] -bottom-1 px-3 py-2">
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
      {!user ? (
        <div className="flex items-center gap-7">
          <Link
            href="/login"
            className={
              "flex flex-col gap-1 text-secondMain whitespace-nowrap justify-center items-center text-xs font-semibold transition-all hover:opacity-[.6]  "
            }
          >
            <User className={"h-5 w-5 "} />
            Log in
          </Link>
          <Link
            href="/create-account"
            className={
              "flex flex-col gap-1 text-secondMain whitespace-nowrap justify-center items-center text-xs font-semibold transition-all hover:opacity-[.6]  "
            }
          >
            <LogIn className={"h-5 w-5 "} />
            Sign up
          </Link>
        </div>
      ) : (
        <AccountMenu />
      )}
      <Link
        href="/cart"
        className={
          "flex flex-col gap-1 text-secondMain whitespace-nowrap justify-center items-center text-xs font-semibold transition-all hover:opacity-[.6]  "
        }
      >
        <ShoppingCart className={"h-5 w-5 "} />
        Cart
      </Link>
    </nav>
  );
}
