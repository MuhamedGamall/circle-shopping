"use client";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function SliderWrapper({
  children,
  className,
  style
}: {
  children: ReactNode;
  className?: string;
  style?:any
}) {
  return (
    <Carousel
      className="w-full"
      opts={{
        align: "start",
      }}
    >
      <div className="relative">
        <CarouselPrevious className="absolute left-2 z-40 bg-white/80" />
        <CarouselContent className={cn(className)} style={style}>{children}</CarouselContent>
        <CarouselNext className="absolute right-2 z-40 bg-white/80" />
      </div>
    </Carousel>
  );
}
