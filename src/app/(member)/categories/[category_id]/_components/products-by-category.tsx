"use client";
import ProductsSlider from "@/components/products-slider/products-container";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getSubcategoryProducts_member } from '@/lib/RTK/slices/member/categories-slice';
import { useEffect } from "react";

export default function ProductsByCategory({
  category_id,
}: {
  category_id: string;
}) {
  const dispatch = useAppDispatch();
  const { subcategoryProducts, loading } = useAppSelector(
    (state) => state.member_categories
  );
  useEffect(() => {
    dispatch(getSubcategoryProducts_member(category_id?.replaceAll("-", "%20")));
  }, [category_id, dispatch]);

  return subcategoryProducts?.map((category, i) => (
    <ProductsSlider
      key={i}
      data={category?.products}
      title={category?._id?.sub_category}
      loading={loading}
      viewAllLink={
        "/categories/" +
        category_id?.replaceAll(" ", "-") +
        "/" +
        category?._id?.sub_category?.replaceAll(" ", "-")
      }
    />
  ));
}
