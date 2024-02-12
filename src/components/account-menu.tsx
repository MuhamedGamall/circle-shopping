import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogOut, MoreVertical } from "lucide-react";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { truncateText } from "@/utils/truncate-text";
export default function AccountMenu() {
  return (
    <Menubar className="bg-transparent border-none">
      <MenubarMenu>
        <MenubarTrigger className="border-none cursor-pointer  bg-transparent data-[state=open]:bg-transparent">
          <div
            className={
              "flex flex-col whitespace-nowrap  px-1 justify-center text-xs font-semibold  "
            }
          >
            <span className="font-[400] text-slate-600 text-right mr-3 text-[12px]">
              Hala {truncateText("muhamedgamal", 10)}!
            </span>
            <span className="flex text-lg items-center font-bold  text-secondMain whitespace-nowrap">
              My account
              <MoreVertical className="h-5 w-5" />
            </span>
          </div>
        </MenubarTrigger>
        <MenubarContent className="rounded-none">
          <MenubarItem>
            <Link
              href={"/orders"}
              className="flex items-center text-[18px]  gap-3 text-slate-700"
            >
              <span className=" text-yellow-400">
                <BsMenuButtonWideFill />
              </span>
              Orders
            </Link>
          </MenubarItem>
          <MenubarItem>
            <Link
              href={"/profile"}
              className="flex items-center text-[18px] gap-3 text-slate-700  "
            >
              <span className=" text-yellow-400">
                <FaRegUserCircle />
              </span>
              Profile
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex items-center text-slate-700 justify-center text-[18px] ">
            Sign out
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
