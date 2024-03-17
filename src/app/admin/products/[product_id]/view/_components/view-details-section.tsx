"use client";

import SectionTitle from "@/components/section-title";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProducts_admin } from "@/lib/RTK/slices/admin-slices/products-slice";
import { formatPrice } from "@/utils/format";
import { format } from "path";
import React, { useEffect } from "react";

export default function DetailsSection() {
  const dispatch = useAppDispatch();
  const { product, loading } = useAppSelector((state) => state.admin_products);
  useEffect(() => {
    dispatch(getProducts_admin());
  }, [dispatch]);

  return (
    <div className="rounded-sm border">
      <div className="p-3 border-b">
        <SectionTitle
          title="Product Details"
          className="text-[16px]  sm:text-[16px]"
        />
      </div>
      <div className="  p-5 border-b">
        <SectionTitle
          title="Pricing."
          className="text-[16px]  sm:text-[16px] text-slate-700 my-3"
        />
        <Label className="flex flex-col gap-y-3 text-shade text-[12px]">
          <div className="py-3 border rounded-sm text-black text-sm">
            {formatPrice(product?.price?.base_price || 0)}
          </div>
        </Label>
      </div>
    </div>
  );
}
