import React from "react";
import { Product } from "@/types";
import { Label } from "@/components/ui/label";
import SectionTitle from "@/components/section-title";
import Overview from "./overview";

export default function ProductDetailsSection({
  data,
}: {
  data: Product | null;
}) {
  return (
    <div className="p-5 border-b">
      <SectionTitle
        title="product details."
        className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
      />
      <div className="grid grid-cols-1 gap-y-5 gap-x-7 sm:grid-cols-2 mb-5 items-baseline">
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Box Details
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {data?.box_details || "-- --"}
          </div>
        </Label>
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Max Purchase Quantity
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {data?.max_purchase_quantity || "-- --"}
          </div>
        </Label>
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Model Height
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {data?.model_height || "-- --"}
          </div>
        </Label>
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Model Name
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {data?.model_name || "-- --"}
          </div>
        </Label>
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Quantity In Stouk
          <div className="p-3 border rounded-sm text-black text-sm font-normal h-[200px]">
            {data?.quantity_in_stock || "-- --"}
          </div>
        </Label>
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Colour
          <div className="p-3 border rounded-sm text-black text-sm font-normal ">
            {data?.colour || "-- --"}
          </div>
        </Label>
      </div>
      <Overview
        data={data?.specifications?.slice(0, -1) || []}
        label={"Specifications"}
      />
      <Overview
        data={data?.highlights?.slice(0, -1) || []}
        label={"Highlights"}
      />
    </div>
  );
}
