import React from "react";
import { CarouselItem } from "../ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({
  image,
  href,
  title,
  width,
  height,
}: {
  image: string;
  href: string;
  title: string;
  width: number;
  height: number;
}) {
  return (
    <CarouselItem
      className={cn(
        "w-full h-full basis-1/5 sm:basis-1/6 min-w-[130px] max-w-[202px] p-0"
      )}
    >
      <Link
        href={href}
        className="flex flex-col justify-center gap-2  p-2 rounded-xl"
      >
        <Image
          width={width}
          height={height}
          objectFit="cover"
          src={image}
          alt=""
          loading="lazy"
          className=" object-cover  rounded-xl shadow-md"
        />
        <span className="text-gray-600 px-5 font-bold text-sm sm:text-[18px] break-all">
          {title}
        </span>
      </Link>
    </CarouselItem>
  );
}
