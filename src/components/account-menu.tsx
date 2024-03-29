"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import useAccount from "@/hooks/use-account";
import useStore from "@/hooks/seller/use-store_seller";
import { truncateText } from "@/utils/truncate-text";
import {
  LayoutList,
  Loader2,
  LogIn,
  LucideLayoutDashboard,
  MoreVertical,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";
import { Skeleton } from "./ui/skeleton";
import { useEffect } from "react";

const LoadingSkeleton = () => {
  return <Skeleton className="h-[25px] w-[150px] rounded-md bg-slate-400" />;
};
export default function AccountMenu() {
  const { data, loading, error }: any = useStore();
  const { data: account, loading: loadingAccount } = useAccount();
  const userName =
    account?.name?.split(" ")?.[0] || account?.email?.split("@")?.[0] || "";

  return (
    <>
      {loadingAccount ? (
        <LoadingSkeleton />
      ) : account ? (
        <Menubar className="bg-transparent border-none">
          <MenubarMenu>
            <MenubarTrigger className="border-none cursor-pointer p-0  bg-transparent data-[state=open]:bg-transparent">
              <div
                className={
                  "flex flex-col whitespace-nowrap  px-1 justify-center items-center text-xs font-semibold  "
                }
              >
                <span className="font-[400] text-slate-600 text-right  text-[12px]">
                  Hala {truncateText(userName, 8)}!
                </span>
                <span className="flex text-lg items-center font-bold  text-secondMain whitespace-nowrap">
                  My account
                  <MoreVertical className="h-5 w-5 m-0" />
                </span>
              </div>
            </MenubarTrigger>
            <MenubarContent className="rounded-none">
              <MenubarItem asChild>
                <Link
                  href={"/account/orders"}
                  className="flex items-center text-[18px]  gap-3 text-slate-700"
                >
                  <span className=" text-gray-700">
                    <BsMenuButtonWideFill />
                  </span>
                  Orders
                </Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link
                  href={"/account/profile"}
                  className="flex items-center text-[18px] gap-3 text-slate-700  "
                >
                  <span className=" text-gray-700">
                    <FaRegUserCircle />
                  </span>
                  Profile
                </Link>
              </MenubarItem>
              <MenubarItem asChild>
                {loading ? (
                  <Loader2 className={"animate-spin w-8 h-8 text-shade "} />
                ) : error?.response?.status === 404 ? (
                  <Link
                    href={"/store/create"}
                    className="flex items-center text-[18px] gap-3 text-slate-700  "
                  >
                    <span className=" text-gray-700">
                      <MdStorefront className="h-4 w-4" />
                    </span>
                    Create store
                  </Link>
                ) : (
                  error?.response?.status !== 403 &&
                  !(error?.response?.status === 404) && (
                    <Link
                      href={"/store/" + data?._id + "/dashboard"}
                      className="flex items-center text-[18px] gap-3 text-slate-700  "
                    >
                      <span className=" text-gray-700">
                        <LayoutList className="h-4 w-4" />
                      </span>
                      Store dashboard
                    </Link>
                  )
                )}
              </MenubarItem>
              {account?.admin && (
                <MenubarItem asChild>
                  <Link
                    href={"/admin/dashboard"}
                    className="flex items-center text-[18px] gap-3 text-slate-700  "
                  >
                    <span className=" text-gray-700">
                      <LucideLayoutDashboard className="h-4 w-4" />
                    </span>
                    Admin dashboard
                  </Link>
                </MenubarItem>
              )}
              <MenubarSeparator />
              <MenubarItem
                asChild
                className=" text-slate-500"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <div>Sign out</div>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      ) : (
        <div className="flex gap-4 items-center">
          <Link
            href="/auth/log-in"
            className={
              "flex gap-1 text-secondMain items-center whitespace-nowrap text-sm font-semibold transition-all hover:opacity-[.6] px-2 sm:border-r border-slate-600"
            }
          >
            Log in
          </Link>
          <Link
            href="/auth/create-account"
            className={
              "flex gap-1  bg-secondMain py-2 px-3 hover:bg-slate-900 rounded-md items-center whitespace-nowrap text-sm text-white font-semibold transition-all "
            }
          >
            Sign up <LogIn className={"h-4 w-4 "} />
          </Link>
        </div>
      )}
    </>
  );
}
