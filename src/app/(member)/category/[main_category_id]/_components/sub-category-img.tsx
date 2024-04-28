import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { CarouselItem } from "@/components/ui/carousel";

export default function CategoryImg({
  name,
  image,
  main_category_id,
}: {
  image: string;
  name: string;
  main_category_id: string;
}) {
  return (
    <CarouselItem
      className={cn(
        "w-full h-full basis-1/5 lg:basis-1/12 sm:basis-[15%] md:basis-[12%]"
      )}
    >
      <Link
        href={"/category/" + main_category_id + "/" + name?.replaceAll(" ", "-")}
        className="flex flex-col items-center  gap-2"
      >
        <Image
          width={100}
          height={100}
          objectFit="cover"
          src={image}
          alt=""
          className="w-full h-full object-cover rounded-full border-[#d6d6d6] block border"
        />
        <p className="  break-keep text-center font-bold leading-4 lg:leading-5 capitalize text-slate-600 lg:text-[16px] text-[12px] md:text-sm ">
          {name}
        </p>
      </Link>
    </CarouselItem>
  );
}
