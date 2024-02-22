import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import useStore from "@/hooks/use-store";
import { truncateText } from "@/utils/truncate-text";
import { LucideLayoutDashboard, MoreVertical } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { PiStorefrontLight } from "react-icons/pi";

export default function AccountMenu({
  name,
  email,
}: {
  name?: string;
  email: string;
}) {

  const { data, loading } = useStore();
  const userName = name?.split(" ")?.[0] || email?.split("@")?.[0] || "";

  return (
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
            {!loading ? (
              !data ? (
                <Link
                  href={"/store/create-store"}
                  className="flex items-center text-[18px] gap-3 text-slate-700  "
                >
                  <span className=" text-gray-700">
                    <PiStorefrontLight className="h-4 w-4" />
                  </span>
                  Create store
                </Link>
              ) : (
                <Link
                  href={"/store/store-dashboard/"+data?._id}
                  className="flex items-center text-[18px] gap-3 text-slate-700  "
                >
                  <span className=" text-gray-700">
                    <LucideLayoutDashboard className="h-4 w-4" />
                  </span>
                  Store dashboard
                </Link>
              )
            ) : (
              "loading..."
            )}
          </MenubarItem>
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
  );
}
