"use client";
import SectionTitle from "@/components/section-title";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProduct } from "@/lib/RTK/slices/products-slice";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import ProductDetailsSection from "./sections/product-details";
import BasicSection from "./sections/basic";
import ShippingSection from "./sections/shipping";
import OfferSection from "./sections/offer";
import ImagesSection from "./sections/images";
import LoaderLayout from "@/components/loader-layout";
import { Product } from "@/types";

export default function ShowProductDetails({
  product,
  loading,
}: {
  product: Product | null;
  loading: boolean;
}) {
  // const dispatch = useAppDispatch();
  // const { product_id } = useParams();
  // const { product, loading } = useAppSelector((state) => state.allProducts);
  // useEffect(() => {
  //   dispatch(getProduct(product_id));
  // }, [dispatch, product_id]);

  return (
    <div className="rounded-sm border">
      <LoaderLayout loadingCondition={loading} />
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
            {product?.price?.base_price || "-- --"}
          </div>
        </Label>
      </div>
      <OfferSection data={product} />
      <ImagesSection images={product?.images || []} />
      <BasicSection data={product} />
      <ProductDetailsSection data={product} />
      <div className="p-5 border-b">
        <SectionTitle
          title="Item Condition."
          className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
        />
        <Label className="flex flex-col gap-y-2 text-shade text-[12px]">
          Item Condition
          <div className="p-3 border rounded-sm text-black text-sm font-normal">
            {product?.item_condition || "-- --"}
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
            {product?.warranty || "-- --"}
          </div>
        </Label>
      </div>
      <ShippingSection data={product} />
    </div>
  );
}
