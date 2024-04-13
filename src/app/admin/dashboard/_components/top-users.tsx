import Icons from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/wrappers/tooltip-wrapper";
import { AccountData, Product } from "@/types";
import { formatNumber, formatPrice } from "@/utils/format";
import { truncateText } from "@/utils/truncate-text";
import Image from "next/image";
import Link from "next/link";

export default function TopUsers({ data }: AccountData[] | any) {
  const check = data?.some((el: any) => el?.total_products_sold > 0);
  return (
    <div className="overflow-auto flex-col flex gap-5 bg-white shadow-sub-sections border border-slate-100 rounded-sm p-5 ">
      <div className="flex-1 flex justify-between">
        <h2 className="text-[16px] font-semibold">Top Users</h2>
        <Link
          href={"/admin/users"}
          className={buttonVariants({
            size: "sm",
            className:
              "text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-sm text-[13px]",
          })}
        >
          View All
        </Link>
      </div>
      {!data ? (
        <span className="text-slate-300 text-[20px] md:text-[40px] h-[400px] flex items-center justify-center">
          No Users yet
        </span>
      ) : check ? (
        <ul className="mx-auto w-full h-full flex flex-col ">
          <div className="flex justify-between gap-2 items-center text-slate-400 text-[13px] font-semibold px-2">
            <div>USER</div>
            <div className="flex items-center gap-2">STATISTIC</div>
          </div>
          {data?.map((el: AccountData, i: number) => (
            <li
              key={i}
              className=" border-dashed  border-b last:border-b-0 mb-2 pb-2"
            >
              <Link
                href={"/admin/users/" + el?._id + "/details"}
                className="flex gap-2 justify-between items-center  p-2 hover:shadow-sub-sections transition-all"
              >
                <div className="flex gap-2 items-end">
                  {el?.image ? (
                    <Image
                      src={el?.image}
                      alt="user image"
                      className="object-contain w-[40px] 4-[60]"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <div className=" mx-auto w-[40px] h-[40px] bg-[#f7f6fb] flex items-center justify-center text-sm">
                      <div className="opacity-[.7]">
                        <Icons.logo h="20" w="20" />
                      </div>
                    </div>
                  )}
                  <div>
                    <TooltipWrapper label={el?.name || "--"}>
                      <div className="font-medium text-sm ">
                        {truncateText(el?.name || "--", 15)}
                      </div>
                    </TooltipWrapper>
                    <TooltipWrapper label={el?.email}>
                      <div className="font-medium text-sm ">
                        {truncateText(el?.email, 15)}
                      </div>
                    </TooltipWrapper>
                    <TooltipWrapper label={el?._id}>
                      <p className="text-slate-500 text-[11px] ">
                        ID: {truncateText(el?._id, 15)}
                      </p>
                    </TooltipWrapper>
                  </div>
                </div>
                <div className="flex gap-3">
                  <TooltipWrapper
                    label={formatNumber(el?.total_products_sold || 0) + ""}
                  >
                    <span className="flex flex-col items-end text-[13px]">
                      <span className="text-[11px] text-slate-500">
                        Products slod
                      </span>
                      {truncateText(
                        formatNumber(el?.total_products_sold || 0),
                        15
                      )}
                    </span>
                  </TooltipWrapper>
                  <TooltipWrapper
                    label={formatPrice(el?.total_amount_paid || 0) + ""}
                  >
                    <span className="flex flex-col items-end text-[13px]">
                      <span className="text-[11px] text-slate-500">
                        Amount paid
                      </span>
                      {truncateText(
                        formatNumber(el?.total_products_sold || 0),
                        15
                      )}
                    </span>
                  </TooltipWrapper>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-slate-300 text-[20px] md:text-[40px] h-[400px] flex items-center justify-center">
          No sales yet
        </span>
      )}
    </div>
  );
}
