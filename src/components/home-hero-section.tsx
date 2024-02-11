import React from "react";
import SliderAds from "./slider-ads";
import Link from "next/link";
import Image from "next/image";
import CategoriesImages from "./image-categories-section/categorias-images";
const images = [
  {
    image: "/ads-photos/beauty.avif",
    href: "/",
  },
  {
    image: "/ads-photos/ELECTRONICS.avif",
    href: "/",
  },
  {
    image: "/ads-photos/home-kitchen.avif",
    href: "/",
  },
  {
    image: "/ads-photos/home-kitchen.avif",
    href: "/",
  },
  {
    image: "/ads-photos/home-kitchen2.avif",
    href: "/",
  },
  {
    image: "/ads-photos/valantine.avif",
    href: "/",
  },
];
const categorisImages = [
  {
    image: "/categories-photos/22e24d67-5157-4b67-8218-4b47a1dfa0cd.avif",
    href: "/",
  },
  {
    image: "/categories-photos/5a8b0ed2-d8cb-404a-96aa-c2256220d241.avif",
    href: "/",
  },
  {
    image: "/categories-photos/6453083a-d341-4f0f-bda7-a303ea9f29da.avif",
    href: "/",
  },
  {
    image: "/categories-photos/b0e5fe61-56a2-49c4-8c6a-22017264c810.avif",
    href: "/",
  },
  {
    image: "/categories-photos/22e24d67-5157-4b67-8218-4b47a1dfa0cd.avif",
    href: "/",
  },
  {
    image: "/categories-photos/5a8b0ed2-d8cb-404a-96aa-c2256220d241.avif",
    href: "/",
  },
  {
    image: "/categories-photos/6453083a-d341-4f0f-bda7-a303ea9f29da.avif",
    href: "/",
  },
  {
    image: "/categories-photos/b0e5fe61-56a2-49c4-8c6a-22017264c810.avif",
    href: "/",
  },
  {
    image: "/categories-photos/22e24d67-5157-4b67-8218-4b47a1dfa0cd.avif",
    href: "/",
  },
  {
    image: "/categories-photos/5a8b0ed2-d8cb-404a-96aa-c2256220d241.avif",
    href: "/",
  },
  {
    image: "/categories-photos/6453083a-d341-4f0f-bda7-a303ea9f29da.avif",
    href: "/",
  },
  {
    image: "/categories-photos/b0e5fe61-56a2-49c4-8c6a-22017264c810.avif",
    href: "/",
  },
  {
    image: "/categories-photos/22e24d67-5157-4b67-8218-4b47a1dfa0cd.avif",
    href: "/",
  },
  {
    image: "/categories-photos/5a8b0ed2-d8cb-404a-96aa-c2256220d241.avif",
    href: "/",
  },
  {
    image: "/categories-photos/6453083a-d341-4f0f-bda7-a303ea9f29da.avif",
    href: "/",
  },
  {
    image: "/categories-photos/b0e5fe61-56a2-49c4-8c6a-22017264c810.avif",
    href: "/",
  },
  {
    image: "/categories-photos/22e24d67-5157-4b67-8218-4b47a1dfa0cd.avif",
    href: "/",
  },
  {
    image: "/categories-photos/5a8b0ed2-d8cb-404a-96aa-c2256220d241.avif",
    href: "/",
  },
  {
    image: "/categories-photos/6453083a-d341-4f0f-bda7-a303ea9f29da.avif",
    href: "/",
  },
  {
    image: "/categories-photos/b0e5fe61-56a2-49c4-8c6a-22017264c810.avif",
    href: "/",
  },
];
export default function HeroSection() {
  return (
    <div>
      <div className="flex items-center gap-[1px] h-full">
        <div className="flex-[3.5]">
          <SliderAds images={images} />
        </div>
        <div className="hidden sm:flex items-center flex-[1.5] ">
          <Link href={"/fashion-women"} className="flex-1">
            <Image
              width={200}
              height={200}
              objectFit="cover"
              src={"/ads-photos/9fa77bc4-04be-47ec-a433-42126343092c.avif"}
              alt="ads image"
              className="w-full h-full object-cover"
            />
          </Link>
          <Link href={"/fashion-men"} className="flex-1">
            <Image
              width={200}
              height={200}
              objectFit="cover"
              src={"/ads-photos/aeca53b5-4d64-4733-a911-0143b32ce237.avif"}
              alt=""
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </div>
      <CategoriesImages images={categorisImages} />
    </div>
  );
}
