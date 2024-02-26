// "use client";

import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsChevronRight } from "react-icons/bs";

export default function BreadCrumbs() {
  const pathname = usePathname();
  const capitalizeFirstLetter = (word:string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

  const crumbs = pathname
    .split("/")
    .slice(3)
    .map((crumb) => crumb);
  console.log(crumbs.slice(0, 2).join("/"));

  return (
    <div className="flex items-center gap-1 [&>span]:text-sky-700 [&>span]:text-sm ">
      {crumbs.map((crumb, i) => (
        <>
          {crumb === "dashboard" ? (
            <Link href={`/${crumbs.slice(0, i + 1).join("/")}`}>
              <LucideLayoutDashboard />
            </Link>
          ) : (
            <Link href={`/${crumbs.slice(0, i + 1).join("/")}`}>
              {capitalizeFirstLetter(crumb).split("-").join(" ")}
            </Link>
          )}
          {i < crumbs.length - 1 && (
            <BsChevronRight className="h-3 w-3 text-[#888888] mt-1" />
          )}
        </>
      ))}
    </div>
  );
}
