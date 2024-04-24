"use client";

import CategoryImg from "./categories-img";
import { SliderWrapper } from "../wrappers/slider-wrapper";
import useCategories from "@/hooks/use-categories";
import { Skeleton } from "../ui/skeleton";
import { CarouselItem } from "../ui/carousel";
import { cn } from "@/lib/utils";
const LoadingSkeleton = () => {
  const loadingArray = Array.from({ length: 22 });

  return loadingArray.map((_, i) => (
    <CarouselItem
      key={i}
      className={cn("w-full mr-3 h-full basis-1/5 sm:basis-1/12")}
    >
      <Skeleton className="h-[80px] w-[80px] rounded-full " />
    </CarouselItem>
  ));
};
export default function CategoriesImages() {
  const { data, loading } = useCategories();
  return (
    <div className="bg-white py-4 px-2">
      <SliderWrapper className=" ">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          data?.map((el, i) => <CategoryImg key={i} {...el} />)
        )}
      </SliderWrapper>
    </div>
  );
}
