import { CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function CategoryImg({
  name,
  image,
  category_id,
}: {
  image: string;
  name: string;
  category_id: string;
}) {
  return (
    <CarouselItem
      className={cn(
        "w-full h-full basis-1/5 lg:basis-1/12 sm:basis-[15%] md:basis-[12%]"
      )}
    >
      <Link
        href={"/category/" + category_id + "/" + name?.replaceAll(" ", "-")}
        className="flex flex-col items-center  gap-2"
      >
        <Image
          width={100}
          height={100}
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
