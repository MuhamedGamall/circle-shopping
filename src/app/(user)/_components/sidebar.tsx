"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {LucideUserCog, ShieldCheck } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiHeartCircle } from "react-icons/bi";
import { BsMenuButtonFill } from "react-icons/bs";

export default function Sidebar() {
  const pathName = usePathname();
  return (
    <div className="hidden sm:flex flex-col p-8 sticky left-0 top-0 h-screen w-[280px] bg-white">
      <div className="flex flex-col border-b pb-5 mb-5 h-fit">
        <h3 className=" font-bold text-[16x]  text-secondMain whitespace-nowrap">
          Hala {"muhamedgamal"}!
        </h3>
        <p className="font-[400] text-slate-600 text-[14px] ">
          {"muhamedgamal250@gmail.com"}
        </p>
      </div>
      <div className="flex flex-col gap-6  border-b  pb-5 mb-5 h-fit">
        <Link
          href={"wishlist"}
          className="group flex items-center gap-2 hover:underline"
        >
          <span className="text-[25px] text-yellow-600">
            <BiHeartCircle />
          </span>
          <span
            className={cn("group-hover:text-black text-slate-500 ", {
              "underline text-black": pathName.includes("wishlist"),
            })}
          >
            Wishlist
          </span>
        </Link>
        <Link
          href={"orders"}
          className="group flex items-center gap-2 hover:underline"
        >
          <span className="text-[25px] text-yellow-600">
            <BsMenuButtonFill />
          </span>
          <span
            className={cn("group-hover:text-black text-slate-500 ", {
              "underline text-black": pathName.includes("orders"),
            })}
          >
            Orders
          </span>
        </Link>
        <Link
          href={"proflie"}
          className="group flex items-center gap-2 hover:underline"
        >
          <span className="text-[25px] text-yellow-600">
            <LucideUserCog />
          </span>
          <span
            className={cn("group-hover:text-black text-slate-500 ", {
              "underline text-black": pathName.includes("profile"),
            })}
          >
            Profile
          </span>
        </Link>
        <Link
          href={"security-settings"}
          className="group flex items-center gap-2 hover:underline"
        >
          <span className="text-[25px] text-yellow-600">
            <ShieldCheck />
          </span>
          <span
            className={cn("group-hover:text-black text-slate-500 ", {
              "underline text-black": pathName.includes("security settings"),
            })}
          >
            Security settings
          </span>
        </Link>
      </div>
      <div className="">
        <Button variant={'ghost'} size={'sm'} className={cn(" text-slate-500 ")} onClick={()=>signOut()}>Sign out</Button>
      </div>
    </div>
  );
}
