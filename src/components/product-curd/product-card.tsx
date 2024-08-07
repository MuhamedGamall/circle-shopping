import { Product } from "@/types";
import { formatNumber, formatPrice, handleDiscountPercentage } from "@/utils/format";
import { truncateText } from "@/utils/truncate-text";
import Link from "next/link";
import { BiCartAdd } from "react-icons/bi";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { FaTruckMoving } from "react-icons/fa";
import { ImagesSlider } from "./images-slider";
import { cn } from "@/lib/utils";
import { AiOutlineLike } from "react-icons/ai";

export default function ProductCard({
  images,
  title,
  price,
  is_bestseller,
  likes,
  _id,
  delivery,
}: Product) {
  const  discountPercentage = price?.offer?.discount_percentage

  return (
    <div className=" bg-white p-2  mx-auto  w-[184px] lg:w-[206px]  h-full shadow-sm   flex flex-col gap-1">
      <div>
        <div className=" relative">
          <ImagesSlider images={images} id={_id} />
          <Button className="h-7 w-7   bg-white hover:bg-slate-100 rounded-md shadow-md absolute bottom-6 right-2 text-secondMain p-1">
            <BiCartAdd className=" h-7 w-7" />
          </Button>
          <Button className="h-7 w-7  bg-white hover:bg-slate-100  rounded-md  shadow-md absolute top-2 right-2 text-secondMain p-1">
            <Heart className=" h-7 w-7" />
          </Button>
          {is_bestseller && (
            <span className=" bg-slate-700  rounded-[30px] absolute top-2 left-2 text-white pt-0 px-3">
              Best Seller
            </span>
          )}
          <span className="flex items-center gap-1 bg-white text-[16px] border rounded-[30px]  absolute bottom-6 left-2 text-secondMain px-2">
            <span className="text-gray-500 text-[13px]">
              ({formatNumber(likes)})
            </span>
            <AiOutlineLike className="text-[#0084fd] h-4 w-4" />
          </span>
        </div>

        <div
          className={cn("font-semibold   rounded-b-sm p-1 capitalize text-sm", {
            hidden: !price?.offer?.deal_type,
            "bg-red-600/20 text-red-700 ":
              price?.offer?.deal_type === "mega deal",
            "bg-green-600/20 text-green-700":
              price?.offer?.deal_type === "deal" ||
              price?.offer?.deal_type === "beg deal sale",
          })}
        >
          {price?.offer?.deal_type}
        </div>
      </div>

      <Link href={"/products/" + _id} className=" flex flex-col gap-1  h-full ">
        <div className="text-[#404553] font-semibold text-[17px] leading-[1.24]  ">
          {truncateText(title, 35)}
        </div>
        {discountPercentage ? (
          <div className="flex gap-2 items-center">
            <strong className="text-[17px]">{formatPrice(price?.offer?.final_price )}</strong>
            <span className="text-shade text-sm line-through">
              {price?.base_price}
            </span>
            <span className=" text-[15px] text-[#38ae04]">
              {discountPercentage}% OFF
            </span>
          </div>
        ) : (
          <strong className="text-[17px]">
            {formatPrice(price?.base_price)}
          </strong>
        )}

        {delivery === "free" && (
          <div className="flex gap-2 items-center ">
            <FaTruckMoving className="h-4 w-4 text-[#3568db]" />
            <span className="text-sm">Free Delivrey</span>
          </div>
        )}
      </Link>
    </div>
  );
}
