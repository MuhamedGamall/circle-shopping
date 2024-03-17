"use client";
import SectionTitle from "@/components/section-title";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProduct_admin } from "@/lib/RTK/slices/admin-slices/products-slice";
import { formatDate } from "date-fns";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import Overview from "./overview";

export default function ViewDetailsSection() {
  const dispatch = useAppDispatch();
  const { product_id } = useParams();
  const { product, loading } = useAppSelector((state) => state.admin_products);
  useEffect(() => {
    dispatch(getProduct_admin(product_id));
  }, [dispatch, product_id]);

  return (
    <div className="rounded-sm border">
      <div className="p-3 border-b">
        <SectionTitle
          title="Product Details"
          className="text-[16px]  sm:text-[16px]"
        />
      </div>
      <div className="p-5 border-b">
        <SectionTitle
          title="Pricing."
          className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
        />
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Base Price
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {product?.price?.base_price || "No Set"}
          </div>
        </Label>
      </div>
      <div className="p-5 border-b">
        <SectionTitle
          title="Pricing Offer."
          className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
        />
        <div className="grid grid-cols-1 gap-y-5 gap-x-7 sm:grid-cols-2 mb-5 items-baseline">
          <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
            Discount Percentage
            <div className="p-3 border rounded-sm text-black text-sm font-normal">
              {product?.price?.offer.discount_percentage || "Not Set"}
            </div>
          </Label>
          <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
            Start Date
            <div className="p-3 border rounded-sm text-black text-sm font-normal">
              {product
                ? formatDate(product?.price?.offer?.start_date, "dd/MM/yyyy")
                : "Not Set"}
            </div>
          </Label>
          <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
            End Date
            <div className="p-3 border rounded-sm text-black text-sm font-normal">
              {product
                ? formatDate(product?.price?.offer?.end_date, "dd/MM/yyyy")
                : "Not Set"}
            </div>
          </Label>
        </div>
      </div>
      <div className="p-5 border-b">
        <SectionTitle
          title="Product Images."
          className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
        />
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            <div className="py-3 hide-scroll flex items-center sm:justify-start justify-center flex-wrap gap-5 w-full sm:max-h-full max-h-[480px] sm:overflow-y-visible overflow-y-auto">
              {product?.images?.length
                ? product?.images?.map((image, i) => (
                    <Image
                      key={i}
                      src={image}
                      alt="product-image"
                      width={480}
                      height={300}
                      loading="lazy"
                      objectFit="contain"
                      className="w-full max-w-[140px] h-[230px] object-contain rounded-sm shadow-md"
                    />
                  ))
                : "No Set"}
            </div>
          </div>
        </Label>
      </div>
      <div className="p-5 border-b">
        <SectionTitle
          title="Basic."
          className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
        />
        <div className="grid grid-cols-1 gap-y-5 gap-x-7 sm:grid-cols-2 mb-5 items-baseline">
          <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
            Title
            <div className="p-3 border rounded-sm text-black text-sm font-normal">
              {product?.title || "No Set"}
            </div>
          </Label>
          <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
            Item Pack Quantity
            <div className="p-3 border rounded-sm text-black text-sm font-normal">
              {product?.item_pack_quantity || "No Set"}
            </div>
          </Label>
          <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
            Model Number
            <div className="p-3 border rounded-sm text-black text-sm font-normal">
              {product?.model_number || "No Set"}
            </div>
          </Label>
          <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
            Sizes
            <div className="p-3 border rounded-sm text-black text-sm font-normal">
              {product?.sizes.length
                ? product?.sizes?.map((size, i) => (
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
              {product?.description || "No Set"}
            </div>
          </Label>
        </div>
      </div>
      <div className="p-5 border-b">
        <SectionTitle
          title="product derails."
          className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
        />
        <div className="grid grid-cols-1 gap-y-5 gap-x-7 sm:grid-cols-2 mb-5 items-baseline">
          <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
            Box Details
            <div className="p-3 border rounded-sm text-black text-sm font-normal">
              {product?.box_details || "No Set"}
            </div>
          </Label>
          <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
            Max Purchase Quantity
            <div className="p-3 border rounded-sm text-black text-sm font-normal">
              {product?.max_purchase_quantity || "No Set"}
            </div>
          </Label>
          <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
            Model Height
            <div className="p-3 border rounded-sm text-black text-sm font-normal">
              {product?.model_height || "No Set"}
            </div>
          </Label>
          <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
            Model Name
            <div className="p-3 border rounded-sm text-black text-sm font-normal">
              {product?.model_name || "No Set"}
            </div>
          </Label>
          <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
            Quantity In Stouk
            <div className="p-3 border rounded-sm text-black text-sm font-normal h-[200px]">
              {product?.quantity_in_stock || "No Set"}
            </div>
          </Label>
          <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
            Colour
            <div className="p-3 border rounded-sm text-black text-sm font-normal ">
              {product?.colour || "No Set"}
            </div>
          </Label>
        </div>
        <Overview
          data={product?.specifications?.slice(0, -1) || []}
          label={"Specifications"}
        />
        <Overview
          data={product?.highlights?.slice(0, -1) || []}
          label={"Highlights"}
        />
      </div>
      <div className="p-5 border-b">
        <SectionTitle
          title="Item Condition."
          className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
        />
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Item Condition
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {product?.item_condition || "No Set"}
          </div>
        </Label>
      </div>
      <div className="p-5 border-b">
        <SectionTitle
          title="Warranty."
          className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
        />
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Warranty
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {product?.warranty || "No Set"}
          </div>
        </Label>
      </div>
      <div className="p-5 border-b">
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
                {product?.shipping?.shipping_length?.size || "No Set"}
              </div>
              <div className="bg-slate-100  border-l w-[20%] sm:w-[10%] flex items-center justify-center">
                {product?.shipping?.shipping_length?.size_type || "No Set"}
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
                {product?.shipping?.shipping_height?.size || "No Set"}
              </div>
              <div className="bg-slate-100  border-l w-[20%] sm:w-[10%] flex items-center justify-center">
                {product?.shipping?.shipping_height?.size_type || "No Set"}
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
                {product?.shipping?.shipping_width_depth?.size || "No Set"}
              </div>
              <div className="bg-slate-100  border-l w-[20%] sm:w-[10%] flex items-center justify-center">
                {product?.shipping?.shipping_width_depth?.size_type || "No Set"}
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
                {product?.shipping?.shipping_weight?.size || "No Set"}
              </div>
              <div className="bg-slate-100  border-l w-[20%] sm:w-[10%] flex items-center justify-center">
                {product?.shipping?.shipping_weight?.size_type || "No Set"}
              </div>
            </div>
          </Label>
        </div>
      </div>
    </div>
  );
}
