"use client";
import { cn } from "@/lib/utils";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BsChevronRight } from "react-icons/bs";

export default function BreadCrumbs() {
  const pathname = usePathname();

  const crumbs = pathname.split("/").slice(3);
  const hiddenLink = `http://localhost:3000/${pathname
    .split("/")
    .slice(1, 3)
    .join("/")}/`;

  return (
    <div className={cn("flex sm:items-center gap-3 mb-5 flex-wrap")}>
      {crumbs.map((crumb, i) => {
        return (
          <>
            {parseFloat(crumb) ? (
              <span className="cursor-default  font-semibold sm:text-sm text-[12px] text-slate-600">
                {crumb}
              </span>
            ) : (
              <Link
                href={`${hiddenLink}${crumbs.slice(0, i + 1).join("/")}`}
                className={cn(
                  "capitalize  font-semibold sm:text-sm text-[12px] text-slate-600 hover:underline",
                  {
                    " text-blue": i === crumbs.length - 1,
                  }
                )}
              >
                {crumb === "dashboard" ? (
                  <LucideLayoutDashboard
                    className={cn(" h-4 w-4 text-slate-600", {
                      hidden: crumbs.length === 1,
                    })}
                  />
                ) : (
                  crumb.split("-").join(" ")
                )}
              </Link>
            )}
            {i < crumbs.length - 1 && (
              <BsChevronRight className="h-3 w-3 text-[#888888]" />
            )}
          </>
        );
      })}
    </div>
  );
}
