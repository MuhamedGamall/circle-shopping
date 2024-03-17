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
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip disableHoverableContent={true}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={cn("z-[2000000000000] relative", className)} side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
