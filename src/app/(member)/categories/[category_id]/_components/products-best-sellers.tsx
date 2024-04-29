"use client";

import ProductsSlider from "@/components/products-slider/products-container";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  cleanUp,
  getProductsBestSellers,
} from "@/lib/RTK/slices/member/categories-slice";
import { useEffect } from "react";

export default function ProductsBestSellers({
  category_id,
}: {
  category_id: string;
}) {
  const dispatch = useAppDispatch();
  const { bestSellers, loading } = useAppSelector(
    (state) => state.member_categories
  );

  useEffect(() => {
    dispatch(cleanUp());
    dispatch(getProductsBestSellers(category_id));
  }, [category_id, dispatch]);

  return (
    <ProductsSlider data={bestSellers} loading={loading} title="Bestsellers" />
  );
}
