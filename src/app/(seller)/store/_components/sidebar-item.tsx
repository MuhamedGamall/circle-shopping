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
    <li>
      <Link
        className={cn(
          "flex items-center whitespace-nowrap  group-hover:gap-2 gap-5 hover:bg-[#fafafa] transition-[.2s] py-4 px-5",
          {
            "bg-[#fafafa] border-slate-400 border-r [&>span]:text-blue [&>svg]:text-blue":
              pathname.includes(href),
          }
        )}
        href={storeLink + href}
      >
        <Icon className={"min-h-5 max-h-5 max-w-5 min-w-5  text-slate-700"} />
        <span className={" text-slate-900"}>{label}</span>
      </Link>
    </li>
  );
}
