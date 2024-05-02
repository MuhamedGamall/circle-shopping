"use client";

import ProductsSlider from "@/components/products-slider/products-container";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProductsDeals_member } from "@/lib/RTK/slices/member/categories-slice";
import { useEffect } from "react";

export default function ProductsDeal({
   category-id,
  params,
}: {
   category-id: string;
  params?: any;
}) {
  const dispatch = useAppDispatch();
  const { deals, loading } = useAppSelector((state) => state.member_categories);

  useEffect(() => {
    dispatch(getProductsDeals_member({  category-id, params }));
  }, [ category-id, dispatch, params]);

  return (
    <ProductsSlider
      data={deals}
      loading={loading}
      title={ category-id.replaceAll('-',' ')+" top deals"}
      viewAllLink={"/categories/" +  category-id + "/deals"}
    />
  );
}
