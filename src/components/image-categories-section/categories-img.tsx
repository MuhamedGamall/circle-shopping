import { CarouselItem } from "../ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Category } from "@/types";

export default function CategoryImg({ main_category }: Category) {
  return (
    <CarouselItem className={cn("w-full h-full basis-1/5 lg:basis-1/12 sm:basis-[15%] md:basis-[12%]")}>
      <Link href={"href"} className="flex flex-col items-center  gap-3">
        <Image
          width={100}
          height={100}
          objectFit="cover"
          src={main_category?.image}
          alt=""
          className="w-full h-full object-cover rounded-full border-[#d6d6d6] block border"
        />
        <p className=" text-center font-bold leading-3 lg:leading-5 capitalize lg:text-sm text-[12px] ">{main_category?.name}</p>
      </Link>
    </CarouselItem>
  );
}
