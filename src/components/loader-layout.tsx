import { Loader2 } from "lucide-react";
import React from "react";

export default function LoaderLayout({
  loadingCondition,
}: {
  loadingCondition: boolean;
}) {
  if (!loadingCondition) return;

  return (
    <div className="p-3 absolute z-40 h-full w-full bg-slate-200/30 inset-0 flex items-center justify-center">
      <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
    </div>
  );
}
