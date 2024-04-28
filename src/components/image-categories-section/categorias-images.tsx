"use client";

import CategoryImg from "./categories-img";
import { SliderWrapper } from "../wrappers/slider-wrapper";
import useCategories from "@/hooks/use-categories";
import { Skeleton } from "../ui/skeleton";
import { CarouselItem } from "../ui/carousel";
import { cn } from "@/lib/utils";
import LoaderLayout from "../loader-layout";

export default function CategoriesImages() {
  const { data, loading } = useCategories();
  return (
    <div className="bg-white py-4 px-2 relative">
      <div className={cn({ "h-[50px]": loading })}>
        <LoaderLayout loadingCondition={loading} />
      </div>
      <SliderWrapper className=" ">
        {data?.map((el, i) => (
          <CategoryImg key={i} {...el} />
        ))}
      </SliderWrapper>
    </div>
  );
}
