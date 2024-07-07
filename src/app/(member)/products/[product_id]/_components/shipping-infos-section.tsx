import Link from "next/link";
import { FaHandHoldingUsd, FaTruckMoving } from "react-icons/fa";
import { GiReturnArrow, GiStarMedal } from "react-icons/gi";
import { IoStorefrontSharp } from "react-icons/io5";
import { RiDoorOpenFill, RiSecurePaymentFill } from "react-icons/ri";
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
export default function ShippingInfos({store_name}:{store_name:string}) {
  return (
    <>
      <div
        className="flex items-start  w-fit mx-auto  border border-[#f3f4f8] gap-3 p-[14px_4px]  bg-white rounded-md "
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
      <div className="md:hidden flex flex-col justify-center border-t mt-3 pt-3">
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
        {mobileShippingInfos.map((info, i) => (
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
    </>
  );
}
