"use client";

import CategoriesImagesWrapper from "@/components/wrappers/categorias-images-wrapper";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  cleanUp,
  getCategory_member,
} from "@/lib/RTK/slices/member/categories-slice";
import { useEffect } from "react";
import CategoryImg from "./sub-category-img";
import { CarouselItem } from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function SubCategoriesSlider({
  category_id,
}: {
  category_id: string;
}) {
  const dispatch = useAppDispatch();
  const { category, loading } = useAppSelector(
    (state) => state.member_categories
  );

  useEffect(() => {
    dispatch(cleanUp());
    dispatch(getCategory_member(category_id?.replaceAll("-", " ")));
  }, [category_id, dispatch]);

  return (
    <CategoriesImagesWrapper loading={loading} className="p-0">
      <CarouselItem
        className={cn(
          "w-full h-full basis-1/5 lg:basis-1/12 sm:basis-[15%] md:basis-[12%]",
          { hidden: !category }
        )}
      >
        <Link
          href={"/categories/" + category_id + "/deals"}
          className="flex flex-col items-center  gap-2"
        >
          <Image
            width={100}
            height={100}
            src={"/deals.png"}
            alt=""
            className="w-full h-full object-cover rounded-full border-[#d6d6d6] block border"
          />
          <p className="  break-keep text-center font-bold leading-4 lg:leading-5 capitalize text-slate-600 lg:text-[16px] text-[12px] md:text-sm ">
            deals
          </p>
        </Link>
      </CarouselItem>
      <CarouselItem
        className={cn(
          "w-full h-full basis-1/5 lg:basis-1/12 sm:basis-[15%] md:basis-[12%]",
          { hidden: !category }
        )}
      >
        <Link
          href={"/categories/" + category_id + "/bestsellers"}
          className="flex flex-col items-center  gap-2"
        >
          <Image
            width={100}
            height={100}
            src={"/bestsellers.png"}
            alt=""
            className="w-full h-full object-cover rounded-full border-[#d6d6d6] block border"
          />
          <p className="  break-keep text-center font-bold leading-4 lg:leading-5 capitalize text-slate-600 lg:text-[16px] text-[12px] md:text-sm ">
            bestsellers
          </p>
        </Link>
      </CarouselItem>
      {category?.sub_categories?.map((el: any, i: number) => (
        <CategoryImg key={i} {...el} category_id={category_id} />
      ))}
    </CategoriesImagesWrapper>
  );
}
