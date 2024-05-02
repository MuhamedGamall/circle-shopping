"use client";

import { Product } from "@/types";
import SectionTitle from "../section-title";
import { SliderWrapper } from "../wrappers/slider-wrapper";
import ProductCard from "./product-card";
import LoaderLayout from "../loader-layout";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
export default function ProductsSlider({
  title,
  data,
  loading,
  viewAllLink,
  titleStyle,
}: {
  title: string;
  data: Product[];
  loading: boolean;
  viewAllLink?: string;
  titleStyle?: string;
}) {
  return (
    <div className="relative mt-12 ">
      <div className={cn({ "h-[300px] my-2": loading })}>
        <LoaderLayout loadingCondition={loading} />
      </div>
      <div className="flex justify-between items-center mt-2">
        <SectionTitle
          title={title}
          className={cn("text-[18px] sm:text-[20px] pb-4 pt-3", titleStyle)}
        />
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className={cn(
              buttonVariants({
                variant: "outline",
                className:
                  " text-[11px] sm:text-sm rounded-none sm:px-4 px-1.5 sm:h-[40px]  h-[30px] border-slate-700",
              })
            )}
          >
            VIEW ALL
          </Link>
        )}
      </div>
      <SliderWrapper className="products-slider-container ">
        {data?.map((el, i) => (
          <ProductCard key={i} {...el} />
        ))}
      </SliderWrapper>
    </div>
  );
}
