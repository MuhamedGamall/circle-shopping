"use client";
import ProductsSlider from "@/components/products-slider/products-container";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getSubcategoryProducts_member } from "@/lib/RTK/slices/member/categories-slice";
import { useEffect } from "react";
import getProductsByCategory from "../actions/get-products-by-category";
import { Product } from "@/types";

export default function ProductsByCategory({
  category_id,
  data,
  loading,
}: {
  data: {
    _id: { main_category: string; sub_category: string };
    products: Product[];
  }[];
  loading: boolean;
  category_id: string;
}) {
  // const dispatch = useAppDispatch();
  // const { subcategoryProducts, } = useAppSelector(
  //   (state) => state.member_categories
  // );
  // useEffect(() => {
  //   dispatch(getSubcategoryProducts_member(category_id?.replaceAll("-", " ")));
  // }, [category_id, dispatch]);

  return data?.map((category, i) => (
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
