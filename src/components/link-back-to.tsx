import { cn } from "@/lib/utils";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function LinkBackTo({
  label,
  href,
  className,
}: {
  label: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "my-2 flex items-center gap-2 whitespace-nowrap text-sm text-slate-600",
        className
      )}
    >
      <MoveLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}
