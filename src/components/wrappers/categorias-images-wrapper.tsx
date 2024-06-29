"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import LoaderLayout from "../loader-layout";
import { SliderWrapper } from "./slider-wrapper";

export default function CategoriesImagesWrapper({
  loading,
  children,
  className,
}: {
  loading: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-white py-4 px-2 relative", className)}>
      <div className={cn({ "h-[100px] my-5": loading })}>
        <LoaderLayout loading={loading} />
      </div>
      <SliderWrapper className=" ">{children}</SliderWrapper>
    </div>
  );
}
