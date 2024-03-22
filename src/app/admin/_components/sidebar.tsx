"use client";
import SidebarItem from "./sidebar-item";
import { LucideLayoutDashboard } from "lucide-react";
import { MdOutlineCategory } from "react-icons/md";
import { LiaUsersCogSolid } from "react-icons/lia";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { LiaBoxesSolid } from "react-icons/lia";
const routes = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LucideLayoutDashboard,
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: LiaBoxesSolid,
  },
  {
    href: "/admin/categories",
    label: "Categories",
    icon: MdOutlineCategory,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: LiaUsersCogSolid,
  },
  {
    href: "/admin/sellers",
    label: "Sellers",
    icon: FaUsersBetweenLines,
  },
  {
    href: "/admin/reports",
    label: "Reports",
    icon: HiOutlineClipboardDocumentList,
  },
];
export default function Sidebar() {
  return (
    <div className=" max-w-[60px] md:max-w-[250px] w-full h-screen fixed z-[50] top-[78.2px] left-0 border-r py-5 bg-white">
      <ul className="flex flex-col justify-center">
        {routes.map((route, i) => (
          <SidebarItem key={i} {...route} />
        ))}
      </ul>
    </div>
  );
}
