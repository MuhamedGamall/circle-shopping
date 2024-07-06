import { Product } from "@/types";
import Link from "next/link";
import React from "react";
import { LuMousePointerClick } from "react-icons/lu";

export default function TitleAndBages({
  title,
  is_bestseller,
  category,
}: Product | any) {
  return (
    <div className=" flex flex-col gap-3 ">
      {!is_bestseller && (
        <Link
          href={`/products?role=bestsellers`}
          className=" bg-slate-700 w-fit  rounded-[30px]  py-[2px] px-2  flex items-center gap-1 text-white"
        >
          <LuMousePointerClick className="rotate-90 h-5 w-50" />
          <span className="">Best Seller</span>
        </Link>
      )}
      <Link
        href={"/products?role=all_products&brand=" + category?.brand}
        className="bg-[#f3f4f8] p-2 rounded-[30px] w-fit uppercase font-bold text-black text-[15px]"
      >
        {category?.brand}
      </Link>
      <h1 className="text-[#404553] max-w-[300px]   capitalize font-semibold  text-[1.3em]">
        {title}
      </h1>
    </div>
  );
}
