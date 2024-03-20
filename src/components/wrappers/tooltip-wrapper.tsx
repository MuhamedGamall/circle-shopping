import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function TooltipWrapper({
  children,
  label,
  className,
  side,
}: {
  children: ReactNode;
  label: string;
  className?: string;
  side?: "right" | "top" | "bottom" | "left" | undefined;
}) {
  return (
    <TooltipProvider>
      <Tooltip disableHoverableContent={true}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={cn("  max-w-[200px] text-wrap", className)}
          side={side}
        >
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
