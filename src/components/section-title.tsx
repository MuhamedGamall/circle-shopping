import { cn } from "@/lib/utils";
import React from "react";

export default function SectionTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-[20px] sm:text-[24px] whitespace-nowrap font-bold text-secondMain",
        className
      )}
    >
      {title}
    </h2>
  );
}
