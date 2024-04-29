"use client";

import { Product } from "@/types";
import SectionTitle from "../section-title";
import { SliderWrapper } from "../wrappers/slider-wrapper";
import ProductCard from "./product-card";
import LoaderLayout from "../loader-layout";
import { cn } from "@/lib/utils";
export default function ProductsSlider({
  title,
  data,
  loading,
}: {
  title: string;
  data: Product[];
  loading: boolean;
}) {
  return (
    <div className="relative mt-12">
      <div className={cn({ "h-[300px] my-2": loading })}>
        <LoaderLayout loadingCondition={loading} />
      </div>
      <SectionTitle title={title} className=" pb-6 " />
      <SliderWrapper className="products-slider-container ">
        {data?.map((el, i) => (
          <ProductCard key={i} {...el} />
        ))}
      </SliderWrapper>
    </div>
  );
}
