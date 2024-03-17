import React from "react";
import { Product } from "@/types";
import { Label } from "@/components/ui/label";
import SectionTitle from "@/components/section-title";

export default function BasicSection({
  data,
}: {
  data: Product | null;
}) {
  return (
    <div className="p-5 border-b">
      <SectionTitle
        title="Basic."
        className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
      />
      <div className="grid grid-cols-1 gap-y-5 gap-x-7 sm:grid-cols-2 mb-5 items-baseline">
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Title
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {data?.title || "No Set"}
          </div>
        </Label>
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Item Pack Quantity
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {data?.item_pack_quantity || "No Set"}
          </div>
        </Label>
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Model Number
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {data?.model_number || "No Set"}
          </div>
        </Label>
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Sizes
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {data?.sizes.length
              ? data?.sizes?.map((size, i) => (
                  <span
                    key={i}
                    className="border border-sky-700 bg-sky-700/20 p-1 rounded-sm text-sm text-sky-700 "
                  >
                    {size}
                  </span>
                ))
              : "No Set"}
          </div>
        </Label>
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Description
          <div className="p-3 border rounded-sm text-black text-sm font-normal h-[200px]">
            {data?.description || "No Set"}
          </div>
        </Label>
      </div>
    </div>
  );
}
