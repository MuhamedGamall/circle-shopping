"use client";

import SlideItem from "./categories-img";
import { SliderWrapper } from "../wrappers/slider-wrapper";
export default function CategoriesImages({
  images,
}: {
  images: { image: string; href: string }[];
}) {
  return (
    <div className="bg-[#feeaea] p-3">
      <SliderWrapper>
        {/* <div className=" "> */}
        {images.map((el) => (
          <SlideItem
            key={el.image}
            {...el}
            height={100}
            width={100}
            className="basis-1/5 sm:basis-1/12"
          />
        ))}
        {/* </div> */}
      </SliderWrapper>
    </div>
  );
}
