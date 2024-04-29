"use client";

import ProductsSlider from "@/components/products-slider/products-container";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  cleanUp,
  getProductsBestSellers_member,
  getProductsDeals_member,
} from "@/lib/RTK/slices/member/categories-slice";
import { useEffect } from "react";

export default function ProductsDeal({
  category_id,
  params,
}: {
  category_id: string;
  params?: any;
}) {
  const dispatch = useAppDispatch();
  const { deals, loading } = useAppSelector(
    (state) => state.member_categories
  );

  useEffect(() => {
    dispatch(cleanUp());
    dispatch(getProductsDeals_member({ category_id, params }));
  }, [category_id, dispatch, params]);

  return (
    <ProductsSlider data={deals} loading={loading} title="Top deals" />
  );
}
