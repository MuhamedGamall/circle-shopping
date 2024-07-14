"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/types";
import Link from "next/link";
import LoaderLayout from "../loader-layout";
import SectionTitle from "../section-title";
import { buttonVariants } from "../ui/button";
import { SliderWrapper } from "../wrappers/slider-wrapper";
import ProductCard from "../product-curd/product-card";
import { CarouselItem } from "../ui/carousel";
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
  viewAllLink?: string | object;
  titleStyle?: string;
}) {
  return (
    <div className="relative">
      <div className={cn({ "h-[300px] my-2": loading })}>
        <LoaderLayout loading={loading} />
      </div>

      {data?.length > 0 && (
        <div className="mt-12 ">
          <div className="flex justify-between items-center mt-2">
            <SectionTitle
              title={title}
              className={cn("text-[18px] whitespace-normal sm:text-[20px] pb-4 pt-3", titleStyle)}
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
              <CarouselItem
                key={i}
                className={cn("w-full h-full min-w-[184px] max-w-[206px] py-2")}
              >
                <ProductCard {...el} />
              </CarouselItem>
            ))}
          </SliderWrapper>
        </div>
      )}
    </div>
  );
}
