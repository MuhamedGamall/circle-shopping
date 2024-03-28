"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
const bannerVariants = cva(
  "w-full mb-6 p-4 border-l-[3px] text-primary rounded-r-sm flex justify-between",
  {
    variants: {
      variant: {
        warning: "bg-red-300/20 border-red-700",
        success: "bg-green-600/20 border-green-700 ",
        info: "bg-slate-200/30 border-slate-500 ",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);
interface BannerProps extends VariantProps<typeof bannerVariants> {
  details: string[];
  title: string;
  className?: string;
  hiddeButton?: boolean;
}
export default function Banner({
  details,
  variant,
  title,
  className,
  hiddeButton = false,
}: BannerProps) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div
      className={cn(bannerVariants({ variant, className }), {
        hidden: isClicked,
      })}
    >
      <div>
        <h3 className="mb-2  font-semibold text-black">{title}</h3>
        <ul
          className={cn(
            "[&>li]:ml-5 grid grid-cols-1 list-disc gap-y-2 gap-x-5 lg:grid-cols-2 "
          )}
        >
          {details.map((el, i) => (
            <li key={i}>{el}</li>
          ))}
        </ul>
      </div>
      <Button
        variant={"ghost"}
        className={cn("px-2 rounded-full",{hidden:hiddeButton})}
        onClick={() => setIsClicked(true)}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}
