"use client";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import SliderItem from "./slider-ads-item";



export default function SliderAds({ className,images }: { className?: string,images:{image:string,href:string}[] }) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <div className="relative">
        <CarouselPrevious className="absolute left-2 z-40 bg-white/80" />
        <CarouselContent>
          {images?.map((el) => (
            <SliderItem key={el.image} {...el} className={className} />
          ))}
        </CarouselContent>
        <CarouselNext className="absolute right-2 z-40 bg-white/80" />
      </div>
    </Carousel>
  );
}
