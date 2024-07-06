import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types";
import {
  formatNumber,
  formatPrice
} from "@/utils/format";
import { AiOutlineLike } from "react-icons/ai";
import { FaHandHoldingUsd, FaTruckMoving } from "react-icons/fa";
import { GiStarMedal } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";
import TitleAndBages from "./title-and-bages";

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

export default function ProductDetailsSection({
  title,
  is_bestseller,
  category,
  model_number,
  price,
  likes,
  delivery,
  sizes,
}: Product | any) {
  const discountPercentage = price?.offer?.discount_percentage;
  return (
    <div className="flex flex-col gap-3 w-full items-start border-r p-3">
      <div className=" md:block  hidden">
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
      {/* <div className="w-full max-w-[326px]">
        <div className="mb-3 text-gray-400 text-[12px] ">Size</div>
        <Select defaultValue="small">
          <SelectTrigger className=" capitalize ">
            <SelectValue placeholder={"Select Size"} />
          </SelectTrigger>
          <SelectContent className="max-h-[350px] overflow-y-auto">
            <SelectGroup>
              <SelectLabel>Size</SelectLabel>
              {sizes?.map((el: string, i: number) => (
                <SelectItem key={i} value={el} className="capitalize">
                  {el}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}
      <div
        className="flex items-center border border-[#f3f4f8] gap-3 p-[14px_4px]  bg-white rounded-md "
        style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 2px 8px 0px" }}
      >
        {shippingInfos.map((el, i) => (
          <div key={i} className="flex flex-col items-center gap-2 ">
            <div
              className="rounded-md p-3 w-[42px] h-[42px] text-blue flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(rgb(243, 244, 248) 0%, rgb(255, 255, 255) 85.71%)",
              }}
            >
              {el.Logo}
            </div>
            <span className="text-[12px] text-[#404553] text-center max-w-[70px]">
              {el.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
