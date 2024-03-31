import React from "react";
import { Product } from "@/types";
import { Label } from "@/components/ui/label";
import SectionTitle from "@/components/section-title";
import { formatDate } from "date-fns";

export default function OfferSection({ data }: { data: Product | null }) {
  return (
    <div className="p-5 border-b">
      <SectionTitle
        title="Pricing Offer."
        className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
      />
      <div className="grid grid-cols-1 gap-y-5 gap-x-7 sm:grid-cols-2 mb-5 items-baseline">
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Discount Percentage
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {data?.price?.offer?.discount_percentage || "-- --"}
          </div>
        </Label>
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Start Date
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {data?.price?.offer?.start_date
              ? formatDate(data.price.offer.start_date, "dd/MM/yyyy")
              : "-- --"}
          </div>
        </Label>
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          End Date
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {data?.price?.offer?.end_date
              ? formatDate(data?.price?.offer?.end_date, "dd/MM/yyyy")
              : "-- --"}
          </div>
        </Label>
      </div>
    </div>
  );
}
