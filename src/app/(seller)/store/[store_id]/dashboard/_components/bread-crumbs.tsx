"use client";
import { cn } from "@/lib/utils";
import { truncateText } from "@/utils/truncate-text";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsChevronRight } from "react-icons/bs";
import { useWindowSize } from "react-use";

export default function BreadCrumbs() {
  const pathname = usePathname();

  const { width: innerWidth } = useWindowSize();

  const minWidth = innerWidth <= 640;

  const crumbs = pathname.split("/").slice(3);
  const hiddenLink = `http://localhost:3000/${pathname
    .split("/")
    .slice(1, 3)
    .join("/")}/`;

  return (
    <div
      className={cn(
        "flex sm:items-center gap-3 mb-5 break-all  overflow-x-auto",
        {
          hidden: crumbs.length === 1,
        }
      )}
    >
      {crumbs.map((crumb, i) => {
        return (
          <>
            {parseFloat(crumb) ? (
              <span className="cursor-default  text-sm text-slate-600">
                {minWidth ? truncateText(crumb, 10) : crumb}
              </span>
            ) : (
              <Link
                href={`${hiddenLink}${crumbs.slice(0, i + 1).join("/")}`}
                className={cn(
                  "capitalize  font-semibold text-sm text-slate-600 hover:underline",
                  {
                    " text-[#3866df]": i === crumbs.length - 1,
                  }
                )}
              >
                {crumb === "dashboard" ? (
                  <LucideLayoutDashboard className="h-4 w-4 text-slate-600" />
                ) : minWidth ? (
                  truncateText(crumb.split("-").join(" "), 10)
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
