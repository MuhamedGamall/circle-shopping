import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import { LogOut } from "lucide-react";
import { TooltipWrapper } from "./wrappers/tooltip-wrapper";

export default function ExitButton() {
  return (
    <Link
      href={"/"}
      className={cn(
        buttonVariants({
          variant: "outline",
          size: "sm",
          className:
            " text-shade flex items-center gap-1 mx-2 rounded-sm h-[30px]",
        })
      )}
    >
      <span className="sm:block hidden">Exit</span>
      <TooltipWrapper label="Exit">
        <LogOut className="h-4 w-4" />
      </TooltipWrapper>
    </Link>
  );
}
