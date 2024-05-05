"use client";

import ProductsSlider from "@/components/products-slider/products-container";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  cleanUp,
  getProductsByMainCategory_member,
} from "@/lib/RTK/slices/member/categories-slice";
import { useEffect } from "react";

export default function ProductsBestSellers({
  category_id,
  params,
}: {
  category_id: string;
  params?: any;
}) {
  const dispatch = useAppDispatch();
  const { productsByMainCategory, loading } = useAppSelector(
    (state) => state.member_categories
  );

  useEffect(() => {
    dispatch(cleanUp());
    dispatch(
      getProductsByMainCategory_member({
        category_id: category_id?.replaceAll("-", "%20"),
        params,
      })
    );
  }, [category_id, dispatch,params]);

  return (
    <ProductsSlider
      data={productsByMainCategory?.products}
      loading={loading}
      title={category_id.replaceAll("-", " ") + " bestsellers"}
      viewAllLink={"/categories/" + category_id + "/bestsellers"}
    />
  );
}
