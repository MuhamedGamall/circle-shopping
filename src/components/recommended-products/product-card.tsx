import { CarouselItem } from "../ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import formatPrice from "@/utils/format";
import { truncateText } from "@/utils/truncate-text";
import { BiCartAdd } from "react-icons/bi";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { HiStar } from "react-icons/hi2";
export default function ProductCard({
  image,
  href,
  title,
  price,
  width,
  height,
}: {
  image: string;
  href: string;
  title: string;
  price: number;
  width: number;
  height: number;
}) {
  return (
    <CarouselItem
      className={cn("w-full h-full basis-1/5 sm:basis-1/6 min-w-[230px]")}
    >
      <div className="bg-white rounded-md p-2 border flex flex-col gap-2 justify-center">
        <Link href={href} className=" p-3 rounded-md bg-slate-100/50 relative">
          <Image
            width={width}
            height={height}
            objectFit="cover"
            src={image}
            alt=""
            className="w-full h-full object-cover  rounded-md"
          />
          <Button className="text-[28px] h-9 w-9  bg-white hover:bg-slate-100 rounded-full shadow-md absolute bottom-4 right-2 text-secondMain p-1">
            <BiCartAdd />
          </Button>
          <Button className="text-[28px] h-9 w-9  bg-white hover:bg-slate-100 rounded-full shadow-lg absolute top-4 right-2 text-secondMain p-1">
            <Heart />
          </Button>
          <span className=" bg-slate-700  rounded-[30px] absolute top-4 left-2 text-white pt-0 px-3">
            Best Seller
          </span>
          <span className="flex items-center gap-1 bg-white text-[16px] border rounded-[30px]  absolute bottom-4 left-2 text-secondMain pt-0 px-2">
            4.5 <HiStar color="green" />
            <span className="text-gray-500 text-[13px]">(3.9k)</span>
          </span>
        </Link>
        <Link
          href={href}
          className="text-[#404553] font-semibold text-[14px] leading-[1.24] h-[35px]"
        >
          {truncateText(title, 47)}
        </Link>
        <strong className="text-[17px]">{formatPrice(price)}</strong>
      </div>
    </CarouselItem>
  );
}
