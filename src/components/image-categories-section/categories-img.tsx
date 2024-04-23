import { CarouselItem } from "../ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Category } from "@/types";

export default function CategoryImg({ main_category }: Category) {
  return (
    <CarouselItem className={cn("w-full h-full basis-1/5 sm:basis-1/12")}>
      <Link href={"href"} className="">
        <Image
          width={100}
          height={100}
          objectFit="cover"
          src={main_category?.image}
          alt=""
          className="w-full h-full object-cover rounded-full border-[#d6d6d6] block border"
        />
      </Link>
    </CarouselItem>
  );
}
