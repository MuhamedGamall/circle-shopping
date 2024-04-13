import { buttonVariants } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/wrappers/tooltip-wrapper";
import { Store } from "@/types";
import { formatNumber, formatPrice } from "@/utils/format";
import { truncateText } from "@/utils/truncate-text";
import Link from "next/link";

export default function TopSellers({ data }: Store[] | any) {
  const check = data?.some((el: Store) => el?.sales_count > 0);
  return (
    <div className="overflow-auto flex-col flex gap-5 bg-white shadow-sub-sections border border-slate-100 rounded-sm p-5 ">
      <div className="flex-1 flex justify-between">
        <h2 className="text-[16px] font-semibold">Top Sellers</h2>
        <Link
          href={"/admin/sellers"}
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
          No Sellers yet
        </span>
      ) : check ? (
        <ul className="mx-auto w-full h-full flex flex-col ">
          <div className="flex justify-between gap-2 items-center text-slate-400 text-[13px] font-semibold px-2">
            <div>SELLER</div>
            <div className="flex items-center gap-2">STATISTIC</div>
          </div>
          {data?.map((el: Store, i: number) => (
            <li
              key={i}
              className="border-dashed  border-b last:border-b-0 mb-2 pb-2"
            >
              <Link
                href={"/admin/sellers/" + el?._id + "/details"}
                className="flex gap-2 justify-between items-center  p-2 hover:shadow-sub-sections transition-all"
              >
                <div className="flex gap-2 items-end">
                  <div>
                    <TooltipWrapper label={el?.display_name}>
                      <div className="font-medium text-sm ">
                        {truncateText(el?.display_name, 15)}
                      </div>
                    </TooltipWrapper>
                    <TooltipWrapper label={el?.business_email}>
                      <div className="font-medium text-sm ">
                        {truncateText(el?.business_email, 15)}
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
                    label={formatNumber(el?.sales_count || 0) + ""}
                  >
                    <span className="flex flex-col items-end text-[13px]">
                      <span className="text-[11px] text-slate-500">
                        Sales count
                      </span>
                      {truncateText(formatNumber(el?.sales_count || 0), 15)}
                    </span>
                  </TooltipWrapper>
                  <TooltipWrapper
                    label={formatPrice(el?.total_sales || 0) + ""}
                  >
                    <span className="flex flex-col items-end text-[13px]">
                      <span className="text-[11px] text-slate-500">
                        Total sales
                      </span>
                      {truncateText(formatNumber(el?.total_sales || 0), 15)}
                    </span>
                  </TooltipWrapper>
                  <TooltipWrapper label={formatPrice(el?.likes || 0) + ""}>
                    <span className="flex flex-col items-end text-[13px]">
                      <span className="text-[11px] text-slate-500">Likes</span>
                      {truncateText(formatNumber(el?.likes || 0), 15)}
                    </span>
                  </TooltipWrapper>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-slate-300 text-[20px] md:text-[40px] h-[400px] flex items-center justify-center">
          No sales
        </span>
      )}
    </div>
  );
}
