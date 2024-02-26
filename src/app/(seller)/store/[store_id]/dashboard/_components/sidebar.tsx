"use client";
import { LucideLayoutDashboard } from "lucide-react";
import { useParams } from "next/navigation";
import { BsCartCheck } from "react-icons/bs";
import { LiaBoxesSolid, LiaComments } from "react-icons/lia";
import { MdStorefront } from "react-icons/md";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { TbHelp } from "react-icons/tb";
import SidebarItem from "./sidebar-item";
const routes = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LucideLayoutDashboard,
  },
  {
    href: "/dashboard/orders",
    label: "Orders",
    icon: BsCartCheck,
  },
  {
    href: "/dashboard/products-settings",
    label: "Products settings",
    icon: LiaBoxesSolid,
  },
  {
    href: "/dashboard/store-settings",
    label: "Store settings",
    icon: MdStorefront,
  },
  {
    href: "/dashboard/comments",
    label: "Comments",
    icon: LiaComments,
  },
  {
    href: "/dashboard/archive",
    label: "Archive",
    icon: RiArchiveDrawerLine,
  },
  {
    href: "/dashboard/help",
    label: "Help",
    icon: TbHelp,
  },
];
export default function Sidebar() {
  const { store_id } = useParams();
  const dashboardLink = `/store/${store_id}`;

  return (
    <div className=" max-w-[60px] md:max-w-[250px] w-full h-screen fixed top-[77px] left-0 border-r py-5 bg-white">
      <ul className="flex flex-col justify-center">
        {routes.map((route, i) => (
          <SidebarItem key={i} dashboardLink={dashboardLink} {...route} />
        ))}
      </ul>
    </div>
  );
}
