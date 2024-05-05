import { Product } from "@/types";
import { formatPrice } from "@/utils/format";
import { truncateText } from "@/utils/truncate-text";
import Link from "next/link";

import { FaTruckMoving } from "react-icons/fa";
import { ImagesSlieder } from "./images-slider";
import { cn } from "@/lib/utils";

// export default function ProductCard({
//   images,
//   title,
//   price,
//   is_bestseller,
//   likes,
// }: Product) {
//   const discount_percentage = price?.offer?.discount_percentage;

//   const offerCalc = (discount_percentage / 100) * price?.base_price;
//   const finalPrice = price?.base_price - offerCalc;
//   return (
//     <div className=" bg-white p-2  mx-auto  w-[184px] lg:w-[206px] overflow-hidden  h-full border flex flex-col gap-1">
//       <div>
//         <ImagesSlieder
//           images={images}
//           likes={likes}
//           is_bestseller={is_bestseller}
//         />
//         <HandleDeals discount_percentage={discount_percentage} />
//       </div>

//       <Link href={""} className=" flex flex-col gap-1  h-full ">
//         <div className="text-[#404553] font-semibold text-[17px] leading-[1.24]  ">
//           {truncateText(title, 35)}
//         </div>
//         {discount_percentage ? (
//           <div className="flex gap-2 items-center">
//             <strong className="text-[17px]">{formatPrice(finalPrice)}</strong>
//             <span className="text-shade text-sm line-through">
//               {price?.base_price}
//             </span>
//             <span className=" text-[15px] text-[#38ae04]">
//               {discount_percentage}% OFF
//             </span>
//           </div>
//         ) : (
//           <strong className="text-[17px]">
//             {formatPrice(price?.base_price)}
//           </strong>
//         )}

//         <div className="flex gap-2 items-center ">
//           <FaTruckMoving className="h-4 w-4 text-[#3568db]" />
//           <span className="text-sm">Free Delivrey</span>
//         </div>
//       </Link>
//     </div>
//   );
// }
export default function ProductCard({
  images,
  title,
  price,
  is_bestseller,
  likes,
}: Product) {
  const discount_percentage = price?.offer?.discount_percentage;

  const offerCalc = (discount_percentage / 100) * price?.base_price;
  const finalPrice = price?.base_price - offerCalc;
  return (
    <div className="rounded-md  bg-white p-2  mx-auto  w-[184px] lg:w-[206px] overflow-hidden  h-full border flex flex-col gap-1">
      <div className="">
        <ImagesSlieder
          images={images}
          likes={likes}
          is_bestseller={is_bestseller}
        />
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

      <Link href={""} className=" flex flex-col gap-1  h-full ">
        <div className="text-[#404553] font-semibold text-[17px] leading-[1.24]  ">
          {truncateText(title, 35)}
        </div>
        {discount_percentage ? (
          <div className="flex gap-2 items-center">
            <strong className="text-[17px]">{formatPrice(finalPrice)}</strong>
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
      </Link>
    </div>
  );
}
