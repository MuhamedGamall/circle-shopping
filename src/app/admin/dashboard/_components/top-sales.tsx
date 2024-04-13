import { Button, buttonVariants } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/wrappers/tooltip-wrapper";
import { Product } from "@/types";
import { formatNumber } from "@/utils/format";
import { truncateText } from "@/utils/truncate-text";
import Image from "next/image";
import Link from "next/link";

export default function TopSales({ data }: any) {
  const check = data?.some((el: any) => el?.sales_count > 0);

  return (
    <div className=" flex-col flex gap-5 bg-white shadow-sub-sections border border-slate-100 rounded-sm p-5 ">
      <div className="flex-1 flex justify-between">
        <h2 className="text-[16px] font-semibold">Top Selling Products</h2>
        <Link
          href={"/admin/products"}
          className={buttonVariants({
            size: "sm",
            className:
              "text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-sm text-[13px]",
          })}
        >
          View All
        </Link>
      </div>
      {check ? (
        <ul className="mx-auto w-full h-full flex flex-col ">
          <div className="flex justify-between gap-2 items-center text-slate-400 text-[13px] font-semibold px-2">
            <div>ITEM</div>
            <div>STATISTIC</div>
          </div>
          {data?.map((el: Product, i: number) => (
            <li
              key={i}
              className=" border-dashed  border-b last:border-b-0 mb-2 pb-2"
            >
              <Link
                href={"/admin/products/" + el?._id + "/details"}
                className="flex gap-2 justify-between items-center  p-2 hover:shadow-sub-sections transition-all"
              >
                <div className="flex gap-2 items-end">
                  <Image
                    src={el?.images?.[0]}
                    alt="product Image"
                    className="object-contain w-[40px] h-[60]"
                    width={40}
                    height={60}
                  />
                  <div>
                    <TooltipWrapper label={el?.title}>
                      <div className="font-medium text-sm ">
                        {truncateText(el?.title, 15)}
                      </div>
                    </TooltipWrapper>
                    <TooltipWrapper label={el?._id}>
                      <p className="text-slate-500 text-[11px] ">
                        ID: {truncateText(el?._id, 15)}
                      </p>
                    </TooltipWrapper>
                  </div>
                </div>
                <TooltipWrapper label={formatNumber(el?.sales_count || 0) + ""}>
                  <span className="flex flex-col items-end text-[13px]">
                    <span className="text-[11px] text-slate-500">Sales count</span>
                    {truncateText(formatNumber(el?.sales_count || 0), 15)}
                  </span>
                </TooltipWrapper>
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
