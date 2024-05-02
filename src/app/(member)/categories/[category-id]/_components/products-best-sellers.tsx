"use client";

import ProductsSlider from "@/components/products-slider/products-container";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  cleanUp,
  getProductsBestSellers_member,
} from "@/lib/RTK/slices/member/categories-slice";
import { useEffect } from "react";

export default function ProductsBestSellers({
   category-id,
  params,
}: {
   category-id: string;
  params?: any;
}) {
  const dispatch = useAppDispatch();
  const { bestSellers, loading } = useAppSelector(
    (state) => state.member_categories
  );

  useEffect(() => {
    dispatch(cleanUp());
    dispatch(getProductsBestSellers_member({  category-id, params }));
  }, [ category-id, dispatch, params]);

  return (
    <ProductsSlider
      data={bestSellers}
      loading={loading}
      title={ category-id.replaceAll('-',' ')+" bestsellers"}
      viewAllLink={
        "/categories/" +
         category-id +
        "/bestsellers" 
      }
    />
  );
}
