import { CarouselItem } from "../ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Category } from "@/types";

export default function CategoryImg({ main_category }: Category) {

  return (
    <CarouselItem className={cn("w-full h-full basis-1/5 lg:basis-1/12 sm:basis-[15%] md:basis-[12%]")}>
      <Link href={"/products/"+main_category?.name?.replaceAll(' ','-')} className="flex flex-col items-center  gap-2">
        <Image
          width={100}
          height={100}
          objectFit="cover"
          src={main_category?.image}
          alt=""
          className="w-full h-full object-cover rounded-full border-[#d6d6d6] block border"
        />
        <p  className="  break-keep text-center font-bold leading-4 lg:leading-5 capitalize text-slate-600 lg:text-[16px] text-[12px] md:text-sm ">{main_category?.name}</p>
      </Link>
    </CarouselItem>
  );
}
