import React from "react";
import { CarouselItem } from "./ui/carousel";
import Link from "next/link";
import Image from "next/image";

export default function SliderItem({
  image,
  href,
}: {
  image: string;
  href: string;
}) {
  return (
    <CarouselItem className="w-fit h-fit">
      <Link href={href}>
        <Image
          width={200}
          height={200}
          objectFit="cover"
          src={image}
          alt=""
          className="w-fit h-full object-cover sm:aspect-auto aspect-[23/8]"
        />
      </Link>
    </CarouselItem>
  );
}
