import React from "react";
import { CarouselItem } from "../ui/carousel";
import Link from "next/link";
import Image from "next/image";

export default function SliderItem({
  image,
  href,
  className
}: {
  image: string;
  href: string;
  className?:string
}) {
  return (
    <CarouselItem>
      <Link href={href}>
        <Image
          width={200}
          height={200}
          src={image}
          alt=""
          className={className}
        />
      </Link>
    </CarouselItem>
  );
}
