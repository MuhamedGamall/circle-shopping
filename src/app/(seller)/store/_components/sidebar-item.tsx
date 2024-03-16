import { TooltipWrapper } from "@/components/wrappers/tooltip-wrapper";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons/lib";

export default function SidebarItem({
  storeLink,
  href,
  label,
  icon: Icon,
}: {
  storeLink: string;
  href: string;
  label: string;
  icon: LucideIcon | IconType;
}) {
  const pathname = usePathname();

  return (
    <TooltipWrapper label={label} className="md:hidden block">
      <li>
        <Link
          className={cn(
            "flex items-center md:justify-start justify-center gap-2  hover:bg-[#fafafa] transition-[.2s] py-4 md:px-6 ",
            {
              "bg-[#fafafa] border-slate-400 border-r [&>span]:text-[#3866df] [&>svg]:text-[#3866df]":
              pathname.includes(href),
            }
          )}
          href={storeLink + href}
        >
          <Icon className={"h-5 w-5  text-slate-700"} />
          <span
            className={"md:block hidden text-slate-900"
              }
          >
            {label}
          </span>
        </Link>
      </li>
    </TooltipWrapper>
  );
}
