"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BsChevronRight } from "react-icons/bs";
import { MdStorefront } from "react-icons/md";

export default function BreadCrumbs() {
  const pathname = usePathname();
  const filterPath = pathname.split("/").slice(2).join("/");
  const crumbs = filterPath.split("/").slice(1);
  const path = pathname.split("/").slice(0, 3).join("/");

  return (
    <div className={cn("flex sm:items-center gap-3 mb-5 flex-wrap")}>
      <div className="flex items-center gap-3">
        <MdStorefront
          className={cn("h-4 w-4 text-slate-600", {
            hidden: crumbs.length + 1 === 1,
          })}
        />
        <BsChevronRight className="h-3 w-3 text-[#888888]" />
      </div>
      {crumbs.map((crumb, i) => (
        <>
          {parseFloat(crumb) ? (
            <span className="cursor-default font-semibold sm:text-sm text-[12px] text-slate-600">
              {crumb}
            </span>
          ) : (
            <>
              <Link
                href={`${path}/${crumbs.slice(0, i + 1).join("/")}`}
                className={cn(
                  "capitalize font-semibold sm:text-sm text-[12px] text-slate-600 hover:underline",
                  {
                    "text-blue": i === crumbs.length - 1,
                  }
                )}
              >
                {crumb === "store" ? null : crumb.split("-").join(" ")}
              </Link>
            </>
          )}
          {i < crumbs.length - 1 && (
            <BsChevronRight className="h-3 w-3 text-[#888888]" />
          )}
        </>
      ))}
    </div>
  );
}
