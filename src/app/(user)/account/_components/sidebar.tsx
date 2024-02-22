"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import useProfile from "@/hooks/use-profile";
import { cn } from "@/lib/utils";
import { truncateText } from "@/utils/truncate-text";
import { LucideUserCog, ShieldCheck, ShoppingCart } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiHeartCircle } from "react-icons/bi";
import { BsMenuButtonFill } from "react-icons/bs";

export default function Sidebar() {
  const pathName = usePathname();
  const { data, loading } = useProfile();
  const name = data?.name?.split(" ")?.[0] || data?.email?.split("@")?.[0];

  return (
    <div>
      <div className="flex flex-col p-8 sticky left-0 top-0 h-screen w-[280px] bg-white">
        <div className="flex flex-col border-b pb-5 mb-5 h-fit">
          {!loading ? (
            <>
              <h3 className=" font-bold text-[16x]  text-secondMain whitespace-nowrap ">
                Hala {truncateText(name || "", 15)}!
              </h3>
              <p className="font-[400] text-[#7e859b] text-[14px]  ">
                {truncateText(data?.email || "", 25)}
              </p>
            </>
          ) : (
            <span className="font-bold text-[16x]  text-secondMain whitespace-nowrap">
              loading...
            </span>
          )}
        </div>
        <div className="flex flex-col gap-6  border-b  pb-5 mb-5 h-fit">
          <Link
            href={"/account/wishlist"}
            className="group flex items-center gap-2 hover:underline"
          >
            <span className="text-[25px] text-yellow-600">
              <BiHeartCircle />
            </span>
            <span
              className={cn("group-hover:text-black text-[#7e859b] ", {
                "underline text-black": pathName.includes("wishlist"),
              })}
            >
              Wishlist
            </span>
          </Link>
          <Link
            href={"/account/orders"}
            className="group flex items-center gap-2 hover:underline"
          >
            <span className="text-[25px] text-yellow-600">
              <BsMenuButtonFill />
            </span>
            <span
              className={cn("group-hover:text-black text-[#7e859b] ", {
                "underline text-black": pathName.includes("orders"),
              })}
            >
              Orders
            </span>
          </Link>
          <Link
            href={"/account/cart"}
            className="group flex items-center gap-2 hover:underline"
          >
            <span className="text-[25px] text-yellow-600">
              <ShoppingCart />
            </span>
            <span
              className={cn("group-hover:text-black text-[#7e859b] ", {
                "underline text-black": pathName.includes("cart"),
              })}
            >
              Cart
            </span>
          </Link>
          <Link
            href={"/account/profile"}
            className="group flex items-center gap-2 hover:underline"
          >
            <span className="text-[25px] text-yellow-600">
              <LucideUserCog />
            </span>
            <span
              className={cn("group-hover:text-black text-[#7e859b] ", {
                "underline text-black": pathName.includes("profile"),
              })}
            >
              Profile settings
            </span>
          </Link>
          <Link
            href={"/account/security-settings"}
            className={cn("group flex items-center gap-2 hover:underline ", {
              hidden: !data?.password,
            })}
          >
            <span className="text-[25px] text-yellow-600">
              <ShieldCheck />
            </span>
            <span
              className={cn("group-hover:text-black text-[#7e859b] ", {
                "underline text-black": pathName.includes("security-settings"),
              })}
            >
              Security settings
            </span>
          </Link>
        </div>
        <div className="">
          <Button
            variant={"ghost"}
            size={"sm"}
            className={cn(" text-[#7e859b] ")}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
