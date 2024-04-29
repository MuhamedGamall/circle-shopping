"use client";
import useMemberCategories from "@/hooks/member/use-member-categories";
import Image from "next/image";
import Link from "next/link";
import SliderAds from "./ads-slider/slider-ads";
import CategoryImg from "./home-categories-slider-img";
import CategoriesImages from "./wrappers/categorias-images-wrapper";
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
];

export default function HeroSection() {
  const { data, loading } = useMemberCategories();
  return (
    <div>
      <div className="flex items-center gap-[1px] h-full">
        <div className="flex-[3.5]">
          <SliderAds
            images={images}
            className="w-fit h-full object-cover sm:aspect-auto aspect-[23/8]"
          />
        </div>
        <div className="hidden sm:flex items-center flex-[1.5] ">
          <Link href={"/fashion-women"} className="flex-1">
            <Image
              width={200}
              height={200}
              src={"/ads-photos/9fa77bc4-04be-47ec-a433-42126343092c.avif"}
              alt="ads image"
              className="w-full h-full object-cover"
            />
          </Link>
          <Link href={"/fashion-men"} className="flex-1">
            <Image
              width={200}
              height={200}
              src={"/ads-photos/aeca53b5-4d64-4733-a911-0143b32ce237.avif"}
              alt=""
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </div>
      <CategoriesImages loading={loading}>
        {data?.map((el, i) => (
          <CategoryImg key={i} {...el} />
        ))}
      </CategoriesImages>
    </div>
  );
}
