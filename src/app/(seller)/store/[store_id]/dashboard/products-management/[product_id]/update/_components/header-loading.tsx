import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function HeaderLoading() {
  return (
    <div className="flex items-center gap-2  ">
      <Skeleton className="w-[42px] h-[58px] rounded-sm bg-slate-500" />
      <div className="flex flex-col gap-2 justify-center">
        <Skeleton className="h-[15px] w-[130px]  rounded-sm bg-slate-500" />
        <Skeleton className="h-[15px] w-[130px] rounded-sm bg-slate-500" />
      </div>
    </div>
  );
}
