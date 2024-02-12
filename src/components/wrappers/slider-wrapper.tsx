"use client";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReactNode } from "react";

export function SliderWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
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
        <CarouselContent className={className}>{children}</CarouselContent>
        <CarouselNext className="absolute right-2 z-40 bg-white/80" />
      </div>
    </Carousel>
  );
}
