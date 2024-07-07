import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { formatPrice } from "@/utils/format";
import Link from "next/link";
import { GiReturnArrow } from "react-icons/gi";
import { IoStorefrontSharp } from "react-icons/io5";
import { RiDoorOpenFill } from "react-icons/ri";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import ButtonsActions from "./buttons-actions";
const shippingInfos = [
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
export default function ProductActionsSection({
  price,
  warranty,
  quantity_in_stock,
  store_name,
  sizes,
  max_purchase_quantity,
}: Product | any) {
  return (
    <div className="hidden md:flex  flex-col gap-3 flex-2">
      <div className="flex items-end gap-1">
        <span className=" font-bold text-[25px] ">
          {formatPrice(price?.offer?.final_price || 0)}
        </span>
        {price?.offer?.offer_calc && (
          <span className="line-through text-slate-600">
            {formatPrice(price?.offer?.offer_calc)}
          </span>
        )}
      </div>
      <div className="py-4 flex gap-2 items-center border-y">
        <VscWorkspaceTrusted className="h-5 w-5 text-blue" />
        <p className="text-sm text-[#404553] ">{warranty}</p>
      </div>
    
      <ButtonsActions
        sizes={sizes}
        quantity_in_stock={quantity_in_stock}
        max_purchase_quantity={max_purchase_quantity}
      />

      <div className="flex flex-col justify-center border-t mt-3 pt-3">
        <div className="flex  gap-2 py-3">
          <div className="text-blue bg-slate-100 p-2 rounded-full h-fit w-fit">
            <IoStorefrontSharp className="min-h-5 min-w-5" />
          </div>
          <div className=" capitalize">
            <div className="text-sm ">sold by</div>
            <Link href={""} className="text-[12px] text-blue  block">
              {store_name}
            </Link>
          </div>
        </div>
        {shippingInfos.map((info, i) => (
          <div key={i} className="flex  gap-2 py-3">
            <div className="text-blue bg-slate-100 p-2 rounded-full h-fit w-fit">
              {info.Logo}
            </div>
            <div className=" capitalize">
              <div className="text-sm ">{info.title}</div>
              <p className="text-[12px] text-slate-500">{info.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
