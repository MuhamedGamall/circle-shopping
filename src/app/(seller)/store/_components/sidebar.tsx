"use client";
import { LucideLayoutDashboard } from "lucide-react";
import { useParams } from "next/navigation";
import { BsCartCheck } from "react-icons/bs";
import { LiaBoxesSolid } from "react-icons/lia";
import { MdStorefront } from "react-icons/md";

import SidebarItem from "./sidebar-item";
const routes = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LucideLayoutDashboard,
  },
  {
    href: "/orders",
    label: "Orders",
    icon: BsCartCheck,
  },
  {
    href: "/products-management",
    label: "Products management",
    icon: LiaBoxesSolid,
  },
  {
    href: "/store-settings",
    label: "Store settings",
    icon: MdStorefront,
  },
];
export default function Sidebar() {
  const { store_id } = useParams();
  const storeLink = `/store/${store_id}`;

  return (
    <div className=" max-w-[60px] md:max-w-[250px] w-full h-screen fixed top-[77px] left-0 border-r py-5 bg-white">
      <ul className="flex flex-col justify-center">
        {routes.map((route, i) => (
          <SidebarItem key={i} storeLink={storeLink} {...route} />
        ))}
      </ul>
    </div>
  );
}
