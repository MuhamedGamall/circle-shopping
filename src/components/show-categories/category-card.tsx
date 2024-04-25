import React from "react";
import { CarouselItem } from "../ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types";

export default function CategoryCard({ sub_categories, main_category }: any) {
  return sub_categories?.map((el: any, i: number) => (
    <CarouselItem
      key={i}
      className={cn(
        "w-full h-full basis-1/5 sm:basis-1/6 min-w-[130px] max-w-[202px] pl-5"
      )}
    >
      <Link
        href={
          "/products/" +
          main_category?.name?.replaceAll(" ", "-") +
          "/" +
          el?.name?.replaceAll(" ", "-")
        }
        className="flex flex-col justify-center gap-2  p-2 rounded-xl"
      >
        <Image
          width={200}
          height={200}
          src={el?.image}
          alt=""
          loading="lazy"
          className="w-full h-full max-h-[186px] max-w-[186px] rounded-full object-cover shadow-md"
        />
        <span className="text-gray-600 text-center capitalize px-5 font-bold text-sm sm:text-[18px] break-keep" >
          {el?.name}
        </span>
      </Link>
    </CarouselItem>
  ));
}
