import { CarouselItem } from "../ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function SlideItem({
  image,
  href,
  width,
  height,
  className,
}: {
  image: string;
  href: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <CarouselItem className={cn("w-full h-full basis-1/5 sm:basis-1/12")}>
      <Link href={href}>
        <Image
          width={width}
          height={height}
          objectFit="cover"
          src={image}
          alt=""
          className="w-full h-full object-cover"
        />
      </Link>
    </CarouselItem>
  );
}
