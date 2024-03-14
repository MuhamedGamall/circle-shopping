"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed z-[11111111111111111111] inset-0 bg-sky-700/20 flex justify-center items-center">
      <div className="flex justify-start items-center gap-2 pl-4 p-2 rounded-sm bg-slate-100 text-[20px]  w-[300px]  whitespace-nowrap">
        <Loader2 className="animate-spin transition-all h-4 w-4 " />
        Loading...
      </div>
    </div>
  );
}
