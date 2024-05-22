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
  const { productsByMainCategoryForBestsellersSlider, loading } = useAppSelector(
    (state) => state.member_categories
  );

  useEffect(() => {
    dispatch(
      getProductsByMainCategory_member({
        category_id: category_id?.replaceAll("-", " "),
        params,
      })
    );
  }, [category_id, dispatch, params]);

  return (
    <ProductsSlider
      data={productsByMainCategoryForBestsellersSlider?.products}
      loading={loading}
      title={category_id.replaceAll("-", " ") + " bestsellers"}
      viewAllLink={{
        pathname: "/categories/" + category_id + "/products",
        query: { role: "bestsellers" },
      }}
    />
  );
}
