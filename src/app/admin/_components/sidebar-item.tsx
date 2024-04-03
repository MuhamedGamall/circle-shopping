import { TooltipWrapper } from "@/components/wrappers/tooltip-wrapper";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons/lib";

export default function SidebarItem({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon | IconType;
}) {
  const pathname = usePathname();
  return (
    <li>
      <Link
        className={cn(
          "flex items-center  group-hover:gap-2 gap-5 hover:bg-[#fafafa] transition-[.2s] py-4 px-5",
          {
            "bg-[#fafafa] border-slate-400 border-r [&>span]:text-[#3866df] [&>svg]:text-[#3866df]":
              pathname.includes(href),
          }
        )}
        href={href}
      >
        <Icon className={"min-h-5 max-h-5 max-w-5 min-w-5  text-slate-700"} />
        <span className={" text-slate-900"}>{label}</span>
      </Link>
    </li>
  );
}
