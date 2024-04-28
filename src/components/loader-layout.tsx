import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

export default function LoaderLayout({
  loadingCondition,
  className
}: {
  loadingCondition: boolean;
  className?:string
}) {
  if (!loadingCondition) return;

  return (
    <div className={cn("absolute z-40 h-full w-full bg-slate-200/30 inset-0 flex items-center justify-center",className)}>
      <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
    </div>
  );
}
