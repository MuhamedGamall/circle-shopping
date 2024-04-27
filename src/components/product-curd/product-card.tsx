import { Product } from "@/types";
import { formatPrice } from "@/utils/format";
import { truncateText } from "@/utils/truncate-text";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BiCartAdd } from "react-icons/bi";
import { Button } from "../ui/button";

import { FaTruckMoving } from "react-icons/fa";
import { CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { formatNumber } from "../../utils/format";
import { ImagesSlieder } from "./images-slider";
import { HandleDeals } from "./handle-deals";


export default function ProductCard({
  images,
  title,
  price,
}: // likes,
// is_best_seller,
Product) {
  const discount_percentage = price?.offer?.discount_percentage;
  const offerCalc = (discount_percentage / 100) * price?.base_price;

  return (
    // <CarouselItem
    //   className={cn(
    //     "min-w-[195px] lg:min-w-[251px] max-w-[230px] h-full basis-1/5"
    //   )}
    // >
    <div className=" bg-white p-2  mx-auto  w-[184px] lg:w-[230px]  h-full border flex flex-col gap-1">
      {/* <div className="w-[153px] lg:w-[209px]  mx-auto "> */}
      <div>
        <ImagesSlieder
          images={images}
          likes={332222434}
          is_best_seller={true}
        />
        <HandleDeals discount_percentage={discount_percentage} />
      </div>
      {/* </div> */}

      <div className=" flex flex-col gap-1 justify-center">
        <Link
          href={"href"}
          className="text-[#404553] font-semibold text-[17px] leading-[1.24] "
        >
          {truncateText(title, 35)}
        </Link>
        {discount_percentage ? (
          <div className="flex gap-2 items-center">
            <strong className="text-[17px]">{formatPrice(offerCalc)}</strong>
            <span className="text-shade text-sm line-through">
              {price?.base_price}
            </span>
            <span className=" text-[15px] text-[#38ae04]">
              {discount_percentage}% OFF
            </span>
          </div>
        ) : (
          <strong className="text-[17px]">
            {formatPrice(price?.base_price)}
          </strong>
        )}

        <div className="flex gap-2 items-center ">
          <FaTruckMoving className="h-4 w-4 text-[#3568db]" />
          <span className="text-sm">Free Delivrey</span>
        </div>
      </div>
    </div>
    // {/* </CarouselItem> */}
  );
}
