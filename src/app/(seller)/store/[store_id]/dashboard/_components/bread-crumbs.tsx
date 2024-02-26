"use client";

import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsChevronRight } from "react-icons/bs";

export default function BreadCrumbs() {
  const pathname = usePathname();
  const capitalizeFirstLetter = (word:string) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  const crumbs = pathname.split("/").slice(3);
  const hiddenLink = `http://localhost:3000/${pathname
    .split("/")
    .slice(1, 3)
    .join("/")}/`;

  return (
    <div className="flex items-center gap-1 mb-5 break-all  overflow-x-auto">
      {crumbs.map((crumb, i) => (
        <>
          <Link
            href={`${hiddenLink}${crumbs.slice(0, i + 1).join("/")}`}
            className="text- text-sm text-slate-600 hover:underline"
          >
            {crumb === "dashboard" ? (
              <LucideLayoutDashboard className="h-4 w-4 text-slate-600" />
            ) : (
              capitalizeFirstLetter(crumb).split("-").join(" ")
            )}
          </Link>
          {i < crumbs.length - 1 && (
            <BsChevronRight className="h-3 w-3 text-[#888888]" />
          )}
        </>
      ))}
    </div>
  );
}
