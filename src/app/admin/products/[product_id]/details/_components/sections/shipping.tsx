import React from "react";
import { Product } from "@/types";
import { Label } from "@/components/ui/label";
import SectionTitle from "@/components/section-title";

export default function ShippingSection({ data }: { data: Product | null }) {
  return (
    <div className="p-5">
      <SectionTitle
        title="Shipping."
        className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
      />
      <div className="flex flex-col gap-5">
        <Label className="flex flex-col gap-y-3">
          <div className="  text-shade text-[12px] flex w-full  items-center justify-between">
            <span>Shipping Length</span>
            <span className="mr-5">Size Type</span>
          </div>
          <div className="flex w-full justify-between border rounded-sm text-black text-sm font-normal">
            <div className=" p-3 ">
              {data?.shipping?.shipping_length?.size || "No Set"}
            </div>
            <div className="bg-slate-100  border-l w-[20%] sm:w-[10%] flex items-center justify-center">
              {data?.shipping?.shipping_length?.size_type || "No Set"}
            </div>
          </div>
        </Label>
        <Label className="flex flex-col gap-y-3">
          <div className="  text-shade text-[12px] flex w-full  items-center justify-between">
            <span>Shipping Height</span>
            <span className="mr-5">Size Type</span>
          </div>
          <div className="flex w-full justify-between border rounded-sm text-black text-sm font-normal">
            <div className=" p-3 ">
              {data?.shipping?.shipping_height?.size || "No Set"}
            </div>
            <div className="bg-slate-100  border-l w-[20%] sm:w-[10%] flex items-center justify-center">
              {data?.shipping?.shipping_height?.size_type || "No Set"}
            </div>
          </div>
        </Label>
        <Label className="flex flex-col gap-y-3">
          <div className="  text-shade text-[12px] flex w-full  items-center justify-between">
            <span>Shipping Width/Depth</span>
            <span className="mr-5">Size Type</span>
          </div>
          <div className="flex w-full justify-between border rounded-sm text-black text-sm font-normal">
            <div className=" p-3 ">
              {data?.shipping?.shipping_width_depth?.size || "No Set"}
            </div>
            <div className="bg-slate-100  border-l w-[20%] sm:w-[10%] flex items-center justify-center">
              {data?.shipping?.shipping_width_depth?.size_type || "No Set"}
            </div>
          </div>
        </Label>
        <Label className="flex flex-col gap-y-3">
          <div className="  text-shade text-[12px] flex w-full  items-center justify-between">
            <span>Shipping Weight</span>
            <span className="mr-5">Size Type</span>
          </div>
          <div className="flex w-full justify-between border rounded-sm text-black text-sm font-normal">
            <div className=" p-3 ">
              {data?.shipping?.shipping_weight?.size || "No Set"}
            </div>
            <div className="bg-slate-100  border-l w-[20%] sm:w-[10%] flex items-center justify-center">
              {data?.shipping?.shipping_weight?.size_type || "No Set"}
            </div>
          </div>
        </Label>
      </div>
    </div>
  );
}
