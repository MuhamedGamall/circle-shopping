"use client";

import { AvatarContainer } from "@/components/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Skeleton } from "@/components/ui/skeleton";
import useAccount from "@/hooks/use-account";
import { cn } from "@/lib/utils";
import { truncateText } from "@/utils/truncate-text";
import { signOut } from "next-auth/react";
import Link from "next/link";
const LoadingSkeleton = () => {
  return (
    <div className="sm:flex hidden items-center gap-2 w-[250px]">
      <Skeleton className="h-[40px] w-[50px] rounded-full" />
      <div className="w-full flex flex-col gap-1 justify-center">
        <Skeleton className="h-[15px] w-[50%] rounded-[30px]" />
        <Skeleton className="h-[15px] w-full rounded-[30px]" />
      </div>
    </div>
  );
};
export default function MoodAccountMenu() {
  const { data, loading } = useAccount();
  const username =
    data?.name?.split(" ")?.[0] || data?.email?.split("@")?.[0] || "";

  return loading ? (
    <LoadingSkeleton />
  ) : (
    <Menubar className="bg-transparent border-none">
      <MenubarMenu>
        <MenubarTrigger className="border-none cursor-pointer p-0  bg-transparent data-[state=open]:bg-transparent">
          <div className="flex items-center gap-2 ">
            <AvatarContainer {...data} username={username} />
            <div className="  flex-col items-start gap-1 sm:flex hidden">
              <h3 className=" font-bold text-[16x]  text-secondMain whitespace-nowrap ">
                {truncateText(username || "", 20)}
              </h3>
              <p className="font-[400] text-[#7e859b] text-[14px]  ">
                {truncateText(data?.email || "", 30)}
              </p>
            </div>
          </div>
        </MenubarTrigger>
        <MenubarContent className="w-[320px] h-[180px] mr-3 z-[500]">
          <div className="flex flex-col justify-center items-center gap-1 ">
            <Link href={"/account/profile"} className="block mt-3">
              <AvatarContainer {...data} username={username} />
            </Link>
            <Link
              href={"/account/profile"}
              className=" flex flex-col items-center "
            >
              <h3 className=" font-bold text-[16x]  text-secondMain whitespace-nowrap ">
                {truncateText(username || "", 20)}
              </h3>

              <span className="font-[400] text-[#7e859b] text-[14px]  ">
                {truncateText(data?.email || "", 30)}
              </span>
            </Link>
            <MenubarSeparator />
            <MenubarItem
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "lg",
                  className:
                    "w-[90%] cursor-pointer hover:outline-none hover:shadow-none  font-bold text-sky-600 bg-slate-100",
                })
              )}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </MenubarItem>
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
