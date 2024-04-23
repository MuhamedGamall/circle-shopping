"use client";

import CategoryImg from "./categories-img";
import { SliderWrapper } from "../wrappers/slider-wrapper";
import useCategories from "@/hooks/use-categories";
export default function CategoriesImages() {
const{data} =useCategories()
  return (
    <div className="bg-white py-4 px-2">
      <SliderWrapper>
        {data?.map((el,i) => (
          <CategoryImg key={i} {...el}  />
        ))}
      </SliderWrapper>
    </div>
  );
}
