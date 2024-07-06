import AddToCart from "@/app/(member)/_components/add-to-cart";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { formatPrice, handleDiscountPercentage } from "@/utils/format";
import { GiReturnArrow } from "react-icons/gi";
import { RiDoorOpenFill } from "react-icons/ri";
import { VscWorkspaceTrusted } from "react-icons/vsc";
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
}: Product) {
  const { finalPrice } = handleDiscountPercentage(
    price?.base_price,
    price?.offer?.discount_percentage
  );
  return (
    <div className="flex flex-col gap-3 flex-2">
      <span className=" font-bold text-[20px] m">
        {formatPrice(finalPrice || 0)}
      </span>
      <div className="py-4 flex gap-2 items-center border-y">
        <VscWorkspaceTrusted className="h-5 w-5 text-blue" />
        <p className="text-sm text-[#404553] ">{warranty}</p>
      </div>
      <div
        className={cn("text-[#00763f] text-lg font-semibold", {
          "text-red-600": !quantity_in_stock,
        })}
      >
        {quantity_in_stock ? "In Stock" : "Out of Stock"}
      </div>
      <div className="flex flex-col gap-3 ">
        <div className="flex gap-3 items-center w-full ">
          <AddToCart>
            <div className="flex justify-center ">
              <button className="w-full whitespace-nowrap bg-yellow-300 p-3 hover:brightness-[.9] rounded-md font-bold text-slate-700 border-yellow-500 mx-auto transition-all">
                ADD TO CART
              </button>
            </div>
          </AddToCart>
          <div className="flex justify-center w-full">
            <button className="w-full whitespace-nowrap border p-3 hover:brightness-[.8] bg-shade text-white  rounded-md font-bold    mx-auto transition-all">
              BUY NOW
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="w-full border whitespace-nowrap p-3 hover:backdrop-brightness-[0.9]  rounded-md font-bold text-slate-700   mx-auto transition-all">
            ADD TO WISHLIST
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center border-t mt-3 pt-3">
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
