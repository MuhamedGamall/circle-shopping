import { Product } from "@/types";
import { formatNumber, formatPrice } from "@/utils/format";
import Link from "next/link";
import { AiOutlineLike } from "react-icons/ai";
import { FaHandHoldingUsd, FaTruckMoving } from "react-icons/fa";
import { GiReturnArrow, GiStarMedal } from "react-icons/gi";
import { IoStorefrontSharp } from "react-icons/io5";
import { RiDoorOpenFill, RiSecurePaymentFill } from "react-icons/ri";
import TitleAndBages from "./title-and-bages-section";
import ShippingInfos from "./shipping-infos-section";

const shippingInfos = [
  {
    Logo: <FaTruckMoving className="min-h-5 min-w-5" />,
    label: "deilvery by circle",
  },
  {
    Logo: <GiStarMedal className="min-h-5 min-w-5" />,
    label: "high rated seller",
  },
  {
    Logo: <FaHandHoldingUsd className="min-h-5 min-w-5" />,
    label: "cash on delivery",
  },
  {
    Logo: <RiSecurePaymentFill className="min-h-5 min-w-5" />,
    label: "secure transaction",
  },
];
const mobileShippingInfos = [
  {
    Logo: <GiReturnArrow className="min-h-5 min-w-5" />,
    title: "free returns",
    description: "Get free returns on eligible items",
  },
  {
    Logo: <RiDoorOpenFill className="min-h-5 min-w-5" />,
    title: "conctactless delivery",
    description:
      "Your delivery will be left at your door, valid on prepaid orders only.",
  },
];
export default function ProductDetailsSection({
  title,
  is_bestseller,
  category,
  model_number,
  price,
  likes,
  delivery,
  sizes,
  store_name,
}: Product | any) {
  const discountPercentage = price?.offer?.discount_percentage;
  return (
    <div className="flex flex-col gap-3 w-full items-start md:border-r md:p-3">
      <div className=" ">
        <TitleAndBages
          title={title}
          is_bestsellers={is_bestseller}
          category={category}
        />
      </div>

      <div className="flex flex-col gap-4 items-start  ">
        <div className="flex items-center flex-wrap gap-y-3 text-slate-400 text-[13px]">
          <div className="pr-2 mr-2 border-r font-semibold">
            Model Number: {model_number}
          </div>
          <div className="flex items-center gap-1">
            <AiOutlineLike className="text-[#0084fd] h-4 w-4" />({" "}
            {formatNumber(likes || 0)} )
          </div>
        </div>
        <div className="grid text-[#404553] gap-[12px_6px] text-sm font-semibold  items-center justify-start grid-cols-[auto_1fr]">
          {discountPercentage && (
            <>
              <div>Was: </div>
              <span className=" text-slate-500 line-through">
                {formatPrice(price?.base_price || 0)}
              </span>
            </>
          )}
          <div>Now: </div>
          <span className=" font-bold text-[20px] ">
            {formatPrice(price?.offer?.final_price || 0)}
          </span>
          {discountPercentage && (
            <>
              <div>Saving: </div>
              <span className=" flex items-center ">
                {formatPrice(price?.offer?.offer_calc || 0)}

                <span className="font-semibold text-[11px]  py-0 leading-4 text-[#37ae02] bg-[#dff1d9] px-1 mx-3 border-1 flex justify-center items-center">
                  {discountPercentage}% off
                </span>
              </span>
            </>
          )}
        </div>
        <div
          className="flex items-center gap-2  w-full "
          style={{
            backgroundImage:
              "linear-gradient(91deg, rgba(253, 241, 114, 0.45) 1.08%, rgba(253, 241, 114, 0.2) 50.57%, rgba(253, 241, 114, 0) 96.9%)",
          }}
        >
          {discountPercentage && (
            <div
              className="bg-main  opacity-[.8] pr-4 pl-1 py-1 capitalize text-[#493202] font-bold text-[12px]"
              style={{
                clipPath: "polygon(0px 0px, 100% 0px, 85% 100%, 0% 100%)",
              }}
            >
              {price?.offer?.deal_type}
            </div>
          )}
          {delivery === "free" && (
            <div className="flex gap-1  items-center px-1">
              <FaTruckMoving className="h-3 w-3 text-[#3568db]" />
              <span className="text-[12px] font-semibold tex-shade">
                Free Delivrey
              </span>
            </div>
          )}
        </div>
      </div>
      <ShippingInfos store_name={store_name}/>
    </div>
  );
}
