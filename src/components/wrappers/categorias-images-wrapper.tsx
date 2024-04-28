"use client";

import useCategories from "@/hooks/use-categories";
import { cn } from "@/lib/utils";
import LoaderLayout from "../loader-layout";
import { SliderWrapper } from "./slider-wrapper";
import CategoryImg from "../home-main-categories-img";
import { Category } from "@/types";
import { ReactNode } from "react";

export default function CategoriesImagesWrapper({
  loading,
  children,
  className
}: {
  loading: boolean;
  children: ReactNode;
  className?:string
}) {
  return (
    <div className={cn("bg-white py-4 px-2 relative",className)}>
      <div className={cn({ "h-[62px]": loading })}>
        <LoaderLayout loadingCondition={loading} />
      </div>
      <SliderWrapper className=" ">{children}</SliderWrapper>
    </div>
  );
}
